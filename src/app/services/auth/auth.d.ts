export namespace auth {
  export interface IRefreshTokens {
    accessToken: string;
    refreshToken: string;
  }

  export interface IAuthData {
    username: string;
    password: string;
  }
}
