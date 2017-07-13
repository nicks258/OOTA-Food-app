import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
         items : any;
         flag : number = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  	  //this.fetchsearch();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
   
  

   fetchsearch(){
   	      if (this.searchQuery != ''){
              this.flag = 0;
	          this.http.get('http://54.172.94.76:9000/api/v1/search/'+this.searchQuery)
		      .map(res => res.json())
		      .subscribe(
		        data => {
		            this.items = data.data;
		        },
		        err => console.error(err)
		    );
       }
  }
}
