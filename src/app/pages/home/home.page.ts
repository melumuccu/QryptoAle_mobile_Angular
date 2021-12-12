import { Component, OnInit } from '@angular/core';
import { AssetBalance } from 'binance-api-node';
import { Observable } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  balances: AssetBalance[];

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
  fetchAllBalances(): Observable<AssetBalance[]> {
    const ob = new Observable<AssetBalance[]>(observable => {
      this.api.get<AssetBalance[]>('/balances').subscribe(
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
