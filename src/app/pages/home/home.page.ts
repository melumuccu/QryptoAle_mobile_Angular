import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';

type Balance = {
  crypto: string;
  available: string;
  onOrder: string;
};
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  balances: Balance[];

  /** コンストラクタ */
  constructor(private api: ApiService) {}

  /** 初期化 */
  ngOnInit() {
    this.fetchAllBalances().subscribe(
      balances => {
        console.log('file: home.page.ts => line 25 => ngOnInit => balances', balances);
        this.balances = balances;
      },
      error => {
        console.error(error);
      }
    );
  }

  /**
   * 全通貨の現在保有額を取得
   *
   * @returns response
   */
  fetchAllBalances(): Observable<Balance[]> {
    const ob = new Observable<Balance[]>(observable => {
      this.api.get<Balance[]>('/balances').subscribe(
        response => {
          observable.next(response);
        },
        error => {
          observable.error(error);
        }
      );
    });
    return ob;
  }
}
