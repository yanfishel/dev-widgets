import {memo, useMemo} from "react";

import { useSettingsStore} from "@/store";
import {T_WidgetsSize} from "@/types/settings";


const WidgetsSize = () => {

  const size = useSettingsStore(({size}) => size)

  const value = useMemo(() => size, [size])

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value as T_WidgetsSize
    window.electronAPI.setWidgetsSize(size)
  }


  return (
    <div className={"settings-menu-item"}>
      <label htmlFor="widgets-size">Size</label>
      <select name="widgets-size" id="widgets-size"
              value={ value }
              onChange={ onChange }>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
    </div>
  )
}

export default memo(WidgetsSize)