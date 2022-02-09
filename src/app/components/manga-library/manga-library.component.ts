import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Manga } from 'src/app/interfaces/Manga';
import { MangaService } from 'src/app/services/manga.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-manga-library',
  templateUrl: './manga-library.component.html',
  styleUrls: ['./manga-library.component.css']
})
export class MangaLibraryComponent implements OnInit {

  mangas: Manga[] = [];

  constructor(
      private mangaService: MangaService,
      private router: Router,
    ) { }

  ngOnInit(): void {
    this.mangaService.getMangas().subscribe(
      res => {
        this.mangas = res;
      },
      err => console.log(err)
    )
  }

  selectedManga(id: string) {
    this.router.navigate(['/manga-library/manga', id])
  }

  searchMangas(mangaName?: string): void {

}

}
