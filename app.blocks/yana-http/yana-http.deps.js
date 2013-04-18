({
    mustDeps : [
        { block : 'inherit' },
        { block : 'vow' }
    ],
    shouldDeps : [
        { block : 'yana-config' },
        {
            block : 'yana-handler',
            mods : { 'type' : 'common' }
        },
        { block : 'yana-error' },
        { block : 'yana-logger' }
    ]
})