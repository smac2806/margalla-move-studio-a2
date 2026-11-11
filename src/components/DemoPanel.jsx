import { useState } from 'react'

// Demonstration controls for the edge cases (failed loading, changed availability, retired class).
function DemoPanel({
  classes,
  simulateFail,
  onFailChange,
  simulateEmpty,
  onEmptyChange,
  onReload,
  onSetAvailability,
  onAddRetired,
  onReset,
}) {
  const [classId, setClassId] = useState('c01')

  return (
    <details className="demo-panel">
      <summary>Demonstration controls (for testing edge cases)</summary>

      <div className="demo-grid">
        <div>
          <label className="check-row">
            <input type="checkbox" checked={simulateFail} onChange={(e) => onFailChange(e.target.checked)} />
            Simulate loading failure
          </label>
          <label className="check-row">
            <input type="checkbox" checked={simulateEmpty} onChange={(e) => onEmptyChange(e.target.checked)} />
            Simulate an empty timetable
          </label>
          <button type="button" className="btn btn-secondary" onClick={onReload}>
            Reload timetable
          </button>
        </div>

        <div>
          <label htmlFor="demo-class">Change availability of</label>
          <select id="demo-class" value={classId} onChange={(e) => setClassId(e.target.value)}>
            {classes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name.length > 40 ? item.name.slice(0, 40) + '...' : item.name}
              </option>
            ))}
          </select>
          <div className="button-row">
            <button type="button" className="btn btn-secondary" onClick={() => onSetAvailability(classId, 1)}>
              Leave 1 seat
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => onSetAvailability(classId, 0)}>
              Make full
            </button>
          </div>
        </div>

        <div>
          <button type="button" className="btn btn-secondary" onClick={onAddRetired}>
            Add a retired class to my plan
          </button>
          <button type="button" className="btn btn-secondary" onClick={onReset}>
            Reset all demo data
          </button>
        </div>
      </div>
    </details>
  )
}

export default DemoPanel
