import React, { useEffect } from 'react';

import {useStore} from "@/store";
import ThemeController from "@components/theme-controller";
import Dragger from "@components/dragger";
import AnalogClock from "@components/analog-clock";
import SettingsMenu from "@components/settings-menu";
import WeatherCurrent from "@components/weather-current";

import '@/styles/main.css'
import '@/styles/tabs.css'
import '@/styles/form.css'


const App = () => {

  const loading = useStore(({loading}) => loading)
  const init = useStore(({init}) => init)


  useEffect(()=>{
    init()
  }, [])


  if(loading) return null

  return (
    <>
      <ThemeController />

      <Dragger />

      <div id="top-container">

        <SettingsMenu />

        <AnalogClock />

        <WeatherCurrent />

      </div>

      <div className="content-container-wrapper">
        <div id="content-container">

        </div>
      </div>
    </>
  )
}

export default App;