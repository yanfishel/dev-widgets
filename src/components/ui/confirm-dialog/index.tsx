import React, {memo} from 'react';

import {Dialog} from "@components/ui/dialog";
import './style.css'


interface IProps {
  id: string
  title: string
  text?: string
  open: boolean
  openerClassName?: string
  onClose: () => void
  onApply: () => void
}
const ConfirmDialogFn = ({ id, title, text, open, openerClassName, onClose, onApply }:IProps) => {

  return (
    <Dialog id={ id }
            open={ open }
            onClose={ onClose }
            openerClassName={ openerClassName }
            className={'confirm-modal-dialog'} >
      <div className={"dialog-content"}>
        <h3>{ title }</h3>
        { text && <p>{ text }</p> }
        <div className={"dialog-buttons"}>
          <button className={'btn-cancel'} onClick={ onClose }>No</button>
          <button className={'btn-delete'} onClick={ onApply }>Yes</button>
        </div>
      </div>
    </Dialog>
  )
}

export const ConfirmDialog = memo(ConfirmDialogFn)