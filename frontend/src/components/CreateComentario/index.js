"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Container,
  TextField,
  Avatar,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { criarComentario } from "@/service/comentarioService";

export default function CreateComentario({ id }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [comentario, setComentario] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const postarComentario = async () => {
    try {
      if (comentario.length < 1)
        return setNotification({
          open: true,
          message: "numero de carac min não suficientes",
          severity: "alert",
        });

      const resultado = await criarComentario(comentario, usuario.id, id);
      if (resultado.error) {
        setNotification({
          open: true,
          message: resultado.error,
          severity: "error",
        });
        return;
      }

      setNotification({
        open: true,
        message: "Comentario enviado!",
        severity: "success",
      });
    } catch (error) {
      setNotification({
        open: true,
        message: `erro: ${error}`,
        severity: "Error",
      });
    }
  };

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
      <Snackbar open={notification.open} autoHideDuration={6000}>
        <Alert
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
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
            <Avatar sx={{ height: "4vh", width: "4vh" }}>
              {usuario.nickname[0].toUpperCase()}
            </Avatar>
            <Typography sx={{ marginLeft: "1vh" }}>
              {usuario.nickname}
            </Typography>
          </Box>
          <Box sx={{ marginTop: "1vh", backgroundColor: "#333" }}>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={1}
              placeholder="Escreva um comentario"
              value={comentario}
              onChange={(e) => {
                setComentario(e.target.value);
              }}
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
              onClick={postarComentario}
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
