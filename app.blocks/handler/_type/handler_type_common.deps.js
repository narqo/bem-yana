({
    shouldDeps : [
        { block : 'router' },
        { block : 'view' },
        {
            block : 'view',
            elem : 'error',
            mods : {
                type : ['not-found', 'method-not-allowed', 'internal-error']
            }
        }
    ]
})