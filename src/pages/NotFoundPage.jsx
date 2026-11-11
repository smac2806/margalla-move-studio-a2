import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="container page">
      <h1>Page not found</h1>
      <p>This address does not exist on our website.</p>
      <div className="button-row">
        <Link to="/" className="btn btn-primary">
          Go to home
        </Link>
        <Link to="/classes" className="btn btn-secondary">
          Browse classes
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
