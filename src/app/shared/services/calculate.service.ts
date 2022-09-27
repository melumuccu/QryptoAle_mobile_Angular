import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculateService {
  /** コンストラクタ */
  constructor() {}

  /**
   * 与えられた数値を指定桁数で四捨五入する
   *
   * @param target 対象数値
   * @param digit 丸め桁数 ex. 0指定: 1234.567 -> 1235, 1指定: 1234.567 -> 1234.6, -1指定: 1234.567 -> 1230
   */
  round(target: number, digit: number): number {
    return 0;
  }
}
