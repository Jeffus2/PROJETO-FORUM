"use client";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import { useParams } from "next/navigation";
import { Container, Typography } from "@mui/material";
import DadosUsuarios from "@/components/DadosUsuario";
import Timeline from "@/components/Timeline";
import { timelinePosts } from "@/service/postService";
import CreatePostButton from "@/components/CreatePostButton";

export default function Perfil() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({
    column: "created_at",
    order: "desc",
    limit: 10,
    where: id,
    page: 1,
  });

  const buscaPosts = async (id) => {
    try {
      const resposta = await timelinePosts(filter);
      setPosts(resposta);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    buscaPosts(id);
  }, []);

  //const id = JSON.parse(localStorage.getItem("usuario")).id;

  return (
    <div>
      <NavBar />
      <DadosUsuarios />
      <Container
        className="timel-perfil"
        sx={{
          height: "60vh",
          width: "90vh",
          marginRight: "0vh",
        }}
      >
        <Timeline posts={posts} />
      </Container>
    </div>
  );
}
