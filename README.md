[README.md](https://github.com/user-attachments/files/28511091/README.md)
[README.md](https://github.com/user-attachments/files/28509634/README.md)
# planning

`planning` is a clean timetable-style planning app for organizing tasks by date, weekday, and time block. It supports multi-hour blocks, repeated tasks, task categories, completion tracking, mood logging, daily encouragement, carryover reminders, and weekly summaries.

This project was created through a vibe coding workflow, with features shaped iteratively through natural-language direction and rapid frontend implementation.

## Features# planning

`planning` is a clean timetable-style web planning app for organizing tasks by date, weekday, and time block. It supports multi-hour blocks, repeated tasks, task categories, completion tracking, mood logging, daily encouragement, carryover reminders, and weekly summaries.

This project was created through a vibe coding workflow, with features shaped iteratively through natural-language direction and rapid frontend implementation.

## Features

- Timetable-style weekly view with full dates and weekdays
- Time slots from `07:00` to `24:00`
- Add tasks by selecting a time block
- Merge continuous time blocks, such as `08:00-12:00`
- Repeat a task across multiple days until a selected end date
- Task categories with distinct colors and icons:
  - Study
  - Work
  - Health
  - Life
  - Creative
  - Social
  - Rest
- Automatically generated task summary table
- Mark tasks as completed
- Select a mood after completing a task
- Daily positive encouragement quote
- Cheer message popup after completing a task
- Carryover reminder for unfinished tasks from previous days
- Option to move unfinished tasks into the current day or delete them
- Sunday weekly summary with time statistics and mood records
- Update dialog for refreshing the deployed web version

## Getting Started

Open `index.html` directly in a browser, or run a local static server from the project directory:

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Then visit:

```text
http://127.0.0.1:4173/
```

## Web Deployment

This project is deployed with GitHub Pages:

```text
https://flashpop7.github.io/planning/
```

After updating the source files and deploying them to the same GitHub Pages URL, users can refresh the page or use the app's **Web Update** button to load the latest web version.

Current public web version:

```text
https://flashpop7.github.io/planning/
```

## Project Structure

```text
.
├── index.html
├── styles.css
├── app.js
├── version.json
├── LICENSE
└── README.md
```

## Privacy

This app stores task data locally in the browser using `localStorage`.

- Task data is not uploaded to a server.
- Each browser/device has its own local task data.
- Opening the same webpage on another device does not reveal another user's plans.
- A public GitHub repository contains the source code only, not locally entered task data.
- Clearing browser cache/site data may delete saved plans.
- The source code does not include personal account information, API keys, or a fixed APK download URL.

If cloud sync, accounts, or a database are added later, authentication, permissions, and data protection should be implemented separately.

## Disclaimer

This project is a local-first planning tool. Saved plans depend on browser local storage, so data may be lost if browser storage is cleared, the app is opened in a different browser, or the device storage is reset. Export or backup functionality should be added before using the app for critical schedules.

## Update Flow

The current project is a web app. It does not include an APK release yet.

The update dialog includes:

- **Web Update**: reloads the current webpage to fetch the latest deployed web version.
- **Download New Version**: reserved for a future APK release. It reads `version.json`, but `apkUrl` is currently empty.

For the web version, the same URL can be reused. After deploying updated files to that URL, reloading the page will show the latest version.

The `version.json` file currently tracks the web version and keeps a placeholder for a future APK download URL:

```json
{
  "version": "1.4.0",
  "apkUrl": "",
  "notes": "Initial web version. APK download URL is not configured yet."
}
```

When an APK is created in the future, a new APK file can be uploaded to a release or another stable hosting location. At that point, replace the empty `apkUrl` value with the APK download URL.

## Current Status

- Web version: available through GitHub Pages
- APK version: not available yet
- Cloud sync: not available
- User accounts: not available
- Data storage: browser local storage only

## Possible Future Improvements

- Add PWA support for installation from mobile browsers
- Package the app as an Android APK with Capacitor
- Add task import/export
- Add notification reminders
- Add optional cloud sync
- Add user accounts and access control

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.


- Timetable-style weekly view with full dates and weekdays
- Time slots from `07:00` to `24:00`
- Add tasks by selecting a time block
- Merge continuous time blocks, such as `08:00-12:00`
- Repeat a task across multiple days until a selected end date
- Task categories with distinct colors and icons:
  - Study
  - Work
  - Health
  - Life
  - Creative
  - Social
  - Rest
- Automatically generated task summary table
- Mark tasks as completed
- Select a mood after completing a task
- Daily positive encouragement quote
- Cheer message popup after completing a task
- Carryover reminder for unfinished tasks from previous days
- Option to move unfinished tasks into the current day or delete them
- Sunday weekly summary with time statistics and mood records
- Update dialog for web refresh and app/APK download flow

## Getting Started

Open `index.html` directly in a browser, or run a local static server from the project directory:

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Then visit:

```text
http://127.0.0.1:4173/
```

## Web Deployment

This project is deployed with GitHub Pages:

```text
https://flashpop7.github.io/planning/
```

After updating the source files and deploying them to the same GitHub Pages URL, users can refresh the page or use the app's **Web Update** button to load the latest web version.

## Project Structure

```text
.
├── index.html
├── styles.css
├── app.js
├── version.json
├── LICENSE
└── README.md
```

## Privacy

This app stores task data locally in the browser using `localStorage`.

- Task data is not uploaded to a server.
- Each browser/device has its own local task data.
- Opening the same webpage on another device does not reveal another user's plans.
- A public GitHub repository contains the source code only, not locally entered task data.
- Clearing browser cache/site data may delete saved plans.
- The source code does not include personal account information, API keys, or a fixed APK download URL.

If cloud sync, accounts, or a database are added later, authentication, permissions, and data protection should be implemented separately.

## Disclaimer

This project is a local-first planning tool. Saved plans depend on browser local storage, so data may be lost if browser storage is cleared, the app is opened in a different browser, or the device storage is reset. Export or backup functionality should be added before using the app for critical schedules.

## Update Flow

The app includes an update dialog with two actions:

- **Web Update**: reloads the current webpage to fetch the latest deployed web version.
- **Download New Version**: reads `version.json` and opens the configured APK download link.

For the web version, the same URL can be reused. After deploying updated files to that URL, reloading the page will show the latest version.

For an APK version, a new APK must be built and hosted at a stable download URL. Configure the APK download link in `version.json`:

```json
{
  "version": "1.4.0",
  "apkUrl": "",
  "notes": "Initial web version. APK download URL is not configured yet."
}
```

Replace the empty `apkUrl` value with the hosted APK download URL after an APK release is available.

## Possible Future Improvements

- Add PWA support for installation from mobile browsers
- Package the app as an Android APK with Capacitor
- Add task import/export
- Add notification reminders
- Add optional cloud sync
- Add user accounts and access control

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
