({
    shouldDeps : [
        { block : 'inherit' },
        { block : 'promise' },
        { block : 'util' },
        { block : 'logger' },
        { block : 'error', mods : { type : ['http', 'view'] } }
    ]
})