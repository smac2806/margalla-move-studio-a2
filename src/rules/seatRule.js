// Rule 1 (availability): 1 to 4 seats per class in one booking, and never more than the seats left.
export const MIN_SEATS = 1
export const MAX_SEATS = 4

export function checkSeatRequest(requested, seatsLeft) {
  if (!Number.isInteger(requested)) {
    return { ok: false, code: 'not-a-number', message: 'Seats must be a whole number.' }
  }

  if (seatsLeft <= 0) {
    return { ok: false, code: 'sold-out', message: 'This class is full.' }
  }

  if (requested < MIN_SEATS) {
    return { ok: false, code: 'too-few', message: `Book at least ${MIN_SEATS} seat.` }
  }

  if (requested > MAX_SEATS) {
    return {
      ok: false,
      code: 'over-limit',
      message: `You can book at most ${MAX_SEATS} seats per class.`,
    }
  }

  if (requested > seatsLeft) {
    return {
      ok: false,
      code: 'not-enough-seats',
      message: `Only ${seatsLeft} seat${seatsLeft === 1 ? '' : 's'} left in this class.`,
    }
  }

  return { ok: true, code: 'ok', message: '' }
}

// Largest number of seats that can be booked right now (0 means none).
export function maxSeatsFor(seatsLeft) {
  return Math.max(0, Math.min(MAX_SEATS, seatsLeft))
}
