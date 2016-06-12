

var docheight;
$(document).ready(function () {  
		try{
			docheight = $(document).height();  
	    }catch(e){}
	    
	    try{
	   		try{
	    		desktopMobileVersions();    	
	    	}catch(e){}
	    	try{
		    	$('.AskVerizon').css('left', $('.main').offset().left);
		    }catch(e){}
		    
		    try{
		    	$('.Feedback').css('right',($(window).width() - ( $('.main').offset().left +  $('.main').outerWidth())));
		    }catch(e){}
		    try{
		   	 $('.AskVerizonMobile').css('left', (parseInt($('.main').offset().left) + parseInt($('.main').css('width'))) - 37);
		    }catch(e){}
		    
		    try{
		   	 footerResize();	
		    }catch(e){} 
		       
		    $('body').css('visibility', 'visible'); 
		    $('body').show();
	    }catch(e){        
	    	try{
	    		document.getElementById("body").style.visibility = "visible";
	    		$('body').css('visibility', 'visible'); 
	    		$('body').show();   	
	    	}catch(e){
	    		document.getElementById("body").style.visibility = "visible";
	    	}	    	
	    }
	    try{
		    $('#connectsteps').click(function () {
		        $('.connectstepslist').slideToggle();
		        $('.w_modal').css('height', 'auto');
		        $('.modal_content').css('height', 'auto');
		    });
	    }catch(e){}
	    
	  try{
	    $('.openpop').click(function () {
	    	try{
	        	$('.main').height($(window).height() - 64);
	        	$('.main').css('overflow', 'hidden');
	        }catch(e){}
	    });
	    $('[data-close-modal="id"]').click(function () {
	        $('.main').css('height','auto');
	        $('.main').css('overflow', 'auto');
	    });
	  }catch(e){} 
	
	  try{
	    $('.secretquestion li').click(function (index) {
	        $('#SQ').focus();
	        var livalue = $(this).text();
	        $('#SQ').attr('value', livalue);
	    });
	    
	    $('#TOSCreateAcct').click(function () {
		    if ($('#TOSCreateAcct').is(':checked')) {    	
		        $('#TOSCreateAcct').attr('data-open-modal', 'VerizonTermsOfService');
		    }
		    else {
		    	 $('#TOSCreateAcct').removeAttr('data-open-modal');    	 
		     }    
		});
		
		$('#acceptTOS').click(function () {
			acceptTos();
		});
		$('#acceptTOSMobile').click(function () {
			acceptTos();
		});
		$('#acceptTOSMR').click(function () {
			acceptTos();
		});
		$('#acceptTOSMobileMR').click(function () {
			acceptTos();
		});	
		$('#rejectTOS').click(function () {
			rejectTOS();
		});	
		$('#rejectTOSMR').click(function () {
			rejectTOS();
		});	
		
		$('#printTosMobile').click(function () {
			var openWindow = window.open("", "Verizon TOS", "width=300,height=300,resizable=no");
		    openWindow.document.write($( "#tosPrintContent" ).html());
		    openWindow.document.close();
		    openWindow.focus();
		    openWindow.print();
		    openWindow.close();
		});			
		$('#printTos').click(function () {
			var openWindow = window.open("", "Verizon TOS", "width=300,height=300,resizable=no");
		    openWindow.document.write($( "#tosPrintContent" ).html());
		    openWindow.document.close();
		    openWindow.focus();
		    openWindow.print();
		    openWindow.close();
		});		
		
		$('#printTosMobileMR').click(function () {
			var openWindow = window.open("", "Verizon TOS", "width=300,height=300,resizable=no");
		    openWindow.document.write($( "#tosPrintContentMR" ).html());
		    openWindow.document.close();
		    openWindow.focus();
		    openWindow.print();
		    openWindow.close();
		});			
		$('#printTosMR').click(function () {
			var openWindow = window.open("", "Verizon TOS", "width=300,height=300,resizable=no");
		    openWindow.document.write($( "#tosPrintContentMR" ).html());
		    openWindow.document.close();
		    openWindow.focus();
		    openWindow.print();
		    openWindow.close();
		});	
		
	
		$('#printIntuitTos').click(function () {
			var openWindow = window.open("", "Verizon TOS", "width=300,height=300,resizable=no");
		    openWindow.document.write($( "#intuitTosPrintContent" ).html());
		    openWindow.document.close();
		    openWindow.focus();
		    openWindow.print();
		    openWindow.close();
		});	
	   }catch(e){}
	    
	   try{
		$('input').focus(function () {
	    	$('div.tooltip-outter').hide();
	    }); 	
	    
	    if ($('html').hasClass('device-tablet')) {
	        $('.PCInstallation').hide();
	        $('.TabInstallation').show();
	    }
	    else {
	        $('.PCInstallation').show();
	        $('.TabInstallation').hide();
	    }
	   }catch(e){}   		
});

