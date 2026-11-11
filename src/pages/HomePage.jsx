import { Link } from 'react-router-dom'
import DataGate from '../components/DataGate.jsx'
import FeeNotice from '../components/FeeNotice.jsx'
import { formatPrice } from '../utils/format.js'

function HomePage({ status, errorMessage, onRetry, classes }) {
  // the three cheapest classes with seats left
  const picks = classes
    .filter((item) => item.seatsLeft > 0)
    .sort((a, b) => a.price - b.price)
    .slice(0, 3)

  return (
    <div className="container page">
      <section className="hero">
        <h1>Fitness classes for Islamabad students and young professionals</h1>
        <p>
          Yoga, strength, cardio, dance and mobility classes at our F-7 Markaz studio. Pick your classes, see the full
          price up front and book your seats in a few minutes.
        </p>
        <div className="button-row">
          <Link to="/classes" className="btn btn-primary">
            Browse classes
          </Link>
          <Link to="/plan" className="btn btn-secondary">
            Open my plan
          </Link>
        </div>
      </section>

      <FeeNotice />

      <section aria-labelledby="picks-heading">
        <h2 id="picks-heading">Student-friendly picks</h2>
        <DataGate status={status} errorMessage={errorMessage} onRetry={onRetry}>
          {picks.length === 0 ? (
            <p>No classes are on the timetable right now. Please check back soon.</p>
          ) : (
            <ul className="pick-list">
              {picks.map((item) => (
                <li key={item.id}>
                  <Link to={`/classes/${item.id}`}>{item.name}</Link>
                  <span>
                    {item.day} {item.time} - {formatPrice(item.price)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </DataGate>
      </section>

      <section aria-labelledby="how-heading">
        <h2 id="how-heading">How booking works</h2>
        <ol className="steps">
          <li>Browse and search the timetable.</li>
          <li>Open a class to see its price, level and seats left.</li>
          <li>Add classes to your plan and set how many seats you need.</li>
          <li>Enter a nickname and confirm. The total is shown before you confirm.</li>
        </ol>
      </section>
    </div>
  )
}

export default HomePage
