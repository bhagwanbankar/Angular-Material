import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  departmentList: AngularFireList<any>;
  array = [];
  constructor(private firebase: AngularFireDatabase) { 
    this.departmentList = this.firebase.list('departments');
    this.departmentList.snapshotChanges().subscribe(
      list => {
        this.array = list.map(
          items => {
            return {
              $key : items.key,
              ...items.payload.val()
            }
          }
        );
      }
    );
  }
}
