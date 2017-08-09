if (window.location.href.indexOf( 'https://www.kabum.com.br/produto' ) >= 0 ) {
    const promotion = new Promotion()
    promotion.mockParseProductList( 'meuId' )
    console.log( 'added' )
}
if ( window.location.href.indexOf( 'https://www.kabum.com.br/cgi-local/site/carrinho' ) >= 0 ) {
    new Cart();
}