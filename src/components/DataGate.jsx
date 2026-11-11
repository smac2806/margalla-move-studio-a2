// Shows the loading and error states, and the page content once the data is ready.
function DataGate({ status, errorMessage, onRetry, children }) {
  if (status === 'loading') {
    return (
      <p className="status-box" role="status">
        Loading the timetable...
      </p>
    )
  }

  if (status === 'error') {
    return (
      <div className="status-box status-error" role="alert">
        <h2>Could not load the timetable</h2>
        <p>Error: {errorMessage} Check your connection and try again.</p>
        <button type="button" className="btn btn-primary" onClick={onRetry}>
          Try again
        </button>
      </div>
    )
  }

  return children
}

export default DataGate
