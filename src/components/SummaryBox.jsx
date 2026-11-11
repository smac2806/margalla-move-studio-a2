import { BOOKING_FEE, FREE_FEE_FROM } from '../rules/pricingRule.js'
import { formatDuration, formatPrice } from '../utils/format.js'

function SummaryBox({ totals, children }) {
  return (
    <section className="summary" aria-labelledby="summary-heading">
      <h2 id="summary-heading">Summary</h2>
      <dl className="summary-list">
        <div>
          <dt>Classes</dt>
          <dd>{totals.classCount}</dd>
        </div>
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
          <dd>{totals.fee > 0 ? formatPrice(BOOKING_FEE) : 'Free'}</dd>
        </div>
        <div className="summary-total">
          <dt>Total</dt>
          <dd>{formatPrice(totals.total)}</dd>
        </div>
      </dl>
      {totals.amountToFreeFee > 0 && (
        <p className="hint">
          Add {formatPrice(totals.amountToFreeFee)} more to remove the booking fee (free from{' '}
          {formatPrice(FREE_FEE_FROM)}).
        </p>
      )}
      {children}
    </section>
  )
}

export default SummaryBox
