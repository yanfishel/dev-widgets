import {memo, useMemo} from "react";
import { useSettingsStore } from "@/store";


const LockPosition = () => {

  const locked = useSettingsStore(({locked}) => locked)

  const checked = useMemo(() => locked, [locked])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    window.electronAPI.setLockPosition(e.target.checked)
  }


  return (
    <div className={"settings-menu-item"}>
      <label htmlFor="lock-position">Lock position</label>
      <div className="switch-container">
        <input type="checkbox" id="lock-position"
               name="lock-position"
               checked={ checked }
               onChange={ onChange }
               role="switch"/>
      </div>
    </div>
  )
}

export default memo(LockPosition)