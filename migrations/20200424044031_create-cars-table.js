
exports.up = async function(knex) {
        return await knex.schema.createTable('cars', table => {
        table.increments('id')
        table.text('vin').notNullable().unique()
        table.text('make').notNullable()
        table.text('model').notNullable()
        table.integer('mileage').notNullable()
        table.text('transmission')
        table.boolean('clean')
        table.boolean('salvage')
        table.boolean('rebuilt')
  })
}

exports.down = async function(knex) {
   return await knex.schema.dropTableIfExists('cars')
}


