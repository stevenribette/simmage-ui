import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import { ResourcesViewsCenterComponent } from './resources-views-center/resources-views-center.component';
import { ResourcesViewsListComponent } from './resources-views-list/resources-views-list.component';
import { ResourcesViewsFormComponent } from './resources-views-form/resources-views-form.component';
import { ResourcesViewsResolve } from './resources-views-resolve.guard';
import { ResourcesViewsListResolve } from './resources-views-list-resolve.guard';

export const resourcesViewsRoutes: Routes = [
  {
    path: '', component: ResourcesViewsCenterComponent, children: [
      {
        path: '',
        component: ResourcesViewsListComponent,
        resolve: { list: ResourcesViewsListResolve }
      }
    ]
  },
  {
    path: 'new', component: ResourcesViewsCenterComponent, children: [
      {
        path: '',
        component: ResourcesViewsListComponent,
        resolve: { list: ResourcesViewsListResolve }
      },
      {
        path: '',
        component: ResourcesViewsFormComponent,
        canDeactivate: [CanDeactivateGuard],
        outlet: 'details'
      }
    ]
  },
  {
    path: ':id', component: ResourcesViewsCenterComponent, children: [
      {
        path: '',
        component: ResourcesViewsListComponent,
        resolve: { list: ResourcesViewsListResolve }
      },
      {
        path: '',
        component: ResourcesViewsFormComponent,
        resolve: { resourcesViews: ResourcesViewsResolve },
  canDeactivate: [CanDeactivateGuard],
  outlet: 'details'
      }
]
  }
];

export const resourcesViewsRouting = RouterModule.forChild(resourcesViewsRoutes);
