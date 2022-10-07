import { SaveVehicle, Vehicle } from './../models/vehicle';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { retryWhen } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }


  getMakes() {
    return this.http.get('https://localhost:5001/api/makes')
  }

  getFeatures() {    
    return this.http.get('https://localhost:5001/api/features')
  }
 
  create(vehicle:any){
    return this.http.post('https://localhost:5001/api/vehicles',vehicle) 
  }

  getVehicle(id:number){
    return this.http.get('https://localhost:5001/api/vehicles/'+id)
  }
    update(vehicle:SaveVehicle){
      return  this.http.put('https://localhost:5001/api/vehicles/'+vehicle.id,vehicle)
    }

   delete(id:number){
    return this.http.delete('https://localhost:5001/api/vehicles/'+id)
   } 

   getVehicles(filter:any){
    return this.http.get('https://localhost:5001/api/vehicles' +'?' +this.toQyeryString(filter))
   }

   toQyeryString(obj:any){
    var parts =[]
    
    for (var property in obj){
      var value =obj[property];     
      if(value != null && value != undefined)
      parts.push(encodeURIComponent(property)+'='+encodeURIComponent(value))     
    }
    return parts.join('&')
   }


} 

