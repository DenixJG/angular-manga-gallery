import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MangaService } from 'src/app/services/manga.service';
import { ArtistService } from 'src/app/services/artist.service';
import { AuthorService } from 'src/app/services/author.service';

import { Artist } from 'src/app/interfaces/Artist';
import { Author } from 'src/app/interfaces/Author';

import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export interface Genders {
  name: string;
}

export interface Links {
  name: string;
  fullUrl?: string;
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

  // For gender chips
  genders: Genders[] = [];

  // For links chips
  links: Links[] = [];
  mangaLinksUrl: Array<string> = [];

  // For artist chips
  artists: Artist[] = [];
  allArtists: Artist[] = []; // Artistas de la base de datos

  // Autores de la base de datos
  allAuthors: Author[] = [];
  authorFormControl = new FormControl();
  filteredAuthorNames: Observable<string[]>;

  constructor(
    private mangaService: MangaService,
    private artistService: ArtistService,
    private authorService: AuthorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // TODO: Evitar guardar todo en un array y moverlo al filtrado
    this.artistService.getArtists().subscribe(
      (res) => {
        this.allArtists = res;
      },
      (err) => console.error(err)
    );
    this.authorService.getAuthors().subscribe(
      (res) => {
        this.allAuthors = res;
      },
      (err) => console.error(err)
    );
    this.filteredAuthorNames = this.authorFormControl.valueChanges.pipe(
      startWith(''),
      map((name: string) => this._filter(name, this.allAuthors))
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
    var artistsIdToUpload: Array<string> = []; // array de string que contiene el id de los artistas que se relacionan a un manga
    var mangaUrlToUpload: Array<string> = []; // array de string que contiene los links que se van a subir
    var gendersToUpload: Array<string> = []; // array de string de los generos de un manga que se van a subir
    var auhtorIdToUpload: string;

    this.getArtistId(artistsIdToUpload);
    this.getLinkUrlComplete(mangaUrlToUpload);
    this.getGenderName(gendersToUpload);
    auhtorIdToUpload = this.getAuthorId(mangaAuthor.value);

    this.mangaService
      .createManga(
        mangaTitle.value,
        auhtorIdToUpload,
        artistsIdToUpload,
        mangaUrlToUpload,
        gendersToUpload,
        mangaDescription.value,
        this.file
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/dashboard']);
        },
        (err) => console.log(err)
      );

    return false;
  }

  // DOMAIN EXTRACTOR FROM LINKS
  private domainExtractor(link: string): Array<string> {
    let regex = /^(\w+):\/\/([^\/]+)([^]+)$/;
    return regex.exec(link);
  }

  // Obtenemos el nombre del genero y lo guardamos en un array de string
  private getGenderName(genderArray: Array<string>): void {
    for (const gender in this.genders) {
      if (Object.prototype.hasOwnProperty.call(this.genders, gender)) {
        let element = this.genders[gender];
        genderArray.push(element.name);
      }
    }
  }

  // Obtenemos el la url competa de los links y la guardamos en un array de string
  private getLinkUrlComplete(linksArray: Array<string>) {
    for (const link in this.links) {
      if (Object.prototype.hasOwnProperty.call(this.links, link)) {
        const element = this.links[link];
        linksArray.push(element.fullUrl);
      }
    }
  }

  // Obtenemos los _id de los artistas seleccionados en los chips
  private getArtistId(artistArray: Array<string>) {
    for (const artist in this.artists) {
      if (Object.prototype.hasOwnProperty.call(this.artists, artist)) {
        const element = this.artists[artist];
        const artistSelected = this.allArtists.find(
          (a) => a.name === element.name
        );
        artistSelected?._id != undefined
          ? artistArray.push(artistSelected._id)
          : alert(`${element.name} no existe en la base de datos`);
      }
    }
  }

  // Obtenemos el _id del nombre del autor
  private getAuthorId(auhtorName: string): string {
    let authorSelected = this.allAuthors.find((a) => a.name === auhtorName);
    return authorSelected._id;
  }

  // FILTRO AUTOCOMPLETADO
  private _filter(value: string, arr: Array<any>): string[] {
    const filterValue = value.toLowerCase();
    const arrNames: string[] = [];
    arr.forEach((element) => arrNames.push(element?.name));

    return arrNames.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
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

  // CHIPS LOGIC FOR LINKS
  addLink(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.links.push({
        name: this.domainExtractor(value.trim())[2],
        fullUrl: value,
      });
      this.mangaLinksUrl.push(value); // Agregamos la url completa al array de string que se va a subir
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeLink(link: Links): void {
    const index = this.links.indexOf(link);
    const indexUrl = this.mangaLinksUrl.indexOf(link.fullUrl); // Eliminamos de las url la url correspondiente al dominio que el usuario a eliminado
    if (index >= 0) {
      this.links.splice(index, 1);
      this.mangaLinksUrl.splice(indexUrl, 1);
    }
  }

  // CHIPS LOGIC FOR ARTISTS
  addArtist(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.artists.push({ name: value.trim() });
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
