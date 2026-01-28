import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { PostService } from '../../core/services/post.service';
import { Post } from '../../core/models';

@Component({
  selector: 'app-feed',
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class=\"feed-container\">\n      <h1>Feed</h1>\n      \n      @if (loading()) {\n        <div class=\"loading\">\n          <mat-spinner></mat-spinner>\n        </div>\n      } @else if (posts().length === 0) {\n        <div class=\"empty-state\">\n          <mat-icon>image_not_supported</mat-icon>\n          <h2>No posts yet</h2>\n          <p>Start following people to see their posts here!</p>\n        </div>\n      } @else {\n        <div class=\"posts-grid\">\n          @for (post of posts(); track post.id) {\n            <mat-card class=\"post-card\">\n              <mat-card-header>\n                <div class=\"post-header\">\n                  <a [routerLink]=\"['/profile', post.userId]\" class=\"user-info\">\n                    <mat-icon>account_circle</mat-icon>\n                    <span>{{ post.user?.displayName || post.user?.username }}</span>\n                  </a>\n                  <span class=\"post-time\">{{ formatTime(post.createdAt) }}</span>\n                </div>\n              </mat-card-header>\n              \n              <div class=\"media-container\">\n                @if (post.mediaType === 'photo') {\n                  <img [src]=\"post.mediaUrl\" [alt]=\"post.caption || 'Post image'\" loading=\"lazy\">\n                } @else {\n                  <video [src]=\"post.mediaUrl\" controls></video>\n                }\n              </div>\n              \n              <mat-card-content>\n                @if (post.caption) {\n                  <p class=\"caption\">{{ post.caption }}</p>\n                }\n              </mat-card-content>\n              \n              <mat-card-actions>\n                <button mat-button [routerLink]=\"['/post', post.id]\">\n                  <mat-icon>comment</mat-icon>\n                  {{ post.commentsCount }} Comments\n                </button>\n              </mat-card-actions>\n            </mat-card>\n          }\n        </div>\n      }\n    </div>\n  `,
  styles: [`
    .feed-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem 1rem;
      
      h1 {
        margin-bottom: 2rem;
        color: #333;
      }
    }

    .loading, .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      
      mat-icon {
        font-size: 4rem;
        width: 4rem;
        height: 4rem;
        color: #ccc;
        margin-bottom: 1rem;
      }
      
      h2 {
        color: #666;
        margin-bottom: 0.5rem;
      }
      
      p {
        color: #999;
      }
    }

    .posts-grid {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .post-card {
      .post-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 1rem;
        
        .user-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: inherit;
          font-weight: 500;
          
          &:hover {
            color: #3f51b5;
          }
        }
        
        .post-time {
          color: #999;
          font-size: 0.875rem;
        }
      }
      
      .media-container {
        width: 100%;
        
        img, video {
          width: 100%;
          height: auto;
          display: block;
        }
      }
      
      mat-card-content {
        padding: 1rem;
        
        .caption {
          margin: 0;
          color: #333;
          line-height: 1.6;
        }
      }
    }
  `]
})
export class FeedComponent implements OnInit {
  private postService = inject(PostService);
  
  posts = signal<Post[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.loadFeed();
  }

  loadFeed(): void {
    this.loading.set(true);
    this.postService.getFeed().subscribe({
      next: (posts) => {
        this.posts.set(posts);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading feed:', error);
        this.loading.set(false);
      }
    });
  }

  formatTime(date: Date): string {
    const now = new Date();
    const postDate = new Date(date);
    const diffMs = now.getTime() - postDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  }
}
