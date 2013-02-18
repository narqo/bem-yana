({
    mustDeps : [
        { block : 'app' },
        { block : 'router' }
    ],
    shouldDeps : [
        { block : 'util' },
        { block : 'view' },
        { block : 'http', elem : 'error' }
    ]
})