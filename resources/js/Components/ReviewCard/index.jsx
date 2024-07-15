import "./styles.css";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { ImReply } from "@react-icons/all-files/im/ImReply";
import ReplyInput from "../ReplyInput";
export default function ReviewCard({ onereviewdata, ...props }) {
    const [ratings, setRatings] = useState(
        onereviewdata.user.ratings ? onereviewdata.user.ratings : 1
    );
    const [showReplyInput, setShowReplyInput] = useState(false);
    const userRating = () => {
        if (ratings <= 1) {
            return <span className="text-orange-400">★</span>;
        } else if (ratings === 2) {
            return <span className="text-orange-400">★★</span>;
        } else if (ratings === 3) {
            return <span className="text-orange-400">★★★</span>;
        } else if (ratings === 4) {
            return <span className="text-orange-400">★★★★</span>;
        } else if (ratings >= 5) {
            return <span className="text-orange-400">★★★★★</span>;
        }
    };

    const ReviewCardNested = ({ onereviewdata, ...props }) => {
        return (
            <Box className="flex flex-row w-full">
                <Box className="w-[40px] rounded-full mt-1">
                    <img
                        className="w-[38px] h-[38px] rounded-full mr-2 border-white border-[2px]"
                        src={onereviewdata?.user?.avatar ?? "/img/img_3115.jpg"}
                        alt={
                            onereviewdata?.user?.firstName +
                            " " +
                            onereviewdata?.user?.lastName
                        }
                    />
                </Box>
                <Box className="w-[calc(100%-40px)] flex flex-col">
                    <Box className="text-start text-lg">
                        {onereviewdata?.user?.firstName +
                            " " +
                            onereviewdata?.user?.lastName}
                        <span className="text-xs icons">
                            {" " + new Date(onereviewdata?.updated_at)}
                        </span>
                    </Box>
                    <Box className="text-start">{userRating()}</Box>
                    <Box
                        className="py-2 whitespace-normal"
                        onClick={() =>
                            setShowReplyInput((showReplyInput) => false)
                        }
                    >
                        {onereviewdata?.content}
                    </Box>
                    <Box className="text-start text-sm cursor-pointer">
                        <span
                            className="cursor-pointer"
                            onClick={() =>
                                setShowReplyInput(
                                    (showReplyInput) => !showReplyInput
                                )
                            }
                        >
                            Reply <ImReply className="icons text-xs inline" />
                        </span>{" "}
                        <span className="ml-5  text-xs text-gray-500">
                            replies{" "}
                            {onereviewdata?.replies
                                ? onereviewdata.replies.length
                                : 0}
                        </span>
                    </Box>
                    <Box
                        className="relative w-full"
                        style={{ display: showReplyInput ? "flex" : "none" }}
                    >
                        <ReplyInput commentId={onereviewdata?.id} />
                    </Box>
                    <Box className="relative w-full pt-2 flex flex-col h-full">
                        {Array.isArray(onereviewdata.replies) &&
                            onereviewdata.replies.map((x, i) => {
                                return <ReviewReply key={i} reply={x} />;
                            })}
                    </Box>
                </Box>
            </Box>
        );
    };

    const ReviewReply = ({ reply, ...props }) => {
        const [showReplyInput, setShowReplyInput] = useState(false);
        return (
            <Box className="flex flex-row w-full pb-2">
                <Box
                    className="w-[35px] rounded-full mt-1"
                    onClick={() => setShowReplyInput((showReplyInput) => false)}
                >
                    <img
                        className="w-[35px] h-[35px] rounded-full mr-2 border-white border-[2px]"
                        src={reply?.user?.avatar ?? "/img/cover.jpg"}
                        alt={
                            reply?.user?.firstName + " " + reply?.user?.lastName
                        }
                    />
                </Box>
                <Box className="w-[calc(100% - 35px)] mt-[4px] flex flex-col">
                    <Box
                        className="text-start text-lg"
                        onClick={() =>
                            setShowReplyInput((showReplyInput) => false)
                        }
                    >
                        {reply?.user?.firstName + " " + reply?.user?.lastName}
                        <span className="text-xs text-gray-500 icons">
                            {" " + new Date(reply.created_at)}
                        </span>
                    </Box>
                    <Box
                        className="py-2 whitespace-normal"
                        onClick={() =>
                            setShowReplyInput((showReplyInput) => false)
                        }
                    >
                        {reply?.content}
                    </Box>
                    <Box
                        className="text-start text-sm cursor-pointer"
                        onClick={() =>
                            setShowReplyInput(
                                (showReplyInput) => !showReplyInput
                            )
                        }
                    >
                        <span>Reply</span>
                    </Box>
                    <Box
                        className="relative w-full"
                        style={{ display: showReplyInput ? "flex" : "none" }}
                    >
                        <ReplyInput commentId={reply?.commentId} />
                    </Box>
                </Box>
            </Box>
        );
    };
    return (
        <Box className="w-full">
            <ReviewCardNested onereviewdata={onereviewdata} />
        </Box>
    );
}
