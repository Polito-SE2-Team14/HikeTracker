# Points APIs

- [Points APIs](#points-apis)
    - [GET /points](#get-points)
    - [DELETE /points/:pointID](#delete-pointspointid)

### GET /points

- **Return an array containing all points**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: An array of points, each describing pointID, name, latitude, longitude, address, pointType and other values

```
    {
        [
            {
               "pointID": 1,
               "name": "hut#1",
               "latitude": 123,
               "longitude": 456,
               "address": "address1",
               "pointType": "hut",
               "bedspace": 10,
               "hutOwnerID": 3 
            },
            {
               "pointID": 2,
               "name": "parkinglot#1",
               "latitude": 123,
               "longitude": 456,
               "address": "address2",
               "pointType": "parkinglot"
               "carspace": 100
            },
            ... 
            ]
    }
```

- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

### DELETE /points/:pointID

- **Delete**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: empty
- **Response header**:  `201 Created` (success). 
- **Response body**: 
```
{
    "pointID": 1,
    "name": "hut#1",
    "latitude": 123,
    "longitude": 456,
    "address": "address1",
    "pointType": "hut",
    "bedspace": 10,
    "hutOwnerID": 3 
}
```
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).


