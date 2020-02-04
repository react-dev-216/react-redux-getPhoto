import React from 'react';
import EventListener from 'react-event-listener';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import PhotoComponent from '../Photo';
import { sizes } from '../../style/util';
import '../../css/App.css'

const Photos = ({ items, onScrollToLoad, ...others }) => {
  const handleResizeOrScroll = () => {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document && document.documentElement
          ? document.documentElement.offsetHeight
          : 0;
    const body = document.body;
    const html = document.documentElement;
    let docHeight = 0;
    if (
      html &&
      body &&
      body.scrollHeight &&
      body.offsetHeigh &&
      html.offsetHeight &&
      html.scrollHeight
    ) {
      docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
    }
 
  //  console.log("windowBottom = ",windowBottom);
  //  console.log("docHeight = ",docHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      onScrollToLoad();
    }
  };

  return (
    <div {...others}>
      <EventListener
        target="window"
        onScroll={handleResizeOrScroll}
        onResize={handleResizeOrScroll}
      />
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          '400': 1,
          '600': 2,
          '800': 3,
          '1000':4,
          '1200':5
        }}>
        <Masonry>
          {Object.keys(items).map(key => (
            
            <PhotoComponent key={items[key].id} photo={items[key]} />
            
          ))          
          }
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default Photos;
