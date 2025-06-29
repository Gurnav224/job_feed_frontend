import { Link } from "react-router-dom"



const Header = () => {
    return (
  <header className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container-fluid mx-3">
      <h3 className="text-white font-bold fw-bold">Job Feed</h3>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse mx-3" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link " aria-current="page" to="/">Job Posting</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/add-job">Add A Job</Link>
          </li>
        </ul>
      </div>
    </div>
  </header>

   

    )
}

export default Header