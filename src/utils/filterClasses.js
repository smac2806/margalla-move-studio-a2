const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const DEFAULT_FILTERS = { search: '', type: 'All', level: 'All', sort: 'day' }

// Search looks at name, coach, type and description; filters and sort work on the search result.
export function filterAndSort(classes, filters) {
  const text = filters.search.trim().toLowerCase()

  const matches = classes.filter((item) => {
    const searchable = `${item.name} ${item.coach} ${item.type} ${item.description}`.toLowerCase()
    if (text !== '' && !searchable.includes(text)) {
      return false
    }
    if (filters.type !== 'All' && item.type !== filters.type) {
      return false
    }
    if (filters.level !== 'All' && item.level !== filters.level) {
      return false
    }
    return true
  })

  const sorted = [...matches]

  if (filters.sort === 'price-low') {
    sorted.sort((a, b) => a.price - b.price)
  } else if (filters.sort === 'price-high') {
    sorted.sort((a, b) => b.price - a.price)
  } else if (filters.sort === 'seats') {
    sorted.sort((a, b) => b.seatsLeft - a.seatsLeft)
  } else {
    sorted.sort((a, b) => {
      const dayDiff = DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day)
      return dayDiff !== 0 ? dayDiff : a.time.localeCompare(b.time)
    })
  }

  return sorted
}

export function hasActiveFilters(filters) {
  return (
    filters.search.trim() !== '' ||
    filters.type !== 'All' ||
    filters.level !== 'All'
  )
}
