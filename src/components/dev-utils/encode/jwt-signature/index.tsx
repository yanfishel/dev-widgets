import React, {memo, useState} from 'react';

import {useDevUtilsStore} from "@/store";
import {Dialog, ButtonClose} from "@components/ui";

import './style.css'


const JwtSignature = () => {

  const [open, setOpen] = useState(false)

  const decodedJWT = useDevUtilsStore(({decodedJWT}) => decodedJWT)


  const onChangeHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    useDevUtilsStore.setState((state) => ({
      ...state,
      decodedJWT: {
        ...state.decodedJWT,
        signature: (e.target as HTMLInputElement).value
      }
    }))
  }


  return (
    <div className="signature-container">
      <button onClick={() => setOpen(true)} className="signature-button" >Signature</button>

      <Dialog id={'signature-modal'}
              className={'signature-modal-dialog'}
              open={open}
              onClose={() => setOpen(false)}
              openerClassName={'.signature-button'} >
        <div className="signature-modal">
          <ButtonClose onClick={() => setOpen(false)} />
          <label>Secret key</label>
          <input type={"text"}
                 value={ decodedJWT.signature }
                 onChange={ onChangeHandler }/>
        </div>
      </Dialog>
    </div>
  )
}

export default memo(JwtSignature)