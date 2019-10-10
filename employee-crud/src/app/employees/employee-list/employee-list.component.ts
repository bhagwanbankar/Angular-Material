import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { EmployeesComponent } from '../employees.component';
import { EmployeeComponent } from '../employee/employee.component';
import { DialogService } from 'src/app/shared/dialog.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService: EmployeeService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogConfirmService: DialogService) { }

  listData: MatTableDataSource<any>;
  displayColumns: string[] = ['fullName', 'email', 'mobile', 'city', 'actions'];
  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  searchKey: string;
  ngOnInit() {
    this.employeeService.getEmployee().subscribe(
      list => {
        let array = list.map(items => {
          return {
            $key: items.key,
            ...items.payload.val()
          }
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.employeeService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

  onEdit(row) {
    this.employeeService.populateEmployee(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

  onDelete(key) {
    this.dialogConfirmService.openConfirmDialog('Are you sure want to delete record?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.employeeService.deleteEmployee(key);
          this.notificationService.warn('Deleted Successfully!');

        }
      });
  }

}
