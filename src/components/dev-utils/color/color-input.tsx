import React, {memo, useMemo, useRef} from 'react';

import {useDevUtilsStore} from "@/store";
import {expandHex, hexToRgb, rgbToHex} from "@/utils";


const PLACEHOLDER_COLOR = '#000000';

const ColorInput = () => {

  const colorPickerRef = useRef<HTMLInputElement>(null);

  const inputColor = useDevUtilsStore(({inputColor}) => inputColor)


  const updateHexColor = (Hex: string) => {
    useDevUtilsStore.setState(state => ({
      ...state,
      colorError: false,
      inputColor: {
        ...state.inputColor,
        Hex
      }
    }))
    const rgb = hexToRgb(Hex)
    if(!rgb) {
      useDevUtilsStore.setState(state => ({
        ...state,
        colorError: true
      }))
    } else {
      const { R, G, B } = rgb
      useDevUtilsStore.setState(state => ({
        ...state,
        inputColor: {
          ...state.inputColor,
          Hex, R, G, B
        }
      }))
    }
  }

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateHexColor(e.target.value.replace('#',''))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    if(name === 'Hex') {
      updateHexColor(value)
      return
    }
    const inputColor = useDevUtilsStore.getState().inputColor
    const calculatedHex = rgbToHex(
      name==='R' ? +value : inputColor.R,
      name==='G' ? +value : inputColor.G,
      name==='B' ? +value :  inputColor.B
    )
    useDevUtilsStore.setState(state => ({
      ...state,
      colorError: !calculatedHex,
      inputColor: {
        ...inputColor,
        [name]: value,
        Hex: calculatedHex ? calculatedHex : inputColor.Hex,
      }
    }))
  }


  const selectedColor = useMemo(() => hexToRgb(inputColor.Hex) ? `#${expandHex(inputColor.Hex.replace('#',''))}` : PLACEHOLDER_COLOR, [inputColor.Hex])

  const inputNumberProps = useMemo(() => ({
    type: "number",
    min: 0, max: 100, step: 1,
    onChange: handleInputChange
  }), [handleInputChange])

  const inputRangeProps = useMemo(() => ({ ...inputNumberProps, type: "range" }), [inputNumberProps])

  const inputRGBProps = useMemo(() => ({ ...inputNumberProps, max: 255 }), [inputNumberProps])


  return (
    <div className="color-input-container">
      <div className="color-input">
        <div className="color-preview" onClick={() => colorPickerRef.current?.click()}>
          <div className="color-preview-top" style={{ backgroundColor: selectedColor }}></div>
          <div className="color-preview-bottom" style={{ backgroundColor: selectedColor, opacity: inputColor.A/100 }}></div>
        </div>
        <input type="color"
               name="color-picker"
               ref={ colorPickerRef }
               value={ selectedColor }
               onChange={ handleColorPickerChange } />
      </div>

      <div className="color-form">
        <div className="color-form-row">
          <label htmlFor="input-hex">#</label>
          <input type="text"
                 name="Hex"
                 id="input-hex"
                 value={ inputColor.Hex }
                 onChange={ (e) => updateHexColor(e.target.value) } />
        </div>

        <div className="color-form-row">
          <label htmlFor="input-r">R</label>
          <input id="input-r"
                 name="R"
                 value={ inputColor.R }
                 { ...inputRGBProps } />

          <label htmlFor="input-g">G</label>
          <input id="input-g"
                 name="G"
                 value={ inputColor.G }
                 { ...inputRGBProps } />

          <label htmlFor="input-b">B</label>
          <input id="input-b"
                 name="B"
                 value={ inputColor.B }
                 { ...inputRGBProps } />

          <label htmlFor="input-a">A</label>
          <input id="input-a"
                 name="A"
                 value={ inputColor.A }
                 { ...inputNumberProps } />
        </div>

        <div className="color-form-row">
          <div className="color-alpha-slider">
            <input id="input-alpha"
                   name="A"
                   value={ inputColor.A ? inputColor.A : 0 }
                   { ...inputRangeProps }
                   style={{ '--selected-color': selectedColor } as React.CSSProperties}  />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ColorInput)