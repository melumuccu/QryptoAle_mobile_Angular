import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-pet-home',
  templateUrl: './pet-home.page.html',
  styleUrls: ['./pet-home.page.scss'],
})
export class PetHomePage implements OnInit {
  userName: string;

  /** constructor */
  constructor(private auth: AuthService) {}

  /** lifecycle - init */
  ngOnInit() {
    this.fetchUserName();
  }

  /**
   * ユーザー名を取得・セットする
   */
  fetchUserName(): void {
    this.auth.getUserData().subscribe(
      result => {
        this.userName = result.username;
      },
      error => {
        console.error(error);
      }
    );
  }
}
