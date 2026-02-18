import React, {memo, useState} from 'react';

import {ButtonHelpIcon} from "@/assets";
import { Dialog } from "@components/ui";

import './style.css'


const RubberDuck = () => {

  const [isOpen, setIsOpen] = useState(false)


  return (
    <div className="rubber-duck-container">

      <button title={"Read info"} onClick={() => setIsOpen(!isOpen)} className={"circle-button rubber-duck-info-button"}>
        <ButtonHelpIcon />
      </button>
      <div className={"rubber-duck-image image-on"} />

      <Dialog id={'rubber-duck-info'}
              className={"rubber-duck-info"}
              openerClassName={'.rubber-duck-info-button'}
              fullWidth
              open={isOpen}
              onClose={() => setIsOpen(false)}>

          <p><b>Rubber duck debugging</b> (or rubberducking) is a debugging technique in software engineering.
            A programmer explains their code, step by step, in natural language - either aloud or in writing - to reveal mistakes and misunderstandings.</p>
          <p className={'relevant-links'}>
            <span className="external-link" data-url="https://rubberduckdebugging.com/">Official site</span>
            <span className="external-link" data-url="https://en.wikipedia.org/wiki/Rubber_duck_debugging">Wikipedia</span>
          </p>
      </Dialog>

    </div>
  )
}

export default memo(RubberDuck)