({
    mustDeps : [
        { block : 'promise' },
        { block : 'yana' }
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