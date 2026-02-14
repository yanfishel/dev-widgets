import React, {useEffect, useMemo, useState} from 'react';

import { useSettingsStore } from "@/store";
import {T_Location} from "@/types/weather";


const Weather = () => {

  const autoGeoPosition = useSettingsStore(({autoGeoPosition}) => autoGeoPosition)
  const weather = useSettingsStore(({weather}) => weather)
  const location = useSettingsStore(({location}) => location)
  const updateLocation = useSettingsStore(({updateLocation}) => updateLocation)


  const [manual, setManual] = useState<T_Location>(location)

  const checked = useMemo(() => weather.active, [weather.active])


  useEffect(() => {
    useSettingsStore.setState(state => ({...state, location: manual}))
  }, [manual]);


  return (
    <>
      <h1>Weather</h1>
      <div className="settings-menu-item">
        <div className="settings-item-content">
          <div className="item-content-row">
            <label htmlFor="geo-position">Location</label>
            <select id="geo-position"
                    name="geo-position"
                    value={ autoGeoPosition ? 'auto' : 'manual' }
                    onChange={ e => {
                      useSettingsStore.setState(state => ({...state, autoGeoPosition: e.target.value === 'auto' }))
                      updateLocation()
                    }}>
              <option value="auto">Auto</option>
              <option value="manual">Manual</option>
            </select>
          </div>
          <div id="geo-position-manual" className={`item-content-row geo-position-manual ${ !autoGeoPosition ? 'show' : '' }`}>

            <div>
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text"
                     value={ manual.city ?? '' }
                     onChange={ e => setManual(prevState => ({ ...prevState, city: e.target.value })) }
                     onBlur={ updateLocation } />
            </div>

            <div>
              <label htmlFor="lat">Latitude</label>
              <input id="lat" name="lat" type="text"
                     value={ manual.lat ?? '' }
                     onChange={ e => setManual(prevState => ({ ...prevState, lat: Number(e.target.value) })) }
                     onBlur={ updateLocation } />
            </div>

            <div>
              <label htmlFor="lon">Longitude</label>
              <input id="lon" name="lon" type="text"
                     value={ manual.lon ?? '' }
                     onChange={ e => setManual(prevState => ({ ...prevState, lon: Number(e.target.value) })) }
                     onBlur={ updateLocation } />
            </div>

          </div>

        </div>
      </div>
      <div className="settings-menu-item">
        <label htmlFor="weather-active">Current Weather</label>
        <div className="switch-container">
          <input type="checkbox" id="weather-active"
                 name="weather-active"
                 checked={ checked }
                 onChange={ e => {
                   useSettingsStore.setState(state => ({ weather: { ...state.weather, active: e.target.checked } }))
                 }}
                 role="switch" />
        </div>
      </div>
    </>
  )
}

export default Weather;