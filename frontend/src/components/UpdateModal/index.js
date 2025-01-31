import { Modal, Box, Typography, TextField, Button } from "@mui/material";

export default function UpdateModal({ open, onClose }) {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ backgroundColor: "white", padding: "20px", borderRadius: "10px" }}>
          <Typography>Update</Typography>
          <TextField label="Name" variant="outlined"></TextField>
          <TextField label="Email" variant="outlined"></TextField>
        </Box>
      </Modal>
    </>
  );
}
