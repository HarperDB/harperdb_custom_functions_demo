'use strict';

const customValidation = require('../helpers/example');

/*
 * requestWithoutAuthentication bypasses the standard HarperDB authentication.
 * YOU MUST ADD YOUR OWN preValidation method if you don't want this route to be open to anyone.
 */

module.exports = async (server, { hdbCore, logger }) => {
  // GET ALL DOGS
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

  // POST A NEW DOG
  server.route({
    url: '/',
    method: 'POST',
    preValidation: hdbCore.preValidation,
    handler: hdbCore.request,
  });

  // GET DOGS WITH A NAME THAT STARTS WITH A SPECIFIC STRING
  server.route({
    url: '/:name',
    method: 'GET',
    handler: (request) => {
      request.body= {
        operation: 'sql',
        sql: `SELECT * FROM dev.dog WHERE dog_name LIKE '${request.params.name}%'`,
      };

      return hdbCore.requestWithoutAuthentication(request);
    }
  });
};
