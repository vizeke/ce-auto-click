
/**
 * 
 * 
 * @class Switch
 */
class Switch {
    constructor( id ) {
        this.buySwitch = undefined
        this.handlers = [];
        this.add( id );
    }

    get checked () {
        return this.buySwitch.find( 'input' ).prop( 'checked' );
    }

    add ( id ) {
        this.buySwitch = $( appConfig.ROUND_SWITCH_HTML );
        this.buySwitch.find( 'input' )
            .attr( 'id', id )
            .on( 'click', this.onClick.bind( this ) );
        $( appConfig.SELECTOR_BOX_BUTTON ).prepend( this.buySwitch );
    }

    onClick ( e ) {
        this.fire( e.target.checked )
    }

    turnOff () {
        this.buySwitch.find( 'input' ).prop( 'checked', false );
    }

    subscribe ( fn, that ) {
        this.handlers.push( { fn, that } );
    }

    unsubscribe ( fn ) {
        this.handlers = this.handlers.filter(( item ) => item !== fn );
    }

    fire ( obj ) {
        this.handlers.forEach( o => o.fn.call( o.that, obj ) );
    }
}