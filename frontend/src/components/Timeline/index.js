"use client";
import "./index.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ButtonBase,
  Container,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Avatar,
  Box,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import dayjs from "dayjs";
import { curtirPost } from "@/service/postService";

export default function Timeline({ posts }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const router = useRouter();

  const [postStates, setPostStates] = useState(
    posts.map((post) => ({
      id: post.id,
      qtdCurtidas: post.qtd_curtidas,
      curtido: post.Curtidas.length > 0,
    }))
  );

  const formatarData = (dataDoPost) => {
    return dayjs(dataDoPost).format("HH:mm - DD/MM/YY");
  };

  const handleCurtidaIcon = async (postId) => {
    try {
      setPostStates((prevState) =>
        prevState.map((post) =>
          post.id === postId
            ? {
                ...post,
                curtido: !post.curtido,
                qtdCurtidas: post.curtido
                  ? post.qtdCurtidas - 1
                  : post.qtdCurtidas + 1,
              }
            : post
        )
      );

      const resultado = await curtirPost(postId, usuario.id);
      if (resultado.error)
        setNotification({
          open: true,
          message: "Erro ao curtir o post",
          severity: "error",
        });
    } catch (error) {
      setNotification({
        open: true,
        message: "Erro ao curtir o post",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Snackbar open={notification.open} autoHideDuration={6000}>
        <Alert
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
      <Container
        sx={{
          width: "150%",
          marginLeft: "-40vh",
          marginTop: "5vh",
          borderRadius: "10px",
          padding: "1vh",
        }}
      >
        {posts.map((post) => {
          // Garantir que o objeto encontrado não é undefined
          const postState =
            postStates.find((state) => state.id === post.id) || {};
          const { curtido = false, qtdCurtidas = 0 } = postState;

          return (
            <Card
              key={post.id}
              className="timeline"
              variant="outlined"
              sx={{
                width: "85%",
                backgroundColor: "#333",
                color: "white",
                borderRadius: "24px",
                boxShadow: "1px 0px 5px -1px #000",
                marginBottom: "2vh",
              }}
            >
              <ButtonBase
                onClick={() => {
                  router.push("/post/" + post.id, 2000);
                }}
                sx={{
                  display: "block",
                  textAlign: "inherit",
                  width: "100%",
                  borderRadius: "24px",
                }}
              >
                <CardContent>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "-moz-initial",
                        flexDirection: "row",
                      }}
                    >
                      <Avatar
                        sx={{
                          marginBottom: "1vh",
                        }}
                      >
                        {post.Usuario.nickname[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="h5" component="h2" marginLeft={1}>
                          {post.Usuario.nickname}
                        </Typography>
                        <Typography marginLeft={1} marginTop={-1}>
                          {formatarData(post.createdAt)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Card
                    sx={{
                      backgroundColor: "#232328",
                      color: "white",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="h5" component="h2" marginLeft={"3%"}>
                      {post.titulo}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="white"
                      component="p"
                      marginLeft={"3%"}
                    >
                      {post.conteudo}
                    </Typography>

                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      sx={{ justifyContent: "end" }}
                    >
                      <IconButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleCurtidaIcon(post.id);
                        }}
                      >
                        {curtido ? (
                          <Favorite color="error" />
                        ) : (
                          <FavoriteBorder color="error" />
                        )}
                      </IconButton>
                      <Typography marginRight={"3%"}>{qtdCurtidas}</Typography>
                    </Box>
                  </Card>
                </CardContent>
              </ButtonBase>
            </Card>
          );
        })}
      </Container>
    </>
  );
}
