import React, {memo, useEffect, useRef, useState} from 'react';

import {T_MemoryInfo} from "@/types/system-info";
import {chartInitVals, chartStyle, formatBytesMetric} from "@/utils";
import {INFO_CHARS_STEPS, INFO_CHARS_UPDATE_INTERVAL} from "@/constants";


const CpuRamStatus = () => {

  const updateTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const [cpuCores, setCpuCores] = useState(0)
  const [ram, setRam] = useState<T_MemoryInfo>({ total: '', used: ''})
  const [cpuPercents, setCpuPercents] = useState<number[]>(chartInitVals(INFO_CHARS_STEPS))
  const [ramPercents, setRamPercents] = useState<number[]>(chartInitVals(INFO_CHARS_STEPS))


  const updateCpuRamStatus = async () => {
    const cpuStatus = await window.electronAPI.getSystemInfo()
    const { info, memory } = cpuStatus
    if(info) {
      setCpuCores(info.cpus.length)
      const cpuPercent = +info.currentLoad.toFixed(1)
      setCpuPercents(prev => prev.length > INFO_CHARS_STEPS ? [...prev.slice(1), cpuPercent] : [...prev, cpuPercent])
    }
    if(memory) {
      const inUse = memory.total - memory.available // memory.used
      const ramPercent = +(inUse / memory.total * 100).toFixed(1)
      setRamPercents(prev => prev.length > INFO_CHARS_STEPS ? [...prev.slice(1), ramPercent] : [...prev, ramPercent])
      setRam({ total: formatBytesMetric(memory.total, 1), used: formatBytesMetric(inUse) })
    }
  }


  useEffect(() => {
    updateTimer.current = setInterval(updateCpuRamStatus, INFO_CHARS_UPDATE_INTERVAL * 1000)
    updateCpuRamStatus()

    return () => clearInterval(updateTimer.current!)
  }, [])


  return (
    <div className="cpu-ram-status">

      <div className="status-container">
        <div className="title">CPU
          <div id="cpu-status">{ cpuCores } cores</div>
        </div>
        <div className="chart-container">
          <div id="cpu-percent" className="percent">{ cpuPercents[cpuPercents.length-1] }%</div>
          <div id="cpu-chart" className="chart" style={{ clipPath: chartStyle(cpuPercents) }}></div>
        </div>
      </div>

      <div className="status-container">
        <div className="title">RAM
          <div id="ram-status">{ ram.total }</div>
        </div>
        <div className="chart-container">
          <div id="ram-percent" className="percent">{ ramPercents[ramPercents.length-1] }%</div>
          <div id="ram-chart" className="chart" style={{ clipPath: chartStyle(ramPercents) }}></div>
        </div>
      </div>

    </div>
  )
}

export default memo(CpuRamStatus)