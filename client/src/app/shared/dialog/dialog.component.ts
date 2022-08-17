import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/api.service';
import { Customer } from '../types';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  displayedColumns: string[] = ['first_name', 'last_name', 'phone', 'email'];
  dataSource!: MatTableDataSource<Customer>;
  actionBtn: string = 'Add';
  formName: string = 'Add a Customer';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any,
  ) {}

  customers!: Array<Customer>;

  ngOnInit(): void {
    if(this.editData){
      this.formName = 'Update Customer';
      this.actionBtn = 'Update';
      this.customerForm.controls['first_name'].setValue(this.editData.first_name);
      this.customerForm.controls['last_name'].setValue(this.editData.last_name);
      this.customerForm.controls['phone'].setValue(this.editData.phone);
      this.customerForm.controls['email'].setValue(this.editData.email);
    }
    
  }

  customerForm = new FormGroup({
    first_name: new FormControl('', {
      validators: Validators.required,
    }),
    last_name: new FormControl('', {
      validators: Validators.required,
    }),
    phone: new FormControl('', {
      validators: Validators.required,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
  });

  getCustomers() {
    this.apiService.getCustomersList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => console.error(err),
    });
  }

  onSubmit() {
    if(!this.editData){
      if (!this.customerForm.valid) {
        return;
      }
  
      this.apiService.addCustomer(this.customerForm.value).subscribe({
        next: (data: Customer) => {
          alert('Customer added successfuly');
          this.getCustomers();
          this.dialogRef.close('Add');
        },
        error: (err) => {
          console.log(err);
          alert('Error in adding the customer');
        },
      });
    }else{
      this.updateCustomer()
    }
  }

  updateCustomer(){
    this.apiService.editCustomer(this.customerForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product updated successfuly");
        this.dialogRef.close('Update');
      },
      error:()=>{
        alert("Error while updating customer")
      }
    })
  }



  
  closeDialog() {
    this.dialogRef.close();
  }
}
