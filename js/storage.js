class Storage {
    constructor( prefix ) {
        this.prefix = prefix || 'bf_'
    }

    get storageName () {
        return this.prefix + 'switches';
    }

    sync ( obj ) {
        localStorage[ this.storageName ] = obj;
    }

    remove () {
        delete localStorage[ this.storageName ]
    }
}