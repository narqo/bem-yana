exports.extendMake = function(registry) {
    require('./arch')(registry);
    require('./bundles')(registry);
}
