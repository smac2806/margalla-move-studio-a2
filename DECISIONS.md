# Frontend Decisions

Muhammad Ali (24I-2089) - CS4032 Web Programming, Assignment 02 - Margalla Move Studio

The three problems below are the ones investigated on the reference fitness-booking website (URLs, screenshots and observations are in the report).

## Decision 1 - Show charges and restrictions before booking (information hierarchy and mobile layout)

| Field | Content |
| --- | --- |
| Problem | Fees and booking restrictions only appear late, near checkout, so customers meet unexpected conditions. |
| Decision | A "Before you book" notice (price per seat, Rs 200 booking fee below Rs 5,000, 4 seats per class) is shown on the home, timetable, details, plan and checkout pages. Each card shows the price, level and seats left. The details page has a "Conditions" list placed before the booking button. A bottom bar keeps the running total (with fee) visible on mobile. |
| Alternative | Show the fee only inside the summary and explain it with a tooltip. |
| Reason | Customers compare classes using price, level and seats left, so these must be visible before they choose. The fee affects whether they add one more class, so it must be visible while choosing. |
| Tradeoff | More text on every page and a fixed bar that uses screen height on small phones. |
| Code location | `src/components/FeeNotice.jsx`, `src/components/PlanBar.jsx`, `src/components/ClassCard.jsx`, `src/pages/ClassDetailsPage.jsx` (Conditions section). Values come from `src/rules/pricingRule.js` and `src/rules/seatRule.js`. |
| Evidence | `docs/screenshots/01-classes-mobile-fee-notice.png`, `docs/screenshots/03-details-eligibility-mobile.png`. Steps: open `/classes` at 390 px, notice and card details are visible without scrolling into checkout; add a class and the bottom bar shows the total including the fee. |

## Decision 2 - Keep filters and selections when the customer navigates (interaction and state behaviour)

| Field | Content |
| --- | --- |
| Problem | Going to a details page and coming back resets the search and filters, and selected items disappear from view when filters change. |
| Decision | Filters live in `App` state, so they survive route changes and Back/Forward. The plan is saved in local storage. When filters hide classes that are already in the plan, a notice names them and offers "Show all classes". |
| Alternative | Store the filters in the URL query string (`/classes?type=Yoga`), which also makes results shareable. |
| Reason | Customers compare classes across days and types. They should not repeat the search after opening a class, and they must not think a hidden selection was lost. |
| Tradeoff | Filters are not in the URL so they cannot be shared and reset on a full page reload. The notice adds one more element to the page. |
| Code location | `src/App.jsx` (`filters` state, `plan` with `useLocalStorage`), `src/pages/ClassesPage.jsx` (`hiddenSelected`), `src/hooks/useLocalStorage.js`. |
| Evidence | `docs/screenshots/02-hidden-selection-notice-mobile.png`. Steps: add "Sunrise Vinyasa Flow", set Type to Cardio; the notice lists the hidden class. Search "zumba", open the class, press Back; the search is still "zumba". |

## Decision 3 - Specific form errors that keep valid input (interaction)

| Field | Content |
| --- | --- |
| Problem | Form errors are vague and a failed submit can clear what the customer already typed. |
| Decision | Each field has its own message that says what is wrong and how to fix it (for example the character count). Errors show after the field is visited or after a submit attempt. A summary lists all errors. Valid values stay in the form, and the form draft is saved in local storage so it also survives navigating away. |
| Alternative | Show only a single "Please fix the form" message at the top. |
| Reason | The customer fixes only the field that is wrong and does not retype the rest, which helps them finish the booking. |
| Tradeoff | More code for touched state and message wording, and a saved draft stays in the browser until it is reset. |
| Code location | `src/utils/validateBooking.js` (`validateBooking`), `src/pages/CheckoutPage.jsx` (`errorFor`, `handleSubmit`), `src/App.jsx` (`form` state, `changeForm`). |
| Evidence | `docs/screenshots/04-checkout-errors-mobile.png`. Steps: open `/checkout`, press "Confirm simulated booking" with an empty form, then type "A" as nickname; the message says at least 2 characters and the other fields keep their values. |