function acceptTos(){
	if ($('#TOSCreateAcct').is(':checked') == false) {			
		$('input[name=TOSCreateAcct]').prop('checked',true);
		//$('#TOSCreateAcct').attr('checked', 'checked');	
		$( "#TOSCreateAcct" ).trigger("change");		
	}else{
		$( "#TOSCreateAcct" ).trigger("change");
	}
	scrollToTarget('#TOSCreateAcct');
	footerResize();
}

function rejectTOS(){
	if ($('#TOSCreateAcct').is(':checked') == true) {			
		$('input[name=TOSCreateAcct]').prop('checked',false);
		//$('#TOSCreateAcct').removeAttr('checked');
		$( "#TOSCreateAcct" ).trigger("change");					
	}else{
		$( "#TOSCreateAcct" ).trigger("change");	
	}		
	scrollToTarget('#TOSCreateAcct');
	footerResize();
}

 $(window).resize(function () {
        $('body').show();
        if ($('html').hasClass('device-tablet')) {
            $('.PCInstallation').hide();
            $('.TabInstallation').show();
        }
        else {
            $('.PCInstallation').show();
            $('.TabInstallation').hide();
        }
        if ($('html').hasClass('device-desktop') || $('html').hasClass('device-tablet')) {

            if ($('.w_steps_desktop').length && $('.w_steps').length) {
                callSteps();
                $('.steps_arrow').removeClass('hide');
            }
            else {
                $('.steps_arrow').addClass('hide');
            }
        }
        $('.AskVerizon').css('left', $('.main').offset().left);
        var dev_winwid = $('.page').width();
        $('.w_top-bar').css("width", dev_winwid);

        //$('.page-loader-text').css('left', $('.page-loader').offset().left -15);
        //$('.page-loader-text').css('top', $('.page-loader').offset().top + 70);
        //$('.AskVerizonMobile').css('left', (parseInt($('.main').offset().left) + parseInt($('.main').css('width'))) - 37);

        footerResize();
    });
    /*
    $(window).resizeEnd(function () {
        browserFlag = localStorage.getItem("browserFlag");
        if (browserFlag == "false") {
            // do your stuff here
            browserchange();
        } else {
            // don't do stuff here
        }
        localStorage.setItem("browserFlag", "false");
    });
    */
    function browserchange() {
        localStorage.setItem("browserClass", "device-desktop");

        /*code for non-browser*/
        if (bowser.android && bowser.windowsphone && bowser.blackberry &&
            bowser.firefoxos && bowser.webos && bowser.tablet && bowser.mobile) {

        } else {
            if (parseInt($(window).width()) < 600) {
                localStorage.setItem("browserClass", "device-mobile");
                location.reload(false);

                $('input, textarea').on('focus', function (e) {

                    $('header').css('position', 'absolute');
                })
        .on('blur', function (e) {
            $('header').css('position', 'fixed');
        });

            } else {
                localStorage.setItem("browserClass", "device-desktop");
                location.reload(false);
            }
        }
    }

    function footerResize() {
        if ($('html').hasClass('device-desktop') || $('html').hasClass('device-tablet')) {
            $('.main').height('auto');
            var totalHeight = parseInt($('.page').height()) + parseInt($('.w_top-bar_desktop').height()) + parseInt($('.footer').height());
            if (totalHeight <= parseInt($(window).height())) {
                var mainHeight = parseInt($('.main').height()) + (parseInt($(window).height()) - totalHeight);
                $('.main').height(mainHeight);
                $('.main.welcomePage').height('auto');


            }
            else {
                $('.main').height('auto');
            }
        }
        else if ($('html').hasClass('device-mobile')) {
            $('.main').height('auto');
            var totalHeight = parseInt($('.page').height()) + parseInt($('.w_top-bar').height());
            if (totalHeight <= parseInt($(window).height())) {
                var mainHeight = parseInt($('.main').height()) + (parseInt($(window).height()) - totalHeight + parseInt($('.w_top-bar').height()));
                $('.main').height(mainHeight);
                $('.slip-welcome .main').height(mainHeight);
            }
            else {
                $('.main').height('auto');
            }
        }


    }

