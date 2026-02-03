import {useEffect, useState} from "react";

import { LogoClockIcon } from "@/assets";
import {useGlobalStore} from "@/store";

import {T_ClockHands} from "./types";
import './style.css';


const AnalogClock = () => {

  const [clockHands, setClockHands] = useState<T_ClockHands>({hour: 0, minute: 0, second: 0})

  const globalDateTime = useGlobalStore(({globalDateTime}) => globalDateTime)
  const displayDate = useGlobalStore(({displayDate}) => displayDate)


  useEffect(()=>{
    if(!globalDateTime) {
      return
    }

    const hour = globalDateTime.getHours() // Get the current hour
    const minute = globalDateTime.getMinutes() // Get the current minute
    const second = globalDateTime.getSeconds() // Get the current second

    setClockHands({
      hour: (hour * 30) + (minute / 2) - 90,
      minute: (minute * 6) + (second / 10) - 90,
      second: second * 6 - 90
    })

  }, [globalDateTime])


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