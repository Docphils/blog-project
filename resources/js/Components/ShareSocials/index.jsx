import "./styles.css";
import { Box } from "@mui/material";
import React, { useState } from "react";
import {
    FacebookShareCount,
    PinterestShareCount,
    VKShareCount,
    OKShareCount,
    RedditShareCount,
    TumblrShareCount,
    HatenaShareCount,
    FacebookShareButton,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    LinkedinShareButton,
    TwitterShareButton,
    PinterestShareButton,
    VKShareButton,
    OKShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    RedditShareButton,
    EmailShareButton,
    TumblrShareButton,
    LivejournalShareButton,
    MailruShareButton,
    ViberShareButton,
    WorkplaceShareButton,
    LineShareButton,
    WeiboShareButton,
    PocketShareButton,
    InstapaperShareButton,
    HatenaShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    PinterestIcon,
    VKIcon,
    OKIcon,
    TelegramIcon,
    WhatsappIcon,
    RedditIcon,
    TumblrIcon,
    MailruIcon,
    EmailIcon,
    LivejournalIcon,
    ViberIcon,
    WorkplaceIcon,
    LineIcon,
    PocketIcon,
    InstapaperIcon,
    WeiboIcon,
    HatenaIcon,
  } from "react-share";


export default function ShareSocials(props) {
    const [shareUrl] = useState(props.url);
    const [title] = useState(props.title);
    const [media] = useState(props.media);
    return (
        <Box className="Demo__container md:max-w-[80%] flex-wrap">
            <Box className="Demo__some-network">
                <FacebookShareButton
                    url={shareUrl}
                    quote={title}
                    className="Demo__some-network__share-button"
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>

                <Box>
                    <FacebookShareCount
                        url={shareUrl}
                        className="Demo__some-network__share-count"
                    >
                        {(count) => count}
                    </FacebookShareCount>
                </Box>
            </Box>

            <Box className="Demo__some-network">
                <FacebookMessengerShareButton
                    url={shareUrl}
                    appId="521270401588372"
                    className="Demo__some-network__share-button"
                >
                    <FacebookMessengerIcon size={32} round />
                </FacebookMessengerShareButton>
            </Box>

            <Box className="Demo__some-network">
                <TwitterShareButton
                    url={shareUrl}
                    title={title}
                    className="Demo__some-network__share-button"
                >
                    <TwitterIcon size={32} round />
                </TwitterShareButton>

                <Box className="Demo__some-network__share-count">&nbsp;</Box>
            </Box>

            <Box className="Demo__some-network">
                <TelegramShareButton
                    url={shareUrl}
                    title={title}
                    className="Demo__some-network__share-button"
                >
                    <TelegramIcon size={32} round />
                </TelegramShareButton>

                <Box className="Demo__some-network__share-count">&nbsp;</Box>
            </Box>

            <Box className="Demo__some-network">
                <WhatsappShareButton
                    url={shareUrl}
                    title={title}
                    separator=":: "
                    className="Demo__some-network__share-button"
                >
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>

                <Box className="Demo__some-network__share-count">&nbsp;</Box>
            </Box>

            <Box className="Demo__some-network">
                <LinkedinShareButton
                    url={shareUrl}
                    className="Demo__some-network__share-button"
                >
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
            </Box>

            <Box className="Demo__some-network">
                <PinterestShareButton
                    url={shareUrl}
                    media={media}
                    className="Demo__some-network__share-button"
                >
                    <PinterestIcon size={32} round />
                </PinterestShareButton>

                <Box>
                    <PinterestShareCount
                        url={shareUrl}
                        className="Demo__some-network__share-count"
                    />
                </Box>
            </Box>

            <Box className="Demo__some-network">
                <VKShareButton
                    url={shareUrl}
                    image={media}
                    className="Demo__some-network__share-button"
                >
                    <VKIcon size={32} round />
                </VKShareButton>

                <Box>
                    <VKShareCount
                        url={shareUrl}
                        className="Demo__some-network__share-count"
                    />
                </Box>
            </Box>

            <Box className="Demo__some-network">
                <OKShareButton
                    url={shareUrl}
                    image={media}
                    className="Demo__some-network__share-button"
                >
                    <OKIcon size={32} round />
                </OKShareButton>

                <Box>
                    <OKShareCount
                        url={shareUrl}
                        className="Demo__some-network__share-count"
                    />
                </Box>
            </Box>

            <Box className="Demo__some-network">
                <RedditShareButton
                    url={shareUrl}
                    title={title}
                    windowWidth={660}
                    windowHeight={460}
                    className="Demo__some-network__share-button"
                >
                    <RedditIcon size={32} round />
                </RedditShareButton>

                <Box>
                    <RedditShareCount
                        url={shareUrl}
                        className="Demo__some-network__share-count"
                    />
                </Box>
            </Box>

            <Box className="Demo__some-network">
                <TumblrShareButton
                    url={shareUrl}
                    title={title}
                    className="Demo__some-network__share-button"
                >
                    <TumblrIcon size={32} round />
                </TumblrShareButton>

                <Box>
                    <TumblrShareCount
                        url={shareUrl}
                        className="Demo__some-network__share-count"
                    />
                </Box>
            </Box>

            <Box className="Demo__some-network">
                <LivejournalShareButton
                    url={shareUrl}
                    title={title}
                    description={shareUrl}
                    className="Demo__some-network__share-button"
                >
                    <LivejournalIcon size={32} round />
                </LivejournalShareButton>
            </Box>

            <Box className="Demo__some-network">
                <MailruShareButton
                    url={shareUrl}
                    title={title}
                    className="Demo__some-network__share-button"
                >
                    <MailruIcon size={32} round />
                </MailruShareButton>
            </Box>

            <Box className="Demo__some-network">
                <EmailShareButton
                    url={shareUrl}
                    subject={title}
                    body="body"
                    className="Demo__some-network__share-button"
                >
                    <EmailIcon size={32} round />
                </EmailShareButton>
            </Box>
            <Box className="Demo__some-network">
                <ViberShareButton
                    url={shareUrl}
                    title={title}
                    className="Demo__some-network__share-button"
                >
                    <ViberIcon size={32} round />
                </ViberShareButton>
            </Box>

            <Box className="Demo__some-network">
                <WorkplaceShareButton
                    url={shareUrl}
                    quote={title}
                    className="Demo__some-network__share-button"
                >
                    <WorkplaceIcon size={32} round />
                </WorkplaceShareButton>
            </Box>

            <Box className="Demo__some-network">
                <LineShareButton
                    url={shareUrl}
                    title={title}
                    className="Demo__some-network__share-button"
                >
                    <LineIcon size={32} round />
                </LineShareButton>
            </Box>

            <Box className="Demo__some-network">
                <WeiboShareButton
                    url={shareUrl}
                    title={title}
                    image={media}
                    className="Demo__some-network__share-button"
                >
                    <WeiboIcon size={32} round />
                </WeiboShareButton>
            </Box>

            <Box className="Demo__some-network">
                <PocketShareButton
                    url={shareUrl}
                    title={title}
                    className="Demo__some-network__share-button"
                >
                    <PocketIcon size={32} round />
                </PocketShareButton>
            </Box>

            <Box className="Demo__some-network">
                <InstapaperShareButton
                    url={shareUrl}
                    title={title}
                    className="Demo__some-network__share-button"
                >
                    <InstapaperIcon size={32} round />
                </InstapaperShareButton>
            </Box>

            <Box className="Demo__some-network">
                <HatenaShareButton
                    url={shareUrl}
                    title={title}
                    windowWidth={660}
                    windowHeight={460}
                    className="Demo__some-network__share-button"
                >
                    <HatenaIcon size={32} round />
                </HatenaShareButton>

                <Box>
                    <HatenaShareCount
                        url={shareUrl}
                        className="Demo__some-network__share-count"
                    />
                </Box>
            </Box>
        </Box>
    );
}
