import { SetSettings, SET_SETTINGS } from '../actions'
import { Theme, NativeSources, NativeDisplayMode } from '../model'

export type SettingsReducerActions = SetSettings
export interface SettingsReducerState {
  theme                : Theme
  sources              : NativeSources[]
  nativeDisplayMode    : NativeDisplayMode
  displayVoidReturnType: boolean
}

const initialState: SettingsReducerState = {
  theme: 'system',
  sources: [NativeSources.Alloc8or],
  nativeDisplayMode: 'C',
  displayVoidReturnType: true
}

export default function settingsReducer(state: SettingsReducerState = initialState, action: SettingsReducerActions): SettingsReducerState {
  switch(action.type) {
    case SET_SETTINGS:
      return {
        ...state,
        ...action.settings
      }
    default:
      return state
  }
}
