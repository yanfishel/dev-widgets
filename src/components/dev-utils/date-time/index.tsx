import React, {memo, useCallback, useEffect, useState} from 'react';
import {TZDate} from "@date-fns/tz";
import {toast} from "react-hot-toast";

import {T_EncodingType} from "@/types/dev-utils";
import {DATE_FORMAT_STANDARDS} from "@/constants";
import {copyToClipboard, formatDateTimeISOString} from "@/utils";
import {ButtonCopy, WidgetToaster} from "@components/ui";
import DateTimeTable from "./tables/date-time";
import CurrentTimeTable from "./tables/current-time";
import TimeZoneTable from "./tables/time-zone";
import MillisecondsTable from "./tables/milliseconds";

import './style.css'


const DateTime = () => {

  const [format, setFormat] = useState(DATE_FORMAT_STANDARDS[0].name)
  const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)

  const [milliseconds, setMilliseconds] = useState(0)
  const [tzDate, setTzDate] = useState<TZDate>(new TZDate())
  const [addOffset, setAddOffset] = useState(false)
  const [addTimeZone, setAddTimeZone] = useState(false)
  const [helpText, setHelpText] = useState('')
  const [resultString, setResultString] = useState('')


  const setFormatedString = useCallback((milliseconds:number) => {
    const formated = formatDateTimeISOString(milliseconds, format, addOffset, addTimeZone, timeZone)
    const { formattedString, helpText } = formated
    setResultString(formattedString)
    setHelpText(helpText)
  }, [format, addOffset, addTimeZone, timeZone])


  const setTimeZoneDate = useCallback((milliseconds:number) => {
    const tzDate = new TZDate(milliseconds, timeZone)
    setTzDate(tzDate)
  }, [timeZone])


  const onCopyClickHandler = async (str:string) => {
    if(!str)  return
    const toasterId = `toaster-date-time`
    await copyToClipboard( str,
      () => toast.success('Copied!', { toasterId }),
      () => toast.error('Failed to copy!', { toasterId }) )
  }


  useEffect(() => {
    setFormatedString(milliseconds)
  }, [addOffset, addTimeZone, format, timeZone, milliseconds, tzDate]);

  useEffect(() => {
    setTimeZoneDate(milliseconds)
  }, [milliseconds])


  return (
    <div className="date-time-container">

      <WidgetToaster toasterId={'toaster-date-time'} />

      <CurrentTimeTable onCopyHandler={ onCopyClickHandler } />

      <MillisecondsTable onChangeHandler={ setMilliseconds } />

      <TimeZoneTable value={timeZone} onChange={setTimeZone} />

      <DateTimeTable tzDate={tzDate} />

      <p className="help-text">{ helpText }</p>

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
            <ButtonCopy onClick={ ()=> onCopyClickHandler(resultString) }/>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
  )
}

export default memo(DateTime);