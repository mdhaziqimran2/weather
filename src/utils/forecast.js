const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ebff78c1219d9a219d8fc4e7bbcea48c&query=${latitude},${longitude}`

    request({url, json: true}, (error, {body} = {}) => {
    if (error){
        callback('Unable to connect to weather service!', undefined)
    } else if(body.error){
        callback('Coordinate Error!', undefined)
        callback(body.error.info, undefined)
    } 
    else
        callback(undefined, `It is currently ${body.current.temperature} degress out at ${body.location.name},${body.location.country}. It feels like ${body.current.feelslike} out.`)
})
}

module.exports = forecast