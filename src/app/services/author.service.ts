import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Author } from '../interfaces/Author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private AUTHOR_URI = '/api/authors';

  constructor(private http: HttpClient) {}

  createAuthor(
    authorName: string,
    authorLastName: string,
    authorCountry: string,
    authorBday: Date
  ) {
    const authorToUpload = {
      name: authorName,
      lname: authorLastName,
      country: authorCountry,
      bday: authorBday,
    };

    return this.http.post(`${this.AUTHOR_URI}/new-author`, authorToUpload);
  }

  getAuthors() {
    return this.http.get<Author[]>(this.AUTHOR_URI)
  }
}
