import { CounterComponent } from './counter/counter.component';
import { FetchdataComponent } from './fetchdata/fetchdata.component';
import { HomeComponent } from './home/home.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
// import { count } from 'rxjs';

const routes: Routes = [
  {path:'',redirectTo:'vehicles',pathMatch:'full'},
  {path:'vehicles/new' ,component:VehicleFormComponent},
  {path:'vehicles/:id' ,component:VehicleFormComponent},
  {path:'vehicles' ,component:VehicleListComponent},
  {path:'home', component:HomeComponent},
  {path:'fetch-data', component:FetchdataComponent},
  {path:'counter', component:CounterComponent},
  {path:'**',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
