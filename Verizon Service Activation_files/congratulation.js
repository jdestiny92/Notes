
var startTime;
var endTime;
var clr; 
var pageTimer;
var refreshTimer;
var progressTimer;

$(document).ready(function () {	

	//$('#ActivationComplete').hide();
	//$('#ActivationFailed').hide();
	
	if($('#isNWGUser').html()=='true' || $('#isNWGUser').html()==true){
		pageTimer = parseInt($('#pageTimer').html());
		refreshTimer = parseInt($('#refreshTimer').html());
		progressTimer = pageTimer/100;
	
	    if($('#ActivateAccountProgress').length >0){
	        progressBarAnim(99);
	    }
	    
	    makeReleaseCall();
    }else{
    
	    if(($('#isSelfInstall').html()=='true' || $('#isSelfInstall').html()==true) 
	    	&& ($('#dataOnlyAcc').html()=='false' || $('#dataOnlyAcc').html()==false)){	
	 		/*$('#ActivateAccountProgressText').html('100% Complete');
			pageTimer = parseInt($('#pageTimer').html());
			highWd = (parseInt($('.progress').width()) / 100) * 100;
			$('.progress .meter').animate({ 'width': highWd + 'px' }, pageTimer);
			$(".progress .meter").finish();		*/
	 		
			setTimeout ( "siWizardRedirect()", 100);
	 	}else{
    		showSuccessContent();
    	}
    }       
});

function progressBarAnim(val) {
    highWd = (parseInt($('.progress').width()) / 100) * 100;
    $('.progress .meter').animate({ 'width': highWd + 'px' }, pageTimer);
    var cnt = 0;
    clr = setInterval(function () {
        cnt++;
        if (cnt <= val) {
            $('#ActivateAccountProgressText').html(cnt + '% Complete');
        }       
    }, progressTimer)
    
}

function makeReleaseCall(){
	try{
		updateSiteCatalyst();
	}catch(e){}
	startTime = new Date().getTime();
	 $.ajax({
		  type: "post",
		  url: $("#root").html()+"/nwgRelease",	
		  dataType: 'json',	  
		  cache: false,    		 
		  success: function(data){		   
		 
		    var result = data;
		    
		    if(result.releseStatus == 'SUCCESS'){
		    	setTimeout ( "makeStatusCall()", refreshTimer );
		    }else{
		   	   displayFailureMessage(result.releseStatus,'');
		    }  		  
		  },
		  error: function(){  	    
		   	setTimeout ( "makeStatusCall()", refreshTimer );
		  },timeout: 40000   
	  });	
}

function displaySuccessMessage(){

	callActivationEvent("Y");
		
	$('#ActivateAccountProgressText').html('100% Complete');
	$(".progress .meter").finish();
    clearInterval(clr);  
    
    if(($('#isSelfInstall').html()=='true' || $('#isSelfInstall').html()==true) 
    	&& ($('#dataOnlyAcc').html()=='false' || $('#dataOnlyAcc').html()==false)){	
    	try{
  		updateSiteCatalyst1();
	  	}catch(e){}
 		siWizardRedirect();
 	}else{
 		showSuccessContent();
 	} 	
}

function showSuccessContent(){
	 $('#ActivationProcess').hide();
     $('#ActivationFailed').hide();
     
     try{
  		updateSiteCatalyst1();
  	}catch(e){}
	congratulationsNewRedirect();  	
 }


