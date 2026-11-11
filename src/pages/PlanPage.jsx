import { Link } from 'react-router-dom'
import DataGate from '../components/DataGate.jsx'
import ExperienceSelect from '../components/ExperienceSelect.jsx'
import FeeNotice from '../components/FeeNotice.jsx'
import SeatStepper from '../components/SeatStepper.jsx'
import SummaryBox from '../components/SummaryBox.jsx'
import { formatPrice } from '../utils/format.js'

function PlanPage({
  status,
  errorMessage,
  onRetry,
  classes,
  plan,
  totals,
  conflicts,
  experience,
  onExperienceChange,
  onSetSeats,
  onRemove,
  onFix,
}) {
  function renderRow(entry) {
    const item = classes.find((c) => c.id === entry.id)
    const conflict = conflicts.find((c) => c.id === entry.id)

    let fixLabel = ''
    if (conflict) {
      fixLabel = conflict.fixSeats > 0 ? `Reduce to ${conflict.fixSeats} seat${conflict.fixSeats === 1 ? '' : 's'}` : 'Remove from plan'
    }

    return (
      <li key={entry.id} className={conflict ? 'plan-row plan-row-problem' : 'plan-row'}>
        {item ? (
          <>
            <div>
              <h3>
                <Link to={`/classes/${item.id}`}>{item.name}</Link>
              </h3>
              <p className="meta">
                {item.day} {item.time} - {formatPrice(item.price)} per seat
              </p>
            </div>
            <SeatStepper
              name={item.name}
              seats={entry.seats}
              seatsLeft={item.seatsLeft}
              onChange={(seats) => onSetSeats(item.id, seats)}
            />
            <p className="row-price">{formatPrice(item.price * entry.seats)}</p>
          </>
        ) : (
          <div>
            <h3>Unknown class ({entry.id})</h3>
          </div>
        )}

        {conflict && (
          <div className="conflict" role="alert">
            <p>
              <strong>Problem:</strong> {conflict.message}
            </p>
            <button type="button" className="btn btn-secondary" onClick={() => onFix(conflict)}>
              {fixLabel}
            </button>
          </div>
        )}

        <button type="button" className="btn btn-link" onClick={() => onRemove(entry.id)}>
          Remove<span className="visually-hidden"> {item ? item.name : entry.id}</span>
        </button>
      </li>
    )
  }

  function renderContent() {
    if (plan.length === 0) {
      return (
        <div className="status-box">
          <h2>Your plan is empty</h2>
          <p>Add one or more classes from the timetable to see your total here.</p>
          <Link to="/classes" className="btn btn-primary">
            Browse classes
          </Link>
        </div>
      )
    }

    const blocked = conflicts.length > 0

    return (
      <div className="two-column">
        <section aria-labelledby="plan-heading">
          <h2 id="plan-heading">Selected classes</h2>
          {blocked && (
            <p className="field-error">
              Error: some classes in your plan cannot be booked as they are. Fix the problems below to continue.
            </p>
          )}
          <ul className="plan-list">{plan.map(renderRow)}</ul>
          <ExperienceSelect id="experience-plan" value={experience} onChange={onExperienceChange} />
        </section>

        <SummaryBox totals={totals}>
          {blocked ? (
            <p className="hint">Checkout is unavailable until the problems are fixed.</p>
          ) : (
            <Link to="/checkout" className="btn btn-primary btn-block">
              Continue to booking details
            </Link>
          )}
        </SummaryBox>
      </div>
    )
  }

  return (
    <div className="container page">
      <h1>My plan</h1>
      <FeeNotice />
      <DataGate status={status} errorMessage={errorMessage} onRetry={onRetry}>
        {renderContent()}
      </DataGate>
    </div>
  )
}

export default PlanPage
