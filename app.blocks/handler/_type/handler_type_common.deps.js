({
    mustDeps : [
        { block : 'router' }
    ],
    shouldDeps : [
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