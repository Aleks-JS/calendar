import { OnInit } from '@angular/core';
import { TokenStorageService } from '@services/auth/token.service';
import { AuthService } from '@services/auth/auth.service';

export class LoginComponent implements OnInit {
  public form;
  errorMessage;
  isLoginFailed;
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
        throw new Error('Method not implemented.');
    }


  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login({username, password}).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveRefreshToken(data.refreshToken);
        this.tokenStorage.saveUser(data);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}
