
import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from '../../interfaces/index';
import { NewsService } from "../../services/News.service"
import { IonSegment } from "@ionic/angular";
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild(IonSegment, {static: true}) segmento: IonSegment;

  noticias: Article[] = [];
  categorias: string[] = ['business','entertainment','general', 'health', 'science', 'sports', 'technology'];
  selectedCategory: string = this.categorias[1];

  constructor(private newService: NewsService) {}

  ngOnInit() {
    this.segmento.value = this.categorias[0];
    this.cargarNoticias(this.categorias[0]);
  }
  segmentChanged(event){
    this.noticias = [];
    this.cargarNoticias(event.detail.value)
  }
  cargarNoticias(categoria: string, event?){
    this.newService.getArticlesCategoria(categoria)
    .subscribe( resp => {

    this.noticias.push(...resp.articles);

    if (event) {
      event.target.complete();
    }
    })
  }

  loadData(event){
    this.cargarNoticias(this.segmento.value, event)
  }
}
