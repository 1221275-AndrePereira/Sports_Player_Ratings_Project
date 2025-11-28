import { Routes } from '@angular/router';
import { Dashboard } from './page/dashboard/dashboard';
import { FIFA96Component } from './components/football/fifa-96/fifa96';
export const routes: Routes = [
    
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',

    },
    
    {
        path: 'dashboard', component: Dashboard
    },
    {
        path: 'fifa/fifa96', component: FIFA96Component  
    },
    { path: '**', redirectTo: 'dashboard' }
];
