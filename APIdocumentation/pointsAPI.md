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


### GET /points/huts

- **Return an array containing all huts**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: An array of huts, each describing hutID, name, latitude, longitude, address, bedspace and hutOwnerID  

```
    {
        [
            {
               "hutID": 1,
               "name": "hut#1",
               "latitude": 123,
               "longitude": 456,
               "address": "address1",
               "bedspace": 10,
               "hutOwnerID": 3 
            },
            {
               "hutID": 3,
               "name": "hut#2",
               "latitude": 123,
               "longitude": 456,
               "address": "address3",
               "bedspace": 15,
               "hutOwnerID": 53 
            },
            ... 
            ]
    }
```

- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

### POST /points/huts
- **Creates a new hut**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: a JSON object containing 
 Example of Request body

```
    {
        "name": "hut#3",
        "latitude": 123,
        "longitude": 456,
        "address": "address6",
        "bedspace": 20,
        "hutOwnerID": 57 
    }
```
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).


### GET /points/parkinglots

- **Return an array containing all parkingLots**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: An array of parkingLots, each describing 
- 
```
    {
        [
            {
               "parkingLotID": 2,
               "name": "parkinglot#1",
               "latitude": 123,
               "longitude": 456,
               "address": "address2",
               "carspace": 100 
            },
            {
               "parkingLotID": 4,
               "name": "parkinglot#2",
               "latitude": 123,
               "longitude": 456,
               "address": "address4",
               "carspace": 300
            },
            ... 
            ]
    }
```

- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).


### PUT /points/huts

- **Creates a new parkingLot**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: a JSON object containing 
 Example of Request body

```
    {
        "pointID": 2,
        "name": "parkinglot#3",
        "latitude": 123,
        "longitude": 456,
        "address": "address6",
        "bedspace": 350,
        "hutOWnerID": 4
    }
```
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

### DELETE /points/huts/:hutID

- **Delete**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: empty
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

### POST /points/parkinglots

- **Creates a new parkingLot**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: a JSON object containing 
 Example of Request body

```
    {
        "name": "parkinglot#3",
        "latitude": 123,
        "longitude": 456,
        "address": "address6",
        "carspace": 350
    }
```
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

