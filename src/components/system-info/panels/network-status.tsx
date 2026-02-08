import React, {useEffect, useRef, useState} from 'react';

import {T_MaxSpeed} from "@/types/system-info";
import {INFO_CHARS_STEPS, INFO_CHARS_UPDATE_INTERVAL} from "@/constants";
import {chartInitVals, chartStyle, networkChartMaxValue} from "@/utils";
import {EthernetIcon, WiFiIcon} from "@/assets";


export const NetworkStatus = () => {

  const updateTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const [maxSpeed, setMaxSpeed] = useState<T_MaxSpeed>({speed:0, label:''})
  const [publicIP, setPublicIP] = useState('')
  const [networkInterface, setNetworkInterface] = useState<S_NetworkInterfacesData>()
  const [rxSec, setRxSec] = useState<number[]>(chartInitVals(INFO_CHARS_STEPS))
  const [txSec, setTxSec] = useState<number[]>(chartInitVals(INFO_CHARS_STEPS))


  const updateIP = async () => {
    try {
      const ip = await window.electronAPI.getPublicIP()
      setPublicIP(ip)
    } catch (e) {
      console.log(e);
      setPublicIP('Offline')
    }
  }

  const updateNetworkStatus = async () => {
    const networkStatus = await window.electronAPI.getNetworkStatsInfo()
    const { stats, iface } = networkStatus
    setNetworkInterface( iface )
    let rx_sec = 0, tx_sec = 0
    stats.forEach(item => {
      rx_sec += +(item.rx_sec * 8 / 1000).toFixed(2)
      tx_sec += +(item.tx_sec * 8 / 1000).toFixed(2)
    })
    setRxSec(prev => prev.length > INFO_CHARS_STEPS ? [...prev.slice(1), rx_sec] : [...prev, rx_sec])
    setTxSec(prev => prev.length > INFO_CHARS_STEPS ? [...prev.slice(1), tx_sec] : [...prev, tx_sec])
  }

  const startHandler = async () => {
    await Promise.all([updateIP(), updateNetworkStatus()])
  }

  const onLineHandler = () => {
    clearInterval(updateTimer.current!)
    updateTimer.current = setInterval(updateNetworkStatus, INFO_CHARS_UPDATE_INTERVAL*1000)
    startHandler()
  }

  const offLineHandler = () => {
    clearInterval(updateTimer.current!)
    setPublicIP('Offline')
    setRxSec(chartInitVals(INFO_CHARS_STEPS))
    setTxSec(chartInitVals(INFO_CHARS_STEPS))
  }


  useEffect(() => {
    const { maxValue, maxLabel } = networkChartMaxValue(rxSec, txSec)
    setMaxSpeed({ speed: maxValue, label: maxLabel })
  }, [rxSec, txSec]);

  useEffect(() => {
    updateTimer.current = setInterval(updateNetworkStatus, INFO_CHARS_UPDATE_INTERVAL*1000)
    startHandler()
    window.addEventListener("online", onLineHandler);
    window.addEventListener("offline", offLineHandler);

    return () => {
      clearInterval(updateTimer.current!)
      window.removeEventListener("online", onLineHandler);
      window.removeEventListener("offline", offLineHandler);
    }
  }, [])


  return (
    <div className="network-status">
      <div className="title">Network</div>

      <div className={`iface-info state-${networkInterface?.operstate}`}>
        { networkInterface &&
          <>
            <p><span>{ networkInterface.iface }</span>{ networkInterface.iface.type === 'wireless' ? <WiFiIcon /> : <EthernetIcon /> }</p>
            <p>{ publicIP }</p>
            <p>{ networkInterface.ip4 }</p>
          </>
        }
      </div>

      <div title="Received bytes/sec" className="chart-container">
        <div id="data-charts-label">{ maxSpeed.label }</div>
        <div className="down"></div>
        <div id="chart-received" className="chart" style={{ clipPath: chartStyle(rxSec, maxSpeed.speed) }} />
      </div>

      <div title="Transfered bytes/sec" className="chart-container">
        <div className="up"></div>
        <div id="chart-transfered" className="chart" style={{ clipPath: chartStyle(txSec, maxSpeed.speed) }}></div>
      </div>
    </div>
  )
}