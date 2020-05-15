import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CanLoadGuard } from 'src/app/Services/can-load.guard';
import { FixedDepositeComponent } from 'src/app/fixed-deposite/fixed-deposite.component';

const routes: Routes = [{ path: 'admin', component: AdminComponent },
                         { path: 'dash', component: AdminDashboardComponent},
                         ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
