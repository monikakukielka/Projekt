import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {  SQLite, Toast } from 'ionic-native';
import {StorageService} from "../../app/storage.service";
import {TabsPage} from "../tabs/tabs";
import {WordsViewPage} from "../words-view/words-view";

/*
  Generated class for the AddWord page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-word',
  templateUrl: 'add-word.html'
})
export class AddWordPage {
  public database: SQLite;
  public translation: Array<Object>;
  public word_pl: Array<Object>;
  public word_en: Array<Object>;
  public word_pl_name: String='';
  public word_en_name: String='';
  public id_word_en: number=0;
  public id_word_pl: number=0;
  public sentence_en: string='';
  public sentence_pl: string='';

  constructor(public navCtrl: NavController, public navParams: NavParams,  private platform: Platform, private storageService : StorageService) {
    this.platform.ready().then(() => {
      this.database = new SQLite();
      this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
        this.refresh();
      }, (error) => {
        console.log("ERROR constructor: ", error);
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddWordPage');
  }

  showToast(message, position) {
    Toast.show(message, "short", position).subscribe(
      toast => {
        console.log(toast);
      }
    );
  }


  public refresh(){
    this.database.executeSql("SELECT * FROM translation", []).then((data) => {
      this.translation = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.translation.push({
            group_name: data.rows.item(i).group_name,

          });
        }
      }
    },(error) => {
      console.log("ERROR refresh: " + JSON.stringify(error));

    });
  }


  addWord(){

    if(this.word_en_name != null && this.word_pl_name != null)
    {
      this.storageService.addWordService(this.word_en_name, this.sentence_en, this.word_pl_name, this.sentence_pl);
      console.log("Zalogowałem");
      this.navCtrl.push(WordsViewPage);

    }



 /* if(this.word_en_name != null && this.word_pl_name != null){

    this.database.executeSql("INSERT INTO word_en(word_en_name) VALUES ('"+this.word_en_name+"')", []).then((data) => {
      console.log("INSERTED: " + JSON.stringify(data));

      this.showToast('INSERTED word_en','top');
      this.database.executeSql("SELECT id FROM word_en WHERE word_en_name='"+this.word_en_name+"')", []).then((data) => {

          this.id_word_en=data.rows.item(0).id;

      }, (error) => {
        console.log("ERROR add: " + JSON.stringify(error.err));
      });

    }, (error) => {
      console.log("ERROR add: " + JSON.stringify(error.err));
    });



    this.database.executeSql("INSERT INTO word_pl(word_pl_name) VALUES ('"+this.word_pl_name+"')", []).then((data) => {
      console.log("INSERTED: " + JSON.stringify(data));

      this.showToast('INSERTED word_epl','top');

      this.database.executeSql("SELECT id FROM word_pl WHERE word_pl_name='"+this.word_pl_name+"')", []).then((data) => {

        this.id_word_pl=data.rows.item(0).id;

      }, (error) => {
        console.log("ERROR add: " + JSON.stringify(error.err));
      });


    }, (error) => {
      console.log("ERROR add: " + JSON.stringify(error.err));
    });

    this.database.executeSql("INSERT INTO translation (id_word_en, id_word_pl) VALUES ('"+this.id_word_en+"','"+this.id_word_pl"')", []).then((data) => {

      this.showToast('INSERTED into translation','top');


    }, (error) => {
      console.log("ERROR add: " + JSON.stringify(error.err));
    });




  } */


}
}
