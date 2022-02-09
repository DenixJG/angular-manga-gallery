import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manga } from 'src/app/interfaces/Manga';

@Injectable({
    providedIn: 'root',
})
export class SearchService {

    private SEARCH_URI = '/api/search'

    constructor(private http: HttpClient) {}

    findManga(
        name?: string
    ): Observable<Manga> {
        return this.http.get<Manga>(`${this.SEARCH_URI}?name=${name}`);
    }

}
