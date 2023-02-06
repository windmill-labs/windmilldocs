
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import FeatureCard from '../FeatureCard';
import { useInView } from 'react-intersection-observer';

const SvgInline = props => {
  const [svg, setSvg] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  useEffect(() => {
      fetch(props.url)
          .then(res => res.text())
          .then(setSvg)
          .catch(setIsErrored)
          .then(() => setIsLoaded(true))
  }, [props.url]);

  return (
      <div 
          className={`max-w-full svgInline svgInline--${isLoaded ? 'loaded' : 'loading'} ${isErrored ? 'svgInline--errored' : ''}`}
          dangerouslySetInnerHTML={{ __html: svg }}
      />
  );
}

export default function TabContent({ data, color }) {

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  let timeout = null;
  useEffect(() => {
    timeout = setTimeout(
      () => {
        // setSelectedIndex((selectedIndex + 1) % data.length);
      },
      // If there is a video, use the video length, otherwise use 5 seconds
      data[selectedIndex].video ? data[selectedIndex].video.videoLength * 1000 : 20000
    );
  }, [selectedIndex]);


  function onSelect(index: number) {
    clearTimeout(timeout);
    setSelectedIndex(index);
  }

  function renderAsset(data) {
    if (data[selectedIndex].video) { return (
      <video
        className="border-2 rounded-xl object-cover w-full h-full"
        autoPlay
        loop
        src={data[selectedIndex].video?.videoSrc}

      />)} else if (data[selectedIndex].imageSrc) {
      return <img className="border-2 rounded-xl object-cover w-full h-full" src={data[selectedIndex].imageSrc} />
    } else if (data[selectedIndex].svg) {
      return <img className="border-2 p-2 rounded-xl object-cover w-full h-full" src={data[selectedIndex].svg} />
      // return (<div className="border-2 rounded-xl object-cover w-full h-full">
      //   <SvgInline url={data[selectedIndex].svg}></SvgInline>
      // </div>)
    } else { return (<span>Loading</span>)}
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full " ref={ref}>

      <div className="w-full h-full flex flex-col gap-4 justify-start col-span-2 lg:col-span-1 ">
        {data.map((item, index: number) => (
          <button
            onClick={() => onSelect(index)}
            key={index}
          >
            <FeatureCard
              title={item.title}
              color={color}
              Icon={item.icon}
              index={index}
              selected={index === selectedIndex}
              description={item.description}
            />

          </button>
        ))}
      </div>

      <div className="col-span-2 relative h-full flex items-center w-full ">
        <AnimatePresence mode="sync">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, scale: 0.8, width: '100%' }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, position: 'absolute' }}
          >
            <div className="flex flex-col w-full gap-2 italic justify-start  min-h-[512px]">

              {inView ? (renderAsset(data)) : (
              <div className="border-2 rounded-xl object-cover w-full h-full">Loading</div>) }


              <span className="text-gray-500 text-center w-full text-sm">
                {data[selectedIndex].caption}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div >
  )
}