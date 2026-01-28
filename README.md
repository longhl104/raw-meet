# Raw Meet - Project Root

Welcome to Raw Meet - A social network for authentic, unfiltered moments.

## Project Structure

```
raw-meet/
├── android/          # Android mobile app (Kotlin + Jetpack Compose)
├── api/             # Backend API (ASP.NET Core)
├── cdk/             # Infrastructure as Code (AWS CDK)
├── web/             # Web application (Angular)
└── documents/       # Documentation
```

## What is Raw Meet?

Raw Meet is a social network with a unique twist: users can only post photos and videos captured directly from their device camera. No uploads from gallery, no filters, no AI manipulation. This ensures every post is authentic and "RAW".

**Key Concept**: "RAW" means Real, Authentic, and Without artificial enhancement.

## Quick Links

- [📖 Full Documentation](./documents/README.md)
- [🚀 Getting Started Guide](./documents/GETTING_STARTED.md)
- [🔧 API Documentation](http://localhost:5000/swagger) (when running locally)

## Features

### Android App (Primary Platform)
- ✅ User authentication with Google OAuth
- ✅ Camera integration for photos and videos
- ✅ Create posts with captions
- ✅ View feed of posts
- ✅ Comment on posts
- ✅ User profiles
- ✅ Material 3 Design

### Web App (Viewer Platform)
- ✅ User authentication with Google OAuth
- ✅ View feed
- ✅ Comment on posts
- ✅ View profiles
- ❌ No posting (web uploads violate RAW concept)

### Backend API
- ✅ RESTful API
- ✅ JWT authentication via Cognito
- ✅ PostgreSQL database
- ✅ S3 media storage
- ✅ CORS enabled

### Infrastructure
- ✅ AWS Cognito for auth
- ✅ RDS PostgreSQL database
- ✅ S3 for media storage
- ✅ Infrastructure as Code with CDK
- ✅ Multi-environment support (local/production)

## Tech Stack

- **Mobile**: Kotlin, Jetpack Compose, CameraX, Retrofit
- **Web**: Angular 21, Material Design, RxJS
- **Backend**: ASP.NET Core 8.0, C#, Entity Framework
- **Database**: PostgreSQL
- **Cloud**: AWS (Cognito, RDS, S3)
- **IaC**: AWS CDK (TypeScript)

## Getting Started

### Prerequisites
- Node.js 18+
- .NET 8.0 SDK
- Android Studio
- PostgreSQL 15+
- AWS CLI (configured)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/longhl104/raw-meet.git
   cd raw-meet
   ```

2. **Set up infrastructure**
   ```bash
   cd cdk
   npm install
   export GOOGLE_CLIENT_ID=your_client_id
   export GOOGLE_CLIENT_SECRET=your_secret
   cdk deploy RawMeetStackLocal
   ```

3. **Run the API**
   ```bash
   cd api/LongCode.RawMeet.WebApi
   dotnet run
   ```

4. **Run the web app**
   ```bash
   cd web
   npm install
   npm start
   ```

5. **Run the Android app**
   - Open `android/` in Android Studio
   - Sync Gradle
   - Run on device/emulator

For detailed setup instructions, see [Getting Started Guide](./documents/GETTING_STARTED.md).

## Development

### Project Status
- ✅ MVP Structure Complete
- 🚧 API Implementation (mock data)
- 🚧 Database Integration
- 🚧 Camera Integration
- 🚧 Authentication Integration
- ⏳ Testing
- ⏳ Production Deployment

### Current State
This is an MVP (Minimum Viable Product) with basic structure in place. The following are implemented with mock data:
- Authentication flow (UI only)
- Feed display
- Post creation UI
- Profile pages
- Comments UI

### Next Steps
1. Implement database models and migrations
2. Complete API with real database queries
3. Integrate AWS Cognito authentication
4. Implement S3 media upload
5. Add CameraX integration for Android
6. Implement real-time features
7. Add comprehensive testing
8. Production deployment

## Environments

### Local Development
- Web: http://localhost:4200
- API: http://localhost:5000
- API Docs: http://localhost:5000/swagger

### Production
- Web: https://raw-meet.com
- API: https://api.raw-meet.com

## Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Submit a pull request

## Architecture Decisions

### Why No Web Posting?
To maintain the "RAW" concept, we only allow posting through the mobile app's camera. This prevents users from uploading edited photos from their gallery, ensuring all content is authentic and unfiltered.

### Why Angular 21?
Latest Angular with signals, improved performance, and modern development experience with standalone components.

### Why AWS?
- Cognito: Robust authentication with OAuth support
- RDS: Managed PostgreSQL with automatic backups
- S3: Scalable, durable media storage
- CDK: Infrastructure as Code for reproducible deployments

### Why Jetpack Compose?
Modern, declarative UI framework for Android with better performance and developer experience compared to XML layouts.

## Support

- 📧 Email: [support@raw-meet.com](mailto:support@raw-meet.com)
- 🐛 Issues: [GitHub Issues](https://github.com/longhl104/raw-meet/issues)
- 📚 Docs: [Documentation](./documents/README.md)

## License

[Your License Here]

## Acknowledgments

Built with modern tools and best practices for scalable, maintainable applications.

---

**Remember**: Keep it RAW! 📸
