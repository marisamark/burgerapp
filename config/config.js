exports.configure = function(env) {
    return configs[env];
  }

  let configs = {
    "development": {
      "username": "v2osuf93esb1pxmw",
      "password": `${process.env.DB_PASSWORD}`,
      "database": "ghg3kbsi33d69x4o",
      "host": "op2hpcwcbxb1t4z9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
      "port": 3306,
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "port": 3306,
      "dialect": "mysql"
    },
    "production": {
        "use_env_variable":"JAWSDB_URL"
    }
  }