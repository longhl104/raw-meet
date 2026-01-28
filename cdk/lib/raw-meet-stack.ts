import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

interface RawMeetStackProps extends cdk.StackProps {
  environment: 'local' | 'production';
}

export class RawMeetStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: RawMeetStackProps) {
    super(scope, id, props);

    const { environment } = props;

    // VPC for database
    const vpc = new ec2.Vpc(this, `RawMeetVpc-${environment}`, {
      maxAzs: environment === 'production' ? 3 : 2,
      natGateways: environment === 'production' ? 2 : 1,
    });

    // Cognito User Pool
    const userPool = new cognito.UserPool(this, `RawMeetUserPool-${environment}`, {
      userPoolName: `raw-meet-${environment}`,
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
        username: true,
      },
      autoVerify: {
        email: true,
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: environment === 'production' 
        ? cdk.RemovalPolicy.RETAIN 
        : cdk.RemovalPolicy.DESTROY,
    });

    // Google OAuth configuration
    const googleProvider = new cognito.UserPoolIdentityProviderGoogle(
      this,
      `RawMeetGoogleProvider-${environment}`,
      {
        userPool,
        clientId: process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
        clientSecretValue: cdk.SecretValue.unsafePlainText(
          process.env.GOOGLE_CLIENT_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET'
        ),
        scopes: ['profile', 'email', 'openid'],
        attributeMapping: {
          email: cognito.ProviderAttribute.GOOGLE_EMAIL,
          givenName: cognito.ProviderAttribute.GOOGLE_GIVEN_NAME,
          familyName: cognito.ProviderAttribute.GOOGLE_FAMILY_NAME,
          profilePicture: cognito.ProviderAttribute.GOOGLE_PICTURE,
        },
      }
    );

    // User Pool Client
    const userPoolClient = new cognito.UserPoolClient(
      this,
      `RawMeetUserPoolClient-${environment}`,
      {
        userPool,
        generateSecret: false,
        authFlows: {
          userPassword: true,
          userSrp: true,
        },
        oAuth: {
          flows: {
            authorizationCodeGrant: true,
          },
          scopes: [
            cognito.OAuthScope.OPENID,
            cognito.OAuthScope.EMAIL,
            cognito.OAuthScope.PROFILE,
          ],
          callbackUrls: [
            environment === 'production'
              ? 'https://raw-meet.com/callback'
              : 'http://localhost:4200/callback',
          ],
          logoutUrls: [
            environment === 'production'
              ? 'https://raw-meet.com/logout'
              : 'http://localhost:4200/logout',
          ],
        },
        supportedIdentityProviders: [
          cognito.UserPoolClientIdentityProvider.COGNITO,
          cognito.UserPoolClientIdentityProvider.GOOGLE,
        ],
      }
    );

    userPoolClient.node.addDependency(googleProvider);

    // User Pool Domain
    const domain = userPool.addDomain(`RawMeetDomain-${environment}`, {
      cognitoDomain: {
        domainPrefix: `raw-meet-${environment}`,
      },
    });

    // PostgreSQL Database
    const dbInstance = new rds.DatabaseInstance(this, `RawMeetDB-${environment}`, {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_15,
      }),
      instanceType: environment === 'production'
        ? ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MEDIUM)
        : ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
      multiAz: environment === 'production',
      allocatedStorage: environment === 'production' ? 100 : 20,
      storageType: rds.StorageType.GP3,
      databaseName: 'rawmeet',
      backupRetention: environment === 'production'
        ? cdk.Duration.days(7)
        : cdk.Duration.days(1),
      deleteAutomatedBackups: environment !== 'production',
      removalPolicy: environment === 'production'
        ? cdk.RemovalPolicy.SNAPSHOT
        : cdk.RemovalPolicy.DESTROY,
      deletionProtection: environment === 'production',
    });

    // Outputs
    new cdk.CfnOutput(this, 'UserPoolId', {
      value: userPool.userPoolId,
      description: 'Cognito User Pool ID',
    });

    new cdk.CfnOutput(this, 'UserPoolClientId', {
      value: userPoolClient.userPoolClientId,
      description: 'Cognito User Pool Client ID',
    });

    new cdk.CfnOutput(this, 'UserPoolDomain', {
      value: domain.domainName,
      description: 'Cognito User Pool Domain',
    });

    new cdk.CfnOutput(this, 'DatabaseEndpoint', {
      value: dbInstance.dbInstanceEndpointAddress,
      description: 'PostgreSQL Database Endpoint',
    });

    new cdk.CfnOutput(this, 'DatabasePort', {
      value: dbInstance.dbInstanceEndpointPort,
      description: 'PostgreSQL Database Port',
    });
  }
}
