import {memo, useMemo} from "react";

import { useSettingsStore} from "@/store";
import {T_Theme} from "@/types/settings";


const ThemeSelect = () => {

  const theme = useSettingsStore(({theme}) => theme)

  const selectedTheme = useMemo(() => theme, [theme])


  return (
    <div className={"settings-menu-item"}>
      <label htmlFor="theme">Theme</label>
      <select name="theme"
              id="theme"
              value={ selectedTheme }
              onChange={e => useSettingsStore.setState(state => ({...state, theme:e.target.value as T_Theme}) )}>
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  )
}

export default memo(ThemeSelect)