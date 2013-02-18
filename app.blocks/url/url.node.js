App.Url = inherit({ }, {

    parse : function(req) {
        if(req._parsed)
            return req._parsed;

        req._parsed = this.url(req.url);
        req.path = req._parsed.pathname;

        return req._parsed;
    },

    url : function(url) {
        return this._url.parse(url);
    },

    query : function(req) {
        return req.query ||
            (req.query = ~req.url.indexOf('?')?
                 this._qs.parse(this.parse(req).query) : {});

    },

    mime : function(req) {
        var ct = req.headers['content-type'] || '';
        return ct.split(';')[0];
    },

    _url : require('url'),

    _qs : require('querystring')

});