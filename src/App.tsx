import { AuthenticatedApp } from "authenticated";
import { useAuth } from "context/auth-context";
import React from "react";
import { UnathenticatedApp } from "unauthenticated-app";
import "./App.css";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnathenticatedApp />}
    </div>
  );
}

export default App;
