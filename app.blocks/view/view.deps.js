({
    mustDeps : [
        { block : 'i-promise' },
        { block : 'yana' }
    ],
    shouldDeps : [
        { block : 'logger' },
        { block : 'error', mods : { type : ['http', 'view'] } }
    ]
})