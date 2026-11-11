import { LEVELS } from '../rules/eligibilityRule.js'

const TYPES = ['Yoga', 'Strength', 'Cardio', 'Dance', 'Mobility']

function ClassFilters({ filters, onChange, onClear, resultCount }) {
  function handleChange(event) {
    onChange({ ...filters, [event.target.name]: event.target.value })
  }

  return (
    <form className="filters" role="search" aria-label="Search and filter classes" onSubmit={(e) => e.preventDefault()}>
      <div className="field field-wide">
        <label htmlFor="search">Search classes, coaches or types</label>
        <input id="search" name="search" type="search" value={filters.search} onChange={handleChange} />
      </div>

      <div className="field">
        <label htmlFor="type">Type</label>
        <select id="type" name="type" value={filters.type} onChange={handleChange}>
          <option value="All">All types</option>
          {TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="level">Level</label>
        <select id="level" name="level" value={filters.level} onChange={handleChange}>
          <option value="All">All levels</option>
          {LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="sort">Sort by</label>
        <select id="sort" name="sort" value={filters.sort} onChange={handleChange}>
          <option value="day">Day and time</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
          <option value="seats">Most seats left</option>
        </select>
      </div>

      <div className="filters-footer">
        <p role="status">
          {resultCount} class{resultCount === 1 ? '' : 'es'} shown
        </p>
        <button type="button" className="btn btn-secondary" onClick={onClear}>
          Clear filters
        </button>
      </div>
    </form>
  )
}

export default ClassFilters
