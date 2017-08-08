import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform} from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { DetailmodalPage } from '../detailmodal/detailmodal';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@IonicPage()
@Component({
  selector: 'page-detailview',
  templateUrl: 'detailview.html',
})



export class DetailviewPage {
  menu: any;
  public sdata : any;
        name : any;
        cost : any;
        dirurl : any;
        lat : any;
        long : any;
        rname : any;
        mylatitude : any;
        review : any;
        current_detail : any;
        menuItemsLength : any;
        mylongitude : any;
        restaurantInfo : any;
        menuItems       : any;
        menuDetailsToSend : any;
        menuDetailsToSendLength : any;
        nextlength :  any;
        info : any;
  data: Array<{title: string, details: string, icon: string, bgcolor: string, showDetails: boolean, value: number}> = [];
  constructor(public navCtrl: NavController, public platform: Platform, public actionSheetCtrl: ActionSheetController, public navParams: NavParams, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public geolocation: Geolocation,public http: Http) {
      this.sdata = navParams.get('data_search');
      console.log(this.sdata);
      this.sdata = JSON.parse(this.sdata);
      this.name = this.sdata.item.name;
      this.rname = this.sdata.restaurant.name;
      this.cost = this.sdata.item.cost;
      this.lat = this.sdata.lat_long[0];
      this.long = this.sdata.lat_long[1];
      this.mylatitude = navParams.get('latitude');
      this.mylongitude = navParams.get('longitude');
      console.log("Lat->" + this.lat + " " + this.long);
      // this.dirurl = "http://maps.google.com/maps?saddr="+this.mylatitude+","+this.mylongitude+"&daddr="+this.lat+","+this.long;

      this.data.push({
          title: 'Meal details and info',
          details: 'DetailmodalPage',
          icon: 'ios-add-circle-outline',
          bgcolor: '#FEFA96',
          showDetails: false,
          value: 1
        },{
          title: 'Review',
          details: 'DetailmodalPage',
          icon: 'ios-add-circle-outline',
          bgcolor: '#D7FC92',
          showDetails: false,
          value: 2
        },{
          title: 'Restaurant and menu',
          details: 'DetailmodalPage',
          icon: 'ios-add-circle-outline',
          bgcolor: '#A4FE94',
          showDetails: false,
          value: 3
        },{
          title: 'Best Match',
          details: 'DetailmodalPage',
          icon: 'ios-add-circle-outline',
          bgcolor: '#71FEB9',
          showDetails: false,
          value: 4
        });
  }

  goto_detailmodal(value){
      if (value == 3)
      {
         this.restaurantandinfo(value);
      }
      else if (value == 1){
         this.mealdetail(value);
      }
      else if (value ==2)
      {
        this.getReview(value);
      }
      else
      {
          this.navCtrl.push(DetailmodalPage, {
            value: value,
            details : this.sdata,
            current_detail : "ok"
            });
      }
      console.log(value);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailviewPage');
  }


presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Share',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Whatsapp',
          icon: !this.platform.is('ios') ? 'logo-whatsapp' : null,
          handler: () => {
            window.location.href="whatsapp://send?text=The text to share!";
            console.log('Whatsapp clicked');
          }
        },
        {
          text: 'Facebook',
          icon: !this.platform.is('ios') ? 'logo-facebook' : null,
          handler: () => {
            window.location.href="fb-messenger://share/?link= https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fsharing%2Freference%2Fsend-dialog&app_id=123456789";
            console.log('Facebook clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  direct(){
    // this.url = "http://maps.google.com/maps?saddr="+this.mylatitude+","+this.mylongitude+"&daddr="+x+","+y;
    // this.url = "https://www.google.com/maps/preview/@"+x+"," +y+",8z";
    this.dirurl = "http://maps.google.com/maps/?q="+this.lat+"," + this.long;

    // this.url = "http://maps.google.com/maps/?q="+x+"," + y;
    console.log(this.lat+","+this.long);
    window.location.href = this.dirurl;
  }

restaurantandinfo(value){
   let loadingPopup = this.loadingCtrl.create({
      content: 'Loading Restaurants...',
      spinner: 'circles'
    });
    loadingPopup.present();
       let id = this.sdata.item.restaurant_id;
       console.log(id);
       this.http.get('http://54.172.94.76:9000/api/v1/restaurants/'+id)
      .map(res => res.json())
      .subscribe(
        data => {
          // console.log('ok : http://54.172.94.76:9000/api/v1/dashboard?email=surya@gmail.com&lat='+this.mylatitude+'&lng='+this.mylongitude+'&pn='+start+'&ps='+end);
          setTimeout(() => {
            this.info = data.data;
            this.restaurantInfo = data.data.restaurant;
            this.menu =  data.data.menu;
            this.nextlength = data.data.restaurant.length;
            console.log(this.info);
            this.navCtrl.push(DetailmodalPage, {
            value: value,
            details : this.sdata,
            current_detail : this.info
            });

            loadingPopup.dismiss();
          }, 1000);
        },
        err => console.error(err)
      );
}
  getReview(value){
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading Restaurants...',
      spinner: 'circles'
    });
    loadingPopup.present();
    let id = this.sdata.item.restaurant_id;
    console.log(id);
    this.http.get('http://54.172.94.76:9000/api/v1/restaurant_reviews/'+id)
      .map(res => res.json())
      .subscribe(
        data => {
          // console.log('ok : http://54.172.94.76:9000/api/v1/dashboard?email=surya@gmail.com&lat='+this.mylatitude+'&lng='+this.mylongitude+'&pn='+start+'&ps='+end);
          setTimeout(() => {
            this.review = data.data;
            console.log(this.review);
            this.navCtrl.push(DetailmodalPage, {
              //reviewDeatils : this.review
              value: value,
              details : this.sdata,
              current_detail : this.review
            });

            loadingPopup.dismiss();
          }, 1000);
        },
        err => console.error(err)
      );
  }

mealdetail(value){
   let loadingPopup = this.loadingCtrl.create({
      content: 'Loading Restaurants...',
      spinner: 'circles'
    });
    loadingPopup.present();
       let id = this.sdata.item.restaurant_id;
       console.log(id);
       this.http.get('http://54.172.94.76:9000/api/v1/restaurants/'+id)
      .map(res => res.json())
      .subscribe(
        data => {
          // console.log('ok : http://54.172.94.76:9000/api/v1/dashboard?email=surya@gmail.com&lat='+this.mylatitude+'&lng='+this.mylongitude+'&pn='+start+'&ps='+end);
          setTimeout(() => {
            this.info = data.data;
            this.restaurantInfo = data.data.restaurant;
            this.menu =  data.data.menu;
            this.nextlength = data.data.restaurant.length;
            console.log(this.restaurantInfo);
            this.navCtrl.push(DetailmodalPage, {
            value: value,
            details : this.sdata,
            current_detail : this.menu
            });

            loadingPopup.dismiss();
          }, 1000);
        },
        err => console.error(err)
      );
      }
}
