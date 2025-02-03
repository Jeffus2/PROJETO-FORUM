"use client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function Edit() {
  const id = useParams();
  return (
    <div>
      <h1>Edit id {id}</h1>
    </div>
  );
}
