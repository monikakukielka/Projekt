import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the EditWord page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-word',
  templateUrl: 'edit-word.html'
})
export class EditWordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditWordPage');
  }

}
