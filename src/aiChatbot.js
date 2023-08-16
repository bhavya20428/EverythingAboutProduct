import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import "@fontsource/roboto/300.css";

export default function AIChatbot(props) {
  return (
    <>
      <Paper square sx={{ p: 2, pb: "50px", boxShadow: 0 }}>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          sx={{ pb: 0, mb: 2, fontFamily: "Arial", fontWeight: 500 }}
        >
          AI Chatbot
        </Typography>
        <Divider sx={{ mb: 4 }}></Divider>

        <gradio-app
          src="https://bhavya8-gradiosample.hf.space"
          theme-mode="light"
          eager="true"
          initial_height="0px"
        ></gradio-app>
      </Paper>
    </>
  );
}
