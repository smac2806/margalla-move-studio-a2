import { BOOKING_FEE, FREE_FEE_FROM } from '../rules/pricingRule.js'
import { MAX_SEATS } from '../rules/seatRule.js'
import { formatPrice } from '../utils/format.js'

// Shown before booking starts, so charges and limits are never a surprise at the end.
function FeeNotice() {
  return (
    <aside className="fee-notice" aria-label="Prices and booking limits">
      <p>
        <strong>Before you book:</strong> prices are per seat and include mat hire. A {formatPrice(BOOKING_FEE)}{' '}
        booking fee is added when your total is under {formatPrice(FREE_FEE_FROM)}. You can book up to {MAX_SEATS} seats
        per class.
      </p>
    </aside>
  )
}

export default FeeNotice
