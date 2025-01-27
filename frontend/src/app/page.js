"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
//import { loginUsuario } from "@/service/usuarioService";

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
    // const resposta = await loginUsuario({ email, senha });
    // if (resposta.error) {
    //   setNotification({
    //     open: true,
    //     message: resposta.error,
    //     severity: "error",
    //   });
    //   return;
    // }
    // localStorage.setItem("token", resposta.token);
    // localStorage.setItem("usuario", JSON.stringify(resposta.usuario));

    setNotification({
      open: true,
      message: `Bem vindo`,
      severity: "success",
    });

    setTimeout(() => router.push("/home"), 2000);
  };

  return (
    <Container maxWidth="sm">
      <Snackbar
        open={notification.open}
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
        color={"black"}
        bgcolor={"#fff"}
        borderRadius={8}
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
        <Button variant="contained" color="primary" onClick={logar}>
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
