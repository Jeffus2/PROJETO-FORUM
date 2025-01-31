import "./index.css";
import { useRouter } from "next/navigation";
import {
  Container,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  appBarClasses,
  Avatar,
} from "@mui/material";

export default function Timeline({ posts }) {
  // alert(
  //   posts
  //     .map((element) => {
  //       element.titulo;
  //     })
  //     .join(", ")
  // );

  const router = useRouter();

  return (
    <>
      <Container
        sx={{
          width: "150%",
          marginLeft: "-40vh",
          marginTop: "5vh",
          borderRadius: "10px",
          padding: "1vh",
        }}
      >
        {posts.map((post) => (
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
            <CardActionArea
              onClick={() => {
                router.push("/post/" + post.id, 2000);
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2">
                  <Avatar>{post.Usuario.nickname[0]}</Avatar>
                  {post.Usuario.nickname}
                </Typography>
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
                  <Typography textAlign="end" marginRight={"3%"}>
                    Likes {post.qtd_curtidas}
                  </Typography>
                </Card>
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
      </Container>
    </>
  );
}
