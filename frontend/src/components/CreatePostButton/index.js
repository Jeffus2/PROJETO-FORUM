import "./index.css";
import { IconButton, Button, Container } from "@mui/material";
import ThumbUpAlt from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function CreatePostButton() {
  const router = useRouter();

  const handleClick = () => {
    setTimeout(() => router.push("/post/create"), 2000);
  };

  return (
    <div className="create-post-button">
      <Container
        sx={{
          width: "10%",
          marginTop: "70vh",
          marginLeft: "20vh",
          borderRadius: "10px",
          shapeOutside: "revert",
          padding: "1vh",
          mb: 5,
          maxHeight: "10vh",
          position: "fixed",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          sx={{
            backgroundColor: "#333",
            display: "flex",
            borderRadius: "50%",
            height: "8vh",
            fontSize: "50px",
            justifyContent: "center",
          }}
        >
          +
        </Button>
      </Container>
    </div>
  );
}
