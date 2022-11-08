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

- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).


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

### PUT /hikes/start
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

### PUT /hikes/end
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
