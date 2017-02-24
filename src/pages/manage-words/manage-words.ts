import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AddWordPage} from "../add-word/add-word";

/*
  Generated class for the ManageWords page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-manage-words',
  templateUrl: 'manage-words.html'
})
export class ManageWordsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageWordsPage');
  }


  goToAddWord(){
    this.navCtrl.push(AddWordPage);
  }



}
