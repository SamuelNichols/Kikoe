export type Theme = 'light' | 'dark'

export interface AppConfigState {
    theme: Theme;
    // actions
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
  }

export const initialAppConfigState: AppConfigState = {
    theme: 'dark',
    // actions should be defined in the store, stubbed here
    setTheme: () => {},
    toggleTheme: () => {},
}