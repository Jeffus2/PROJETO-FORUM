import {
  Card,
  CardContent,
  Box,
  Container,
  TextField,
  Avatar,
  Typography,
  Button,
} from "@mui/material";

export default function CreateComentario({ OnClick }) {
  return (
    <Container
      className="criarComentario"
      sx={{
        height: "15vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        marginTop: "2vh",
      }}
    >
      <Box
        className="timeline"
        variant="outlined"
        sx={{
          width: "80%",
          height: "18vh",

          backgroundColor: "#333",
          color: "white",

          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",

          marginBottom: "-3vh",
        }}
      >
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Avatar sx={{ height: "4vh", width: "4vh" }}>T</Avatar>
            <Typography sx={{ marginLeft: "1vh" }}>NICK</Typography>
          </Box>
          <Box sx={{ marginTop: "1vh", backgroundColor: "#333" }}>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={1}
              placeholder="Escreva um comentario"
              sx={{
                width: "83.5%",
                height: "7.2vh",
                color: "white",
                backgroundColor: "#333",
                boxShadow: "0px 0px 2px -1px #000",
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#232328",
                marginLeft: "1vh",
                height: "7.2vh",
                width: "15vh",
                boxShadow: "0px 0px 2px -1px #000",
                color: "white",
              }}
            >
              Enviar
            </Button>
          </Box>
        </CardContent>
      </Box>
    </Container>
  );
}
