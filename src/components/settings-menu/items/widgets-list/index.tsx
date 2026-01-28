import React, {useCallback, useEffect, useState} from 'react';
import {ReactSortable} from "react-sortablejs";

import {useStore} from "@/store";
import {WidgetsItem} from "./widgets-item";


export const WidgetsList = () => {

  const [widgets, setWidgets] = useState<TWidget[]>([])

  const settings = useStore(({settings}) => settings)
  const setSettingsValue = useStore(({setSettingsValue}) => setSettingsValue)


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
    setSettingsValue('widgets', newWidgets)
  }, [widgets]);

  useEffect(()=>{
    setWidgets(settings.widgets.sort((a, b) => a.order - b.order))
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
          <WidgetsItem key={widget.id}
                       title={widget.title}
                       fieldName={widget.id}
                       checked={widget.active}
                       onChange={ onChangeHandler } />
        ) }
      </ReactSortable>

    </>
  );
};