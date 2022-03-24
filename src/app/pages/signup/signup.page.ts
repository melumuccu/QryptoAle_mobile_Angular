import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public signupForm: FormGroup;
  public confirmationForm: FormGroup;
  public successfullySignup: boolean;

  /** constructor */
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {}

  /**
   * lifecycle - init
   */
  ngOnInit() {
    this.initForm();
  }

  /**
   * フォームの初期化
   */
  initForm() {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.confirmationForm = this.fb.group({
      email: ['', Validators.required],
      confirmationCode: ['', Validators.required],
    });
  }

  /**
   * [登録]タップ時の処理
   *
   * @param value 入力値
   */
  onSubmitSignup(value: any) {
    const email = value.email;
    const password = value.password;
    this.auth.signUp(email, password).subscribe(
      result => {
        this.successfullySignup = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * [確認]タップ時の処理
   *
   * @param value 入力値
   */
  onSubmitConfirmation(value: any) {
    const email = value.email;
    const confirmationCode = value.confirmationCode;
    this.auth.confirmSignUp(email, confirmationCode).subscribe(
      result => {
        this.auth.signIn(email, this.auth.password).subscribe(
          () => {
            this.router.navigate(['/home']);
          },
          error => {
            console.log(error);
            this.router.navigate(['/login']);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }
}
