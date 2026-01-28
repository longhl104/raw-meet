# Raw Meet - Getting Started Guide

## Quick Start

This guide will help you set up and run all components of the Raw Meet application.

## Prerequisites

### Required Software
- **Node.js** 18+ and npm
- **.NET SDK** 8.0+
- **Android Studio** (latest stable)
- **PostgreSQL** 15+
- **AWS CLI** (configured with your credentials)
- **Git**

### Accounts Needed
- AWS Account
- Google Cloud Console (for OAuth)

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/longhl104/raw-meet.git
cd raw-meet
```

### 2. Set Up AWS Infrastructure

```bash
cd cdk
npm install

# Configure environment variables
export GOOGLE_CLIENT_ID="your-google-client-id"
export GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Bootstrap CDK (first time only)
cdk bootstrap

# Deploy local environment
cdk deploy RawMeetStackLocal
```

**Important**: Save the output values (UserPoolId, ClientId, DatabaseEndpoint, etc.)

### 3. Configure Environment Files

#### Web Application
Edit `web/src/environments/environment.local.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api',
  cognitoUserPoolId: 'YOUR_USER_POOL_ID',
  cognitoClientId: 'YOUR_CLIENT_ID',
  cognitoDomain: 'YOUR_COGNITO_DOMAIN'
};
```

#### API
Edit `api/LongCode.RawMeet.WebApi/appsettings.Development.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=YOUR_DB_ENDPOINT;Database=rawmeet;Username=postgres;Password=YOUR_PASSWORD"
  },
  "AWS": {
    "Region": "us-east-1",
    "UserPoolId": "YOUR_USER_POOL_ID",
    "ClientId": "YOUR_CLIENT_ID",
    "BucketName": "YOUR_BUCKET_NAME"
  }
}
```

### 4. Run the API

```bash
cd api/LongCode.RawMeet.WebApi
dotnet restore
dotnet run
```

API will be available at `http://localhost:5000`
Swagger UI at `http://localhost:5000/swagger`

### 5. Run the Web Application

```bash
cd web
npm install
npm start
```

Web app will be available at `http://localhost:4200`

### 6. Run the Android App

1. Open Android Studio
2. Open the `android` folder
3. Wait for Gradle sync to complete
4. Create `local.properties` if needed:
   ```properties
   sdk.dir=/path/to/your/Android/sdk
   ```
5. Run the app on an emulator or physical device

## Google OAuth Setup

### Create OAuth 2.0 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure consent screen
6. Add authorized redirect URIs:
   - `https://YOUR_COGNITO_DOMAIN/oauth2/idpresponse`
   - `http://localhost:4200/callback` (for local dev)
7. Copy Client ID and Client Secret

### Configure Cognito

The CDK stack automatically configures Google as an identity provider using the environment variables you set.

## Database Setup

### Local PostgreSQL

```bash
# Create database
createdb rawmeet

# Run migrations (once implemented)
cd api/LongCode.RawMeet.WebApi
dotnet ef database update
```

### Using AWS RDS

The database endpoint is created by the CDK stack. Connect using the endpoint from the CDK output.

## Testing the Application

### 1. Test Authentication
1. Open web app at `http://localhost:4200`
2. Click "Login"
3. Try Google Sign In
4. Verify redirect back to app

### 2. Test API
1. Open `http://localhost:5000/swagger`
2. Test the `/api/health` endpoint
3. Test other endpoints (will need authentication)

### 3. Test Android App
1. Launch app on device/emulator
2. Complete login flow
3. Navigate through different screens

## Common Issues and Solutions

### Issue: CDK Deploy Fails

**Solution**: 
- Ensure AWS CLI is configured: `aws configure`
- Check your AWS permissions
- Verify you've run `cdk bootstrap`

### Issue: Web App Can't Connect to API

**Solution**:
- Verify API is running on port 5000
- Check CORS configuration in API
- Ensure environment.local.ts has correct API URL

### Issue: Android Build Fails

**Solution**:
- Clean project: `Build > Clean Project`
- Invalidate caches: `File > Invalidate Caches / Restart`
- Sync Gradle files
- Check `local.properties` points to Android SDK

### Issue: Database Connection Fails

**Solution**:
- Verify PostgreSQL is running
- Check connection string in appsettings
- Ensure database exists
- Check firewall/security group settings for RDS

### Issue: Google OAuth Not Working

**Solution**:
- Verify redirect URIs are correctly configured
- Check Client ID and Secret are correct
- Ensure Google+ API is enabled
- Clear browser cache and cookies

## Development Workflow

### Making Changes

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes
# ...

# Commit changes
git add .
git commit -m "Add: your feature description"

# Push to remote
git push origin feature/your-feature-name
```

### Running Tests

```bash
# Web tests
cd web
npm test

# API tests
cd api/LongCode.RawMeet.WebApi
dotnet test

# Android tests
cd android
./gradlew test
```

## Deployment

### Deploy to Production

```bash
# Deploy infrastructure
cd cdk
cdk deploy RawMeetStackProduction

# Build and deploy API
cd api/LongCode.RawMeet.WebApi
dotnet publish -c Release

# Build web app
cd web
npm run build:production

# Build Android APK
cd android
./gradlew assembleRelease
```

## Next Steps

1. ✅ Set up all components locally
2. ✅ Test authentication flow
3. ✅ Create your first post (mobile only)
4. ✅ View feed and interact with posts
5. ✅ Explore the codebase
6. 📝 Implement additional features
7. 🚀 Deploy to production

## Resources

- [Angular Documentation](https://angular.io/docs)
- [ASP.NET Core Documentation](https://docs.microsoft.com/aspnet/core)
- [Jetpack Compose Documentation](https://developer.android.com/jetpack/compose)
- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk)
- [AWS Cognito Documentation](https://docs.aws.amazon.com/cognito)

## Getting Help

- Check the main [README.md](../README.md)
- Review API documentation at `/swagger`
- Check GitHub issues
- Contact the development team

Happy coding! 🚀
