import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
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
  nowLoading = false;

  /** コンストラクタ */
  constructor(private api: ApiService, private loadingCtrl: LoadingController) {}

  /** 初期化 */
  async ngOnInit() {
    // 初回loading info
    const loading = await this.loadingCtrl.create({
      message: 'now Loading...',
      spinner: 'circles',
    });
    loading.present();
    this.nowLoading = true;

    this.fetchPortfolioProfitRatios().subscribe(
      async response => {
        this.portfolioProfitRatios = response;
        await loading.dismiss();
        this.nowLoading = false;
      },
      async error => {
        // TODO エラー表示する
        console.error(error);
        await loading.dismiss();
        this.nowLoading = false;
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
   * コンテンツを１つ以上持つかどうか
   *
   * @returns true: 1つ以上のコンテンツを持つ
   */
  hasContents(): boolean {
    return (
      this.portfolioProfitRatios !== null &&
      this.portfolioProfitRatios !== undefined &&
      this.portfolioProfitRatios.length > 0
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
