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
    - [PUT /users/current](#put-userscurrent)
    - [PUT /users/current](#put-userscurrent-1)
    - [DELETE /current](#delete-current)

### GET /users/current

- **Verify authentication**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: 
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

### GET /users/current/stats

- **Logout**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: 
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

### GET /users/hutworkers/all

- **Logout**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: 
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

### GET /users/localguides/all

- **Logout**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: 
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
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
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

### POST /users/send-verification/:token

- **Logout**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: 
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

### POST /users/current/stats

- **Logout**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: 
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

### PUT /users/current/stats

- **Logout**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: 
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

### PUT /users/approve/:userID

- **Logout**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: 
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

### PUT /users/unapprove/:userID

- **Logout**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: 
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

### PUT /users/current

- **Logout**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: 
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

### PUT /users/current

- **Logout**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: 
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

### DELETE /current
- **Logout**
- **Request header** has a line: `Content-Type: application/json`.
- **Request body**: 
- **Response header**:  `201 Created` (success). 
- **Response body**: none.
- **Permissions allowed**:  everyone
- **Error responses**: `422 Unprocessable Entity` (validation of request body failed), `505 Internal Server Error` (generic error).

