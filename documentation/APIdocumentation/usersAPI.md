# Users APIs 

- [Users APIs](#users-apis)
    - [GET /users/current](#get-userscurrent)
    - [GET /users/current/stats](#get-userscurrentstats)
    - [GET /users/hutworkers/all](#get-usershutworkersall)
    - [GET /users/localguides/all](#get-userslocalguidesall)
    - [POST /users](#post-users)
    - [POST /users/login](#post-userslogin)
    - [POST /users/send-verification/:token](#post-userssend-verificationtoken)
    - [POST /users/current/stats](#post-userscurrentstats)
    - [PUT /users/current/stats](#put-userscurrentstats)
    - [PUT /users/approve/:userID](#put-usersapproveuserid)
    - [PUT /users/unapprove/:userID](#put-usersunapproveuserid)
    - [DELETE /current](#delete-current)

### GET /users/current
- **Verify authentication**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: empty 
- **Response header**:  `201 Created` (success). 
- **Response body**: 
```
{
    "userID": 3,
    "name": "Barbara",
    "surname": "Ann",
    "email": "barbara.ann@email.com",
    "phoneNumber": "34567890112",
    "type": "localGuide",
    "token": "a23a63faef69b0a8f63003c0a44de1afa492fe60",
    "verified": 1,
    "approved": 1
}
```
- **Permissions allowed**:  logged user
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

### GET /users/current/stats
- **Return all the stats about an user**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: 
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

### GET /users/hutworkers/all
- **Return all the hutworkers**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: 
- **Response header**:  `201 Created` (success). 
- **Response body**: 
```
{
    [
        {
            "userID": 5,
            "name": "Cristian",
            "surname": "Verdi",
            "email": "cristian.verdi@email.com",
            "phoneNumber": "56789011234",
            "type": "hutWorker",
            "token": "f73d79a4788b1206393fe5de541827e1b03f0ab6",
            "verified": 1,
            "approved": 1
        },
        {
            "userID": 16,
            "name": "Elizabeth",
            "surname": "Lewis",
            "email": "elizabeth.lewis@email.com",
            "phoneNumber": "76543211098",
            "type": "hutWorker",
            "token": "dd5ccc80ab763b85cfcbe3115e0bb44a16a3cebc",
            "verified": 1,
            "approved": 1
        },...
    ]
}
```
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

### GET /users/localguides/all
- **Return all the localguides**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: 
- **Response header**:  `201 Created` (success). 
- **Response body**: 
```
{
    [
        {
            "userID": 3,
            "name": "Barbara",
            "surname": "Ann",
            "email": "barbara.ann@email.com",
            "phoneNumber": "34567890112",
            "type": "localGuide",
            "token": "a23a63faef69b0a8f63003c0a44de1afa492fe60",
            "verified": 1,
            "approved": 1
        },
        {
            "userID": 10,
            "name": "Andrew",
            "surname": "Miller",
            "email": "andrew.miller@email.com",
            "phoneNumber": "01123456789",
            "type": "localGuide",
            "token": "5a0831259c46d8a58939eb9dba8bdd7da62bff46",
            "verified": 1,
            "approved": 1
        },...
    ]
}
```
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

### POST /users
- **Creates a new user**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: a JSON object containing name, surname, email, phoneNumber, type, password
 Example of Request body
```
    {
        "name": "mario",
        "surname": "rossi",
        "email": "mario.rossi@email.com"
        "phoneNumber": "12345678901"
        "type": "Hiker",
        "password": "awfwafwqafa"
    }
```
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).


### POST /users/login
- **Login**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: 
```
{
   "username": "barbara.ann@email.com",
   "password": "password"
}
```
- **Response header**:  `201 Created` (success). 
- **Response body**: 
```
{
    "userID": 3,
    "name": "Barbara",
    "surname": "Ann",
    "email": "barbara.ann@email.com",
    "phoneNumber": "34567890112",
    "type": "localGuide",
    "token": "a23a63faef69b0a8f63003c0a44de1afa492fe60",
    "verified": 1,
    "approved": 1
}
```
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

### POST /users/send-verification/:token
- **Ask to verify the user email**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: empty
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

### POST /users/current/stats
- **Add the stats of an user**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: 
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

### PUT /users/current/stats
- **Update the stats of an user**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: 
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

### PUT /users/approve/:userID
- **A manager approve a localguide/hutworker user**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: 
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

### PUT /users/unapprove/:userID
- **A manager unapprove a localguide/hutworker user**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: 
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

### DELETE /current
- **Logout**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: empty
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  logged user
- **Error responses**: `401 Unauthorized` (not authenticated), `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

