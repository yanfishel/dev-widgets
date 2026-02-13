import React, {memo, useCallback, useMemo, useState} from 'react';
import {toast} from "react-hot-toast";

import {E_EncodingTypes} from "@/constants";
import {useDevUtilsStore} from "@/store";
import {downloadFile} from "@/utils";
import {ButtonCopy, ButtonDownload, ButtonTrash, ConfirmDialog} from "@components/ui";

import './style.css'


interface IProps {
  actionContainer?: 'encoded' | 'decoded'
}
const ActionBar = ({ actionContainer }:IProps) => {

  const [clearConfirm, setClearConfirm] = useState(false)

  const encodingType = useDevUtilsStore(({encodingType}) => encodingType)
  const decodedFile = useDevUtilsStore(({decodedFile}) => decodedFile)
  const decodedJWT = useDevUtilsStore(({decodedJWT}) => decodedJWT)
  const decodedURL = useDevUtilsStore(({decodedURL}) => decodedURL)
  const encodedJWT = useDevUtilsStore(({encodedJWT}) => encodedJWT)
  const encodedURL = useDevUtilsStore(({encodedURL}) => encodedURL)
  const encodedFile = useDevUtilsStore(({encodedFile}) => encodedFile)
  const reset = useDevUtilsStore(({reset}) => reset)
  const resetEncoded = useDevUtilsStore(({resetEncoded}) => resetEncoded)
  const resetDecoded = useDevUtilsStore(({resetDecoded}) => resetDecoded)


  const onDownloadClickHandler = useCallback(() => {
    if(!decodedFile.file) return
    downloadFile(decodedFile.file)
  }, [decodedFile.file])

  const onCopyClickHandler = useCallback(async () => {
    let text = ''
    if(actionContainer === 'encoded') {
      text = encodingType === E_EncodingTypes.JWT ? encodedJWT.text : encodingType === E_EncodingTypes.URL ? encodedURL.text : encodedFile.text
    } else if(actionContainer === 'decoded') {
      text = encodingType === E_EncodingTypes.JWT ? decodedJWT.claim : encodingType === E_EncodingTypes.URL ? decodedURL.url : ''
    }
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
  }, [actionContainer, encodingType, encodedJWT.text, encodedURL.text, encodedFile.text, decodedURL.url, decodedJWT.header, decodedJWT.claim])

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
      text = encodingType === E_EncodingTypes.URL ? 'Decoded text will be deleted.' : encodingType === E_EncodingTypes.JWT ? 'Decoded JWT will be deleted.' : 'Decoded file will be deleted.'
    }
    return text
  }, [actionContainer, encodingType])

  const clearButtonDisabled = useMemo(() => {
    let disabled: boolean
    if (actionContainer === 'encoded') {
      disabled = encodingType === E_EncodingTypes.JWT ? !encodedJWT.text : encodingType === E_EncodingTypes.URL ? !encodedURL.text : !encodedFile.text
    } else if (actionContainer === 'decoded') {
      disabled = encodingType === E_EncodingTypes.URL ? !decodedURL.url : encodingType === E_EncodingTypes.JWT ? (!decodedJWT.header && !decodedJWT.claim) : !decodedFile.file
    } else {
      disabled = encodingType === E_EncodingTypes.URL ? (!decodedURL.url && !encodedURL.text) : encodingType === E_EncodingTypes.JWT ? (!decodedJWT.header && !decodedJWT.claim && !encodedJWT.text) : (!decodedFile.file && !encodedFile.text)
    }
    return disabled
  }, [actionContainer, encodingType, encodedJWT.text, encodedURL.text, encodedFile.text, decodedURL.url, decodedJWT.header, decodedJWT.claim, decodedFile.file])


  return (
    <>
      <div className={`action-bar`}>
        { actionContainer === 'decoded' && (encodingType === E_EncodingTypes.base32 || encodingType === E_EncodingTypes.base64) &&
          <ButtonDownload disabled={ !decodedFile.file }
                          onClick={ onDownloadClickHandler }/>
        }
        { actionContainer === 'encoded' &&
          <ButtonCopy disabled={ encodingType === E_EncodingTypes.JWT ? !encodedJWT.text : encodingType === E_EncodingTypes.URL ? !encodedURL.text : !encodedFile.text }
                      onClick={ onCopyClickHandler } />
        }
        { actionContainer === 'decoded' && encodingType !== E_EncodingTypes.base32 && encodingType !== E_EncodingTypes.base64 &&
          <ButtonCopy disabled={ encodingType === E_EncodingTypes.JWT ? !decodedJWT.claim : !decodedURL.url }
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