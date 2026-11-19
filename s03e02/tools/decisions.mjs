// Triage decisions, one entry per tracker issue. Backlog keys keep their SCHED key; new issues use the request id.
// mark: 'agent-ready' | 'needs-human' (open only). Bodies follow README "Issue bodies".

const ar = ({ intent, acceptance, boundaries, allowed }) => [
  '## Intent', intent, '',
  '## Acceptance', ...acceptance.map(a => `- ${a}`), '',
  '## Boundaries', ...boundaries.map(b => `- ${b}`), '',
  `Allowed by ${allowed}.`,
].join('\n');

const nh = ({ question, options, recommendation, why }) => [
  '## Question', question, '',
  '## Options', ...options.map((o, i) => `${i + 1}. ${o}`), '',
  '## Recommendation', recommendation, '',
  '## Why', why,
].join('\n');

const NO_FEED_ALLDAY = 'Must not change how all-day bookings go out in the calendar feed: midnight to midnight, as a client relies on it (IN-9975, AUT-2).';

export const issues = [
  // ---------- backlog, open ----------
  { key: 'SCHED-4412', mark: 'agent-ready', body: ar({
    intent: 'Move every hard-coded colour in components to the `--color-*` design tokens (DES-2). Nothing visible changes.',
    acceptance: [
      'Given the component sources, when they are searched for raw hex, rgb() or named colours, then there are none; every colour is a `var(--color-*)` token.',
      'Given any page before and after the change, when it is rendered, then it looks the same (screenshot diff shows no change).',
      'Given a colour that has no token yet, when it is moved, then it is not given a new value: it maps to the nearest existing palette token, and the page does not change colour.',
    ],
    boundaries: ['Must not add new colours or change any colour value in the tokens file.', 'Must not change layout, type or copy.'],
    allowed: 'AUT-1 (bringing code in line with a rule in specs/ when nothing visible changes; DES-2)',
  }) },
  { key: 'SCHED-4418', mark: 'agent-ready', sources: ['IN-3326'], body: ar({
    intent: 'Week view starts on the first day of the week of the account locale, not always on Sunday.',
    acceptance: [
      'Given an account with locale de-DE, like the Berlin studio in IN-3326, when week view opens, then the week starts on Monday.',
      'Given an account with locale en-US, when week view opens, then the week still starts on Sunday.',
      'Given a booking on any day, when the start day changes, then the booking is not moved and keeps its UTC time (PRD-2).',
    ],
    boundaries: ['Must not change stored bookings, the calendar feed or exports.', 'Uses the account locale only; no new setting.'],
    allowed: 'AUT-1 (bug fixes and small features inside the specs, with a test that shows the change)',
  }) },
  { key: 'SCHED-4431', mark: 'agent-ready', body: ar({
    intent: 'The booking page shows how many seats are left on group slots.',
    acceptance: [
      'Given a slot with 8 seats and 5 bookings, when the booking page shows it, then it says 3 seats left.',
      'Given a slot with one seat, when the booking page shows it, then no seat count is shown.',
      'Given a full slot, when the booking page shows it, then it is not offered as bookable.',
    ],
    boundaries: ['Adds a field; must not remove or rename anything on the booking page.', 'Must not change how seats are counted or stored.'],
    allowed: 'AUT-1 (new columns, filters or fields that add to what is there and take nothing away)',
  }) },
  { key: 'SCHED-4446', mark: 'agent-ready', body: ar({
    intent: 'The CSV export gets a UTC offset column next to the start and end times, so tools that read it know the zone (ADR-0001).',
    acceptance: [
      'Given a booking at 09:00 Europe/Warsaw in winter, when it is exported, then the new offset column says +01:00.',
      'Given an existing export, when it is compared with the new one, then every old column is still there, with the same name, order and values (PRD-3).',
      'Given a client tool that reads the start and end columns, when it reads the new export, then those columns are not changed.',
    ],
    boundaries: ['Must not change or remove existing columns (PRD-3).', 'Must not change the date format of existing columns (see IN-1210, a person decides that).'],
    allowed: 'AUT-1 (new columns that add to what is there and take nothing away; bringing code in line with ADR-0001)',
  }) },
  { key: 'SCHED-4452', mark: 'agent-ready', body: ar({
    intent: 'Calendar sync pushes each booking to Outlook once, with a stable id, so Outlook shows it once (ADR-0002).',
    acceptance: [
      'Given a booking synced to an Outlook calendar, when sync runs twice, then Outlook shows one event.',
      'Given a booking that changed, when sync runs, then the existing event is updated, not a second one created.',
      'Given an event edited in Outlook, when sync runs, then sched-prod does not read it back (ADR-0002, sync stays one-way).',
    ],
    boundaries: ['Must not add reading from external calendars (ADR-0002).', NO_FEED_ALLDAY],
    allowed: 'AUT-1 (bug fixes inside the specs, with a test that shows the change)',
  }) },
  { key: 'SCHED-4463', mark: 'agent-ready', body: ar({
    intent: 'Move every hard-coded font size in components to the type scale in the tokens (DES-1). Nothing visible changes.',
    acceptance: [
      'Given the component sources, when they are searched for font sizes, then every one is a type-scale token.',
      'Given any page before and after the change, when it is rendered, then it looks the same.',
      'Given a size that is not on the scale, when it is moved, then no new step is added to the scale; it maps to the nearest existing step.',
    ],
    boundaries: ['Must not add steps to the type scale or change its values.', 'Must not change colours, spacing or copy.'],
    allowed: 'AUT-1 (bringing code in line with a rule in specs/ when nothing visible changes; DES-1)',
  }) },
  { key: 'SCHED-4465', mark: 'agent-ready', body: ar({
    intent: 'API replies with status 429 carry a Retry-After header that says when to try again.',
    acceptance: [
      'Given a caller over its rate limit, when the API answers 429, then the reply has Retry-After in seconds until the limit resets.',
      'Given a caller under its limit, when it calls the API, then the reply does not carry a Retry-After header.',
      'Given the change, when limits are compared before and after, then no limit value has changed.',
    ],
    boundaries: ['Must not change rate-limit values, plans or anything about pricing (AUT-2).', 'Adds a header only; must not change reply bodies.'],
    allowed: 'AUT-1 (small features inside the specs that add to what is there and take nothing away)',
  }) },
  { key: 'SCHED-4468', mark: 'agent-ready', body: ar({
    intent: 'Move every hard-coded margin and padding in components to the 4 px spacing scale in the tokens (DES-3). Nothing visible changes.',
    acceptance: [
      'Given the component sources, when they are searched for margin and padding values, then every one is a spacing token.',
      'Given any page before and after the change, when it is rendered, then it looks the same.',
      'Given a value that is not on the 4 px scale, when it is moved, then no new step is added; it maps to the nearest step.',
    ],
    boundaries: ['Must not add steps to the spacing scale or change its values.', 'Must not change colours, type or copy.'],
    allowed: 'AUT-1 (bringing code in line with a rule in specs/ when nothing visible changes; DES-3)',
  }) },
  { key: 'SCHED-4486', mark: 'needs-human', body: nh({
    question: 'Finance asks to keep audit log entries for 90 days and then delete them. Should stored audit entries be deleted, and from when?',
    options: [
      'Delete every entry older than 90 days, the ones already stored included, and keep deleting daily.',
      'Apply the 90 days to new entries only; entries already stored stay until someone decides on them.',
      'Do not delete: archive entries older than 90 days out of the live log.',
    ],
    recommendation: 'Option 2, after a person checks the client terms for how long audit data must be kept.',
    why: 'Because deleting data that is already stored needs a human (AUT-2), and an audit log may be part of what the client terms promise (AUT-2).',
  }) },
  { key: 'SCHED-4494', mark: 'agent-ready', body: ar({
    intent: 'In week view, a booking that crosses midnight shows on both days it covers.',
    acceptance: [
      'Given a booking from 23:00 to 01:00, when week view shows that week, then it shows on the first day until midnight and on the second day from midnight.',
      'Given an all-day booking stored as midnight to midnight, when week view shows it, then it shows on its one day only, not on the next day too.',
      'Given the calendar feed, when it is read after the change, then all-day bookings still go out as midnight to midnight.',
    ],
    boundaries: [NO_FEED_ALLDAY, 'Must not split or change stored bookings (PRD-1); display only.'],
    allowed: 'AUT-1 (bug fixes inside the specs, with a test that shows the change)',
  }) },
  { key: 'SCHED-4498', mark: 'agent-ready', sources: ['IN-5369'], body: ar({
    intent: 'The cancel link in the booking confirmation email opens the booking without a login, as the cancel link in the reminder email already does.',
    acceptance: [
      'Given a person who booked without an account, when they open the cancel link in the confirmation email, then they see their booking and can cancel it.',
      'Given the reminder email, when its cancel link is opened, then it still works as before.',
      'Given a cancel link for one booking, when it is opened, then it does not show or cancel any other booking.',
    ],
    boundaries: ['Must not change how team members sign in.', 'Use the same link mechanism as the reminder email; no new kind of token.'],
    allowed: 'AUT-1 (bug fixes inside the specs, with a test that shows the change)',
  }) },

  // ---------- requests from the channels ----------
  { key: 'IN-4988', title: 'booking page: date picker works with the keyboard alone', from: ['support'], sources: ['IN-4988'], mark: 'agent-ready', body: ar({
    intent: 'The date picker on the booking page can be used with the keyboard alone: reach it, move between days, pick a date.',
    acceptance: [
      'Given the booking page, when a person uses only Tab, arrow keys, Enter and Escape, then they can open the picker, choose a date and close it.',
      'Given the picker is open, when Escape is pressed, then it closes and focus returns to the date field.',
      'Given a mouse user, when they pick a date, then the picker does not behave any differently for them.',
    ],
    boundaries: ['Must not change the booking flow or which dates can be booked.', 'Errors stay inline (DES-4); no modal.'],
    allowed: 'AUT-1 (bug fixes inside the specs, with a test that shows the change)',
  }) },
  { key: 'IN-7623', title: 'week view: hovering a booking shows who booked it', from: ['support'], sources: ['IN-7623'], mark: 'agent-ready', body: ar({
    intent: 'Hovering a booking in week view shows who booked it, next to the time it already shows.',
    acceptance: [
      'Given a booking by Ana Silva, when a team member hovers it in week view, then the tooltip shows the time and "Ana Silva".',
      'Given the public booking page, when a visitor sees taken times, then the name of another person is not shown.',
    ],
    boundaries: ['Adds a field to the team view only; must not show names on the public booking page.'],
    allowed: 'AUT-1 (new fields that add to what is there and take nothing away)',
  }) },
  { key: 'IN-7560', title: 'dates typed dd/mm in Germany parsed as mm/dd', from: ['support'], sources: ['IN-7560'], status: 'closed', reason: 'obsolete',
    body: 'Filed in the old queue before last week\'s date fix, as the ticket says. That fix shipped as SCHED-4471 (dates parse mm/dd in eu locales, done). Nothing left to do here; a new report after the fix would be a new issue.' },
  { key: 'IN-9312', title: 'invite links never expire', from: ['support'], sources: ['IN-9312'], status: 'closed', reason: 'obsolete',
    body: 'Filed in the old queue. Invite links now expire one hour after they are sent: SCHED-4423, done. Nothing left to do here.' },
  { key: 'IN-1210', title: 'CSV export: dates as dd/mm for EU accounts, or as they are', from: ['support', 'client'], sources: ['IN-1210', 'IN-4203'], mark: 'needs-human', body: nh({
    question: 'Support says EU accounts want the dates in the CSV export as dd/mm instead of mm/dd (IN-1210). A client\'s payroll import reads them as mm/dd, as they come today, and asked us not to flip them (IN-4203). Do we change the format of the existing date columns?',
    options: [
      'Switch the existing date columns to dd/mm for EU accounts.',
      'Leave the existing columns as they are and add date columns in an unambiguous format (ISO 8601, with the UTC offset of SCHED-4446).',
      'Leave the export as it is.',
    ],
    recommendation: 'Option 2.',
    why: 'Because a client has told us their payroll import relies on mm/dd (IN-4203), and changing that needs a human (AUT-2). Adding columns takes nothing away (PRD-3), so EU accounts get a readable date and no import breaks.',
  }) },
  { key: 'IN-8160', title: "settings page: typo 'Calender' → 'Calendar'", from: ['product'], sources: ['IN-8160'], mark: 'agent-ready', body: ar({
    intent: "Fix the typo 'Calender' on the settings page to 'Calendar'.",
    acceptance: [
      "Given the settings page, when it is shown, then it says 'Calendar' and nowhere 'Calender'.",
      'Given any other page, when it is shown, then its copy is not changed.',
    ],
    boundaries: ['Copy only; must not rename settings keys, API fields or export columns.'],
    allowed: "AUT-1 (copy changes in the product's own interface)",
  }) },
  { key: 'IN-9280', title: "booking page: say 'class' instead of 'group slot'", from: ['product'], sources: ['IN-9280', 'IN-5342'], status: 'closed', reason: 'obsolete',
    body: "Withdrawn by product: IN-5342 says to forget the 'class' rename, because the clinics disliked it in the survey; the booking page keeps 'group slot'. Nothing to build, and the copy must not change." },
  { key: 'IN-3046', title: 'CSV export: a comma in a client name shifts the columns', from: ['analytics'], sources: ['IN-3046'], mark: 'agent-ready', body: ar({
    intent: 'The CSV export quotes values that hold a comma, a quote or a line break, so the columns stay in place.',
    acceptance: [
      'Given a client named "Smith, Jones & Co", when the export runs, then the row has the same number of columns as the header.',
      'Given a value with a double quote, when it is exported, then it is escaped as "" inside quotes.',
      'Given an export with no such values, when it runs, then its bytes do not change.',
    ],
    boundaries: ['Must not add, remove, rename or reorder columns (PRD-3).'],
    allowed: 'AUT-1 (bug fixes inside the specs, with a test that shows the change)',
  }) },
  { key: 'IN-6480', title: 'calendar feed: all-day bookings as real all-day events, or as they are', from: ['support', 'client'], sources: ['IN-6480', 'IN-9975'], mark: 'needs-human', body: nh({
    question: 'Support asks to send all-day bookings in the calendar feed as real all-day events (IN-6480). A client\'s room screens read that feed and expect midnight to midnight, and asked us to leave it (IN-9975). Which one holds?',
    options: [
      'Leave the feed as it is: all-day bookings stay midnight to midnight.',
      'Switch the feed to real all-day events for every account.',
      'Add a per-account setting for real all-day events, off by default, so the current feed does not change for anyone who does not turn it on.',
    ],
    recommendation: 'Option 3.',
    why: 'Because a client has told us they rely on the current feed (IN-9975), and changing it needs a human (AUT-2). Option 3 keeps their feed as it is; a setting keeps the rule in one place (PRD-4).',
  }) },
  { key: 'IN-2631', title: 'slots: 15-minute booking granularity', from: ['support', 'client'], sources: ['IN-2631', 'IN-1725'], mark: 'agent-ready', body: ar({
    intent: 'An account can set slots in 15-minute steps; today the smallest step is 30 minutes.',
    acceptance: [
      'Given an account that picks 15 minutes, when it creates slots, then it can make a slot from 09:00 to 09:15.',
      'Given an account that changes nothing, when it creates slots, then they stay in 30-minute steps.',
      'Given existing slots and bookings, when the option ships, then they are not changed.',
    ],
    boundaries: ['Adds an option; must not change existing slots, bookings or the default step.', 'Must not touch pricing or plans (AUT-2).'],
    allowed: 'AUT-1 (small features inside the specs that add to what is there and take nothing away)',
  }) },
  { key: 'IN-5359', title: 'week view: compact layout that fits a whole day on one screen', from: ['client'], sources: ['IN-5359'], mark: 'agent-ready', blockedBy: ['SCHED-4468'], body: ar({
    intent: 'A compact week view that fits a whole day on one screen, built on the spacing scale (DES-3). The client asked for it before Friday; the date does not change what an agent may do.',
    acceptance: [
      'Given a 1080 px tall screen, when the compact week view shows a day from 00:00 to 24:00, then the whole day fits without scrolling.',
      'Given the compact view, when its margins and paddings are read, then every one is a spacing token (DES-3); no raw values.',
      'Given a person who does not turn on the compact view, when they open week view, then it is not changed.',
    ],
    boundaries: ['Built on the spacing scale only; must not add new spacing values or font sizes (DES-1, DES-3).', 'Blocked by SCHED-4468: until margins are on the spacing scale, a denser layout cannot come from it.'],
    allowed: 'AUT-1 (a denser layout built on the spacing scale, DES-3)',
  }) },
];