var winwid = $(window).width();
    function desktopMobileVersions() {

        if ($('html').hasClass('device-desktop') || $('html').hasClass('device-tablet')) {
            if (winwid <= 748) {
                $('html').removeClass('device-desktop');
                $('html').removeClass('device-tablet').addClass('device-mobile');

                $('.device-mobile header.w_top-bar').removeClass('hide');
                $('.w_top-bar_desktop').addClass('hide');
                $('.device-mobile input').css('visibility', 'visible');
                $('.device-mobile .desktop-version').css('display', 'none');
                //$('.device-mobile #mobile-version').css('display', 'table');

                //if ($('.service-lists').length > 0) {
                //    $('.device-mobile #mobile-version').css('display', 'inherit');
                //    $('.service-lists').children().find('#mobile-version.icon-check').css('display', 'none');
                //    $('.service-lists.completed').children().find('#mobile-version.icon-info').css('display', 'none');
                //    $('.service-lists.completed').children().find('#mobile-version.icon-check').css('display', 'block');
                //}
                //else {
                //    $('.device-mobile #mobile-version').css('display', 'table');
                //}


                $(window).bind("orientationchange", function (evt) {
                    $('html').removeClass('device-tablet').addClass('device-mobile');
                    $('.device-mobile header.w_top-bar').removeClass('hide');
                    $('.w_top-bar_desktop').addClass('hide');
                    $('.device-mobile input').css('visibility', 'visible');
                });

            }
            else {
                $('.w_top-bar').addClass('hide');
                $('.w_top-bar_desktop').removeClass('hide');
                $('.main').css('padding-top', 0);
                $('body').css('font-size', '14px');
                $('html').css('font-size', '14px');
            }
            if ($('.w_steps_desktop').length && $('.w_steps').length) {
                callSteps();
                $('.steps_arrow').removeClass('hide');
                if (winwid <= 748) {
                    $('.steps_arrow').css('display', 'none');
                }
                else {
                    $('.steps_arrow').css('display', 'block');
                }
            }
            else {
                $('.steps_arrow').addClass('hide');
            }
            $('.device-desktop .desktop-version').css('display', 'block');
            $('.device-desktop #mobile-version').css('display', 'none');
        }
        else if ($('html').hasClass('device-mobile')) {
            $('.device-mobile input').css('visibility', 'visible');
            $('.w_top-bar_desktop').addClass('hide');
            $('.w_top-bar').removeClass('hide');
            $('body').css('font-size', '100%');
            $('html').css('font-size', '100%');

            $('.device-mobile input').css('visibility', 'visible');
            $('.device-mobile .desktop-version').css('display', 'none');
            //$('.device-tablet .desktop-version').css('display', 'none');
            // $('.device-mobile #mobile-version').css('display', 'table');
            //$('.device-tablet #mobile-version').css('display', 'table');

            if ($('.service-lists').length > 0) { // Fix double icon display issue in iPhone 
                $('.device-mobile #mobile-version').css('display', 'inherit');
                $('.service-lists').children().find('#mobile-version.icon-check').css('display', 'none');
                $('.service-lists.completed').children().find('#mobile-version.icon-info').css('display', 'none');
                $('.service-lists.completed').children().find('#mobile-version.icon-check').css('display', 'block');
            }
            else {
                $('.device-mobile #mobile-version').css('display', 'table');
            }
        }
        if ($('html').hasClass('device-tablet')) {
            $('.sw_setup').hide();
            $('.woswSetupBtn').removeClass('hide');
            $('.swSetupBtn').addClass('hide');

        }
        else if ($('html').hasClass('device-desktop')) {
            $('.woswSetupBtn').addClass('hide');
            $('.swSetupBtn').removeClass('hide');
        }
    }
