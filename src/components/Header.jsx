import { Link, NavLink } from 'react-router-dom'

function Header({ seatCount }) {
  return (
    <header className="site-header">
      <div className="container header-row">
        <Link to="/" className="brand">
          Margalla Move Studio
        </Link>
        <nav aria-label="Main">
          <ul className="nav-list">
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/classes">Classes</NavLink>
            </li>
            <li>
              <NavLink to="/plan">My plan ({seatCount})</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
