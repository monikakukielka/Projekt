import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {StorageService} from "../../app/storage.service";

/*
  Generated class for the Test page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage {
//  public positive_score: number=0;
 // public negative_score: number=0;

  wordToshow: string='';
  sentenceToShow : string ='';
  translationToShow : string='';
  translationSentenceToShow : string='';

 // index: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageService : StorageService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
    this.reloadWordToShow();
  }

  reloadWordToShow(){
    console.log("!!!! group words translation length "+ this.storageService.groupWordsTranslations.length);
    if(this.storageService.groupWordsTranslations.length==0){
      this.wordToshow="Brak slow w grupie";

      return;
    }
    if(this.storageService.showPolishWordsTest)
    {
      console.log("!!!! group words translation length "+ this.storageService.groupWordsTranslations.length);
      this.wordToshow=this.storageService.groupWordsTranslations[this.storageService.index].word_pl_name;
      this.sentenceToShow= this.storageService.groupWordsTranslations[this.storageService.index].sentence_pl;
    }else{
      this.wordToshow=this.storageService.groupWordsTranslations[this.storageService.index].word_en_name;
      this.sentenceToShow =  this.storageService.groupWordsTranslations[this.storageService.index].sentence_en;
    }
  }
  showTranslation(){

    if(this.storageService.showPolishWordsTest)
    {
      console.log("!!!! group words translation length "+ this.storageService.groupWordsTranslations.length);
      this.translationToShow=this.storageService.groupWordsTranslations[this.storageService.index].word_en_name;
      this.translationSentenceToShow= this.storageService.groupWordsTranslations[this.storageService.index].sentence_en;
    }else{
      this.translationToShow=this.storageService.groupWordsTranslations[this.storageService.index].word_pl_name;
      this.translationSentenceToShow =  this.storageService.groupWordsTranslations[this.storageService.index].sentence_pl;
    }

  }


  knowWord(){
    console.log("showNext Word" + this.storageService.groupWordsTranslations.length +"   id"+ this.storageService.index );
   // this.storageService.positive_score=0;
    if(this.storageService.index+1<this.storageService.groupWordsTranslations.length){

      this.storageService.index=this.storageService.index+1;
      this.translationToShow='';
      this.translationSentenceToShow='';
      this.reloadWordToShow();
      //this.storageService.positive_score=+1;
      this.storageService.positive_score=this.storageService.positive_score+1;

    }
    if(this.storageService.index+1==this.storageService.groupWordsTranslations.length){
      console.log("Positive score "+ this.storageService.positive_score);
    }

   // this.storageService.positive_score=this.storageService.positive_score+1;
  //  this.storageService.positive_score=0;
  }

  dontKnowWord(){
    if(this.storageService.index+1<this.storageService.groupWordsTranslations.length){
      //this.storageService.negative_score=0;
      this.storageService.index=this.storageService.index+1;
      this.translationToShow='';
      this.translationSentenceToShow='';
      this.reloadWordToShow();
     // this.storageService.negative_score=+1;
     // console.log("Negative score "+ this.storageService.negative_score);
      this.storageService.negative_score=this.storageService.negative_score+1;

    }
    if(this.storageService.index+1==this.storageService.groupWordsTranslations.length){
      console.log("Negative score "+ this.storageService.negative_score);
    }

  }



}
