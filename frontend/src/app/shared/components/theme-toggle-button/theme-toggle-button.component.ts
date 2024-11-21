import { Component, Input, OnInit } from '@angular/core';

type Theme = 'light' | 'dark';

const themeMode = {
  light: 'light' as Theme,
  dark: 'dark' as Theme,
};

@Component({
  selector: 'shared-theme-toggle-button',
  templateUrl: './theme-toggle-button.component.html',
  styles: [],
})
export class ThemeToggleButtonComponent implements OnInit {
  @Input()
  backgroundColor = 'bg-slate-200 dark:bg-slate-800';
  @Input()
  iconColor = 'text-slate-800 dark:text-slate-200';
  @Input()
  selectedIconColor = 'bg-slate-400 dark:bg-slate-500';

  currentTheme: Theme = themeMode.light;

  ngOnInit(): void {
    this.setThemePreference();
  }

  /**
   * Toggle the current theme between light and dark
   * @param element The HTML element that triggered the event
   */
  toggleCurrentTheme(element: any) {
    this.currentTheme = element.checked ? themeMode.dark : themeMode.light;
    this.saveThemePreference();
    this.setThemePreference();
  }

  /**
   * Save the current theme to local storage to persist across refreshes and browser sessions
   */
  saveThemePreference() {
    localStorage.setItem('theme', this.currentTheme);
  }

  /**
   * Get the user's theme preference from local storage
   */
  get userThemePreference(): Theme | null {
    return localStorage.getItem('theme') as Theme;
  }

  /**
   * Get the system theme preference
   */
  get systemThemePreference(): boolean {
    return (
      !('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }

  /**
   * Set the theme based on the user's preference or the system preference
   */
  setThemePreference(): void {
    if (
      this.userThemePreference === themeMode.dark ||
      this.systemThemePreference
    )
      this.setdarkMode();
    else this.setlightMode();
  }

  /**
   * Set the theme to dark
   */
  setdarkMode(): void {
    document.documentElement.classList.add(themeMode.dark);
    document.documentElement.classList.remove(themeMode.light);
    this.currentTheme = themeMode.dark;
  }

  /**
   * Set the theme to light
   */
  setlightMode(): void {
    document.documentElement.classList.add(themeMode.light);
    document.documentElement.classList.remove(themeMode.dark);
    this.currentTheme = themeMode.light;
  }
}
