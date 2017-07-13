import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { DetailviewPage } from '../detailview/detailview';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
     this.presentLoading();
  }
  
   goto_searchpage(){
  	this.navCtrl.push(SearchPage);
  }
  goto_detailview(){
  this.navCtrl.push(DetailviewPage);
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: 'Loading Restaurants...',
      spinner: 'circles',
      duration: 2000
    });
    loader.present();
  }

}
