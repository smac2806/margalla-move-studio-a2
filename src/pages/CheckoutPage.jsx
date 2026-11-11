import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DataGate from '../components/DataGate.jsx'
import ExperienceSelect from '../components/ExperienceSelect.jsx'
import FeeNotice from '../components/FeeNotice.jsx'
import SummaryBox from '../components/SummaryBox.jsx'
import { NICKNAME_MAX, NOTE_MAX, validateBooking } from '../utils/validateBooking.js'

function CheckoutPage({
  status,
  errorMessage,
  onRetry,
  plan,
  plannedClasses,
  totals,
  conflicts,
  form,
  onFormChange,
  experience,
  onExperienceChange,
  onConfirm,
}) {
  const navigate = useNavigate()
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const errors = validateBooking(form)
  const errorList = Object.values(errors)

  // an error is shown once the field was visited or the form was submitted
  function errorFor(field) {
    if (!errors[field]) {
      return ''
    }
    return touched[field] || submitted ? errors[field] : ''
  }

  function handleBlur(event) {
    const field = event.target.name
    setTouched((previous) => ({ ...previous, [field]: true }))
  }

  function handleChange(event) {
    const { name, type, checked, value } = event.target
    onFormChange(name, type === 'checkbox' ? checked : value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)

    if (errorList.length > 0 || conflicts.length > 0) {
      return
    }

    onConfirm()
    navigate('/confirmation')
  }

  function renderContent() {
    if (plan.length === 0) {
      return (
        <div className="status-box">
          <h2>Nothing to book yet</h2>
          <p>Your plan is empty. Add a class first, then come back to enter your details.</p>
          <Link to="/classes" className="btn btn-primary">
            Browse classes
          </Link>
        </div>
      )
    }

    const showSummary = submitted && errorList.length > 0

    return (
      <div className="two-column">
        <form onSubmit={handleSubmit} noValidate aria-label="Booking details">
          {conflicts.length > 0 && (
            <div className="notice notice-error" role="alert">
              <p>
                <strong>Error:</strong> {conflicts.length} class{conflicts.length === 1 ? '' : 'es'} in your plan can no
                longer be booked. <Link to="/plan">Go to your plan to fix this</Link>.
              </p>
            </div>
          )}

          {showSummary && (
            <div className="notice notice-error" role="alert">
              <p>
                <strong>Error:</strong> please fix {errorList.length} problem{errorList.length === 1 ? '' : 's'}:
              </p>
              <ul>
                {errorList.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="field">
            <label htmlFor="nickname">Booking nickname</label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              value={form.nickname}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={errorFor('nickname') !== ''}
              aria-describedby="nickname-hint nickname-error"
              autoComplete="off"
            />
            <p id="nickname-hint" className="hint">
              2 to {NICKNAME_MAX} letters or numbers. Please do not use your full name, phone or email.
            </p>
            <p id="nickname-error" className="field-error">
              {errorFor('nickname') !== '' && `Error: ${errorFor('nickname')}`}
            </p>
          </div>

          <ExperienceSelect id="experience-checkout" value={experience} onChange={onExperienceChange} />

          <div className="field">
            <label htmlFor="note">Note for the coach (optional)</label>
            <textarea
              id="note"
              name="note"
              rows="3"
              value={form.note}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={errorFor('note') !== ''}
              aria-describedby="note-hint note-error"
            />
            <p id="note-hint" className="hint">
              {form.note.length} / {NOTE_MAX} characters. No contact details or medical records.
            </p>
            <p id="note-error" className="field-error">
              {errorFor('note') !== '' && `Error: ${errorFor('note')}`}
            </p>
          </div>

          <div className="field">
            <label className="check-row" htmlFor="acknowledged">
              <input
                id="acknowledged"
                name="acknowledged"
                type="checkbox"
                checked={form.acknowledged}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={errorFor('acknowledged') !== ''}
                aria-describedby="acknowledged-error"
              />
              I am fit to exercise and will follow the coach&apos;s instructions.
            </label>
            <p id="acknowledged-error" className="field-error">
              {errorFor('acknowledged') !== '' && `Error: ${errorFor('acknowledged')}`}
            </p>
          </div>

          <div className="button-row">
            <button type="submit" className="btn btn-primary">
              Confirm simulated booking
            </button>
            <Link to="/plan" className="btn btn-secondary">
              Back to plan
            </Link>
          </div>
        </form>

        <SummaryBox totals={totals}>
          <ul className="summary-items">
            {plannedClasses.map((item) => (
              <li key={item.id}>
                {item.name} x {item.seats}
              </li>
            ))}
          </ul>
          <p className="hint">Simulated booking: no payment is taken.</p>
        </SummaryBox>
      </div>
    )
  }

  return (
    <div className="container page">
      <h1>Booking details</h1>
      <FeeNotice />
      <DataGate status={status} errorMessage={errorMessage} onRetry={onRetry}>
        {renderContent()}
      </DataGate>
    </div>
  )
}

export default CheckoutPage
