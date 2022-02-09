import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
      private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
      this.router.navigate(['search/', form.value.search])
  }

}
