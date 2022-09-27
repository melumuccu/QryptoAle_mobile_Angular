import { Injectable } from '@angular/core';
import BigNumber from 'bignumber.js';

@Injectable({
  providedIn: 'root',
})
export class CalculateService {
  // TODO このクラスの処理はなるべくバックエンドで処理させたい(フロントでBigNumberを扱うのは重い)
  /** コンストラクタ */
  constructor() {}

  /**
   * 与えられた数値を指定桁数で四捨五入する
   *
   * @param target 対象数値
   * @param digit 丸め桁数(整数) ex. 0指定: 1234.567 -> 1235, 1指定: 1234.567 -> 1234.6, -1指定: 1234.567 -> 1230
   * @return 丸め後の対象数値 | null(エラー)
   */
  round(target: number, digit: number): number | null {
    if (!Number.isInteger(digit)) {
      console.error('digit が整数でない。');
      return null;
    }

    // prettier-ignore
    const radixBN = digit >= 0 // digit から基数を得る ex. 1 -> 10, -2 -> 0.01
    ? new BigNumber(10).pow(digit)
    : new BigNumber(0.1).pow(digit * -1);

    const x = new BigNumber(target).times(radixBN); // targetに基数を掛ける
    const y = x.dp(0, BigNumber.ROUND_HALF_UP); // 少数第一位を四捨五入
    const z = y.div(radixBN); // 基数で割って元の桁数に戻す

    return parseFloat(z.toPrecision());
  }
}
