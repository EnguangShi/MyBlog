/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1627510050413_8328';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'root',
      // database
      database: 'myblog',    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  config.security = {
    csrf:{enable: false},
    domainWhiteList:['http://127.0.0.1:3000','http://127.0.0.1:7001','http://127.0.0.1:3001'],
  }

  config.cors = {
    // origin: '*',
    credentials: true, //允许cookie跨域
    allowMethods:'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  }
  
  return {
    ...config,
    ...userConfig,
  };
};
