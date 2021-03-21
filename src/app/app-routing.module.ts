import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistFormComponent } from './components/artist-form/artist-form.component';
import { AuthorFormComponent } from './components/author-form/author-form.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MangaDetailsComponent } from './components/manga-details/manga-details.component';
import { MangaFormComponent } from './components/manga-form/manga-form.component';
import { MangaLibraryComponent } from './components/manga-library/manga-library.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'manga-library', component: MangaLibraryComponent },
  { path: 'manga-library/manga/:id', component: MangaDetailsComponent },
  { path: 'manga-library/new', component: MangaFormComponent },
  { path: 'author/new', component: AuthorFormComponent },
  { path: 'artist/new', component: ArtistFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
