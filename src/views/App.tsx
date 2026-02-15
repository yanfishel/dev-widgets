import React, {useEffect, useState} from 'react';

import {T_WidgetsSize} from "@/types/settings";
import {useGlobalStore, useSettingsStore, useWeatherStore} from "@/store";
import ThemeController from "@components/theme-controller";
import Dragger from "@components/dragger";
import AnalogClock from "@components/analog-clock";
import SettingsMenu from "@components/settings-menu";
import WeatherCurrent from "@components/weather-current";
import WeatherDaily from "@components/weather-daily";
import WebSearch from "@components/web-search";
import SystemInfo from "@components/system-info";
import DevUtils from "@components/dev-utils";
import Notes from "@components/notes";

import '@/styles/main.css'
import '@/styles/dialog.css'
import '@/styles/tabs.css'
import '@/styles/form.css'



const App = () => {

  const [loading, setLoading] = useState<boolean>(true)

  const appTimer = useGlobalStore(({appTimer}) => appTimer)
  const updateWeatherForecast = useWeatherStore(({updateWeatherForecast}) => updateWeatherForecast)

  const userLocation = useSettingsStore(({userLocation}) => userLocation)
  const updateLocation = useSettingsStore(({updateLocation}) => updateLocation)
  const weather = useSettingsStore(({weather}) => weather)


  const setWidgetSize = (size:T_WidgetsSize) => {
    document.documentElement.classList.remove("widgets-size-small", "widgets-size-medium", "widgets-size-large")
    document.documentElement.classList.add(`widgets-size-${size}`)
    useSettingsStore.setState(state => ({ ...state, size }))
  }

  const electronEventsHandler = () => {
    // Listen for widgets Lock Position change event
    window.electronAPI.onLockPosition((_event, locked) => {
      useSettingsStore.setState(state => ({ ...state, locked }))
    })

    // Listen for widgets resize event
    window.electronAPI.onWidgetsResize((_event, size) => {
      setWidgetSize(size)
    })
  }

  const initApp = async () => {
    appTimer()
    electronEventsHandler()
    await updateLocation()
    await updateWeatherForecast()

    setLoading(false)
  }


  useEffect(() => {
    updateWeatherForecast()
  }, [userLocation, weather.active]);

  useEffect(()=>{
    initApp()
  }, [])


  if(loading) return null

  return (
    <>
      <ThemeController />

      <Dragger />

      <div id={'top-container'}>

        <SettingsMenu />

        <AnalogClock />

        <WeatherCurrent />

      </div>

      <div id={'main-container'}>
        <div className={'containers-wrapper'}>

          <WeatherDaily />

          <WebSearch />

          <SystemInfo />

          <DevUtils />

          <Notes />

        </div>
      </div>
    </>
  )
}

export default App;