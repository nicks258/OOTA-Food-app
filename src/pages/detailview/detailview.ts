import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform} from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { DetailmodalPage } from '../detailmodal/detailmodal';
import { Geolocation } from '@ionic-native/geolocation';
@IonicPage()
@Component({
  selector: 'page-detailview',
  templateUrl: 'detailview.html',
})



export class DetailviewPage {
  public sdata : any;
        name : any;
        cost : any;
        dirurl : any;
        lat : any;
        long : any;
        rname : any;
        mylatitude : any;
        mylongitude : any;
  data: Array<{title: string, details: string, icon: string, bgcolor: string, showDetails: boolean, value: number}> = [];
  constructor(public navCtrl: NavController, public platform: Platform, public actionSheetCtrl: ActionSheetController, public navParams: NavParams, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public geolocation: Geolocation) {
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
      this.dirurl = "http://maps.google.com/maps?saddr="+this.mylatitude+","+this.mylongitude+"&daddr="+this.lat+","+this.long;

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
      console.log(value);
      this.navCtrl.push(DetailmodalPage, {
       value: value,
       details : this.sdata
    });
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




}
