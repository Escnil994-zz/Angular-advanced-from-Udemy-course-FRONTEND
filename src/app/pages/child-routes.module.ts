import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from "./profile/profile.component";

import { SearchesComponent } from './searches/searches.component';
import { HospitalsComponent } from './maintenances/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenances/doctors/doctors.component';
import { DoctorComponent } from './maintenances/doctors/doctor.component';
import { UsersComponent } from './maintenances/users/users.component';
import { AdminGuard } from "../guards/admin.guard";




const childRoutes: Routes = [

  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Barra de progreso' } },
      { path: 'grafica1', component: Grafica1Component, data: { title: 'Gráfica' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes de cuenta' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'Perfil de usuario' } },


      //Maintenances 
      { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitales de la aplicación' } },
      { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctores de la aplicación' } },
      { path: 'doctors/:id', component: DoctorComponent, data: { title: 'Hospital seleccionado' } },
      { path: 'search/:term', component: SearchesComponent, data: { title: 'resultado de busqueda' } },

      //Admin Role 
      { path: 'users', canActivate: [AdminGuard], component: UsersComponent, data: { title: 'Usuarios de aplicación' } },



]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
