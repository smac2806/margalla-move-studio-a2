import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/format.js'

// Stays at the bottom of the screen so the running total is always visible while browsing.
function PlanBar({ totals }) {
  if (totals.classCount === 0) {
    return null
  }

  return (
    <div className="plan-bar">
      <div className="container plan-bar-row">
        <p>
          <strong>
            {totals.seats} seat{totals.seats === 1 ? '' : 's'}
          </strong>{' '}
          in {totals.classCount} class{totals.classCount === 1 ? '' : 'es'} - {formatPrice(totals.total)}
          {totals.fee > 0 && <span> (includes {formatPrice(totals.fee)} fee)</span>}
        </p>
        <Link to="/plan" className="btn btn-primary">
          Review plan
        </Link>
      </div>
    </div>
  )
}

export default PlanBar
