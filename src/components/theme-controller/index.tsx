import {useStore} from "@/store";
import {useCallback, useEffect} from "react";


const ThemeController = ():null => {

  const settings = useStore(({settings}) => settings)


  const setSystemTheme = useCallback((isDark: boolean) => {
    if(settings.theme !== 'system') {
      return
    }
    toggleDarkTheme(isDark)
  }, [settings.theme])

  const toggleDarkTheme = (dark:boolean) => {
    if(dark){
      document.documentElement.classList.add("theme-dark")
    } else {
      document.documentElement.classList.remove("theme-dark")
    }
  }

  useEffect(()=>{
    // Set initial theme && Listen for system theme changes
    const systemDarkTheme = window.matchMedia("(prefers-color-scheme: dark)")
    systemDarkTheme.addEventListener("change", (e)=>setSystemTheme(e.matches))

    if(settings.theme === 'system') {
      toggleDarkTheme(systemDarkTheme.matches);
    } else {
      toggleDarkTheme(settings.theme === 'dark')
    }
  }, [])


  useEffect(()=>{
    if(settings.theme === 'system'){
      const systemDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
      toggleDarkTheme(systemDarkTheme.matches)
    } else {
      toggleDarkTheme(settings.theme === 'dark')
    }
  }, [settings.theme])


  return null
}

export default ThemeController;