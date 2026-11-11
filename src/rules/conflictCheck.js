import { checkSeatRequest, maxSeatsFor } from './seatRule.js'
import { checkEligibility } from './eligibilityRule.js'

// Compares the saved plan with the current data and rules.
// Each problem comes back with the id, a message and (if possible) a seat count that would fix it.
export function findConflicts(plan, classes, experience) {
  const conflicts = []

  for (const item of plan) {
    const found = classes.find((c) => c.id === item.id)

    if (!found) {
      conflicts.push({ id: item.id, message: 'This class is no longer offered.', fixSeats: 0 })
      continue
    }

    const eligibility = checkEligibility(experience, found.level)
    if (!eligibility.ok) {
      conflicts.push({ id: item.id, message: eligibility.message, fixSeats: 0 })
      continue
    }

    const seatCheck = checkSeatRequest(item.seats, found.seatsLeft)
    if (!seatCheck.ok) {
      conflicts.push({
        id: item.id,
        message: seatCheck.message,
        fixSeats: maxSeatsFor(found.seatsLeft),
      })
    }
  }

  return conflicts
}
