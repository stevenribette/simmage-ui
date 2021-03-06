import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';

import { objectivesRouting } from './objectives.routing';
import { ObjectiveComponent } from './objective-form/objective.component';
import { ObjectivesCenterComponent } from './objectives-center/objectives-center.component';
import { ObjectivesComponent } from './objectives-list/objectives.component';

import { ObjectiveService } from './objective.service';
import { ObjectiveResolve } from './objective-resolve.guard';
import { ObjectivesListResolve } from './objectives-list-resolve.guard'; 

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		SharedModule.forRoot(),
		objectivesRouting
	],
	declarations: [
		ObjectiveComponent,
		ObjectivesCenterComponent,
		ObjectivesComponent
	],
	providers: [
		ObjectiveService,
		ObjectiveResolve,
		ObjectivesListResolve
	]
})
export class ObjectivesModule { }
