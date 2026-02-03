import {useEffect, useState} from "react";

import {useGlobalStore, useSettingsStore, useWeatherStore} from "@/store";
import {WEATHER_DATA} from "@/constants";
import {WEATHER_ICONS} from "@/assets";

import './style.css'


const InitCurrentWeather = { temp: '-', icon: '', description: '-'}

const WeatherCurrent = () => {

  const displayDate = useGlobalStore(({displayDate}) => displayDate)
  const userLocation = useSettingsStore(({userLocation}) => userLocation)
  const weather = useSettingsStore(({weather}) => weather)

  const weatherForecast = useWeatherStore(({weatherForecast}) => weatherForecast)

  const [currentWeather, setCurrentWeather] = useState<{temp:number | string, icon:string, description:string}>(InitCurrentWeather)


  useEffect(() => {
    if(weatherForecast?.current && weather.active){
      const current = weatherForecast.current
      const weatherCondition = WEATHER_DATA.find(data => data.code.includes(current.weather_code))
      if(weatherCondition){
        const iconKey  = `${weatherCondition.icon}_${current.is_day ? 'd' : 'n'}` as keyof typeof WEATHER_ICONS
        const icon = WEATHER_ICONS[iconKey]
        setCurrentWeather({
          temp: Math.round(current.temperature_2m) ?? '-',
          icon: icon ?? '',
          description: weatherCondition.description ?? '-'
        })
        return
      }
    }
    setCurrentWeather(InitCurrentWeather)
  }, [weatherForecast?.current, weather.active]);


  return (
    <div id={'weather-current-widget'} className="container">
      <div className="weather-info">
        <div className="date">
          <div className="country">{ userLocation.city } { userLocation.countryCode ? ` - ${ userLocation.countryCode }` : ''}</div>
          <div className="day">{ displayDate.date } <span>{ displayDate.weekday }</span></div>
        </div>
        { weather.active &&
          <div className="weather">
            <div className="temperature">{ currentWeather.temp }°</div>
            <div className="description">{ currentWeather.description }</div>
            <div className="icon">{ currentWeather.icon && <img src={ currentWeather.icon } alt={ currentWeather.description } /> }</div>
          </div>
        }
      </div>
    </div>

  )

}

export default WeatherCurrent;