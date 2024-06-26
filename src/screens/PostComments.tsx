import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostComments } from "../api";
import { Comment } from "../Types";
import CommentCard from "../components/CommentCard";

const PostComments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  useEffect(() => {
    fetchPostComments(id ?? "").then((data) => setComments(data));
  }, [id]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4 flex justify-between  items-center">
        Post Comments
        <button
          onClick={() => {
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
              method: "DELETE",
            });
            navigate(-1);
          }}
          className="text-red-600 hover:underline"
        >
          Delete Post
        </button>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 grid-rows-auto">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default PostComments;
