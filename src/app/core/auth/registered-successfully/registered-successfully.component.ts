import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registered-successfully',
  templateUrl: './registered-successfully.component.html',
  styleUrls: ['./registered-successfully.component.scss', './../login/login.component.scss']
})
export class RegisteredSuccessfullyComponent implements OnInit {
  registeredData = JSON.parse(localStorage.getItem("registered-data"));
  constructor() { }

  ngOnInit(): void {
  }

}
