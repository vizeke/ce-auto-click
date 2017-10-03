
/**
 * 
 * 
 * @class Switch
 */
class Switch {
    constructor( id ) {
        this.buySwitch = undefined;
        this.input = undefined;
        this.create( id );
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

    create ( id ) {
        this.buySwitch = $( appConfig.ROUND_SWITCH_HTML );
        this.input = this.buySwitch.find( 'input' );
        this.input
            .attr( 'id', `buy-switch-${id}` )
            .on( 'click', this.onClick.bind( this ) );
    }

    getElement () {
        return this.buySwitch;
    }

    onClick ( e ) {
        this.toggleObserver.fire( e.target.checked )
    }
}