import React, {memo, useMemo} from 'react';


interface IProps {
  value: string
  onChange: (value:string)=>void
}
const TimeZoneTable = ({value, onChange}:IProps) => {

  const selectOptions = useMemo(() => (Intl as typeof Intl & {supportedValuesOf:(val:string)=>string[]}).supportedValuesOf('timeZone'), [])

  return (
    <table className="convert-time time-zone-select">
      <tbody>
      <tr>
        <td><label htmlFor={'time-zone-select'}>Time zone</label></td>
        <td>
          <select id={'time-zone-select'} value={ value }
                  onChange={(e) => onChange(e.target.value as string)}>
            { selectOptions.map((zone:string) =>
              <option key={zone} value={zone}>{zone}</option>)
            }
          </select>
        </td>
      </tr>
      </tbody>
    </table>
  )
}

export default memo(TimeZoneTable)