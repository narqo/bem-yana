({
    shouldDeps : [
        { block : 'yana-router' },
        { block : 'yana-view' },
        {
            block : 'yana-view',
            elem : 'error',
            mods : {
                type : ['not-found', 'method-not-allowed', 'internal-error']
            }
        }
    ]
})