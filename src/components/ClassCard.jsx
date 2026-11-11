import { useState } from 'react'
import { Link } from 'react-router-dom'
import { checkEligibility } from '../rules/eligibilityRule.js'
import { formatDuration, formatPrice } from '../utils/format.js'
import ClassImage from './ClassImage.jsx'
import SeatsBadge from './SeatsBadge.jsx'

function ClassCard({ item, planSeats, experience, onAdd }) {
  const [message, setMessage] = useState('')

  const eligibility = checkEligibility(experience, item.level)
  const isFull = item.seatsLeft <= 0
  const inPlan = planSeats > 0

  function handleAdd() {
    const result = onAdd(item.id)
    setMessage(result.ok ? '' : result.message)
  }

  let action
  if (inPlan) {
    action = (
      <p className="in-plan">
        In your plan: {planSeats} seat{planSeats === 1 ? '' : 's'}.{' '}
        <Link to="/plan">Change in plan</Link>
      </p>
    )
  } else if (isFull) {
    action = <p className="unavailable">Unavailable: this class is full.</p>
  } else if (!eligibility.ok) {
    action = <p className="unavailable">Unavailable: needs {item.level} level.</p>
  } else {
    action = (
      <button type="button" className="btn btn-primary" onClick={handleAdd}>
        Add to plan<span className="visually-hidden">: {item.name}</span>
      </button>
    )
  }

  return (
    <article className="card">
      <ClassImage src={item.image} alt={item.imageAlt} type={item.type} />
      <div className="card-body">
        <h3>
          <Link to={`/classes/${item.id}`}>{item.name}</Link>
        </h3>
        <p className="meta">
          {item.day} {item.time} - {formatDuration(item.durationMin)} - with {item.coach}
        </p>
        <p className="tags">
          <span className="badge">{item.type}</span>
          <span className="badge">{item.level}</span>
          <SeatsBadge seatsLeft={item.seatsLeft} />
        </p>
        <p className="price">
          {formatPrice(item.price)} <span className="per-seat">per seat, mat included</span>
        </p>
        {action}
        {message !== '' && (
          <p className="field-error" role="alert">
            Error: {message}
          </p>
        )}
      </div>
    </article>
  )
}

export default ClassCard
