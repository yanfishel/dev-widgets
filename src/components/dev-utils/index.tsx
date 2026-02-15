import React, {memo} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import {useWidgetProps} from "@/hooks";
import {WIDGETS_ID} from "@/constants";

import {useDevUtilsStore} from "@/store";
import {DateTimeIcon, EncodeIcon, ColorIcon, DuckIcon} from "@/assets";
import Encoding from "./encoding";
import DateTime from "./date-time";
import Color from "./color";

import './style.css'


const DevUtils = () => {

  const { widgetProps } = useWidgetProps({ widgetId: WIDGETS_ID.DEV_UTILS })

  const selectedTab = useDevUtilsStore(({selectedTab}) => selectedTab)

  const onTabSelect = (index:number) => {
    useDevUtilsStore.setState({selectedTab: index})
  }


  return (
    <div id={WIDGETS_ID.DEV_UTILS}
         className={'widget-container'}
         style={{
           order: widgetProps.order,
           display: widgetProps.active ? 'block' : 'none'
         }}>
      <div className="container">

        <Tabs defaultIndex={ selectedTab }
              onSelect={ onTabSelect }>
          <TabList>
            <Tab><EncodeIcon /><span>Encode</span></Tab>
            <Tab><DateTimeIcon /><span>Time</span></Tab>
            <Tab><ColorIcon size={14} /><span>Color</span></Tab>
            <Tab><DuckIcon /></Tab>
          </TabList>

          <TabPanel>
            <Encoding />
          </TabPanel>
          <TabPanel>
            <DateTime />
          </TabPanel>
          <TabPanel>
            <Color />
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>

        </Tabs>

      </div>
    </div>
  )
}

export default memo(DevUtils)