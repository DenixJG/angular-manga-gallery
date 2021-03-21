import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MangaService {

  private MANGA_URI = "/api/mangas"

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

}
