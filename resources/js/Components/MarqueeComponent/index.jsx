import styled, { keyframes } from "styled-components";
import React, { useState, useRef, useEffect } from "react";
import { Box } from "@mui/material";


const Wrapper = ({ children }) => {
    return <WrapperContainer>{children}</WrapperContainer>;
};


const getFillList = (list, copyTimes = 1) => {
    let newlist = [];
    for (let i = 0; i < copyTimes; i++) {
        newlist.push(...list);
    }
    return newlist;
};

const Marquee = ({ list, time, toRight, ...props }) => {
    const marqueeContainer = useRef(null);
    const marqueeArea = useRef(null);
    const [moveLeft, setMoveLeft] = useState(0);
    const [showList, setShowList] = useState(list);
    const [realTime, setRealTime] = useState(time);

    useEffect(() => {
        const containerWidth = Math.floor(marqueeContainer.current.offsetWidth);
        const areaWidth = Math.floor(marqueeArea.current.scrollWidth);
        const copyTimes = Math.max(
            2,
            Math.ceil((containerWidth * 2) / areaWidth)
        );
        const newMoveLeft = areaWidth * Math.floor(copyTimes / 2);
        const newRealTime =
            time * parseFloat((newMoveLeft / containerWidth).toFixed(2));
        setShowList(getFillList(list, copyTimes));
        setMoveLeft(newMoveLeft);
        setRealTime(newRealTime);
    }, [list]);

    return (
        <MarqueeContainer ref={marqueeContainer} {...props}>
            <MarqueeArea
                ref={marqueeArea}
                move={moveLeft}
                time={realTime}
                toRight={toRight}
            >
                {showList.map((item, index) => {
                    return <MarqueeItem key={index}>{item}</MarqueeItem>;
                })}
            </MarqueeArea>
        </MarqueeContainer>
    );
};

Marquee.defaultProps = {
    list: [],
    time: 10,
};

export default function MarqueeComponent(props) {
    const { settings } = props;
    const [dataList, setDatalist] = useState([
        "Welcome to swifre.com, Any one could create a post on this platform"
    ]);
    return (
        <Box className="relative left-0 right-0 top-0 h-6">
            <Wrapper>
                <Marquee list={dataList} time={30} />
            </Wrapper>
        </Box>
    );
}



// Wrapper
const WrapperContainer = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    z-index: 10;
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: black;
    color: white;
`;

//  Marquee
const moveLeft = keyframes`
  from {
    transform: translateX(0);
  }
`;

const MarqueeContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    /* padding: 1px; */
    color: white;
    background-color: rgb(44, 44, 44);
    overflow: hidden;
    &:hover {
        animation-play-state: paused;
    }
    &::after {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        /* background-image: linear-gradient(
            to right,
            rgba(230, 230, 230, 1),
            transparent 20%,
            transparent 80%,
            rgba(230, 230, 230, 1)
        ); */
    }
`;

const MarqueeArea = styled.div`
    display: inline-block;
    white-space: nowrap;
    transform: translateX(-${(props) => props.move}px);
    animation: ${moveLeft} ${(props) => props.time}s linear infinite
        ${(props) => (props.toRight ? " reverse" : "")};
    animation-play-state: inherit;
`;

const MarqueeItem = styled.div`
    position: relative;
    display: inline-block;
    margin-right: 2em;
`;