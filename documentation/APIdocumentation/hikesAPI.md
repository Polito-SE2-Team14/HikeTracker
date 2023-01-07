# Hikes APIs
- [Hikes APIs](#hikes-apis)
  - [GET](#get)
    - [GET /hikes](#get-hikes)
    - [GET /hikes/:hikeID](#get-hikeshikeid)
    - [GET /hikes/:hikeID/track](#get-hikeshikeidtrack)
    - [GET /hikes/:hikeID/image](#get-hikeshikeidimage)
    - [GET /hikes/:hikeID/huts](#get-hikeshikeidhuts)
    - [GET /hikes/:hikeID/referencePoints](#get-hikeshikeidreferencepoints)
    - [GET /hikes/:hikeID/linkedHuts](#get-hikeshikeidlinkedhuts)
  - [POST](#post)
    - [POST /hikes](#post-hikes)
    - [POST /hikes/:hikeID/image](#post-hikeshikeidimage)
    - [POST /hikes/:hikeID/huts/:hutID](#post-hikeshikeidhutshutid)
    - [POST /hikes/referencePoints](#post-hikesreferencepoints)
    - [POST /hikes/start](#post-hikesstart)
    - [POST /hikes/end](#post-hikesend)
  - [PUT](#put)
    - [PUT /hikes](#put-hikes)
  - [DELETE](#delete)
    - [DELETE /hikes/:hikeID](#delete-hikeshikeid)
    - [DELETE /hikes/:huts/:hutID](#delete-hikeshutshutid)

## GET
### GET /hikes
- **Return an array containing all hikes**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: An array of hikes, each describing hikeID, title, lenght, expectedTime, ascent, difficulty, description, startPointID, endPointID and referencePointIDs

```
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
    },... 
]
```


### GET /hikes/:hikeID
- **Return the requested hike**
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
- **Return the array of points of the track of the chosen hike**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: 

```
[
    [
        45.95929,
        8.44804
    ],
    [
        45.95929,
        8.44804
    ],
    [
        45.95927,
        8.44812
    ],...
]
```

- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

### GET /hikes/:hikeID/image
- **Return the picture (in base64) of the chosen hike**.
- **Request body**: empty
- **Response**: `200 OK` (success); body: 
```
{
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEB..."
}
```

- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

### GET /hikes/:hikeID/huts
- **Return an array of the close huts (under 5km) to a given hike**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: 
```
[
    {
        "pointID": 1,
        "name": "Al Sap",
        "description": "Very nice hut",
        "altitude": 100,
        "latitude": 123,
        "longitude": 456,
        "address": "Via Trieste 1",
        "municipality": "Turin",
        "province": "Turin",
        "country": "Italy",
        "bedspace": 100,
        "phoneNumber": "1234567890", 
        "website": "www.alsap.com",
        "email": "alsap@mail.com",
        "creatorID" 3:
    },
    {
        "pointID": 2,
        "name": "EnjoyHut",
        "description": "Not a very nice hut",
        "altitude": 100,
        "latitude": 123,
        "longitude": 456,
        "address": "Via Trieste 2",
        "municipality": "Turin",
        "province": "Turin",
        "country": "Italy",
        "bedspace": 100,
        "phoneNumber": "1234567891", 
        "website": "www.EnjoyHut.com",
        "email": "EnjoyHut@mail.com",
        "creatorID" 3:
    }, ...
]
```
- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

### GET /hikes/:hikeID/referencePoints
- **Return the array of the referencePoints of the chosen hike**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: 

```
    [
        {
        "referencePointID": 1,
        "creatorName": "Pippo",
        "creatorSurname": "Franco",
        "creatorID": 3,
        "name": "Picco rosa",
        "description": "Mountain peak",
        "municipality": "Collegno",
        "province": "Turin",
        "country": "Italy",
        "longitude": 123,
        "latitude": 456,
        "altitude": 100
        }, ...
    ]
```
- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

### GET /hikes/:hikeID/linkedHuts
- **Return the array of the huts linked to the chosen hike**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: 
```
[
    1,
    3,
    4,...
]
```
- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

## POST
### POST /hikes
- **Creates a new Hike with an empty array of referencePointIDs and null startPointID and endPointID.**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: a JSON object containing title, lenght, expectedTime, ascent, difficulty, description.
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

### POST /hikes/:hikeID/image
- **It sends the image of the chosen hike**.
- **Request body**: empty.
```
{
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEB..."
}    
```
- **Response**: `200 OK` (success);
- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).
  
### POST /hikes/:hikeID/huts/:hutID
- **Description**.
- **Request body**: 
```
{
    "hikeID": 1,
    "hutID: 3
}
```
- **Response**: `200 OK` (success); body: 
- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

### POST /hikes/referencePoints
- **Description**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: 
```
{
    "hikeID": 1,
    "referencePoint":
        {
            "creatorID": 3,
            "name": "Picco rosa",
            "description": "Mountain peak",
            "municipality": "Collegno",
            "province": "Turin",
            "country": "Italy",
            "longitude": 123,
            "latitude": 456,
            "altitude": 100,
        }
} 
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
```
    {
        "title": "hike#3",
        "lenght": 3,
        "expectedTime": 60,
        "ascent": 514,
        "difficulty": "Professional Hiker",
        "description": "thirdDescription"
        "municipality": "Moncalieri",
        "province": "Turin",
        "country": "Italy"
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

### DELETE /hikes/:huts/:hutID
- **Delete the hut linked to the Hike.**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: empty
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  Hiker
- **Error responses**: `401 Unauthorized` (not logged in or wrong permissions), `422 Unprocessable Entity` (validation of request body failed), `503 Service Unavailable` (generic error).