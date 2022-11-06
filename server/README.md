# Server Documentation
In this project in order to make our code more organized and readble, I follow the MVC pattern for the server skeleton.

## Server.js File
In this project all of our APIs are started with "/api/". This prefix stored in a variable called "prefixRoute".All the APIs are called at first in this file like the example below

```
    let testRouter = require('./Route/TestRoute');
    app.use(prefixRoute + 'test', testRouter);
```
So All the APIs started from "/api/test" goes to the TestRoute File
## Route Folder
For each Route in the system we have a file. For example for all the APIs started from "/api/test" we have a TestRoute file. so "/api/test/abc" goes also to this file. In this file we can create different API calls for this specific route. For example:
```
    let express = require("express"); 
    let router = express.Router(); 
    const { body, validationResult, param } = require("express-validator");
    const {
        apiTest
    } = require("../Controller/TestController");
    router.put(
        "/:id",
        [
            param("id").isInt({ min: 0 }),
        ],
        (req, res) => {
            if (!validationResult(req).isEmpty()) return res.status(422).end();
            apiTest(req, res);
        }
    ); // /api/test/:id
    module.exports = router;
```
The most important thing is that we do not also write the logic here. We only check param errors or auth errors here and then all the logic goes to a file called "apiTest" which is a file in Controller folder.
