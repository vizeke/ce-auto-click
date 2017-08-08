
/**
 * 
 * 
 * @class Switch
 */
class Switch {
    constructor( id ) {
        this.handlers = [];
        this.add( id );
    }

    add ( id ) {
        let buySwitch = $( appConfig.ROUND_SWITCH_HTML );
        buySwitch.find( 'input' ).attr( 'id', id );
        $( appConfig.SELECTOR_BOX_BUTTON ).prepend( buySwitch );
    }

    click ( e ) {
        this.fire( e.target.checked )
    }

    subscribe ( fn ) {
        this.handlers.push( fn );
    }

    unsubscribe ( fn ) {
        this.handlers = this.handlers.filter(( item ) => item !== fn );
    }

    fire ( o ) {
        this.handlers.forEach( item => item.call( this, o ) );
    }
}