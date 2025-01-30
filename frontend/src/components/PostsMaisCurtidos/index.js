import { ThumbUpAlt } from "@mui/icons-material";
import { Container, Card, CardContent, Typography, Box } from "@mui/material";

export default function PostsMaisCurtidos({ posts }) {
  return (
    <>
      <Container
        sx={{
          maxWidth: "20%",
          marginTop: "8vh",
          marginLeft: "-3vh",
          padding: "1vh",
          maxHeight: "50%",
        }}
      >
        <Container maxWidth="sm">
          <Card
            className="timeline"
            variant="outlined"
            sx={{
              marginLeft: "-8vh",
              marginButtom: "5vh",
              width: "30vh",
              padding: "0.5vh",
              backgroundColor: "#333",
              color: "white",

              borderRadius: "24px",
              boxShadow: "1px 0px 5px -1px #000",
            }}
          >
            <Typography p={0.5} marginLeft={0.5}>
              Top Posts
            </Typography>
            <Box backgroundColor="#333" borderRadius={3} textAlign={"initial"}>
              {posts.map((post) => (
                <Card
                  key={post.id}
                  sx={{
                    backgroundColor: "#232328",
                    color: "white",
                    p: 0,
                    marginBottom: 1,
                    borderRadius: 4,
                    marginLeft: 0.2,
                    marginRight: 0.2,
                  }}
                >
                  <Typography
                    sx={{ marginLeft: 1, fontSize: 15 }}
                    textAlign={"initial"}
                  >
                    <ThumbUpAlt></ThumbUpAlt>
                    {post.qtd_curtidas} {post.titulo}
                  </Typography>
                </Card>
              ))}
            </Box>
          </Card>
        </Container>
      </Container>
    </>
  );
}
