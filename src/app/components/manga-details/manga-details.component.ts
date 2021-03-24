import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Manga } from 'src/app/interfaces/Manga';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-manga-details',
  templateUrl: './manga-details.component.html',
  styleUrls: ['./manga-details.component.css']
})
export class MangaDetailsComponent implements OnInit {
  id: string;
  manga: Manga;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private mangaService: MangaService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.mangaService.getManga(this.id).subscribe(
        (res) => {
          this.manga = res;
        },
        (err) => console.error(err)
      );
    });
  }


}
