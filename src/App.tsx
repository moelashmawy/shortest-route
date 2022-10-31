import { Routes, Route } from "react-router-dom";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/home-page/HomePage";
import { Toastr } from "./components/toaster/Toaster";
import { NotFoundPage } from "./pages/NotFoundPage";
import { About } from "./pages/About";
import { LayoutPage } from "./pages/layout-page/LayoutPage";
import ResultsPage from "./pages/results-page/ResultsPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      <Toastr />
    </div>
  );
}

export default App;
