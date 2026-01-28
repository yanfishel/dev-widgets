import {memo, useMemo} from "react";
import {useStore} from "@/store";


const ThemeSelect = () => {

  const settings = useStore(({settings}) => settings)
  const setSettingsValue = useStore(({setSettingsValue}) => setSettingsValue)

  const theme = useMemo(() => settings.theme, [settings.theme])


  return (
    <div className={"settings-menu-item"}>
      <label htmlFor="theme">Theme</label>
      <select name="theme"
              id="theme"
              value={theme}
              onChange={e => setSettingsValue('theme', e.target.value)}>
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  )
}

export default memo(ThemeSelect)