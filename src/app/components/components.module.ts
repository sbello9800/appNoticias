import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiaComponent } from './noticia/noticia.component';
import { NoticiasComponent } from './noticias/noticias.component';



@NgModule({
  declarations: [
    NoticiaComponent,
    NoticiasComponent

  ],
  exports: [
    NoticiasComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
