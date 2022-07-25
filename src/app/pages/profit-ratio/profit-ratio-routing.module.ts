import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfitRatioPage } from './profit-ratio.page';

const routes: Routes = [
  {
    path: '',
    component: ProfitRatioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfitRatioPageRoutingModule {}
