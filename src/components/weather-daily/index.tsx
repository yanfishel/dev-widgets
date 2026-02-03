import {useEffect, useState} from "react";

import './style.css'
import {useSettingsStore} from "@/store";



const WeatherDaily = () => {

  const [active, setActive] = useState(false)
  const [order, setOrder] = useState<number>(1)

  const widgets = useSettingsStore(({widgets}) => widgets)


  useEffect(()=>{
    const widget = widgets.find(widget => widget.id === 'widget-daily-weather')
    if(!widget) return
    setActive(widget.active)
  }, [widgets])


  return (
    <div id={'widget-daily-weather'} style={{ order, display: active ? 'block' : 'none'}} >
      <div className="container">

      </div>
    </div>
  )
}

export default WeatherDaily