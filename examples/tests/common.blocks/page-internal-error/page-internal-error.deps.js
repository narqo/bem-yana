/* jshint asi:true */
({
    mustDeps : [
        { block : 'yana-view' },
        { block : 'yana-view', elem : 'error', mods : { type : 'internal-error' } }
    ],
    shouldDeps : [
        'yana-router',
        'yana-logger'
    ]
})