import { useEffect } from "react";

import {AboutIcon, CloseIcon, SettingsIconHover, SettingsIconRegular} from "@/assets";
import LockPosition from "./items/lock-position";
import WidgetsSize from "./items/widgets-size";
import ThemeSelect from "./items/theme-select";
import Weather from "./items/weather";
import {WidgetsList} from "./items/widgets-list";

import './style.css'


const SettingsMenu = () => {

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

  const openAboutWindow = () => {
    window.electronAPI.openAboutWindow()
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
            <CloseIcon/>
          </div>
          <h1 style={{paddingTop: "16px"}}>Settings</h1>

          <LockPosition/>

          <WidgetsSize/>

          <ThemeSelect/>

          <Weather />

          <WidgetsList />

          <div className="settings-menu-footer">
            <div className={"footer-content"}>
              <a href="#" onClick={ openAboutWindow }><AboutIcon /> About</a>
            </div>
          </div>

        </div>
      </dialog>
    </div>
  )

}

export default SettingsMenu;