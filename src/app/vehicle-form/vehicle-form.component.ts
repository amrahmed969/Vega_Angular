import { SaveVehicle, Vehicle } from './../models/vehicle';
import { Observable } from 'rxjs';
import * as _ from 'underscore';


import { VehicleService } from '../Services/Vehicle.service';
import { Component, getModuleFactory, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import 'rxjs/add/Observable/forkJoin';
import { ajax } from 'rxjs/ajax';
import { forkJoin } from 'rxjs';
import { EmailValidator } from '@angular/forms';
import { compilePipeFromMetadata } from '@angular/compiler';


@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[] = [];
  models: any[] = []
  features: any[] = []
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      phone: '',
      email: '',
    }


  };

  constructor(private VehicleService: VehicleService, private route: ActivatedRoute, private router: Router) {

    this.vehicle.id = Number(this.route.snapshot.paramMap.get("id"))

  }

  ngOnInit(): void {

    var source = [
      this.VehicleService.getMakes(),
      this.VehicleService.getFeatures(),
    ];

    if (this.vehicle.id)
      source.push(this.VehicleService.getVehicle(this.vehicle.id))

    forkJoin(source).subscribe((data: any) => {
      this.makes = data[0];
      this.features = data[1];

      if (this.vehicle.id) {
        this.setVehivle(data[2])
        this.populateModles();
      }
    })

    // this.VehicleService.getVehicle(this.vehicle.id).subscribe(v=>{
    // this.vehicle=v;}
    // ,
    // err=>{
    //   if(err.status==404)
    //   this.router.navigate(['/home']);
    // }
    // );

    // this.VehicleService.getMakes().subscribe((makes: any) =>
    //   this.makes = makes);

    //this.VehicleService.getFeatures().subscribe((features: any) => this.features = features)

  }
  private setVehivle(v: Vehicle) {
    this.vehicle.id = v.id
    this.vehicle.makeId = v.make.id
    this.vehicle.modelId = v.model.id
    this.vehicle.isRegistered = v.isRegistered
    this.vehicle.contact = v.contact
    this.vehicle.features = _.pluck(v.features, 'id')


  }
  onMakeChange() {

    // this.makes.find(m=> {     
    //   this.models = m.models
    //   console.log(this.models)
    // })  
    this.populateModles();    //delete this.vehicle.modelId 
    this.vehicle.modelId = 0;

    //console.log("Vehicle", this.vehicle)
  }
  private populateModles() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId)
    this.models = selectedMake ? selectedMake.models : [];
  }

  // getIfChecked(featureId: number) {
  //   if (this.vehicle.id) {
  //     return this.vehicle.features.find(x => x == featureId);
  //   }
  //   return false;
  // }

  onFeatureToggle(featrueId: any, $event: any) {
    if ($event.target.checked)
      this.vehicle.features.push(featrueId);

    else {
      var index = this.vehicle.features.indexOf(featrueId)
      this.vehicle.features.splice(index, 1)
    }
  }
  

  submit() {
    if (this.vehicle.id) {
      this.VehicleService.update(this.vehicle).subscribe(x => { })
    }

    else {
      console.log(this.vehicle)
      this.vehicle.id = 0;
      this.VehicleService.create(this.vehicle)
        .subscribe(
          x => console.log(x))
    }
  }
  delete() {
    if (confirm("are you sure"))
      this.VehicleService.delete(this.vehicle.id).subscribe(x => { })
  }

}


