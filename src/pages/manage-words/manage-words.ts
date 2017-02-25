import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {AddWordPage} from "../add-word/add-word";
import {StorageService} from "../../app/storage.service";
import {Word_en} from "../../my-objects/Word_en";
import {Word_pl} from "../../my-objects/Word_pl";
import {Group_translation} from "../../my-objects/Group_translation";
import {Translation} from "../../my-objects/Translation";
import {SQLite} from "ionic-native";
import {Words_translation} from "../../my-objects/Words_translation";
import {EditWordPage} from "../edit-word/edit-word";


@Component({
  selector: 'page-manage-words',
  templateUrl: 'manage-words.html'
})
export class ManageWordsPage {
  public database: SQLite;
  public myWords_en: Array<Word_en>;
  public myWords_pl: Array<Word_pl>;
  public toDelete: boolean=false;
  public toEdit: boolean=false;
  public myWords_translations:Array<Words_translation> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private storageService:StorageService) {
    this.storageService.subject.subscribe((value) => {
      console.log("Reload db "); // Subscription wont get
      this.myWords_translations=[];

      // anything at this point
      this.selectWords(this.storageService.id_group_selected);
    });

    console.log("my group constructor");
    this.platform.ready().then(() => {
      this.database = new SQLite();
      this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
        console.log("Open database my group");
        //this.refresh();
       // this.loadMyGroups();
         this.selectWords(this.storageService.id_group_selected);
      }, (error) => {
        console.log("ERROR constructor: ", error);
      });
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageWordsPage');
  }



  goToAddWord(){
    this.navCtrl.push(AddWordPage);
  }


 /* itemWordSelected(id:Number){

      if(this.toDelete){
        console.log("TO DELETE item selected");
        this.myWords_translations[id].to_delete=true;
      }
    }
*/
    //this.storageService.selectWord();

  skasujWord(){

    for(let i = 0; i < this.myWords_translations.length; i++) {
      if(this.myWords_translations[i].to_delete){
        console.log("Id grupy do usuniecie:  "+this.myWords_translations[i].id_translation);
        //tu robie kasowanie z bazuy
        this.storageService.deleteWord(this.myWords_translations[i].id_translation);
      }

    }
  }

  removeWord(){
    if(this.toDelete){
      this.skasujWord();
      this.toDelete =false;

    }else{
      this.toDelete=true;
    }

  }

  editWordSecleted(id:number){
    if (this.toEdit) {
     // for (let i = 0; i < this.myWords_translations.length; i++) {
      //  if (this.myWords_translations[i].id_translation == this.myWords_translations[id].id_translation) {
          this.myWords_translations[id].to_edit = true;
        } else {
          this.myWords_translations[id].to_edit = false;
       }
      //}
    //}
  }


  goToEditWord(){
    console.log("Weszłem w edycje słowa");
    if (this.toEdit) {

      console.log("Dlugość  my translation " + this.myWords_translations.length);
      for (let i = 0; i < this.myWords_translations.length; i++) {

        console.log(" Translation to edit " + this.myWords_translations[i].to_edit);
        if (this.myWords_translations[i].to_edit) {
          this.storageService.id_translation_s=this.myWords_translations[i].id_translation;

          this.navCtrl.push(EditWordPage);
          //  }
        }
        this.toEdit = false;
      }
    }
    else{
      this.toEdit = true;
      //}
    }

  }

