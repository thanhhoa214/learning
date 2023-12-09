# Meeting Room Reservation

The reservation system for meeting rooms. The app should allow users to view available rooms, reserve a room for a specified time period, and cancel a reservation.
To complete this task, you will need to:

- Use an array to store the list of available rooms and their properties (e.g., room number, capacity, available time slots).

- Use an object to store the list of reservations and their properties (e.g., room number, date, start time, end time, person who reserved).

- Create a user interface that allows users to view available rooms, reserve a room for a specified time period, and cancel a reservation.

- Add appropriate error handling and validation to ensure that reservations are entered correctly.

- Users should be able to search for available rooms based on their capacity and the desired time period.

- Users should be able to see the list of existing reservations and their details.

- Users should be able to cancel their own reservations.

- The app should have an admin interface that allows administrators to view and manage all reservations.

## Technical Stack

- NextJS
- TailwindCSS
- date-fns to manipulate datetime data

## Features Status

- ✅ Book a meeting room at specific date range
- ✅ Visualize Reservations as table
- ✅ Visualize Rooms as table
- ✅ Create Reservation form
- ✅ Validate end date must be later than start date
- ✅ Validate whether the room is available at selected time range
-

## Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
