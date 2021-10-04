import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = environment.baseUrl;
  constructor(
    private httpClient: HttpClient
  ) { }

  registerApi(body) {
    return this.httpClient.post(`${this.baseUrl}User`, body, {
      observe: 'response'
    })
  }
  loginApi(id) {
    return this.httpClient.get(`${this.baseUrl}User/${id}`, {
      observe: "response"
    })
  }

  setUserData(body) {
    localStorage.setItem('userData', JSON.stringify(body));
  }

  getUserData() {
    return JSON.parse(localStorage.getItem("userData"));
  }

  getSellerName() {
    this.getUserData().name;
  }
  // getUserData() {
  //   return this.httpClient.get(`${this.baseUrl}User/${}`)
  // }
}
