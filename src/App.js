import React, { useEffect,useState, useMemo, useCallback } from "react";
import { HeadCounter } from "./Components/Counter";
import { FabButton } from "./Components/FabButton";
import Navbar from "./Components/Navbar";
import { likesCounter } from "./Services/expensiveCalculation";
import { RepositoryList } from "./Components/RepositoryList";

const SEARCH = "https://api.github.com/search/repositories";

function App() {
  const [totalLikes, setTotalLikes] = useState(0);
  const [dark, setDark] = useState(false);

  const getRepositories = useCallback((query) => {
    return fetch(`${SEARCH}?q=${query}`);
  }, []);

  const likes = useMemo(() => likesCounter(totalLikes), [totalLikes]);

  const theme = useMemo(
    () => ({
      color: dark ? "#fff" : "#333",
      navbar: dark ? "#1a202c" : "#e5e7eb",
      backgroundColor: dark ? "#333" : "#fff",
    }),
    [dark]
  );

  const toogleDarkmode = () => setDark(!dark);

  useEffect(() => console.log("Theme updated"), [theme]);

  return (
    <div style={theme} className="App">
      <Navbar theme={theme.navbar} toogleDarkmode={toogleDarkmode} />
      <HeadCounter likes={likes} />
      <FabButton totalLikes={totalLikes} setTotalLikes={setTotalLikes} />
      <RepositoryList getRepositories={getRepositories} />
    </div>
  );
}

export default App;
