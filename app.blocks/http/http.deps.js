({
    mustDeps : [
        { block : 'yana' }
    ],
    shouldDeps : [
        { block : 'config' },
        {
            block : 'handler',
            mods : { 'type' : 'base' }
        },
        { block : 'error' },
        { block : 'logger' },
        { block : 'yana', elem : 'default' }
    ]
})