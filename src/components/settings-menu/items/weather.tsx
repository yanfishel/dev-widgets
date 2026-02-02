import React, {useEffect, useMemo, useState} from 'react';
import {useStore} from "@/store";


const Weather = () => {



  const settings = useStore(({settings}) => settings)
  const setSettingsValue = useStore(({setSettingsValue}) => setSettingsValue)

  const [manual, setManual] = useState<TLocation>(settings.location)

  const checked = useMemo(() => settings.weather.active, [settings.weather.active])


  useEffect(() => {
    setSettingsValue('location', manual)
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
                    value={ settings.autoGeoPosition ? 'auto' : 'manual' }
                    onChange={ e => setSettingsValue('autoGeoPosition', e.target.value === 'auto') }>
              <option value="auto">Auto</option>
              <option value="manual">Manual</option>
            </select>
          </div>
          <div id="geo-position-manual" className={`item-content-row geo-position-manual ${ !settings.autoGeoPosition ? 'show' : '' }`}>

            <div>
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text"
                     value={ manual.city ?? '' }
                     onChange={ e => setManual(prevState => ({ ...prevState, city: e.target.value })) }   />
            </div>

            <div>
              <label htmlFor="lat">Latitude</label>
              <input id="lat" name="lat" type="text"
                     value={ manual.lat ?? '' }
                     onChange={ e => setManual(prevState => ({ ...prevState, lat: Number(e.target.value) })) } />
            </div>

            <div>
              <label htmlFor="lon">Longitude</label>
              <input id="lon" name="lon" type="text"
                     value={ manual.lon ?? '' }
                     onChange={ e => setManual(prevState => ({ ...prevState, lon: Number(e.target.value) })) } />
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
                   setSettingsValue('weather', { id: settings.weather.id, active: e.target.checked } )
                 }}
                 role="switch" />
        </div>
      </div>
    </>
  )
}

export default Weather;