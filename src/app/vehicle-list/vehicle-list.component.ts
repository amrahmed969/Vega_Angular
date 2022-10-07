import { Vehicle, KayValuePair } from './../models/vehicle';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../Services/Vehicle.service';
import { PaginationComponentComponent } from '../shared/pagination-component/pagination-component.component';
@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
 
  vehicles:Vehicle[]=[]
  allVehicles:Vehicle[]=[]
  makes:KayValuePair[]=[]
  query:any={
    pageSize:3
  }
  id:number=0
  

  constructor(private vehicleServices:VehicleService) { 
    
  }

  ngOnInit(): void {

   this.vehicleServices.getMakes().subscribe((m:any)=>this.makes=m)
       
    this.populateVehicle()   
  }

  private populateVehicle(){
    console.log("populate vehicle", this.query);
    this.vehicleServices.getVehicles(this.query)
    .subscribe((Vehicles:any) =>
    {
      console.log("populate vehicle in subscribe ", Vehicles);

      this.vehicles= Vehicles
    }
    );  
  }
    
  onFilterChange(){
    
   this.populateVehicle()

    // var vehicles = this.allVehicles;
    // if(this.filter.makeId)
    // vehicles = vehicles.filter(v=>v.make.id==this.filter.makeId)
    // this.vehicles = vehicles;
  }

  resetFilter(){
    this.query={}
    this.onFilterChange();
  }

  sortBy(colmnName:any){
    if (this.query.sotrBy ===colmnName){
      this.query.isSortAscending= !this.query.isSortAscending
    }
    else{
      this.query.sortBy=colmnName;
      this.query.isSortAscending=true;
    }
    this.populateVehicle()
  }
  onPageChange(page:any){
   console.log("Vehicle list",page);
    this.query.page = page;
    this.populateVehicle();
  }
  

}
