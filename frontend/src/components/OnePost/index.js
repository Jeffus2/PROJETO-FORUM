"use client";
import {
  Snackbar,
  Alert,
  Container,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Avatar,
  Box,
  Modal,
  TextField,
  Button,
  IconButton,
  Fade,
} from "@mui/material";
import { Edit, Delete, Favorite, FavoriteBorder } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { curtirPost, deletePost, updatePost } from "@/service/postService";
import { set } from "date-fns";

export default function OnePost({ post }) {
  const router = useRouter();
  const formatarData = (dataDoComentario) => {
    const data = dayjs(dataDoComentario);

    return data.format("HH:mm - DD/MM/YY");
  };

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [isEditButton, setIsEditButton] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(true);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [modalConfig, setModalConfig] = useState({
    open: false,
    onClose: () => {
      setModalConfig({ ...modalConfig, open: false });
    },
  });
  const [like, setLike] = useState(false);
  const [qtdCurtidas, setQtdCurtidas] = useState(0);

  useEffect(() => {
    const onePost = post;
    setQtdCurtidas(onePost.qtd_curtidas);
    setLike(post.Curtidas.length > 0);
  }, []);

  const handleCurtirPost = async () => {
    try {
      like ? setQtdCurtidas(qtdCurtidas - 1) : setQtdCurtidas(qtdCurtidas + 1);
      setLike(!like);

      const resultado = await curtirPost(post.id, usuario.id);
      if (resultado.error) {
        setNotification({
          open: true,
          message: "erro ao curtir post",
          severity: "error",
        });
      }
    } catch (error) {
      setNotification({
        open: true,
        message: "erro ao curtir post",
        severity: "error",
      });
    }
  };

  const atualizarPost = async () => {
    try {
      const novoPost = {
        titulo,
        conteudo,
        usuario_id: usuario.id,
      };
      const resultado = await updatePost(post.id, novoPost);

      setModalConfig({ ...modalConfig, open: false });

      setNotification({
        open: true,
        message: "post atualizado!",
        severity: "success",
      });
      setTimeout(() => router.push(`/post/${post.id}`), 2000);
    } catch (error) {
      setNotification({
        open: true,
        message: "Erro ao atualizar post",
        severity: "error",
      });
    }
  };

  const deletarPost = async () => {
    try {
      await deletePost(post.id);
      setNotification({
        open: true,
        message: "deletado com sucesso",
        severity: "success",
      });

      usuario.qtd_posts > 0 ? (usuario.qtd_posts -= 1) : null;
      localStorage.setItem("usuario", JSON.stringify(usuario));

      setTimeout(router.push(`/profile/${usuario.id}`));
    } catch (error) {
      setNotification({
        open: true,
        message: "Erro ao deletar post",
        severity: "error",
      });
    }
  };

  const EditModal = () => {
    return (
      <Card
        sx={{
          position: "absolute",
          width: "50vh",
          height: "30vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "1vh",
        }}
      >
        <TextField
          value={titulo}
          label={"Título"}
          fullWidth
          sx={{ marginBottom: "1vh", maxWidth: "44vh" }}
          onChange={(e) => {
            setTitulo(e.target.value);
          }}
        />
        <TextField
          value={conteudo}
          label={"Conteudo"}
          fullWidth
          sx={{ marginBottom: "1vh", maxWidth: "44vh" }}
          onChange={(e) => {
            setConteudo(e.target.value);
          }}
        />
        <Button variant="contained" onClick={atualizarPost}>
          EDITAR
        </Button>
      </Card>
    );
  };

  const DeleteModal = () => {
    return (
      <Card
        sx={{
          position: "absolute",
          width: "50vh",
          height: "30vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          flexDirection: "row",
          margin: "1vh",
        }}
      >
        <Box>
          <Typography>tem certeza que quer apagar este Post?</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              textAlign: "center",
              flexDirection: "row",
              margin: "1vh",
            }}
          >
            <Typography>você</Typography>
            <Typography color="red " variant="h5">
              NÃO
            </Typography>
            <Typography>poderá voltar atrás</Typography>
          </Box>
          <Button
            disabled={isEditButton}
            onClick={() => {
              setIsEditButton(true);
              deletarPost();
            }}
            variant="contained"
          >
            Deletar
          </Button>
        </Box>
      </Card>
    );
  };

  return (
    <>
      <Snackbar open={notification.open} autoHideDuration={3000}>
        <Alert
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
      <Modal
        className="EditPostModal"
        open={modalConfig.open}
        onClose={modalConfig.onClose}
        sx={{ marginTop: "30vh", marginLeft: "40vh" }}
      >
        <Fade in={modalConfig.open}>
          <Box>{isEditModalOpen ? <EditModal /> : <DeleteModal />}</Box>
        </Fade>
      </Modal>

      <Container
        className="post"
        sx={{
          marginTop: "1vh",
          height: "40vh",
          display: "flex",
          alignContent: "center",
        }}
      >
        <Card
          className="timeline"
          variant="outlined"
          sx={{
            width: "85%",
            backgroundColor: "#333",
            color: "white",
            borderRadius: "24px",
            boxShadow: "1px 0px 5px -1px #000",
            marginBottom: "2vh",
            marginLeft: "7%",
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "3%",
                justifycontent: "space-between",
              }}
            >
              <Avatar sx={{ height: "7vh", width: "7vh" }}>
                <Typography fontSize={30}>
                  {post.Usuario?.nickname[0].toUpperCase()}
                </Typography>
              </Avatar>
              <Box marginLeft={"1%"}>
                <Typography variant="h5" component="h2">
                  {post?.Usuario?.nickname}
                </Typography>
                <Typography fontSize={15}>
                  {formatarData(post.createdAt)}
                </Typography>
              </Box>
            </Box>
            <Card
              sx={{
                marginTop: "1vh",
                backgroundColor: "#232328",
                color: "white",
                height: "22vh",
                borderRadius: 5,
              }}
            >
              <Typography variant="h5" component="h2" marginLeft={"3%"}>
                {post?.titulo}
              </Typography>
              <Typography
                variant="body2"
                color="white"
                component="p"
                marginLeft={"3%"}
              >
                {post?.conteudo}
              </Typography>
            </Card>
            <Box display={"flex"} alignContent={"center"} alignItems={"center"}>
              {usuario.id === post.usuario_id && (
                <IconButton
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setTitulo(post.titulo);
                    setConteudo(post.conteudo);
                    setModalConfig({ ...modalConfig, open: true });
                  }}
                >
                  <Edit color="primary" />
                </IconButton>
              )}
              {usuario.id === post.usuario_id && (
                <IconButton
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setModalConfig({ ...modalConfig, open: true });
                  }}
                >
                  <Delete color="primary" />
                </IconButton>
              )}
              <IconButton
                onClick={() => {
                  handleCurtirPost();
                }}
              >
                {like ? (
                  <Favorite color="error" />
                ) : (
                  <FavoriteBorder color="error" />
                )}
              </IconButton>
              <Typography>{qtdCurtidas}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
