import React, {memo, useEffect, useState} from 'react';

import {useGlobalStore} from "@/store";
import {ButtonCopy} from "@components/ui";


interface IProps {
  onCopyHandler: (str:string)=>void
}
const CurrentTimeTable = ({ onCopyHandler }:IProps) => {

  const [current, setCurrent] = useState<{seconds:number, milliseconds:number}>({seconds:0, milliseconds:0})

  const globalDateTime = useGlobalStore((state) => state.globalDateTime)


  useEffect(() => {
    const time = globalDateTime.getTime()
    setCurrent({
      seconds: Math.floor(time / 1000),
      milliseconds: time
    })
  }, [globalDateTime])


  return (
    <table className="current-time">
      <tbody>
      <tr>
        <td>Unix Seconds:</td>
        <td><input type="text" readOnly value={ current.seconds } /></td>
        <td>
          <ButtonCopy onClick={ ()=> onCopyHandler(current.seconds.toString()) }/>
        </td>
      </tr>
      <tr>
        <td>Unix Milliseconds:</td>
        <td><input type="text" readOnly value={ current.milliseconds } /></td>
        <td>
          <ButtonCopy onClick={ ()=> onCopyHandler(current.milliseconds.toString()) }/>
        </td>
      </tr>
      </tbody>
    </table>
  )
}

export default memo(CurrentTimeTable)