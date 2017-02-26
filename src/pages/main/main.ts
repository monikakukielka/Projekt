import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ExampleWordsPage } from '../example-words/example-words';
import { AddGroupPage } from '../add-group/add-group';
import {AddWordPage} from "../add-word/add-word";
import {LearnWordsPage} from "../learn-words/learn-words";
import {NavigationService} from "../../app/navigation.service";
import {EditGroupPage} from "../edit-group/edit-group";
/*
  Generated class for the Main page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'

})
export class MainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public navigationService: NavigationService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  goToExampleDatabase(){
    this.navCtrl.push(ExampleWordsPage);
  }
  createGroup(){
    this.navCtrl.push(AddGroupPage);
  }
  goToLearnWord(){
    this.navCtrl.push(LearnWordsPage);
  }
}
