import {memo, useMemo} from "react";
import {useStore} from "@/store";


const LockPosition = () => {

  const settings = useStore(({settings}) => settings)

  const checked = useMemo(() => settings.locked, [settings.locked])

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