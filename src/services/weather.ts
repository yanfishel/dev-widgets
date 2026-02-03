
export const getUserIPLocation = async () => {
  try {
    const location:TLocation = await fetch('http://ip-api.com/json/').then((response) => response.json() )
    return location
  } catch (error) {
    console.error('Error getting location:', error)
  }
}

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
    const data = {
      ...responseJson,
      timestamp: new Date().getTime(),
      lat: location.lat,
      lon: location.lon
    }
    return data
  } catch (error) {
    console.log('Error fetching weather data:', error)
  }
}