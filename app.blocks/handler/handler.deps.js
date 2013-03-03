({
    mustDeps : [
        { block : 'yana' },
        { block : 'router' }
    ],
    shouldDeps : [
        { block : 'util' },
        { block : 'request' },
        { block : 'view' },
        { block : 'view', elem : 'error', mods : { type : ['404', '500'] } },
    ]
})