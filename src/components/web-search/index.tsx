import {memo, useCallback, useState} from "react";

import {useWidgetProps} from "@/hooks";
import {SEARCH_ENGINES, WIDGETS_ID} from "@/constants";
import {openExternalLink} from "@/utils";
import {SearchIcon} from "@/assets";

import './style.css'


const WebSearch = () => {

  const [query, setQuery] = useState('')
  const [engine, setEngine] = useState(SEARCH_ENGINES[0])

  const { widgetProps } = useWidgetProps({ widgetId: WIDGETS_ID.WEB_SEARCH })



  const handleSelectChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const engine = SEARCH_ENGINES.find(engine => engine.name === e.target.value)
    if(engine) {
      setEngine(engine)
    }
  }, [])

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      search()
    }
  }

  const search = useCallback(() => {
    if(!query || !engine) return
    const url = engine.link + encodeURIComponent(query)
    openExternalLink(url)
    setQuery('')
  }, [query, engine])


  return (
    <div id={ WIDGETS_ID.WEB_SEARCH }
         className={'widget-container'}
         style={{
           order: widgetProps.order,
           display: widgetProps.active ? 'block' : 'none'
        }}>
      <div className="container">
        <div className="web-search-container">

          <img src={ engine.icon } alt="" className="search-engine-icon"/>

          <select name="web-search-engine" value={ engine.name } onChange={ handleSelectChange }>
            { SEARCH_ENGINES.map(engine =>
              <option key={engine.name} value={engine.name}>{engine.name}</option>
            )}
          </select>

          <input type="text"
                 name="web-search-input"
                 className="web-search-input"
                 placeholder="Search..."
                 value={ query }
                 onChange={(e) => setQuery(e.target.value)}
                 onKeyUp={ handleKeyUp } />

          <div className="search-icon">{ <SearchIcon /> }</div>

        </div>
      </div>
    </div>
  )
}

export default memo(WebSearch)