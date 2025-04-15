import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';

  constructor() {}

  isAdmin(): boolean {
    const userData = this.getUserData();
    return userData?.role === 'admin';
  }

  getCurrentUserId(): number | null {
    const userData = this.getUserData();
    return userData ? userData.id : null;
  }

  private getUserData(): any {
    const userDataString = localStorage.getItem(this.USER_KEY);
    if (!userDataString) return null;
    try {
      return JSON.parse(userDataString);
    } catch {
      return null;
    }
  }
}
