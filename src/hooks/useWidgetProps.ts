import {useEffect, useState} from "react";
import {useSettingsStore} from "@/store";


type IProps = {
  widgetId: string
}
export const useWidgetProps = ({ widgetId }: IProps) => {

  const widgets = useSettingsStore(({widgets}) => widgets)
  const widget = widgets.find(widget => widget.id === widgetId)

  const [widgetProps, setWidgetProps] = useState<IWidgetProps>({ active:false, order:widget?.order ?? 0 })

  useEffect(() => {
    const widget = widgets.find(widget => widget.id === widgetId)
    if(!widget) return
    const { active, order, collapsed } = widget
    setWidgetProps({ active, order, collapsed })
  }, [widgets])


  return { widgetProps }
}