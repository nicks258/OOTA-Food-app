import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DetailviewPage } from '../detailview/detailview';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  public searchQuery: string = '';
         data_stringify : any;
         items : any;
         item : any = [];
         default : any;
         flag : number = 1;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public http: Http) {
  	  this.initial_search();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }


  resetsearch(){
    this.flag = 1;
  }

  goto_item(searchdatas){
    this.data_stringify = JSON.stringify(searchdatas);
    console.log("jabgjak : "+ this.data_stringify);
    this.navCtrl.push(DetailviewPage,{data_search : this.data_stringify});
  }


   initial_search(){
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading Restaurants...',
      spinner: 'circles'
    });
    loadingPopup.present();

    let i;
          this.http.get('http://54.172.94.76:9000/api/v1/cuisines')
          .map(res => res.json())
          .subscribe(
            data => {
                setTimeout(() => {
                this.default = data.data.cuisines;
                for (i = 0;i<7;i++){
                  console.log(this.default[i]);
                  this.item.push(this.default[i]);
                }
                loadingPopup.dismiss();
                }, 1000);
                console.log(this.default);
                console.log(this.item);
            },
            err => console.error(err)
        );
   }
   fetchsearch(){
          console.log(this.searchQuery);
          let jlength;
   	      if (this.searchQuery != ''){
          this.flag = 0;
          this.items = [{"item":{"name" : "Searching..."}}]
	        this.http.get('http://54.172.94.76:9000/api/v1/search/'+this.searchQuery+'?lat=37.40879&lng=-121.98857')
		      .map(res => res.json())
		      .subscribe(
		        data => {
		            this.items = data.data;
                jlength = this.items.length;
                if (jlength == 0)
                  this.items = [{"item":{"name" : "No Data found. Try another keyword"}}]
		        },
		        err => console.error(err)
		    );
       }
       else{
          this.flag = 1;
       }
  }
}
