import { Component } from '@angular/core';
import { NavController, NavParams, Platform} from 'ionic-angular';
import {  SQLite, Toast } from 'ionic-native';
import { AddWordPage } from '../add-word/add-word';
import {StorageService} from "../../app/storage.service";
/*
  Generated class for the AddGroup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-group',
  templateUrl: 'add-group.html'
})
export class AddGroupPage {
  public database: SQLite;
  public group: Array<Object>;
  public group_name: String = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private storageService : StorageService) {

    this.platform.ready().then(() => {
      this.database = new SQLite();
      this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
        this.refresh();
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGroupPage');
  }
  public refresh(){
    this.database.executeSql("SELECT * FROM group", []).then((data) => {
      this.group = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.group.push({
            group_name: data.rows.item(i).group_name,

          });
        }
      }
    },(error) => {
      console.log("ERROR refresh: " + JSON.stringify(error));

    });
  }


  addGroup(){

    this.database.executeSql("INSERT INTO grupa(group_name, id_user) VALUES ('"+this.group_name +"','"+this.storageService.id_user+"')", []).then((data) => {
      console.log("INSERTED: " + JSON.stringify(data));

      this.showToast('INSERTED group','top');
      this.navCtrl.push(AddWordPage);

    }, (error) => {
      console.log("ERROR add: " + JSON.stringify(error.err));
    });

  }




}
