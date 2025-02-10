"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import validator from "validator";
import { registrarUsuario } from "@/service/usuarioService";

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

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [nickname, setNickname] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const router = useRouter();

  const registrar = async () => {
    if (nome.trim().length < 3 || !validator.isAlpha(nome.replace(" ", ""))) {
      setNotification({
        open: true,
        message: "Nome inválido",
        severity: "error",
      });
      return;
    }

    if (!validator.isEmail(email)) {
      setNotification({
        open: true,
        message: "Email inválido",
        severity: "error",
      });
      return;
    }

    if (
      !validator.isStrongPassword(senha, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setNotification({
        open: true,
        message: "Senha inválida",
        severity: "error",
      });
      return;
    }

    if (senha !== confirmarSenha) {
      setNotification({
        open: true,
        message: "Senhas não conferem",
        severity: "error",
      });
      return;
    }

    if (nickname.length < 3) {
      setNotification({
        open: true,
        message: "Nickname inválido",
        severity: "error",
      });
      return;
    }

    try {
      const response = await registrarUsuario({ nome, email, senha, nickname });
      if (response.error) {
        setNotification({
          open: true,
          message: response.error,
          severity: "error",
        });
        return;
      }

      setNotification({
        open: true,
        message: "Cadastro realizado com sucesso",
        severity: "success",
      });
      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      setNotification({
        open: true,
        message: "Erro ao cadastrar",
        severity: "error",
      });
      return;
    }
  };

  return (
    <Container maxWidth="sm" onSubmit={registrar}>
      <Snackbar open={notification.open} autoHideDuration={6000}>
        <Alert
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
      <Typography></Typography>
      <Box
        textAlign="center"
        mt={8}
        color={"#fff"}
        bgcolor={"#333"}
        borderRadius={8}
        boxShadow={4}
        p={4}
      >
        <Typography variant="h4">Cadastro</Typography>
        <TextField
          required
          label="Primeiro Nome"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nome}
          onChange={(e) => setNome(e.target.value.replace(/\s/g, ""))}
        />
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
          type={mostrarSenha ? "text" : "password"}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <TextField
          required
          label="Confirmar Senha"
          variant="outlined"
          fullWidth
          margin="normal"
          type={mostrarSenha ? "text" : "password"}
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />
        <TextField
          required
          label="Nickname"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={registrar}
          onSubmit={registrar}
        >
          Cadastrar
        </Button>
        <br />
        <Link href="/" variant="body2">
          Já tem uma conta? Faça login
        </Link>
      </Box>
    </Container>
  );
}
