import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { toast } from "react-hot-toast";

import {useNotesStore} from "@/store";
import {useWidgetProps} from "@/hooks";
import {WIDGETS_ID} from "@/constants";
import {ButtonCopy, ButtonTrash, ConfirmDialog, WidgetToaster} from "@components/ui";

import './style.css'


const Notes = () => {

  const noteRef = useRef<HTMLTextAreaElement>(undefined)

  const [mode, setMode] = useState<'view' | 'edit'>('view')
  const [clearConfirm, setClearConfirm] = useState(false)

  const notes = useNotesStore(({notes}) => notes)
  const updateNotes = useNotesStore(({updateNotes}) => updateNotes)

  const { widgetProps } = useWidgetProps({ widgetId: WIDGETS_ID.NOTES })

  const toasterProps = useMemo(() => ({ toasterId:'notes-toast' }), [])


  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const notes = e.target.value.trim().split('\n').filter(n=>n!=='').join('\n')
    updateNotes(notes)
  }

  const onCopyHandler = useCallback(async () => {
    if(!notes.trim()) return
    try {
      await navigator.clipboard.writeText(notes)
      toast.success('Copied!', toasterProps)
    } catch (err) {
      toast.error('Failed to copy!', toasterProps)
      console.error('Failed to copy: ', err)
    }
  }, [notes])

  const onClearHandler = () => {
    toast.dismiss()
    setClearConfirm(true)
  }

  const clearNotes = () => {
    setClearConfirm(false)
    updateNotes('')
  }


  useEffect(()=>{
    if(mode === 'edit' && noteRef.current) noteRef.current.focus()
  }, [mode])


  return (
    <div id={WIDGETS_ID.NOTES}
         style={{
           order: widgetProps.order,
           display: widgetProps.active ? 'block' : 'none'
         }}>
      <div className="container">

        <div className="action-bar">
          <ButtonCopy onClick={ onCopyHandler } />
          <ButtonTrash onClick={ onClearHandler } />
        </div>

        <WidgetToaster {...toasterProps} />

        { mode === 'view' &&
          <div className={"notes-view"} onClick={ ()=>setMode('edit') }>
            <ul>
              { notes && notes.split('\n').map((note, i) =>
                <li key={i}>{note}</li>
              )}
            </ul>
          </div>
        }
        { mode === 'edit' &&
          <textarea ref={ noteRef }
                    value={ notes }
                    onChange={ onChangeHandler }
                    onBlur={ ()=>setMode('view') } />
        }

        { clearConfirm &&
          <ConfirmDialog id={'clear-notes-dialog'}
                         title={'Are you sure?'}
                         text={'All notes will be deleted.'}
                         open={ clearConfirm }
                         openerClassName={'.clear-button'}
                         onClose={() => setClearConfirm(false)}
                         onApply={() => clearNotes()} />
        }
      </div>
    </div>
  )
}

export default memo(Notes)