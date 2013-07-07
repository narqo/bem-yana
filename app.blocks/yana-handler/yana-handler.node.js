/* jshint node:true */
/* global modules:false */

modules.define(
    'yana-handler',
    ['inherit', 'vow', 'yana-error'],
    function(provide, inherit, Vow, YanaError) {

provide(inherit({

    /**
     * @protected
     * @returns {Function} Request handler
     */
    _run : function() {
        return this._handleRequest.bind(this);
    },

    /**
     * @protected
     * @param {Request} req
     * @param {Response} res
     * @returns {Any}
     */
    _handleRequest : function(req, res) {
        return this.handleRequest(req, res);
    },

    /**
     * @param {Request} req
     * @param {Response} res
     * @param {...Any} [args]
     */
    handleRequest : function(req, res) {
        throw new YanaError('not implemented');
    }

}));

});