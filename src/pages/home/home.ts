import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { DetailviewPage } from '../detailview/detailview';
import { LoadingController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public dashboardlist : any;
         nextlength : any;
         data_stringify : any;
         data_limit : number = 6;
         data_start : number = 1;
         url : any;
         mylatitude : any;
         mylongitude : any;
         loc : any;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,public http: Http, private geolocation: Geolocation) {
                 // this.loc = this.geolocation.getCurrentPosition();
                 // console.log(JSON.stringify(this.loc));
                 // console.log(this.loc.coords.latitude);
                 // console.log(this.loc.coords.longitude);
                 // this.mylatitude = resp.coords.latitude;
                 // this.mylongitude = resp.coords.longitude;
                 // console.log(this.mylatitude);
                 // console.log(this.mylongitude);
                 //this.Fetchdashboard(this.data_start, this.data_limit);

                 //this.Fetchdashboard(this.data_start, this.data_limit);
                  let loadingPopup = this.loadingCtrl.create({
                    content: 'Fetching Location...',
                    spinner: 'circles'
                  });
                  loadingPopup.present();

                 let watch = this.geolocation.watchPosition();
                  watch.subscribe((data) => {
                       console.log(data.coords.latitude);
                       console.log(data.coords.longitude);
                       this.mylatitude = data.coords.latitude;
                       this.mylongitude = data.coords.longitude;
                       loadingPopup.dismiss();
                       this.Fetchdashboard(this.data_start, this.data_limit);
                  });
  }

  direct(x,y){
     this.url = "http://maps.google.com/maps?saddr="+this.mylatitude+","+this.mylongitude+"&daddr="+x+","+y;
     console.log(this.mylatitude+","+this.mylongitude);
     window.location.href = this.url;
  }

   goto_searchpage(limit){
  	this.navCtrl.push(SearchPage);
  }
  goto_detailview(data){
  this.data_stringify = JSON.stringify(data);
  this.navCtrl.push(DetailviewPage,{data_search : this.data_stringify, latitude : this.mylatitude , longitude : this.mylongitude});
  }

  loadmore(){
    this.data_limit += 6;
    this.data_start +=0;
    this.Fetchdashboard(this.data_start, this.data_limit);
  }

  Fetchdashboard(start, end){
      let loadingPopup = this.loadingCtrl.create({
        content: 'Loading Restaurants...',
        spinner: 'circles'
      });
      loadingPopup.present();


      this.http.get('http://54.172.94.76:9000/api/v1/dashboard?email=surya@gmail.com&lat='+this.mylatitude+'&lng='+this.mylongitude+'&pn='+start+'&ps='+end)
        // this.http.get('http://54.172.94.76:9000/api/v1/dashboard?email=surya@gmail.com&lat= 37.40879&lng=-121.98857&pn='+start+'&ps='+end)
        .map(res => res.json())
        .subscribe(
          data => {
            setTimeout(() => {
              console.log('ok : http://54.172.94.76:9000/api/v1/dashboard?email=surya@gmail.com&lat='+this.mylatitude+'&lng='+this.mylongitude+'&pn='+start+'&ps='+end);
              this.dashboardlist = data.data;
              this.nextlength = data.data.length;
              console.log(this.nextlength);
            }, 4000);
          },
          err => console.error(err)
      );
     loadingPopup.dismiss();



    }

}
