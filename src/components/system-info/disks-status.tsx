import React, {memo, useEffect, useRef, useState} from "react";

import {T_DiskInfo} from "@/types/system-info";
import {diskInfoMap} from "@/utils";
import { DISKS_USAGE_UPDATE_INTERVAL } from "@/constants";


const DisksStatus = () => {

  const updateTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const [diskUsage, setDiskUsage] = useState<T_DiskInfo[]>([])

  const updateDiskUsage = async () => {
    const disksUsage = await window.electronAPI.getDiskUsage()
    setDiskUsage( disksUsage ? disksUsage.map(diskInfoMap) : [] )
  }

  useEffect(() => {
    updateDiskUsage()
    updateTimer.current = setInterval(updateDiskUsage, DISKS_USAGE_UPDATE_INTERVAL)

    return () => clearInterval(updateTimer.current!)
  }, []);

  return (
    <div className="system-disks-status">
      <div className="title">HDD</div>
      <div id="disk-usage">
        { diskUsage.length > 0
          ? diskUsage.map((disk, index) => (
            <div key={ index } className="disk-usage-item">
              <div className="disk-name">
                { disk.diskLetter }
                <span>{ disk.diskSize }</span>
              </div>
              <div className="disk-percent">{ disk.diskUse }%</div>
              <div className="disk-used-progress">
                <div className="disk-used-bar" style={{width: disk.usedWidth }} />
                <div className="disk-used-bar-error" style={{width: disk.errorWidth }} />
              </div>
            </div>
          ))
          : <p className="error">No data available</p>
        }
      </div>
    </div>
  )
}

export default memo(DisksStatus)