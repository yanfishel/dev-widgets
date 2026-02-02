import * as React from 'react';
import {useStore} from "@/store";
import {getStorageItem, setStorageItem} from "@/utils";
import {STORAGE_KEYS} from "@/constants";
import {useCallback, useEffect} from "react";


const LIFE_TIME = 30 * 60 * 1000

export const useGeoLocation = () => {

  const [location, setLocation] = React.useState<TLocation | null>(null);

  const settings = useStore(({settings}) => settings)


  const getGeoPosition = useCallback(async () => {

    if(!settings.autoGeoPosition) {
      return settings.location
    }

    const location = getStorageItem(STORAGE_KEYS.WIDGET_WEATHER_LOCATION)
    if(location){
      const parsed = JSON.parse(location)
      if(parsed.timestamp + LIFE_TIME > new Date().getTime()){
        return parsed
      }
    }
    try {
      const location:TLocation = await fetch('http://ip-api.com/json/').then((response) => response.json() )
      if(location){
        const data = {
          ...location,
          timestamp: new Date().getTime()
        }
        setStorageItem(STORAGE_KEYS.WIDGET_WEATHER_LOCATION, JSON.stringify(data))
        return data
      }
    } catch (error) {
      console.error('Error getting location:', error)
    }
  }, [settings.autoGeoPosition])


  useEffect(() => {
    getGeoPosition().then(setLocation)
  }, [getGeoPosition])


  return {
    location
  }
}

export default useGeoLocation