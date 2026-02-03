import { useSettingsStore } from "@/store";
import {DragIcon} from "@/assets";

import './style.css'


const Dragger = () => {

  const locked = useSettingsStore(({locked}) => locked)

  return (
    <div id="drag-icon" className={locked ? 'hidden' : ''}>
      <DragIcon />
    </div>
  )
}

export default Dragger;