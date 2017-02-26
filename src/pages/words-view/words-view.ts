import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EditGroupPage} from "../edit-group/edit-group";
import {ManageWordsPage} from "../manage-words/manage-words";
import {LearnWordsPage} from "../learn-words/learn-words";
import {StorageService} from "../../app/storage.service";
import {BeforeLearnPage} from "../before-learn/before-learn";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageService: StorageService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad WordsViewPage');
    //popobiberanie z bazy danych listy słów dla grupy
    this.storageService.selectWords(this.storageService.id_group_selected);
  }

  goToEdit(){
    this.navCtrl.push(EditGroupPage);
  }

  goToManageTools(){
    this.navCtrl.push(ManageWordsPage);
  }

  goToStudy(){
    this.navCtrl.push(BeforeLearnPage);
  }
}
