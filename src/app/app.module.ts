import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MangaDetailsComponent } from './components/manga-details/manga-details.component';
import { MangaLibraryComponent } from './components/manga-library/manga-library.component';
import { MangaFormComponent } from './components/manga-form/manga-form.component';
import { AuthorFormComponent } from './components/author-form/author-form.component';
import { ArtistFormComponent } from './components/artist-form/artist-form.component';
import { NavigationComponent } from './components/navigation/navigation.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MaterialModules } from './material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button'



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MangaDetailsComponent,
    MangaLibraryComponent,
    MangaFormComponent,
    AuthorFormComponent,
    ArtistFormComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
