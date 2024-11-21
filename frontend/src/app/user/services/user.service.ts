import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { UpdatePasswordRequest } from "../interfaces/update-password-request.interface";
import { environment } from "src/environments/environment";
import { UpdateUserRequest } from "../interfaces/update-user-request.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  /**
   * Method to change the user password
   * @param updatePasswordRequest The change password request
   * @returns Observable of true if the password was changed, false otherwise
   */
  updatePassword(updatePasswordRequest: UpdatePasswordRequest): Observable<boolean> {
    const url = `${this.baseUrl}/usuario/cambiar-contrasena-logueado`;
    const body = updatePasswordRequest;

    return this.http.patch(url, body).pipe(
      map( () => true ),
      catchError( (err) => throwError( () => err) )
    );
  }

  /**
   * Delete the user account
   * @param email The email of the user
   * @param password The password of the user
   * @returns Observable of true if the account was deleted, throws an error otherwise
   */
  deleteAccount(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/usuario/eliminar`;
    const params = { correo: email, contrasena: password };

    return this.http.delete(url, { params }).pipe(
      map( () => true ),
      catchError( (err) => throwError( () => err) )
    );
  }

  /**
   * Update the user information
   * @param userData The user data to update
   * @returns Observable of true if the user was updated, throws an error otherwise
   */
  updateUser(userData: UpdateUserRequest): Observable<boolean> {
    const url = `${this.baseUrl}/usuario/actualizar`;
    const body = userData;

    return this.http.patch(url, body).pipe(
      map( () => true ),
      catchError( (err) => throwError( () => err) )
    );
  }
}
