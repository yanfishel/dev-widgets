import React, {useCallback, useEffect, useState} from 'react';
import {ReactSortable} from "react-sortablejs";

import { useSettingsStore} from "@/store";
import {WidgetItem} from "./widget-item";


export const WidgetsList = () => {

  const [widgets, setWidgets] = useState<TWidget[]>([])

  const settingsWidgets = useSettingsStore(({widgets}) => widgets)


  const onChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>, widgetId: string) => {
    const newWidgets = widgets.map(widget => {
      if(widget.id === widgetId) {
        widget.active = event.target.checked
      }
      return widget
    })
    setWidgets(newWidgets)
  }, [widgets])


  useEffect(() => {
    const newWidgets = widgets.map((widget, index) => {
      widget.order = index + 1
      if('chosen' in widget) delete widget.chosen
      return widget
    })
    useSettingsStore.setState(state => ({...state, widgets:newWidgets }) )
  }, [widgets]);

  useEffect(()=>{
    setWidgets(settingsWidgets.sort((a, b) => a.order - b.order))
  }, [])


  return (
    <>
      <h1>Widgets</h1>

      <ReactSortable list={ widgets }
                     setList={setWidgets}
                     handle={'.menu-item-handle'}
                     ghostClass={'menu-item-ghost'}
                     dataIdAttr={'data-widget'}
                     className={'sortable-container'}>
        { widgets.map( widget =>
          <WidgetItem key={widget.id}
                      title={widget.title}
                      fieldName={widget.id}
                      checked={widget.active}
                      onChange={ onChangeHandler } />
        ) }
      </ReactSortable>

    </>
  );
};