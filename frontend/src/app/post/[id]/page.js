"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPost } from "@/service/postService";
import { Container, Typography } from "@mui/material";
import NavBar from "@/components/NavBar";
import OnePost from "@/components/OnePost";
import CreateComentario from "@/components/CreateComentario";
import TimelineComentarios from "@/components/TimelineComentarios";
import { timelineComentarios } from "@/service/comentarioService";

export default function ViewPost() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comentarios, setComentarios] = useState([]);

  const fetchTimelineComentarios = async () => {
    try {
      const resposta = await timelineComentarios(id);
      setComentarios(resposta);
    } catch (error) {
      alert(error);
    }
  };

  const buscarPost = async () => {
    const resposta = await getPost(id);
    setPost(resposta);
  };

  useEffect(() => {
    if (id) {
      buscarPost();
      fetchTimelineComentarios(id);
    }
  }, []);

  return (
    <div>
      <NavBar />
      <Container
        className="tela"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <OnePost post={post} />
        <CreateComentario />
        <TimelineComentarios comentarios={comentarios} />
      </Container>
    </div>
  );
}
