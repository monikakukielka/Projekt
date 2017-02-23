import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EditGroupPage} from "../edit-group/edit-group";

/*
  Generated class for the WordsView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-words-view',
  templateUrl: 'words-view.html'
})
export class WordsViewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad WordsViewPage');
  }

  goToEdit(){
    this.navCtrl.push(EditGroupPage);
  }


}
