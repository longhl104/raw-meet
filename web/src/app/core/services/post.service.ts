import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, Comment, CreateCommentDto } from '../models';
import { environment } from '../../../environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/posts`;

  getFeed(page: number = 1, pageSize: number = 20): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/feed`, {
      params: { page: page.toString(), pageSize: pageSize.toString() }
    });
  }

  getPostById(postId: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${postId}`);
  }

  getPostsByUserId(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/user/${userId}`);
  }

  getComments(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${postId}/comments`);
  }

  addComment(comment: CreateCommentDto): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/${comment.postId}/comments`, comment);
  }

  deletePost(postId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${postId}`);
  }
}
