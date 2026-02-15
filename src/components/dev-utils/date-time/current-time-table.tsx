import React, {memo, useEffect, useState} from 'react';

import {useGlobalStore} from "@/store";
import {ButtonCopy} from "@components/ui";


const CurrentTimeTable = () => {

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
          <ButtonCopy onClick={ ()=>null }/>
        </td>
      </tr>
      <tr>
        <td>Unix Milliseconds:</td>
        <td><input type="text" readOnly value={ current.milliseconds } /></td>
        <td>
          <ButtonCopy onClick={ ()=>null }/>
        </td>
      </tr>
      </tbody>
    </table>
  )
}

export default memo(CurrentTimeTable)