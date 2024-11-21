import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthenticationService } from "../services/auth.service";

/**
 * Method to check if the user is authenticated and can access the route or not
 * @param route
 * @param state
 * @returns Observable of true if the user is authenticated, false otherwise
 */
export const checkAuthentication: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return checkAuthStatus();
}

/**
 * Method to check the authentication status of the user and redirect to the auth page if the user is not authenticated
 * @returns Observable of true if the user is authenticated, false otherwise
 */
const checkAuthStatus = (): Observable<boolean> => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  return authService.checkAuthentication().pipe(
    tap( isAuthenticated => {
      if (!isAuthenticated)
      router.navigate(['/auth/sign-in']);
    }),
  );
}
