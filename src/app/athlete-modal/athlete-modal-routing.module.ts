import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AthleteModalPage } from './athlete-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AthleteModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AthleteModalPageRoutingModule {}
