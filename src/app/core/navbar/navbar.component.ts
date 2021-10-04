import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  companyName= JSON.parse(localStorage.getItem("userData")).name
  constructor() { }

  ngOnInit(): void {
  }

}
