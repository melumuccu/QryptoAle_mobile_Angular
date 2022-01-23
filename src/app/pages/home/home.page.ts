import { Component, OnInit } from '@angular/core';
import { AssetBalance } from 'binance-api-node';
import { Observable } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';
import { AleAssetBalance } from '../../shared/services/index';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  balances: AleAssetBalance[];

  /** コンストラクタ */
  constructor(private api: ApiService) {}

  /** 初期化 */
  ngOnInit() {
    this.init();
  }

  /**
   * 初期化処理
   */
  init() {
    // 取得: 保有数量情報(asset, free, locked)
    this.fetchAllBalances(1, true).subscribe(
      balances => {
        console.log('file: home.page.ts => line 25 => ngOnInit => balances', balances);
        this.balances = balances.map(balance => ({
          asset: balance.asset,
          free: Number(balance.free),
          locked: Number(balance.locked),
        }));

        // TODO 日本円換算

        // TODO 取得: 平均取得価額
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
  private fetchAllBalances(
    minQuantity: number,
    includeLocked: boolean
  ): Observable<AssetBalance[]> {
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
