import { Box, Card, Container, Typography } from "@mui/material";

export default function TimelineComentarios({ comentarios }) {
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
      <Box
        className="timeline"
        variant="outlined"
        sx={{
          height: "40vh",
          width: "80%",
          backgroundColor: "#333",
          color: "white",
          borderBottomLeftRadius: "24px",
          borderBottomRightRadius: "24px",
        }}
      >
        {comentarios.map((comentario) => (
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
            <Typography
              variant="h5"
              component="h2"
              marginLeft={"3%"}
              fontSize={15}
            >
              {comentario.titulo}
            </Typography>
            <Typography
              variant="body2"
              color="white"
              component="p"
              marginLeft={"3%"}
              fontSize={12}
            >
              {comentario.conteudo}
            </Typography>
            <Typography textAlign="end" marginRight={"3%"}>
              Likes {comentario.qtd_curtidas}
            </Typography>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
