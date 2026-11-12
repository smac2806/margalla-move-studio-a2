# Frontend Decisions

Muhammad Ali (24I-2089) - CS4032 Web Programming, Assignment 02 - Margalla Move Studio

Reference website: CorePower Yoga class schedule, https://www.corepoweryoga.com/yoga-schedules (visited on 12 November 2026 without signing in, using the Central Phoenix studio schedule). The three problems below were observed on that site. Screenshots and steps are in the report.

## Decision 1 - Show comparison details on every class card (information hierarchy and mobile layout)

| Field | Content |
| --- | --- |
| Problem | Class rows on the reference schedule show only time, a code-style name, studio, teacher and a BOOK button. Price, intensity, class length and spots left are missing, even though the filter panel offers Intensity and Class Length. |
| Decision | Each card shows the day and time, duration, coach, type, level, seats left (as text with a colour) and the price per seat. The card is a single column on a phone and a grid on desktop. |
| Alternative | Keep cards short with name and time only, and put the details on the details page. |
| Reason | Customers choose between classes using price, level, length and availability, so they should compare them without opening each class. |
| Tradeoff | Taller cards, so fewer classes fit on one phone screen. |
| Code location | `src/components/ClassCard.jsx`, `src/components/SeatsBadge.jsx`, `src/utils/format.js`, `src/pages/ClassesPage.jsx` |
| Evidence | `docs/screenshots/08-listing-cards-desktop.png`. Steps: open `/classes`; every card shows duration, level, seats left and price without opening it. |

## Decision 2 - Explain prices and restrictions before the booking action (interaction)

| Field | Content |
| --- | --- |
| Problem | The reference schedule and class page show no price or booking condition. Clicking BOOK as a visitor opens "Sign in to book classes. You need to be a member or have classes in your account to book this class." The condition appears only after the click. |
| Decision | A "Before you book" notice (price per seat, Rs 200 fee below Rs 5,000, 4 seats per class) appears on every booking page. The details page lists the conditions above the booking button. A blocked action is replaced by its reason ("Unavailable: this class is full", "needs Advanced level"). The seat limit sits beside the seat control, and a bottom bar keeps the running total and fee visible. |
| Alternative | Let the customer press Add and show an error after the click. |
| Reason | The customer learns about the fee, the level and the seat limit while choosing, so they do not spend time on a class they cannot book. |
| Tradeoff | More text on each page and a fixed bar that uses height on small phones. |
| Code location | `src/components/FeeNotice.jsx`, `src/components/ClassCard.jsx` (action area), `src/pages/ClassDetailsPage.jsx` (Conditions section), `src/components/SeatStepper.jsx`, `src/components/PlanBar.jsx`, `src/components/SummaryBox.jsx`. Values come from `src/rules/`. |
| Evidence | `docs/screenshots/01-classes-mobile-fee-notice.png`, `docs/screenshots/03-details-eligibility-mobile.png`. Steps: open `/classes` at 390 px and see the notice; open `/classes/c03` as a Beginner and see the reason in place of the button. |

## Decision 3 - Empty results explain the cause and offer a next step (state behaviour)

| Field | Content |
| --- | --- |
| Problem | With a 45 minute filter active, the reference schedule shows "0 classes" for empty days with the text "Check back soon as more classes are added to the schedule!". The message blames the schedule instead of the filter and offers no action to change it. |
| Decision | The page tells an empty timetable apart from a search with no matches. The no-match message names the search word and offers "Clear filters and show all 12 classes". Filters are kept when the customer opens a class and returns. Selected classes hidden by a filter are named in a notice. A full class lists other classes of the same type that still have seats. |
| Alternative | Show a generic "no classes" line for each empty day. |
| Reason | The customer needs to know that their own filters caused the empty result and how to fix it in one step. |
| Tradeoff | More states to build and test, and the filters live in app state so they reset on a full page reload. |
| Code location | `src/pages/ClassesPage.jsx` (`listing`, `hiddenSelected`), `src/pages/ClassDetailsPage.jsx` (`alternatives`), `src/App.jsx` (`filters` state), `src/utils/filterClasses.js` |
| Evidence | `docs/screenshots/09-no-match-mobile.png`, `docs/screenshots/02-hidden-selection-notice-mobile.png`. Steps: search "pilates reformer", see the cause and the Clear filters button; add a class and filter to Cardio to see the hidden selection notice. |
