# Huts APIs

- [Huts APIs](#huts-apis)
    - [GET /huts](#get-huts)
    - [POST /huts](#post-huts)
    - [POST /huts/:hutID/image](#post-hutshutidimage)
    - [DELETE /huts/:hutID](#delete-hutshutid)


### GET /huts

- **Description**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: 
```
[
    {
        "pointID": 1,
        "name": "Al Sap",
        "description": "description",
        "latitude": 45.95233,
        "longitude": 8.4457,
        "altitude": 100,
        "address": "Alpe del Sap, 215",
        "municipality": "Angrogna",
        "province": "Turin",
        "country": "Italy",
        "pointType": "hut",
        "bedspace": 50,
        "email": "hut@mail.com",
        "phoneNumber": "123456789",
        "website": "www.website.com",
        "creatorID": 3,
        "creatorName": "Barbara",
        "creatorSurname": "Ann"
    },
    {
        "pointID": 2,
        "name": "Troncea",
        "description": "description",
        "latitude": 45.94658,
        "longitude": 8.46168,
        "altitude": 100,
        "address": "Frazione Troncea",
        "municipality": "Pragelato",
        "province": "Turin",
        "country": "Italy",
        "pointType": "hut",
        "bedspace": 50,
        "email": "hut@mail.com",
        "phoneNumber": "123456789",
        "website": "www.website.com",
        "creatorID": 3,
        "creatorName": "Barbara",
        "creatorSurname": "Ann"
    }
]
```
- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

### POST /huts

- **Description**.
- **Request body**: 
```
{
    "hutID": 1,
    "name": "HutName", 
    "latitude": 123, 
    "longitude": 456, 
    "altitude": 100, 
    "description": "A description",
	"website": "www.hut.com", 
    "email": "hut@email.com", 
    "phoneNumber": "1234567890",
	"municipality": "Collegno", 
    "province": "Turin", 
    "country: "Italy""
    "address": "Via Milano 1", 
    "bedspace": 100, 
    "creatorID": 1
}
```
- **Response**: `200 OK` (success); 
- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

### POST /huts/:hutID/image

- **Description**.
- **Request body**: 
```
    
```
- **Response**: `200 OK` (success); 
- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).


### DELETE /huts/:hutID

- **It deletes the hut with the given hutID**.
- **Request body**: empty.
- **Response**: `200 OK` (success); 
- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).
