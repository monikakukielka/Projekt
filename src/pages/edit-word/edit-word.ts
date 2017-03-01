import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {StorageService} from "../../app/storage.service";
import {ManageWordsPage} from "../manage-words/manage-words";
import {Words_translation} from "../../my-objects/Words_translation";

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
 /* public word_en_name : string= this.storageService.word_en_name_s;
  public word_pl_name : string=this.storageService.word_pl_name_s;
  public sentence_en : string=this.storageService.sentence_en_s;
  public sentence_pl : string=this.storageService.sentence_pl_s;
  public id_word_en :number=this.storageService.id_word_en_s;
  public id_word_pl : number =this.storageService.id_word_pl_s;*/
  public words_translations : Words_translation;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storageService:StorageService ) {
   /*this.word_en_name=this.storageService.word_en_name_s;
    this.word_pl_name=this.storageService.word_pl_name_s;
    this.sentence_en=this.storageService.sentence_en_s;
    this.sentence_pl=this.storageService.sentence_pl_s;
    this.id_word_en=this.storageService.id_word_en_s;
    this.id_word_pl=this.storageService.id_word_pl_s;
*/
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad EditWordPage');
  }

  editWord(){
    this.storageService.updateWord(this.storageService.words_translation_to_edit);
    this.navCtrl.pop();
    this.storageService.subject.next();
  }

}
