# Raw Meet CDK Infrastructure

AWS CDK TypeScript project for Raw Meet infrastructure.

## Architecture

- **Cognito User Pool**: User authentication with Google OAuth support
- **PostgreSQL Database**: RDS PostgreSQL instance for data storage
- **VPC**: Isolated network for database resources

## Environments

- **local**: Development environment
- **production**: Production environment

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure AWS credentials:
   ```bash
   aws configure
   ```

3. Set environment variables for Google OAuth:
   ```bash
   export GOOGLE_CLIENT_ID=your_google_client_id
   export GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

## Useful Commands

- `npm run build`   - Compile TypeScript to JavaScript
- `npm run watch`   - Watch for changes and compile
- `npm run test`    - Run unit tests
- `npm run synth`   - Synthesize CloudFormation template
- `npm run deploy`  - Deploy stacks to AWS
- `npm run diff`    - Compare deployed stack with current state
- `npm run destroy` - Remove stacks from AWS

## Deployment

### Local Environment
```bash
cdk deploy RawMeetStackLocal
```

### Production Environment
```bash
cdk deploy RawMeetStackProduction
```

## Configuration

Update the callback URLs in `lib/raw-meet-stack.ts` to match your application URLs.
