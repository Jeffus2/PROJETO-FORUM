import "./index.css";
import { IconButton, Button, Container, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function CreatePostButton() {
  const router = useRouter();

  const handleClick = () => {
    setTimeout(() => router.push("/post/create"), 2000);
  };

  return (
    <div className="create-post-button">
      <Container sx={{ marginTop: 70, position:"fixed" }}>
        <Fab>
          <Typography fontSize={50} marginTop={-0.7}>
            <strong>+</strong>
          </Typography>
        </Fab>
      </Container>
    </div>
  );
}
