import React, {memo, useCallback, useMemo, useState} from 'react';

import {useDevUtilsStore} from "@/store";
import {downloadFile} from "@/utils";
import {ButtonCopy, ButtonDownload, ButtonTrash, ConfirmDialog} from "@components/ui";

import './style.css'
import {toast} from "react-hot-toast";


interface IProps {
  actionContainer?: 'encoded' | 'decoded'
}
const ActionBar = ({ actionContainer }:IProps) => {

  const [clearConfirm, setClearConfirm] = useState(false)

  const encodingType = useDevUtilsStore(({encodingType}) => encodingType)
  const decodedFile = useDevUtilsStore(({decodedFile}) => decodedFile)
  const decodedJWT = useDevUtilsStore(({decodedJWT}) => decodedJWT)
  const decodedText = useDevUtilsStore(({decodedText}) => decodedText)
  const encodedText = useDevUtilsStore(({encodedText}) => encodedText)
  const reset = useDevUtilsStore(({reset}) => reset)
  const resetEncoded = useDevUtilsStore(({resetEncoded}) => resetEncoded)
  const resetDecoded = useDevUtilsStore(({resetDecoded}) => resetDecoded)


  const onDownloadClickHandler = useCallback(() => {
    if(!decodedFile) return
    downloadFile(decodedFile)
  }, [decodedFile])

  const onCopyClickHandler = useCallback(async () => {
    const text = actionContainer === 'encoded'
      ? encodedText
      : decodedText
    if(!text) {
      return
    }
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied!', {toasterId: `toaster-${actionContainer}`})
    } catch (err) {
      toast.error('Failed to copy!', {toasterId: `toaster-${actionContainer}`})
      console.error('Failed to copy: ', err);
    }
  }, [actionContainer, decodedText, encodedText])

  const onClearClickHandler = () => setClearConfirm(true)

  const onClearHandler = useCallback(() => {
    if(actionContainer === 'encoded'){
      resetEncoded()
    } else if(actionContainer === 'decoded'){
      resetDecoded()
    } else {
      reset()
    }
    setClearConfirm(false)
  }, [actionContainer])

  const confirmDialogText = useMemo(() => {
    let text = 'All fields will be deleted.'
    if(actionContainer === 'encoded'){
      text = 'Encoded text will be deleted.'
    } else if(actionContainer === 'decoded') {
      text = encodingType === 'URL' ? 'Decoded text will be deleted.' : encodingType === 'JWT' ? 'Decoded JWT will be deleted.' : 'Decoded file will be deleted.'
    }
    return text
  }, [actionContainer, encodingType])

  const clearButtonDisabled = useMemo(() => {
    let disabled: boolean
    if(actionContainer === 'encoded'){
      disabled = !encodedText
    } else if(actionContainer === 'decoded') {
      disabled = encodingType === 'URL' ? !decodedText : encodingType === 'JWT' ? !decodedJWT : !decodedFile
    } else {
      disabled = encodingType === 'URL' ? !(decodedText && encodedText) : encodingType === 'JWT' ? !(decodedJWT && encodedText) : !(decodedFile && encodedText)
    }
    return disabled
  }, [actionContainer, decodedFile, encodedText, decodedText])


  return (
    <>
      <div className={`action-bar`}>
        { actionContainer === 'decoded' && (encodingType === 'base32' || encodingType === 'base64') &&
          <ButtonDownload disabled={ !decodedFile }
                          onClick={ onDownloadClickHandler }/>
        }
        { actionContainer === 'encoded' &&
          <ButtonCopy disabled={ !encodedText }
                      onClick={ onCopyClickHandler } />
        }
        { actionContainer === 'decoded' && encodingType !== 'base32' && encodingType !== 'base64' &&
          <ButtonCopy disabled={ !decodedText }
                      onClick={ onCopyClickHandler }/>
        }
        <ButtonTrash title={ !actionContainer ? 'Clear All' : undefined }
                     className={`clear-button-${actionContainer}`}
                     disabled={ clearButtonDisabled }
                     onClick={ onClearClickHandler } />
      </div>

      { clearConfirm &&
        <ConfirmDialog id={`clear-encoding-dialog${!actionContainer ? '-all' : ''}`}
                       title={'Are you sure?'}
                       text={ confirmDialogText }
                       open={ true }
                       openerClassName={`.clear-button-${actionContainer}`}
                       onClose={() => setClearConfirm(false)}
                       onApply={() => onClearHandler()} />
      }
    </>
  )
}

export default memo(ActionBar)