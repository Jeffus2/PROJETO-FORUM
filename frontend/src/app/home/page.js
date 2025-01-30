"use client";
import { useEffect, useState } from "react";
import PostsMaisCurtidos from "@/components/PostsMaisCurtidos";
import Timeline from "@/components/Timeline";
import CreatePostButton from "@/components/CreatePostButton";
import NavBar from "@/components/NavBar";
import {
  timelinePosts,
  timelinePostsMaisCurtidos,
} from "@/service/postService";

import "./index.css";
import { Container, Skeleton } from "@mui/material";

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
      order: "DESC",
      limit: 5,
      where: null,
      page: 1,
    });
    try {
      const resposta = await timelinePostsMaisCurtidos(filter);
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
  const nome = JSON.parse(localStorage.getItem("usuario")).nome;
  return (
    <>
      <NavBar nome={nome} />
      <Container className="home" maxWidth="ls">
        <Container className="home-post-mais-curtidos">
          {!loading && postMaisCurtidos.length > 0 ? (
            <PostsMaisCurtidos posts={postMaisCurtidos} />
          ) : (
            <Skeleton
              sx={{
                width: "230px",
                height: "310px",
                marginLeft: "-5vh",
                marginTop: "0.3vh",
                borderRadius: "26px",
                padding: "1vh",
              }}
            />
          )}
        </Container>
        <Container className="home-timeline">
          {!loading && posts.length > 0 ? (
            <Timeline posts={posts} />
          ) : (
            <Skeleton
              sx={{
                width: "206.5%",
                height: "240px",
                marginLeft: "-17vh",
                marginTop: "-0.7vh",
                borderRadius: "26px",
                padding: "1vh",
              }}
            />
          )}
        </Container>
        <Container className="home-create-post-button">
          <CreatePostButton />
        </Container>
      </Container>
    </>
  );
}
