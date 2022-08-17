import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  AddCustomer,
  Customer,
  Login,
  RegisterUser,
  User,
} from '../shared/types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private token = '';

  setToken(value: string) {
    this.token = value;
  }

  constructor(private http: HttpClient) {}

  getCustomersList(): Observable<Array<Customer>> {
    return this.GET<Array<Customer>>(`customers`);
  }

  addCustomer(customer: AddCustomer): Observable<Customer> {
    return this.POST<Customer>(`customers`, customer);
  }

  editCustomer(customer: AddCustomer, id: number) {
    return this.PUT<Customer>(`customers/${id}`, customer);
  }

  deleteCustomer(id: number) {
    return this.DELETE<Customer>(`customers/${id}`);
  }

  login(details: Login): Observable<User> {
    return this.POST<User>(`login`, details);
  }

  register(user: RegisterUser): Observable<User> {    
    return this.POST<User>(`register`, user);
  }

  GET<T>(url: string): Observable<T> {
    console.log(this.token);
    
    return this.http.get<T>(`${environment.serverUrl}/${url}`, {
      headers: { 'x-auth-token': this.token },
    });
  }

  POST<T>(url: string, data: object): Observable<T> {
    return this.http.post<T>(`${environment.serverUrl}/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': this.token,
      },
    });
  }

  PUT<T>(url: string, data: object): Observable<T> {
    return this.http.put<T>(`${environment.serverUrl}/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': this.token,
      },
    });
  }

  DELETE<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${environment.serverUrl}/${url}`, {
      headers: { 'x-auth-token': this.token },
    });
  }
}
