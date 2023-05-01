const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=bd4b747879f86a481b59dc835f5b19b7&query='+ encodeURIComponent(address) + '&limit=1'

    request({url, json:true}, (error, {body} = {}) => {
        if (error){
            callback('Unable to connect to geocoding service!', undefined)
        } else if(body.length == 0){
            callback('Unknown location! Try another location to search', undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].locality
            })
        }
    })
}



module.exports = geocode