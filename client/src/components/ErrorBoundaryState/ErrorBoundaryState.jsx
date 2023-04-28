import { Box, Typography } from "@mui/material";
import React from "react";
import { Component } from "react";


class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <Box display='flex' justifyContent='center'>
          <img src={require("../../assests/images/serverError.jpg")} alt="server error" />
          </Box>
        )
      }
  
      return this.props.children;
    }
  }

export default ErrorBoundary