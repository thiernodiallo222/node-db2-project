const express = require('express');

const router = express.Router();

const db = require("../data/config");

router.get("/", async (req, res, next) => {
	try {
		// translates to `SELECT * FROM "cars";`
		// const cars = await db.select("*").from("cars")
		const cars = await db("cars");
		res.json(cars)
	} catch (error) {
		next(error)
	}
})

router.get("/:id", async (req, res, next) => {
	try {
		// SELECT * FROM "cars" WHERE "id" = someID LIMIT 1;
		// const [car] = await db.select("*").from("cars").where("id", req.params.id).limit(1)
		const car = await db("cars").where("id", req.params.id).first()
		if (!car) {
			res.status(404).json({message: `Data not found !`});
		}
		res.json(car)
	} catch (error) {
		next(error)
	}
})

router.post("/", async (req, res, next) => {
	try {
		const payload = {
			VIN: req.body.VIN,
            make: req.body.make,
            model: req.body.model,
            mileage: req.body.mileage,
            transmission: req.body.transmission,
            clean: req.body.clean,
            salvage: req.body.salvage,
            rebuilt: req.body.rebuilt,
		}

		// translates to `INSERT INTO "cars" ("name", "budget") VALUES (?, ?);`
		const [id] = await db("cars").insert(payload)
		const car = await db("cars").where("id", id).first()

		res.json(car)
	} catch (error) {
		next(error)
	}
})

router.put("/:id", async (req, res, next) => {
	try {
		const payload = {
			name: req.body.name,
			budget: req.body.budget,
		}

		// translates to `UPDATE "cars" SET "name" = ? AND "budget" = ? WHERE "id" = ?;`
		await db("cars").where("id", req.params.id).update(payload)
		const updatedCar = await db("cars").where("id", req.params.id).first()

		res.json(updatedCar)
	} catch (error) {
		next(error)
	}
})

router.delete("/:id", async (req, res, next) => {
	try {
		// translates to `DELETE FROM "cars" WHERE "id" = ?;`
		await db("cars").where("id", req.params.id).del()
		res.status(204).end()
	} catch (error) {
		next(error)
	}
})



module.exports = router;