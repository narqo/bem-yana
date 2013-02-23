App.Logger = (function() {

var format = App.Util.format;

function log() {
    console.log(format.apply(null, arguments));
};

return {
    debug : log
}

}());
