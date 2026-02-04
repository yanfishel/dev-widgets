import * as React from 'react';

import {DragItemIcon} from "@/assets";


interface IProps {
  title: string
  fieldName: string
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>, widgetId: string) => void
}
export const WidgetItem = ({ title, fieldName, checked, onChange }: IProps) => {
  return (
    <div className={'settings-menu-item'}>
      <div className={"menu-item-handle"}><DragItemIcon /></div>
      <label htmlFor={ fieldName+'_checkbox' }>{ title }</label>
      <div className="switch-container">
        <input type="checkbox" id={ fieldName+'_checkbox' }
               name={ fieldName+'_checkbox' }
               checked={ checked }
               onChange={(event) => onChange(event, fieldName)}
               role="switch" />
      </div>
    </div>
  );
};