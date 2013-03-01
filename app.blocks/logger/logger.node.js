App.Logger = (function() {

var util = App.Util,
    config = App.Config;

function log() {
    console.log(util.format.apply(null, arguments));
};

return {
    debug : function() { config.param('DEBUG') && log.apply(null, arguments) },
    info  : log
}

}());
