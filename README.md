# Budget Tracker

## Table of Contents

* [Description](#description)
* [Links](#links)
* [Screenshots](#screenshots)
* [Installation](#installation)
* [Usage](#usage)
* [Technologies Used](#technologies)
* [Tests](#tests)
* [Credits](#credits)
* [Contributing](#contributing)
* [Questions](#questions)
* [License](#license)

## Description

This is a budget-tracking app using Node.js, Express, MongoDB, and Mongoose, with the capability to continue functioning when no internet connection is available. Data entered when no internet is available is cached, then uploaded to the database upon internet reconnection. The user shouldn't notice any difference in functionality between online and offline.

To use this app, the user enters a transaction name and dollar amount into the appropriate fields in the form at the top of the page, then clicks either "+ Add Funds" or "- Subtract Funds" as appropriate. The total amount of all transactions is shown above the form, a list of previous transactions below the form, and a graph of transaction history is shown below that.

## Links

[Deployed application on Heroku](https://cryptic-cliffs-84728.herokuapp.com/)

## Screenshots

Landing page:
![Landing page:](public/assets/landing-page-screenshot.png)

User input form:
![User input form](public/assets/user-input-form-screenshot.png)

## Installation Instructions

npm i

## Usage

This app is intended to be used to track a user's transactions and budget, whether or not the user is connected to the internet.

## Technologies Used

Node.js, Express, MongoDB, Mongoose

## Tests

npm run test

## Credits

Base code and online functionality developed and provided by Trilogy Education Services

## Contributing

N/A

## Questions

If you have further questions, you can reach me at lauracole1900@comcast.net. For more of my work, see [my GitHub](https://github.com/LauraCole1900).

## License

![License badge](https://img.shields.io/badge/license-MIT-brightgreen).
