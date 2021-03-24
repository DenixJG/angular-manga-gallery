import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';

// Libreria para manipulacion de fechas
import * as moment from 'moment';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.css']
})
export class AuthorFormComponent implements OnInit {

  constructor(private AuthorService: AuthorService) { }

  ngOnInit(): void {
  }

  uploadAuthor(
    authorName: HTMLInputElement,
    authorLastName: HTMLInputElement,
    authorCountry: HTMLInputElement,
    authorBday: HTMLInputElement
  ): boolean {
    this.AuthorService.createAuthor(authorName.value, authorLastName.value, authorCountry.value, moment(authorBday.value, 'YYYY-MM-DD').toDate())
      .subscribe(
        res => console.log(res),
        err => console.error(err)
      )
    return false;
  }

}
