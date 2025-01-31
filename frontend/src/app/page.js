"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUsuario } from "@/service/usuarioService";

import {
  IconButton,
  Button,
  TextField,
  Typography,
  Link,
  Box,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const router = useRouter();

  const logar = async () => {
    if (!email || !senha) {
      setNotification({
        open: true,
        message: "Preencha todos os campos",
        severity: "error",
      });
      return;
    }
    try {
      const resposta = await loginUsuario({ email, senha });
      if (resposta.error) {
        setNotification({
          open: true,
          message: `email e/ou senha invalido`,
          severity: "error",
        });
        return;
      }
      localStorage.setItem("token", JSON.stringify(resposta.token));
      localStorage.setItem("usuario", JSON.stringify(resposta.usuario));

      const usuario = JSON.parse(localStorage.getItem("usuario"));

      setNotification({
        open: true,
        message: `Bem vindo ${usuario.nome}`,
        severity: "success",
      });

      setTimeout(() => router.push("/home"), 2000);
    } catch (error) {
      setNotification({
        open: true,
        message: `Erro ${error.message}`,
        severity: "error",
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Snackbar
        open={notification.open}
        variant={"filled"}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
        >
          {notification.message}
        </Alert>
      </Snackbar>
      <Box
        textAlign="center"
        mt={8}
        color={"#fff"}
        bgcolor={"#333"}
        borderRadius={8}
        boxShadow={4}
        p={4}
      >
        <Typography variant="h3">Login</Typography>
        <TextField
          required
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          label="Senha"
          variant="outlined"
          fullWidth
          margin="normal"
          type={"password"}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={logar}
        >
          Entrar
        </Button>
        <br></br>
        <Link href="/register" variant="body2">
          Não tem uma conta? Cadastre-se
        </Link>
      </Box>
    </Container>
  );
}
