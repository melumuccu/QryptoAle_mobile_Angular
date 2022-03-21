import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

/**
 * サンプルのAPI(/pet)をコールするサービス
 */
@Injectable({
  providedIn: 'root',
})
export class PetService {
  private url = environment + '/pets';

  /** constructor */
  constructor(private http: HttpClient) {}

  /**
   * ペット一覧取得APIコール
   *
   * @param jwt
   * @returns
   */
  public getPets(jwt: string): Observable<any> {
    const httpOptions = {
      headers: { Authorization: jwt },
    };
    return this.http.get<any>(this.url, httpOptions).pipe(
      tap(users => users),
      catchError(this.handleError('getFile', []))
    );
  }

  /**
   * エラーハンドリング
   *
   * @param operation
   * @param result
   * @returns
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /**
   * ログ出力Util
   *
   * @param message
   */
  private log(message: string) {
    console.log('petService: ' + message);
  }
}