function displayFailureMessage(status,duedate){
  try{
  	updateSiteCatalystFailure();
  }catch(e){}
  callActivationEvent("N");
	
  $('#ActivationProcess').hide();
  $('#ActivationComplete').hide();
  $('#ActivationCompleteButton').hide();
  $('#ActivationFailed').show();		
  
  //$('#activationInfo').html('Your account was registered, however, internet activation was not completed. You will be unable to connect to any other websites until this issue is resolved.');
  if(status == 'PENDING_ORDER'){
	if(duedate != ''){	
		$('#act01Message').html('Your Internet activation was temporarily delayed. This problem may resolve within a couple of hours. Please try again or contact Verizon for assistance.');
		showTechSupport('ACT02');
	  	$('#activationInfo').html('Your Registration was successful, however, you will be unable to connect to any other websites until activation is complete.');  	
	}else{
	  	$('#act01Message').html('Your Internet activation has been delayed. Please ensure you activate on or after your agreed upon installation date. Check verizon.com/whatsnext for all installation details.');
	  	showTechSupport('ACT02');
	  	$('#activationInfo').html('Your Registration was successful, however, you will be unable to connect to any other websites until activation is complete.');
  	}
  }else if(status == 'PENDING_MIGRATION'){		
	$('#act01Message').html('A network upgrade is in progress and scheduled to complete tonight. Please activate your service after this upgrade is completed. We apologize for this inconvenience (BAS06).<br/><br/>If you need immediate assistance, <a href="javascript:;" onclick="showTechSupport(\'BAS06\');">click here</a>.');	
  	$('#activationInfo').html('Your Registration was successful, however, you will be unable to connect to any other websites until activation is complete.');		
  }else if(status == 'RESTORE_IN_PROGRESS'){		
	$('#act01Message').html('Your Internet activation was temporarily delayed and will automatically activate within the next several minutes. We apologize for this inconvenience.');
  	showTechSupport('BAS05');
  	$('#activationInfo').html('Your Registration was successful, however, you will be unable to connect to any other websites until activation is complete.');		
  }else if(status == 'ROUTER_NOT_REACHABLE'){		
	$('#act01Message').html('A network outage was detected  in your area and your service will be automatically activated when the outage is cleared. We apologize for this inconvenience (BAS12).<br/><br/>If you need immediate assistance, <a href="javascript:;" onclick="showTechSupport(\'BAS12\');">click here</a>.');	
  	$('#activationInfo').html('Your Registration was successful, however, you will be unable to connect to any other websites until activation is complete.');		
  }else if(status == 'ROUTER_NOT_AVAIL'){		
	$('#act01Message').html('A network outage was detected  in your area and your service will be automatically activated when the outage is cleared. We apologize for this inconvenience (BAS13).<br/><br/>For an update on this issue, <a href="javascript:;" onclick="showTechSupport(\'BAS13\');">click here</a>.');  
  	$('#activationInfo').html('Your Registration was successful, however, you will be unable to connect to any other websites until activation is complete.');		
  }else if(status == 'E320_ERROR'){		
	$('#act01Message').html('Your Internet activation was temporarily delayed, but will be automatically activated within 24 hours. We apologize for this inconvenience (BAS11). <br/><br/>For an update on this issue, <a href="javascript:;" onclick="showTechSupport(\'BAS11\');">click here</a>.');  
  	$('#activationInfo').html('Your Registration was successful, however, you will be unable to connect to any other websites until activation is complete.');		
  }else if(status == 'MX960_ERROR'){		
	$('#act01Message').html('Your Internet activation was temporarily delayed, but will be automatically activated within 24 hours. We apologize for this inconvenience (BAS10). <br/><br/>For an update on this issue, <a href="javascript:;" onclick="showTechSupport(\'BAS10\');">click here</a>.');  
  	$('#activationInfo').html('Your Registration was successful, however, you will be unable to connect to any other websites until activation is complete.');		
  }else if(status == 'PENDING'){
	 $('#act01Message').html('Your Internet activation was temporarily delayed. This problem may resolve within a few minutes. Please try again or contact Verizon for assistance.');
	 showTechSupport('ACT01');  
  	$('#activationInfo').html('Your account was registered, however, Internet activation was not completed. This issue must be resolved before you can access the Internet.');
  }else if(status == 'ERROR' || status == 'FAILURE'){    
	$('#act01Message').html('Your Internet activation was temporarily delayed. This problem may resolve within a few minutes. Please try again or contact Verizon for assistance.');
  	showTechSupport('ACT03');  
  	$('#activationInfo').html('Your account was registered, however, Internet activation was not completed. You will be unable to connect to any other websites until this issue is resolved.');
  }
}

