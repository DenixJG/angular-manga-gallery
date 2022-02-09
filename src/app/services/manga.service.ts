import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Manga } from '../interfaces/Manga';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MangaService {

  private MANGA_URI = "/api/mangas";
  private SEARCH_URI = '/api/search';

  constructor(private http: HttpClient) { }

  createManga(
    mangaTitle: string,
    mangaAuthor: string,
    mangaArtists: Array<string>,
    mangaLinks: Array<string>,
    mangaGenders: Array<string>,
    mangaDescription: string,
    mangaImage: File
  ) {
    const fd = new FormData();
    fd.append('title', mangaTitle);
    fd.append('author', mangaAuthor);
    for (let index = 0; index < mangaArtists.length; index++) {
      fd.append('artists[]', mangaArtists[index])
    }
    for (let index = 0; index < mangaLinks.length; index++) {
      fd.append('links[]', mangaLinks[index])
    }
    for (let index = 0; index < mangaGenders.length; index++) {
      fd.append('genders[]', mangaGenders[index])
    }
    fd.append('description', mangaDescription);
    fd.append('mangaImage', mangaImage);

    return this.http.post(`${this.MANGA_URI}/new-manga`, fd)
  }

  getMangas() {
    return this.http.get<Manga[]>(this.MANGA_URI)
  }

  getManga(id: string) {
    return this.http.get<Manga>(`${this.MANGA_URI}/${id}`)
  }

  deleteManga(id: string) {
    return this.http.delete(`${this.MANGA_URI}/${id}`)
  }

  updateManga(
    id: string,
    title?: string,
    author?: string,
    artists?: Array<string>,
    links?: Array<string>,
    genders?: Array<string>,
    description?: string,
    image?: File
  ) {

    return this.http.put(`${this.MANGA_URI}/${id}`, {
      title, author, artists, links, genders, description, image
    })

  }

}
