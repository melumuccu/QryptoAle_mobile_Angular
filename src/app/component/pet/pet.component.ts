import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PetService } from 'src/app/shared/services/pet.service';
import { Pet } from './pet';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss'],
})
export class PetComponent implements OnInit {
  pets: Pet[];
  private token: string;

  /** constructor */
  constructor(private petService: PetService, private auth: AuthService) {}

  /** lifecycle - init */
  ngOnInit() {
    this.token = this.auth.getIdToken();
  }

  /**
   * ペット一覧取得APIを取得する
   */
  fetchPets(): void {
    this.petService.getPets(this.token).subscribe(result => {
      this.pets = result;
      console.log(result);
    });
  }
}
