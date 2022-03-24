import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  /** constructor */
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {}

  /** lifecycle - init */
  ngOnInit() {
    this.initForm();
  }

  /**
   * フォームの初期化
   *
   * Email: 必須
   * パスワード: 必須
   */
  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * [ログイン]タップ時の処理
   *
   * @param value 入力値
   */
  onSubmitLogin(value: any): void {
    const email = value.email;
    const password = value.password;

    this.auth.signIn(email, password).subscribe(
      result => {
        this.router.navigate(['/home']);
      },
      error => {
        console.error(error);
      }
    );
  }
}
