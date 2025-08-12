import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/Comments.css';

function Comments() {
  const { id } = useParams();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const [currentUserId, setCurrentUserId] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editContent, setEditContent] = useState('');

  const openEditModal = (comment) => {
    setEditCommentId(comment.id);
    setEditContent(comment.content);
    setIsEditModalOpen(true);
  };

  const closeEditModal = (comment) => {
    setEditCommentId(null);
    setEditContent('');
    setIsEditModalOpen(false);
  };

  const handleEditSubmit = async () => {
    try {
      const res = await fetch(`/api/comments/${editCommentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ content: editContent }),
      });

      if (res.ok) {
        setComments((prev) =>
          prev.map((c) =>
            c.id === editCommentId ? { ...c, content: editContent } : c
          )
        );

        closeEditModal();
      } else {
        alert('Failed to update comment');
      }
    } catch (error) {
      console.error('Edit failed:', error);
    }
  };

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
      const res = await fetch('/api/users/check-session', {
        credentials: 'include',
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        content: newComment,
        game_id: id,
      }),
    });

    if (res.ok) {
      const createdComment = await res.json();
      setComments([...comments, createdComment]);
      setNewComment('');
    } else {
      alert('Failed to post a comment');
    }
  };

  const handleDelete = async (commentId) => {
    const confirmed = window.confirm('Delete this comment?');
    if (!confirmed) return;

    const res = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (res.ok) {
      setComments(comments.filter((comment) => comment.id !== commentId));
    } else {
      alert('Failed to delete comment');
    }
  };

  return (
    <div className='comments-main'>
      <div className='input-submit'>
        <form onSubmit={handleSubmit} className='form-game'>
          <input
            type='text'
            placeholder='Write something'
            className='input input-primary input-field'
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
          <button type='submit' className='btn btn-soft btn-primary'>
            Send
          </button>
        </form>

        <div className='comments-all'>
          {comments.length === 0 && (
            <p className='first-comment'>Be the first one!</p>
          )}
          <ul>
            {comments.map((comment) => (
              <li key={comment.id} className='list-game'>
                <div className='buttons-interaction'>
                  {comment.user_id === currentUserId && (
                    <>
                      <button
                        type='submit'
                        className='btn-delete'
                        onClick={() => handleDelete(comment.id)}
                      >
                        🗑️
                      </button>
                      <button
                        className='btn-edit'
                        onClick={() => openEditModal(comment)}
                      >
                        ✏️
                      </button>
                    </>
                  )}
                </div>
                <div className='chat chat-start'>
                  <div className='chat-header'>
                    <div className='content-name'>
                      {comment.username}
                      <div className='time-game'>
                        <time className='text-xs opacity-50'>
                          {new Date(comment.created_at).toLocaleString(
                            'es-ES',
                            {
                              dateStyle: 'short',
                              timeStyle: 'short',
                            }
                          )}
                        </time>
                      </div>
                    </div>
                  </div>
                  <div className='chat-bubble'>{comment.content}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isEditModalOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h3 className='text'>Edit comment</h3>
            <textarea
              className='textarea textarea-bordered'
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className='modal-buttons'>
              <button
                className='btn btn-primary btn-modal'
                onClick={handleEditSubmit}
              >
                Save
              </button>
              <button className='btn btn-modal' onClick={closeEditModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comments;
