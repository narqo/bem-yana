rrrouter
========

Simple router module.

### Usage

    modules.require('rrrouter', function(Rrrouter) {

        var router = new Rrrouter([
                { rule : '/', action : 'home' },
                { rule : '/lib/{id}', action : 'library' },
                { rule : '/lib/{id:\\d+}', action : 'library' }
            ])

        router.resolve('/')
        // > { action : 'home', path : '/', method : 'GET', params : [] }

        router.resolve('/lib/123/')
        // > { action : 'library', path : '/lib/123', method : 'GET', params : [{ id : 123 }] }

        router.resolve('/lib/book/')
        // > { action : 'library', path : '/lib/book', method : 'GET', params : [{ id : 'book' }] }

        router.resolve('/library')
        // > { action : 'not-found', path : '/library', method : 'GET', params : [] }

        //
        // Adding new route
        //

        router.addRoute({ rule : '/api', methods : ['post'], action : 'api' })

        router.resolve('/api', 'post')
        // > { action : 'api', path : '/api', method : 'POST', params : [] }

    });