function callSteps() {
        var nwidth = parseInt($('.w_steps_desktop').css('width'));
        $('.w_steps_desktop ol').css('width', nwidth);
        var totwidth = 0
        $("li .steps_number_desktop").each(function (index) {
            totwidth = totwidth + parseInt($(this).width()) + 21;
        });
        $('.steps_name_desktop').css('display', 'table-cell');
        $("li .steps_name_desktop").each(function (index) {
            totwidth = totwidth + parseInt($(this).width()) + 41;
        });
        if (totwidth + 20 > nwidth) {
            //$('.steps_name_desktop').css('display', 'none');
            $('.w_steps_desktop li.active .steps_name_desktop').css('display', 'table-cell');
        }

        var arrowleft = parseInt($('.w_steps_desktop li.active').offset().left);
        var arrowtop = parseInt($('.w_steps_desktop li.active').offset().top);
        $('.steps_arrow').css('left', arrowleft + 15);
        //$('.steps_arrow').css('top', arrowtop + 60);
        $('.steps_arrow').css('top', 60);
        if (parseInt($('.steps_arrow').css('left')) == 36) {
            if ($('.w_steps_desktop li:first-child').attr('class') != 'active') {
                $('.steps_arrow').css('display', 'none');
            }
            else {
                $('.steps_arrow').css('display', 'block');
            }
        }
        else {
            $('.steps_arrow').css('display', 'block');
        }
    }


    function toolTip(event, toolTipID) {
        $(".tooltip-outter").hide(); // Hide open tooltips, if any

        if ($('html').hasClass('device-desktop') || $('html').hasClass('device-tablet')) {
            if (toolTipID == 'tooltip-outter-email-add') { tleft = 105; }
            else if (toolTipID == 'tooltip-outter-mtn') { tleft = 110; }
            else if (toolTipID == 'tooltip-acc-email') { tleft = 45; }
            else if (toolTipID == 'tooltip-outter-cmtn') { tleft = 40; }
            else if (toolTipID == 'tooltip-emailRules') { tleft = 40; }
            else if (toolTipID == 'tooltip-wname') { tleft = 60; }
            else if (toolTipID == 'tooltip-wpass') { tleft = 60; }
            else { tleft = 35; }

            var beforedocheight = ($(document).height());
            $('#' + toolTipID).css('left', ($(event.target).offset().left) + tleft);
            $('#' + toolTipID).show();

            //  alert($(event.target).offset().left);

            var iconspace = $(event.target).outerHeight() - $(event.target).height(); // padding for info icon, if any

            $('#' + toolTipID).addClass("top");
            $('#' + toolTipID).css('top', parseInt($(event.target).offset().top - $('.w_top-bar_desktop').outerHeight() + ($(event.target).height()) - 10 + iconspace));

            var top = parseInt($(event.target).offset().top - 120 + ($(event.target).height()) - 10);
            // console.log($(window).height() - top, $('.tooltip-outter:visible').outerHeight());


            if ($(document).height() - top < $('.tooltip-outter:visible').outerHeight() + $('.w_top-bar_desktop').outerHeight() + $('.footer').outerHeight() + 40) {
                $('#' + toolTipID).css('top', parseInt($(event.target).offset().top - $('.w_top-bar_desktop').outerHeight() - ($(event.target).height()) - $('#' + toolTipID).height() - 5 + (iconspace)))
                $('#' + toolTipID).removeClass("top");
            }
            // 120 - header height ; 5 - tooltip arrow /2; 85 - Footer height; 40 - padding on main class

            var outerWidth = ($(window).width() - $(".main").width()) / 2 + $(".main").width()
            var outerTooltip = ($('#' + toolTipID).offset().left + $('#' + toolTipID).width());

            if (outerTooltip > outerWidth) {
                $('#' + toolTipID).css("left", $('#' + toolTipID).offset().left - $('#' + toolTipID).width() - 75);
                $('#' + toolTipID).addClass('mrev');
            }
            else {
                $('#' + toolTipID).css('left', ($(event.target).offset().left) + tleft + 10);
                $('#' + toolTipID).removeClass('mrev');
            }


        }

        event.stopImmediatePropagation(); // To stop redirecting to other page when tooltip is open in Getting Started
    }
