import {motion} from 'framer-motion';
import StickyHeader from "./StickyHeader.tsx";
import React from "react";
import {BottomNav} from './BottomNav.tsx';
import StickyHomeButton from './StickyBackHomeButton.tsx';
import { useNavigate } from 'react-router-dom';

interface IProps {
    children: React.ReactNode;
    showHeader?: boolean;
    showBottomNav?: boolean;
    showBadges?: boolean;
    showHomeButton?: boolean;
}

export const PageWrapper: React.FC<IProps> = (props: IProps) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -20}}
            transition={{duration: 0.3}}
        >
            {props.showHeader && <StickyHeader showBadges={props.showBadges ?? false}/>}
            {props.children}
            {props.showBottomNav && <BottomNav/>}
            {props.showHomeButton && <StickyHomeButton onClick={() => {
                navigate('/');
            }}/>}
        </motion.div>
    );
};