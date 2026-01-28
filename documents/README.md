# Raw Meet - MVP Documentation

## Project Overview

Raw Meet is a social network application focused on authentic, unfiltered content. Users can only post photos and videos captured directly from their device camera - no uploads from gallery, no filters, no AI manipulation. Just RAW, authentic moments.

## Architecture

The project follows a modern, multi-platform architecture:

```
raw-meet/
├── android/          # Android app (Kotlin + Jetpack Compose)
├── api/             # ASP.NET Core Web API
├── cdk/             # AWS CDK Infrastructure as Code
├── web/             # Angular web application
└── documents/       # Project documentation
```

## Key Features

### Core Functionality
- **User Authentication**: Google OAuth via AWS Cognito
- **Feed**: View posts from followed users
- **Profile Management**: View and edit user profiles
- **Comments**: Interact with posts through comments
- **Post Creation**: (Mobile only) Capture and share photos/videos directly from camera

### Platform-Specific Features

#### Android (Primary Platform)
- Full feature set including post creation
- Camera integration for authentic content capture
- Video recording support
- Material 3 Design

#### Web (Viewer Platform)
- View feed and posts
- Comment on content
- Profile viewing
- **No posting capability** (enforces RAW concept)

## Technology Stack

### Frontend
- **Android**: Kotlin, Jetpack Compose, Material 3, CameraX, Retrofit, Coil
- **Web**: Angular 21, Angular Material, RxJS, TypeScript

### Backend
- **API**: ASP.NET Core 8.0, C#
- **Database**: PostgreSQL (AWS RDS)
- **Storage**: AWS S3 for media files
- **Authentication**: AWS Cognito with Google OAuth

### Infrastructure
- **IaC**: AWS CDK (TypeScript)
- **Hosting**: AWS (RDS, S3, Cognito)

## Environments

### Local Development
- Android: Local device/emulator
- Web: http://localhost:4200
- API: http://localhost:5000
- Database: Local PostgreSQL or AWS RDS development instance

### Production
- Web: https://raw-meet.com
- API: https://api.raw-meet.com
- Database: AWS RDS (Multi-AZ)
- Media Storage: AWS S3 (with CloudFront CDN)

## Data Models

### User
```typescript
{
  id: string
  username: string
  email: string
  displayName: string
  avatarUrl?: string
  bio?: string
  createdAt: Date
}
```

### Post
```typescript
{
  id: string
  userId: string
  user?: User
  mediaUrl: string
  mediaType: 'photo' | 'video'
  caption?: string
  createdAt: Date
  commentsCount: number
}
```

### Comment
```typescript
{
  id: string
  postId: string
  userId: string
  user?: User
  content: string
  createdAt: Date
}
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users/{userId}` - Get user profile
- `PUT /api/users/{userId}` - Update user profile
- `GET /api/users/search?q={query}` - Search users

### Posts
- `GET /api/posts/feed` - Get feed (paginated)
- `GET /api/posts/{postId}` - Get specific post
- `GET /api/posts/user/{userId}` - Get user's posts
- `POST /api/posts` - Create new post (requires media file)
- `DELETE /api/posts/{postId}` - Delete post

### Comments
- `GET /api/posts/{postId}/comments` - Get post comments
- `POST /api/posts/{postId}/comments` - Add comment

## Setup Instructions

### Prerequisites
- Node.js 18+ (for web and CDK)
- .NET 8.0 SDK (for API)
- Android Studio (for Android app)
- AWS CLI configured
- PostgreSQL (for local development)

### Web Application
```bash
cd web
npm install
npm start
```

### API
```bash
cd api/LongCode.RawMeet.WebApi
dotnet restore
dotnet run
```

### Android App
1. Open `android/` in Android Studio
2. Sync Gradle
3. Run on device/emulator

### Infrastructure (CDK)
```bash
cd cdk
npm install

# Set environment variables
export GOOGLE_CLIENT_ID=your_google_client_id
export GOOGLE_CLIENT_SECRET=your_google_client_secret

# Deploy local environment
cdk deploy RawMeetStackLocal

# Deploy production
cdk deploy RawMeetStackProduction
```

## Security Considerations

1. **Authentication**: All API endpoints (except public feed) require valid JWT tokens from Cognito
2. **Media Upload**: Direct uploads to S3 with pre-signed URLs
3. **CORS**: Configured to allow only known domains
4. **Rate Limiting**: Implemented on API endpoints
5. **Input Validation**: All user inputs validated on both client and server

## Future Enhancements

- [ ] Real-time notifications
- [ ] Direct messaging
- [ ] Stories feature (24-hour posts)
- [ ] Follow/unfollow functionality
- [ ] Like/reaction system
- [ ] Search and discovery
- [ ] Content moderation tools
- [ ] Analytics dashboard
- [ ] iOS app

## Development Guidelines

### Code Style
- **TypeScript/JavaScript**: ESLint + Prettier
- **C#**: Standard .NET conventions
- **Kotlin**: Kotlin style guide

### Git Workflow
1. Create feature branch from `main`
2. Make changes with descriptive commits
3. Create pull request
4. Code review required
5. Merge to `main`
6. Deploy to staging then production

### Testing
- Unit tests for business logic
- Integration tests for API endpoints
- E2E tests for critical user flows
- Manual testing on real devices

## Support

For issues and questions:
- Create GitHub issue
- Check documentation in `/documents`
- Review API documentation at `/api/swagger`

## License

[Your License Here]

## Contributors

[Your Name/Team]
