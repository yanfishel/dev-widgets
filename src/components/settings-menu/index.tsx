import {useCallback, useEffect} from "react";

import {useStore} from "@/store";
import {CloseIcon, SettingsIconHover, SettingsIconRegular} from "@/assets";
import './style.css'
import LockPosition from "./items/lock-position";
import WidgetsSize from "./items/widgets-size";
import ThemeSelect from "./items/theme-select";



const SettingsMenu = () => {

  const settings = useStore(({settings}) => settings)
  const storeSettings = useStore(({storeSettings}) => storeSettings)


  const settingsMenuOpen = () => {
    (document.getElementById('settings-dialog') as HTMLDialogElement).showModal();
  }

  const settingsMenuClose = () => {
    (document.getElementById('settings-dialog') as HTMLDialogElement).close()
  }

  const backdropClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if(target.closest('.settings-menu') || target.closest('.settings-menu-open')) return;
    settingsMenuClose();
  }


  useEffect(()=>{
    document.addEventListener('click', backdropClick)
    return () => document.removeEventListener('click', backdropClick)
  }, [])


  return (
    <div id={'settings-container'}>
      <div className={"circle-button settings-menu-open"} onClick={settingsMenuOpen}>
        <SettingsIconRegular />
        <SettingsIconHover />
      </div>
      <dialog id={'settings-dialog'} closedby="any">
        <div className={"container settings-menu"}>
          <div className={"circle-button settings-menu-close"} onClick={settingsMenuClose}>
            <CloseIcon />
          </div>
          <h1 style={{paddingTop:"16px"}}>Settings</h1>

          <LockPosition />

          <WidgetsSize />

          <ThemeSelect />



        </div>
      </dialog>
    </div>
  )

}

export default SettingsMenu;