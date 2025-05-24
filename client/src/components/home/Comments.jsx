import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/Comments.css";

function Comments() {
  const { id } = useParams();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(`/api/comments/${id}`);
      const data = await res.json();

      setComments(data);
    };

    fetchComments();
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/users/check-session", {
        credentials: "include",
      });

      const data = await res.json();

      if (data.loggedIn) {
        setCurrentUserId(data.userId);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    const res = await fetch(`/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        content: newComment,
        game_id: id,
      }),
    });

    if (res.ok) {
      const createdComment = await res.json();
      setComments([...comments, createdComment]);
      setNewComment("");
    } else {
      alert("Failed to post a comment");
    }
  };

  const handleDelete = async (commentId) => {
    const confirmed = window.confirm("Delete this comment?");
    if (!confirmed) return;

    const res = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      setComments(comments.filter((comment) => comment.id !== commentId));
    } else {
      alert("Failed to delete comment");
    }
  };

  return (
    <div className="comments-main">
      <div className="input-submit">
        <form onSubmit={handleSubmit} className="form-game">
          <input
            type="text"
            placeholder="Write something"
            className="input input-primary"
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
          <button type="submit" className="btn btn-soft btn-primary">
            Send
          </button>
        </form>

        <div className="comments-all">
          {comments.length === 0 && (
            <p className="first-comment">Be the first one!</p>
          )}
          <ul>
            {comments.map((comment) => (
              <li key={comment.id} className="list-game">
                <div className="chat chat-start">
                  <div className="chat-header">
                    <div className="content-name">
                      {comment.username}
                      <div className="time-game">
                        <time className="text-xs opacity-50">
                          {new Date(comment.created_at).toLocaleString(
                            "es-ES",
                            {
                              dateStyle: "short",
                              timeStyle: "short",
                            }
                          )}
                        </time>
                      </div>
                    </div>
                  </div>
                  <div className="chat-bubble">{comment.content}</div>
                </div>
                {comment.user_id === currentUserId && (
                  <button
                    type="submit"
                    className="btn btn-outline btn-primary btn-delete"
                    onClick={() => handleDelete(comment.id)}
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Comments;
