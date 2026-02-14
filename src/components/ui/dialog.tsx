import React, {useCallback, useEffect, useRef} from 'react';


interface IDialogProps {
  id: string
  position?: 'top' | 'center' | 'bottom'
  fullWidth?: boolean
  open?: boolean
  modal?: boolean
  className?: string
  onClose?: () => void
  openerClassName?: string
  children: React.ReactNode
}
export const Dialog = ({ id, position, fullWidth, open, modal, onClose, className, openerClassName, children }:IDialogProps) => {

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
    if(
      target.closest(`#${ id }`)
      || (openerClassName && target.closest(`${ openerClassName }`))
    ) {
      return
    }
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
    <dialog id={ id } ref={dialogRef} className={ `widget-dialog position-${position} ${fullWidth ? 'full-width' : ''} ${className}` }>
      { children }
    </dialog>
  )
}
