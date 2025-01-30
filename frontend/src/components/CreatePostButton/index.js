import "./index.css";
import { IconButton, Button } from "@mui/material";
import ThumbUpAlt from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function CreatePostButton() {
  const router = useRouter();

  const handleClick = () => {
    setTimeout(() => router.push("/post/create"), 2000);
  };

  return (
    <div className="create-post-button">
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
    </div>
  );
}
