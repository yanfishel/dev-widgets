import {currentLoad, fsSize, mem, networkInterfaces, networkStats} from "systeminformation";


export const getSystemInfo = async () => {
  try {
    const [info, memory] = await Promise.all([ currentLoad(), mem() ])
    return { info, memory }
  } catch (e) {
    console.log('Error get Load', e);
  }
}

export const getDiskUsage = async () => {
  try {
    return await fsSize()
  } catch (e) {
    console.log('Error get Disk usage', e);
  }
}

export const getNetworkStats = async () => {
  try {
    const [stats, iface] = await Promise.all([ networkStats(), networkInterfaces('default') ])
    return {stats, iface}
  } catch (e) {
    console.log('Error get Statistic', e);
  }
}

export const getPublicIP = async () => {
  try {
    const ip = await fetch('https://api.ipify.org?format=json').then(res => res.json())
    return ip.ip
  } catch (e) {
    console.log('Error get IP', e);
  }
}