import {motion} from 'framer-motion';
import StickyHeader from "./StickyHeader.tsx";
import React from "react";

export const PageWrapper: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -20}}
            transition={{duration: 0.3}}
        >
            <StickyHeader showBadges={true}/>
            {children}
        </motion.div>
    );
};