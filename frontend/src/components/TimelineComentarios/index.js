"use client";
import {
  Avatar,
  Box,
  Card,
  Container,
  Typography,
  Fab,
  IconButton,
  Modal,
  Alert,
  Snackbar,
  Fade,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Delete, Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  deletarComentario,
  curtirComentario,
} from "@/service/comentarioService";

export default function TimelineComentarios({ comentarios }) {
  const [disableButton, SetDisableButton] = useState(false);
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [comentariosStates, SetComentariosStates] = useState(
    comentarios.map((comentario) => ({
      id: comentario.id,
      qtd_curtidas: comentario.qtd_curtidas,
    }))
  );

  const router = useRouter();

  const formatarData = (dataDoComentario) => {
    const data = new Date(dataDoComentario);
    const dataFormatada = format(data, "HH:mm '-' dd'/'MM'/'yy", {
      locale: ptBR,
    });
    return dataFormatada;
  };

  const handleCurtirComentario = async (comentarioId) => {
    try {
      const resultado = await curtirComentario(comentarioId, usuario.id);
      if (resultado.error) {
        setNotification({
          open: true,
          message: "erro ao curtir comentario!",
          severity: "error",
        });
      }

      SetComentariosStates((prevState) =>
        prevState.map((state) => {
          if (state.id === comentarioId) {
            return {
              ...state,
              qtd_curtidas: resultado.qtd_curtidas, // Evita valores undefined
            };
          }
          return state;
        })
      );
      setNotification({
        open: true,
        message: "comentario curtido com sucesso",
        severity: "success",
      });
    } catch (error) {
      setNotification({
        open: true,
        message: `${error.message}`,
        severity: "error",
      });
    }
  };

  const delComentario = async (id) => {
    try {
      const resultado = await deletarComentario(id);
      setNotification({
        open: true,
        message: "comentario deletado com sucesso",
        severity: "success",
      });
      if (resultado.error) {
        setNotification({
          open: true,
          message: "erro ao apagar comentario!",
          severity: "error",
        });
      }
    } catch (error) {
      setNotification({
        open: true,
        message: "erro ao apagar comentario",
        severity: "error",
      });
    }
  };

  return (
    <Container
      className="timelien-comentarios"
      sx={{
        height: "45vh",

        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        display: "flex",
        padding: "0.5vh",
      }}
    >
      <Snackbar open={notification.open} autoHideDuration={3000}>
        <Alert
          severity={notification.severity}
          onClose={() => setNotification({ ...notification, open: false })}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
      <Box
        className="timeline"
        variant="outlined"
        sx={{
          maxHeight: "40vh",
          overflowY: "auto",
          overflowX: "hidden",
          height: "40vh",
          width: "80%",
          backgroundColor: "#333",
          color: "white",
          borderBottomLeftRadius: "24px",
          borderBottomRightRadius: "24px",
        }}
      >
        {comentarios.map((comentario) => {
          const comentarioState =
            (comentariosStates || []).find(
              (state) => state.id === comentario.id
            ) || {};
          const { qtd_curtidas = 0 } = comentarioState || {};

          return (
            <Card
              key={comentario.id}
              sx={{
                marginTop: "1vh",
                backgroundColor: "#232328",
                color: "white",
                width: "90%",
                height: "10vh",
                borderRadius: 5,

                marginLeft: "4%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  margin: "1%",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginRight: "3.5vh",
                }}
              >
                <Box display={"flex"}>
                  <Box>
                    {comentario.Usuario.avatar ? (
                      <Avatar></Avatar>
                    ) : (
                      <Avatar sx={{ height: "4vh", width: "4vh" }}>
                        {comentario.Usuario.nickname[0].toUpperCase()}
                      </Avatar>
                    )}
                  </Box>
                  <Box display={"flex"} flexDirection={"column"}>
                    <Box marginLeft={"1vh"}>
                      <Typography variant="h5" component="h2" fontSize={15}>
                        {comentario.Usuario.nickname}
                      </Typography>
                    </Box>
                    <Typography fontSize={10} marginLeft={"1vh"}>
                      {formatarData(comentario.createdAt)}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  {usuario.id === comentario.usuario_id && (
                    <IconButton
                      disabled={disableButton}
                      onClick={() => {
                        SetDisableButton(true);
                        const id = comentario.id;
                        delComentario(id);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  )}
                </Box>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                marginRight={"2vh"}
                marginLeft={"2vh"}
                height={20}
              >
                <Box width={"100%"}>
                  <Typography
                    variant="body2"
                    color="white"
                    component="p"
                    marginLeft={"3%"}
                    fontSize={12}
                    textAlign={"-moz-initial"}
                    display={"flex"}
                    flexDirection={"row"}
                  >
                    {comentario.conteudo}
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  alignContent={"center"}
                  alignItems={"center"}
                  flexDirection={"row"}
                  sx={{ justifyContent: "end", marginBottom: "2vh" }}
                >
                  <IconButton
                    onClick={() => handleCurtirComentario(comentario.id)}
                  >
                    <Favorite color="error" />
                  </IconButton>

                  <Typography marginRight={"3%"}>{qtd_curtidas}</Typography>
                </Box>
              </Box>
            </Card>
          );
        })}
      </Box>
    </Container>
  );
}
