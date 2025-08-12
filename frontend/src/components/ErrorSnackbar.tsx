import { Snackbar, Alert } from "@mui/material";

export default function ErrorSnackbar({
  message,
  onClose,
}: { message: string | null; onClose: () => void }) {
  return (
    <Snackbar
      open={Boolean(message)}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity="error" variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
