import { Injectable } from "@angular/core"

import { catchError, throwError, type Observable } from "rxjs"
import type { Product } from "../models/product.interface"
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private apiUrl = "http://localhost:8080/api/products/all"

  // constructor(private http: HttpClient) {}

  // getProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.apiUrl)
  // }

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Erro ao buscar produtos da API:', error);
          return throwError(() => new Error('Falha ao carregar produtos da API. Verifique se o servidor está rodando.'));
        })
      );
  }

  // getProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>('./assets/produtos.json');
  // }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`)
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`)
  }
}
