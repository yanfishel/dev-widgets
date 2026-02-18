import React, {memo, useEffect, useState} from 'react';


interface IProps {
  onChangeHandler?:(milliseconds:number)=>void
}
const MillisecondsTable = ({ onChangeHandler = ()=>null }:IProps) => {

  const [seconds, setSeconds] = useState(0)
  const [milliseconds, setMilliseconds] = useState(0)

  const onInputChangeHandler = (name:string, value:number) => {
    const seconds = name === 'seconds' ? value : Math.floor(value / 1000);
    const milliseconds = name === 'seconds' ? value * 1000 : value;
    setSeconds( seconds )
    setMilliseconds( milliseconds )
    onChangeHandler( milliseconds )
  }

  const setNow = () => {
    const date = new Date();
    const milliseconds = date.getTime();
    const seconds = Math.floor(milliseconds / 1000);
    setSeconds(seconds)
    setMilliseconds( milliseconds )
    onChangeHandler( milliseconds )
  }


  useEffect(() => setNow(), [])


  return (
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
                 onChange={(e)=>onInputChangeHandler('seconds', Number(e.target.value))} />
          <span />
        </td>
        <td>
          <input type="text" name="milliseconds"
                 value={ milliseconds }
                 onChange={(e)=>onInputChangeHandler('milliseconds', Number(e.target.value))} />
          <span />
        </td>
        <td rowSpan={2}>
          <button onClick={ setNow }>Now</button>
        </td>
      </tr>
      </tbody>
    </table>
  )
}

export default memo(MillisecondsTable)