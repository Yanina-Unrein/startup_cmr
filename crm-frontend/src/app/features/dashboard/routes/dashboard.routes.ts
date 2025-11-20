import { Routes } from "@angular/router";

const dashboardRoutes: Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        loadComponent:()=> import('../pages/dashboard/dashboard')
      }
    ]
  }
]

export default dashboardRoutes
