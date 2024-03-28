import { MotionValue } from 'framer-motion';
import React, { createContext } from 'react';

// Create a Context with a default undefined value
const ScrollContext = createContext<MotionValue<number> | undefined>(undefined);

export default ScrollContext;
