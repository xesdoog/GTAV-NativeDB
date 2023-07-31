import { CssBaseline } from '@mui/material'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppBar, OnlineStatusProvider, UpdateDialog } from './components'
import { useNamespaces } from './hooks'
import NativeLoader from './NativeLoader'
import { LoadingScreen } from './pages'
import Router from './Router'
import Theme from './Theme'
import { AppBarSettingsProvider, AppDataProvider, Game, NativeDataProvider, SelectedGameProvider, SettingsProvider, ThemesProvider } from './context'

function LoadGate() {
  const namespaces = useNamespaces()
  if (!Object.keys(namespaces).length) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <React.Fragment>
      <AppBar />
      <UpdateDialog />
      <Router />
    </React.Fragment>
  )
}

export default function App() {
  return (
    <AppDataProvider>
      <ThemesProvider>
        <SettingsProvider>
          <NativeDataProvider>
            <OnlineStatusProvider>
              <SelectedGameProvider game={Game.GrandTheftAuto5}>
                <AppBarSettingsProvider>
                  <BrowserRouter>
                    <Theme>
                      <CssBaseline />
                      <NativeLoader />
                      <LoadGate />
                    </Theme>
                  </BrowserRouter>
                </AppBarSettingsProvider>
              </SelectedGameProvider>
            </OnlineStatusProvider>
          </NativeDataProvider>
        </SettingsProvider>
      </ThemesProvider>
    </AppDataProvider>
  )
}
