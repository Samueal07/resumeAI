// client/src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/api/current_user")
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {user ? (
          <div>
            <h1>Welcome, {user.name}</h1>
            <img src={user.avatar} alt={user.name} />
            <p>Email: {user.email}</p>
            <a href="/auth/logout">Logout</a>
          </div>
        ) : (
          <a href="/auth/google">Login with Google</a>
        )}
      </header>
    </div>
  );
}

export default App;
