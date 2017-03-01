import { Component } from '@angular/core';
import { NavController, NavParams, Platform} from 'ionic-angular';
import {  SQLite, Toast } from 'ionic-native';
import { AddWordPage } from '../add-word/add-word';
import {StorageService} from "../../app/storage.service";
import {MyGroupPage} from "../my-group/my-group";


@Component({
  selector: 'page-add-group',
  templateUrl: 'add-group.html'
})
export class AddGroupPage {
  public database: SQLite;
  public grupa: Array<Object>;
  public group_name: String = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private storageService : StorageService) {

   /* this.platform.ready().then(() => {
      this.database = new SQLite();
      this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
        this.refresh();
      }, (error) => {
        console.log("ERROR constructor: ", error);
      });
    });
*/
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
 /* public refresh(){
    this.database.executeSql("SELECT * FROM grupa", []).then((data) => {
      this.grupa = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.grupa.push({
            group_name: data.rows.item(i).group_name,

          });
        }
      }
    },(error) => {
      console.log("ERROR refresh: " + JSON.stringify(error));

    });
  }
*/

  addGroup(group_name){
    this.storageService.addGroupService(this.group_name);
    this.navCtrl.pop();
    this.storageService.subject.next();
  }




}
