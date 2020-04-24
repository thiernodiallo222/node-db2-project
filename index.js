const express = require("express")
// const helmet = require("helmet")
const welcomeRouter = require("./welcome");
const carRouter = require("./cars/car-router")

const server = express()
const port = process.env.PORT || 5000

// server.use(helmet())
server.use(express.json())

server.use("/", welcomeRouter)
server.use("/cars", carRouter)

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
});