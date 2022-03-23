import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { InstructorGuard } from './guards/instructor/instructor.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./modules/courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./modules/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'learning',
    loadChildren: () =>
      import('./modules/learning/learning.module').then(
        (m) => m.LearningModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'shopping-cart',
    loadChildren: () =>
      import('./modules/shopping-cart/shopping-cart.module').then(
        (m) => m.ShoppingCartModule
      ),
  },
  {
    path: 'quiz',
    loadChildren: () =>
      import('./modules/quiz/quiz.module').then((m) => m.QuizModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'instructor',
    loadChildren: () => 
    import('./modules/instructor/instructor.module').then(
      (m) => m.InstructorModule
    ),
    canActivate: [InstructorGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
