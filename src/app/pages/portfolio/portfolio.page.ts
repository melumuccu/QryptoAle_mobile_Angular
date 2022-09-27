import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Portfolio, PortfolioEdited } from 'src/app/shared/interface/binance';
import { ApiService } from '../../shared/services/api.service';
import { CalculateService } from '../../shared/services/calculate.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.page.html',
  styleUrls: ['./portfolio.page.scss'],
})
export class PortfolioPage implements OnInit {
  portfolio: PortfolioEdited[]; // GET[/portfolio/portfolio] の取得した値を格納する
  nowLoading = false;

  /** コンストラクタ */
  constructor(
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private calc: CalculateService
  ) {}

  /** 初期化 */
  async ngOnInit() {
    // 初回loading info
    const loading = await this.loadingCtrl.create({
      message: 'now Loading...',
      spinner: 'circles',
    });
    loading.present();
    this.nowLoading = true;

    this.fetchPortfolio().subscribe(
      async response => {
        this.portfolio = this.editPortfolio(response);
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
    this.fetchPortfolio().subscribe(
      response => {
        this.portfolio = this.editPortfolio(response);
        event.target.complete();
      },
      error => {
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
    // prettier-ignore
    return (
      this.portfolio !== null &&
      this.portfolio !== undefined &&
      this.portfolio.length > 0
    );
  }

  /**
   * ポートフォリオ情報を取得する
   *
   * @returns Observable<Portfolio>
   */
  fetchPortfolio(): Observable<Portfolio[]> {
    const ob = new Observable<Portfolio[]>(observer => {
      this.callGetPortfolio().subscribe(
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
   * ポートフォリオ情報を取得
   *
   * @returns response
   */
  private callGetPortfolio(): Observable<Portfolio[]> {
    const ob = new Observable<Portfolio[]>(observable => {
      this.api.get<Portfolio[]>(`/portfolio/portfolio`).subscribe(
        response => {
          console.log({ response });
          observable.next(response);
        },
        error => {
          observable.error(error);
        }
      );
    });
    return ob;
  }

  /**
   * Portfolioを以下の通り加工する
   *
   * ・convertedToBaseFiat, convertedToJpy
   *    ・金額の多い通貨順にソートする
   *    ・整数になるよう少数第一位を四捨五入し、カンマ区切りにする
   *
   * @param portfolios
   */
  private editPortfolio(portfolios: Portfolio[]) {
    const sorted = portfolios.sort((x, y) => y.convertedToJpy - x.convertedToJpy);
    const rounded = sorted.map(p => {
      const x = {
        balance: p.balance,
        convertedToBaseFiat: this.calc.round(p.convertedToBaseFiat, 0).toLocaleString(),
        convertedToJpy: this.calc.round(p.convertedToJpy, 0).toLocaleString(),
      };
      return x;
    });

    return rounded;
  }
}
