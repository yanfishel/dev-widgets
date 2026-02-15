import React, {memo, useCallback, useEffect, useState} from 'react';
import {TZDate} from "@date-fns/tz";

import {T_EncodingType} from "@/types/dev-utils";
import {DATE_FORMAT_STANDARDS} from "@/constants";
import {formatDateTimeISOString} from "@/utils";
import {ButtonCopy} from "@components/ui";
import DateTimeTable from "./date-time-table";
import CurrentTimeTable from "./current-time-table";
import TimeZoneTable from "./time-zone-table";

import './style.css'


const DateTime = () => {

  const [format, setFormat] = useState(DATE_FORMAT_STANDARDS[0].name)
  const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)

  const [seconds, setSeconds] = useState(0)
  const [milliseconds, setMilliseconds] = useState(0)
  const [tzDate, setTzDate] = useState<TZDate>(new TZDate())
  const [addOffset, setAddOffset] = useState(false)
  const [addTimeZone, setAddTimeZone] = useState(false)
  const [resultString, setResultString] = useState('')


  const setFormatedString = useCallback((milliseconds:number) => {
    const formated = formatDateTimeISOString(milliseconds, format, addOffset, addTimeZone, timeZone)
    setResultString(formated.formattedString)
  }, [format, addOffset, addTimeZone, timeZone])


  const setNow = useCallback(() => {
    const date = new Date();
    const milliseconds = date.getTime();
    const seconds = Math.floor(milliseconds / 1000);
    setSeconds(seconds)
    setMilliseconds(milliseconds)
  }, [timeZone])

  const setTimeZoneDate = useCallback((milliseconds:number) => {
    const tzDate = new TZDate(milliseconds, timeZone)
    setTzDate(tzDate)
  }, [timeZone])


  const onChangeHandler = (name:string, value:number) => {
    if(name === 'seconds') {
      setSeconds(value)
      const milliseconds = value * 1000;
      setMilliseconds(milliseconds)
    } else if(name === 'milliseconds') {
      setMilliseconds(value)
      const seconds = Math.floor(value / 1000);
      setSeconds(seconds)
    }
  }


  useEffect(() => {
    setFormatedString(milliseconds)
  }, [addOffset, addTimeZone, format, timeZone, milliseconds, tzDate]);

  useEffect(() => {
    setTimeZoneDate(milliseconds)
  }, [milliseconds])

  useEffect(() => {
    setNow()
  }, [])



  return (
    <div className="date-time-container">

      <CurrentTimeTable />

      <table className="convert-time">
        <tbody>
        <tr>
          <td>Seconds</td>
          <td>Milliseconds</td>
        </tr>
        <tr>
          <td>
            <input type="text" name="seconds"
                   value={ seconds }
                   onChange={(e)=>onChangeHandler('seconds', Number(e.target.value))} />
            <span />
          </td>
          <td>
            <input type="text" name="milliseconds"
                   value={ milliseconds }
                   onChange={(e)=>onChangeHandler('milliseconds', Number(e.target.value))} />
            <span />
          </td>
          <td rowSpan={2}>
            <button onClick={ setNow }>Now</button>
          </td>
        </tr>
        </tbody>
      </table>

      <TimeZoneTable value={timeZone} onChange={setTimeZone} />

      <DateTimeTable tzDate={tzDate} />

      <p className="help-text"></p>

      <table className="convert-time">
        <tbody>
        <tr>
          <td rowSpan={2}>
            <label htmlFor="standard-formats">Format</label>
          </td>
          <td rowSpan={2}>
            <select id="standard-formats"
                    value={ format }
                    onChange={(e) => setFormat(e.target.value as T_EncodingType)} >
              { DATE_FORMAT_STANDARDS.map(format =>
                 <option key={ format.name } value={ format.name }>{ format.label }</option>
              )}
            </select>
          </td>
          <td style={{textAlign:'right',paddingBottom:' 2px'}}>
            <label htmlFor="add-offset">Offset</label>
            <input id="add-offset" type="checkbox" name="add-offset" role="switch"
                   disabled={ format === 'ISO-8601-date-time-UTC' }
                   checked={ addOffset }
                   onChange={(e) => setAddOffset(e.target.checked)} />
          </td>
        </tr>
        <tr>
          <td style={{textAlign:'right',paddingBottom:' 2px'}}>
            <label htmlFor="add-time-zone">Time zone</label>
            <input id="add-time-zone" type="checkbox" name="add-time-zone" role="switch"
                   disabled={ format === 'ISO-8601-date-time-UTC' }
                   checked={ addTimeZone }
                   onChange={(e) => setAddTimeZone(e.target.checked)} />
          </td>
        </tr>
        </tbody>
      </table>

      <table className="date-time-result">
        <tbody>
        <tr>
          <td><input type="text" name="date-time-string" readOnly value={ resultString } /></td>
          <td>
            <ButtonCopy onClick={ ()=>null }/>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
  )
}

export default memo(DateTime);