### GET /points

- **Return an array containing all points**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: An array of points, each describing 

```
    {
        [
            {
                
            },
            {
                
            },
            ... 
            ]
    }
```

- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).


### GET /huts

- **Return an array containing all huts**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: An array of huts, each describing 

```
    {
        [
            {
                
            },
            {
                
            },
            ... 
            ]
    }
```

- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

### POST /huts
- **Creates a new hut**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: a JSON object containing 
 Example of Request body

```
    {
        
    }
```
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).


### GET /parkinglots

- **Return an array containing all parkingLots**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: An array of parkingLots, each describing 
- 
```
    {
        [
            {
                
            },
            {
                
            },
            ... 
            ]
    }
```

- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).


### POST /parkinglots

- **Creates a new parkingLot**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: a JSON object containing 
 Example of Request body

```
    {
        
    }
```
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