function checkNWGStatus(){
	makeStatusCall();
}

function showTechSupport(errorCode)
{
	$('#showSupportNumber').html('<p><strong>Please contact Verizon Support at: <span class="text-brand-3-active">1-800-Verizon (1-800-837-4966)</span></strong> and reference error code ('+errorCode+').</p> ');
}

function makeStatusCall(){
	 $.ajax({
		  type: "get",
		  url: $("#root").html()+"/nwgStatus"+"?no-cache="+Date.now(),
		  dataType: 'json',
		  cache: false,		  	 
		  success: function(data){
		  	
		  	endTime = new Date().getTime();
		  	
		  	var totalTimeTaken = (endTime - startTime);		 
		    var result = data;
		    
		    if(result.nwgStatus == 'SUCCESS'){
		    	displaySuccessMessage();
		    }
		    else if(result.nwgStatus == "PENDING_ORDER") {
		    		var duedate=result.nwgduedate;	         		
         		     displayFailureMessage('PENDING_ORDER',duedate);
         	}
         	else if(result.nwgStatus == "PENDING_MIGRATION") {
		    		var duedate=result.nwgduedate;	         		
         		     displayFailureMessage('PENDING_MIGRATION',duedate);
         	}
         	else if(result.nwgStatus == "RESTORE_IN_PROGRESS") {
		    		var duedate=result.nwgduedate;	         		
         		     displayFailureMessage('RESTORE_IN_PROGRESS',duedate);
         	}
         	else if(result.nwgStatus == "ROUTER_NOT_REACHABLE") {
		    		var duedate=result.nwgduedate;	         		
         		     displayFailureMessage('ROUTER_NOT_REACHABLE',duedate);
         	}
         	else if(result.nwgStatus == "ROUTER_NOT_AVAIL") {
		    		var duedate=result.nwgduedate;	         		
         		     displayFailureMessage('ROUTER_NOT_AVAIL',duedate);
         	}
         	else if(result.nwgStatus == "MX960_ERROR") {
		    		var duedate=result.nwgduedate;	         		
         		     displayFailureMessage('MX960_ERROR',duedate);
         	}
         	else if(result.nwgStatus == "E320_ERROR") {
		    		var duedate=result.nwgduedate;	         		
         		     displayFailureMessage('E320_ERROR',duedate);
         	}else{
		   	    if((totalTimeTaken) < pageTimer){	           		
         			setTimeout ( "checkNWGStatus()", refreshTimer );
         		}else{
         	         displayFailureMessage('PENDING','');
         	    }	  
		    }  		  
		  },
		  error: function(){ 
		  		endTime = new Date().getTime();		  	
		  		var totalTimeTaken = (endTime - startTime);
		  	 	    
		   		if((totalTimeTaken) < pageTimer){	           		
         			setTimeout ( "checkNWGStatus()", refreshTimer );
         		}else{
         	         displayFailureMessage('PENDING','');
         	    }
		  },timeout: 40000   
	  });	
}

function callActivationEvent(activationStatus){
	 $.ajax({
		  type: "post",
		  url: $("#root").html()+"/activationEvent",
		  cache: false,    		 
		  data:"status="+ activationStatus,
		  success: function(data){
		  			  
		  },
		  error: function(){  	
		   
		  }  
	  });	
}

function loaderCall1() {
    $('.page-overlay').show();
    $('.page-loader').show();
    $('.page-loader-text').show();
   // $('.page-loader-text').css('left', $('.page-loader').offset().left - 15);
   // $('.page-loader-text').css('top', $('.page-loader').offset().top + 90);
    setTimeout(function () {
        $('.page-overlay').hide();
        $('.page-loader').hide();
        $('.page-loader-text').hide();
    }, 6000);
}

function siWizardRedirect(){
	submitValue=1;
	window.location = $("#root").html()+"/siWizardRedirect";
}

function congratulationsNewRedirect(){
	submitValue=1;
	window.location = $("#root").html()+"/activationSuccess";
}

$('#form').parsley();