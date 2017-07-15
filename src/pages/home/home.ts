import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { DetailviewPage } from '../detailview/detailview';
import { LoadingController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public dashboardlist : any;
         nextlength : any;
         data_stringify : any;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,public http: Http) {
     this.Fetchdashboard();
  }
  
   goto_searchpage(){
  	this.navCtrl.push(SearchPage);
  }
  goto_detailview(data){
  this.data_stringify = JSON.stringify(data);
  this.navCtrl.push(DetailviewPage,{data_search : this.data_stringify});
  }
  
  Fetchdashboard(){
      let loadingPopup = this.loadingCtrl.create({
        content: 'Loading Food Items...',
        spinner: 'circles'
      });
      loadingPopup.present();
        
      this.http.get('http://54.172.94.76:9000/api/v1/dashboard?email=surya@gmail.com&lat=43.2673&lng=-113.4859')
        .map(res => res.json())
        .subscribe(
          data => {
            setTimeout(() => {
              this.dashboardlist = data.data;
              this.nextlength = data.data.length;
              loadingPopup.dismiss();
            }, 1000);
          },
          err => console.error(err)
      );   

    }

}
