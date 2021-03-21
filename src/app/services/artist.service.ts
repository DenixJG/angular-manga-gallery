import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../interfaces/Artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private ARTIST_URI = "/api/artists"

  constructor(private http: HttpClient) { }

  createArtist(
    artistName: string,
    artistLastName: string,
    artistCountry: string,
    artistBday: Date
  ) {
    const artistToUpload = {
      name: artistName,
      lname: artistLastName,
      country: artistCountry,
      bday: artistBday,
    };

    return this.http.post(`${this.ARTIST_URI}/new-artist`, artistToUpload)
  }

  getArtists() {
    return this.http.get<Artist[]>(this.ARTIST_URI);
  }
}
