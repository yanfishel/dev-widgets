import React, { memo, useCallback, useEffect, useState } from 'react';
import { ColorTranslator } from 'colortranslator';
import { toast } from 'react-hot-toast';

import {useDevUtilsStore} from "@/store";
import { copyToClipboard } from "@/utils";
import { ButtonCopy, WidgetToaster } from "@components/ui";
import ColorInput from "./color-input";

import './style.css';


const Color = () => {

  const inputColor = useDevUtilsStore(({inputColor}) => inputColor)
  const colorError = useDevUtilsStore(({colorError}) => colorError)

  const [color, setColor] = useState<ColorTranslator | null>(null);

  const toasterId = 'toaster-color';


  const onCopyClickHandler = async (text: string) => {
    if (!text) return;
    await copyToClipboard(text,
      () => toast.success('Copied!', { toasterId }),
      () => toast.error('Failed to copy!', { toasterId })
    )
  }

  const getColorInstance = useCallback((hex: string, alpha:number) => {
    try {
      const color = new ColorTranslator(`#${hex}`, { legacyCSS: true, spacesAfterCommas: true, decimals: 2 })
      color.setA(alpha/100)
      setColor(color)
    } catch (e) {
      console.log(e)
      setColor(null)
      useDevUtilsStore.setState({ colorError:true })
    }
  }, [])


  useEffect(() => {
    getColorInstance(inputColor.Hex.replace('#',''), inputColor.A)
  }, [inputColor.Hex, inputColor.A])


  return (
    <div className="color-container">
      <WidgetToaster toasterId={toasterId} />

      <ColorInput />

      <div className={`color-error ${colorError ? 'show' : ''}`}>
        <p>Color format Invalid</p>
      </div>

      { color &&
        <table className="color-result">
          <tbody>
            <tr>
              <td><input type="text" name="color-hex" readOnly value={color?.HEX || ''} /></td>
              <td><ButtonCopy onClick={() => onCopyClickHandler(color?.HEX || '')} /></td>
            </tr>
            <tr>
              <td><input type="text" name="color-hexa" readOnly value={color?.HEXA || ''} /></td>
              <td><ButtonCopy onClick={() => onCopyClickHandler(color?.HEXA || '')} /></td>
            </tr>
            <tr>
              <td><input type="text" name="color-rgb" readOnly value={color?.RGB || ''} /></td>
              <td><ButtonCopy onClick={() => onCopyClickHandler(color?.RGB || '')} /></td>
            </tr>
            <tr>
              <td><input type="text" name="color-rgba" readOnly value={color?.RGBA || ''} /></td>
              <td><ButtonCopy onClick={() => onCopyClickHandler(color?.RGBA || '')} /></td>
            </tr>
            <tr>
              <td><input type="text" name="color-hsl" readOnly value={color?.HSL || ''} /></td>
              <td><ButtonCopy onClick={() => onCopyClickHandler(color?.HSL || '')} /></td>
            </tr>
            <tr>
              <td><input type="text" name="color-hsla" readOnly value={color?.HSLA || ''} /></td>
              <td><ButtonCopy onClick={() => onCopyClickHandler(color?.HSLA || '')} /></td>
            </tr>
            <tr>
              <td><input type="text" name="color-hwb" readOnly value={color?.HWB || ''} /></td>
              <td><ButtonCopy onClick={() => onCopyClickHandler(color?.HWB || '')} /></td>
            </tr>
            <tr>
              <td><input type="text" name="color-hwba" readOnly value={color?.HWBA || ''} /></td>
              <td><ButtonCopy onClick={() => onCopyClickHandler(color?.HWBA || '')} /></td>
            </tr>
          </tbody>
        </table>
      }
    </div>
  );
};

export default memo(Color);
