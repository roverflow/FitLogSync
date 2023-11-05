import { db } from "@/firebase/firebaseSetup";
import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

const getWorkOut = (user) => {
  const [loading, setLoading] = useState(true);
  const [dataExists, setDataExists] = useState(false);
  const [allTemplates, setAllTemplates] = useState([]);
  const [currentWorkoutTemplate, setCurrentWorkoutTemplate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWork = async () => {
      if (!user) {
        setError("No user found");
        setLoading(false);
        return;
      }
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
          setError("No user found");
          setLoading(false);
          return;
        }
        if (userDocSnap.data().currentWorkoutTemplate) {
          setCurrentWorkoutTemplate(userDocSnap.data().currentWorkoutTemplate);
        }
        const allUserProgramsSnapshot = await getDocs(
          query(
            collection(db, "workoutTemplates"),
            where("user", "==", user.uid),
            orderBy("modificationDate", "desc"),
            limit(20)
          )
        );
        if (allUserProgramsSnapshot.empty) {
          setError("No programs found");
          setLoading(false);
          return;
        }
        setDataExists(true);
        const allUserPrograms = allUserProgramsSnapshot.docs.map((docx) => {
          return { data: docx.data(), id: docx.id };
        });
        setAllTemplates(allUserPrograms);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    };
    getWork();
  }, [user]);
  return {
    loading,
    user,
    dataExists,
    error,
    allTemplates,
    currentWorkoutTemplate,
  };
};

export default getWorkOut;
