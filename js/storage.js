class Storage {
    constructor( prefix ) {
        this.prefix = prefix || 'bf_'
    }

    get storageName () {
        return this.prefix + 'products';
    }

    sync ( obj ) {
        localStorage[ this.storageName ] = JSON.stringify( obj );
    }

    remove () {
        delete localStorage[ this.storageName ]
    }
}