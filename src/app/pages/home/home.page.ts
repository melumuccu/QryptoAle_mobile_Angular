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
    this.fetchPortfolioProfitRatios().subscribe(
      response => {
        this.portfolioProfitRatios = response;
      },
      error => {
        // TODO エラー表示する
        console.error(error);
      }
    );
  }

  /**
   * テーブルのリフレッシュ
   *
   * @param event
   */
  refresh(event) {
    this.fetchPortfolioProfitRatios().subscribe(
      response => {
        this.portfolioProfitRatios = response;
        event.target.complete();
      },
      error => {
        // TODO エラー表示する
        console.error(error);
      }
    );
  }

  /**
   * 利益率など各種テーブル情報を取得する
   *
   * @returns Observable<PortfolioProfitRatio>
   */
  fetchPortfolioProfitRatios(): Observable<PortfolioProfitRatio[]> {
    const ob = new Observable<PortfolioProfitRatio[]>(observer => {
      this.callGetPortfolioProfitRatios().subscribe(
        response => {
          observer.next(response);
        },
        error => {
          observer.error(error);
        }
      );
    });
    return ob;
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