/*
  selectWord(){
    this.myWords_en=[];
    this.myWords_pl=[];

    var id_translation: Array<Object>;
    id_translation=[];
    //console.log("Id group_selected  "+this.storageService.id_group_selected);
    this.database.executeSql("SELECT * FROM group_translation WHERE id_group='"+ this.storageService.id_group_selected +"'",[]).then((data) =>{

      console.log("Id tłumaczenia z grup_translation "+data.rows.item(0).id);
      if(data.rows.length > 0) {
        for(let i=0; i<data.rows.length-1;i++)
        {
          // console.log(JSON.stringify(data.rows.item(i)));

          let myGroupTranslation: Group_translation=new Group_translation();
          myGroupTranslation.id_translation=data.rows.item(i).id_translation;
          myGroupTranslation.id_group=data.rows.item(i).id_group;

          console.log("Id tłumaczenia z grup_translation "+data.rows.item(i).id_translation);

          this.database.executeSql("SELECT id_word_en, id_word_pl FROM translation WHERE id='"+data.rows.item(i).id_translation+"'",[]).then((data) =>{
            let myTranslation: Translation=new Translation();
            myTranslation.id_word_pl=data.rows.item(0).id_word_pl;
            myTranslation.id_word_en=data.rows.item(0).id_word_en;

            console.log("Id słowa polskiego "+data.rows.item(0).id_word_pl);
            console.log("Id słowa angielskiego "+data.rows.item(0).id_word_en);

            this.database.executeSql("SELECT word_en_name FROM word_en WHERE id='"+data.rows.item(0).id_word_en+"'",[]).then((data) =>{
              let myWord_en: Word_en=new Word_en();
              myWord_en.word_en_name=data.rows.item(0).word_en_name;
              this.myWords_en.push(myWord_en);

              console.log("Słowo angielskie "+data.rows.item(0).word_en_name);

            },(error) =>{
              console.log("Błąd z pobraniem słowa angielskiego ")
            });

            this.database.executeSql("SELECT word_pl_name FROM word_pl WHERE id='"+data.rows.item(0).id_word_pl+"'",[]).then((data) =>{
              let myWord_pl: Word_pl=new Word_pl();
              myWord_pl.word_pl_name=data.rows.item(0).word_pl_name;
              this.myWords_pl.push(myWord_pl);
              console.log("Słowo polskie "+data.rows.item(0).word_pl_name);
            },(error) =>{
              console.log("Błąd z pobraniem słowa polskiego ")
            });

          },(error) => {
            console.log("Błąd z pobraniem id_word_en i id_word_pl from translation");
          });

        }

      }
      //

    }, (error)=>{
      console.log("Bład z selectem id_translation"+ JSON.stringify(error.err));
    });
  }

*/


  selectWords(grupaId:number){
    this.database.executeSql("SELECT word_pl_name, word_en_name, translation.id, sentence_en, sentence_pl, word_en.id, word_pl.id FROM translation JOIN word_pl ON word_pl.id = translation.id_word_pl JOIN word_en ON word_en.id =translation.id_word_en JOIN group_translation ON group_translation.id_translation=translation.id JOIN grupa ON grupa.id = group_translation.id_group WHERE grupa.id='"+grupaId+"'",[]).then((data) =>{

      console.log("Jakis tekst na poczatku "+ JSON.stringify(data.rows));
      if(data.rows.length>0) {
        for(let i=0;i<data.rows.length;i++) {
          let myWords_translation: Words_translation=new Words_translation();
          myWords_translation.word_pl_name=data.rows.item(i).word_pl_name;
          this.storageService.word_pl_name_s=myWords_translation.word_pl_name;
          myWords_translation.word_en_name=data.rows.item(i).word_en_name;
          this.storageService.word_en_name_s=myWords_translation.word_en_name;
          myWords_translation.id_translation=data.rows.item(i).id;
          myWords_translation.sentence_en=data.rows.item(i).sentence_en;
          this.storageService.sentence_en_s=myWords_translation.sentence_en;
          myWords_translation.sentence_pl=data.rows.item(i).sentence_pl;
          this.storageService.sentence_pl_s=myWords_translation.sentence_pl;
          myWords_translation.id_word_pl=data.rows.item(i).id;
          this.storageService.id_word_pl_s=myWords_translation.id_word_pl;
          myWords_translation.id_word_en=data.rows.item(i).id;
          this.storageService.id_word_en_s=myWords_translation.id_word_en;
          this.myWords_translations.push(myWords_translation);
          console.log("Słowo polskie id: "+myWords_translation.id_word_pl);
          console.log("Słowo angielskie id: "+myWords_translation.id_word_en);
          console.log("Id translacji "+ data.rows.item(i).id);
        }
      }

    },(error) =>{
      console.log("Błąd z pobraniem słów z bazy "+JSON.stringify(error));

    });

  }






}
