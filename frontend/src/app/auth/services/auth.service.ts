import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../interfaces/user.interface';
import { AuthUser } from '../interfaces/auth-user.interface';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../interfaces/register-user.interface';
import { AuthStatus } from '../enums/auth-status.enum';
import { UserData } from '../interfaces/user-data.interface';
import { LoginResponse } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl: string = environment.API_URL;
  private _currentUser = signal<UserData | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.notAuthenticated);

  activeSession: User | undefined;

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  /**
   * Gets the token of the authenticated user from the cookies
   * @returns The token of the authenticated user or undefined if there is no token
   */
  getToken(): string | undefined {
    return this.cookieService.get('token');
  }

  /**
   * Sets the authentication data of the user
   * @param user user data
   * @param token token
   * @returns true if the authentication was successful, false otherwise
   */
  private setAuthentication(user: UserData, token: string): boolean {
    if (!user || !token) return false;

    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);

    if (this.cookieService.check('token')) {
      this.cookieService.delete('token');
    }

    this.cookieService.set('token', token.replace('Bearer ', ''));

    return true;
  }

  /**
   * Sign out the user from the current session
   */
  signOut(): void {
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    this.cookieService.delete('token');
  }

  /**
   * Method to authenticate a user
   * @param user The user to authenticate
   * @returns Observable of the authenticated user
   */
  authenticateUser(user: AuthUser): Observable<UserData> {
    const url = `${this.baseUrl}/auth/login`;
    const body = user;
    return this.http.post<LoginResponse>(url, body).pipe(
      map((res) => {
        const { usuario, token } = res;
        this.setAuthentication(usuario, token);
        return usuario;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  /**
   * Method to register a new user
   * @param user The user to register
   * @returns Observable of the registered user or undefined if the user could not be registered
   */
  registerUser(user: RegisterUser): Observable<any> {
    const url = `${this.baseUrl}/usuario/registro`;
    const body = user;
    return this.http
      .post<any>(url, body)
      .pipe(catchError((err) => throwError(() => err)));
  }

  /**
   * Method to update a user
   * @param user The user to update
   * @returns Observable of the updated user or undefined if the user could not be updated
   */
  updateUser(user: User): Observable<User | undefined> {
    return this.http
      .patch<User>(`${this.baseUrl}/users/${user.id}`, user)
      .pipe(catchError((err) => of(undefined)));
  }

  /**
   * Method to delete a user
   * @param id The id of the user to delete
   * @returns Observable of true if the user was deleted, false otherwise
   */
  deleteUserById(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/users/${id}`).pipe(
      map((resp) => true),
      catchError((err) => of(false))
    );
  }

  /**
   * Method to save the session of the authenticated user
   * @param user The user to save in the session
   * @deprecated
   */
  private saveSession(user: User): void {
    this.cookieService.set('user', JSON.stringify(user));
  }

  /**
   * Method to delete the session of the authenticated user from the cookies
   * @deprecated
   */
  private deleteSession(): void {
    this.cookieService.delete('user');
  }

  /**
   * Method to set the session of the authenticated user
   * @deprecated
   */
  private setSession(user: User): void {
    this.activeSession = user;
  }

  /**
   * Method to login the authenticated user
   * @param user The user to login
   * @deprecated
   */
  login(user: User): void {
    if (this.currentSession || this.cookieService.check('user')) this.logout();
    this.saveSession(user);
    this.setSession(user);
  }

  /**
   * Method to logout the authenticated user
   * @deprecated
   */
  logout(): void {
    this.deleteSession();
    this.activeSession = undefined;
  }

  /**
   * Method to check if there is a session of the authenticated user
   * @returns True if there is a session of the authenticated user, false otherwise
   */
  checkAuthentication(): Observable<boolean> {
    return this._authStatus() === AuthStatus.authenticated
      ? of(true)
      : of(false);
  }

  /**
   * Method to get the current session of the authenticated user
   * @returns The current session of the authenticated user or undefined if there is no session
   * @deprecated
   */
  get currentSession(): User | undefined {
    if (this.activeSession) return this.activeSession;
    if (!this.cookieService.check('user') || !this.cookieService.get('user'))
      return undefined;
    let user: User;
    try {
      user = JSON.parse(this.cookieService.get('user'));
    } catch (err) {
      return undefined;
    }
    return user;
  }

  /**
   * Verifies the email of the user with the token provided
   * @param token The token to verify the email
   * @returns Observable of true if the email was verified, error otherwise
   */
  verifyEmail(token: string): Observable<boolean> {
    const url = `${this.baseUrl}/usuario/validar/${token}`;
    return this.http.patch(url, token).pipe(
      map(() => true),
      catchError((err) => throwError(() => err))
    );
  }

  /**
   * Resend the verification email
   * @param email The email to resend the verification email
   * @returns Observable of true if the email was resent, error otherwise
   */
  resendVerificationEmail(email: string): Observable<boolean> {
    const url = `${this.baseUrl}/usuario/reenviar-correo-confirmacion?correo=${email}`;
    return this.http.request('POST', url).pipe(
      map(() => true),
      catchError((err) => throwError(() => err))
    );
  }

  /**
   * Send an email to the user to reset the password
   * @param email The email to reset the password
   * @returns Observable of true if the email was sent, error otherwise
   */
  forgotPassword(email: string): Observable<boolean> {
    const url = `${this.baseUrl}/usuario/olvide-mi-contrasena?correo=${email}`;
    return this.http.request('POST', url).pipe(
      map(() => true),
      catchError((err) => throwError(() => err))
    );
  }

  resetPassword(token: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/usuario/cambiar-contrasena/${token}`;
    const body = { contrasena: password };
    return this.http.patch(url, body).pipe(
      map(() => true),
      catchError((err) => throwError(() => err))
    );
  }
}
