import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import { ExampleWordsPage } from '../example-words/example-words';
import { AddGroupPage } from '../add-group/add-group';
import {AddWordPage} from "../add-word/add-word";
import {LearnWordsPage} from "../learn-words/learn-words";
import {NavigationService} from "../../app/navigation.service";
import {EditGroupPage} from "../edit-group/edit-group";
import {SQLite, Toast} from "ionic-native";
import {Grupa} from "../../my-objects/Grupa";
import {StorageService} from "../../app/storage.service";
/*
  Generated class for the Main page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'

})
export class MainPage {
  public database: SQLite;
  public grupa: Array<Object>;
  public myGroups: Array<Grupa>;
  public group_name: String='';

  constructor(public navCtrl: NavController, public navParams: NavParams, public navigationService: NavigationService, public storageService: StorageService, public platform: Platform) {
   // this.storageService.addBuildInGroup();
    this.platform.ready().then(() => {
      this.database = new SQLite();
      this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
        console.log("Open database my group");
        this.refresh();
        this.loadMyGroups();
      }, (error) => {
        console.log("ERROR constructor: ", error);
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  goToExampleDatabase(){
    this.navCtrl.push(ExampleWordsPage);
  }
  createGroup(){
    this.navCtrl.push(AddGroupPage);
  }
  goToLearnWord(){
    this.navCtrl.push(LearnWordsPage);
  }

  showToast(message, position) {
    Toast.show(message, "short", position).subscribe(
      toast => {
        console.log(toast);
      }
    );
  }


  loadMyGroups(){
    console.log("log my groups");
    this.database.executeSql("SELECT * FROM grupa WHERE built_in = 1 ", []).then((data) => {
      // this.showToast('weszło','top');
      console.log("znalazlo");
      console.log(JSON.stringify(data));

      console.log(JSON.stringify(data));
      console.log("ynalaylo cos wieceldsfdsf ");
      this.myGroups=[];

      if(data.rows.length > 0) {
        for(let i = 0; i < data.rows.length; i++) {
          console.log(data.rows.item(i).group_name);
          let myGroup: Grupa=new Grupa();
          myGroup.id=data.rows.item(i).id;
          myGroup.built_in=data.rows.item(i).built_in;
          myGroup.group_name=data.rows.item(i).group_name;
          myGroup.id_user=data.rows.item(i).id_user;
          this.myGroups.push(myGroup);

        }
      }
      console.log(JSON.stringify(data));
      console.log(JSON.stringify(this.myGroups));
      console.log("Build in gr"+this.myGroups.length);
      /*  for (var i = 0; i < data.rows.length; i++){
       let g:Grupa;
       g.id=data.rows.item(i).id;
       g.builtIn=data.rows.item(i).built_in;
       g.groupName= data
       console.log(this.group_name);
       }*/


    }, (error) =>{
      this.showToast('Brak uzytkonika', top);
    });

  }

  public refresh(){
    this.database.executeSql("SELECT * FROM grupa", []).then((data) => {
      this.grupa = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.grupa.push({
            group_name: data.rows.item(i).group_name,


            // name: data.rows.item(i).name
          });
        }
      }
    },(error) => {
      console.log("ERROR refresh: " + JSON.stringify(error));

    });
  }
}
