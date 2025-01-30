import * as React from "react";
import { Container } from "@mui/material";
import { Link } from "next/link";
import { Box } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import Home from "@/app/home/page";
import "./index.css";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function NavBar() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <HomeIcon fontSize="large" />
      </nav>
    </header>
  );
}
