({
    mustDeps : [
        { block : 'config' },
        { block : 'http' },
        { block : 'cluster' }
    ],
    shouldDeps : [
        { block : 'page' },
        { block : 'view', elem : 'static' }
    ]
})