import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// import { PetComponent } from '../../component/pet/pet.component';
import { PetHomePageRoutingModule } from './pet-home-routing.module';
import { PetHomePage } from './pet-home.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PetHomePageRoutingModule],
  // imports: [CommonModule, FormsModule, IonicModule, PetComponent, PetHomePageRoutingModule],
  declarations: [PetHomePage],
})
export class PetHomePageModule {}
