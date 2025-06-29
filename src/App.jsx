import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./components/Header";
import JobList from "./pages/JobList";
import JobDetails from "./pages/JobDetails";
import  AddJob  from "./pages/AddJob";

import { BrowserRouter as Router , Route , Routes } from "react-router-dom";

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/add-job" element={<AddJob />} />
      </Routes>
    </Router>
  )
}

export default App
