({
    mustDeps : [
        { block : 'inherit' },
        { block : 'promise' }
    ],
    shouldDeps : [
        { block : 'config' },
        {
            block : 'handler',
            mods : { 'type' : 'common' }
        },
        { block : 'error' },
        { block : 'logger' },
        { block : 'yana', elem : 'default' }
    ]
})