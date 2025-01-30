import * as React from "react";
import { SvgIcon, Avatar, Container } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Home from "@/app/home/page";
import "./index.css";
import { loginUsuario } from "@/service/usuarioService";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function NavBar({ nome }) {
  return (
    <header>
      <Container>
        <HomeIcon fontSize="large" />
      </Container>
      <Container sx={{ marginLeft: "123vh", marginTop: "-30px" }}>
        <Avatar className="avatar" sx={{}}>
          {nome[0].toUpperCase()}
        </Avatar>
      </Container>
    </header>
  );
}
