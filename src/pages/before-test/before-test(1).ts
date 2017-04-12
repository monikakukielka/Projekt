import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TestPage} from "../test/test";
import {StorageService} from "../../app/storage.service";

/*
  Generated class for the BeforeTest page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-before-test',
  templateUrl: 'before-test.html'
})
export class BeforeTestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageService: StorageService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BeforeTestPage');
  }
  selectPlEnTest(){
    this.storageService.showPolishWordsTest=true;
    this.navCtrl.push(TestPage);
  }

  selectEnPlTest(){
    this.storageService.showPolishWordsTest=false;
    this.navCtrl.push(TestPage);

  }
}
