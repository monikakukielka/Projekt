import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {  SQLite, Toast } from 'ionic-native';

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
  public group: Array<Object>;
  public word_pl_name: String='';

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddWordPage');
  }




  addWord(){
  if
    this.database.executeSql("INSERT INTO grupa(group_name, id_user) VALUES ('"+this.group_name +"','"+this.storageService.id_user+"')", []).then((data) => {
      console.log("INSERTED: " + JSON.stringify(data));

      this.showToast('INSERTED group','top');
      this.navCtrl.push(AddWordPage);

    }, (error) => {
      console.log("ERROR add: " + JSON.stringify(error.err));
    });

  }
}
