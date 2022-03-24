import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetHomePage } from './pet-home.page';

const routes: Routes = [
  {
    path: '',
    component: PetHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetHomePageRoutingModule {}
