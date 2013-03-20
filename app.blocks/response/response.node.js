Yana.Response = (function() {

var http = require('http'),
    logger = Yana.Logger;

return inherit(http.ServerResponse, {

    __constructor : function(res) {
        res.__proto__ = this;
        return res;
    },

    redirect : function(status, url) {
        if(typeof url === 'undefined') {
            url = status;
            status = 302;
        }

        logger.debug('Going to redirect to url "%s"', url);

        this.writeHead(status, { 'Location' : url });
        this.end();
    }

});

}());