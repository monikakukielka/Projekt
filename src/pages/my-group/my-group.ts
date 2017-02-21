import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {AddGroupPage} from "../add-group/add-group";
import {EditGroupPage} from "../edit-group/edit-group";
import {SQLite, Toast} from "ionic-native";
import {Grupa} from "../../my-objects/Grupa";


@Component({
  selector: 'page-my-group',
  templateUrl: 'my-group.html'
})
export class MyGroupPage {


  public database: SQLite;
  public grupa: Array<Object>;
  public builtInGroups: Array<Grupa>;
  public myGroups: Array<Grupa>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
    console.log("my group constructor");
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
    console.log('ionViewDidLoad MyGroupPage');

  }
  showToast(message, position) {
    Toast.show(message, "short", position).subscribe(
      toast => {
        console.log(toast);
      }
    );
  }
  goToAddGroup(){
    this.navCtrl.push(AddGroupPage);
  }
skasuj(){
  for(let i = 0; i < this.myGroups.length; i++) {
    if(this.myGroups[i].to_delete){
      //tu robie kasowanie z bazuy
    }

  }
}

loadMyGroups(){
  console.log("log my groups");
  this.database.executeSql("SELECT * FROM grupa WHERE built_in = 0", []).then((data) => {
    this.showToast('weszło','top');
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
