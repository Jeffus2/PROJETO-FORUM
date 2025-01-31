"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPost } from "@/service/postService";
import { Typography } from "@mui/material";
import NavBar from "@/components/NavBar";

export default function ViewPost() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  const buscarPost = async () => {
    const resposta = await getPost(id);
    setPost(resposta);
  };

  useEffect(() => {
    buscarPost();
  }, []);

  return (
    <div>
      <NavBar />
      <h1>View Post</h1>
      <Typography>usuario: {post.Usuario?.nickname}</Typography>
      <p>titulo: {post.titulo}</p>
    </div>
  );
}
