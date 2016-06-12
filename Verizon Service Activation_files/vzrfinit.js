/*! 
 * This vzrfInit() function is designed to be edited per application,
 * but in general it will keep the format provided by the VZRF source file: vzrfinit.js.default,
 * which includes initializing all the VZRF components and widgets and the various 3rd party plugins
 * that they make use of.  
 */
// Where context = id || jQuery object || undefined.
function vzrfInit(context) {

    // init components and utility
    //datepickerInit(context);
    //equalHeightsInit(context);
    //equalWidthsInit(context);
    formsInit(context);
    fixedBottomInit(context);
    //incrementInit(context);
   // peekInit(context);
   // revealInit(context);

    // init widgets
    //carouselInit(context);
    dropListInit(context);
    //equalWidthsInit(context);
    filterBarInit(context);
    listControlInit(context);
    modalInit(context);
    offCanvasInit(context);
   //pwToggleInit(context);
    stepsInit(context);
    tabsInit(context);
    tooltipInit(context);

    // app specific components/widgets. 
    appInit(context);
}


// Return the context as a jQuery object
// Where context = id || jQuery object || undefined.
function getContext(context) {
    var $context;
    if (context instanceof jQuery) {
        $context = context;
    } else if (context) {
        $context = $('#' + context);
    } else {
        $context = $(document);
    }
    return $context;
}

// run on DOM ready
$(function () {
    vzrfInit();
    FastClick.attach(document.body);
});

// wait until everything else, including images load
$(window).load(function () {
    //equalHeightsInit();
    //equalWidthsInit();
    //peekInit();
    stepsInit();
});

