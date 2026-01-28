import {useEffect, useState} from "react";


import {useStore} from "@/store";
import {DragIcon} from "@/assets";

import './style.css'


const Dragger = () => {

  const [show, setShow] = useState<boolean>(false)

  const settings = useStore(({settings}) => settings)


  useEffect(()=> setShow(!settings.locked), [settings.locked])


  return (
    <div id="drag-icon" className={show ? '' : 'hidden'}>
      <DragIcon />
    </div>
  )
}

export default Dragger;