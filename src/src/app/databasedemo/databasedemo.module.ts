import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DatabasedemoPage } from './databasedemo.page';

const routes: Routes = [
  {
    path: '',
    component: DatabasedemoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DatabasedemoPage]
})
export class DatabasedemoPageModule {}
