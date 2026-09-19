import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import Overview from "./app-pages/Overview.jsx";
import InvestigationDetail from "./app-pages/InvestigationDetail.jsx";
import HowItWorks from "./app-pages/HowItWorks.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<DashboardLayout />}>
        <Route path="/app" element={<Overview />} />
        <Route path="/investigation/:id" element={<InvestigationDetail />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Route>
    </Routes>
  );
}