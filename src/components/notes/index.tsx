import React, {useEffect, useRef, useState} from 'react';

import {useWidgetProps} from "@/hooks";
import {WIDGETS_ID} from "@/constants";
import {ButtonCopy, ButtonTrash, Dialog} from "@components/ui";

import './style.css'
import {useNotesStore} from "@/store";


const Notes = () => {

  const noteRef = useRef<HTMLTextAreaElement>(undefined)

  const { widgetProps } = useWidgetProps({ widgetId: WIDGETS_ID.NOTES })

  const [mode, setMode] = useState<'view' | 'edit'>('view')
  const [clearConfirm, setClearConfirm] = useState(false)

  const notes = useNotesStore(({notes}) => notes)
  const updateNotes = useNotesStore(({updateNotes}) => updateNotes)

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const notes = e.target.value.trim().split('\n').filter(n=>n!=='').join('\n')
    updateNotes(notes)
    setMode('view')
  }

  const onClearHandler = () => {
    setClearConfirm(true)
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
          <ButtonCopy />
          <ButtonTrash onClick={ onClearHandler } />
        </div>

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
          <textarea ref={ noteRef } onBlur={ onChangeHandler }>{ notes }</textarea>
        }

        <Dialog id={ 'clear-notes-dialog' }
                open={ clearConfirm }
                onClose={ () => setClearConfirm(false) }
                triggerClassNames={['clear-button']}>
          <div className={"dialog-content"}>
            <h3>Are you sure?</h3>
            <p>All notes will be deleted.</p>
            <div className={"dialog-buttons"}>
              <button className={'btn-cancel'} onClick={ () => setClearConfirm(false) }>Cancel</button>
              <button className={'btn-delete'} onClick={ () => { setClearConfirm(false); updateNotes('') } }>Delete</button>
            </div>
          </div>
        </Dialog>

      </div>
    </div>
  )
}

export default Notes;