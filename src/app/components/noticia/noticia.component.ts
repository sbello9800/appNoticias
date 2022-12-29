import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces';

import { ActionSheetController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from '../../services/Storage.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;

  constructor(private actionSheetCtrl: ActionSheetController,
              private iab: InAppBrowser,
              private social: SocialSharing,
              private storageServ: StorageService) {}

  ngOnInit() {}

  abrirNoticia(){
    const browser = this.iab.create(this.noticia.url, '_system');
  }
  async mostrarOpcion() {

    const noticiaEnFavoritos = this.storageServ.noticiaEnFavoritos(this.noticia);

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Example header',
      subHeader: 'Example subheader',
      buttons: [
        {
          text: 'Compartir',
          icon: 'share',
          handler: () => {
            this.social.share(
              this.noticia.title,
              this.noticia.source.name,
              '',
              this.noticia.url
            );
          }
        },
        {
          text: noticiaEnFavoritos ?'Eliminar de favoritos' : 'guardar en favoritos',
          icon: noticiaEnFavoritos ?'heart-half-outline' :'heart-outline',
          handler: () => {
            this.storageServ.guardarEliminarNoticia(this.noticia);
          },
        },
        {
          text: 'Cancel',
          icon: 'close-circle-outline',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

}
