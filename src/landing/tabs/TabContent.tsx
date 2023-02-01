
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
        {data.map((item, index) => (
          <button
            onClick={() => {
              clearTimeout(timeout);
              setSelectedIndex(index);
            }}
            key={index}
          >
            <FeatureCard
              title={item.title}
              color={color}
              Icon={item.icon}
              index={index}
              selected={index === selectedIndex}
            >
              {item.description}
            </FeatureCard>
          </button>
        ))}
      </div>

      <div className="col-span-2 relative h-full flex items-center">
        <AnimatePresence mode="sync">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, position: 'absolute' }}
          >
            <div className="flex flex-col w-full gap-2 italic justify-center">
              {data[selectedIndex].video && (
                <video
                  className="border-2 h-min rounded-xl object-cover w-full"
                  autoPlay
                  loop
                  src={data[selectedIndex].video.videoSrc}
                />
              )}

              <span className="text-gray-500 text-center w-full text-sm">
                {data[selectedIndex].caption}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}