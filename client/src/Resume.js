// client/src/Resume.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function Resume() {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    axios
      .get("/api/resume")
      .then((res) => setResume(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!resume) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{resume.name}'s Resume</h2>
      <p>{resume.summary}</p>
      {/* Render other resume sections */}
    </div>
  );
}

export default Resume;
