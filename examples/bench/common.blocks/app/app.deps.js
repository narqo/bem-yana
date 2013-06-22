({
    mustDeps: [
        'modules'
    ],
    shouldDeps : [
        { block : 'yana-http' },
        { block : 'yana-http', mod : 'domain', val : 'yes' },
        { block : 'handler' },
        { elem : 'config' }
    ]
});
