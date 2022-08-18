import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfitRatioPageRoutingModule } from './profit-ratio-routing.module';

import { ProfitRatioPage } from './profit-ratio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfitRatioPageRoutingModule
  ],
  declarations: [ProfitRatioPage]
})
export class ProfitRatioPageModule {}
