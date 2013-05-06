rrrouter
========

Simple router module.

### Usage

    modules.require('rrrouter', function(Rrrouter) {

        var router = new Rrrouter([
                {
                    rule : '/',
                    data : {
                        action : 'home'
                    },
                },
                {
                    rule : '/lib/{id}',
                    data : {
                        action : 'library'
                    },
                },
                {
                    rule : '/lib/{id:\\d+}',
                    data : {
                        action : 'library'
                    }
                }
            ])

        router.resolve('/')
        // > { path : '/', method : 'GET', params : [], data : { action : 'home' } }

        router.resolve('/lib/123/')
        // > { path : '/lib/123', method : 'GET', params : [{ id : 123 }], data : { action : 'library' } }

        router.resolve('/lib/book/')
        // > { path : '/lib/book', method : 'GET', params : [{ id : 'book' }], data : { action : 'library' } }

        router.resolve('/library')
        // > { path : '/library', method : 'GET', params : [], data : { action : 'not-found' } }

        //
        // Adding new route
        //

        router.addRoute({ rule : '/api', methods : ['post'], data : { action : 'api' } })

        router.resolve('/api', 'post')
        // > { path : '/api', method : 'POST', params : [], data : { action : 'api' } }

    });
