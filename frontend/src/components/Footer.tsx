import React from "react";
import { Box, Typography, Link } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        height: 30
      }}
    >
      <Typography variant="body2" color={"primary.main"}>
        &copy; {new Date().getFullYear()} TimeHarmony | Developed by Vishal
        Patar
      </Typography>
      <Box
        sx={{
          ml: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link
          href="https://www.linkedin.com/in/vishal-patar-89b142239"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LinkedInIcon />
        </Link>
      </Box>
      <Box
        sx={{
          ml: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link
          href="https://github.com/Vishal-Patar"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GitHubIcon />
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
