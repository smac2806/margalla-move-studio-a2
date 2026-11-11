import { LEVELS } from '../rules/eligibilityRule.js'

function ExperienceSelect({ id, value, onChange }) {
  return (
    <div className="field">
      <label htmlFor={id}>Your experience level</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {LEVELS.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
      <p className="hint">You can book classes at your level or below.</p>
    </div>
  )
}

export default ExperienceSelect
