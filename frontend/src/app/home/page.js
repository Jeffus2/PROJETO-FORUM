"use client";
import { useEffect, useState } from "react";
import PostsMaisCurtidos from "@/components/PostsMaisCurtidos";
import Timeline from "@/components/Timeline";
import CreatePostButton from "@/components/CreatePostButton";
import NavBar from "@/components/NavBar";
import { timelinePosts } from "@/service/postService";

import "./index.css";
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

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [postMaisCurtidos, setPostMaisCurtidos] = useState([]);
  const [filter, setFilter] = useState({});
  const [loading, setLoading] = useState(true);

  const buscaPosts = async () => {
    setFilter({
      column: "created_at",
      order: "desc",
      limit: 10,
      where: "",
      page: 1,
    });
    try {
      const resposta = await timelinePosts(filter);
      setPosts(resposta);
    } catch (error) {
      alert(error);
    }
  };

  const buscaPostsMaisCurtidos = async () => {
    setFilter({
      column: "qtd_curtidas",
      order: "DESC",
      limit: 5,
      where: null,
      page: 1,
    });
    try {
      const resposta = await timelinePosts(filter);
      setPostMaisCurtidos(resposta);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    buscaPosts();
    buscaPostsMaisCurtidos();
  }, []);

  return (
    <>
      <NavBar />
      <Container
        className="home"
        maxWidth="ls"
        sx={{
          flexDirection: "row",
          height: "100vh",
        }}
      >
        <Container
          className="home-post-mais-curtidos"
          sx={{
            maxWidth: "20%",
            borderRadius: "10px",
            marginTop: "8vh",
            marginLeft: "-3vh",
            padding: "1vh",
            maxHeight: "50%",
          }}
        >
          {!loading && postMaisCurtidos.length > 0 && (
            <PostsMaisCurtidos posts={postMaisCurtidos} />
          )}
        </Container>
        <Container
          className="home-timeline"
          sx={{
            marginTop: "5vh",
            marginRight: "1vh",
            borderRadius: "10px",
            padding: "1vh",
          }}
        >
          <Timeline posts={posts} />{" "}
        </Container>
        <Container
          className="home-create-post-button"
          sx={{
            width: "10%",
            borderRadius: "10px",
            marginTop: "75vh",
            marginLeft: "80%",
            marginBottom: "20vh",
            padding: "1vh",
            mb: 5,
            maxHeight: "10vh",

            position: "fixed",
          }}
        >
          <CreatePostButton />
        </Container>
      </Container>
      {/* 
      Criar post 
      {
      "titulo": "titulo",
      "conteudo": "conteudo",
      "usuario_id": 1
      }
      */}
    </>
  );
}
