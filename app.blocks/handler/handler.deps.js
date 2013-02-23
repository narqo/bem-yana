({
    mustDeps : [
        { block : 'app' },
        { block : 'router' }
    ],
    shouldDeps : [
        { block : 'util' },
        { block : 'request' },
        { block : 'view' },
        { block : 'http', elem : 'error' }
    ]
})