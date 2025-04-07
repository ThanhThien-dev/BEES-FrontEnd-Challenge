# 🧠 LOGIC TEST

## Overview

This project implements the `processWithDelay` function as per the given requirements. It processes an array of numbers with a delay between each element, handles edge cases, and includes bonus features like customizable delay, progress tracking, and cancellation support.

### Implementation Details

- **Core Functionality:**
  - Processes each number in the input array with a 1-second delay (default) between prints.
  - Returns a `Promise<void>` that resolves when all numbers are processed.
  - Handles empty arrays by resolving immediately.
  - Throws a custom `InvalidInputError` for non-array inputs or non-numeric elements.
- **Bonus Features:**
  - Customizable delay via `delayMs` option.
  - Progress tracking via `onProgress` callback.
  - Cancellation support using `AbortController` and `signal`.
- **Technologies:**
  - Written in TypeScript for type safety.
  - Uses modern async/await patterns for sequential processing.

### File Structure

- `processWithDelay.ts`: Source code with implementation and test cases.

### Prerequisites

- Node.js (v14 or higher recommended)
- TypeScript (`npm install -g typescript`)

### How to Run

1. **Clone or Setup the Project:**

   - Place `processWithDelay.ts` in a folder (logic-test).

2. **Install Dependencies:**

   - Ensure TypeScript is installed:
     ```
     npm install -g typescript
     ```

3. **Compile the Code:**

   - In the project folder, run:

     ```
     tsc processWithDelay.ts
     ```

   - This generates processWithDelay.js.

4. **Run the Code:**

   - Execute the compiled JavaScript file:

   ```
    node processWithDelay.js
   ```

5. **Expected Output:**

   - The script runs 5 test cases:
     Test 1: Basic processing of [1, 2, 3].
     Test 2: Empty array handling.
     Test 3: Custom delay (2000ms) with progress tracking.
     Test 4: Cancellation after 1.2s.
     Test 5: Error handling for invalid input.

---

# 💻 APP DEVELOPMENT TEST

## Overview

The app is a User Management Dashboard built with Next.js, designed to manage user data efficiently. It provides a clean and responsive interface for viewing, editing, and deleting user records. Key features include:

- User Table: Displays a list of users in a table format with columns for ID, Name, Balance, Email, Registration Date, and Status. Users can sort the table by clicking on column headers (e.g., sort by name or balance in ascending/descending order).

- Search and Filter: Allows users to search for users by name, email, or ID, and filter users by status (e.g., Active, Inactive, Pending, Suspended).

- Pagination: Implements a paginated view of users, showing a limited number of entries per page (configurable: 5, 10, 25, or 50 rows). The pagination is condensed for large datasets (e.g., "Previous 1 2 3 4 ... 10 11 Next").

- Edit User Modal: Clicking the "Edit" button on a user row opens a modal popup where users can update the user's name, balance, email, and status. The modal has a semi-transparent overlay to keep focus on the form.

- Delete User: Users can delete a user by clicking the "Delete" button, with a confirmation prompt to prevent accidental deletions.

- Dark Mode Toggle: A custom toggle switch (built with Styled-Components) allows users to switch between light and dark modes. The state is managed globally using Redux Toolkit and persists across page reloads via localStorage.
  Responsive Design: The app is fully responsive, with Tailwind CSS ensuring the layout adapts to different screen sizes (e.g., mobile, tablet, desktop).

- Error Handling: Displays a loading spinner while fetching data and shows an error message with a "Reload" button if the API request fails.

- The app fetches user data from (https://mockapi.io/) (configured via NEXT_PUBLIC_API_URL) and transforms the response to fit the User type, adding a random status for each user. The UI is modular, with separate components for the table (UserTable), pagination (Pagination), and edit modal (EditUserModal), making the codebase easy to maintain and extend.

## Technologies Used in the Project

- Next.js and React: The project is structured as a Next.js app, with the main page (users/page.tsx) rendering a user management interface. React components like UserTable, Pagination, and EditUserModal are used to modularize the UI.

- TypeScript: All components and logic are written in TypeScript to ensure type safety. For example, the User type is defined in types.ts and used across the app.

- Redux Toolkit: The dark mode state (isDarkMode) is managed globally using Redux. A themeSlice is created to handle toggling and setting the dark mode, and the state is accessed in users/page.tsx using useSelector and useDispatch.

- Tailwind CSS: Styling is done using Tailwind CSS classes, with dark mode support enabled via darkMode: "class" in tailwind.config.js. For example, dark:bg-gray-900 changes the background color in dark mode.

- Axios: The fetchUsers function in users.ts uses Axios to fetch user data from an API, with error handling and data transformation.

- Styled-Components: The Switch component for toggling dark mode is styled using Styled-Components, providing a custom animated toggle with light/dark mode visuals.

- Date-fns: Used in UserTable.tsx to format the registerAt date field into a readable format (e.g., yyyy-MM-dd).

### Prerequisites

1. Install Dependencies:
   Ensure you have Node.js installed (version 16 or higher recommended).

2. Install the required packages:
   npm install
   This will install Next.js, React, Redux Toolkit, Tailwind CSS, Axios, Styled-Components, Date-fns, and other dependencies listed in package.json.

3. Set Up Environment Variables:
   Create a .env file in the root directory (if not already present) and add the API URL:
   NEXT_PUBLIC_API_URL=(https://mockapi.io/projects/67ed29554387d9117bbc825e)

4. Run the Development Server:
   Start the Next.js development server:
   npm run dev
   Open your browser and navigate to http://localhost:3000/users to see the user management page.
