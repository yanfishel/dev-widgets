import {useEffect, useState} from "react";

import { LogoClockIcon } from "@/assets";
import {useGlobalStore, useWeatherStore} from "@/store";

import {T_ClockHands} from "./types";
import './style.css';


const AnalogClock = () => {

  const [clockHands, setClockHands] = useState<T_ClockHands>({hour: 0, minute: 0, second: 0})

  const displayTime = useGlobalStore(({displayTime}) => displayTime)
  const displayDate = useGlobalStore(({displayDate}) => displayDate)


  useEffect(()=>{
    const { hours, minutes, seconds } = displayTime

    setClockHands({
      hour: (hours * 30) + (minutes / 2) - 90,
      minute: (minutes * 6) + (seconds / 10) - 90,
      second: seconds * 6 - 90
    })

  }, [displayTime])


  return (
    <div id={'analog-clock'}>
      <div className="hour12" />
      <div className="hour1" />
      <div className="hour2" />
      <div className="hour3" />
      <div className="hour4" />
      <div className="hour5" />
      <div className="logo">
        <LogoClockIcon />
      </div>
      <div className="date">
        <span>{ displayDate.weekday }</span>
        { displayDate.shortdate }
      </div>
      <div className="hourhand" style={{ transform: `rotate(${clockHands.hour}deg)` }} />
      <div className="minutehand" style={{ transform: `rotate(${clockHands.minute}deg)` }} />
      <div className="secondhand" style={{ transform: `rotate(${ clockHands.second }deg)` }} />
      <div className="nail"/>
    </div>
  );
};

export default AnalogClock;