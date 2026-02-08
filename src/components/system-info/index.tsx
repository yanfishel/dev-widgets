import React from 'react';

import { WIDGETS_ID} from "@/constants";
import { useWidgetProps } from "@/hooks";
import DisksStatus from "@components/system-info/disks-status";
import CpuRamStatus from "@components/system-info/cpu-ram-status";
import {NetworkStatus} from "@components/system-info/network-status";

import './style.css'


export const SystemInfo = () => {

  const { widgetProps } = useWidgetProps({ widgetId: WIDGETS_ID.SYSTEM_INFO })


  return (
    <div id={WIDGETS_ID.SYSTEM_INFO}
         style={{
           order: widgetProps.order,
           display: widgetProps.active ? 'block' : 'none'
         }}>

      <div className="container">
        <div className="system-info-container">

          { widgetProps.active && <CpuRamStatus /> }

          { widgetProps.active && <NetworkStatus /> }

          { widgetProps.active && <DisksStatus /> }

        </div>
      </div>

    </div>
  )
}