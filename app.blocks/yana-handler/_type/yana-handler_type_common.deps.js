({
    mustDeps : [
        { block : 'yana-handler' }
    ],
    shouldDeps : [
        { block : 'yana-request' },
        { block : 'yana-router' },
        { block : 'yana-view' },
        {
            block : 'yana-view',
            elem : 'error',
            mods : {
                type : ['not-found', 'not-allowed', 'internal-error']
            }
        }
    ]
})