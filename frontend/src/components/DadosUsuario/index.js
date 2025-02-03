"use client"
import React,{useState} from "react";

import { Avatar, Container, Typography, Button } from "@mui/material";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { IconButton, Stack } from "@mui/material/";
import EditIcon from "@mui/icons-material/Edit";



export default function DadosUsuarios() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const data = new Date(usuario.createdAt);
  const dataFormatada = format(data, "dd'/'MM'/'yyyy, 'ás' HH:mm", {
    locale: ptBR,
  });


  return (
    <Container
      className="dados"
      sx={{
        backgroundColor: "#232328",
        height: "40vh",
        marginTop: "9px",
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: "20px",
        borderBottom: "1px solid #333",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "auto",
          justifyContent: "space-between",
        }}
      >
        <Avatar
          sx={{
            height: "200px",
            width: "200px",
            marginTop: "30px",
            fontSize: "80px",
            flexDirection: "column",
          }}
        >
          {usuario.nickname[0].toUpperCase()}
        </Avatar>
        <Typography sx={{marginLeft:"40px"}}><strong>Post: {usuario.qtd_posts}</strong></Typography>
      </Container>
      <Container
        sx={{
          fontSize: "20px",
          marginLeft: "-550px",
          marginTop: "34px",
          marginBottom: "75px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",

            color: "#808080",
          }}
        >
          <Typography>
            NOME:<br></br>
            {usuario.nome}
          </Typography>
          <Typography>
            EMAIL:<br></br>
            {usuario.email}
          </Typography>
          <Typography>
            SENHA:<br></br>
            {"********"}
          </Typography>
        </Container>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: "#808080",
          }}
        >
          <Typography>
            APELIDO:<br></br>
            {usuario.nickname}
          </Typography>
          <Typography>
            PROFISSÃO:<br></br>
            {usuario.profissao ? usuario.profissao : "Não informado"}
          </Typography>
          <Typography>
            DATA DE CRIAC.<br></br>
            {dataFormatada}
          </Typography>
        </Container>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: "#808080",
          }}
        >
          <Stack>
            <IconButton aria-label="Edit">
              <EditIcon color="primary" />
            </IconButton>
          </Stack>
        </Container>
      </Container>
    </Container>
  );
}
