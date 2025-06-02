import React, { useEffect, useState } from "react";

const App = () => {
  const [theme, setTheme] = useState("default");

  console.log(theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div
      data-theme={theme}
      className="h-screen w-full flex justify-center items-center bg-bg"
    >
      <button onClick={() => setTheme("dark")}>App</button>
    </div>
  );
};

export default App;
