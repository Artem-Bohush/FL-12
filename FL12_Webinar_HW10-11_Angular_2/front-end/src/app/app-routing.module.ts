import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { AddEditFormComponent } from './components/add-edit-form/add-edit-form.component';


const routes: Routes = [
  { path: 'users', component: UsersPageComponent },
  { path: 'users/:id', component: AddEditFormComponent },
  { path: '', pathMatch: 'full', redirectTo: 'users' },
  { path: '**', redirectTo: 'users' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
