import React, {useCallback, useEffect, useRef} from 'react';


interface IDialogProps {
  id: string
  open?: boolean
  modal?: boolean
  onClose?: () => void
  triggerClassNames?: string[]
  children: React.ReactNode
}
export const Dialog = ({ id, open, modal, onClose, triggerClassNames, children }:IDialogProps) => {

  const dialogRef = useRef<HTMLDialogElement>(null)

  const dialogOpen = useCallback(() => {
    if(modal) dialogRef.current?.showModal();
    else dialogRef.current?.show();
  }, [modal])

  const dialogClose = () => {
    dialogRef.current?.close()
  }

  const backdropClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if( target.closest(`#${ id }`) || target.closest(`.${ triggerClassNames?.join('.') }`) ) return;
    if(onClose) {
      onClose()
      dialogClose()
    }
  }


  useEffect(() => {
    if(open) dialogOpen()
    else dialogClose()
  }, [open]);

  useEffect(()=>{
    document.addEventListener('click', backdropClick)
    return () => document.removeEventListener('click', backdropClick)
  }, [])


  return (
    <dialog id={ id } ref={dialogRef}>
      { children }
    </dialog>
  )
}
