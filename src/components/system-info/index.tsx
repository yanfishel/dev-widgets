import React from 'react';

import { WIDGETS_ID} from "@/constants";
import { useWidgetProps } from "@/hooks";
import DisksStatus from "./panels/disks-status";
import CpuRamStatus from "./panels/cpu-ram-status";
import {NetworkStatus} from "./panels/network-status";

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
        { widgetProps.active &&
          <div className="system-info-container">

            <CpuRamStatus />

            <NetworkStatus />

            <DisksStatus />

          </div>
        }
      </div>
    </div>
  )
}