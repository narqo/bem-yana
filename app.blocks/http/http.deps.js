({
    mustDeps : [
        { block : 'app', elems : ['runtime'] },
        { block : 'config' },
    ],
    shouldDeps : [
        { block : 'error', mods : { type : 'error' } },
        { block : 'logger' }
    ]
})