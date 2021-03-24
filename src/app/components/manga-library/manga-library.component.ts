import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Manga } from 'src/app/interfaces/Manga';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-manga-library',
  templateUrl: './manga-library.component.html',
  styleUrls: ['./manga-library.component.css']
})
export class MangaLibraryComponent implements OnInit {

  mangas: Manga[] = [];

  constructor(private mangaService: MangaService, private router: Router) { }

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

}
