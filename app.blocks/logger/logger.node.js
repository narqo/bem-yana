Yana.Logger = (function() {

var util = Yana.Util,
    config = Yana.Config;

function log() {
    console.log(util.format.apply(null, arguments));
}

return {
    debug : function() { config.param('DEBUG') && log.apply(null, arguments); },
    info  : log
};

}());
