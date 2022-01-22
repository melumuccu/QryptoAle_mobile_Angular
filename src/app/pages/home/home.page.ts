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
    this.fetchAllBalances(1, true).subscribe(
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
   * @param minQuantity 最小数量
   * @param includeLocked 注文中の数量を含むか
   * @returns response
   */
  fetchAllBalances(minQuantity: number, includeLocked: boolean): Observable<AssetBalance[]> {
    const ob = new Observable<AssetBalance[]>(observable => {
      this.api
        .get<AssetBalance[]>(`/balances?minQuantity=${minQuantity}&includeLocked=${includeLocked}`)
        .subscribe(
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
