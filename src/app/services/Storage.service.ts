import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private _localNoticias: Article[]=[];

  constructor(private storage: Storage) {
    this.init();
   }

   async init() {

    const storage = await this.storage.create();
    this._storage = storage;
    this.cargarFavoritos();
  }

  public get getLocalNoticias(){
    return [...this._localNoticias];
  }

  async guardarEliminarNoticia(noticia: Article){

    const existe = this._localNoticias.find(localNot => localNot.title === noticia.title);
    if (existe) {
      this._localNoticias = this._localNoticias.filter(localNot => localNot.title !== noticia.title);
    }else{

      this._localNoticias =[noticia, ...this._localNoticias]
    }
    this._storage.set('noticias', this._localNoticias)
  }


    noticiaEnFavoritos(noticia: Article){
      return !!this._localNoticias.find(localNot => localNot.title === noticia.title)


    }
  async cargarFavoritos(){
    try {
      const noticias=await this.storage.get('noticias');
      this._localNoticias= noticias || [];
    } catch (error) {
      console.log(error);

    }
  }

}
