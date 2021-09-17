# HarperDB Custom Functions Demo Project

This repo comprises a set of Fastify routes, helpers, and static content to be loaded by HarperDB's Custom Functions Fastify Server.

To deploy the routes in this demo project, simply copy this `dogs` folder into your `custom_functions` folder. By default, this folder is located in your HarperDB user folder `(~/hdb)`.

**Routes are automatically prefixed with their parent folder name.**

## Routes

---

### GET /dogs

GET ALL DOGS

```
  server.route({
    url: '/',
    method: 'GET',
    handler: (request) => {
      request.body= {
        operation: 'sql',
        sql: 'SELECT * FROM dev.dog ORDER BY dog_name'
      };
      return hdbCore.requestWithoutAuthentication(request);
    }
  });
```

### POST /dogs

POST A NEW DOG

```
server.route({
    url: '/',
    method: 'POST',
    preValidation: hdbCore.preValidation,
    handler: hdbCore.request,
  })
```

### GET /dogs/:name

GET DOGS WITH A NAME THAT STARTS WITH A SPECIFIC STRING

```
  server.route({
    url: '/:id',
    method: 'GET',
    preValidation: (request) => customValidation(request, logger),
    handler: (request) => {
      request.body= {
        operation: 'sql',
        sql: `SELECT * FROM dev.dog WHERE id = ${request.params.id}`
      };

      /*
       * requestWithoutAuthentication bypasses the standard HarperDB authentication.
       * YOU MUST ADD YOUR OWN preValidation method above, or this method will be available to anyone.
       */
      return hdbCore.requestWithoutAuthentication(request);
    }
  });
```
