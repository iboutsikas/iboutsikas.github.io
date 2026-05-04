export enum RouterEvents {
  BeforeNavigate = 'router-before-navigate',
  Navigated = 'router-navigated',
  NavigationComplete = 'router-navigation-complete',
  NavigationError = 'router-navigation-error',
}

export interface RouterBeforeNavigateDetail {
  url: string;
  title: string;
  defaultPrevented: boolean;
}

export interface RouterNavigatedDetail {
  url: string;
  title: string;
  from: string;
  isBackForward: boolean;
  doc: Document;
}

export interface RouterNavigationCompleteDetail {
  url: string;
  title: string;
  from: string;
  isBackForward: boolean;
  doc: Document;
}

export interface RouterNavigationErrorDetail {
  url: string;
  error: Error;
}

declare global {
  interface HTMLElementEventMap {
    [RouterEvents.BeforeNavigate]: CustomEvent<RouterBeforeNavigateDetail>;
    [RouterEvents.Navigated]: CustomEvent<RouterNavigatedDetail>;
    [RouterEvents.NavigationComplete]: CustomEvent<RouterNavigationCompleteDetail>;
    [RouterEvents.NavigationError]: CustomEvent<RouterNavigationErrorDetail>;
  }
}
