import {currentLoad, fsSize, mem, networkInterfaces, networkStats} from "systeminformation";

/**
 * Asynchronously retrieves system information including current load and memory usage.
 *
 * @function
 * @async
 * @returns {Promise<Object>} A promise that resolves to an object containing:
 *  - `info`: Information about the current system load.
 *  - `memory`: Information about the system's memory usage.
 * @throws Will log an error message in case of a failure during data retrieval.
 */
export const getSystemInfo = async () => {
  try {
    const [info, memory] = await Promise.all([ currentLoad(), mem() ])
    return { info, memory }
  } catch (e) {
    console.log('Error get Load', e);
  }
}


/**
 * Asynchronously retrieves the disk usage information of the system.
 * Utilizes the `fsSize` method to gather disk size and usage details.
 * If an error occurs during the process, it logs the error message to the console.
 *
 * @function
 * @returns {Promise<Object|undefined>} A promise that resolves to the disk usage data object
 *                                      or undefined if an error occurs.
 */
export const getDiskUsage = async () => {
  try {
    return await fsSize()
  } catch (e) {
    console.log('Error get Disk usage', e);
  }
}


/**
 * Asynchronously retrieves network statistics and default network interface information.
 *
 * @async
 * @function getNetworkStats
 * @returns {Promise<Object>} A promise that resolves to an object containing the network statistics (`stats`)
 * and default network interface information (`iface`).
 * @throws Will log an error message to the console if the operation fails.
 */
export const getNetworkStats = async () => {
  try {
    const [stats, iface] = await Promise.all([ networkStats(), networkInterfaces('default') ])
    return {stats, iface}
  } catch (e) {
    console.log('Error get Statistic', e);
  }
}


/**
 * Asynchronously retrieves the public IP address of the client.
 *
 * Makes a request to an external API (https://api.ipify.org) to obtain
 * the current public IP address of the client.
 *
 * @async
 * @function
 * @returns {Promise<string|undefined>} A promise that resolves to the public IP address as a string.
 * Resolves with `undefined` in case of an error.
 */
export const getPublicIP = async () => {
  try {
    const ip = await fetch('https://api.ipify.org?format=json').then(res => res.json())
    return ip.ip
  } catch (e) {
    console.log('Error get IP', e);
  }
}