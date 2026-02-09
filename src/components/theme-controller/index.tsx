import {memo, useCallback, useEffect} from "react";

import { useSettingsStore} from "@/store";


const ThemeController = ():null => {

  const theme = useSettingsStore(({theme}) => theme)


  const setSystemTheme = useCallback((isDark: boolean) => {
    if(theme !== 'system') {
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
  }

  const setTheme = useCallback(() => {
    if(theme === 'system') {
      const systemDarkTheme = window.matchMedia("(prefers-color-scheme: dark)")
      systemDarkTheme.addEventListener("change", (e)=>setSystemTheme(e.matches))
      toggleDarkTheme(systemDarkTheme.matches);
    } else {
      toggleDarkTheme(theme === 'dark')
    }
  }, [theme, setSystemTheme])


  useEffect(setTheme, [theme])


  return null
}

export default memo(ThemeController);