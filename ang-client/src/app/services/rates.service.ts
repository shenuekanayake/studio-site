import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SERVER_URL } from '../shared/constants/url';

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  constructor(private http:HttpClient,  private toastrService:ToastrService) { }

  getRateOfItem(id:string):Observable<any[]>{
    return this.http.get<any>(SERVER_URL+'/foods/rate/'+id);
  }

  addRate(rate:any){
    return this.http.patch(SERVER_URL+'/foods/rate/'+rate.item, rate);
  }
}
