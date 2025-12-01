import { Routes } from '@angular/router';
import { Dashboard } from './page/dashboard/dashboard';
import { FIFA96Component } from './components/football/fifa-96/fifa96';
import { FIFA97Component } from './components/football/fifa-97/fifa97';
import { FIFA98Component } from './components/football/fifa-98/fifa98';
import { FIFA99Component } from './components/football/fifa-99/fifa99';
import { FIFA2000Component } from './components/football/fifa-2000/fifa2000';
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
    {
        path: 'fifa/fifa97', component: FIFA97Component  
    },
    {
        path: 'fifa/fifa98', component: FIFA98Component  
    },
    {
        path: 'fifa/fifa99', component: FIFA99Component  
    },
    {
        path: 'fifa/fifa2000', component: FIFA2000Component  
    },
    { path: '**', redirectTo: 'dashboard' }
];
