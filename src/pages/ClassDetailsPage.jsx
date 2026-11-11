import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ClassImage from '../components/ClassImage.jsx'
import DataGate from '../components/DataGate.jsx'
import ExperienceSelect from '../components/ExperienceSelect.jsx'
import FeeNotice from '../components/FeeNotice.jsx'
import PlanBar from '../components/PlanBar.jsx'
import SeatStepper from '../components/SeatStepper.jsx'
import SeatsBadge from '../components/SeatsBadge.jsx'
import { BOOKING_FEE, FREE_FEE_FROM } from '../rules/pricingRule.js'
import { checkEligibility } from '../rules/eligibilityRule.js'
import { MAX_SEATS } from '../rules/seatRule.js'
import { formatDuration, formatPrice } from '../utils/format.js'

function ClassDetailsPage({
  status,
  errorMessage,
  onRetry,
  classes,
  plan,
  totals,
  experience,
  onExperienceChange,
  onSetSeats,
  onAdd,
  onRemove,
}) {
  const { id } = useParams()
  const [message, setMessage] = useState('')

  function handleAdd(classId) {
    const result = onAdd(classId)
    setMessage(result.ok ? '' : result.message)
  }

  function renderContent() {
    const item = classes.find((c) => c.id === id)

    if (!item) {
      return (
        <div className="status-box">
          <h1>Class not found</h1>
          <p>There is no class with the ID &quot;{id}&quot;. It may have been removed or the link may be wrong.</p>
          <Link to="/classes" className="btn btn-primary">
            Back to all classes
          </Link>
        </div>
      )
    }

    const eligibility = checkEligibility(experience, item.level)
    const entry = plan.find((p) => p.id === item.id)
    const isFull = item.seatsLeft <= 0

    // other classes of the same type that still have seats, offered when this one cannot be booked
    const alternatives = classes
      .filter((c) => c.type === item.type && c.id !== item.id && c.seatsLeft > 0)
      .slice(0, 3)

    let bookingArea
    if (entry) {
      bookingArea = (
        <>
          <p className="in-plan">This class is in your plan.</p>
          <SeatStepper
            name={item.name}
            seats={entry.seats}
            seatsLeft={item.seatsLeft}
            onChange={(seats) => onSetSeats(item.id, seats)}
          />
          <div className="button-row">
            <Link to="/plan" className="btn btn-primary">
              Review plan
            </Link>
            <button type="button" className="btn btn-secondary" onClick={() => onRemove(item.id)}>
              Remove from plan
            </button>
          </div>
        </>
      )
    } else if (isFull) {
      bookingArea = <p className="unavailable">Unavailable: this class is full.</p>
    } else if (!eligibility.ok) {
      bookingArea = (
        <>
          <p className="unavailable">Unavailable: {eligibility.message}</p>
          <ExperienceSelect id="experience-details" value={experience} onChange={onExperienceChange} />
        </>
      )
    } else {
      bookingArea = (
        <button type="button" className="btn btn-primary" onClick={() => handleAdd(item.id)}>
          Add to plan
        </button>
      )
    }

    return (
      <article>
        <p>
          <Link to="/classes">&larr; Back to classes</Link>
        </p>
        <h1>{item.name}</h1>

        <div className="details-layout">
          <div className="details-media">
            <ClassImage src={item.image} alt={item.imageAlt} type={item.type} />
          </div>

          <div>
            <p>{item.description}</p>
            <dl className="facts">
              <div>
                <dt>When</dt>
                <dd>
                  {item.day}, {item.time}
                </dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>{formatDuration(item.durationMin)}</dd>
              </div>
              <div>
                <dt>Type and level</dt>
                <dd>
                  {item.type}, {item.level}
                </dd>
              </div>
              <div>
                <dt>Coach</dt>
                <dd>{item.coach}</dd>
              </div>
              <div>
                <dt>Price</dt>
                <dd>{formatPrice(item.price)} per seat, mat included</dd>
              </div>
              <div>
                <dt>Availability</dt>
                <dd>
                  <SeatsBadge seatsLeft={item.seatsLeft} /> of {item.capacity} seats
                </dd>
              </div>
            </dl>

            <section className="conditions" aria-labelledby="conditions-heading">
              <h2 id="conditions-heading">Conditions</h2>
              <ul>
                <li>
                  Level: {item.level}. You need {item.level} experience or higher.
                </li>
                <li>
                  Up to {MAX_SEATS} seats per booking, and never more than the seats left.
                </li>
                <li>
                  A {formatPrice(BOOKING_FEE)} booking fee applies if your total is under{' '}
                  {formatPrice(FREE_FEE_FROM)}.
                </li>
              </ul>
            </section>

            <section className="book-area" aria-labelledby="book-heading">
              <h2 id="book-heading">Book this class</h2>
              {bookingArea}
              {message !== '' && (
                <p className="field-error" role="alert">
                  Error: {message}
                </p>
              )}
            </section>

            {(isFull || !eligibility.ok) && alternatives.length > 0 && (
              <section aria-labelledby="alt-heading">
                <h2 id="alt-heading">Other {item.type} classes with seats</h2>
                <ul className="pick-list">
                  {alternatives.map((alt) => (
                    <li key={alt.id}>
                      <Link to={`/classes/${alt.id}`}>{alt.name}</Link>
                      <span>
                        {alt.day} {alt.time} - {alt.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </article>
    )
  }

  return (
    <div className="container page">
      <DataGate status={status} errorMessage={errorMessage} onRetry={onRetry}>
        {renderContent()}
        <FeeNotice />
        <PlanBar totals={totals} />
      </DataGate>
    </div>
  )
}

export default ClassDetailsPage
