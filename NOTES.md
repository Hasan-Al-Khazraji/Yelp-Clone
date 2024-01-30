<!-- Express -->
app.METHOD(PATH, HANDLER);

<!-- Basic routing example -->
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

<!-- Middleware -->
- Function that recieves the request, and gives it to route handler which then sends it to response
- Remember it reads top down
- app.use((req, res, next) => {blah blah blah}) is to mount the specified middleware function or fuunctions at the specified path
- next(); to move on to the next middleware or route handler

<!-- For getting specific id -->
- Do not use string implementation because it can make it open to sql injections <!-- CYBERSECUTIY -->
- This is called sanitization