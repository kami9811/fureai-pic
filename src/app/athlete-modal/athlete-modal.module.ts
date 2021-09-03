import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AthleteModalPageRoutingModule } from './athlete-modal-routing.module';

import { AthleteModalPage } from './athlete-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AthleteModalPageRoutingModule
  ],
  declarations: [AthleteModalPage]
})
export class AthleteModalPageModule {}
