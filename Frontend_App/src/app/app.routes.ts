import { Routes } from '@angular/router';
import { Dashboard } from './page/dashboard/dashboard';
import { VesselVisit } from './components/vessel-visit/vessel-visit';
import { DockComponent } from './components/dock/dock';
import { CraneResourceComponent } from './components/crane-resource/crane-resource';
import { TruckResourceComponent } from './components/truck-resource/truck-resource';
import { Vessel } from './components/vessel/vessel';
import { VesselTypeComponent } from './components/vesselType/vesselType';
import { WarehouseComponent } from './components/warehouse/warehouse';
import { ContainerYardComponent } from './components/container-yard/container-yard';
import { QualificationComponent } from './components/qualification/qualification';
import { OrganizationComponent } from './components/organization/organization';

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
        path: 'vessel-visit-notification', component: VesselVisit
    },
    
    {
        path: 'warehouses', component: WarehouseComponent
    },
    
    {
        path: 'container-yards', component: ContainerYardComponent
    },
    {
        path: 'crane-resources', component: CraneResourceComponent
    },
    {
        path: 'truck-resources', component: TruckResourceComponent
    },
   
    {
        path: 'docks', component: DockComponent
    },
    
    {
        path: 'vessel', component: Vessel
    },
    
    {
        path: 'vessel-type', component: VesselTypeComponent
    },
    {
        path: 'organization', component: OrganizationComponent
    },
    {
        path: 'qualifications', component: QualificationComponent
    },
    { path: '**', redirectTo: 'dashboard' }
];
