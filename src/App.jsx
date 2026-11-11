import { useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { loadClasses, FAIL_KEY, EMPTY_KEY } from './data/loadClasses.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { checkSeatRequest } from './rules/seatRule.js'
import { checkEligibility } from './rules/eligibilityRule.js'
import { calculateTotals } from './rules/pricingRule.js'
import { findConflicts } from './rules/conflictCheck.js'
import { DEFAULT_FILTERS } from './utils/filterClasses.js'
import { emptyForm } from './utils/validateBooking.js'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import ClassesPage from './pages/ClassesPage.jsx'
import ClassDetailsPage from './pages/ClassDetailsPage.jsx'
import PlanPage from './pages/PlanPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import ConfirmationPage from './pages/ConfirmationPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function App() {
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [baseClasses, setBaseClasses] = useState([])
  const [reloadKey, setReloadKey] = useState(0)

  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  // everything below is saved in local storage and restored on the next visit
  const [plan, setPlan] = useLocalStorage('mm-plan', [])
  const [experience, setExperience] = useLocalStorage('mm-experience', 'Beginner')
  const [form, setForm] = useLocalStorage('mm-form', emptyForm)
  const [booked, setBooked] = useLocalStorage('mm-booked', {})
  const [lastBooking, setLastBooking] = useLocalStorage('mm-last-booking', null)

  // demonstration controls
  const [demoSeats, setDemoSeats] = useLocalStorage('mm-demo-seats', {})
  const [simulateFail, setSimulateFail] = useLocalStorage(FAIL_KEY, false)
  const [simulateEmpty, setSimulateEmpty] = useLocalStorage(EMPTY_KEY, false)

  const mainRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await loadClasses()
        if (!cancelled) {
          setBaseClasses(data)
          setStatus('ready')
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(error.message)
          setStatus('error')
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [reloadKey])

  // move focus to the page content after each navigation so keyboard users start at the top
  useEffect(() => {
    window.scrollTo(0, 0)
    mainRef.current.focus()
  }, [pathname])

  function reload() {
    setStatus('loading')
    setReloadKey((key) => key + 1)
  }

  // seats left = starting seats (or demo override) minus seats already booked in this browser
  const classes = baseClasses.map((item) => {
    const start = demoSeats[item.id] === undefined ? item.seatsLeft : demoSeats[item.id]
    const left = Math.max(0, start - (booked[item.id] || 0))
    return { ...item, seatsLeft: left }
  })

  const plannedClasses = []
  for (const entry of plan) {
    const found = classes.find((item) => item.id === entry.id)
    if (found) {
      plannedClasses.push({ ...found, seats: entry.seats })
    }
  }

  const totals = calculateTotals(plannedClasses)
  const conflicts = status === 'ready' ? findConflicts(plan, classes, experience) : []

  // returns { ok, message } so the calling component can show the reason
  function setSeats(id, seats) {
    const found = classes.find((item) => item.id === id)
    if (!found) {
      return { ok: false, message: 'This class is no longer offered.' }
    }

    const eligibility = checkEligibility(experience, found.level)
    if (!eligibility.ok) {
      return eligibility
    }

    const seatCheck = checkSeatRequest(seats, found.seatsLeft)
    if (!seatCheck.ok) {
      return seatCheck
    }

    setPlan((previous) => {
      const alreadyThere = previous.some((entry) => entry.id === id)
      if (!alreadyThere) {
        return [...previous, { id, seats }]
      }
      return previous.map((entry) => (entry.id === id ? { ...entry, seats } : entry))
    })
    return { ok: true, message: '' }
  }

  function addToPlan(id) {
    const existing = plan.find((entry) => entry.id === id)
    const seats = existing ? existing.seats + 1 : 1
    return setSeats(id, seats)
  }

  function removeFromPlan(id) {
    setPlan((previous) => previous.filter((entry) => entry.id !== id))
  }

  // the seat count in a conflict is already checked, so it is applied directly
  function fixConflict(conflict) {
    if (conflict.fixSeats === 0) {
      removeFromPlan(conflict.id)
      return
    }
    setPlan((previous) =>
      previous.map((entry) => (entry.id === conflict.id ? { ...entry, seats: conflict.fixSeats } : entry)),
    )
  }

  function changeForm(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }))
  }

  function confirmBooking() {
    const booking = {
      reference: 'MM-' + Date.now().toString(36).toUpperCase().slice(-6),
      nickname: form.nickname.trim(),
      note: form.note.trim(),
      experience,
      items: plannedClasses.map((item) => ({
        id: item.id,
        name: item.name,
        day: item.day,
        time: item.time,
        price: item.price,
        seats: item.seats,
      })),
      totals,
    }

    setBooked((previous) => {
      const next = { ...previous }
      for (const entry of plan) {
        next[entry.id] = (next[entry.id] || 0) + entry.seats
      }
      return next
    })
    setLastBooking(booking)
    setPlan([])
    setForm((previous) => ({ ...previous, note: '', acknowledged: false }))
  }

  function setDemoAvailability(id, seatsLeft) {
    setDemoSeats((previous) => ({ ...previous, [id]: seatsLeft + (booked[id] || 0) }))
  }

  function addRetiredClass() {
    setPlan((previous) => {
      if (previous.some((entry) => entry.id === 'c99')) {
        return previous
      }
      return [...previous, { id: 'c99', seats: 1 }]
    })
  }

  function resetDemo() {
    setPlan([])
    setBooked({})
    setDemoSeats({})
    setLastBooking(null)
    setForm(emptyForm)
    setFilters(DEFAULT_FILTERS)
    setExperience('Beginner')
    setSimulateFail(false)
    setSimulateEmpty(false)
    reload()
  }

  const dataProps = { status, errorMessage, onRetry: reload }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header seatCount={totals.seats} />

      <main id="main" ref={mainRef} tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage {...dataProps} classes={classes} />} />
          <Route
            path="/classes"
            element={
              <ClassesPage
                {...dataProps}
                classes={classes}
                filters={filters}
                onFiltersChange={setFilters}
                plan={plan}
                totals={totals}
                experience={experience}
                onExperienceChange={setExperience}
                onAdd={addToPlan}
              />
            }
          />
          <Route
            path="/classes/:id"
            element={
              <ClassDetailsPage
                {...dataProps}
                classes={classes}
                plan={plan}
                totals={totals}
                experience={experience}
                onExperienceChange={setExperience}
                onSetSeats={setSeats}
                onAdd={addToPlan}
                onRemove={removeFromPlan}
              />
            }
          />
          <Route
            path="/plan"
            element={
              <PlanPage
                {...dataProps}
                classes={classes}
                plan={plan}
                totals={totals}
                conflicts={conflicts}
                experience={experience}
                onExperienceChange={setExperience}
                onSetSeats={setSeats}
                onRemove={removeFromPlan}
                onFix={fixConflict}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <CheckoutPage
                {...dataProps}
                plan={plan}
                totals={totals}
                conflicts={conflicts}
                plannedClasses={plannedClasses}
                form={form}
                onFormChange={changeForm}
                experience={experience}
                onExperienceChange={setExperience}
                onConfirm={confirmBooking}
              />
            }
          />
          <Route path="/confirmation" element={<ConfirmationPage booking={lastBooking} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer
        classes={classes}
        simulateFail={simulateFail}
        onFailChange={setSimulateFail}
        simulateEmpty={simulateEmpty}
        onEmptyChange={setSimulateEmpty}
        onReload={reload}
        onSetAvailability={setDemoAvailability}
        onAddRetired={addRetiredClass}
        onReset={resetDemo}
      />
    </>
  )
}

export default App
