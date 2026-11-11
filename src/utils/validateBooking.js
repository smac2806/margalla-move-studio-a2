export const NOTE_MAX = 120
export const NICKNAME_MIN = 2
export const NICKNAME_MAX = 20

export const emptyForm = { nickname: '', note: '', acknowledged: false }

// Returns an object with one message per invalid field. An empty object means the form is valid.
export function validateBooking(form) {
  const errors = {}
  const nickname = form.nickname.trim()

  if (nickname === '') {
    errors.nickname = 'Enter a booking nickname.'
  } else if (nickname.length < NICKNAME_MIN) {
    errors.nickname = `Nickname needs at least ${NICKNAME_MIN} characters.`
  } else if (nickname.length > NICKNAME_MAX) {
    errors.nickname = `Nickname can have at most ${NICKNAME_MAX} characters (you typed ${nickname.length}).`
  } else if (!/^[A-Za-z0-9 ]+$/.test(nickname)) {
    errors.nickname = 'Use only letters, numbers and spaces in the nickname.'
  }

  if (form.note.length > NOTE_MAX) {
    errors.note = `Keep the note to ${NOTE_MAX} characters or fewer (you typed ${form.note.length}).`
  } else if (/\S+@\S+/.test(form.note) || /\d{7,}/.test(form.note)) {
    errors.note = 'Please remove email addresses and phone numbers from the note.'
  }

  if (!form.acknowledged) {
    errors.acknowledged = 'Confirm that you are fit to exercise before booking.'
  }

  return errors
}
