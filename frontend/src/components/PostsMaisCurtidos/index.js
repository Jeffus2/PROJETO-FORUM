import { ThumbUpAlt } from "@mui/icons-material";
import { Container, Card, CardContent, Typography, Box } from "@mui/material";

export default function PostsMaisCurtidos({ posts }) {
  return (
    <>
      <Container maxWidth="sm">
        <Card
          className="timeline"
          variant="outlined"
          sx={{
            marginLeft: "-5vh",
            marginButtom: "5vh",
            width: "30vh",
            padding: "0.5vh",
            backgroundColor: "#333",
            color: "white",
            border: "1.5px solid #444",
            borderRadius: "7px",
            boxShadow: "1px 0px 5px 0px #000",
          }}
        >
          <Typography>Top Posts</Typography>
          <Box backgroundColor="#333" borderRadius={3} textAlign={"initial"}>
            {posts.map((post) => (
              <Card
                key={post.id}
                sx={{
                  backgroundColor: "#484D50",
                  color: "white",
                  p: 0,
                  marginBottom: 1,
                }}
              >
                <Typography sx={{ marginLeft: 1 }} textAlign={"initial"}>
                  <ThumbUpAlt></ThumbUpAlt>
                  {post.qtd_curtidas} {post.titulo}
                </Typography>
              </Card>
            ))}
          </Box>
        </Card>
      </Container>
    </>
  );
}
