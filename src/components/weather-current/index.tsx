import {useEffect, useState} from "react";

import {useGlobalStore, useSettingsStore, useWeatherStore} from "@/store";
import {weatherConditionByCode} from "@/utils";

import './style.css'
import {WIDGETS_ID} from "@/constants";


const InitCurrentWeather = { temp: '-', icon: '', description: '-'}

const WeatherCurrent = () => {

  const displayDate = useGlobalStore(({displayDate}) => displayDate)
  const displayTime = useGlobalStore(({displayTime}) => displayTime)
  const userLocation = useSettingsStore(({userLocation}) => userLocation)
  const weather = useSettingsStore(({weather}) => weather)

  const weatherForecast = useWeatherStore(({forecast}) => forecast)
  const updateWeatherForecast = useWeatherStore(({updateWeatherForecast}) => updateWeatherForecast)

  const [currentWeather, setCurrentWeather] = useState<{temp:number | string, icon:string, description:string}>(InitCurrentWeather)


  useEffect(()=>{
    const { minutes, seconds } = displayTime
    if(minutes === 0 && seconds === 0) {
      updateWeatherForecast()
    }
  }, [displayTime])

  useEffect(() => {
    if(weatherForecast?.current && weather.active){
      const { weather_code, temperature_2m, is_day } = weatherForecast.current
      const temp = Math.round(temperature_2m) ?? '-'
      const { icon, description } = weatherConditionByCode(weather_code, !!is_day)
      setCurrentWeather({ temp, icon, description })
    } else {
      setCurrentWeather(InitCurrentWeather)
    }
  }, [weatherForecast?.current, weather.active]);


  return (
    <div id={ WIDGETS_ID.CURRENT_WEATHER } className="container">
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