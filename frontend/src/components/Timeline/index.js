import "./index.css";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

export default function Timeline({ posts }) {
  // alert(
  //   posts
  //     .map((element) => {
  //       element.titulo;
  //     })
  //     .join(", ")
  // );

  return (
    <>
      {posts.map((post) => (
        <Card
          key={post.id}
          className="timeline"
          variant="outlined"
          sx={{
            width: "80%",
            padding: "0.5vh",
            backgroundColor: "#333",
            color: "white",
            border: "1.5px solid #444",
            borderRadius: "7px",
            boxShadow: "1px 0px 5px 0px #000",
            marginBottom: "2vh",
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography variant="h5" component="h2">
                {post.Usuario.nickname}
              </Typography>
              <Typography variant="h5" component="h2">
                {post.titulo}
              </Typography>
              <Typography variant="body2" color="white" component="p">
                {post.conteudo}
              </Typography>
              <Typography textAlign="end">Likes:{post.qtd_curtidas}</Typography>
            </CardContent>
          </CardActionArea>
          {/*<Card
        className="timeline"
        variant="outlined"
        sx={{
          width: "100%",
          padding: "0.5vh",
          backgroundColor: "#333",
          color: "white",
          border: "1.5px solid #444",
          borderRadius: "7px",
          boxShadow: "1px 0px 5px 0px #000",
        }}
      >
        <CardActionArea>
          <CardContent>
            <Box>
              <Typography variant="h5" component="div">
                {posts.Usuario.nickname}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">{posts.titulo}</Typography>
              <Typography variant="body2" color="white">
                {posts.conteudo}
              </Typography>
            </Box>
            <Typography
              sx={{
                textAlign: "right",
              }}
            >
              Likes: {posts.qtd_curitdas}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card> */}
        </Card>
      ))}
    </>
  );
}
