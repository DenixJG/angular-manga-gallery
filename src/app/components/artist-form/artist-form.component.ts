import { Component, OnInit } from '@angular/core';
import { ArtistService } from 'src/app/services/artist.service';

import * as moment from 'moment';

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.css']
})
export class ArtistFormComponent implements OnInit {

  constructor(private ArtistService: ArtistService) { }

  ngOnInit(): void {
  }

  uploadArtist(
    artistName: HTMLInputElement,
    artistLastName: HTMLInputElement,
    artistCountry: HTMLInputElement,
    artistBday: HTMLInputElement
  ): boolean {
    this.ArtistService.createArtist(
      artistName.value,
      artistLastName.value,
      artistCountry.value,
      moment(artistBday.value, 'YYYY-MM-DD').toDate()
    ).subscribe (res => console.log(res), err => console.error(err))
    return false;
  }

}
