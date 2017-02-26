import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {StorageService} from "../../app/storage.service";

/*
  Generated class for the LearnWords page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-learn-words',
  templateUrl: 'learn-words.html'
})
export class LearnWordsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageService: StorageService) {
   // this.storageService.selectWords(this.storageService.id_group_selected);
    console.log("Construktor w learn words page");
  }
  wordToshow: string='';
  sentenceToShow : string ='';
  translationToShow : string='';
  translationSentenceToShow : string='';

  index: number = 0;
  //showPolishWords: boolean=true;

  ionViewDidLoad() {
  //  this.storageService.selectWords(this.storageService.id_group_selected);
    console.log('ionViewDidLoad LearnWordsPage');
    this.reloadWordToShow();

  }


  reloadWordToShow(){
    console.log("!!!! group words translation length "+ this.storageService.groupWordsTranslations.length);
    if(this.storageService.groupWordsTranslations.length==0){
      this.wordToshow="Brak slow w grupie";

      return;
    }
    if(this.storageService.showPolishWords)
    {
      console.log("!!!! group words translation length "+ this.storageService.groupWordsTranslations.length);
      this.wordToshow=this.storageService.groupWordsTranslations[this.index].word_pl_name;
      this.sentenceToShow= this.storageService.groupWordsTranslations[this.index].sentence_pl;
    }else{
      this.wordToshow=this.storageService.groupWordsTranslations[this.index].word_en_name;
      this.sentenceToShow =  this.storageService.groupWordsTranslations[this.index].sentence_en;
    }
  }
  showTranslation(){

    if(this.storageService.showPolishWords)
    {
      console.log("!!!! group words translation length "+ this.storageService.groupWordsTranslations.length);
      this.translationToShow=this.storageService.groupWordsTranslations[this.index].word_en_name;
      this.translationSentenceToShow= this.storageService.groupWordsTranslations[this.index].sentence_en;
    }else{
      this.translationToShow=this.storageService.groupWordsTranslations[this.index].word_pl_name;
      this.translationSentenceToShow =  this.storageService.groupWordsTranslations[this.index].sentence_pl;
    }

  }


  showNextWord(){
    console.log("showNext Word" + this.storageService.groupWordsTranslations.length +"   id"+ this.index );

    if(this.index+1<=this.storageService.groupWordsTranslations.length-1 ){

      this.index=this.index+1;
      this.translationToShow='';
      this.translationSentenceToShow='';
      this.reloadWordToShow();

    }
  }

  showBackWord(){
    if(this.index-1>=0){
      this.index=this.index-1;
      this.translationToShow='';
      this.translationSentenceToShow ='';
      this.reloadWordToShow();
    }
  }
}
