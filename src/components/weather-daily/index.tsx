import {memo, useEffect, useState} from "react";

import { WIDGETS_ID } from "@/constants";
import { useWeatherStore } from "@/store";
import { useWidgetProps } from "@/hooks";
import { weatherForecastMap } from "@/utils";
import DayItem, { I_DayItem } from "./day-item";

import './style.css'


const WeatherDaily = () => {

  const [dailyWeather, setDailyWeather] = useState<I_DayItem[]>([])

  const error = useWeatherStore(({error}) => error)
  const forecast = useWeatherStore(({forecast}) => forecast)

  const { widgetProps } = useWidgetProps({ widgetId: WIDGETS_ID.DAILY_WEATHER })


  useEffect(() => {
    const dailyForecast = forecast?.daily ? weatherForecastMap(forecast.daily) : []
    setDailyWeather( dailyForecast )
  }, [forecast?.daily]);


  return (
    <div id={ WIDGETS_ID.DAILY_WEATHER }
         className={'widget-container'}
         style={{
           order: widgetProps.order,
           display: widgetProps.active ? 'block' : 'none'
         }} >
      <div className="container">
        { dailyWeather.map( (day, idx) =>
          <DayItem key={idx} {...day} />
        )}
        { error && <div className="alert-message error">{ error }</div> }
      </div>
    </div>
  )
}

export default memo(WeatherDaily)