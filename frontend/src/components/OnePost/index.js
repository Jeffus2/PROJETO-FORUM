import {
  Container,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function OnePost({ post }) {
  return (
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
        <CardActionArea disabled={true}>
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
                {post.Usuario?.nickname[0].toUpperCase()}
              </Avatar>
              <Box marginLeft={"1%"}>
                <Typography variant="h5" component="h2">
                  {post?.Usuario?.nickname}
                </Typography>
                <Typography fontSize={15}>{post.createdAt}</Typography>
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
            <Typography textAlign="initial" marginLeft={"3%"} marginTop={"1%"}>
              Likes {post?.qtd_curtidas}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
}
