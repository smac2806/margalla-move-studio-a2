import ClassCard from '../components/ClassCard.jsx'
import ClassFilters from '../components/ClassFilters.jsx'
import DataGate from '../components/DataGate.jsx'
import ExperienceSelect from '../components/ExperienceSelect.jsx'
import FeeNotice from '../components/FeeNotice.jsx'
import PlanBar from '../components/PlanBar.jsx'
import { DEFAULT_FILTERS, filterAndSort, hasActiveFilters } from '../utils/filterClasses.js'

function ClassesPage({
  status,
  errorMessage,
  onRetry,
  classes,
  filters,
  onFiltersChange,
  plan,
  totals,
  experience,
  onExperienceChange,
  onAdd,
}) {
  const results = filterAndSort(classes, filters)

  // classes already in the plan that the current filters are hiding
  const hiddenSelected = []
  for (const entry of plan) {
    const found = classes.find((item) => item.id === entry.id)
    const visible = results.some((item) => item.id === entry.id)
    if (found && !visible) {
      hiddenSelected.push({ name: found.name, seats: entry.seats })
    }
  }

  function clearFilters() {
    onFiltersChange(DEFAULT_FILTERS)
  }

  function seatsInPlan(id) {
    const entry = plan.find((item) => item.id === id)
    return entry ? entry.seats : 0
  }

  let listing
  if (classes.length === 0) {
    listing = (
      <div className="status-box">
        <h2>The timetable is empty</h2>
        <p>No classes have been published yet. New classes are added every Sunday, so please check back soon.</p>
      </div>
    )
  } else if (results.length === 0) {
    listing = (
      <div className="status-box">
        <h2>No classes match your search</h2>
        <p>
          {filters.search.trim() !== '' && <>Nothing matches &quot;{filters.search.trim()}&quot; with these filters. </>}
          Try a shorter search word, or set the type and level back to &quot;All&quot;.
        </p>
        <button type="button" className="btn btn-primary" onClick={clearFilters}>
          Clear filters and show all {classes.length} classes
        </button>
      </div>
    )
  } else {
    listing = (
      <ul className="card-grid">
        {results.map((item) => (
          <li key={item.id}>
            <ClassCard item={item} planSeats={seatsInPlan(item.id)} experience={experience} onAdd={onAdd} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="container page">
      <h1>Class timetable</h1>
      <FeeNotice />

      <DataGate status={status} errorMessage={errorMessage} onRetry={onRetry}>
        <ExperienceSelect id="experience-list" value={experience} onChange={onExperienceChange} />
        <ClassFilters
          filters={filters}
          onChange={onFiltersChange}
          onClear={clearFilters}
          resultCount={results.length}
        />

        {hiddenSelected.length > 0 && (
          <div className="notice" role="status">
            <p>
              <strong>{hiddenSelected.length} class{hiddenSelected.length === 1 ? '' : 'es'} in your plan
              {hiddenSelected.length === 1 ? ' is' : ' are'} hidden by the current filters:</strong>{' '}
              {hiddenSelected.map((item) => `${item.name} (${item.seats})`).join(', ')}. They are still in your plan.
            </p>
            {hasActiveFilters(filters) && (
              <button type="button" className="btn btn-secondary" onClick={clearFilters}>
                Show all classes
              </button>
            )}
          </div>
        )}

        {listing}
      </DataGate>

      <PlanBar totals={totals} />
    </div>
  )
}

export default ClassesPage
