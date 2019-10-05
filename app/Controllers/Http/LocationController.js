'use strict'

const Location = use('App/Models/Location')
const Helpers = use('Helpers')
const Database = use('Database')

class LocationController {

    async create({request, response}) {
        const {name, latitude, longitude} = request.all()

        await Location.create({
            name,
            latitude,
            longitude,
        })

        return response.send({message: 'Location has been created'})
    }

    async shows({response}) {
        const data = await Location.query().select('*').fetch()
        return response.json(data)
    }

    async nearby({params, response}) {
        const latitude = params.latitude
        const longitude = params.longitude
        const query =  `SELECT *, ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) 
                        * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin(radians(latitude)) ) ) AS distance 
                        FROM locations
                        HAVING distance < 1
                        ORDER BY distance `

        const data = await Database.raw(query)
        return response.json(data[0])
    }

}

module.exports = LocationController
