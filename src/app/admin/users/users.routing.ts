import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { UsersComponent } from './users-center/users.component';
import { UserComponent } from './user/user.component';
import { UsersListComponent  } from './users-list/users-list.component';

import { UserResolve } from './user-resolve.guard';
import { UsersListResolve } from './users-list-resolve.guard';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';

export const usersRoutes: Routes = [
  {
    path: '', component: UsersComponent,
    children: [
      { path: '',
        pathMatch: 'full',
        component: UsersListComponent,
        resolve: { list: UsersListResolve } 
      },
      { path: 'new',
        component: UserComponent
      },
      {
        path: ':login', component: UserComponent,
        resolve: { user: UserResolve, list: UsersListResolve },
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }];

export const usersRouting = RouterModule.forChild(usersRoutes);
