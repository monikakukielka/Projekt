import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {StorageService} from "../../app/storage.service";
import {LearnWordsPage} from "../learn-words/learn-words";

/*
  Generated class for the BeforeLearn page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-before-learn',
  templateUrl: 'before-learn.html'
})
export class BeforeLearnPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageService: StorageService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BeforeLearnPage');
  }

  selectPlEn(){
    this.storageService.showPolishWords=true;
    this.navCtrl.push(LearnWordsPage);
  }

  selectEnPl(){
    this.storageService.showPolishWords=false;
    this.navCtrl.push(LearnWordsPage);

  }

}
