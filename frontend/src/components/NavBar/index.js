import * as React from "react";
import { SvgIcon, Avatar, Container, Fab } from "@mui/material";
import { useRouter } from "next/navigation";
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

const usuario = JSON.parse(localStorage.getItem("usuario"));

export default function NavBar() {
  const router = useRouter();
  return (
    <header>
      <Container sx={{ marginTop: "5px" }}>
        <Fab
          size="small"
          onClick={() => {
            router.push("/home", 2000);
          }}
        >
          <HomeIcon fontSize="large" />
        </Fab>
      </Container>
      <Container sx={{ marginLeft: "123vh", marginTop: "-39px" }}>
        <Fab
          color="default"
          size="small"
          onClick={() => {
            router.push("/profile/" + usuario.id, 2000);
          }}
        >
          <Avatar className="avatar" sx={{}}>
            {usuario.nickname[0].toUpperCase()}
          </Avatar>
        </Fab>
      </Container>
    </header>
  );
}