issues.push(
  { key: 'IN-7094', title: "booking page: confirm button says just 'OK'", from: ['product'], sources: ['IN-7094'], status: 'closed', reason: 'contradicts-spec',
    body: "DES-5: buttons say what they do, a verb and its object (\"Cancel booking\", not \"OK\"). A button that says only 'OK' goes against it, so this is not built. \"I want it this week\" does not change the rule; changing DES-5 itself is a design decision for a person, as a new request." },
  { key: 'IN-6845', title: 'booking page: icon buttons have accessible names', from: ['support'], sources: ['IN-6845'], mark: 'agent-ready', body: ar({
    intent: "Every icon button on the booking page gets an accessible name that says what it does, so a screen reader does not read it as just 'button'.",
    acceptance: [
      "Given a screen reader on the booking page, when it reaches an icon button, then it reads a verb and its object (for example \"Next week\", \"Close calendar\"), not just 'button' (DES-5).",
      'Given a sighted mouse user, when they look at the page, then the icons and layout are not changed.',
      'Given an automated accessibility check (axe), when it runs on the booking page, then no button lacks an accessible name.',
    ],
    boundaries: ['Names and labels only; must not change the icons, layout or booking flow.'],
    allowed: "AUT-1 (copy changes in the product's own interface; bug fixes inside the specs, with a test)",
  }) },
  { key: 'IN-9594', title: "week view: 'today' button missing on phones", from: ['support'], sources: ['IN-9594'], mark: 'agent-ready', body: ar({
    intent: "The 'today' button shows in week view on phones, as it does on larger screens.",
    acceptance: [
      "Given a phone 375 px wide, when week view opens, then the 'today' button is shown and jumps to the current week.",
      "Given a desktop screen, when week view opens, then the 'today' button is not moved or changed.",
    ],
    boundaries: ['Must not change other controls of week view.', 'Uses the spacing scale (DES-3); no new raw values.'],
    allowed: 'AUT-1 (bug fixes inside the specs, with a test that shows the change)',
  }) },
);

issues.push(
  { key: 'IN-5353', title: 'day view: print button', from: ['client'], sources: ['IN-5353'], mark: 'agent-ready', body: ar({
    intent: "Day view gets a 'Print day' button that prints the day's bookings on paper, one clean list.",
    acceptance: [
      "Given day view, when a person presses 'Print day', then the print dialog opens with that day's bookings, times in the viewer's zone (PRD-2).",
      'Given the printed page, when it is printed, then navigation and buttons are not printed.',
      'Given a person who does not print, when they use day view, then its layout is not changed.',
    ],
    boundaries: ["Adds a button and a print style; must not change day view on screen.", "The button says a verb and its object (DES-5): 'Print day', not 'OK'."],
    allowed: 'AUT-1 (small features inside the specs that add to what is there and take nothing away)',
  }) },
);
