import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../core/api.service';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { Customer } from '../shared/types';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {

  displayedColumns: string[] = ['first_name', 'last_name', 'phone', 'email', 'action'];
  dataSource!: MatTableDataSource<Customer>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private apiService: ApiService, private dialog:MatDialog) {}

  customers!: Array<Customer>;


  


  ngOnInit(): void {
    this.getCustomers();
  }

  promptConfirmation(id:number){
    let data = id;
    if(confirm("Are you sure you want to delete?")){
      this.deleteCustomerRow(id)
    }
  }


  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'Add'){
        this.getCustomers();
      }
    })
  }

  getCustomers() {
    this.apiService.getCustomersList().subscribe({
      next: (res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => console.error(err),
    });
  }


  editCustomerRow(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'Update'){
        this.getCustomers();
      }
    })
  }


  

  deleteCustomerRow(id:number){
    this.apiService.deleteCustomer(id)
    .subscribe({
      next:(res)=>{
        alert("Customer was deleted successfuly")
        
      },
      error:(err)=>{
        console.log(err);
        alert("Error while deleting customer")
        
      }
    })
    this.getCustomers();
  }

}
