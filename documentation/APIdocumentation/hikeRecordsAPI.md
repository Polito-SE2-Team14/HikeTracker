# Hike Records APIs

- [Hike Records APIs](#hike-records-apis)
    - [GET /hikeRecords/:userID](#get-hikerecordsuserid)
    - [GET /hikeRecords/:userID/status/open](#get-hikerecordsuseridstatusopen)
    - [POST /hikeRecords](#post-hikerecords)
    - [PUT /hikeRecords](#put-hikerecords)

## GET
### GET /hikeRecords/:userID

- **Return an array containing all hike records of the chosen userID**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: 
```
[
    {
        "userID": 1,
        "hikeID": 1,
        "startDate": "2022-10-10",
        "endDate": "2022-10-14",
        "status": "completed"
    },
    {
        "userID": 1,
        "hikeID": 3,
        "startDate": "2022-10-13",
        "endDate": null,
        "status": "open"
    }
]
```

- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

### GET /hikeRecords/:userID/status/open

- **Return an array containing all hike records of the chosen userID and status open**.
- **Request body**: empty.
- **Response**: `200 OK` (success); body: 
```
[
    {
        "userID": 1,
        "hikeID": 1,
        "startDate": "2022-10-10",
        "endDate": null,
        "status": "open"
    },
    {
        "userID": 1,
        "hikeID": 3,
        "startDate": "2022-10-13",
        "endDate": null,
        "status": "open"
    }
]
```

- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

## POST
### POST /hikeRecords

- **Insert a new record, with open status and null endDate**.
- **Request body**: 
```
{
    "userID": 1,
    "hikeID": 3,
    "startDate": "2022-10-13" 
}    
```
- **Response**: `200 OK` (success);
- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).

## PUT
### PUT /hikeRecords
- **Update the selected record, with the endDate that was sent and completed status**
- **Request body**:
```
    {
    "userID": 1,
    "hikeID": 1,
    "startDate": "2022-10-10",
    "endDate": "2022-10-14" 
}
```
- **Response**: `200 OK` (success);  
- **Permissions allowed**: everyone
- **Error responses**: `500 Internal Server Error` (generic error).
