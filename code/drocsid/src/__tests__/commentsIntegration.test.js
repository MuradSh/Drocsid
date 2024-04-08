import React from "react";
import { firestore } from "../firebase/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  orderBy,
  limit,
} from "firebase/firestore";

describe("Comments Firestore Tests", () => {
  test("should add a comment to Firestore", async () => {
    const newComment = {
      eventId: "event123",
      commentText: "Test comment for addition",
      userId: "testUserId",
      userEmail: "test@example.com",
      timestamp: new Date(),
    };

    // Add the comment to Firestore
    try {
      const docRef = await addDoc(
        collection(firestore, "comments"),
        newComment
      );
      expect(true).toBeTruthy();
      // clean up and delete the added comment
      await deleteDoc(doc(firestore, "comments", docRef.id));
    } catch (error) {
      console.error(error);
      expect(false).toBeTruthy();
    }
  });

  test("should delete a comment from Firestore", async () => {
    // Add a comment to delete
    const commentToDelete = {
      eventId: "eventtodelete",
      commentText: "Test comment for deletion",
      userId: "testUserId",
      userEmail: "test@example.com",
      timestamp: new Date(),
    };

    const addedDocRef = await addDoc(
      collection(firestore, "comments"),
      commentToDelete
    );
    const commentId = addedDocRef.id;

    try {
      await deleteDoc(doc(firestore, "comments", commentId));
      expect(true).toBeTruthy();
    } catch (error) {
      console.error(error);
      expect(false).toBeTruthy();
    }

    // Fetch comments to verify
    // const q = query(
    //     collection(firestore, "comments"),
    //     where("eventId", "==", "eventtodelete"),
    //     orderBy("timestamp", "desc"),
    //     limit(1)
    // );

    // const querySnapshot = await getDocs(q);

    // const deletedCommentExists = querySnapshot.docs.some(doc => doc.id === commentId);

    // expect(deletedCommentExists).toBeFalsy();
  });
});
