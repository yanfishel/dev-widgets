import React, {memo} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import {useWidgetProps} from "@/hooks";
import {WIDGETS_ID} from "@/constants";

import './style.css'
import {DateTimeIcon, EncodeIcon, ColorIcon, DuckIcon} from "@/assets";
import Encode from "@components/dev-utils/encode";


const DevUtils = () => {

  const { widgetProps } = useWidgetProps({ widgetId: WIDGETS_ID.DEV_UTILS })


  return (
    <div id={WIDGETS_ID.DEV_UTILS}
         style={{
           order: widgetProps.order,
           display: widgetProps.active ? 'block' : 'none'
         }}>
      <div className="container">

        <Tabs>
          <TabList>
            <Tab><EncodeIcon /><span>Encode</span></Tab>
            <Tab><DateTimeIcon /><span>Time</span></Tab>
            <Tab><ColorIcon size={14} /><span>Color</span></Tab>
            <Tab><DuckIcon /></Tab>
          </TabList>


          <TabPanel>
            <Encode />
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>

        </Tabs>

        {/*<div className="tabs">


          <input type="radio" id="tab1" name="tab-control" data-tab="encode" checked/>
          <input type="radio" id="tab2" name="tab-control" data-tab="datetime"/>
          <input type="radio" id="tab3" name="tab-control" data-tab="color"/>
          <input type="radio" id="tab4" name="tab-control" data-tab="duck"/>
          <ul>
            <li title="Encode / Decode">
              <label htmlFor="tab1" role="button">${} <span>Encode</span></label>
            </li>
            <li title="Date & Time">
              <label htmlFor="tab2" role="button">${} <span>Time</span></label>
            </li>
            <li title="Color">
              <label htmlFor="tab3" role="button" className="home-tab">${} <span>Color</span></label>
            </li>
            <li title="Rubber Duck">
              <label htmlFor="tab4" role="button" className="home-tab">${}</label>
            </li>
          </ul>


          <div className="content">

          </div>
        </div>*/}

      </div>
    </div>
  )
}

export default memo(DevUtils)