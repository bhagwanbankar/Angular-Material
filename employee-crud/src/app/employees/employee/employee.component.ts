import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { DepartmentService } from 'src/app/shared/department.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService:EmployeeService,
              private deparmentService: DepartmentService,
              private notificationService : NotificationService,
              private dialogRef: MatDialogRef<EmployeeComponent>) { }

  private departments = [
    {id: 1, value: 'Dep 1'},
    {id: 2, value: 'Dep 2'},
    {id: 3, value: 'Dep 3'},
    {id: 4, value: 'Dep 4'}
  ];

  ngOnInit() {
    this.employeeService.getEmployee();
  }
  onClear(){
    console.log("OnClear Clicked");
    this.employeeService.form.reset();
    this.employeeService.initializeFormGroup();
    this.notificationService.successMsg("Submitted Successfully");
  }

  onSubmit(){
    if(this.employeeService.form.valid){
      if(!this.employeeService.form.get('$key').value)
        this.employeeService.insertEmployee(this.employeeService.form.value);
      else
        this.employeeService.updateEmployee(this.employeeService.form.value);
      this.employeeService.form.reset();
      this.employeeService.initializeFormGroup();
      this.notificationService.successMsg(":: Submitted Successfully");
      this.onClose();
    }
  }
  onClose(){
    this.employeeService.form.reset();
    this.employeeService.initializeFormGroup();
    this.dialogRef.close();
  }
}
