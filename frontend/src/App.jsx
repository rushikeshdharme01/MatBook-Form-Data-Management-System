import { Routes, Route, Link, useLocation } from "react-router-dom";
import DynamicFormPage from "./pages/DynamicFormPage.jsx";
import SubmissionsPage from "./pages/SubmissionsPage.jsx";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-slate-800">
            MatBook – Dynamic Form Builder
          </h1>
          <nav className="flex gap-3 text-sm">
            <Link
              to="/"
              className={`px-3 py-1 rounded-md ${
                location.pathname === "/"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-200"
              }`}
            >
              Form
            </Link>
            <Link
              to="/submissions"
              className={`px-3 py-1 rounded-md ${
                location.pathname === "/submissions"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-200"
              }`}
            >
              Submissions
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<DynamicFormPage />} />
            <Route path="/submissions" element={<SubmissionsPage />} />

          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
