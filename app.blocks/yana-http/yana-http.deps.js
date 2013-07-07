({
    mustDeps : [
        { block : 'inherit' },
        { block : 'vow' }
    ],
    shouldDeps : [
        { block : 'yana-config' },
        { block : 'yana-request' },
        { block : 'yana-response' },
        {
            block : 'yana-handler',
            mods : { 'type' : 'common' }
        },
        { block : 'yana-error' },
        { block : 'yana-logger' }
    ]
})