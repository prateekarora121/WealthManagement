import {NgModule} from '@angular/core'
import {Routes,RouterModule} from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'
import { FixedDepositeComponent } from './fixed-deposite/fixed-deposite.component'
import { MutualFundsComponent } from './mutual-funds/mutual-funds.component'
import { RDepositeComponent } from './r-deposite/r-deposite.component'
import { GoalsComponent } from './goals/goals.component'
import { LoginComponent } from './login/login.component'
import { SignUpComponent } from './sign-up/sign-up.component'
import { AuthGuardService } from './Services/auth-guard.service'
import { CanLoadGuard } from './Services/can-load.guard'

const appRoutes:Routes=[
{path:"fd",component:FixedDepositeComponent,canActivate:[AuthGuardService]},
{path:"mt",component:MutualFundsComponent,canActivate:[AuthGuardService]},
{path:"rd",component:RDepositeComponent,canActivate:[AuthGuardService]},
{path:"goals",component:GoalsComponent},
{path: "admin", loadChildren:'./AdminModule/admin/admin.module#AdminModule',canLoad:[CanLoadGuard],canActivate:[AuthGuardService]},
{path:'',component:LoginComponent},
{path:'signup',component:SignUpComponent},
{path:"dashboard",component:DashboardComponent,canActivate:[AuthGuardService]},
{path:"*",component:LoginComponent}
// { path: 'adminDash', loadChildren: () => import('./AdminModule/admin/admin.module').then(m => m.AdminModule),canLoad:[CanLoadGuard] }
];
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class appRoutingModule
{

}