/**
 * Pattern infrastructure — shared types and state controller.
 * Every pattern accepts an AppState prop and renders accordingly.
 */

export type AppState = 'loading' | 'empty' | 'error' | 'success' | 'populated'

export const appStates: AppState[] = ['loading', 'empty', 'error', 'success', 'populated']

export interface PatternProps {
  state: AppState
  /** Triggered when an action in the pattern requests a state change (e.g., retry → loading → populated) */
  onStateChange?: (state: AppState) => void
}

export interface PatternDefinition {
  id: string
  category: 'passenger' | 'driver' | 'admin'
  /** React component */
  component: React.ComponentType<PatternProps>
  /** Which states this pattern supports (defaults to all 5) */
  supportsStates?: AppState[]
}
