import React, {memo, useState} from 'react';

import {useDevUtilsStore} from "@/store";
import { SECRET_KEYS} from "@/constants";
import {E_SignatureAlgorithms} from "@/enums";
import {T_Algorithms} from "@/types/dev-utils";
import {Dialog, ButtonClose} from "@components/ui";

import './style.css'


const JwtSignature = () => {

  const [open, setOpen] = useState(false)

  const signatureJWT = useDevUtilsStore(({signatureJWT}) => signatureJWT)

  const onSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const algorithm = e.target.value as T_Algorithms
    useDevUtilsStore.setState((state) => ({
      ...state,
      signatureJWT: {
        ...state.signatureJWT,
        ...{ algorithm, secret: SECRET_KEYS[algorithm] }
      }
    }))
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    useDevUtilsStore.setState((state) => ({
      ...state,
      signatureJWT: {
        ...state.signatureJWT,
        secret: (e.target).value
      }
    }))
  }


  return (
    <>
      <button onClick={() => setOpen(true)} className="signature-button" >Signature</button>

      <Dialog id={'signature-dialog'} position={'bottom'} fullWidth
              className={'signature-modal-dialog'}
              open={ open }
              onClose={() => setOpen(false)}
              openerClassName={'.signature-button'} >
        <div className="dialog-content">
          <div className="dialog-header">
            <ButtonClose onClick={() => setOpen(false)} />
            <div className="dialog-header-title">Algorithm configuration</div>
          </div>

          <div className={'select-container'}>
            <label htmlFor={'algorithm-select'}>Algorithm</label>
            <select id={"algorithm-select"} value={ signatureJWT.algorithm } onChange={ onSelectHandler } >
              { Object.keys(E_SignatureAlgorithms).map((algorithm) =>
                <option key={algorithm} value={algorithm}>{algorithm}</option>
              )}
            </select>
          </div>
          <label htmlFor={'secret-key-input'}>Secret key</label>
          <textarea id={'secret-key-input'} rows={4} placeholder={'Enter your secret key here'}
                    className={`${!signatureJWT.secret ? 'has-error' : ''}`}
                 value={ signatureJWT.secret }
                 onChange={ onChangeHandler }/>
        </div>
      </Dialog>
    </>
  )
}

export default memo(JwtSignature)