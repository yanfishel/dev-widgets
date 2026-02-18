import React, {memo, useEffect, useState} from 'react';
import {TZDate} from "@date-fns/tz";

import {dateObjMap, validNamedField} from "@/utils";


type T_DisplayDate = {
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number
}
interface IProps {
  tzDate: TZDate
  onChange?: (milliseconds:number)=>void
}
const DateTimeTable = ({ tzDate, onChange }:IProps) => {

  const [displayDate, setDisplayDate] = useState<T_DisplayDate>(dateObjMap(tzDate))

  const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setDisplayDate({...displayDate, [name]: value})
  }


  useEffect(() => {
    const valid = Object.entries(displayDate).every(obj => {
      const [name, value] = obj
      validNamedField(name, value.toString())
    })
    if(valid) {
      const returnDate =  new Date(+displayDate.year, +displayDate.month-1, +displayDate.day, +displayDate.hour, +displayDate.minute, +displayDate.second)
      onChange( returnDate.getTime() )
    }
  }, [displayDate]);

  useEffect(()=>{
    setDisplayDate(dateObjMap(tzDate))
  }, [tzDate])


  return (
    <table className="convert-date">
      <tbody>
      <tr>
        <td>Year</td>
        <td>Month</td>
        <td>Day</td>
      </tr>
      <tr>
        <td><input type="text" name="year"
                   value={displayDate.year}
                   onChange={onChangeHandler}
                   className={ !validNamedField('year', `${displayDate.year}`) ? 'has-error' : '' } /><span /></td>
        <td><input type="text" name="month"
                   value={displayDate.month}
                   onChange={onChangeHandler}
                   className={ !validNamedField('month', `${displayDate.month}`) ? 'has-error' : '' } /><span /></td>
        <td><input type="text" name="day"
                   value={displayDate.day}
                   onChange={onChangeHandler}
                   className={ !validNamedField('day', `${displayDate.day}`) ? 'has-error' : '' } /><span /></td>
      </tr>
      <tr>
        <td>Hour</td>
        <td>Minute</td>
        <td>Second</td>
      </tr>
      <tr>
        <td><input type="text" name="hour"
                   value={ displayDate.hour }
                   onChange={onChangeHandler}
                   className={ !validNamedField('hour', `${displayDate.hour}`) ? 'has-error' : '' } /><span /></td>
        <td><input type="text" name="minute"
                   value={ displayDate.minute }
                   onChange={onChangeHandler}
                   className={ !validNamedField('minute', `${displayDate.minute}`) ? 'has-error' : '' } /><span /></td>
        <td><input type="text" name="second"
                   value={ displayDate.second }
                   onChange={onChangeHandler}
                   className={ !validNamedField('second', `${displayDate.second}`) ? 'has-error' : '' } /><span /></td>
      </tr>
      </tbody>
    </table>
  )
}

export default memo(DateTimeTable)