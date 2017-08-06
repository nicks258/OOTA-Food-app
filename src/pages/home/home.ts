import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { DetailviewPage } from '../detailview/detailview';
import { CartPage } from '../cart/cart';
import { LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public dashboardlist : any;
  nextlength : any;
  user: any;
  userReady: boolean = false;
  data_stringify : any;
  data_limit : number = 6;
  data_start : number = 1;
  url : any;
  mylatitude : any;
  mylongitude : any;
  loc : any;
  constructor(public navCtrl: NavController,public nativeStorage: NativeStorage, public loadingCtrl: LoadingController,public http: Http) {
    let env = this;
    this.nativeStorage.getItem('user')
      .then(function (data){
        env.user = {
          name: data.name,
          gender: data.gender,
          picture: data.picture,
          email: data.email
        };
        console.log(env.user);
        let link = 'http://54.172.94.76:9000/api/v1/customers';
        console.log("lol"+env.user.email + "hus" + env.user.name);
        http.post(link, {"firstName":env.user.name,"email":env.user.email})
          .subscribe(data => {
            console.log("lol"+env.user.email);
          }, error => {
            console.log("Oooops!");
          });
        env.userReady = true;
      }, function(error){
        console.log(error);
      });
    this.mylatitude = 37.40879;
    this.mylongitude = -121.98857;
    this.Fetchdashboard(this.data_start, this.data_limit);

  }

  direct(x,y){
    // this.url = "http://maps.google.com/maps?saddr="+this.mylatitude+","+this.mylongitude+"&daddr="+x+","+y;
    // this.url = "https://www.google.com/maps/preview/@"+x+"," +y+",8z";
    this.url = "http://maps.google.com/maps/?q="+x+"," + y;
    console.log(this.mylatitude+","+this.mylongitude);
    window.location.href = this.url;
  }

  goto_searchpage(limit){
    this.navCtrl.push(SearchPage);
  }

  goto_cartpage(){
     this.navCtrl.setRoot(CartPage, {}, {animate: true, direction: 'forward'});
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
      .map(res => res.json())
      .subscribe(
        data => {
          console.log('ok : http://54.172.94.76:9000/api/v1/dashboard?email=surya@gmail.com&lat='+this.mylatitude+'&lng='+this.mylongitude+'&pn='+start+'&ps='+end);
          setTimeout(() => {
          this.dashboardlist = data.data;
          this.nextlength = data.data.length;
          loadingPopup.dismiss();
         }, 1000);
        },
        err => console.error(err)
      );




  }

  // public http: Http;
  //
  //   // console.log("uiip"+env.user);
  //
  // }
}
