import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MangaService } from 'src/app/services/manga.service';
import { ArtistService } from 'src/app/services/artist.service';

import { Artist } from 'src/app/interfaces/Artist';

import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export interface Genders {
  name: string;
}

@Component({
  selector: 'app-manga-form',
  templateUrl: './manga-form.component.html',
  styleUrls: ['./manga-form.component.css'],
})
export class MangaFormComponent implements OnInit {
  file: File;
  imageToUpload: string | ArrayBuffer;

  // CHIPS OPTIONS
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true; 
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  genders: Genders[] = [];

  artists: Artist[] = [];
  allArtists: Artist[] = []; // Artistas de la base de datos

  constructor(
    private mangaService: MangaService,
    private artistService: ArtistService
  ) {}

  ngOnInit(): void {
    // TODO: Evitar guardar todo en un array y moverlo al filtrado
    this.artistService.getArtists().subscribe(
      (res) => {
        this.allArtists = res;
      },
      (err) => console.error(err)
    );
  }

  onImageSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // Leer imagen para mostrarla
      const fileReader = new FileReader();
      fileReader.onload = (e) => (this.imageToUpload = fileReader.result);
      fileReader.readAsDataURL(this.file);
    }
  }

  uploadManga(
    mangaTitle: HTMLInputElement,
    mangaAuthor: HTMLInputElement,
    mangaArtist: HTMLInputElement,
    mangaLinks: HTMLInputElement,
    mangaGenders: HTMLInputElement,
    mangaDescription: HTMLTextAreaElement
  ): boolean {
    var artistsId: Array<String> = [];

    console.log(artistsId);
    console.log(this.artists);
    console.log(this.allArtists);
    console.log(this.genders);

    // this.mangaService.createManga(
    //   mangaTitle.value,
    //   mangaAuthor.value,
    //   artistsId,
    //   mangaLinks.value,
    //   mangaGenders.value,
    //   mangaDescription.value,
    //   this.file
    // ).subscribe(

    // )

    return false;
  }

  // CHIPS LOGIC FOR GENDERS
  addGender(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.genders.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeGender(gender: Genders): void {
    const index = this.genders.indexOf(gender);
    if (index >= 0) {
      this.genders.splice(index, 1);
    }
  }

  // CHIPS LOGIC FOR ARTISTS
  addArtist(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.artists.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeArtist(artist: Artist): void {
    const index = this.artists.indexOf(artist);
    if (index >= 0) {
      this.artists.splice(index, 1);
    }
  }
}
