import React, { memo } from 'react';

import {useDevUtilsStore} from "@/store";
import {E_EncodingTypes} from "@/constants";
import {WidgetToaster} from "@components/ui";
import {LoadingAnimatedIcon} from "@/assets";
import EncodingTypeSelect from "./encoding-type-select";
import EncodedText from "./encoded-text";
import DecodedFile from "./decoded-file";
import DecodedText from "./decoded-text";
import DecodedJWT from "./decoded-jwt";
import ActionBar from "./action-bar";
import JwtFooter from "./jwt-footer";

import './style.css'


const Encoding = () => {

  const processing = useDevUtilsStore(({processing}) => processing)
  const encodingType = useDevUtilsStore(({encodingType}) => encodingType)
  const signatureJWT = useDevUtilsStore(({signatureJWT}) => signatureJWT)


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

        { encodingType === E_EncodingTypes.JWT
          ? <DecodedJWT />
          : encodingType === E_EncodingTypes.URL
            ? <DecodedText />
            : <DecodedFile />
        }
      </div>

      <div className={'control-bar encoded'}>
        <div className="title">Encoded</div>
        { encodingType === E_EncodingTypes.JWT && signatureJWT.error &&
          <div className="error-message">{ signatureJWT.error }</div>
        }
      </div>

      {/* -- ENCODED CONTAINER - */}
      <div className="encoded-container">
        <WidgetToaster toasterId={'toaster-encoded'} />

        <ActionBar actionContainer={'encoded'} />

        <EncodedText />
      </div>

      <ActionBar />

      { encodingType === E_EncodingTypes.JWT &&
        <JwtFooter />
      }

    </div>
  )
}

export default memo(Encoding)