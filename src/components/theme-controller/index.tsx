import {memo, useCallback, useEffect} from "react";

import {E_THEME} from "@/constants";
import {useGlobalStore, useSettingsStore} from "@/store";


const ThemeController = ():null => {

  const theme = useSettingsStore(({theme}) => theme)


  const setSystemTheme = useCallback((isDark: boolean) => {
    if(theme !== E_THEME.SYSTEM) {
      return
    }
    toggleDarkTheme(isDark)
  }, [theme])

  const toggleDarkTheme = (dark:boolean) => {
    if(dark){
      document.documentElement.classList.add("theme-dark")
    } else {
      document.documentElement.classList.remove("theme-dark")
    }
    useGlobalStore.setState(state => ({...state, selectedTheme: dark ? E_THEME.DARK : E_THEME.LIGHT}))
  }

  const setTheme = useCallback(() => {
    if(theme === E_THEME.SYSTEM) {
      const systemDarkTheme = window.matchMedia("(prefers-color-scheme: dark)")
      systemDarkTheme.addEventListener("change", (e)=>setSystemTheme(e.matches))
      toggleDarkTheme(systemDarkTheme.matches);
    } else {
      toggleDarkTheme(theme === E_THEME.DARK)
    }
  }, [theme, setSystemTheme])


  useEffect(setTheme, [theme])


  return null
}

export default memo(ThemeController);