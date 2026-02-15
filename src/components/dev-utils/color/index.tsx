import React, { memo, useCallback, useEffect, useState, useRef } from 'react';
import { ColorTranslator } from 'colortranslator';
import { toast } from 'react-hot-toast';

import { STORAGE_KEYS } from "@/constants";
import { debounce, getStorageItem, setStorageItem, copyToClipboard } from "@/utils";
import { ButtonCopy, WidgetToaster } from "@components/ui";

import './style.css';


const Color = () => {

  const [color, setColor] = useState<ColorTranslator | null>(null);
  const [isError, setIsError] = useState(false);
  const colorPickerRef = useRef<HTMLInputElement>(null);

  // Состояния для инпутов, чтобы они были управляемыми
  const [inputHex, setInputHex] = useState('');
  const [inputR, setInputR] = useState('');
  const [inputG, setInputG] = useState('');
  const [inputB, setInputB] = useState('');
  const [inputA, setInputA] = useState('');
  const [inputAlpha, setInputAlpha] = useState('');

  const toasterId = 'toaster-color';

  const getColorInstance = useCallback((hex: string) => {
    try {
      return new ColorTranslator(hex, { legacyCSS: true, spacesAfterCommas: true, decimals: 2 });
    } catch (e) {
      return null;
    }
  }, []);

  const updateColorState = useCallback((newColor: ColorTranslator | null, sourceField?: string) => {
    if (!newColor) {
      setIsError(true);
      setColor(null);
      return;
    }

    setIsError(false);
    setColor(newColor);

    // Обновляем значения инпутов в зависимости от источника изменения
    if (sourceField !== 'inputHex') setInputHex(newColor.HEX);
    if (sourceField !== 'inputR') setInputR(newColor.R.toString());
    if (sourceField !== 'inputG') setInputG(newColor.G.toString());
    if (sourceField !== 'inputB') setInputB(newColor.B.toString());
    if (sourceField !== 'inputA') setInputA(Math.round(newColor.A * 100).toString());
    if (sourceField !== 'inputAlpha') setInputAlpha(newColor.A.toString());

    setStorageItem(STORAGE_KEYS.WIDGET_DEVUTILS_COLOR, newColor.HEXA);
  }, []);

  useEffect(() => {
    const storedColor = getStorageItem(STORAGE_KEYS.WIDGET_DEVUTILS_COLOR) || '#38bdf8';
    const initialColor = getColorInstance(storedColor);
    updateColorState(initialColor);
  }, [getColorInstance, updateColorState]);

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = getColorInstance(e.target.value);
    if (newColor) {
      newColor.setA(parseFloat(inputAlpha));
      updateColorState(newColor);
    }
  };

  const handleHexChange = useCallback(debounce((value: string) => {
    const newColor = getColorInstance(value);
    if (newColor) {
      updateColorState(newColor, 'inputHex');
    } else {
      setIsError(true);
    }
  }, 250), [getColorInstance, updateColorState]);

  const handleRgbaChange = (r: string, g: string, b: string, a: string, isPercentA = false) => {
    const alpha = isPercentA ? parseFloat(a) / 100 : parseFloat(a);
    const rgbaStr = `rgba(${r || 0}, ${g || 0}, ${b || 0}, ${alpha})`;
    const newColor = getColorInstance(rgbaStr);
    updateColorState(newColor, isPercentA ? 'inputA' : 'inputAlpha');
  };

  const onCopyClickHandler = async (text: string) => {
    console.log(text);
    if (!text) return;
    await copyToClipboard(text,
      () => toast.success('Copied!', { toasterId }),
      () => toast.error('Failed to copy!', { toasterId })
    );
  };

  return (
    <div className="color-container">
      <WidgetToaster toasterId={toasterId} />

      <div className="color-input-container">
        <div className="color-input">
          <div className="color-preview" onClick={() => colorPickerRef.current?.click()}>
            <div className="color-preview-top" style={{ backgroundColor: color?.HEX || '#000' }}></div>
            <div className="color-preview-bottom" style={{ backgroundColor: color?.HEXA || '#000' }}></div>
          </div>
          <input
            type="color"
            name="color-picker"
            ref={colorPickerRef}
            value={color?.HEX || '#000000'}
            onChange={handleColorPickerChange}
          />
        </div>

        <div className="color-form">
          <div className="color-form-row">
            <label htmlFor="input-hex">#</label>
            <input
              type="text"
              name="input-hex"
              id="input-hex"
              value={inputHex}
              onChange={(e) => {
                setInputHex(e.target.value);
                handleHexChange(e.target.value);
              }}
            />
          </div>

          <div className="color-form-row">
            <label htmlFor="input-r">R</label>
            <input
              type="number"
              min="0"
              max="255"
              step="1"
              name="input-r"
              id="input-r"
              value={inputR}
              onChange={(e) => {
                const val = e.target.value;
                setInputR(val);
                handleRgbaChange(val, inputG, inputB, inputAlpha);
              }}
            />
            <label htmlFor="input-g">G</label>
            <input
              type="number"
              min="0"
              max="255"
              step="1"
              name="input-g"
              id="input-g"
              value={inputG}
              onChange={(e) => {
                const val = e.target.value;
                setInputG(val);
                handleRgbaChange(inputR, val, inputB, inputAlpha);
              }}
            />
            <label htmlFor="input-b">B</label>
            <input
              type="number"
              min="0"
              max="255"
              step="1"
              name="input-b"
              id="input-b"
              value={inputB}
              onChange={(e) => {
                const val = e.target.value;
                setInputB(val);
                handleRgbaChange(inputR, inputG, val, inputAlpha);
              }}
            />
            <label htmlFor="input-a">A</label>
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              name="input-a"
              id="input-a"
              value={inputA}
              onChange={(e) => {
                const val = e.target.value;
                setInputA(val);
                handleRgbaChange(inputR, inputG, inputB, val, true);
              }}
            />
          </div>

          <div className="color-form-row">
            <div className="color-alpha-slider">
              <input
                type="range"
                name="input-alpha"
                min="0"
                max="1"
                step="0.01"
                id="input-alpha"
                value={inputAlpha}
                style={{ '--selected-color': color?.HEX || '#000' } as React.CSSProperties}
                onChange={(e) => {
                  const val = e.target.value;
                  setInputAlpha(val);
                  handleRgbaChange(inputR, inputG, inputB, val);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`color-error ${isError ? 'show' : ''}`}>
        <p>Color format Invalid</p>
      </div>

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
    </div>
  );
};

export default memo(Color);
