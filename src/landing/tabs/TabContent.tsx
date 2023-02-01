
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import FeatureCard from '../FeatureCard';

export default function TabContent({ data, color }) {

  const [selectedIndex, setSelectedIndex] = useState(0);
  let timeout = null;
  useEffect(() => {
    timeout = setTimeout(
      () => {
        setSelectedIndex((selectedIndex + 1) % data.length);
      },
      // If there is a video, use the video length, otherwise use 5 seconds
      data[selectedIndex].video ? data[selectedIndex].video.videoLength * 1000 : 5000
    );
  }, [selectedIndex]);


  function onSelect(index: number) {
    clearTimeout(timeout);
    setSelectedIndex(index);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">

      <div className="h-full flex flex-col gap-4 justify-center">
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

      <div className="col-span-2 relative h-full flex items-center ">
        <AnimatePresence mode="sync">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, position: 'absolute' }}
          >
            <div className="flex flex-col w-full gap-2 italic justify-center h-[512px]">

              {data[selectedIndex].video ? (
                <video
                  className="border-2 rounded-xl object-cover w-full"
                  autoPlay
                  loop
                  src={data[selectedIndex].video?.videoSrc}
                />
              ) : (
                <img className="border-2 rounded-xl object-cover w-full" src={data[selectedIndex].imageSrc} />
              )}

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