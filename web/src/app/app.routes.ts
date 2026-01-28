import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'feed',
    loadComponent: () => import('./features/feed/feed.component').then(m => m.FeedComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'profile/:userId',
    loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent)
  },
  {
    path: 'post/:postId',
    loadComponent: () => import('./features/post-detail/post-detail.component').then(m => m.PostDetailComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
