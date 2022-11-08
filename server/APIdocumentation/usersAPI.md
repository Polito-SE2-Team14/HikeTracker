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

