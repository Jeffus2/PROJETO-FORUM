"use client";
import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/service/postService";

export default function Create() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const postar = async () => {
    try {
      if (titulo.length < 2 || conteudo.trim().length < 5) {
        return setNotification({
          open: true,
          message: "qtd de carac min nao acalnçada",
          severity: "error",
        });
      }

      const resultado = await createPost(titulo, conteudo, usuario.id);

      if (resultado.error) {
        setNotification({
          open: true,
          message: resultado.error,
          severity: "error",
        });
      }
      usuario.qtd_posts += 1;
      localStorage.setItem("usuario", JSON.stringify(usuario));

      setNotification({
        open: true,
        message: "postado com sucesso",
        severity: "success",
      });

      router.push(`/profile/${usuario.id}`, 1000);
    } catch (error) {
      setNotification({
        open: true,
        message: response.error,
        severity: "error",
      });
    }
  };
  return (
    <Container sx={{ textAlign: "center" }}>
      <Snackbar open={notification.open} autoHideDuration={6000}>
        <Alert
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
      <Typography marginTop={4} marginBottom={-6} marginLeft={-7}>
        <strong>POST</strong>
      </Typography>
      <Box
        display={"flex"}
        alignContent={"center"}
        textAlign="center"
        marginLeft={28}
        mt={8}
        color={"#fff"}
        bgcolor={"#333"}
        borderRadius={8}
        boxShadow={4}
        p={4}
        justifyContent={"center"}
        sx={{ width: "70vh", height: "60vh" }}
      >
        <Container sx={{ height: "10vh", width: "50vh", marginBottom: "1vh" }}>
          <TextField
            variant="standard"
            label="titulo"
            value={titulo}
            onChange={(e) => {
              setTitulo(e.target.value);
            }}
            sx={{ marginLeft: "-8vh", width: "60vh" }}
          ></TextField>
          <TextField
            multiline
            variant="filled"
            placeholder="Digite o conteudo aqui..."
            rows={10}
            value={conteudo}
            onChange={(e) => {
              setConteudo(e.target.value);
            }}
            sx={{ width: "40vh" }}
          ></TextField>
        </Container>
      </Box>
      <Box
        display={"flex"}
        marginTop={2}
        justifyContent={"center"}
        marginLeft={-6}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            router.push(`/home`, 2000);
          }}
          sx={{ margin: "2px", marginRight: "40px" }}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={postar}
          sx={{ margin: "2px" }}
        >
          Postar
        </Button>
      </Box>
    </Container>
  );
}
