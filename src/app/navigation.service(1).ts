/**
 * Created by Monia on 2017-02-26.
 */


import { Injectable } from '@angular/core';
import {Subject} from "rxjs";


@Injectable()
export class NavigationService {
  editGroupSubject = new Subject();
  createNewGroupSubject = new Subject();
createNewWordSubject=new Subject();

  constructor (){}

}
