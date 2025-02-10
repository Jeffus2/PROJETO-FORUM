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
import CreatePostButton from "@/components/CreatePostButton";

export default function ViewPost() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [post, setPost] = useState({});
  const [comentarios, setComentarios] = useState([]);

  const [comentarioFake, setComentarioFake] = useState([
    {
      id: 2,
      conteudo: "la ele mil vezeskk",
      qtd_curtidas: 0,
      usuario_id: 2,
      post_id: 1,
      createdAt: "2025-02-03T04:03:58.000Z",
      updatedAt: "2025-02-03T04:03:58.000Z",
      Usuario: {
        nickname: "Anninha",
        avatar: null,
      },
    },
  ]);

  const fetchTimelineComentarios = async () => {
    try {
      const resposta = await timelineComentarios(id);
      setComentarios(resposta);
    } catch (error) {
      console.log(error);
    }
  };

  const buscarPost = async () => {
    const resposta = await getPost(id, usuario.id);
    if (resposta) {
      setPost(resposta);

      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      buscarPost();

      fetchTimelineComentarios(id);
    }
  }, []);

  return (
    !loading && (
      <div>
        <NavBar />
        <CreatePostButton />
        <Container
          className="tela"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <OnePost post={post} />
          <CreateComentario id={id} />
          <TimelineComentarios comentarios={comentarios} />
        </Container>
      </div>
    )
  );
}
