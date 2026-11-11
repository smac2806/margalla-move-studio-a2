export function formatPrice(amount) {
  return 'Rs ' + amount.toLocaleString('en-US')
}

export function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60

  if (hours === 0) {
    return `${rest} min`
  }
  if (rest === 0) {
    return `${hours} h`
  }
  return `${hours} h ${rest} min`
}

export function seatsText(seatsLeft) {
  if (seatsLeft <= 0) {
    return 'Full'
  }
  if (seatsLeft === 1) {
    return '1 seat left'
  }
  return `${seatsLeft} seats left`
}
