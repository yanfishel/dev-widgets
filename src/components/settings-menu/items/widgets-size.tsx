import {memo, useMemo} from "react";
import {useStore} from "@/store";


const WidgetsSize = () => {

  const settings = useStore(({settings}) => settings)

  const size = useMemo(() => settings.size, [settings.size])

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value as TWidgetsSize
    window.electronAPI.setWidgetsSize(size)
  }


  return (
    <div className={"settings-menu-item"}>
      <label htmlFor="widgets-size">Size</label>
      <select name="widgets-size" id="widgets-size"
              value={ size }
              onChange={ onChange }>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
    </div>
  )
}

export default memo(WidgetsSize)