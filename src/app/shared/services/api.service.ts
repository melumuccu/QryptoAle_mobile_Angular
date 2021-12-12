import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /** コンストラクタ */
  constructor(private httpClient: HttpClient) {}

  /**
   * 汎用get関数
   *
   * @param endpoint
   * @returns
   */
  get<T>(endpoint: string): Observable<T> {
    console.log('API get endpoint: ', endpoint);
    const ob = new Observable<T>(observable => {
      this.httpClient.get<T>(environment.origin + endpoint).subscribe(
        response => {
          console.log('API get response: ', response);
          observable.next(response);
        },
        error => {
          console.error('API get error: ', error);
          observable.error(error);
        }
      );
    });
    return ob;
  }
}
