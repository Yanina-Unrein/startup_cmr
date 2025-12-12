import { Routes } from "@angular/router";

const authRoutes: Routes = [
  {
    path:'',
    children:[
      {
        path:'login',
        title:'Bienvenido, Ingresa y disfruta de nuestro servicio',
        loadComponent:()=>import('../pages/login/login')
      },
      {
        path: 'register',
        title: 'Crear cuenta nueva',
        loadComponent: () => import('../pages/register/register'),
      }
    ]
  }
]

export default authRoutes
