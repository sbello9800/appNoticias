import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Notice, Article } from '../interfaces';
import { map } from 'rxjs/operators';



const apiKey =environment.apiKey;
const apiUrl =environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  pageArticles= 0;
  pageCategoria = 0;
  categoriaActual = '';

  constructor(private http: HttpClient ) { }

  private ejecutarQuery<T>(query: string){
    query = apiUrl + query;
    return this.http.get<T>(query, {headers})
  }

  getTopArticles(){
    this.pageArticles++;
    return this.ejecutarQuery<Notice>(`/top-headlines?country=us&page=${this.pageArticles}`)
  }

  getArticlesCategoria(categoria: string){
    if (this.categoriaActual === categoria) {
      this.pageCategoria++;
    }else{
      this.pageCategoria = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<Notice>(`/top-headlines?country=us&category=${categoria}&page=${this.pageCategoria}`)
  }

}
