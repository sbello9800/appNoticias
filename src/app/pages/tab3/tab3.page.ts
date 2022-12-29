import { Component } from '@angular/core';
import { StorageService } from '../../services/Storage.service';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  get noticias(): Article[]{
    return this.storageServ.getLocalNoticias;
  }
  constructor(private storageServ: StorageService) {}

}
