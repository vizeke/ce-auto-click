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
$( document ).ready(() => {
    let _send = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = () => {

        /* Wrap onreadystaechange callback */
        var callback = this.onreadystatechange;
        this.onreadystatechange = () => {
            if ( this.readyState == 4 ) {

                console.log( 'ajaxComplete' );
                console.log( arguments );

                /* We are in response; do something, like logging or anything you want */

            }

            callback.apply( this, arguments );
        }

        _send.apply( this, arguments );
    }
} );

if ( window.location.href.indexOf( 'https://www.kabum.com.br/ofertas/lista' ) >= 0 ) {

    $( document ).ajaxComplete(() => {
        console.log( 'ajax stop' );
        console.log( $( 'div.DIVcontador' ).length );
    } );

    const main = () => new Promotion().parseProductList();

    // Zone.current.fork( profilingZoneSpec ).run( main );
    main();
}
if ( window.location.href.indexOf( 'https://www.kabum.com.br/cgi-local/site/carrinho' ) >= 0 ) {
    new Cart();
}