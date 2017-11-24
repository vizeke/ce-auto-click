const appConfig = {
    // TODO: adjust selectors
    SELECTOR_LIST_PROMOTION: 'div.DIVcontador',
    SELECTOR_PRODUCT_NAME: '.contBLOCO2 .contTITULO.link a',
    SELECTOR_PRODUCT_TIME: 'span.t',
    SELECTOR_PRODUCT_BUY_BUTTON: 'span.at',

    PRODUCT_BASE_URL: 'https://www.kabum.com.br/cgi-local/site/produtos/descricao_ofertas.cgi?codigo=',

    ADD_TO_CART_BOUNDARY: 'https://www.kabum.com.br/cgi-local/site/carrinho/adicionar.cgi?codigo=',
//                        'https://www.kabum.com.br/cgi-local/site/carrinho/adicionar.cgi?codigo=60302&di=06032c2e8535cf62d13347b3dbf6bd575756547a22ba39f435d43312b98df6b9530c06057a2fe9'


    ROUND_SWITCH_HTML: '<label class="switch ce-auto-click"><input class="buy-switch" type="checkbox"><span class="slider-input round"></span></label>',
    ACTIVATE_BUTTON_HTML: '<button class="activate">Ativar</button>',

    DEFAULT_BUY_TIMEOUT: 100, 
    START_BUY_LOOP_GAP: 20
}
