var pg = require('pg');

// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
var config = require('../config/database');

if(process.env.DATABASE_URL){
    config = {
    user: 'wsaxycvykrlmng', //env var: PGUSER
    database: 'dcd22htbmat3mg', //env var: PGDATABASE
    password: '518b93ef7c9c3956d65b34ca0579b7974823ccc276358f2d8c2fbd6e5f275f9d', //env var: PGPASSWORD
    host: 'ec2-107-21-108-204.compute-1.amazonaws.com', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
}
var pool = new pg.Pool(config);

module.exports = pool;