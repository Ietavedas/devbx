// Load plugins
import 'jquery'


import svg4everybody from 'svg4everybody'
window.svg4everybody = svg4everybody;

//Load modules
import Fullpage from './classes/fullpage';
import SvgUse from './classes/svgUse';
// import Slider from './classes/slider';
import Sliders from './classes/carousel';

// Run components

window.App = {
    debug: false,
    lang: 'ru'
};

// debug detect

if (window.location.href.indexOf('.ru') !== -1 || window.location.href.indexOf('/en') !== -1) {
    App.debug = false;
}

if (window.SITE_LANG) {
    App.lang = window.SITE_LANG;
}

if (App.debug) {
    console.log('Debug: ' + App.debug);
    // console.log('Lang: ' + App.lang);
}

document.addEventListener('DOMContentLoaded', () => {
	App.SvgUse = new SvgUse();
	App.Fullpage = new Fullpage();
	// App.Slider = new Slider($('.slider'), $('.slider_nav'));
	App.Sliders = new Sliders();
});