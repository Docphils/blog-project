import { Box } from "@mui/material";

export default function ApplicationLogo(props) {
    return (
        <Box
            className="logo"
            style={{
                whiteSpace: "nowrap",
                textAlign: "center",
                fontSize: "xx-large",
                fontWeight: "bold",
                height: "fit-content",
                width: "fit-content",
            }}
        >
            <span style={{ color: "rgba(191, 113, 12, 1)" }}>Swi</span>
            <span style={{ color: "rgba(191, 113, 12, 1)" }}>fre</span>
        </Box>
    );
}
