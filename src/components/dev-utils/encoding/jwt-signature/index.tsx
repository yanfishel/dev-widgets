import React, {memo, useState} from 'react';

import {useDevUtilsStore} from "@/store";
import {Dialog, ButtonClose} from "@components/ui";

import './style.css'


const JwtSignature = () => {

  const [open, setOpen] = useState(false)

  const signatureJWT = useDevUtilsStore(({signatureJWT}) => signatureJWT)


  const onChangeHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    useDevUtilsStore.setState((state) => ({
      ...state,
      signatureJWT: {
        ...state.signatureJWT,
        secret: (e.target as HTMLInputElement).value
      }
    }))
  }


  return (
    <>
      <button onClick={() => setOpen(true)} className="signature-button" >Signature</button>

      <Dialog id={'signature-modal'}
              className={'signature-modal-dialog'}
              open={ open }
              onClose={() => setOpen(false)}
              openerClassName={'.signature-button'} >
        <div className="signature-modal">
          <ButtonClose onClick={() => setOpen(false)} />
          <label>Secret key</label>
          <input type={"text"}
                 value={ signatureJWT.secret }
                 onChange={ onChangeHandler }/>
        </div>
      </Dialog>
    </>
  )
}

export default memo(JwtSignature)