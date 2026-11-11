// Rule 2 (eligibility): a class needs the same or a higher experience level than the class level.
export const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

export function checkEligibility(experience, classLevel) {
  const userRank = LEVELS.indexOf(experience)
  const classRank = LEVELS.indexOf(classLevel)

  if (userRank === -1 || classRank === -1) {
    return { ok: false, message: 'Choose your experience level first.' }
  }

  if (userRank < classRank) {
    return {
      ok: false,
      message: `This is an ${classLevel} class. Your level is ${experience}.`,
    }
  }

  return { ok: true, message: '' }
}
