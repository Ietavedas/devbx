export default class SvgUse {
    constructor(event) {
        this.event = event;
        this.init();
    }
    init() {
        let self = this;
        ( function( window, document )
        {
            'use strict';

            var file = '/icons/svg/symbols.svg',
                revision = 2;

            if (!App.debug) file = './icons/svg/symbols.svg';

            if (window.location.href.indexOf('2204535') !== -1) {
                file = './icons/svg/symbol.svg';
            }

            if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect )
                return true;

            var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,
                request,
                data,
                insertIT = function()
                {
                    var g = document.createElement('div');
                    g.id = 'svg-sprite';
                    g.className = 'hidden';
                    document.body.appendChild(g);
                    document.getElementById('svg-sprite').insertAdjacentHTML( 'afterbegin', data );
                    svg4everybody({
                        polyfill: true // polyfill <use> elements for External Content
                    });

                    self.event && document.dispatchEvent(self.event);
                },
                insert = function()
                {
                    if( document.body ) insertIT();
                    else document.addEventListener( 'DOMContentLoaded', insertIT );
                };

            if( isLocalStorage && localStorage.getItem( 'inlineSVGrev' ) == revision )
            {
                data = localStorage.getItem( 'inlineSVGdata' );
                if( data )
                {
                    insert();
                    return true;
                }
            }

            try
            {
                request = new XMLHttpRequest();
                request.open( 'GET', file, true );
                request.onload = function()
                {
                    if( request.status >= 200 && request.status < 400 )
                    {
                        data = request.responseText;
                        insert();
                        if( isLocalStorage )
                        {
                            localStorage.setItem( 'inlineSVGdata',  data );
                            localStorage.setItem( 'inlineSVGrev',   revision );
                        }
                    }
                };
                request.send();
            }
            catch( e ){}

        }( window, document ) );
    }
};