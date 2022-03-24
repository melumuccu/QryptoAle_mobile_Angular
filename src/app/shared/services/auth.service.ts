/* eslint-disable import/no-deprecated */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Amplify, { Auth } from 'aws-amplify';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean>; // 簡易的なストアとして、グローバルナビゲーションの表示切替に使用
  password: any;

  /** constructor */
  constructor(private router: Router) {
    Amplify.configure(environment.amplify);
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }

  /**
   * サインアップ
   *
   * @param email
   * @param password
   * @returns
   */
  public signUp(email: string, password: string): Observable<any> {
    this.password = password;
    return from(Auth.signUp(email, password, email));
  }

  /**
   * サインアップの検証
   *
   * @param email
   * @param password
   * @returns
   */
  public confirmSignUp(email: string, password: string): Observable<any> {
    return from(Auth.signUp(email, password, email));
  }

  /**
   * サインイン
   *
   * @param email
   * @param password
   * @returns
   */
  public signIn(email: string, password: string): Observable<any> {
    return from(Auth.signIn(email, password)).pipe(tap(() => this.loggedIn.next(true)));
  }

  /**
   * ログインユーザ情報の取得
   *
   * @returns ユーザ情報
   */
  public getUserData(): Observable<any> {
    return from(Auth.currentAuthenticatedUser());
  }

  /**
   * JWTを取得
   *
   * ・API GatewayにはCognito認証をかけている
   * ・そのためAPIをリクエストするためにはログイン時に発行されるJWTが必要になる
   *
   * @returns jwtToken
   */
  public getIdToken(): string {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    return Auth.currentSession()['__zone_symbol__value']['idToken']['jwtToken'];
  }

  /**
   * ログイン状態の取得
   *
   * @returns ログイン状態
   */
  public isAuthenticated(): Observable<boolean> {
    return from(Auth.currentAuthenticatedUser()).pipe(
      map(result => {
        // memo: ログインされている場合、resultにユーザー情報が入っているがGuardで使用するためbooleanに変換する
        this.loggedIn.next(true);
        return true;
      }),
      catchError(error => {
        this.loggedIn.next(false);
        return of(false);
      })
    );
  }

  /**
   * ログアウト
   */
  public signOut() {
    from(Auth.signOut()).subscribe(
      result => {
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
      },
      error => console.log(error)
    );
  }
}
