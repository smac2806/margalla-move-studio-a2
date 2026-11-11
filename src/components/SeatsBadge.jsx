import { seatsText } from '../utils/format.js'

// The colour is always paired with text, so the status is not shown by colour alone.
function SeatsBadge({ seatsLeft }) {
  let className = 'badge badge-ok'
  if (seatsLeft <= 0) {
    className = 'badge badge-full'
  } else if (seatsLeft <= 3) {
    className = 'badge badge-low'
  }

  return <span className={className}>{seatsText(seatsLeft)}</span>
}

export default SeatsBadge
