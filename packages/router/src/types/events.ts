export enum RouterEvents {
  Navigated = 'router-navigated',
}

export interface RouterNavigatedDetail {
  url: string;
  title: string;
}

declare global {
  interface HTMLElementEventMap {
    [RouterEvents.Navigated]: CustomEvent<RouterNavigatedDetail>;
  }
}
