import { Routes } from '@angular/router';
import { Dashboard } from './page/dashboard/dashboard';
import { FIFA96Component } from './components/football/fifa-96/fifa96';
import { FIFA97Component } from './components/football/fifa-97/fifa97';
import { FIFA98Component } from './components/football/fifa-98/fifa98';
import { FIFA99Component } from './components/football/fifa-99/fifa99';
import { FIFA2000Component } from './components/football/fifa-2000/fifa2000';
import { FIFA2001Component } from './components/football/fifa-2001/fifa2001';
import { FIFA2002Component } from './components/football/fifa-2002/fifa2002';
import { FIFA2003Component } from './components/football/fifa-2003/fifa2003';
import { FIFA2004Component } from './components/football/fifa-2004/fifa2004';
import { FIFA2005Component } from './components/football/fifa-2005/fifa2005';
import { FIFA06Component } from './components/football/fifa-06/fifa06';
import { FIFA07Component } from './components/football/fifa-07/fifa07';
import { FIFA08Component } from './components/football/fifa-08/fifa08';
import { FIFA09Component } from './components/football/fifa-09/fifa09';
import { FIFA10Component } from './components/football/fifa-10/fifa10';
import { FIFA11Component } from './components/football/fifa-11/fifa11';
import { FIFA12Component } from './components/football/fifa-12/fifa12';
import { FIFA13Component } from './components/football/fifa-13/fifa13';
import { FIFA14Component } from './components/football/fifa-14/fifa14';
import { FIFA15Component } from './components/football/fifa-15/fifa15';
import { FIFA16Component } from './components/football/fifa-16/fifa16';
import { FIFA17Component } from './components/football/fifa-17/fifa17';
import { FIFA18Component } from './components/football/fifa-18/fifa18';
import { FIFA19Component } from './components/football/fifa-19/fifa19';
import { FIFA20Component } from './components/football/fifa-20/fifa20';
import { FIFA21Component } from './components/football/fifa-21/fifa21';
import { FIFA22Component } from './components/football/fifa-22/fifa22';
import { FIFA23Component } from './components/football/fifa-23/fifa23';
import { EAFC24Component } from './components/football/ea-fc-24/ea-fc-24';
import { EAFC25Component } from './components/football/ea-fc-25/ea-fc-25';
import { EAFC26Component } from './components/football/ea-fc-26/ea-fc-26';
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
    {
        path: 'fifa/fifa2001', component: FIFA2001Component  
    },
    {
        path: 'fifa/fifa2002', component: FIFA2002Component
    },
    {
        path: 'fifa/fifa2003', component: FIFA2003Component
    },
    {
        path: 'fifa/fifa2004', component: FIFA2004Component
    },
    {
        path: 'fifa/fifa2005', component: FIFA2005Component
    },
    {
        path: 'fifa/fifa06', component: FIFA06Component
    },
    {
        path: 'fifa/fifa07', component: FIFA07Component
    },
    {
        path: 'fifa/fifa08', component: FIFA08Component
    },
    {
        path: 'fifa/fifa09', component: FIFA09Component
    },
    {
        path: 'fifa/fifa10', component: FIFA10Component
    },
    {
        path: 'fifa/fifa11', component: FIFA11Component
    },
    {
        path: 'fifa/fifa12', component: FIFA12Component
    },
    {
        path: 'fifa/fifa13', component: FIFA13Component
    },
    {
        path: 'fifa/fifa14', component: FIFA14Component
    },
    {
        path: 'fifa/fifa15', component: FIFA15Component
    },
    {
        path: 'fifa/fifa16', component: FIFA16Component
    },
    {
        path: 'fifa/fifa17', component: FIFA17Component
    },
    {
        path: 'fifa/fifa18', component: FIFA18Component
    },
    {
        path: 'fifa/fifa19', component: FIFA19Component
    },
    {
        path: 'fifa/fifa20', component: FIFA20Component
    },
    {
        path: 'fifa/fifa21', component: FIFA21Component
    },
    {
        path: 'fifa/fifa22', component: FIFA22Component
    },
    {
        path: 'fifa/fifa23', component: FIFA23Component
    },
    {
        path: 'fifa/eafc24', component: EAFC24Component
    },
    {
        path: 'fifa/eafc25', component: EAFC25Component
    },
    {
        path: 'fifa/eafc26', component: EAFC26Component
    },
    { path: '**', redirectTo: 'dashboard' }
];
