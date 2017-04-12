
import { Injectable } from '@angular/core';
import {Platform} from "ionic-angular";
import {SQLite} from "ionic-native";

import {Subject} from "rxjs";
import {Words_translation} from "../my-objects/Words_translation";

import {  Toast } from 'ionic-native';
@Injectable()
export class StorageService {
  public id_user: number=0;
  public database: SQLite;
  public id_word_en: number=0;
  public subject = new Subject();
  public id_group: number=0;
  public id_group_s: number=0;
  public id_group_selected: number = 0;
  public word_en_name: string='';
  public word_pl_name: string='';
  public id_translation_s:number=0;
  public words_translation_to_edit: Words_translation;
  public groupWordsTranslations : Array<Words_translation>;
  public showPolishWords: boolean=true;
  public showPolishWordsTest: boolean = true;
  public positive_score: number=0;
  public negative_score: number=0;
  public index: number =0;
  public score: number = 0;
  constructor (public platform: Platform){

    this.platform.ready().then(() => {
      this.database = new SQLite();
      this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
      //  this.addBuildInGroup();
      //this.addUser(this.username, this.password);
      //this.getUserId();
      //this.refresh();
      }, (error) => {
        console.log("ERROR constructor: ", error);
      });
    });
  }

  showToast(message, position) {
    Toast.show(message, "short", position).subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  addUserService(username, password){
    // console.log("Username: "+username);
    //console.log("Password: "+password);
    if(username !=null && password !=null) {
      this.database.executeSql("INSERT INTO user(username, password) VALUES ('" + username + "','" + password + "')", []).then((data) => {
        console.log("INSERTED: " + JSON.stringify(data));
      }, (error) => {
        console.log("ERROR add: " + JSON.stringify(error.err));
      });
    }
    else{
      this.showToast('Musisz podać dane!!','center');
    }
  }


  loginUserService(username,password){
      this.database.executeSql("SELECT id FROM user WHERE username='" + username + "' and password = '"+password+"'" , []).then((data) => {
        console.log("Znalazlem uzytkownika " + JSON.stringify(data));
        this.id_user=data.rows.item(0).id;
        // return this.id_user
      }, (error) =>{
        console.log(" Error login: "+ JSON.stringify(error.err));
      });
  }

  addWordService(word_en_name, sentence_en, word_pl_name, sentence_pl){
    var insertedWordEnId : Number=0;
    var insertedWordPlId : Number=0;
    var insertedTranslationId: Number = 0;

    this.database.executeSql("INSERT INTO word_en(word_en_name, sentence_en) VALUES ('" + word_en_name + "' , '" + sentence_en + "')", []).then((data) => {
      console.log("Insert word_en");
      console.log("INSERTED en: " + JSON.stringify(data));
      console.log("insertId en: " + data.insertId);
      insertedWordEnId = data.insertId;

      this.database.executeSql("INSERT INTO word_pl(word_pl_name, sentence_pl) VALUES ('" + word_pl_name + "' , '" + sentence_pl + "')", []).then((data) => {
        console.log("Insert word_pl");
        console.log("INSERTED pl: " + JSON.stringify(data));
        console.log("insertId pl: " + data.insertId);
        insertedWordPlId = data.insertId;

        this.database.executeSql("INSERT INTO translation (id_word_en, id_word_pl) VALUES ('" + insertedWordEnId + "','" + insertedWordPlId + "')", []).then((data) => {
          console.log("Insert translation");
          console.log("INSERTED: " + JSON.stringify(data));
          console.log("insertId: " + data.insertId);
          console.log('Dodano tlumaczenie:' + word_en_name + ' : ' + word_pl_name, 'top');
          insertedTranslationId=data.insertId;


          this.database.executeSql("INSERT INTO group_translation (id_group, id_translation) VALUES ('" + this.id_group_selected + "','" + insertedTranslationId + "')", []).then((data) => {
            console.log("Insert group_translation");
            console.log("INSERTED data group_translation: " + JSON.stringify(data));
            console.log("insertId group_translation: " + data.insertId);
            console.log('Dodano id_group:' + this.id_group_selected + ' i id-translation ' + insertedTranslationId, 'top');

            this.subject.next("");
          }, (error) => {
            console.log("Error add group_translation " + JSON.stringify(error.err));
          });
        }, (error) => {
          console.log("ERROR add: " + JSON.stringify(error.err));
        });
      }, (error) => {

        console.log("ERROR adding word_pl: " + JSON.stringify(error.err));
      });
    }, (error) => {
      console.log("ERROR adding word_en: " + JSON.stringify(error.err));
    });
  }

  addGroupService(group_name){
    console.log("Id_usera: "+ this.id_user);
    this.database.executeSql("INSERT INTO grupa(group_name, id_user) VALUES ('"+group_name +"','"+this.id_user+"')", []).then((data) => {
      console.log("INSERTED: " + JSON.stringify(data));

      //this.showToast('INSERTED group','top');
    }, (error) => {
      console.log("ERROR add: " + JSON.stringify(error.err));
    });
  }

  deleteGroup(id:Number) {
    this.database.openDatabase({name: "data.db", location: "default"}).then(() => {

      console.log("Id_usera: " + this.id_user);
      console.log("Nazwa grupy" + id);
      this.database.executeSql("DELETE FROM grupa WHERE id='" + id + "'", []).then((data) => {
        console.log("DELETED: " + JSON.stringify(data));
        //this.showToast('INSERTED group','top');
        this.subject.next("");
      }, (error) => {
        console.log("ERROR deleting grouo: " + JSON.stringify(error.err));
      });

    }, (error) => {
      console.log("ERROR constructor: ", error);
    });

  }



  editGroup(id:Number, group_name){
    this.database.executeSql("UPDATE grupa SET group_name = '"+group_name+"' WHERE id='"+ id +"'",[]).then((data) =>{
      console.log("UPDATED: " + JSON.stringify(data));
    },(error) => {
      console.log("Error updating group" + JSON.stringify(error.err));
    });

  }

  selectGroup(group_name){
    this.database.executeSql("SELECT id FROM grupa where group_name='"+group_name+"' and id_user='" +this.id_user+"'",[]).then((data) =>{
      this.id_group_selected=data.rows.item(0).id;
      //return this.id_group;
    },(error) =>
    {
      console.log("Nie wybrano grupy");
    });
  }



  deleteWord(id:Number){
    this.database.executeSql("DELETE FROM translation WHERE id='" + id + "'", []).then((data) => {
      console.log("DELETED: " + JSON.stringify(data));
      //this.showToast('INSERTED group','top');
      this.subject.next("");
    }, (error) => {
      console.log("ERROR deleting word: " + JSON.stringify(error.err));
    });
  }

//edycja w bazie danych słowa

  updateWord(wt:Words_translation){
    this.database.executeSql("UPDATE word_en SET word_en_name='"+wt.word_en_name+"', sentence_en='"+wt.sentence_en+"' WHERE id='" + wt.id_word_en + "'", []).then((data) => {
    },(error) => {
      console.log("Błąd z updatem word_en"+ JSON.stringify(error));
    });

    this.database.executeSql("UPDATE word_pl SET word_pl_name='"+wt.word_pl_name+"', sentence_pl='"+wt.sentence_pl+"' WHERE id='" + wt.id_word_pl + "'", []).then((data) => {
    },(error) => {
      console.log("Błąd z updatem word_pl"+ JSON.stringify(error));
    });
    this.subject.next("");
  }


//pobieranie danych z bazy
  selectWords(grupaId:number){
    console.log("Id grupy selectW "+grupaId);
    this.groupWordsTranslations =[];
    this.database.executeSql("SELECT word_pl_name, word_en_name, translation.id, sentence_en, sentence_pl, word_en.id, word_pl.id FROM translation JOIN word_pl ON word_pl.id = translation.id_word_pl JOIN word_en ON word_en.id =translation.id_word_en JOIN group_translation ON group_translation.id_translation=translation.id JOIN grupa ON grupa.id = group_translation.id_group WHERE grupa.id='"+grupaId+"'",[]).then((data) =>{

      console.log("Jakis tekst na poczatku "+ JSON.stringify(data.rows));
      if(data.rows.length>0) {
        for(let i=0;i<data.rows.length;i++) {
          let myWords_translation: Words_translation=new Words_translation();
          myWords_translation.word_pl_name=data.rows.item(i).word_pl_name;
          console.log("!!!!!! "+myWords_translation.word_pl_name);


          myWords_translation.word_en_name=data.rows.item(i).word_en_name;

          myWords_translation.id_translation=data.rows.item(i).id;

          myWords_translation.sentence_en=data.rows.item(i).sentence_en;

          myWords_translation.sentence_pl=data.rows.item(i).sentence_pl;

          myWords_translation.id_word_pl=data.rows.item(i).id;

          myWords_translation.id_word_en=data.rows.item(i).id;

          this.groupWordsTranslations.push(myWords_translation);
          console.log("Słowo polskie id: "+myWords_translation.id_word_pl);
          console.log("Słowo angielskie id: "+myWords_translation.id_word_en);
          console.log("Id translacji "+ data.rows.item(i).id);

        }
      }

    },(error) =>{
      console.log("Błąd z pobraniem słów z bazy "+JSON.stringify(error));

    });

  }


  addTest(positive_score, negative_score){
    this.database.executeSql("INSERT INTO test (positive_score, negative_score, id_group) VALUES ('"+positive_score +"','"+negative_score+"','"+this.id_group_selected+"')", []).then((data) => {
      console.log("INSERTED: " + JSON.stringify(data));

      //this.showToast('INSERTED group','top');
    }, (error) => {
      console.log("ERROR add: " + JSON.stringify(error.err));
    });

  }

/*
  addBuildInGroup(){
    this.database.executeSql("INSERT INTO grupa(id, group_name, built_in ) VALUES ('1','Szkoła','1')", []).then((data) => {
      console.log("INSERTED: " + JSON.stringify(data));

      //this.showToast('INSERTED group','top');
    }, (error) => {
      console.log("ERROR add: " + JSON.stringify(error.err));
    });
    this.database.executeSql("INSERT INTO grupa(id, group_name, built_in ) VALUES ('1','Praca','1','1')", []).then((data) => {
      console.log("INSERTED: " + JSON.stringify(data));

      //this.showToast('INSERTED group','top');
    }, (error) => {
      console.log("ERROR add: " + JSON.stringify(error.err));
    });
  }
*/
}
