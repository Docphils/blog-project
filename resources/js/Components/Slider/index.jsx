import "./styles.css";
import { Box } from "@mui/material";
import React, { useId, useState } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import { router } from "@inertiajs/core";

export default function Slider({ style, slides = [], className, ...props }) {
    const [active, setActive] = React.useState(0);
    const [autoplay, setAutoplay] = React.useState(0);
    const max = slides.length;

    const intervalBetweenSlides = useCallback(() => {
        if (autoplay) {
            setActive(prevActive => (prevActive === max - 1 ? 0 : prevActive + 1));
        }
    }, [autoplay, setActive, max]);

    React.useEffect(() => {
        const interval = setInterval(() => intervalBetweenSlides(), 3000);
        return () => clearInterval(interval);
    });

    const toggleAutoPlay = useCallback(() => {
        setAutoplay(prevAutoplay => !prevAutoplay);
    }, [setAutoplay]);

    const nextOne = () => active < max - 1 && setActive(active + 1);

    const prevOne = () => active > 0 && setActive(active - 1);

    const isActive = useCallback((value) => active === value && "active", [active]);

    const renderSlides = useMemo(() => {
        return slides.map((item, index) => (
            <React.Fragment key={index}>
                {active === index && (
                    <Box
                        id={`my-slides-${index}`}
                        className={`my-each-slide flex h-full min-h-96 w-full flex-grow animate-fade-right animate-once animate-ease-in-out`}
                        style={{ backgroundImage: `url(${item.eachSlide})` }} // Use item.eachSlide directly
                    >
                        <Box className="m-auto flex h-[100%] min-h-96 w-full flex-grow flex-col items-center justify-center rounded-md bg-[rgba(0,0,0,0.35)] p-10 text-center text-lg text-white">
                        <Box className="m-auto flex h-[100%] w-full flex-col items-center justify-center rounded-md bg-[rgba(0,0,0,0.35)] p-10 text-center text-lg text-white">
                            <Box className="container m-auto flex h-[80%] w-[80%] flex-col items-center justify-center rounded-md bg-[rgba(0,0,0,0.35)] p-10 text-center text-lg text-white">
                                <Box className="w-full max-w-7xl text-center">{item.content}</Box>
                                <Box className="text-center"><span
                                    className="icons cursor-pointer pl-5 text-2xl"
                                    onClick={() =>
                                        router.visit(
                                            route("post.show", {
                                                id:
                                                    item.id ??
                                                    "243252c1-57ef-4128-9e4c-2b1cdfbf9782",
                                            })
                                        )
                                    }
                                >
                                    {item.content && "see more"}
                                </span>
                                </Box>
                            </Box>
                        </Box>
                        </Box>
                    </Box>
                )}
            </React.Fragment>
        ));
    }, [active, slides]);

    const renderDots = useCallback(() => {
        return slides.map((slide, index) => (
            <li className={isActive(index) + " dots"} key={index}>
                <button onClick={() => setActive(index)}>
                    <span>&#9679;</span>
                </button>
            </li>
        ));
    }, [slides, isActive, setActive]);

    const renderPlayStop = useCallback(() => {
        return autoplay ? (
            <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
        ) : (
            <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            </svg>
        );
    }, [autoplay]);

    const renderArrows = useCallback(() => (
        <React.Fragment>
            <button
                type="button"
                className="arrows prev p-5"
                onClick={() => prevOne()}
            >
                <svg fill="#FFFFFF" width="50" height="50" viewBox="0 0 24 24">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                </svg>
            </button>
            <button
                type="button"
                className="arrows next p-5"
                onClick={() => nextOne()}
            >
                <svg fill="#FFFFFF" height="50" viewBox="0 0 24 24" width="50">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                </svg>
            </button>
        </React.Fragment>
    ), [prevOne, nextOne]);

    return (
        <section className={`my-slider ${className}`} style={style}>
            <Box className="my-wrapper">
                {...renderSlides}
            </Box>
            {renderArrows()}
            <ul className="my-dots-container">{renderDots()}</ul>
            <button
                type="button"
                className="my-toggle-play"
                onClick={toggleAutoPlay}
            >
                {renderPlayStop()}
            </button>
        </section>
    );
}
