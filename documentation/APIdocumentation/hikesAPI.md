## GET

### GET /hikes

- **Return an array containing all hikes**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: An array of hikes, each describing hikeID, title, lenght, expectedTime, ascent, difficulty, description, startPointID, endPointID and referencePointIDs

```
    {
        [
            {
                "hikeID": 1,
                "title": "hike#1",
                "lenght": 7,
                "expectedTime": 30,
                "ascent": 100,
                "difficulty": "Tourist",
                "description": "firstDescription"
            },
            {
                "hikeID": 2,
                "title": "hike#2",
                "lenght": 2,
                "expectedTime": 45,
                "ascent": 123,
                "difficulty": "Hiker",
                "description": "secondDescription" 
            },
            ... 
            ]
    }
```


### GET /hikes/:hikeID
- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

- **Return the selected hike**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: The selected hikes, describing hikeID, title, lenght, expectedTime, ascent, difficulty, description, startPointID, endPointID and referencePointIDs

```
        {
                "hikeID": 1,
                "title": "hike#1",
                "lenght": 7,
                "expectedTime": 30,
                "ascent": 100,
                "difficulty": "Tourist",
                "description": "firstDescription"
        }
```

- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

### GET /hikes/:hikeID/track

- **Description**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: 

```
    
```

- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

### GET /hikes/:hikeID/huts

- **Description**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: 

```
    
```

- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

### GET /hikes/referencePoints

- **Description**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: 

```
    
```

- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

### GET /hikes/:hikeID/linkedHuts

- **Description**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: 

```
    
```

- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

## POST
### POST /hikes
- **Creates a new Hike with an empty array of referencePointIDs and null startPointID and endPointID.**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: a JSON object containing title, lenght, expectedTime, ascent, difficulty, description.
 Example of Request body

```
    {
        "title": "hike#3",
        "lenght": 3,
        "expectedTime": 60,
        "ascent": 514,
        "difficulty": "Professional Hiker",
        "description": "thirdDescription"
    }
```
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  Hiker
- **Error responses**: `401 Unauthorized` (not logged in or wrong permissions), `422 Unprocessable Entity` (validation of request body failed), `503 Service Unavailable` (generic error).

### POST /hikes/:hikeID/huts/:hutID

- **Description**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: 

```
    
```

- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

### POST /hikes/referencePoints

- **Description**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: 

```
    
```

- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

### POST /hikes/start
- **Add a starting point to an hike**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: a JSON object containing hikeID and startPointID.
 Example of Request body
```
    {
        "hikeID: 1
        "startPointID": 1 
    }
```
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  Hiker
- **Error responses**: `401 Unauthorized` (not logged in or wrong permissions), `422 Unprocessable Entity` (validation of request body failed), `503 Service Unavailable` (generic error).

### POST /hikes/end
- **Add a ending point to an hike.**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: a JSON object containing hikeID and endPointID.
 Example of Request body
```
    {
        "hikeID": 1
        "endPointID": 4 
    }
```
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  Hiker
- **Error responses**: `401 Unauthorized` (not logged in or wrong permissions), `422 Unprocessable Entity` (validation of request body failed), `503 Service Unavailable` (generic error).

## PUT

### PUT /hikes
- **Modify an Hike.**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: a JSON object containing title, lenght, expectedTime, ascent, difficulty, description.
 Example of Request body

```
    {
        "title": "hike#3",
        "lenght": 3,
        "expectedTime": 60,
        "ascent": 514,
        "difficulty": "Professional Hiker",
        "description": "thirdDescription"
    }
```
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  Hiker
- **Error responses**: `401 Unauthorized` (not logged in or wrong permissions), `422 Unprocessable Entity` (validation of request body failed), `503 Service Unavailable` (generic error).

### PUT /hikes/hut
- **Add a hut as a reference point to an hike.**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: a JSON object containing hikeID and hutID.
 Example of Request body
```
    {
        "hikeID": 1
        "hutID": 2
    }
```
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  Hiker
- **Error responses**: `401 Unauthorized` (not logged in or wrong permissions), `422 Unprocessable Entity` (validation of request body failed), `503 Service Unavailable` (generic error).


## DELETE
### DELETE /hikes/:hikeID
- **Delete the selected Hike.**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: empty
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  Hiker
- **Error responses**: `401 Unauthorized` (not logged in or wrong permissions), `422 Unprocessable Entity` (validation of request body failed), `503 Service Unavailable` (generic error).
