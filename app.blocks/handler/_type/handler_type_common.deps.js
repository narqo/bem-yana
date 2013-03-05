({
    mustDeps : [
        { block : 'router' }
    ],
    shouldDeps : [
        { block : 'view' },
        {
            block : 'view',
            elem : 'error',
            mods : { type : ['404', '500'] }
        }
    ]
})