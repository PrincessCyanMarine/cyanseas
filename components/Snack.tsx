// import { useEffect, useId, useState } from "react";
// import styles from "../styles/components/alert.module.scss";
import { Alert, Fade, IconButton, Slide, Snackbar } from "@mui/material";
import { SyntheticEvent } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
// import theme from "../src/theme";

// const theme = createTheme({
//   palette: {
//     success: { main: "#00ff00" },
//   },
// });

export default ({
  open,
  handleClose,
  message,
  autoHideDuration,
  key,
  closeButton,
}: {
  open: boolean;
  handleClose: (event: Event | SyntheticEvent<any, Event>, reason: any) => void;
  message: string;
  autoHideDuration?: number;
  key?: string;
  closeButton?: boolean;
}) => {
  return (
    // <ThemeProvider theme={theme}>
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={handleClose}
      autoHideDuration={autoHideDuration}
      key={key}
      message={message}
      action={
        closeButton ? (
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={(ev: any) => handleClose(ev, "button")}
          >
            <AiOutlineCloseCircle />
          </IconButton>
        ) : undefined
      }
      TransitionComponent={(props: any) => (
        <Slide {...props} direction="down" exit />
      )}
    ></Snackbar>
    // </ThemeProvider>
  );
};
