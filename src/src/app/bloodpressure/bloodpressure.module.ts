import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BloodpressurePage } from './bloodpressure.page';

const routes: Routes = [
  {
    path: '',
    component: BloodpressurePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BloodpressurePage]
})
export class BloodpressurePageModule {}
