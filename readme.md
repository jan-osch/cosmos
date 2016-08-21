## AltTab coding challenge

## Solution
* Not using `Passport.js` - plain `Mongoose` + `Express` authentication.
* Users are stored in a MongoDB collection.
* Sessions are a separate collection. Token passed to the user is simply the session id.
* Access to ProfileRouter is secured using authMiddleware.

## General
* App config can be manipulated in `config/config.js`
* Business logic separated from delivery method (`src/actions/auth.actions`) 
