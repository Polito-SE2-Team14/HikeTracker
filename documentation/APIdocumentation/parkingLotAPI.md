# Parking lot APIs

- [Parking lot APIs](#parking-lot-apis)
    - [GET /parkinglots](#get-parkinglots)
    - [POST /parkinglots](#post-parkinglots)
    - [DELETE /parkinglots/:pLotId](#delete-parkinglotsplotid)

### GET /parkinglots

- **It retrieves an array of all the plots**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: 
```
{
    [
        "pLotId": 1,
        "name": "plot#1", 
        "description": "A description", 
        "latitude": 123, 
        "longitude": 456, 
        "altitude": 100, 
        "municipality": "Turin",
        "province": "Turin", 
        "country": "Italy", 
        "address": "Via Roma 1", 
        "carspace": 100, 
        "creatorID": 1
    ],
    [
        "pLotId": 2,
        "name": "plot#2", 
        "description": "A description", 
        "latitude": 123, 
        "longitude": 456, 
        "altitude": 100, 
        "municipality": "Settimo",
        "province": "Turin", 
        "country": "Italy", 
        "address": "Via Roma 2", 
        "carspace": 100, 
        "creatorID": 3
    ]
}
```
- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

### POST /parkinglots

- **It creates a new parkingLot in database**.
- **Request body**: 
```
{
    "pLotId": 1,
    "name": "plot#1", 
    "description": "A description", 
    "latitude": 123, 
    "longitude": 456, 
    "altitude": 100, 
    "municipality": "Turin",
    "province": "Turin", 
    "country": "Italy", 
    "address": "Via Roma 1", 
    "carspace": 100, 
    "creatorID": 1
}    
```
- **Response**: `200 OK` (success); 
- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

### DELETE /parkinglots/:pLotId

- **It deletes a parkinglot identified by the given pLotId**.
- **Request body**: empty.
- **Response**: `200 OK` (success); 
- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

