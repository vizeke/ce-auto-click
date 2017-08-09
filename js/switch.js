
/**
 * 
 * 
 * @class Switch
 */
class Switch {
    constructor( id ) {
        this.buySwitch = undefined
        this.add( id );
        this.toggleObserver = new Observer();
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
        this.toggleObserver.fire( e.target.checked )
    }

    turnOff () {
        this.buySwitch.find( 'input' ).prop( 'checked', false );
    }
}