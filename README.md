# Margalla Move Studio

**Student:** Muhammad Ali - **Roll number:** 24I-2089 - **Section:** C
**Course:** CS4032 Web Programming, Assignment 02 (Fall 2026)

## Description

A React website for a fictional fitness studio in F-7 Markaz, Islamabad, for university students and young professionals.
Customers browse 12 classes, search and filter them, open a details page, build a booking plan, fill in a short form,
check a calculated summary and reach a confirmation. All bookings are **simulated**: data is local, no payment is taken
and nothing is sent anywhere.

- GitHub: (add public repository link)
- Deployment: (add public link)
- Final commit: (add hash)

## Commands

```
npm install        install dependencies
npm run dev        start the development server
npm run build      create the production build in dist/
npm run lint       check the code with ESLint
npm test           run the business-rule tests (node --test)
```

Node.js 20 or newer is needed.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home, student-friendly picks, how booking works |
| `/classes` | Timetable with search, filters and sorting |
| `/classes/:id` | Class details and booking controls (invalid IDs show a message) |
| `/plan` | Selected classes, seat controls, summary, conflict fixes |
| `/checkout` | Controlled booking form with validation |
| `/confirmation` | Final summary of the simulated booking |

## Operating rules

1. **Seats (availability):** 1 to 4 seats per class per booking, and never more than the seats left. Shown beside the seat
   control and in the class conditions. Boundary: 4 seats are accepted, 5 shows "You can book at most 4 seats per class."
2. **Experience level (eligibility):** a class needs the same or a higher experience level than the class level. Shown on
   the card, the details page and the plan. Boundary: an Intermediate member can book an Intermediate class but not an
   Advanced one.
3. **Booking fee (pricing):** Rs 200 is added when the subtotal is under Rs 5,000. Shown in the notice on every page and
   in the summary. Boundary: a subtotal of exactly Rs 5,000 has no fee.

The constants are in `src/rules/`.

## Reproducing edge cases

Open "Demonstration controls" at the bottom of any page.

- **Loading failure:** tick "Simulate loading failure", press "Reload timetable", then untick it and press "Try again".
- **Empty timetable:** tick "Simulate an empty timetable" and reload.
- **Changed availability:** add a class (for example "Sunrise Vinyasa Flow") with 3 seats, choose it in the control and press
  "Leave 1 seat". Open `/plan` and use "Reduce to 1 seat".
- **Retired class in a saved plan:** press "Add a retired class to my plan" and open `/plan`.
- **Level change:** add an Intermediate class, then set your level back to Beginner on `/plan`; the conflict is explained.
- **Invalid URL:** open `/classes/zzz` or `/nothing-here`.
- **Missing image and long text:** the last class in the timetable has no image and a very long name.
- **Reset:** "Reset all demo data".

## Simulated operations and limitations

- Bookings, payments and seat counts are simulated and stored only in this browser's local storage.
- Seats booked in the app reduce the seats shown, but only for this browser.
- The experience level is self-declared.
- Filters reset on a full page reload (they are kept while navigating).
- Hosting needs a single-page-app fallback: `public/_redirects` (Netlify) and `vercel.json` (Vercel) are included.

## Testing

`npm test` runs `tests/seatRule.test.js` (the seat rule used by the app) and `tests/otherRules.test.js`.
The seat rule tests cover a valid quantity (2), exactly the limit (4) and a broken rule (5), plus 0, too few seats left and a full class.

## Concept map

| Concept | File | Component / function |
| --- | --- | --- |
| Components, props, exports | `src/components/*.jsx` | `ClassCard`, `SummaryBox`, `SeatStepper` |
| Routing, URL params | `src/App.jsx`, `src/pages/ClassDetailsPage.jsx` | `Routes`, `useParams` |
| Shared state, callback props | `src/App.jsx` | `setSeats`, `removeFromPlan`, `confirmBooking` |
| Functional updates | `src/App.jsx` | `setSeats`, `setBooked` in `confirmBooking` |
| Immutable object/array updates | `src/App.jsx` | `changeForm`, `fixConflict` |
| Controlled inputs | `src/components/ClassFilters.jsx`, `src/pages/CheckoutPage.jsx` | `handleChange` |
| Validation | `src/utils/validateBooking.js` | `validateBooking` |
| Business rules | `src/rules/*.js` | `checkSeatRequest`, `checkEligibility`, `calculateTotals` |
| Restored plan checks | `src/rules/conflictCheck.js` | `findConflicts` |
| Derived values | `src/App.jsx`, `src/rules/pricingRule.js` | `classes`, `totals` |
| Search, filter, sort | `src/utils/filterClasses.js` | `filterAndSort` |
| Effects and cleanup | `src/App.jsx` | data loading effect (`cancelled` flag) |
| Async code | `src/data/loadClasses.js`, `src/App.jsx` | `loadClasses`, `load` (async/await, try/catch) |
| Local storage | `src/hooks/useLocalStorage.js` | `useLocalStorage` |
| Conditional rendering | `src/components/DataGate.jsx`, `src/pages/ClassesPage.jsx` | loading, error, empty states |
| Lists and keys | `src/pages/ClassesPage.jsx` | `results.map` with `item.id` keys |