function tooltipMOut(toolTipID) {
    $('#' + toolTipID).hide();
}
/* Tooltip scripts */


function showLoader() {
    try{
       submitValue=1;
       window.onbeforeunload = function () { };	        
	   
    }catch(e){}
    
      try{
       setTimeout(function () {
       		$('.loader-overlay').show();
	    	$('.page-loader-text').show();
       		$('.page-loader').show();        				    	
	   }, 100);	    
	   
    }catch(e){}
}

function hideLoder() { 

  try{      
  		setTimeout(function () {
  			 $('.loader-overlay').hide();
    		 $('.page-loader-text').hide();   
       		 $('.page-loader').hide();      		    	
	    }, 100);    
   }catch(e){}
}


function showSpindle() {
    try{	       
	    $('.loader-overlay').show();
	    $('.page-loader-text').show();
	    $('.page-loader').show();	
    }catch(e){}
}
function hideSpindle() { 
 try{    
 	$('.loader-overlay').hide();
    $('.page-loader-text').hide();   
    $('.page-loader').hide();    
   }catch(e){}
}
/* popup scripts */
var popupsHt = 0;
function createPopup(PopupName, PopupWidth) {
    var windowWidth = parseInt($(window).width());
    var windowHeight = parseInt($(window).height());
    var bodyWidth = parseInt($('.page').width());
    var bodyHeight = parseInt($('body').height());
    var finalHeight = windowHeight >= bodyHeight ? windowHeight : bodyHeight;
    var finalWidth = windowWidth >= bodyWidth ? windowWidth : bodyWidth;
    $('#pop-overlay').css('width', finalWidth);
    $('#pop-overlay').css('height', finalHeight);
    $('#pop-overlay').css('display', 'block');
    $('#pop-overlay').click(function () { closePopup(); });

    popupsHt = parseInt($('#' + PopupName).height())
    $('.pop-box').css('height', popupsHt);
    $('.pop-box').css('width', PopupWidth);
    $('.pop-box').css('display', 'block');
    var wH = parseInt(finalHeight / 2);
    var pBH = [parseInt($('.pop-box').css('height'))] / 2;
    var wW = parseInt(finalWidth / 2);
    var pBW = [parseInt($('.pop-box').css('width'))] / 2;
    $('.pop-box').css('top', wH - pBH);
    $('.pop-box').css('left', wW - pBW);
    $('.pop-box').css('display', 'block');
    $('.pop-box').html($('#' + PopupName).html());
}

function closePopup() {
    $('.pop-overlay').html('');
    $('.pop-box').html('');
    $('.pop-overlay').hide();
    $('.pop-box').hide();
}


function isNumber(character) {	
	var digitsOnly = /^[0-9]*$/;
	if (digitsOnly.test(character)) {
		return true;
	} else {
		return false;
	}	
}
function removeCustomError(idName){
	var field = $("#"+idName).parsley();
	var hasError = $('#'+idName).hasClass('customError');
	if(hasError){
		$('#'+idName).removeClass("error");
		window.ParsleyUI.removeError(field, "customError");		
		$('#'+idName).removeClass("customError");
	}else{
		$('#'+idName).removeClass("error");
	}
}
function addCustomError(idName,message){
	var field = $("#"+idName).parsley();
	var hasError = $('#'+idName).hasClass('customError');
	if(hasError){
		window.ParsleyUI.editError(field, "customError",message);
		$('#'+idName).addClass("error");		
	}else{
		window.ParsleyUI.addError(field, "customError",message);
		$('#'+idName).addClass("error");
		$('#'+idName).addClass("customError");
	}
}

