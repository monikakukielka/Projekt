import {Component, Output} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {AddGroupPage} from "../add-group/add-group";
import {EditGroupPage} from "../edit-group/edit-group";
import {SQLite, Toast} from "ionic-native";
import {Grupa} from "../../my-objects/Grupa";
import {WordsViewPage} from "../words-view/words-view";
import {StorageService} from "../../app/storage.service";
import {Subject} from "rxjs";
import {EventEmitter} from "@angular/common/src/facade/async";
import {NavigationService} from "../../app/navigation.service";


@Component({
  selector: 'page-my-group',
  templateUrl: 'my-group.html'
})
export class MyGroupPage {


  public database: SQLite;
  public grupa: Array<Object>;
  public builtInGroups: Array<Grupa>;
  public myGroups: Array<Grupa>;

  public toDelete: boolean=false;
  public toEdit: boolean=false;
  public group_name: String='';
  public id_group_s: Number=0;
  public id_group_selected: number=0;

  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private storageService:StorageService, private navigationService : NavigationService) {



    this.storageService.subject.subscribe((value) => {
      console.log("Reload db "); // Subscription wont get
      this.myGroups=[];

         // anything at this point
      this.loadMyGroups();
    });

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
    //this.navCtrl.push(AddGroupPage);
    this.navigationService.editGroupSubject.next(AddGroupPage);

  }

  itemSelected(id:number){
    if(this.toDelete){
      console.log("TO DELETE item selected");
      this.myGroups[id].to_delete=true;
    }
  }

  editGroupSecleted(id:number) {
    if (this.toEdit) {
      for (let i = 0; i < this.myGroups.length; i++) {
        if (this.myGroups[i].id == this.myGroups[id].id) {
          this.myGroups[i].to_edit = true;
        } else {
          this.myGroups[i].to_edit = false;
        }
      }
    }
  }

  skasuj(){

    for(let i = 0; i < this.myGroups.length; i++) {
      if(this.myGroups[i].to_delete){
        console.log("Id grupy do usuniecie:  "+this.myGroups[i].id);
        //tu robie kasowanie z bazuy
        this.storageService.deleteGroup(this.myGroups[i].id);
      }

    }
  }

  goToWordsView(id:number) {


    //for (let i = 0; i < this.myGroups.length; i++) {
      this.storageService.id_group_selected=this.myGroups[id].id;
      //this.storageService.selectGroup(this.group_name);
      console.log("NAZWA GRUPY: " + this.myGroups[id].id);
    this.navigationService.editGroupSubject.next(WordsViewPage);
     // this.navCtrl.push(WordsViewPage);
    //}
  }



  removeGroup(){

    if(this.toDelete){
      this.skasuj();
      this.toDelete =false;

    }else{
      this.toDelete=true;
    }
  }



  goToEditGroup() {
    console.log("Weszłem w edycje");
    if (this.toEdit) {

      console.log("Dlugość  my groups " + this.myGroups.length);
      for (let i = 0; i < this.myGroups.length; i++) {

        console.log(" GRUPA TO EDIT " + this.myGroups[i].to_edit);
        if (this.myGroups[i].to_edit) {
          this.storageService.id_group_s=this.myGroups[i].id;

         // this.navCtrl.push(EditGroupPage);
          console.log("This notify emit");
         // this.notify.emit('Click from nested component');
          this.navigationService.editGroupSubject.next(EditGroupPage);

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
