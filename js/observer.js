
class Observer {
    constructor() {
        this.handlers = [];
    }

    subscribe ( fn, scope ) {
        this.handlers.push( { fn, scope } );
    }

    unsubscribe ( fn ) {
        this.handlers = this.handlers.filter(( item ) => item !== fn );
    }

    fire ( obj ) {
        this.handlers.forEach( o => o.fn.call( o.scope, obj ) );
    }
}
