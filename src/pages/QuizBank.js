import React, { useEffect } from "react";
import Feed from "../components/Feed";
import NavBar from "../components/navigation/Navbar";
// import { useAuth } from "../context/auth_context";
// import { firestore } from "../firebase";

const QuizBank = () => {
  useEffect(() => { });

  return (
    <div>
      <NavBar position="sticky" />
      <Feed />
    </div>
  );
};

export default QuizBank;