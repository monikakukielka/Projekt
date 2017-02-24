
import { Injectable } from '@angular/core';
import {Platform} from "ionic-angular";
import {SQLite} from "ionic-native";
import { LoginPage } from '../pages/login/login';
import {Subject} from "rxjs";

@Injectable()
export class StorageService {
  public id_user: number=0;
  public database: SQLite;
  public id_word_en: number=0;
  public subject = new Subject();
  public id_group: number=0;
  public id_group_s: number=0;
  public id_group_selected: number = 0;

  constructor (public platform: Platform){

    this.platform.ready().then(() => {
      this.database = new SQLite();
      this.database.openDatabase({name: "data.db", location: "default"}).then(() => {

      //this.addUser(this.username, this.password);
      //this.getUserId();
      //this.refresh();
      }, (error) => {
        console.log("ERROR constructor: ", error);
      });
    });
  }

  addUserService(username, password){
    // console.log("Username: "+username);
    //console.log("Password: "+password);
    this.database.executeSql("INSERT INTO user(username, password) VALUES ('"+username +"','"+password+"')", []).then((data) => {
      console.log("INSERTED: " + JSON.stringify(data));
    }, (error) => {
      console.log("ERROR add: " + JSON.stringify(error.err));
    });
  }


  loginUserService(username,password){
    this.database.executeSql("SELECT id FROM user WHERE username='"+username+"' and password='"+password+"'" , []).then((data) => {
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
    this.database.executeSql("SELECT id FROM grupa where group_name='"+group_name+"'",[]).then((data) =>{
      this.id_group_selected=data.rows.item(0).id;
      //return this.id_group;
    },(error) =>
    {
      console.log("Nie wybrano grupy");
    });
  }


  selectWord(){
    this.database.executeSql("SELECT  id_translation FROM group_translation where id_group='"+this.id_group_selected+"'",[]).then((data) =>{

    }

  }







  /*
  console.log("Id_usera: "+ this.id_user);
  console.log("Nazwa grupy"+group_name);
  this.database.executeSql("DELETE FROM grupa WHERE group_name='"+group_name +"' AND user_id='"+this.id_user+"'", []).then((data) => {
    console.log("DELETED: " + JSON.stringify(data));
    //this.showToast('INSERTED group','top');
  }, (error) => {
    console.log("ERROR deleting grouo: " + JSON.stringify(error.err));
  });
  */



/*
  getUserId(){
    this.database.executeSql("SELECT id FROM user WHERE username='"+this.username+"' and password='"+this.password+"'" , []).then((data) => {

      // this.showToast(this.id_var,'top');
     // this.showToast('weszło','top');

      console.log(JSON.stringify(data.rows.item(0)));

     // if(data.rows.length > 0) {
        this.id_user=data.rows.item(0).id;
        //this.showToast(data.rows.item(0).id,'top');

        //this.navCtrl.push(TabsPage);
      //}



    }, (error) =>{
      console.log("Blad pobierania id uzytkownika");
    //  this.showToast('Brak uzytkonika', top);
    });


  }
 */







}
