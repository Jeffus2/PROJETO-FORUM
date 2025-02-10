"use client";
import NavBar from "@/components/NavBar";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import validator from "validator";
import {
  Snackbar,
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
import { updateDadosUsuario } from "@/service/usuarioService";

export default function Edit() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const router = useRouter();
  const { id } = useParams();

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [nome, setNome] = useState(usuario.nome);
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState(usuario.email);
  const [nickname, setNickname] = useState(usuario.nickname);
  const [profissao, setProfissao] = useState(
    usuario.profissao ? usuario.profissao : ""
  );
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const UpdateDados = async () => {
    if (!nome && !email && !nickname)
      return setNotification({
        open: true,
        message: "preencha todos os campos",
        severity: "error",
      });

    if (nome.length < 3 || !validator.isAlpha(nome))
      return setNotification({
        open: true,
        message: "nome Invalido",
        severity: "error",
      });

    if (
      (senha || senha !== "") &&
      !validator.isStrongPassword(senha, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 3,
        minSymbols: 1,
      })
    )
      return setNotification({
        open: true,
        message: "Senha Invalido",
        severity: "error",
      });

    if (nickname.length < 3)
      return setNotification({
        open: true,
        message: "Nickname Invalido",
        severity: "error",
      });

    if (profissao.length > 1 && profissao.length < 3)
      return setNotification({
        open: true,
        message: "profissão invalida",
        severity: "error",
      });
    try {
      const dados = { nome, email, senha, nickname, profissao };
      const resultado = await updateDadosUsuario(id, dados);
      if (resultado.error)
        return setNotification({
          open: true,
          message: resultado.message,
          severity: "error",
        });

      setNotification({
        open: true,
        message: "dados alterados com sucesso!",
        severity: "success",
      });

      router.push(`/profile/${id}`, 2000);
    } catch (error) {}
  };

  const handleClickShowPassword = () => setMostrarSenha((show) => !show);

  return (
    <div>
      <Snackbar open={notification.open} autoHideDuration={3000}>
        <Alert
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
      <NavBar />
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            borderBottom: "3px solid #333",
            borderBottomLeftRadius: "50px",
            borderBottomRightRadius: "50px",
          }}
          display={"flex"}
          bgcolor={"#232328"}
          height={"90vh"}
          width={"80vh"}
          flexDirection={"column"}
          marginTop={4}
        >
          <Container
            className="avatar-pic"
            sx={{
              backgroundColor: "#232328",
              height: "30vh",
              display: "flex",
              justifyContent: "center",
              marginTop: "2%",
              marginBottom: "2%",
            }}
          >
            <Avatar sx={{ width: "30vh", height: "30vh" }}></Avatar>
          </Container>
          <Container
            className="dados"
            sx={{
              display: "flex",
              backgroundColor: "#232328",
              height: "40vh",
              flexDirection: "column",
              marginBottom: "2%",
            }}
          >
            <TextField
              sx={{ marginBottom: "2%" }}
              label={"Primeiro Nome"}
              value={nome}
              onChange={(e) => {
                setNome(e.target.value.replace(/\s/g, ""));
              }}
            />
            <TextField
              label={"Email"}
              sx={{ marginBottom: "2%" }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value.replace(/\s/g, ""));
              }}
            />

            <TextField
              label={"Senha"}
              sx={{ marginBottom: "2%" }}
              value={senha}
              type={mostrarSenha ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge={"end"}>
                      {mostrarSenha ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setSenha(e.target.value.replace(/\s/g, ""));
              }}
            />

            <TextField
              label={"Nickname"}
              sx={{ marginBottom: "2%" }}
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value.replace(/\s/g, ""));
              }}
            />
            <TextField
              label={"Profissão"}
              sx={{ marginBottom: "2%" }}
              value={profissao}
              onChange={(e) => {
                setProfissao(e.target.value);
              }}
            />
          </Container>
          <Container
            className="botoes"
            sx={{
              backgroundColor: "232328",
              height: "5vh",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "2%",
            }}
          >
            <Button
              onClick={() => {
                router.push(`/profile/${id}`, 2000);
              }}
              variant="contained"
            >
              Cancelar
            </Button>
            <Button variant="contained" onClick={UpdateDados}>
              Enviar
            </Button>
          </Container>
        </Box>
      </Container>
    </div>
  );
}
