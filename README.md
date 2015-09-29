# RHMAP Weather Search 

# Group Weather Search API

# weather/city [/weather/city]

'weather by city' endpoint.

## weather [POST]

'weather/by city' endpoint.

+ Request (application/json)
    + Body
            {
              "city": "Philadelphia",
              "country": "US"
            }

+ Response 200 (application/json)
    + Body
            {
              "msg": "xx Celcius"
            }

# weather/location [/weather/location]

'weather by location' endpoint.

## weather [POST]

'weather/by location' endpoint.

+ Request (application/json)
    + Body
            {
              "latitude": "51",
              "longitude": "3.74"
            }

+ Response 200 (application/json)
    + Body
            {
              "msg": "xx Celcius"
            }

