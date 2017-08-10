
/**
 * 
 * 
 * @class Switch
 */
class Switch {
    constructor( id ) {
        this.buySwitch = undefined;
        this.input = undefined;
        this.add( id );
        this.toggleObserver = new Observer();
    }

    get checked () {
        return this.input.prop( 'checked' );
    }

    turnOn () {
        this.input.prop( 'checked', true );
        this.toggleObserver.fire( true );
    }

    turnOff () {
        this.input.prop( 'checked', false );
        this.toggleObserver.fire( false );
    }

    add ( id ) {
        this.buySwitch = $( appConfig.ROUND_SWITCH_HTML );
        this.input = this.buySwitch.find( 'input' );
        this.input
            .attr( 'id', id )
            .on( 'click', this.onClick.bind( this ) );
        $( appConfig.SELECTOR_BOX_BUTTON ).prepend( this.buySwitch );
    }

    onClick ( e ) {
        this.toggleObserver.fire( e.target.checked )
    }
}