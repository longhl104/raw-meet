import { Component, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from '../../core/services/user.service';
import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
import { User, Post } from '../../core/models';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class=\"profile-container\">\n      @if (loading()) {\n        <div class=\"loading\">\n          <mat-spinner></mat-spinner>\n        </div>\n      } @else if (user()) {\n        <mat-card class=\"profile-header\">\n          <div class=\"profile-info\">\n            <div class=\"avatar\">\n              @if (user()?.avatarUrl) {\n                <img [src]=\"user()!.avatarUrl\" [alt]=\"user()!.displayName\">\n              } @else {\n                <mat-icon>account_circle</mat-icon>\n              }\n            </div>\n            \n            <div class=\"user-details\">\n              <h1>{{ user()?.displayName }}</h1>\n              <p class=\"username\">{{ '@' + user()?.username }}</p>\n              @if (user()?.bio) {\n                <p class=\"bio\">{{ user()?.bio }}</p>\n              }\n            </div>\n            \n            @if (isOwnProfile()) {\n              <button mat-raised-button color=\"primary\">\n                <mat-icon>edit</mat-icon>\n                Edit Profile\n              </button>\n            }\n          </div>\n        </mat-card>\n\n        <mat-tab-group class=\"profile-tabs\">\n          <mat-tab label=\"Posts\">\n            <div class=\"posts-grid\">\n              @if (userPosts().length === 0) {\n                <div class=\"empty-state\">\n                  <mat-icon>image_not_supported</mat-icon>\n                  <p>No posts yet</p>\n                </div>\n              } @else {\n                @for (post of userPosts(); track post.id) {\n                  <a [routerLink]=\"['/post', post.id]\" class=\"post-thumbnail\">\n                    @if (post.mediaType === 'photo') {\n                      <img [src]=\"post.mediaUrl\" [alt]=\"post.caption || 'Post'\" loading=\"lazy\">\n                    } @else {\n                      <video [src]=\"post.mediaUrl\"></video>\n                      <div class=\"video-overlay\">\n                        <mat-icon>play_circle_filled</mat-icon>\n                      </div>\n                    }\n                  </a>\n                }\n              }\n            </div>\n          </mat-tab>\n        </mat-tab-group>\n      }\n    </div>\n  `,
  styles: [`
    .profile-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .loading {
      display: flex;
      justify-content: center;
      padding: 4rem;
    }

    .profile-header {
      margin-bottom: 2rem;
      
      .profile-info {
        display: flex;
        gap: 2rem;
        align-items: flex-start;
        padding: 2rem;
        
        .avatar {
          mat-icon {
            font-size: 120px;
            width: 120px;
            height: 120px;
            color: #ccc;
          }
          
          img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            object-fit: cover;
          }
        }
        
        .user-details {
          flex: 1;
          
          h1 {
            margin: 0 0 0.5rem 0;
            font-size: 1.75rem;
          }
          
          .username {
            color: #666;
            margin: 0 0 1rem 0;
          }
          
          .bio {
            color: #333;
            line-height: 1.6;
            margin: 1rem 0 0 0;
          }
        }
      }
    }

    .profile-tabs {
      margin-top: 2rem;
    }

    .posts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      padding: 2rem 0;
      
      .post-thumbnail {
        position: relative;
        aspect-ratio: 1;
        overflow: hidden;
        border-radius: 4px;
        cursor: pointer;
        
        img, video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.2s;
        }
        
        &:hover img,
        &:hover video {
          transform: scale(1.05);
        }
        
        .video-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          
          mat-icon {
            font-size: 3rem;
            width: 3rem;
            height: 3rem;
            color: white;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          }
        }
      }
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 4rem 2rem;
      
      mat-icon {
        font-size: 4rem;
        width: 4rem;
        height: 4rem;
        color: #ccc;
        margin-bottom: 1rem;
      }
      
      p {
        color: #999;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private postService = inject(PostService);
  private authService = inject(AuthService);
  
  user = signal<User | null>(null);
  userPosts = signal<Post[]>([]);
  loading = signal(true);
  isOwnProfile = signal(false);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['userId'];
      if (userId) {
        this.loadUserProfile(userId);
      } else {
        this.loadOwnProfile();
      }
    });
  }

  private loadUserProfile(userId: string): void {
    this.loading.set(true);
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.user.set(user);
        this.isOwnProfile.set(this.authService.currentUser()?.id === userId);
        this.loadUserPosts(userId);
      },
      error: (error) => {
        console.error('Error loading user profile:', error);
        this.loading.set(false);
      }
    });
  }

  private loadOwnProfile(): void {
    const currentUser = this.authService.currentUser();
    if (currentUser) {
      this.user.set(currentUser);
      this.isOwnProfile.set(true);
      this.loadUserPosts(currentUser.id);
    }
  }

  private loadUserPosts(userId: string): void {
    this.postService.getPostsByUserId(userId).subscribe({
      next: (posts) => {
        this.userPosts.set(posts);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading user posts:', error);
        this.loading.set(false);
      }
    });
  }
}
