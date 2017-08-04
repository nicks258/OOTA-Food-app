import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DetailviewPage } from '../detailview/detailview';

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
         flag : number = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  	  //this.fetchsearch();
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

   fetchsearch(){
          console.log(this.searchQuery);
   	      if (this.searchQuery != ''){
          this.flag = 0;
	        this.http.get('http://54.172.94.76:9000/api/v1/search/'+this.searchQuery+'?lat=37.40879&lng=-121.98857')
		      .map(res => res.json())
		      .subscribe(
		        data => {
		            this.items = data.data;
                console.log(this.items);
		        },
		        err => console.error(err)
		    );
       }
       else{
          this.flag = 1;
       }
  }
}
