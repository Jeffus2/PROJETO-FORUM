"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NavBar from "@/components/NavBar";
import CreatePostButton from "@/components/CreatePostButton";
import UpdateModal from "@/components/UpdateModal";
import DadosUsuarios from "@/components/DadosUsuario";
import Timeline from "@/components/Timeline";
import { Avatar, Container, Typography, Button } from "@mui/material";
import { qtd_posts, timelinePosts } from "@/service/postService";

/**
 * 
import { Avatar, Container, Typography, Button } from "@mui/material";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { IconButton, Stack } from "@mui/material/";
import EditIcon from "@mui/icons-material/Edit";
 */
export default function Perfil() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [qtdPost, setQtdPost] = useState(0);
  const [configModal, setConfigModal] = useState({
    open: false,
    onClose: ()=>setConfigModal({...configModal, open: false}),
  });
  const [loading, setLoading] = useState(true);
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

  const buscaQtdPosts = async (id) => {
    try{
      const resposta = await qtd_posts(id);
      setQtdPost(resposta);
    }catch(error){
      alert(error);
    }
  }

  useEffect(() => {
    buscaPosts(id);
    buscaQtdPosts(id);
  }, []);

  //const id = JSON.parse(localStorage.getItem("usuario")).id;

  return (
    <div>

      <NavBar acc={qtdPost.acc}  />
      <UpdateModal open={configModal.open} onClose={configModal.onClose} />
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
