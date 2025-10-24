import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { InteractiveList } from "./components/InteractiveList";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Dashboard</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<InteractiveList />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
