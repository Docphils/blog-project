import AdSense from "react-adsense";
import { config } from "@/config";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

export default function GoogleAds() {
    return (
        <Box className="w-full">
            <AdSense.Google
                client={config.googleAddClient}
                slot={config.googleAddSlot}
                style={{ display: "block", margin: "auto" }}
                format="auto"
                responsive="true"
                layoutKey="-gw-1+2a-9x+5c"
            />
        </Box>
    );
}
