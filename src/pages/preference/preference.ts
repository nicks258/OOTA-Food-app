import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PreferencePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-preference',
  templateUrl: 'preference.html',
})
export class PreferencePage {
    items = [
    'Categories',
    'Brand',
    'color',
    'Size',
    'Price',
    'Offers',
    'More'
  ];
  
  option_data : any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
      

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferencePage');
    document.getElementById("Categories").style.color = "white";
    document.getElementById("Categories").style.backgroundColor = "#6666ff";
  }
  selected(option){
     console.log(option);
     let x = <HTMLScriptElement[]><any>document.getElementsByClassName("sidecat");
     let i;
     for (i = 0; i < x.length; i++) {
         x[i].style.color = "black";
         x[i].style.backgroundColor="white";
      }
     document.getElementById(option).style.color = "white";
     document.getElementById(option).style.backgroundColor = "#6666ff";
  }

}
