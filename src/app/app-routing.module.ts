import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authentication/guards/auth.guard';

const routes: Routes = [
  {
    path: 'posts',
    loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  // {
  //   path: 'auth',
  //   loadChildren: () =>
  //     import('./authentication/authentication.module').then(
  //       m => m.AuthenticationModule
  //     )
  // },
  { path: '', redirectTo: 'posts', pathMatch: 'full' }
  //   { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
