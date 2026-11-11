import { Link } from 'react-router-dom'
import { formatDuration, formatPrice } from '../utils/format.js'

function ConfirmationPage({ booking }) {
  if (!booking) {
    return (
      <div className="container page">
        <h1>No booking to show</h1>
        <p>You have not confirmed a booking yet.</p>
        <Link to="/classes" className="btn btn-primary">
          Browse classes
        </Link>
      </div>
    )
  }

  const { totals } = booking

  return (
    <div className="container page">
      <div className="success-box" role="status">
        <h1>Booking confirmed (simulated)</h1>
        <p>
          Thank you, {booking.nickname}. Your reference is <strong>{booking.reference}</strong>.
        </p>
        <p>This was a demo. No payment was taken and no real seats were reserved.</p>
      </div>

      <section aria-labelledby="booked-heading">
        <h2 id="booked-heading">Your classes</h2>
        <ul className="plan-list">
          {booking.items.map((item) => (
            <li key={item.id} className="plan-row">
              <div>
                <h3>{item.name}</h3>
                <p className="meta">
                  {item.day} {item.time}
                </p>
              </div>
              <p>
                {item.seats} seat{item.seats === 1 ? '' : 's'} x {formatPrice(item.price)}
              </p>
              <p className="row-price">{formatPrice(item.seats * item.price)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="summary" aria-labelledby="final-heading">
        <h2 id="final-heading">Final summary</h2>
        <dl className="summary-list">
          <div>
            <dt>Seats</dt>
            <dd>{totals.seats}</dd>
          </div>
          <div>
            <dt>Total class time</dt>
            <dd>{formatDuration(totals.minutes)}</dd>
          </div>
          <div>
            <dt>Subtotal</dt>
            <dd>{formatPrice(totals.subtotal)}</dd>
          </div>
          <div>
            <dt>Booking fee</dt>
            <dd>{totals.fee > 0 ? formatPrice(totals.fee) : 'Free'}</dd>
          </div>
          <div className="summary-total">
            <dt>Total</dt>
            <dd>{formatPrice(totals.total)}</dd>
          </div>
        </dl>
        {booking.note !== '' && <p>Your note: {booking.note}</p>}
      </section>

      <div className="button-row">
        <Link to="/classes" className="btn btn-primary">
          Book more classes
        </Link>
        <Link to="/" className="btn btn-secondary">
          Back to home
        </Link>
      </div>
    </div>
  )
}

export default ConfirmationPage
