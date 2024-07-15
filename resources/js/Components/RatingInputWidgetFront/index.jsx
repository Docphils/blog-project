import { fill } from "lodash";
import "./styles.css";
import { Box } from "@mui/material";
import React,{useState} from "react";

function Star(props) {
    return (
        <Box
            className={`star ${props.value == 0 ? "semi-active" : ""} ${
                props.position <= props.rated ? "active" : ""
            } `}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            onClick={props.onClick}
        >
            ★
        </Box>
    );
}

function Rating(props) {
    const messages = {
        1: "Oh. Sorry you had a bad experience :( ",
        2: "We will try to improve.",
        3: "Appreciate it!",
        4: "Thank you!",
        5: "You're Awesome!",
    };

    let rating = props.rating;
    
    return (
        <Box className={"after-rating-message " + (rating > 0 ? "show" : "")}>
            <span>
                You rated this {rating} star{rating > 1 ? "s" : ""}
            </span>
            <br />
            <span>{messages[rating]}</span>
        </Box>
    );
}

export function RatingInputWidgetFront(props) {
    const [stars, setStars] = useState(Array(5).fill(-1));
    const [rated, setRated] = useState(props.ratings ? props.ratings : 0);

    function handleMouseOver(i) {
        let currentRating = rated;

        if (currentRating > 0) {
            const hoverRatedStars = stars.slice();
            fill(hoverRatedStars, 0, currentRating, i);
            setStars(()=>hoverRatedStars);
        } else {
            const hoverStars = Array(5).fill(-1);
            fill(hoverStars, 0, 0, i + 1);
            setStars(()=>hoverStars);
        }
    }

    function handleMouseOut() {
        let currentRating = rated;
        if (currentRating > 0) {
            const resetRatedStars = stars.slice();
            fill(resetRatedStars, -1, currentRating, resetRatedStars.length);
            setStars(()=>resetRatedStars);
        } else {
            const resetStars = stars.slice();
            fill(resetStars, -1, 0, resetStars.length);
            setStars(()=> resetStars);
        };
    }

    function handleClick(i) {
        const clickedStar = stars.slice();
        fill(clickedStar, 1, 0, i);
        fill(clickedStar, 1, i, clickedStar.length);
        props.setRatings(() => i);
        setStars(()=>clickedStar);
        setRated(()=> i);
    }

    function handleRating(rating) {
        return <Rating rating={rating} />;
    }

    function renderStar(i) {
        return (
            <Star
                position={i}
                value={stars[i]}
                rated={rated}
                onMouseEnter={() => handleMouseOver(i)}
                onMouseLeave={() => handleMouseOut()}
                onClick={() => handleClick(i)}
            />
        );
    }

    return (
            <Box className="rating-stars-widget-outer">
                <Box className="rating-stars">
                    {renderStar(1)}
                    {renderStar(2)}
                    {renderStar(3)}
                    {renderStar(4)}
                    {renderStar(5)}
                </Box>

                {handleRating(rated)}
            </Box>
        );

}
