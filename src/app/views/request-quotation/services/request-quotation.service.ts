import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestQuotationService {
  baseUrl = environment.baseUrl;
  constructor(private _httpClient: HttpClient) {}

  createRqQuotation(body) {
    return this._httpClient.post(`${this.baseUrl}BuyerSendRFQ`, body, {
      observe: 'response',
    });
  }
}
