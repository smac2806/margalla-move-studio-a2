import { useState } from 'react'
import { MAX_SEATS } from '../rules/seatRule.js'

// onChange returns { ok, message } from the seat rule; a refused change shows the message here.
function SeatStepper({ name, seats, seatsLeft, onChange }) {
  const [message, setMessage] = useState('')

  function change(newSeats) {
    const result = onChange(newSeats)
    setMessage(result.ok ? '' : result.message)
  }

  return (
    <div className="stepper-block">
      <div className="stepper" role="group" aria-label={`Seats for ${name}`}>
        <button
          type="button"
          className="btn btn-secondary btn-icon"
          onClick={() => change(seats - 1)}
          disabled={seats <= 1}
          aria-label={`Remove one seat from ${name}`}
        >
          -
        </button>
        <output aria-label="Seats booked">{seats}</output>
        <button
          type="button"
          className="btn btn-secondary btn-icon"
          onClick={() => change(seats + 1)}
          aria-label={`Add one seat to ${name}`}
        >
          +
        </button>
      </div>
      <p className="hint">
        Limit: {MAX_SEATS} per booking. {seatsLeft} left in class.
      </p>
      {message !== '' && (
        <p className="field-error" role="alert">
          Error: {message}
        </p>
      )}
    </div>
  )
}

export default SeatStepper
