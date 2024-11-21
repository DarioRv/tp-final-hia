import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

import { AuthenticationService } from 'src/app/auth/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'dashboard-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: [],
})
export class LayoutPageComponent implements OnInit, OnDestroy {
  public sidebarItems = [
    [
      { label: 'Guía rapida', icon: 'book_2', url: 'start' },
      { label: 'Materias', icon: 'grid_view', url: 'courses' },
      { label: 'Mi perfil', icon: 'person', url: 'account' },
    ],
  ];

  public title: string = 'Dashboard';
  public mode: MatDrawerMode = 'side';
  private routerSubscription: Subscription = new Subscription();
  private breakpointSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private snackbarService: SnackbarService
  ) {
    this.setSidebarMode();
  }

  ngOnInit(): void {
    this.setMainTitle();
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.breakpointSubscription.unsubscribe();
  }

  /**
   * Method to set the title of the page based on the route data title property value
   */
  setMainTitle(): void {
    this.routerSubscription = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        map((route) => route.snapshot.data)
      )
      .subscribe((event) => {
        this.title = event['title'];
      });
  }

  /**
   * Method to set the sidebar mode, if the screen is small, the sidebar will be over
   * if the screen is big, the sidebar will be side
   */
  setSidebarMode(): void {
    this.breakpointSubscription = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.mode = result.matches ? 'over' : 'side';
      });
  }

  /**
   * Sign out the user from the current session and navigate to the login page
   */
  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['/auth/sign-in']);
    this.snackbarService.showSnackbar(
      'Sesión cerrada exitosamente',
      'Cerrar',
      5000
    );
  }
}