$('.close_tt').on('click', function () {
    var $this = $(this);
    $this.parent('div.tooltip-outter').hide();

});



var aims_ctcChatWindow = null;

function doOnVALinkClick(stAimsChatURl,appid,actuaCustomerlName,cusType,state) 
{
	var myWidth = 320;
	var myHeight = 620;
	var padding = 12;
	
	top.resizeTo(top.screen.availWidth - (myWidth + padding), top.screen.availHeight);
	top.moveTo(myWidth + padding, 0);
	

    if( aims_ctcChatWindow!=null && aims_ctcChatWindow.closed==false )
    {
		aims_ctcChatWindow.focus();
	}
    else
    {
		var chatWindowName = 'AIMSCTCCHATWINDOW';
		var width = screen.availWidth;
		var width = 320;
		var height =700;
		var aimsChatWindowFeatures = 'resizable=yes,left=0,top=0,width='+width+',height='+height;
	
		var srcTitle =document.title;
		srcTitle = srcTitle.replace("'","");
		
		var aimsurl = stAimsChatURl + "?appid=" +appid+ "&Source Title=" +
		 escape(srcTitle) + "&Source URL=" + escape(window.document.location)+ 
		"&name="+actuaCustomerlName +"&lob="+cusType+"&state="+state+"&selfInstall=N";
		
		aims_ctcChatWindow = window.open(aimsurl, chatWindowName,aimsChatWindowFeatures);
		
	}
}

function scrollToTarget( target){
    $('html, body').animate({
    	scrollTop: $(target).offset().top
    }, 100);
}

function confirm_Exit()	{
	if(submitValue == 0)	{		
		return "IMPORTANT: Your activation is not complete. This process will only take a few more minutes but will allow you to fully utilize your Verizon Broadband service."; 
	} 
}

function isCensoredWord(value){
	var censoredWordArr=new Array('ceo','director','help','news','services','aaa','aabb','aacc','anal','asdf','bastard','bitch','blowjob','butthead','cajones','cock','cocksucker','cum','damn','dickhead','dickwad','eee','fag','faggot','fart','fellatio','penis','pussy','schlong','shit','slut','spick','suck','tits','twat','shithead','yaho','geocities','contest','winner','promotion','remove','network','answer','enforcer','sheriff','unsub','raghead','osama','laden','hostmaster','usenet','news','www','uucp','ftp','noc','root','helpdesk','administrator','net_admin','netadmin','passwords','postoffice','director','treasurer','founder','cfo','ceo','vp','vp_marketing','vp_sales','vp_finance','vp_engineering','vp_operations','vpmarketing','vpsales','vpfinance','vpengineering','vpoperations','collections','accounts_receivable','accountsreceivable','asshole','cocksuck','cocksuck','horny','horny','cunt','cunt','sales','sales','support','security','password','password','fuck','fuck','abuse','nigger','nigger','admin','service','mail','abuse','postmaster','president','webmaster','yah0','verizon','billing','security','help','support','network');
	var censoredWordFound = false;
	for(var i=0;i<censoredWordArr.length;i++){	
		if(value == censoredWordArr[i]){			
			censoredWordFound =true;
			break;
		}
	}
	return censoredWordFound;		
}

function backToGS(url){
	try{
		window.onbeforeunload = function () { };
	}catch(e){}
	showLoader();
	window.location.href = $("#root").html()+'/'+url;
}

function doNext(url){
	try{
		window.onbeforeunload = function () { };
	}catch(e){}
	showLoader();
	window.location.href = $("#root").html()+'/'+url;
}

function downloadApp(url){
	submitValue=1
	window.location.href = url;
}