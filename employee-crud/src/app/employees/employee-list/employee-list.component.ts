import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { fadeInItems, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  listData: MatTableDataSource<any>;
  displayColumns : string[] = ['fullName','email','mobile','city','actions'];
  ngOnInit() {
    this.employeeService.getEmployee().subscribe(
      list=>{
        let array = list.map(items => {
            return {
              $key: items.key,
              ...items.payload.val()
            }            
          });
          this.listData = new MatTableDataSource(array);
      });
  }

}
