import React, { memo } from 'react';

import {useDevUtilsStore} from "@/store";
import {WidgetToaster} from "@components/ui";
import {LoadingAnimatedIcon} from "@/assets";
import EncodingTypeSelect from "./encoding-type-select";
import EncodedText from "./encoded-text";
import JwtSignature from "./jwt-signature";
import DecodedFile from "./decoded-file";
import DecodedText from "./decoded-text";
import DecodedJWT from "./decoded-jwt";
import ActionBar from "./action-bar";

import './style.css'


const Encode = () => {

  const processing = useDevUtilsStore(({processing}) => processing)
  const encodingType = useDevUtilsStore(({encodingType}) => encodingType)


  return (
    <div className={`container encode-container encode-type-${encodingType}`}>

      { processing &&
        <div className="processing"><LoadingAnimatedIcon size={18} /></div>
      }

      <div className="control-bar">
        <div className="title">Decoded</div>
        <EncodingTypeSelect />
      </div>

      {/* -- DECODED CONTAINER - */}
      <div className={"decoded-container"}>
        <WidgetToaster toasterId={'toaster-decoded'} />

        <ActionBar actionContainer={'decoded'} />

        { encodingType === 'JWT'
          ? <DecodedJWT />
          : encodingType === 'URL'
            ? <DecodedText />
            : <DecodedFile />
        }
      </div>

      <div className={'control-bar encoded'}>
        <div className="title">Encoded</div>
        { encodingType === 'JWT' && <JwtSignature /> }
      </div>

      {/* -- ENCODED CONTAINER - */}
      <div className="encoded-container">
        <WidgetToaster toasterId={'toaster-encoded'} />

        <ActionBar actionContainer={'encoded'} />

        <EncodedText />
      </div>

      <ActionBar />

    </div>
  )
}

export default memo(Encode)