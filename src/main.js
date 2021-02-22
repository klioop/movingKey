require("./db/mongoose")
require("mongoose").set("debug", true)
const express      = require("express")
const app          = express()
const dealerRouter = require("./routers/dealer")

const port = process.env.PORT || 3000

app.use(express.json())
app.use(dealerRouter)

app.listen(port, () => {
    console.log(`Server is on port ${port}.`)
})