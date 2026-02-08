import {DISK_USE_THRESHOLD, INFO_CHARS_STEPS, NETWORK_SPEED_LABELS, NETWORK_SPEED_STEPS} from "@/constants";
import { formatBytesMetric } from "@/utils";
import { T_DiskInfo } from "@/types/system-info";


export const chartInitVals = (arrLength:number) => {
  return new Array(arrLength).fill(0)
}

export   const chartStyle = (percents:number[], maxValue?:number) => {
  if(maxValue){
    return `polygon(0 100%, ${ percents.map((sec, i)=> `${i*(100/(INFO_CHARS_STEPS-1))}% ${ (100 - sec / maxValue *100).toFixed(2) }%`).join(', ') }, 100% 100%)`
  }
  return `polygon(0 100%, ${ percents.map((perc, i)=> `${i* (100/(INFO_CHARS_STEPS-1))}% ${100-perc}%`).join(', ') }, 100% 100%)`
}

export const diskInfoMap = (disk:S_FsSizeData):T_DiskInfo => {
  const { mount, use, size } = disk

  const diskLetter = mount.split('/')[mount.split('/').length - 1] ?? '/'
  const usedWidth = use > DISK_USE_THRESHOLD ?  DISK_USE_THRESHOLD  :  use
  const errorWidth = use > DISK_USE_THRESHOLD ?  use - DISK_USE_THRESHOLD  :  0

  return {
    diskLetter,
    diskUse: use,
    diskSize: formatBytesMetric(size, 1),
    usedWidth,
    errorWidth
  }
}

// Get max value of network speed
export const networkChartMaxValue = (rxSec:number[], txSec:number[]) => {

  let maxValue = NETWORK_SPEED_STEPS[0]
  let maxLabel = NETWORK_SPEED_LABELS[0]
  const max_speed_rec = rxSec.reduce((prev, curr) => Math.max(prev, curr), 0)
  const max_speed_trans = txSec.reduce((prev, curr) => Math.max(prev, curr), 0)
  const max_speed = Math.max(max_speed_rec, max_speed_trans)
  for (let i = 1; i < NETWORK_SPEED_STEPS.length; i++) {
    if(max_speed < NETWORK_SPEED_STEPS[i] && max_speed > NETWORK_SPEED_STEPS[i-1]){
      maxValue = NETWORK_SPEED_STEPS[i]
      maxLabel = NETWORK_SPEED_LABELS[i]
    }
  }
  return {
    maxValue,
    maxLabel
  }
}