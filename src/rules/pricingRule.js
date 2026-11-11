// Rule 3 (pricing): a Rs 200 booking fee is added unless the subtotal is Rs 5,000 or more.
export const BOOKING_FEE = 200
export const FREE_FEE_FROM = 5000

export function calculateTotals(plannedClasses) {
  let subtotal = 0
  let seats = 0
  let minutes = 0

  for (const item of plannedClasses) {
    subtotal += item.price * item.seats
    seats += item.seats
    minutes += item.durationMin
  }

  const feeApplies = subtotal > 0 && subtotal < FREE_FEE_FROM
  const fee = feeApplies ? BOOKING_FEE : 0

  return {
    classCount: plannedClasses.length,
    seats,
    minutes,
    subtotal,
    fee,
    total: subtotal + fee,
    amountToFreeFee: feeApplies ? FREE_FEE_FROM - subtotal : 0,
  }
}
