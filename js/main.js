/*
* This zone starts a timer at the start of each taskEnv,
* and stops it at the end. It accumulates the total run
* time internally, exposing it via `zone.time()`
*
* Note that this is the time the CPU is spending doing
* bogosort, as opposed to the time from the start
* of the algorithm until it's completion.
*/
/* const profilingZoneSpec = ( () => {
    var time = 0,
        // use the high-res timer if available
        timer = performance ?
            performance.now.bind( performance ) :
            Date.now.bind( Date );
    return {
        onInvokeTask: ( delegate, current, target, task, applyThis, applyArgs ) => {
            this.start = timer();
            delegate.invokeTask( target, task, applyThis, applyArgs );
            time += timer() - this.start;
        },
        time: () => Math.floor( time * 100 ) / 100 + 'ms',
        reset: () => time = 0
    };
} )(); */

if ( window.location.href.indexOf( 'https://www.kabum.com.br/ofertas/lista' ) >= 0 ) {

    const main = () => new Promotion().parseProductList();
    
    $button = $(appConfig.ACTIVATE_BUTTON_HTML);
    $button.click(main);
    $('body').append($button);

    // Zone.current.fork( profilingZoneSpec ).run( main );
}
if ( window.location.href.indexOf( 'https://www.kabum.com.br/cgi-local/site/carrinho' ) >= 0 ) {
    new Cart();
}