import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'test', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'test', loadChildren: './test/test.module#TestPageModule' },
  { path: 'phone', loadChildren: './phone/phone.module#PhonePageModule' },
  { path: 'activity', loadChildren: './activity/activity.module#ActivityPageModule' },
  { path: 'visit', loadChildren: './visit/visit.module#VisitPageModule' },
  { path: 'visilt-list', loadChildren: './visilt-list/visilt-list.module#VisiltListPageModule' },
  { path: 'visit-record', loadChildren: './visit-record/visit-record.module#VisitRecordPageModule' },
  { path: 'chartdemo', loadChildren: './chartdemo/chartdemo.module#ChartdemoPageModule' },
  { path: 'qrcodescan', loadChildren: './qrcodescan/qrcodescan.module#QrcodescanPageModule' },
  { path: 'databasedemo', loadChildren: './databasedemo/databasedemo.module#DatabasedemoPageModule' },
  { path: 'uploadimg', loadChildren: './uploadimg/uploadimg.module#UploadimgPageModule' },
  { path: 'heart-rat', loadChildren: './heart-rat/heart-rat.module#HeartRatPageModule' },
  { path: 'wangluo', loadChildren: './wangluo/wangluo.module#WangluoPageModule' },  { path: 'modifyactivity', loadChildren: './modifyactivity/modifyactivity.module#ModifyactivityPageModule' },
  { path: 'modifyphone', loadChildren: './modifyphone/modifyphone.module#ModifyphonePageModule' },
  { path: 'bloodpressure', loadChildren: './bloodpressure/bloodpressure.module#BloodpressurePageModule' },
  { path: 'whr', loadChildren: './whr/whr.module#WhrPageModule' },
  { path: 'weight', loadChildren: './weight/weight.module#WeightPageModule' },
  { path: 'modifyvisit', loadChildren: './modifyvisit/modifyvisit.module#ModifyvisitPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
