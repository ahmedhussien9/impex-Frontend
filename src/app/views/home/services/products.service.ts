import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "src/app/core/auth/service/auth.service";
import { Product } from "src/app/shared/models/product.model";
import { environment } from "src/environments/environment";



@Injectable({
    providedIn: 'root'
})

export class HttpProductService {

    private baseUrl = environment.baseUrl;
    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) { }

    getProductsApi() {
        return this.httpClient.get<Product[]>(`${this.baseUrl}Product`, {
            observe: "response"
        })
    }

    addProductApi(body) {
        return this.httpClient.post(`${this.baseUrl}Product`, body, {
            observe: "response"
        })
    }

    editProductApi(body, hsCode) {
        return this.httpClient.put(`${this.baseUrl}Product/${hsCode}`, body, {
            observe: "response"
        })   
    }

    getSingleProductApi(hsCode) {
        return this.httpClient.get<Product>(`${this.baseUrl}Product/${hsCode}`, {
            observe: "response"
        })
    }
    deleteProduct(hsCode) {
        return this.httpClient.delete(`${this.baseUrl}Product/${hsCode}`,{
            observe: "response"
        })
    }

}