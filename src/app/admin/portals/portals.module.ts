import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { MaterialModule } from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PortalsComponent } from './portals-center/portals.component';
import { PortalComponent } from './portal/portal.component';
import { PortalsListComponent } from './portals-list/portals-list.component';

import { portalsRouting } from './portals.routing';

import { PortalResolve } from './portal-resolve.guard';
import { PortalListResolve } from './portal-list-resolve.guard';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    portalsRouting,
  ],
  declarations: [
    PortalsComponent,
    PortalComponent,
    PortalsListComponent
    ],
  providers: [
    PortalResolve,
    PortalListResolve
  ]
})
export class PortalsModule { }
