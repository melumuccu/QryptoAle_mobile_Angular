import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PortfolioProfitRatio } from 'src/app/shared/interface/binance';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  portfolioProfitRatios: PortfolioProfitRatio[]; // GET[/portfolio/profit-ratio] の取得した値を格納する

  /** コンストラクタ */
  constructor(private api: ApiService) {}

  /** 初期化 */
  ngOnInit() {
    this.fetchPortfolioProfitRatios();
  }

  /**
   * 利益率を取得する
   */
  fetchPortfolioProfitRatios() {
    this.callGetPortfolioProfitRatios().subscribe(
      result => {
        console.log('file: home.page.ts => line 21 => ngOnInit => result', result);
        this.portfolioProfitRatios = result;
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
  callGetPortfolioProfitRatios(): Observable<PortfolioProfitRatio[]> {
    const ob = new Observable<PortfolioProfitRatio[]>(observable => {
      this.api.get<PortfolioProfitRatio[]>(`/portfolio/profit-ratio`).subscribe(
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
