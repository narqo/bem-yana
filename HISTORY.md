
0.2.1, 2013-03-21
-----------------

  - use [node-cookie](git://github.com/shtylman/node-cookie.git) for cookie parsing instead of
    [cookies](https://github.com/jed/cookies)
  - Yana.Response#setCookie(), Yana.Response#deleteCookie() methods added
  - request body parsers refactoring

0.2.0, 2013-03-20
-----------------

  - App namespace renamed to Yana
  - "cluster" block added for [Node.js Cluster](http://nodejs.org/docs/v0.8.20/api/cluster.html) normalization
  - "router" could now route request base on HTTP-method
  - default error views were renamed for more descriptive names
  - massive code refactoring

0.1.4, 2013-03-01
-----------------

  - static view added (#1)
  - App.Request.parseQS() was renamed to App.Request.parseArgs() (#2)
  - code refactoring

0.1.3, 2013-02-24
-----------------

  - "request" block added for request normalization API
  - "url" block removed (use "request")
  - "state" block removed (use "request")
  - App.Config.params() getter was added
  - App.Http.start() method was renamed to App.Http.run()
  - App.Logger.log() method was renamed to App.Logger.debug()
  - some inaccuracies were fixed in README.md
  - code refactoring

0.1.1, 2013-02-18
-----------------

  - code refactoring
  - examples/silly project added for usage example

0.1.0, 2013-02-16
-----------------

  - project started
