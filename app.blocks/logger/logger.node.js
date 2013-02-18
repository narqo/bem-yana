App.Logger = inherit({}, {

    log : function() {
        console.log(App.Util.format.apply(null, arguments));
    }

});