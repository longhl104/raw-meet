#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { RawMeetStack } from '../lib/raw-meet-stack';

const app = new cdk.App();

// Local environment stack
new RawMeetStack(app, 'RawMeetStackLocal', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  environment: 'local',
});

// Production environment stack
new RawMeetStack(app, 'RawMeetStackProduction', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  environment: 'production',
});
