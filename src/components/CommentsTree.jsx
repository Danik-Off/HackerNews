import React from "react";
import "./CommentsTree.scss"; // Импорт файла со стилями

const CommentsTree = ({ comments }) => {
  return (
    <ul className="comments">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </ul>
  );
};

const Comment = ({ comment }) => {
  const { id, text, author, time, children } = comment;

  return (
    <li className="comment">
      <div className="comment-text">{text}</div>
      <div className="comment-author">{author}</div>
      <div className="comment-time">{time}</div>
      {children && children.length > 0 && (
        <ul className="comment-children">
          <CommentsTree comments={children} />
        </ul>
      )}
    </li>
  );
};

export default CommentsTree;