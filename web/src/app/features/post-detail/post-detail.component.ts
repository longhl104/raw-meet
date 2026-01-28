import { Component, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
import { Post, Comment } from '../../core/models';

@Component({
  selector: 'app-post-detail',
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class=\"post-detail-container\">\n      @if (loading()) {\n        <div class=\"loading\">\n          <mat-spinner></mat-spinner>\n        </div>\n      } @else if (post()) {\n        <div class=\"post-content\">\n          <mat-card class=\"post-card\">\n            <mat-card-header>\n              <div class=\"post-header\">\n                <a [routerLink]=\"['/profile', post()!.userId]\" class=\"user-info\">\n                  <mat-icon>account_circle</mat-icon>\n                  <span>{{ post()?.user?.displayName || post()?.user?.username }}</span>\n                </a>\n              </div>\n            </mat-card-header>\n            \n            <div class=\"media-container\">\n              @if (post()!.mediaType === 'photo') {\n                <img [src]=\"post()!.mediaUrl\" [alt]=\"post()!.caption || 'Post image'\">\n              } @else {\n                <video [src]=\"post()!.mediaUrl\" controls></video>\n              }\n            </div>\n            \n            @if (post()!.caption) {\n              <mat-card-content>\n                <p class=\"caption\">{{ post()!.caption }}</p>\n              </mat-card-content>\n            }\n          </mat-card>\n\n          <mat-card class=\"comments-section\">\n            <h2>Comments ({{ comments().length }})</h2>\n            \n            @if (isAuthenticated()) {\n              <div class=\"add-comment\">\n                <mat-form-field appearance=\"outline\" class=\"comment-input\">\n                  <mat-label>Add a comment</mat-label>\n                  <textarea matInput [formControl]=\"commentControl\" rows=\"3\"></textarea>\n                </mat-form-field>\n                <button \n                  mat-raised-button \n                  color=\"primary\" \n                  [disabled]=\"!commentControl.valid || submitting()\"\n                  (click)=\"addComment()\">\n                  Post\n                </button>\n              </div>\n            } @else {\n              <p class=\"login-prompt\">\n                <a routerLink=\"/auth/login\">Login</a> to comment\n              </p>\n            }\n            \n            <div class=\"comments-list\">\n              @if (comments().length === 0) {\n                <p class=\"empty-comments\">No comments yet. Be the first to comment!</p>\n              } @else {\n                @for (comment of comments(); track comment.id) {\n                  <div class=\"comment\">\n                    <div class=\"comment-header\">\n                      <a [routerLink]=\"['/profile', comment.userId]\" class=\"commenter\">\n                        <mat-icon>account_circle</mat-icon>\n                        <span>{{ comment.user?.displayName || comment.user?.username }}</span>\n                      </a>\n                      <span class=\"comment-time\">{{ formatTime(comment.createdAt) }}</span>\n                    </div>\n                    <p class=\"comment-content\">{{ comment.content }}</p>\n                  </div>\n                }\n              }\n            </div>\n          </mat-card>\n        </div>\n      }\n    </div>\n  `,
  styles: [`
    .post-detail-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .loading {
      display: flex;
      justify-content: center;
      padding: 4rem;
    }

    .post-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .post-card {
      .post-header {
        padding: 1rem;
        width: 100%;
        
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

    .comments-section {
      padding: 1.5rem;
      
      h2 {
        margin-top: 0;
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
      }
      
      .add-comment {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 2rem;
        
        .comment-input {
          width: 100%;
        }
        
        button {
          align-self: flex-end;
        }
      }
      
      .login-prompt {
        text-align: center;
        padding: 2rem;
        background-color: #f5f5f5;
        border-radius: 4px;
        margin-bottom: 2rem;
        
        a {
          color: #3f51b5;
          text-decoration: none;
          font-weight: 500;
          
          &:hover {
            text-decoration: underline;
          }
        }
      }
      
      .empty-comments {
        text-align: center;
        color: #999;
        padding: 2rem;
      }
      
      .comments-list {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        
        .comment {
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #eee;
          
          &:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
          
          .comment-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
            
            .commenter {
              display: flex;
              align-items: center;
              gap: 0.5rem;
              text-decoration: none;
              color: inherit;
              font-weight: 500;
              font-size: 0.875rem;
              
              mat-icon {
                font-size: 1.25rem;
                width: 1.25rem;
                height: 1.25rem;
              }
              
              &:hover {
                color: #3f51b5;
              }
            }
            
            .comment-time {
              color: #999;
              font-size: 0.75rem;
            }
          }
          
          .comment-content {
            margin: 0;
            color: #333;
            line-height: 1.6;
          }
        }
      }
    }
  `]
})
export class PostDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  private authService = inject(AuthService);
  
  post = signal<Post | null>(null);
  comments = signal<Comment[]>([]);
  loading = signal(true);
  submitting = signal(false);
  
  commentControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  
  isAuthenticated = this.authService.isAuthenticated;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const postId = params['postId'];
      if (postId) {
        this.loadPost(postId);
        this.loadComments(postId);
      }
    });
  }

  private loadPost(postId: string): void {
    this.postService.getPostById(postId).subscribe({
      next: (post) => {
        this.post.set(post);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading post:', error);
        this.loading.set(false);
      }
    });
  }

  private loadComments(postId: string): void {
    this.postService.getComments(postId).subscribe({
      next: (comments) => {
        this.comments.set(comments);
      },
      error: (error) => {
        console.error('Error loading comments:', error);
      }
    });
  }

  addComment(): void {
    if (!this.commentControl.valid || !this.post()) return;
    
    this.submitting.set(true);
    const postId = this.post()!.id;
    
    this.postService.addComment({
      postId,
      content: this.commentControl.value!
    }).subscribe({
      next: (comment) => {
        this.comments.update(comments => [comment, ...comments]);
        this.commentControl.reset();
        this.submitting.set(false);
      },
      error: (error) => {
        console.error('Error adding comment:', error);
        this.submitting.set(false);
      }
    });
  }

  formatTime(date: Date): string {
    const now = new Date();
    const commentDate = new Date(date);
    const diffMs = now.getTime() - commentDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  }
}
