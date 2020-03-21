import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListFormComponent } from './components/list-form/list-form.component';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { LoaderComponent } from './components/loader/loader.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { AddEditFormComponent } from './components/add-edit-form/add-edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ListFormComponent,
    ListComponent,
    ListItemComponent,
    LoaderComponent,
    UsersPageComponent,
    AddEditFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
