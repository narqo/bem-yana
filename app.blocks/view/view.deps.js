({
    mustDeps : [
        { block : 'i-promise' },
        { block : 'app' }
    ],
    shouldDeps : [
        { block : 'logger' },
        { block : 'error', mods : { type : ['http', 'view'] } }
    ]
})