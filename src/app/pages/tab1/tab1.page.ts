import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];

  constructor( private newService: NewsService) {}

  ngOnInit() {
    this.cargarNoticias();
  }
  loadData(event) {
    this.cargarNoticias(event);
  }

  cargarNoticias(event?){
    this.newService.getTopArticles()
    .subscribe( resp => {
    
    setTimeout(() => {
      if (resp.articles.length == 0) {
        event.target.disable = true;
      }
    }, 500);

    this.noticias.push(...resp.articles);
    if (event) {
      event.target.complete();
    }
    })
  }
}
