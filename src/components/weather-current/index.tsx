import { toast } from "react-hot-toast";

import { useStore } from "@/store";
import WidgetToaster from "@components/widget-toaster";

import './style.css'


const WeatherCurrent = () => {

  const currentLocation = useStore(({currentLocation}) => currentLocation)
  const displayDate = useStore(({displayDate}) => displayDate)


  toast.success('Hello World', {
    duration: 60000,
    toasterId: 'weather-current-toaster',
  });

  return (
    <>

      <WidgetToaster toasterId={'weather-current-toaster'} />

      <div id={'weather-current-widget'} className="container">
        <div className="weather-info">
          <div className="date">
            <div className="country">{ currentLocation.city } { currentLocation.countryCode ? ` - ${ currentLocation.countryCode }` : ''}</div>
            <div className="day">{ displayDate.date } <span>{ displayDate.weekday }</span></div>
          </div>
          <div className="weather">
            <div className="temperature"></div>
            <div className="description"></div>
            <div className="icon"></div>
          </div>
        </div>
      </div>
    </>
  )

}

export default WeatherCurrent;