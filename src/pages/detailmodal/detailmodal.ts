import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PreferencePage } from '../preference/preference';
import { LoadingController } from 'ionic-angular';

import { Http } from '@angular/http';
@IonicPage()
@Component({
  selector: 'page-detailmodal',
  templateUrl: 'detailmodal.html',
})
export class DetailmodalPage {
  restaurantInfo: any;
  data: Array<{value: number}> = [];
  details : any;
  info : any;
  nextlength : any;
  detaildata : any;
  url : any;
  rating : any;
  mealdetails : any;
  menuItems : any;
  bgcol: any;
  public value;
  reviewInfo : any;
  public menuDeatils: any;
  public menuDeatilsLength: any;
  public len : any;
  public mealinfoarraydesc : any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public loadingCtrl: LoadingController,public http: Http) {
     this.value = navParams.get("value");
     this.details = navParams.get("details");
    //this.reviewInfo = navParams.get("reviewDeatils");
    this.info = navParams.get("current_detail");
    console.log(JSON.stringify(this.details));
    // this.rating = this.details.restaurant.rating;
    //  this.mealdetails = this.details;
     // console.log(this.rating);
     // console.log(this.value);
     // console.log(this.info);
     this.len = this.info.length;
     // console.log(this.len);

    //console.log("here->" + JSON.stringify(this.reviewInfo));
     for(let i=0;i<this.len;i++)
     {
             this.mealinfoarraydesc.push(this.info[i].item);
     }

     console.log(this.len);
     this.data.push({
          value: this.value
        })
     console.log(this.value);
     if (this.value == 1)
     {
         this.bgcol ="#FEF9D9";
     }
     else if(this.value == 2){
          this.bgcol = "#DEF9D6";
     }
     else if(this.value == 3){
          this.bgcol = "#B9F496";
     }
     else if(this.value == 4){
          this.bgcol = "#ECFCB1";
     }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailmodalPage');
    document.getElementById("ioncontent").style.backgroundColor = this.bgcol ;
  }

  // direct(){
  //   // this.url = "http://maps.google.com/maps?saddr="+this.mylatitude+","+this.mylongitude+"&daddr="+x+","+y;
  //   // this.url = "https://www.google.com/maps/preview/@"+x+"," +y+",8z";
  //   this.dirurl = "http://maps.google.com/maps/?q="+this.lat+"," + this.long;
  //
  //   // this.url = "http://maps.google.com/maps/?q="+x+"," + y;
  //   console.log(this.lat+","+this.long);
  //   window.location.href = this.dirurl;
  // }
  goto_preference(){
     this.navCtrl.push(PreferencePage);
  }
  // fetchRestaurantInfo(){
  //   let loadingPopup = this.loadingCtrl.create({
  //     content: 'Loading Restaurants...',
  //     spinner: 'circles'
  //   });
  //   loadingPopup.present();


  //   this.http.get('http://54.172.94.76:9000/api/v1/restaurants/76447')
  //     .map(res => res.json())
  //     .subscribe(
  //       data => {
  //         // console.log('ok : http://54.172.94.76:9000/api/v1/dashboard?email=surya@gmail.com&lat='+this.mylatitude+'&lng='+this.mylongitude+'&pn='+start+'&ps='+end);
  //         setTimeout(() => {
  //           this.restaurantInfo = data.data.restaurant;
  //           this.nextlength = data.data.restaurant.length;
  //           console.log(this.restaurantInfo);
  //           loadingPopup.dismiss();
  //         }, 1000);
  //       },
  //       err => console.error(err)
  //     );




  // }
  direct(x,y){
    // this.url = "http://maps.google.com/maps?saddr="+this.mylatitude+","+this.mylongitude+"&daddr="+x+","+y;
    // this.url = "https://www.google.com/maps/preview/@"+x+"," +y+",8z";
    this.url = "http://maps.google.com/maps/?q="+x+"," + y;

    // this.url = "http://maps.google.com/maps/?q="+x+"," + y;
    console.log(x,y);
    window.location.href = this.url;
  }
}
