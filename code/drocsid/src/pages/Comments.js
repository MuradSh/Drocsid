import React, { useState, useEffect } from "react";
import { firestore, auth } from "../firebase/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";

const Comments = ({ eventId }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const q = query(
        collection(firestore, "comments"),
        where("eventId", "==", eventId),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const fetchedComments = [];

      for (const comment of querySnapshot.docs) {
        const commentData = comment.data();
        // No need to fetch the user's email separately
        fetchedComments.push(commentData); // Directly use the comment data which includes the userEmail
      }

      setComments(fetchedComments);
    };

    fetchComments();
  }, [eventId]);

  const postComment = async () => {
    if (!commentText.trim()) return;
    const userId = auth.currentUser.uid;
    const userEmail = auth.currentUser.email;
    const newComment = {
      eventId,
      commentText,
      userId,
      userEmail,
      timestamp: new Date(),
    };
    await addDoc(collection(firestore, "comments"), newComment);
    setComments([{ ...newComment }, ...comments]);
    setCommentText("");
  };

  return (
    <div>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
      ></textarea>
      <button onClick={postComment}>Post Comment</button>
      <div>
        {comments.map((comment, index) => (
          <div key={index}>
            <p>
              {comment.userEmail} - {comment.commentText}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
