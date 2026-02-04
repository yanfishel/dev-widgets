import {WEATHER_DATA} from "@/constants";
import {WEATHER_ICONS} from "@/assets";
import {formatDate} from "@/utils";
import {IDayItem} from "@components/weather-daily/day-item";

/**
 * Returns weather condition details including icon and description based on the weather code and time of day.
 *
 * @param {number} [code=0] - The weather condition code. Default is 0.
 * @param {boolean} [isDay=true] - A boolean indicating if the time is day (true) or night (false). Default is true.
 * @returns {{icon: string, description: string}} An object containing the weather icon and description.
 */
export const weatherConditionByCode = (code: number = 0, isDay: boolean = true) => {
  let icon = ''
  let description = '-'

  const weatherCondition = WEATHER_DATA.find(data => data.code.includes(code))
  if(weatherCondition){
    const iconKey  = `${weatherCondition.icon}_${isDay ? 'd' : 'n'}` as keyof typeof WEATHER_ICONS
    icon = WEATHER_ICONS[iconKey]
    description = weatherCondition.description ?? '-'
  }

  return { icon, description }
}


/**
 * Transforms daily weather data into an array of formatted day items.
 *
 * This function processes the raw weather data provided in the `TWeatherDaily` format
 * and creates an array of objects with detailed weather information for each day.
 *
 * @param {TWeatherDaily} dailyData - The raw daily weather data, which includes timestamps,
 *        temperature details, and weather condition codes for several days.
 *
 * @returns {IDayItem[]} An array of day items, where each object represents a formatted
 *          summary of weather data for a single day, including date, weather description,
 *          minimum and maximum temperatures, and an associated weather icon.
 */
export const weatherForecastMap = (dailyData:TWeatherDaily):IDayItem[] => {
  const dailyForecast:IDayItem[] = []
  dailyData.time.forEach((time:number, index:number) => {
    const date = new Date(time * 1000);
    const weekday = formatDate(date, { weekday: 'short'});
    const day = formatDate(date, { day: 'numeric', month: 'short' });
    const minData = dailyData.temperature_2m_min[index]
    const maxData = dailyData.temperature_2m_max[index]
    const code = dailyData.weather_code[index]
    const { icon, description } = weatherConditionByCode(code)
    dailyForecast.push({
      day, weekday, icon, description,
      min: minData ? Math.round(minData) : 0,
      max: maxData ? Math.round(maxData) : 0
    })
  })

  return dailyForecast
}


/**
 * Fetches the geographical location of the user based on their IP address.
 *
 * This function makes an asynchronous HTTP request to the IP-API service and
 * retrieves the location details in JSON format. The location data includes
 * information such as country, region, city, and other related details.
 *
 * @returns {Promise<TLocation | undefined>} A promise that resolves to an object
 * containing the user's location details or undefined in case of an error.
 *
 * @throws {Error} Logs an error message to the console if the request or
 * JSON parsing fails.
 */
export const getUserIPLocation = async () => {
  try {
    const location:TLocation = await fetch('http://ip-api.com/json/').then((response) => response.json() )
    return location
  } catch (error) {
    console.error('Error getting location:', error)
  }
}


/**
 * Fetches weather data for a given location from the Open-Meteo API.
 *
 * This function retrieves current, hourly, and daily weather information
 * such as temperature, rain, snowfall, weather codes, and more.
 * The response is augmented with additional properties such as the
 * request timestamp and geographic coordinates for the requested location.
 *
 * @param {TLocation} location - The geographic location with latitude (`lat`) and longitude (`lon`) properties.
 * @returns {Promise<TWeatherData | undefined>} A promise that resolves to the weather data object containing
 *          detailed weather information or `undefined` if an error occurs during the fetch process.
 */
export const getWeatherData = async (location:TLocation):Promise<TWeatherData | undefined> => {
  try {
    const apiBaseURL = 'https://api.open-meteo.com/v1/forecast'
    const urlLocation = `latitude=${location.lat}&longitude=${location.lon}`
    const urlCurrent = 'current=temperature_2m,rain,showers,weather_code,is_day,snowfall'
    const urlHourly = 'hourly=weather_code,rain,showers,snowfall,snow_depth,temperature_2m'
    const urlDaily = 'daily=weather_code,temperature_2m_min,temperature_2m_max'
    const apiURL = `${ apiBaseURL }?${ urlLocation }&${ urlCurrent }&${ urlHourly }&${ urlDaily }&timeformat=unixtime&timezone=auto`
    const response = await fetch(apiURL)
    const responseJson = await response.json()
    return {
      ...responseJson,
      timestamp: new Date().getTime(),
      lat: location.lat,
      lon: location.lon
    }
  } catch (error) {
    console.log('Error fetching weather data:', error)
  }
}