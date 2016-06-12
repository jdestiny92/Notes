var aims_use_html_available_default = "Click here to chat with an Agent";
var aims_use_html_unavailable = "Chat with an Agent not available at this moment.";
var aims_use_html_available_style = "cursor:pointer;color:#00afdb;font-weight:bold;";
var aims_use_html_unavailable_style = "cursor:default;color:DarkRed;font-weight:bold;";
var aims_use_html_available_class = null;
var aims_use_html_unavailable_class = null;
var aims_use_html_available_class_hover = null;
var aims_use_html_unavailable_class_hover = null;
var pacaf = new Array();var pacuf = new Array();var pacmuf = new Array();

var aims_availability_check_interval = "30000";
var aims_icon_type = 0;
var AimsChatStatusCount = 0;

var chatStatusSend = new Array();
var checkImageCounter = new Array();
// 0 = Insert icon as innerHTML inside specified id
// 1 = Insert icon after this id element in the page
// 2 = Insert the icon relative at this (x,y) location (aims_icon_x, aims_icon_y)
// 3 = Insert the icon absolute at this (x,y) location (aims_icon_x, aims_icon_y)

var chatInitDone = new Array();
//var preGlobalStatus = 'none';

var aims_icon_id = "aimsChatIcon";
var aims_icon_x_pos = 0;
var aims_icon_y_pos = 0;

// 0 = call the Page owners availability functions
// 1 = change the image src
// 2 = Load both unavailable and available images at load, but flip the display property
// 3 = Load the Availability icon only and make it invisible when chat is unavailable. This reserves the space occupied
// 4 = Load the Availability icon only and make it hidden when chat is unavailable

//var pauid = new Array();
// false means use html to display from aims_use_html_available and aims_use_html_unavailable

//dummy Methods. 
function aims_Chat_Available(pPRETreatmentId){}

//06/16/12
function aims_ParkingChat_UnAvailable(pPRETreatmentId){
	
document.getElementById("aimsparkinglayer").style.visibility="hidden";
}
//dummy method.
function aims_Chat_UnAvailable(pPRETreatmentId){}
//dummy method.
function aims_Chat_Mom_UnAvailable(pPRETreatmentId){}

var aims_i2c_sendImage = new Array();
var aims_i2c_commandImage = new Array();
var i2c_checkImageCounter = 0;
var aims_i2c_checkImgTimer = new Array();
var preGlobalStatusMap = new Array();

var aims_i2c_chat_available_function = new Array();
var aims_i2c_chat_unavailable_function = new Array();
var aims_i2c_chat_mom_unavailable_function = new Array();

var aimsChatType = new Array();

var chatInProgress = 'N';
var vaChatInProgress = 'N';
var vecProactiveSupp = 'N';
var isMobile = 'N';
var isTablet = 'N';
var isPhoenix = 'N';



function checkIfChatInProgress(){
    var chatInProgressCookie = readCookiePRE('CHAT_IN_PROGRESS');
    if ( chatInProgressCookie != null )
    {
        chatInProgress = chatInProgressCookie;
    }
    if ( chatInProgressCookie == null )
    {
        chatInProgress = 'N';
    }  
    
    var vaChatInProgressCookie = readCookiePRE('VA_CHAT_IN_PROGRESS');
    if ( vaChatInProgressCookie != null )
    {
        vaChatInProgress = vaChatInProgressCookie;
    }
    if ( vaChatInProgressCookie == null )
    {
        vaChatInProgress = 'N';
    }  
    
    var vecProactiveSuppCookie = readCookiePRE('VEC_NO_PROACTIVE_SHOW');
    //console.log('readCookiePRE:: vecProactiveSuppCookie VEC_NO_PROACTIVE_SHOW: ' + vecProactiveSuppCookie);
    if ( vecProactiveSuppCookie != null )
    {
        vecProactiveSupp = vecProactiveSuppCookie;
    }
    if ( vecProactiveSuppCookie == null )
    {
        vecProactiveSupp = 'N';
    } 
}

var aimsNCQueueStatus = "false";
function verizonChatAgentAvailability()
{
	return aimsNCQueueStatus;
}


function initiateVerizonChat(aimsInviteId) {
	
	try {
		
		if ( aimsInviteId == "B" ) {
			aims_setExtraCustomerInfo( "ChatType", "ClickToChat" );
		}
		else {
			aims_setExtraCustomerInfo( "ChatType", "InviteToChat" );
		}
	}
	catch (exIgnore){}
	
	try {
			aims_setExtraCustomerInfo( "referer", escape(window.document.location.href) );
	}
	catch (exIgnore){}
	
	
	try {
		var newPCSEnabled='N';
        if( aims_ctcChatWindow!=null && aims_ctcChatWindow.closed==false ){
            aims_ctcChatWindow.focus();
        }else{
            var chatWindowName ='AIMSCTCCHATWINDOW';
            var width = 520;
            var height = 570;
			
			//sadullah added the below code for scrollbars=yes for nwe PCS UI
				try {		
						 if ( newPCSTreatmentIdsArray != 'undefined' ) { 
							   for ( i=0; i<newPCSTreatmentIdsArray.length; i++  ) {
									if ( pPRETreatmentId == newPCSTreatmentIdsArray[i]) {
									   newPCSEnabled='Y';
										break; 
									} 
								} 
						} 
					}
				catch (exIgnore){}
				
			//var aimsChatWindowFeatures = 'left=30,top=10,width='+width+',height='+height;
			var aimsChatWindowFeatures;
			if(newPCSEnabled=='Y' || isPhoenix=='Y')
				aimsChatWindowFeatures = 'left=30,top=10,width='+width+',height='+height+',scrollbars=yes';
			else
				aimsChatWindowFeatures = 'left=30,top=10,width='+width+',height='+height;
				
				
			var temptreatID = "747"; //SIT 1210,  747 for STG and prod.
			
			if(typeof aims_customerInfoAppIdMap[temptreatID] == "undefined") {
				aims_customerInfoAppIdMap[temptreatID]=954;
			}
            
            var userAgent = navigator.userAgent.toLowerCase();
            if (userAgent.indexOf('iphone') != -1 || userAgent.indexOf('ipad') != -1 || userAgent.indexOf('android') != -1 ) 
            {
            	 aimsChatWindowFeatures = '';
            }
			
			if (isUserOnMobile() || isUserOnMobile2()) { 
				aimsChatWindowFeatures = '';
				isMobile = "Y";
			}
						
			aims_ctcChatWindow = window.open("javascript:false;", chatWindowName,aimsChatWindowFeatures);
			aims_ctcChatWindow.document.write( "<img src='" + aims_blank_image_url + "'/></img>");
			aims_ctcChatWindow.document.write("<form method=post name=AIMSCTCCHATFORM target=_self action='" +  PREBaseURL+ "/aims/encore/VZCTC.serv" + "'><input type=hidden name=strChatData value='" + aims_constructPostXml(temptreatID) + "'></form>");
			aims_ctcChatWindow.document.forms.AIMSCTCCHATFORM.submit();
             
        }
    
	} catch(Ign){
		//ignore this exception.
	}
	
	//Check do we need it
	//PREInvAcceptedCall(pPRETreatmentId);
}

function verizonChatEventListener(aimsPramName, aimsPramValue )
{
  //alert("Called Verizon Event listener with " + aimsPramName + "  and Value:" + aimsPramValue);
	if ((aimsPramName == null) || (aimsPramValue == null))
		return;
	
	
	
	try {

		if (isAIMSNC() != "true") return;

		var tempStr = "none";
		
		if (aimsPramName == "RULE_ID")
			tempStr = "vendorEvent.icoShown."+aimsPramValue;
		
		if (aimsPramName == "RULE_ID_ANA")
			tempStr = "vendorEvent.CF."+aimsPramValue;
			
		if (aimsPramName == "RULE_ID_CIP")
			tempStr = "vendorEvent.CIP."+aimsPramValue;
			
				
		if (aimsPramName == "ICON_ID_REJ")
			tempStr = "vendorEvent.invDeclined."+aimsPramValue;
		
		if (aimsPramName == "CHAT_BUTTON_ACCEP")
			tempStr = "vendorEvent.icoClicked."+aimsPramValue;
		
		if (aimsPramName == "CHAT_INVITE_ACCEP")
			tempStr = "vendorEvent.invAccepted."+aimsPramValue;
	
		if (tempStr != "none")
			 sendPREUpdates(tempStr);
		
	} catch(Ign){
		//ignore this exception.
	}
	
} // end of verizonChatEventListener


function aims_initializeChat(pPRETreatmentId){
	//start init only if not done.
	aims_sendImage[pPRETreatmentId] = true;
	checkImageCounter[pPRETreatmentId] = 0;
	chatStatusSend[pPRETreatmentId] = false;
	pacaf[pPRETreatmentId] = "aims_Chat_Available("+pPRETreatmentId+")";
	pacuf[pPRETreatmentId] = "aims_Chat_UnAvailable("+pPRETreatmentId+")"; 
	pacmuf[pPRETreatmentId] = "aims_Chat_Mom_UnAvailable("+pPRETreatmentId+")";
	chatInitDone[pPRETreatmentId] = false;
	if (!chatInitDone[pPRETreatmentId]){
		setTimeout(' aims_initializeChatActual(' + pPRETreatmentId + ')',100);
	}
}

function aims_initializeChatActual(pPRETreatmentId){
	//aims_constructChatIconStyles(); //method doesn't work
	try	{	
		aims_loadChatIcon(pPRETreatmentId);
	} catch (err) {
		setTimeout('aims_initializeChatActual('+ pPRETreatmentId + ')',500);
		return;
	}
	chatInitDone[pPRETreatmentId] = true;
	aims_constructChatPostForm(pPRETreatmentId);
	aims_startAvailabilityCheck(pPRETreatmentId);
	//PREstopRequest = true;
}

function aims_I2CInitialze(pPRETreatmentId) {
	//aims_i2c_sendImage[pPRETreatmentId] = true;
	aims_i2c_sendImage[pPRETreatmentId] = true;
	i2c_checkImageCounter[pPRETreatmentId] = 0;
	chatStatusSend[pPRETreatmentId] = false;
	aims_i2c_chat_available_function[pPRETreatmentId] = "aims_Chat_Available("+pPRETreatmentId+")";
	aims_i2c_chat_unavailable_function[pPRETreatmentId] = "aims_Chat_UnAvailable("+pPRETreatmentId+")"; 
	aims_i2c_chat_mom_unavailable_function[pPRETreatmentId] = "aims_Chat_Mom_UnAvailable("+pPRETreatmentId+")";
	setTimeout('aims_I2CInitialzeActual(' + pPRETreatmentId + ')',1500);
}

function aims_I2CInitialzeActual(pPRETreatmentId) {
	aims_i2c_chat_available_function[pPRETreatmentId] = "PREshowImage('true', 'true')";
	
	// change for vendor checks
	try
	{
		if (isAIMSNC() == "true") {
			aims_i2c_chat_available_function[pPRETreatmentId] = "aims_Chat_UnAvailable()";
		}

	}
	catch (ignoreError)
	{ // ignore 
	}
	
	//do nothing, dont show any thing.
	aims_i2c_chat_unavailable_function[pPRETreatmentId] = "aims_Chat_UnAvailable()";
	aims_i2c_checkChatAvailability(pPRETreatmentId);
}

//6/16
function aims_parkingInitialze(pPRETreatmentId) {
    i2c_checkImageCounter[pPRETreatmentId] = 0;
    chatStatusSend[pPRETreatmentId] = false;
    aims_i2c_chat_available_function[pPRETreatmentId] = "aims_Chat_Available("+pPRETreatmentId+")";
    aims_i2c_chat_unavailable_function[pPRETreatmentId] = "aims_ParkingChat_UnAvailable("+pPRETreatmentId+")"; 
    aims_i2c_chat_mom_unavailable_function[pPRETreatmentId] = "aims_Chat_Mom_UnAvailable("+pPRETreatmentId+")";		
   	aims_i2c_sendImage[pPRETreatmentId] = true;           
	setTimeout('aims_parkingInitialzeActual(' + pPRETreatmentId + ')',750);
}

function aims_parkingInitialzeActual(pPRETreatmentId) {
    aims_i2c_chat_available_function[pPRETreatmentId] = "PREParkingshowImage11('true', 'true')"
    aims_i2c_chat_unavailable_function[pPRETreatmentId] = "aims_ParkingChat_UnAvailable()";
    aims_i2c_checkChatAvailability(pPRETreatmentId);
	setTimeout('aims_parkingInitialzeActual('+ pPRETreatmentId + ')',30000);
}


var chatIconElements = new Array();
function aims_loadChatIcon(pPRETreatmentId){

	//vendor changes to supress AIMS chat rules.
	try
	{
		if (isAIMSNC() == "true") {
			return;
		}

	}
	catch (ignoreError)
	{ // ignore 
	}
	
	var chatIconElement = null;
	if ( typeof paift[pPRETreatmentId] == "undefined" )	{paift[pPRETreatmentId] = 1;}
	if( aims_icon_type == 0 ){ // 0 = Insert icon as innerHTML inside specified id
		chatIconElement = document.getElementById(aims_icon_id);
		if ( chatIconElement == null && PREMasterTreatment == true ){
			chatIconElement = document.getElementById(pacim[pPRETreatmentId] );
		}
		var aimsChatIconElements = document.getElementsByName(aims_icon_id);
		if( aimsChatIconElements.length > 0 ){
			for( var i=0; i<aimsChatIconElements.length; i++ ){
				var aimsChatIconElement = aimsChatIconElements[i];
				if( aimsChatIconElement.id == aims_icon_id ){
					chatIconElements[chatIconElements.length] = aimsChatIconElement;
				}
			}
		}else{
			if( document.getElementById(aims_icon_id)!=null ){
				chatIconElements[chatIconElements.length] = document.getElementById(aims_icon_id);
			}
		}
	}else if( aims_icon_type == 1 ){ // 1 = Insert icon after this id element in the page
		chatIconElement = document.createElement("<span id=aimsChatIcon></span>");
	    document.getElementById(aims_icon_id).insertBefore(chatIconElement);
	}else if( aims_icon_type == 2 ){ // 2 = Insert the icon relative at this (x,y) location (aims_icon_x, aims_icon_y)
		chatIconElement = document.createElement("<span id=aimsChatIcon style='position:relative; left:"+aims_icon_x_pos+"; top:"+aims_icon_y_pos+"; '></span>");
		document.body.appendChild( chatIconElement );
	}else if( aims_icon_type == 3 ){ // 3 = Insert the icon absolute at this (x,y) location (aims_icon_x, aims_icon_y)
		chatIconElement = document.createElement("<span id=aimsChatIcon style='position:absolute; left:"+aims_icon_x_pos+"; top:"+aims_icon_y_pos+"; '></span>");
		document.body.appendChild( chatIconElement );
	}
	if( chatIconElement!=null && pauid[pPRETreatmentId]==true ){
		if( paift[pPRETreatmentId] == 0 ){
			//html is constructed by the page owner, call the page owner provided methods when availability check returns
		}else if( paift[pPRETreatmentId] == 1 ){		
			if( chatIconElements.length > 0 ){
                pacaf[pPRETreatmentId] = 'for( var i=0; i<chatIconElements.length; i++ ){ chatIconElements[i].innerHTML = "<a href=\'javascript:void(0);\' onClick=\'setAimsChatType("+pPRETreatmentId+");aims_startChat("+pPRETreatmentId+");\'><img id=aimsChatIconAvailable src=\''+pacia[pPRETreatmentId]+'\' style=\'cursor:pointer;border:none;\' alt=\''+ isTreatmentClick2Call(pPRETreatmentId) +'\' ></a>" + ptoia[pPRETreatmentId]; }';
                pacuf[pPRETreatmentId] = 'for( var i=0; i<chatIconElements.length; i++ ){ chatIconElements[i].innerHTML = "<img id=aimsChatIconUnavailable src=\''+paciu[pPRETreatmentId]+'\' alt=\'LiveChatUnavailable\' >" + ptoimua[pPRETreatmentId]; }';
                pacmuf[pPRETreatmentId] = 'for( var i=0; i<chatIconElements.length; i++ ){ chatIconElements[i].innerHTML = "<img id=aimsChatIconMomUnavailable src=\''+pacimu[pPRETreatmentId]+'\' alt=\'LiveChatMomUnavailable\' >" + ptoiua[pPRETreatmentId]; }';              
			}else{
                pacaf[pPRETreatmentId] = 'document.getElementById("' + pacim[pPRETreatmentId] + '").innerHTML = "<a href=\'javascript:void(0);\' onClick=\'setAimsChatType("+pPRETreatmentId+");aims_startChat("+pPRETreatmentId+");\'><img id=aimsChatIconAvailable src=\''+pacia[pPRETreatmentId]+'\' style=\'cursor:pointer;border:none;\' alt=\''+ isTreatmentClick2Call(pPRETreatmentId) +'\' ></a>"' + ptoia[pPRETreatmentId];
                pacuf[pPRETreatmentId] = 'document.getElementById("' + pacim[pPRETreatmentId] + '").innerHTML = "<img id=aimsChatIconUnavailable src=\''+paciu[pPRETreatmentId]+'\' >"' + ptoia[pPRETreatmentId];
                pacmuf[pPRETreatmentId] = 'document.getElementById("' + pacim[pPRETreatmentId] + '").innerHTML = "<img id=aimsChatIconMomUnavailable src=\''+pacimu[pPRETreatmentId]+'\' >"' + ptoia[pPRETreatmentId];
			}
		}else if( paift[pPRETreatmentId] == 2 ){
			chatIconElement.innerHTML = "<img id=aimsChatIconUnavailable src='"+paciu[pPRETreatmentId]+"' style='display:inline;'>" + "<img id=aimsChatIconMomUnavailable src='"+pacimu[pPRETreatmentId]+"' style='display:inline;'>"
										+ "<img id=aimsChatIconAvailable src='"+pacia[pPRETreatmentId]+"' style='display:none;cursor:pointer;' alt='LiveChat' onClick='setAimsChatType("+pPRETreatmentId+");aims_startChat("+pPRETreatmentId+");' >";
			pacaf[pPRETreatmentId] = "document.getElementById('aimsChatIconUnavailable').style.display='none';document.getElementById('aimsChatIconAvailable').style.display='inline';document.getElementById('aimsChatIconMomUnavailable').style.display='none";
			pacuf[pPRETreatmentId] = "document.getElementById('aimsChatIconUnavailable').style.display='inline';document.getElementById('aimsChatIconAvailable').style.display='none';document.getElementById('aimsChatIconMomUnavailable').style.display='none";
			pacmuf[pPRETreatmentId] = "document.getElementById('aimsChatIconUnavailable').style.display='none';document.getElementById('aimsChatIconAvailable').style.display='none';document.getElementById('aimsChatIconMomUnavailable').style.display='inline";
		}else if( paift[pPRETreatmentId] == 3 ){
			chatIconElement.innerHTML = "<img id=aimsChatIconAvailable src='"+pacia[pPRETreatmentId]+"' style='visibility:hidden;cursor:pointer;' alt='LiveChat' onClick='setAimsChatType("+pPRETreatmentId+");aims_startChat("+pPRETreatmentId+");' >";
			pacaf[pPRETreatmentId] = "document.getElementById('aimsChatIconAvailable').style.visibility='visible';";
			pacuf[pPRETreatmentId] = "document.getElementById('aimsChatIconAvailable').style.visibility='hidden';";
		}else if( paift[pPRETreatmentId] == 4 ){
			chatIconElement.innerHTML = "<img id=aimsChatIconAvailable src='"+pacia[pPRETreatmentId]+"' style='display:none;cursor:pointer;' alt='LiveChat' onClick='setAimsChatType("+pPRETreatmentId+");aims_startChat("+pPRETreatmentId+");' >";
			pacaf[pPRETreatmentId] = "document.getElementById('aimsChatIconAvailable').style.display='inline';";
			pacuf[pPRETreatmentId] = "document.getElementById('aimsChatIconAvailable').style.display='none';";
		}
	}
	else if( chatIconElement!=null && pauid[pPRETreatmentId]==false ){
		var classesAvail = false;
		if( aims_use_html_available_class!=null && typeof aims_use_html_available_class != "undefined" 
		&& aims_use_html_unavailable_class!=null && typeof aims_use_html_unavailable_class != "undefined" 
		&& aims_use_html_available_class_hover!=null && typeof aims_use_html_available_class_hover != "undefined" 
		&& aims_use_html_unavailable_class_hover!=null && typeof aims_use_html_unavailable_class_hover != "undefined" ){
			classesAvail = true;
		}
		if( paift[pPRETreatmentId] == 0 ){
			//html is constructed by the page owner, call the page owner provided methods when availability check returns
		}else if( paift[pPRETreatmentId] == 1 ){
			if( classesAvail == false ){
				if( chatIconElements.length > 0 ){
					for( var i=0; i<chatIconElements.length; i++ ){ 
						chatIconElements[i].innerHTML = "<span id=aimsChatIconUnavailable style='"+aims_use_html_unavailable_style+"'>"+aims_use_html_unavailable+"</span>";
					}
					pacuf[pPRETreatmentId] = 'for( var i=0; i<chatIconElements.length; i++ ){ chatIconElements[i].innerHTML = "<span id=aimsChatIconAvailable style=\'"+aims_use_html_available_style+"\' alt=\'LiveChat\' onClick=\'setAimsChatType("+pPRETreatmentId+");aims_startChat("+pPRETreatmentId+");\' >"'+pauha[pPRETreatmentId]+'"</span>"; }';
					pacmuf[pPRETreatmentId] = 'for( var i=0; i<chatIconElements.length; i++ ){ chatIconElements[i].innerHTML = "<span id=aimsChatIconUnavailable style=\'"+aims_use_html_unavailable_style+"\'>"+aims_use_html_unavailable+"</span>"; }';
				}else{
					chatIconElement.innerHTML = "<span id=aimsChatIconUnavailable style='"+aims_use_html_unavailable_style+"'>"+aims_use_html_unavailable+"</span>";
					pacaf[pPRETreatmentId] = 'document.getElementById("'+ pacim[pPRETreatmentId] +'").innerHTML = "<span id=aimsChatIconAvailable style=\'"+aims_use_html_available_style+"\' alt=\'LiveChat\' onClick=\'setAimsChatType("+pPRETreatmentId+");aims_startChat("+pPRETreatmentId+");\' >"'+pauha[pPRETreatmentId]+'"</span>";';
					pacuf[pPRETreatmentId] = 'document.getElementById("' + pacim[pPRETreatmentId] + '").innerHTML = "<span id=aimsChatIconUnavailable style=\'"+aims_use_html_unavailable_style+"\'>"+aims_use_html_unavailable+"</span>";';
				}
			}else{
				if( chatIconElements.length > 0 ){
					for( var i=0; i<chatIconElements.length; i++ ){ 
						chatIconElements[i].innerHTML = "<span id=aimsChatIconUnavailable class='"+aims_use_html_unavailable_class+"' onMouseOver='this.className=\""+aims_use_html_unavailable_class_hover+"\"' onMouseOut='this.className=\""+aims_use_html_unavailable_class+"\"' >"+aims_use_html_unavailable+"</span>";
					}
					pacuf[pPRETreatmentId] = 'for( var i=0; i<chatIconElements.length; i++ ){ chatIconElements[i].innerHTML = "<span id=aimsChatIconAvailable class=\'\"+aims_use_html_available_class+\"\' onMouseOver=\'this.className=\\\""+aims_use_html_available_class_hover+"\\\"\' onMouseOut=\'this.className=\\\""+aims_use_html_available_class+"\\\"\' alt=\'LiveChat\' onClick=\'setAimsChatType("+pPRETreatmentId+");aims_startChat("+pPRETreatmentId+");\' >"'+pauha[pPRETreatmentId]+'"</span>"; }';
					pacmuf[pPRETreatmentId] = 'for( var i=0; i<chatIconElements.length; i++ ){ chatIconElements[i].innerHTML = "<span id=aimsChatIconUnavailable class=\'\"+aims_use_html_unavailable_class+\"\' onMouseOver=\'this.className=\\\""+aims_use_html_unavailable_class_hover+"\\\"\' onMouseOut=\'this.className=\\\""+aims_use_html_unavailable_class+"\\\"\' >"+aims_use_html_unavailable+"</span>"; }';
				}else{
					chatIconElement.innerHTML = "<span id=aimsChatIconUnavailable class='"+aims_use_html_unavailable_class+"' onMouseOver='this.className=\""+aims_use_html_unavailable_class_hover+"\"' onMouseOut='this.className=\""+aims_use_html_unavailable_class+"\"' >"+aims_use_html_unavailable+"</span>";
					pacaf[pPRETreatmentId] = 'document.getElementById("' + pacim[pPRETreatmentId] + '").innerHTML = "<span id=aimsChatIconAvailable class=\'\"+aims_use_html_available_class+\"\' onMouseOver=\'this.className=\\\""+aims_use_html_available_class_hover+"\\\"\' onMouseOut=\'this.className=\\\""+aims_use_html_available_class+"\\\"\' alt=\'LiveChat\' onClick=\'setAimsChatType("+pPRETreatmentId+");aims_startChat("+pPRETreatmentId+");\' >"'+pauha[pPRETreatmentId]+'"</span>";';
					pacuf[pPRETreatmentId] = 'document.getElementById("' + pacim[pPRETreatmentId] + '").innerHTML = "<span id=aimsChatIconUnavailable class=\'\"+aims_use_html_unavailable_class+\"\' onMouseOver=\'this.className=\\\""+aims_use_html_unavailable_class_hover+"\\\"\' onMouseOut=\'this.className=\\\""+aims_use_html_unavailable_class+"\\\"\' >"+aims_use_html_unavailable+"</span>";';
				}
			}
		}else if( paift[pPRETreatmentId] == 2 ){
			if( classesAvail == false ){
				chatIconElement.innerHTML = "<span id=aimsChatIconUnavailable style='"+aims_use_html_unavailable_style+";display:inline;"+"'>"+aims_use_html_unavailable+"</span>"
										+ "<span id=aimsChatIconAvailable style='"+aims_use_html_available_style+";display:none;"+"' alt='LiveChat' onClick='setAimsChatType("+pPRETreatmentId+");aims_startChat("+pPRETreatmentId+");' >"+pauha[pPRETreatmentId]+"</span>";
			}else{
				chatIconElement.innerHTML = "<span id=aimsChatIconUnavailable class='"+aims_use_html_unavailable_class+"' style='display:inline;' onMouseOver='this.className=\""+aims_use_html_unavailable_class_hover+"\"' onMouseOut='this.className=\""+aims_use_html_unavailable_class+"\"' >"+aims_use_html_unavailable+"</span>"
										+ "<span id=aimsChatIconAvailable class='"+aims_use_html_available_class+"' style='display:none;' onMouseOver='this.className=\""+aims_use_html_available_class_hover+"\"' onMouseOut='this.className=\""+aims_use_html_available_class+"\"' alt='LiveChat' onClick='setAimsChatType("+pPRETreatmentId+");aims_startChat("+pPRETreatmentId+");' >"+pauha[pPRETreatmentId]+"</span>";
			}
			pacaf[pPRETreatmentId] = "document.getElementById('aimsChatIconUnavailable').style.display='none';document.getElementById('aimsChatIconAvailable').style.display='inline';";
			pacuf[pPRETreatmentId] = "document.getElementById('aimsChatIconUnavailable').style.display='inline';document.getElementById('aimsChatIconAvailable').style.display='none';";
		}else if( paift[pPRETreatmentId] == 3 ){
			if( classesAvail == false ){
				chatIconElement.innerHTML = "<span id=aimsChatIconAvailable style='"+aims_use_html_available_style+";visibility:hidden;"+"' <a href='javascript:false;' alt='LiveChat' onClick='setAimsChatType();aims_startChat("+pPRETreatmentId+");' >"+pauha[pPRETreatmentId]+" </a> </span>";
			}else{
				chatIconElement.innerHTML = "<span id=aimsChatIconAvailable class='"+aims_use_html_available_class+"' style='visibility:hidden;' onMouseOver='this.className=\""+aims_use_html_available_class_hover+"\"' onMouseOut='this.className=\""+aims_use_html_available_class+"\"' alt='LiveChat' onClick='setAimsChatType();aims_startChat("+pPRETreatmentId+");' >"+pauha[pPRETreatmentId]+"</span>";
			}
			pacaf[pPRETreatmentId] = "document.getElementById('aimsChatIconAvailable').style.visibility='visible';";
			pacuf[pPRETreatmentId] = "document.getElementById('aimsChatIconAvailable').style.visibility='hidden';";
		}else if( paift[pPRETreatmentId] == 4 ){
			if( classesAvail == false ){
				chatIconElement.innerHTML = "<span id=aimsChatIconAvailable style='"+aims_use_html_available_style+";display:none;"+"' alt='LiveChat' onClick='setAimsChatType("+pPRETreatmentId+");aims_startChat("+pPRETreatmentId+");' >"+pauha[pPRETreatmentId]+"</span>";
			}else{
				chatIconElement.innerHTML = "<span id=aimsChatIconAvailable class='"+aims_use_html_available_class+"' style='display:none;' onMouseOver='this.className=\""+aims_use_html_available_class_hover+"\"' onMouseOut='this.className=\""+aims_use_html_available_class+"\"' alt='LiveChat' onClick='setAimsChatType("+pPRETreatmentId+");aims_startChat("+pPRETreatmentId+");' >"+pauha[pPRETreatmentId]+"</span>";
			}
			pacaf[pPRETreatmentId] = "document.getElementById('aimsChatIconAvailable').style.display='inline';";
			pacuf[pPRETreatmentId] = "document.getElementById('aimsChatIconAvailable').style.display='none';";
		}else if( paift[pPRETreatmentId] == 5 ){
            pacaf[pPRETreatmentId] = "setAimsChatType("+pPRETreatmentId+");aims_startChat("+pPRETreatmentId+")";
        }
	}
}

var NS = (document.layers) ? true : false; 
var IE = (document.all) ? true : false; 
var DOM = (document.getElementById) ? true : false; 
if (IE) DOM = false; 
var MAC = (navigator.platform) && (navigator.platform.toUpperCase().indexOf("MAC") >= 0); 
if (NS) MAC = false; 

var aims_commandImage = new Array(); 
var aims_sendImage = new Array();//true;
var aims_checkImgTimer = new Array(); //null;

function aims_startAvailabilityCheck(pPRETreatmentId){
	aims_checkChatAvailability(pPRETreatmentId);
	setInterval("aims_checkChatAvailability(" + pPRETreatmentId + ")",30000);
}

// Call this function when ever you want to check if chat is available or not
function aims_checkChatAvailability(pPRETreatmentId){
	 if ( aims_sendImage[pPRETreatmentId] ){ 
 		 aims_sendRequest(pPRETreatmentId);
 		 aims_checkImgTimer[pPRETreatmentId] = setInterval("aims_checkImage(" + pPRETreatmentId + ")", 1000);
	 }
}

function aims_sendRequest(pPRETreatmentId){ 
	 if (DOM && IE) { 
	 		 document.body.removeChild(aims_commandImage[pPRETreatmentId]); 
	 		 aims_commandImage[pPRETreatmentId] = document.createElement('IMG'); 
	 		 aims_commandImage[pPRETreatmentId].style.visibility = "hidden"; 
	 		 document.body.appendChild(aims_commandImage[pPRETreatmentId]); 
	 } 
	else if (!MAC) {
	 		 aims_commandImage[pPRETreatmentId] = new Image; 
	 } else if (MAC)
             aims_commandImage[pPRETreatmentId] = document.createElement('IMG');
	 var url = pre_chat_availability_url + "?" + aims_constructCheckAvailabilityURL(pPRETreatmentId);
	 aims_commandImage[pPRETreatmentId].src = url + "&id=" + Math.round(Math.random()*9999999999); 
	 aims_sendImage[pPRETreatmentId] = false;
	 checkImageCounter[pPRETreatmentId] =1;
}

function aims_checkImage(pPRETreatmentId){ 
	if (!aims_sendImage[pPRETreatmentId]){
		// check only  twice. 
 		 if ( aims_commandImage[pPRETreatmentId] !=null && !aims_commandImage[pPRETreatmentId].complete && checkImageCounter[pPRETreatmentId] < 3){ 
			 //aims_checkImgTimer = setInterval("aims_checkImage()", 1000);
			 //no need to annother setInterval.. because we already had one after sendRequest method is called.
			 checkImageCounter[pPRETreatmentId] ++;
 		 	 return; 
 		 } else if (checkImageCounter[pPRETreatmentId] >= 3){
				if( aims_checkImgTimer[pPRETreatmentId]!=null ){
		 			clearInterval( aims_checkImgTimer[pPRETreatmentId] );
		 			aims_checkImgTimer[pPRETreatmentId] = null;
				}
 		 }
 		 
 		if (aims_commandImage[pPRETreatmentId] ==null ){		 
			 return; }
 		 
 		 var w = aims_commandImage[pPRETreatmentId].width; 
 		 var h = aims_commandImage[pPRETreatmentId].height; 
 		 aims_sendImage[pPRETreatmentId] = true;
		 if( aims_checkImgTimer[pPRETreatmentId]!=null ){
		 	 clearInterval( aims_checkImgTimer[pPRETreatmentId] );
		 	 aims_checkImgTimer[pPRETreatmentId] = null;
		 }
		 if (aims_commandImage[pPRETreatmentId] !=null && aims_commandImage[pPRETreatmentId].complete ){ 
 		 	aims_checkChatAvailabilityResult(w,h,pPRETreatmentId); 
  		 }
 	 } 
}

function aims_checkChatAvailabilityResult( w, h , pPRETreatmentId ){
	var preupdateStr = "CF";
	if( typeof pPRETreatmentId == "undefined" ){
		pPRETreatmentId = 000;
	}
	if( typeof preGlobalStatusMap[pPRETreatmentId] == "undefined" ){
		preGlobalStatusMap[pPRETreatmentId] = 'NA';
	}	
	if( w=="1" && h=="1" ){	
		// Chat Available
		if (preGlobalStatusMap[pPRETreatmentId] != 'AVAIL'){
			eval(pacaf[pPRETreatmentId]);
			preupdateStr = "CT";
			preGlobalStatusMap[pPRETreatmentId] = 'AVAIL';
		}
		if(AimsChatStatusCount < 1) {
			if (typeof AimsChatStatus == 'function') {	
				AimsChatStatus("AA"); 
				AimsChatStatusCount = 1;
			}						
		}
		aimsNCQueueStatus = "true"; //for the new vendor chat avail function.
	}
	else{	
		//there can be two cases. Show Momentary un available or un available.
		//w=2, h=1 is for mom unavail.
		//w=3, h=1 is for unavail.
		// only for app id 532, for mobile click 2 call, customization.
		aimsNCQueueStatus = "false"; // for the new vendor chat avail function.
		
		try{
            if(aims_customerInfoAppIdMap[pPRETreatmentId] == 532) {
				
					if(AimsChatStatusCount < 1) {
						if (w=='3')
							AimsChatStatus("NA");
						else 
							AimsChatStatus("MA");

						AimsChatStatusCount = 1;	
					}
			}	
        }catch(ex){}
		
		
		if (w=='2' && h =='1' && typeof pacimu[pPRETreatmentId] != "undefined" ){
			if (preGlobalStatusMap[pPRETreatmentId] != 'MOMUNAVAIL'){
				eval(pacmuf[pPRETreatmentId]);
				preGlobalStatusMap[pPRETreatmentId] = 'MOMUNAVAIL';
			}
		} 
		else {
	 		// Chat not available
			//alert("Chat not Available.. Hide chat link");
			if (preGlobalStatusMap[pPRETreatmentId] != 'UNAVAIL'){
				eval(pacuf[pPRETreatmentId]);
				preGlobalStatusMap[pPRETreatmentId] = 'UNAVAIL';
			}
			if(AimsChatStatusCount < 1) {
				if (typeof AimsChatStatus == 'function') {	
					AimsChatStatus("NA"); 
					AimsChatStatusCount = 1;
				}						
			}
		}
	}
	
	if (chatStatusSend[pPRETreatmentId] == false){
		try	{
			chatStatusSend[pPRETreatmentId] = true;
			preupdateStr += '.'+ pPRETreatmentId;
			setTimeout('sendPREUpdates("' + preupdateStr + '")',4000); 
		} catch (Ex){
			//ignore.
		}
	}
}

var aims_ctcChatWindowMaster = new Array();
var aims_ctcChatWindow = null;
function aims_startChat(pPRETreatmentId){
	//alert("aims_startChat()");
	try {
		if ( aimsChatType[pPRETreatmentId].indexOf("C2C") != -1 ) {
			aims_setExtraCustomerInfo( "ChatType", "ClickToChat" );
		}
		else {
			aims_setExtraCustomerInfo( "ChatType", "InviteToChat" );
		}
	}
	catch (exIgnore){}
	
	try {
			aims_setExtraCustomerInfo( "referer", escape(window.document.location.href) );
	}
	catch (exIgnore){}
	
	try {
	var newPCSEnabled='N';
    if ( PREMasterTreatment ) {
        if( aims_ctcChatWindowMaster[pPRETreatmentId]!=null && aims_ctcChatWindowMaster[pPRETreatmentId].closed==false ){
            aims_ctcChatWindowMaster[pPRETreatmentId].focus();
    	}else{
            var chatWindowName ='AIMSCTCCHATWINDOW'+ pPRETreatmentId;;
            var width = 520;
    		var height = 570;			
			//sadullah added the below code for scrollbars=yes for nwe PCS UI
				try {		
						 if ( newPCSTreatmentIdsArray != 'undefined' ) { 
							   for ( i=0; i<newPCSTreatmentIdsArray.length; i++  ) {
									if ( pPRETreatmentId == newPCSTreatmentIdsArray[i]) {
									   newPCSEnabled='Y';
										break; 
									} 
								} 
						} 
					}
				catch (exIgnore){}
				
			//var aimsChatWindowFeatures = 'left=30,top=10,width='+width+',height='+height;
			var aimsChatWindowFeatures;
			if(newPCSEnabled=='Y' || isPhoenix=='Y')
				aimsChatWindowFeatures = 'left=30,top=10,width='+width+',height='+height+',scrollbars=yes';
			else
				aimsChatWindowFeatures = 'left=30,top=10,width='+width+',height='+height;
    		
            /*aims_ctcChatWindow[pPRETreatmentId] = window.open( aims_blank_image_url, chatWindowName, aimsChatWindowFeatures);
            document.forms["AIMSCTCCHATFORM"].strChatData.value = aims_constructPostXml(pPRETreatmentId);
    		document.forms["AIMSCTCCHATFORM"].action = pacu[pPRETreatmentId];
    		document.forms["AIMSCTCCHATFORM"].target = chatWindowName;
    		document.forms["AIMSCTCCHATFORM"].method = "POST"
    		document.forms["AIMSCTCCHATFORM"].submit();*/
            aims_ctcChatWindowMaster[pPRETreatmentId] = window.open("javascript:false;", chatWindowName,aimsChatWindowFeatures);
            aims_ctcChatWindowMaster[pPRETreatmentId].document.write( "<img src='" + aims_blank_image_url + "'/></img>");
            aims_ctcChatWindowMaster[pPRETreatmentId].document.write("<form method=post name=AIMSCTCCHATFORM target=_self action='" +  pacu[pPRETreatmentId] + "'><input type=hidden name=strChatData value='" + aims_constructPostXml(pPRETreatmentId) + "'></form>");
            aims_ctcChatWindowMaster[pPRETreatmentId].document.forms.AIMSCTCCHATFORM.submit();
        }
	} else {
        if( aims_ctcChatWindow!=null && aims_ctcChatWindow.closed==false ){
            aims_ctcChatWindow.focus();
        }else{
        
        	
            var chatWindowName ='AIMSCTCCHATWINDOW';
            var width = 520;
            var height = 570;
			
			//sadullah added the below code for scrollbars=yes for nwe PCS UI
				try {		
						 if ( newPCSTreatmentIdsArray != 'undefined' ) { 
							   for ( i=0; i<newPCSTreatmentIdsArray.length; i++  ) {
									if ( pPRETreatmentId == newPCSTreatmentIdsArray[i]) {
									   newPCSEnabled='Y';
										break; 
									} 
								} 
						} 
					}
				catch (exIgnore){}
				
           // var aimsChatWindowFeatures = 'left=30,top=10,width='+width+',height='+height;
            var aimsChatWindowFeatures;
			
			if (isPhoenixFlow(pPRETreatmentId)=='Y') { 
				isPhoenix = "Y";
			}
			
			if(newPCSEnabled=='Y' || isPhoenix=='Y')
				aimsChatWindowFeatures = 'left=30,top=10,width='+width+',height='+height+',scrollbars=yes';
			else
				aimsChatWindowFeatures = 'left=30,top=10,width='+width+',height='+height;
			
            var userAgent = navigator.userAgent.toLowerCase();
            if (userAgent.indexOf('iphone') != -1 || userAgent.indexOf('ipad') != -1 || userAgent.indexOf('android') != -1 ) 
            	{
            	 aimsChatWindowFeatures = '';
            	}
            if (isUserOnMobile() || isUserOnMobile2()) {
				aimsChatWindowFeatures = '';
				isMobile = "Y";
			}
            
            /*aims_ctcChatWindow[pPRETreatmentId] = window.open( aims_blank_image_url, chatWindowName, aimsChatWindowFeatures);
            document.forms["AIMSCTCCHATFORM"].strChatData.value = aims_constructPostXml(pPRETreatmentId);
            document.forms["AIMSCTCCHATFORM"].action = pacu[pPRETreatmentId];
            document.forms["AIMSCTCCHATFORM"].target = chatWindowName;
            document.forms["AIMSCTCCHATFORM"].method = "POST"
            document.forms["AIMSCTCCHATFORM"].submit();*/
            if(aims_customerInfoAppIdMap[pPRETreatmentId] == 556) 
             {
				var stt="<img src='" + aims_blank_image_url + "'/></img>";
				stt+="<form method=post name=AIMSCTCCHATFORM target=_self action='" +  pacu[pPRETreatmentId] + "'><input type=hidden name=strChatData value='" + aims_constructPostXml(pPRETreatmentId) + "'></form>";
				aims_ctcChatWindow = window.open("javascript:document.write(\""+stt+"\");document.forms[0].submit();", chatWindowName,aimsChatWindowFeatures);           
             } else 
             {
            	 aims_ctcChatWindow = window.open("javascript:false;", chatWindowName,aimsChatWindowFeatures);
	            aims_ctcChatWindow.document.write( "<img src='" + aims_blank_image_url + "'/></img>");
	            aims_ctcChatWindow.document.write("<form method=post name=AIMSCTCCHATFORM target=_self action='" +  pacu[pPRETreatmentId] + "'><input type=hidden name=strChatData value='" + aims_constructPostXml(pPRETreatmentId) + "'></form>");
	            aims_ctcChatWindow.document.forms.AIMSCTCCHATFORM.submit();
             }
        }
    }
	} catch(Ign){
		//ignore this exception.
	}
	//execAIMSHostMethod
	//call the actual host method. If host portal team wants to execute any thing upon the chat activiation, they need to defined this js method.
	try	{
		if ( typeof execAIMSHostMethod != "undefined" ){
			execAIMSHostMethod();
		}
	}
	catch (Ign){
		//ignore this exception.
	}
	PREInvAcceptedCall(pPRETreatmentId); 
 
}

function aims_constructChatPostForm(pTreatmentId){
	var aimsChatFormLength = 0;
	if ( typeof document.forms["AIMSCTCCHATFORM"] != "undefined"){
		aimsChatFormLength = document.forms["AIMSCTCCHATFORM"].length;
	}
	if ( aimsChatFormLength < 1) {
        var chatFormElement = document.createElement('span');
        chatFormElement.id = 'aimsChatForm';
        chatFormElement.style.display = 'none';
        document.body.appendChild( chatFormElement );
        chatFormElement.innerHTML = "<form name='AIMSCTCCHATFORM' target='AIMSCTCCHATWINDOW' method=POST action='"+pacu[pTreatmentId]+"'><input type=hidden name=strChatData value=''></form>";
    }
}
var aims_customerInfoAppIdMap = new Array();
var aims_customerInfo = new Array();
var aims_customerExtraInfo = new Array();
var aims_checkAvailabilityParams = new Array();

function aims_resetCustomerInfo(pTreatmentId){
	aims_customerInfo = new Array();
}

function aims_setCustomerAppId( pAppId, pPRETreatmentId  ){
	aims_customerInfoAppIdMap[pPRETreatmentId] = pAppId;
}

function aims_setCustomerInfo( paramName, paramValue ){
	switch( paramName ){

		case "APPID":
		case "NAME": 
		case "FIRST_NAME": 
		case "LAST_NAME": 
		case "TN": 
		case "STATE":
		case "ADDRESS":
		case "EMAIL":
		case "QUEUEID":
		case "BTN":
			aims_customerInfo[paramName] = paramValue;
			break;
		case "OTHER":
			aims_customerInfo[paramName] = paramValue;
			break;
	}
}

function aims_resetExtraCustomerInfo(){
	aims_customerExtraInfo = new Array();
}

function aims_setExtraCustomerInfo( paramName, paramValue ){
	
	if(paramName == "aimsInfo") return;
	
	var obj = new Object;
	obj.name = paramName;
	obj.value = paramValue; 
	if ( paramName == "ChatType" && containsName( aims_customerInfo, "ChatType" ) ){
		for( var i = 0; i < aims_customerInfo.length; i++ ) {
			if ( aims_customerInfo[i].name == "ChatType" ) { 
				aims_customerInfo[i].value = paramValue;
			}
		}
	}
	else {
		aims_customerInfo[aims_customerInfo.length] = obj;
	}
}

function aims_constructPostXml(pPRETreatmentId){
	var str = "<ctcpost>";
	str += aims_constructCustInfoXml(pPRETreatmentId);
	str += aims_constructExtraCustInfoXml(pPRETreatmentId);
	str += "</ctcpost>";
	return str;
}

function aims_constructCustInfoXml(pPRETreatmentId){
	var str = "";
	if( typeof aims_customerInfoAppIdMap[pPRETreatmentId] != "undefined" ){
		str += "<appid>" + aims_customerInfoAppIdMap[pPRETreatmentId] + "</appid>";
		if(aims_customerInfoAppIdMap[pPRETreatmentId] == 12) {
			str += "<QuestionCategory id=\"69\">My Verizon Bill (Payment Arrangement or Overdue Bill)</QuestionCategory>";
		}
        try{
            if(aims_customerInfoAppIdMap[pPRETreatmentId] == 954) {
                 if ( aimsFlow != "undefined" ){
                     aims_setExtraCustomerInfo ('other', aimsFlow);
                 }
            }
        }catch(ex){}
		
	}
	var name = null;
	if( typeof aims_customerInfo["NAME"] != "undefined" ){
		name = aims_customerInfo["NAME"];
	}
	if( typeof aims_customerInfo["FIRST_NAME"] != "undefined" ){
		if( name==null ) name = "";
		if( name!="" ) name += " ";
		name += aims_customerInfo["FIRST_NAME"];
	}
	if( typeof aims_customerInfo["LAST_NAME"] != "undefined" ){
		if( name==null ) name = "";
		if( name!="" ) name += " ";
		name += aims_customerInfo["LAST_NAME"];
	}
	if( name!=null ) {
		name = name.replace(/\\/, "");     
		name = name.replace(/'/, " ");     
		str += "<name>" + name + "</name>";
	}
	if( typeof aims_customerInfo["TN"] != "undefined" ){
		str += "<tn>" + aims_customerInfo["TN"] + "</tn>";
	}
	if( typeof aims_customerInfo["BTN"] != "undefined" ){
		str += "<btn>" + aims_customerInfo["BTN"] + "</btn>";
	}
	
	if( typeof aims_customerInfo["STATE"] != "undefined" ){
		str += "<state>" + aims_customerInfo["STATE"] + "</state>";
	}
	if( typeof aims_customerInfo["EMAIL"] != "undefined" ){
		str += "<email>" + aims_customerInfo["EMAIL"] + "</email>";
	}
	if( typeof aims_customerInfo["QUEUEID"] != "undefined" ){
		str += "<queue-id>" + aims_customerInfo["QUEUEID"] + "</queue-id>";
	}
	if( typeof aims_customerInfo["ADDRESS"] != "undefined" ){
		str += "<address>" + aims_customerInfo["ADDRESS"] + "</address>";
	}
	return str;
}

function aims_constructExtraCustInfoXml(pPRETreatmentId){
	var str = "<params>";
	for( var i=0; i<aims_customerInfo.length; i++ ){
		var replacedValue = aims_customerInfo[i].value;
		if(replacedValue!=null){
	        replacedValue = replacedValue.replace( '<', ' ' );
	        replacedValue = replacedValue.replace( '>', ' ' );
		}
		
		if(aims_customerInfo[i].name != null && aims_customerInfo[i].name.length>0 && aims_customerInfo[i].name.toUpperCase()=='SOURCE PAGE'){
			aims_customerInfo[i].name='SOURCE_PAGE';	
		}
		
		if(aims_customerInfo[i].name != null && aims_customerInfo[i].name.length>0 && aims_customerInfo[i].name.toUpperCase()=='ISMOBILE'){
			if(replacedValue!=null && replacedValue=='Y'){
				isMobile='Y';
			}
		}
		
		str += "<param><name>" + aims_customerInfo[i].name + "</name><value>" + replacedValue + "</value></param>";
	}
	//sadullah added this isPhoenix param
	str += "<param><name>isPhoenixFlow</name><value>" + isPhoenix + "</value></param>";
	str += "<param><name>isMobileFlow</name><value>" + isMobile + "</value></param>";
	return str + "</params>";	
}

function aims_resetCheckAvailabilityParam(){
	aims_checkAvailabilityParam = new Array();
}

function aims_sCAP( paramName ){
	switch( paramName ){

		case "APPID":
		case "STATE":
		case "OTHER":
			aims_checkAvailabilityParams[paramName] = ""; //not undefined
	}
// $$$ Maintain a map of map
}

function aims_constructCheckAvailabilityURL(pPRETreatmentId){	
	var str = "";
	if( typeof aims_checkAvailabilityParams["APPID"] != "undefined" ){
		str += "&appid=" + aims_customerInfoAppIdMap[pPRETreatmentId];
	}
	if( typeof aims_checkAvailabilityParams["STATE"] != "undefined" ){
		str += "&state=" + aims_customerInfo["STATE"];
	}
	if( typeof aims_checkAvailabilityParams["OTHER"] != "undefined" ){
		str += "&other=" + aims_customerInfo["OTHER"];
	}
	str += "&lob=Residential";
	if ( chatStatusSend[pPRETreatmentId] == false ) {
		str += "&initR=yes";
		var lPRESessionID = readPRESessionIDFromCookie();
		str += "&presessionid=" + lPRESessionID;
	}
	return str;
}

function aims_i2c_checkChatAvailabilityResult( w, h, pPRETreatmentId ){
	var preupdateStr = "CF";
	i2c_checkImageCounter[pPRETreatmentId] = 0;
    checkIfChatInProgress();
	if( typeof preGlobalStatusMap[pPRETreatmentId] == "undefined" ){
		preGlobalStatusMap[pPRETreatmentId] = 'NA';
	}

    if ( chatInProgress == 'Y'){
        preupdateStr = "CIP";
    }
	if( w=="1" && h=="1" ){	
	
			
		//change for VEC proactive suppression by Pedro
		if (isAIMSVECProactiveSuppressed(pPRETreatmentId) && vecProactiveSupp == "Y") {
			aims_i2c_chat_available_function[pPRETreatmentId] = "aims_Chat_UnAvailable()";
			//console.log('aimsctc:: vecProactiveSupp TRUE: ' + vecProactiveSupp);
			preupdateStr = "CIP";
		} else {
			// Chat Available
			//alert("Chat Available.. Show chat link");
			if (preGlobalStatusMap[pPRETreatmentId] != 'AVAIL'  && chatInProgress == 'N'){
				eval(aims_i2c_chat_available_function[pPRETreatmentId]);
				preupdateStr = "CT";
				preGlobalStatusMap[pPRETreatmentId] = 'AVAIL';
			}
		}
		
		if(AimsChatStatusCount < 1) {
			if (typeof AimsChatStatus == 'function') {	
				AimsChatStatus("AA"); 
				AimsChatStatusCount = 1;
			}						
		}			
	}
	else{	
		//there can be two cases. Show Momentary un available or un available.
		//w=3, h=1 is for mom unavail.
		//w=2, h=1 is for unavail.
	//	if (w=='2' && h =='1' && typeof pacimu[pPRETreatmentId] != "undefined" ){
		
		if (w=='2' && h =='1' && typeof paciu[pPRETreatmentId] != "undefined" ){
			if (preGlobalStatusMap[pPRETreatmentId] != 'MOMUNAVAIL'){
			//	eval(aims_i2c_chat_mom_unavailable_function[pPRETreatmentId]);
				eval(aims_i2c_chat_unavailable_function[pPRETreatmentId]);
				preGlobalStatusMap[pPRETreatmentId] = 'MOMUNAVAIL';
			}
		}else{
	 		// Chat not available
			//alert("Chat not Available.. Hide chat link");
			if (preGlobalStatusMap[pPRETreatmentId] != 'UNAVAIL'){
			//	eval(pacuf[pPRETreatmentId]);
				eval(aims_i2c_chat_unavailable_function[pPRETreatmentId]);
				preGlobalStatusMap[pPRETreatmentId] = 'UNAVAIL';
			}
			if(AimsChatStatusCount < 1) {
				if (typeof AimsChatStatus == 'function') {	
					AimsChatStatus("NA"); 
					AimsChatStatusCount = 1;
				}						
			}			
		}
	}
	
	if (chatStatusSend[pPRETreatmentId] == false){
		try{
			chatStatusSend[pPRETreatmentId] = true;
			preupdateStr += '.'+ pPRETreatmentId;
			//alert(preupdateStr);
			setTimeout('sendPREUpdates("' + preupdateStr + '")',4000);
		}
		catch (Ex){
			//ignore.
		}
	}
}

function aims_i2c_checkChatAvailability(pPRETreatmentId){
	 if ( aims_i2c_sendImage[pPRETreatmentId] ){ 
 		 aims_i2c_sendRequest(pPRETreatmentId);
 	//	 aims_checkImgTimer[pPRETreatmentId] = setInterval("aims_i2c_checkImage("+ pPRETreatmentId +")", 1000);
 		aims_checkImgTimer[pPRETreatmentId] = setTimeout("aims_i2c_checkImage("+ pPRETreatmentId +")", 1000);
	 }
}

function aims_i2c_sendRequest(pPRETreatmentId){ 
	 if (DOM && IE) { 
	 		 document.body.removeChild(aims_i2c_commandImage[pPRETreatmentId]); 
	 		 aims_i2c_commandImage[pPRETreatmentId] = document.createElement('IMG'); 
	 		 aims_i2c_commandImage[pPRETreatmentId].style.visibility = "hidden"; 
	 		 document.body.appendChild(aims_i2c_commandImage[pPRETreatmentId]); 
	 } 
	else if (!MAC) {
	 		 aims_i2c_commandImage[pPRETreatmentId] = new Image; 
	 } else if (MAC)
             aims_i2c_commandImage[pPRETreatmentId] = document.createElement('IMG');
	 var url = pre_chat_availability_url + "?" + aims_constructCheckAvailabilityURL(pPRETreatmentId);
	 aims_i2c_commandImage[pPRETreatmentId].src = url + "&id=" + Math.round(Math.random()*9999999999); 
	 aims_i2c_sendImage[pPRETreatmentId] = false;
	 i2c_checkImageCounter[pPRETreatmentId] =1;
}

function aims_i2c_checkImage(pPRETreatmentId){ 
	if (!aims_i2c_sendImage[pPRETreatmentId]){
		// check only  twice. 
 		 if (aims_i2c_commandImage[pPRETreatmentId] != null && !aims_i2c_commandImage[pPRETreatmentId].complete && i2c_checkImageCounter[pPRETreatmentId] < 3){ 
			 //aims_checkImgTimer = setInterval("aims_i2c_checkImage()", 1000);
			 //no need to annother setInterval.. because we already had one after sendRequest method is called.
			 i2c_checkImageCounter[pPRETreatmentId] ++;
 		 	 return; 
 		 } else if (i2c_checkImageCounter[pPRETreatmentId] >= 3){
				if( aims_i2c_checkImgTimer[pPRETreatmentId]!=null )
				{
		 			clearInterval( aims_i2c_checkImgTimer[pPRETreatmentId] );
		 			aims_i2c_checkImgTimer[pPRETreatmentId] = null;
				}
 		 }
 		 var w = aims_i2c_commandImage[pPRETreatmentId].width; 
 		 var h = aims_i2c_commandImage[pPRETreatmentId].height; 
 		 aims_i2c_sendImage[pPRETreatmentId] = true;

		 if( aims_i2c_checkImgTimer[pPRETreatmentId]!=null ){
		 	 clearInterval( aims_i2c_checkImgTimer[pPRETreatmentId] );
		 	 aims_i2c_checkImgTimer[pPRETreatmentId] = null;
		 }
		 if (aims_i2c_commandImage[pPRETreatmentId] != null && aims_i2c_commandImage[pPRETreatmentId].complete ){
 		 	aims_i2c_checkChatAvailabilityResult(w,h,pPRETreatmentId); 
 		 }
 	 } 
}

function decodeURL(text){
	var tmpStr = unescape(text);
	while( tmpStr.indexOf("%")!=-1 ) tmpStr = tmpStr.replace("%",":");
	return tmpStr;
} 

lastAimsPageSubmit = PREgetCurrentTime();
aimsRefreshDate = PREgetCurrentTime();

function submitHTMLSource(refresh, isPost){
	if(aimsRefreshDate >= lastAimsPageSubmit) {
		lastAimsPageSubmit = PREgetCurrentTime();
		
		var allowPageSource = isAllowedPageSource();
		if ( allowPageSource == 'true' ){
	        try{	
	            var pageSourceSpanElement = document.createElement('span');
	            pageSourceSpanElement.id = 'PREhiddenSpan';
	            pageSourceSpanElement.style.display = 'none';
	            document.body.appendChild( pageSourceSpanElement );
	            var ni = document.getElementById('PREhiddenSpan');
	            if(! (ni==null) || (ni=='null')){
	                ni.innerHTML ="<form name='PREhtmlSourceForm' id='PREhtmlSourceForm' method='post' action= '" + PRErequestUrl + "' target='PREmyFrame'><input type='hidden' name='PREhtmlSource' id='PREhtmlSource' value=''><input type='hidden' id='PREclientURL' name='PREclientURL' value=''><input name='pagesource' type='hidden' id='pagesource' value='true'><input name='pagerefresh' type='hidden' id='pagerefresh' value='" + refresh + "'></input></form><iframe name='PREmyFrame'  src='javascript:false;' width=450px height=200px frameborder=1></iframe>"
	                var strHtmlSource=document.getElementsByTagName('html')[0].outerHTML;	
	                try{
	                    if ( typeof strHtmlSource == "undefined" ){
	                        strHtmlSource = "";	    
	      			        if ( isPost == 'true' ) {
                            	strHtmlSource=document.getElementsByTagName('html')[0].innerHTML;
	      			        }
	                    } 
	                }catch (e){}
	
	                var elementHtmlSource=document.getElementById('PREhtmlSource') 
	                var elementClientURL=document.getElementById('PREclientURL')
	                var elementHtmlSourceForm=document.getElementById('PREhtmlSourceForm')
	
	                if(!(elementHtmlSource==null || elementHtmlSource=='null' || elementClientURL==null || elementClientURL=='null' || elementHtmlSourceForm==null || elementHtmlSourceForm=='null')){
	                    //elementHtmlSource.value=escape(strHtmlSource);	
	                    elementHtmlSource.value=strHtmlSource;			
	                    var url = escape(window.document.location);
	                    elementClientURL.value=decodeURL(url);
	                    elementHtmlSourceForm.submit();
	                }
	
	            }
	        }catch (e) {}
		}
	}
 }
 
 function readPRESessionIDFromCookie(){ 
 	try {
 	    // AIMSPRESESSIONIDSIT is used in all env, but having it as AIMSPRESESSIONID if there is any change in future.
 		var PRESessionIDLike = "AIMSPRESESSIONID"; 
 		var lCookieArray = document.cookie.split(';'); 
 		for( var i = 0; i < lCookieArray.length; i++ ) { 
 			var lCookieToken = lCookieArray[i];
 			if ( lCookieToken.indexOf( PRESessionIDLike ) != -1 ) {
 				var lSessionIDToken = lCookieToken.split('=');
 				return lSessionIDToken[1];
 			}
 		}
 	} catch( exception ){}
 	return "";
}
// resetPREGlobalStatus
function resetPGS( pPRETreatmentId ){
	preGlobalStatusMap[pPRETreatmentId] = 'NA';
}

function setAimsChatType(pPRETreatmentId){
	aimsChatType[pPRETreatmentId] = 'C2C';
}

function containsName( pArray, pParamName ){
	for( var i = 0; i < pArray.length; i++ ){if(pArray[i].name == pParamName ){return true;}}
	return false;
}

function isAllowedPageSource(){
	var doPageSource = "false";
	var OSName="Unknown OS";
	if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
	if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
	if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
	if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
	var BrowserName="Unknown Browser";
	if (navigator.userAgent.indexOf("MSIE")!=-1) BrowserName="MS IE";
	if (navigator.userAgent.indexOf("Safari")!=-1) BrowserName="Safari";
	if (navigator.userAgent.indexOf("Firefox")!=-1) BrowserName="Firefox";
	if (navigator.userAgent.indexOf("Chrome")!=-1) BrowserName="Chrome";
	if (navigator.userAgent.indexOf("Opera")!=-1) BrowserName="Opera";
	if (OSName=='Windows' && (BrowserName=='MS IE' || BrowserName=='Firefox' || BrowserName=='Chrome' || BrowserName=='Safari' || BrowserName=='Opera' )){return "true";}
	if (OSName=='Linux' && (BrowserName=='Firefox' || BrowserName=='Opera' )){return "true";}	
	if (OSName=='MacOS' && (BrowserName=='Firefox' || BrowserName=='Safari' )){return "true";}
	return doPageSource;
}

/*fadeIndex:optional(Min:1,Max:20)*/
function gradualHide(elmId, fadeIndex){
    var slownessIndex = 20; //min=1, max=20
    if( fadeIndex!=null && typeof fadeIndex!="undefined" ){
        slownessIndex = fadeIndex;
    }
    if(slownessIndex<1) { slownessIndex=1 }
    if(slownessIndex>20) { slownessIndex=20 }

    var elm = document.getElementById(elmId);
    if(elm!=null){
        if( elm.hiding==true ){ return; }else{  elm.hiding = true; callAimsChatStatusMeth("InviteIgnore"); }
        if( elm!=null && elm.style.display!="none"){
            var startIndex=10;
            for(var i=startIndex; i<=100; i+=(21-slownessIndex)){
                setTimeout("var elm=document.getElementById('"+elmId+"');dimElm(elm,"+(100-i)+");",(i-startIndex+1)*slownessIndex);
            }
            setTimeout("var elm=document.getElementById('"+elmId+"');dimElm(elm,100);elm.style.display='none';elm.hiding=false;",101*slownessIndex);
        }
    }
}

function dimElm(elm,opacity){
    if( elm.style.display!="none"){
        elm.style.opacity=(opacity/100);
        elm.style.filter="alpha(opacity="+opacity+")";
    }
}

function callAimsChatStatusMeth(eventName)
{
	try
	{
		if (typeof AimsChatStatus == 'function') {	
			AimsChatStatus(eventName); 
		}						
	} catch( exception ){}
}

//Method called by URC Order Confirmation page.
function callAIMSOrderConf()
{
try {
	PREstage="start";
	PRElastAction="order_none";
	PREsendPreRequest();
	} catch(Ign){
		//ignore this exception.
	}
}

function setCookieValue(cookieName,cookieValue,nDays) {
 var today = new Date();
 var expire = new Date();
 if (nDays==null || nDays==0) nDays=1;
 expire.setTime(today.getTime() + 3600000*24*nDays);
 document.cookie = cookieName+"="+escape(cookieValue)
                 + ";domain=verizon.com;expires="+expire.toGMTString();
}

//Method to get the current Y position
function getScrollY() {
  var scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    scrOfY = window.pageYOffset;
  } else if( document.body && document.body.scrollTop  ) {
    //DOM compliant
    scrOfY = document.body.scrollTop;
  } else if( document.documentElement && document.documentElement.scrollTop  ) {
    //IE6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;
  }
  return scrOfY + 90;
}

//Method to determine if device is mobile
function isUserOnMobile() {
	var index = navigator.appVersion.indexOf("Mobile");
	return (index > -1);
}
function isUserOnMobile2() {
	if ( navigator.userAgent.match(/Mobile/i) ) {
		return true;
	} else {
		return false;
	}
}
function isUserOniPad() {
	if ( navigator.userAgent.match(/iPad/i) ) {
		return true;
	} else {
		return false;
	}
}
//Method to determine if device is on firefox mobile
function isUserOnFireFoxMobile() {
	var index = navigator.appVersion.indexOf("fennec");
	return (index > -1);
}


 	var NS = (document.layers) ? true : false; 
 	var IE = (document.all) ? true : false; 
 	var DOM = (document.getElementById) ? true : false; 
 	if  (IE) 
 		DOM = false; 
 	var MAC = (navigator.platform) && (navigator.platform.toUpperCase().indexOf("MAC") >= 0); 
 	if  (NS) 
 		MAC = false; 
 	var PRErequestUrl="https://collaborateext.verizon.com/pre/pre/pre.serv"; 
 	var PREchatUrl='/ForYourHome/ClickToChat/ChatWindow.aspx?chatType=InviteToChat'; 
 	var PREcommandImage; 
 	var PREpageID; 
 	var PREtopWinowTitle=""; 
 	var PREstage="start"; 
 	var PREsendImage=true; 
 	var PREreqWaitCount=0; 
 	var PREimageLoading=false; 
 	var PREChatParams='width=472,height=320,menubar=no,scrollbars=0'; 
 	var PRElastAction="none"; 
 	var PREcmdName='FiosOR7001'; 
 	var PREPos=-30; 
 	var PREoldPos=PREPos; 
 	var Border=100; 
 	var PREHumanStep= 1; 
 	var PREDir=1; 
 	var PageXOffset=0; 
 	var PageYOffset=0; 
 	var PREAnimate=false; 
 	var PREShowImage=false; 
 	var PREParkingshowImage=false; 
 	var PreTop=-1; 
 	var PreLeft=-1; 
 	var PREFocusFlag=false;
 	var PREImageLoaded=false; 
 	var PreIconPosY=100; 
 	var PreIconPosX=0; 
 	var PREstopRequest=false; 
 	var PREimgName=null; 
 	var PREimageURL="https://collaborateext.verizon.com/pre/prescripts/images/"; 
 	var PREImageIconURL="https://collaborateext.verizon.com/pre/prescripts/images/"; 
 	var PREBaseURL="https://collaborateext.verizon.com"; 
 	var pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/ChatAvailabilityStatus.serv"; 
 	var aims_blank_image_url="https://collaborateext.verizon.com/pre/prescripts/images/AIMSChatLoading.gif"; 
 	var pacia=new Array(); 
 	var paciu=new Array(); 
 	var pacimu=new Array(); 
 	var pacu=new Array(); 
 	var pacim=new Array(); 
 	var pauid=new Array(); 
 	var paift=new Array(); 
 	var ptoia=new Array(); 
 	var ptoimua=new Array(); 
 	var ptoiua=new Array(); 
 	var PREMasterTreatment=false; 
 	var pauha=new Array(); 
 	var PREStickyIcon=false; 
 	var invDraggable=false; 
   var preParkingSide = "left";   
  var preflyoutcoords = "240px";  
  var preflyincoords = "8px";    
 	var isitDragged= false; 
 	var isitDragged1= false; 
 	var isparkingClicked= false; 
  	var	newPCSTreatmentIdsArray=[800,981,1054,818,805,1049,806,970,744,745,937,1000,851,853,863,894,804,958,799,926,988,802,989,1020,1021,1022,1023,1024,1025,1026,1027,753,943,931,747,749,920,994,870,786,807,864,999,803,1007,1008,1009,1010,752,854,867,987,825,1014,1015,1016,1017,1018,1019,1028,971,746,856,935,1040,1042,1043,1044,916,917,1005,819,840,893,1048,849,980,990,869,938,939,817,955,801,599,847,748,751,928,932,918,858,892,940,750,1058,645,647,860,934,646,1001,1002,1003,1051]; 
 	var userTrailFlag=true; 
	var preAccpCalltrysMax=10; 
 	var I2CFlag=false; 
 	var C2CFlag320 = true; var C2CFlag419 = true; var C2CFlag439 = true; var C2CFlag459 = true; var C2CFlag460 = true; var C2CFlag461 = true; var C2CFlag462 = true; var C2CFlag463 = true; var C2CFlag479 = true; var C2CFlag499 = true; var C2CFlag519 = true; var C2CFlag539 = true; var C2CFlag559 = true; var C2CFlag599 = true; var C2CFlag620 = true; var C2CFlag639 = true; var C2CFlag679 = true; var C2CFlag699 = true; var C2CFlag700 = true; var C2CFlag719 = true; var C2CFlag720 = true; var C2CFlag721 = true; var C2CFlag722 = true; var C2CFlag727 = true; var C2CFlag728 = true; var C2CFlag729 = true; var C2CFlag730 = true; var C2CFlag731 = true; var C2CFlag732 = true; var C2CFlag733 = true; var C2CFlag735 = true; var C2CFlag736 = true; var C2CFlag737 = true; var C2CFlag738 = true; var C2CFlag739 = true; var C2CFlag740 = true; var C2CFlag743 = true; var C2CFlag744 = true; var C2CFlag747 = true; var C2CFlag750 = true; var C2CFlag751 = true; var C2CFlag752 = true; var C2CFlag754 = true; var C2CFlag755 = true; var C2CFlag756 = true; var C2CFlag757 = true; var C2CFlag758 = true; var C2CFlag759 = true; var C2CFlag760 = true; var C2CFlag761 = true; var C2CFlag762 = true; var C2CFlag763 = true; var C2CFlag764 = true; var C2CFlag765 = true; var C2CFlag766 = true; var C2CFlag767 = true; var C2CFlag768 = true; var C2CFlag769 = true; var C2CFlag770 = true; var C2CFlag771 = true; var C2CFlag774 = true; var C2CFlag775 = true; var C2CFlag776 = true; var C2CFlag777 = true; var C2CFlag778 = true; var C2CFlag779 = true; var C2CFlag780 = true; var C2CFlag781 = true; var C2CFlag782 = true; var C2CFlag783 = true; var C2CFlag784 = true; var C2CFlag785 = true; var C2CFlag786 = true; var C2CFlag787 = true; var C2CFlag788 = true; var C2CFlag789 = true; var C2CFlag790 = true; var C2CFlag791 = true; var C2CFlag792 = true; var C2CFlag793 = true; var C2CFlag794 = true; var C2CFlag795 = true; var C2CFlag796 = true; var C2CFlag797 = true; var C2CFlag798 = true; var C2CFlag799 = true; var C2CFlag802 = true; var C2CFlag803 = true; var C2CFlag805 = true; var C2CFlag806 = true; var C2CFlag808 = true; var C2CFlag809 = true; var C2CFlag810 = true; var C2CFlag812 = true; var C2CFlag813 = true; var C2CFlag815 = true; var C2CFlag817 = true; var C2CFlag818 = true; var C2CFlag820 = true; var C2CFlag821 = true; var C2CFlag823 = true; var C2CFlag824 = true; var C2CFlag826 = true; var C2CFlag827 = true; var C2CFlag828 = true; var C2CFlag829 = true; var C2CFlag830 = true; var C2CFlag831 = true; var C2CFlag832 = true; var C2CFlag833 = true; var C2CFlag834 = true; var C2CFlag835 = true; var C2CFlag837 = true; var C2CFlag838 = true; var C2CFlag839 = true; var C2CFlag840 = true; var C2CFlag841 = true; var C2CFlag842 = true; var C2CFlag844 = true; var C2CFlag845 = true; var C2CFlag846 = true; var C2CFlag847 = true; var C2CFlag848 = true; var C2CFlag849 = true; var C2CFlag850 = true; var C2CFlag851 = true; var C2CFlag852 = true; var C2CFlag853 = true; var C2CFlag855 = true; var C2CFlag857 = true; var C2CFlag858 = true; var C2CFlag859 = true; var C2CFlag861 = true; var C2CFlag863 = true; var C2CFlag864 = true; var C2CFlag865 = true; var C2CFlag866 = true; var C2CFlag867 = true; var C2CFlag868 = true; var C2CFlag869 = true; var C2CFlag871 = true; var C2CFlag873 = true; var C2CFlag874 = true; var C2CFlag875 = true; var C2CFlag876 = true; var C2CFlag877 = true; var C2CFlag878 = true; var C2CFlag879 = true; var C2CFlag881 = true; var C2CFlag881 = true; var C2CFlag882 = true; var C2CFlag883 = true; var C2CFlag885 = true; var C2CFlag886 = true; var C2CFlag887 = true; var C2CFlag888 = true; var C2CFlag891 = true; var C2CFlag892 = true; var C2CFlag893 = true; var C2CFlag895 = true; var C2CFlag906 = true; var C2CFlag907 = true; var C2CFlag908 = true; var C2CFlag909 = true; var C2CFlag910 = true; var C2CFlag911 = true; var C2CFlag912 = true; var C2CFlag915 = true; var C2CFlag916 = true; var C2CFlag917 = true; var C2CFlag919 = true; var C2CFlag920 = true; var C2CFlag921 = true; var C2CFlag922 = true; var C2CFlag923 = true; var C2CFlag924 = true; var C2CFlag925 = true; var C2CFlag926 = true; var C2CFlag927 = true; var C2CFlag929 = true; var C2CFlag930 = true; var C2CFlag932 = true; var C2CFlag933 = true; var C2CFlag934 = true; var C2CFlag935 = true; var C2CFlag937 = true; var C2CFlag939 = true; var C2CFlag941 = true; var C2CFlag943 = true; var C2CFlag944 = true; var C2CFlag951 = true; var C2CFlag953 = true; var C2CFlag954 = true; var C2CFlag955 = true; var C2CFlag956 = true; var C2CFlag957 = true; var C2CFlag958 = true; var C2CFlag959 = true; var C2CFlag960 = true; var C2CFlag961 = true; var C2CFlag962 = true; var C2CFlag971 = true; var C2CFlag972 = true; var C2CFlag973 = true; var C2CFlag974 = true; var C2CFlag975 = true; var C2CFlag976 = true; var C2CFlag977 = true; var C2CFlag978 = true; var C2CFlag979 = true; var C2CFlag980 = true; var C2CFlag981 = true; var C2CFlag982 = true; var C2CFlag988 = true; var C2CFlag991 = true; var C2CFlag992 = true; var C2CFlag994 = true; var C2CFlag995 = true; var C2CFlag996 = true; var C2CFlag999 = true; var C2CFlag1001 = true; var C2CFlag1003 = true; var C2CFlag1004 = true; var C2CFlag1005 = true; var C2CFlag1006 = true; var C2CFlag1007 = true; var C2CFlag1008 = true; var C2CFlag1009 = true; var C2CFlag1010 = true; var C2CFlag1012 = true; var C2CFlag1013 = true; var C2CFlag1020 = true; var C2CFlag1021 = true; var C2CFlag1022 = true; var C2CFlag1023 = true; var C2CFlag1024 = true; var C2CFlag1025 = true; var C2CFlag1026 = true; var C2CFlag1027 = true; var C2CFlag1028 = true; var C2CFlag1029 = true; var C2CFlag1030 = true; var C2CFlag1031 = true; var C2CFlag1032 = true; var C2CFlag1033 = true; var C2CFlag1034 = true; var C2CFlag1035 = true; var C2CFlag1036 = true; var C2CFlag1037 = true; var C2CFlag1038 = true; var C2CFlag1039 = true; var C2CFlag1040 = true; var C2CFlag1041 = true; var C2CFlag1042 = true; var C2CFlag1043 = true; var C2CFlag1044 = true; var C2CFlag1045 = true; var C2CFlag1046 = true; var C2CFlag1047 = true; var C2CFlag1049 = true; var C2CFlag1050 = true; var C2CFlag1051 = true; var C2CFlag1052 = true; var C2CFlag1053 = true; var C2CFlag1054 = true; var C2CFlag1055 = true; var C2CFlag1056 = true; var C2CFlag1057 = true; var C2CFlag1059 = true; var C2CFlag1062 = true; var C2CFlag1063 = true; var C2CFlag1064 = true; var C2CFlag1065 = true; 
 	//pacie:aimsChatIconElement pacim:aimsChatIconMap pauid:aims_use_icon_display paift:aims_icon_flip_type pacia:aims_chat_icon_available paciu:aims_chat_icon_unavailable pacimu:aims_chat_icon_mom_unavailable pacu:aims_chat_url pauha:aims_use_html_available ptoia:pre_text_over_icon_available ptoimua:pre_text_over_icon_mom_un_available ptoiua:pre_text_over_icon_un_available 
 function PREhandleImageCommand(w,h) {
 	  if(w==1 && h==1) return;
 	  if(w==2 && h==1) PREstopRequest = true;
else if(w==3 && h==1){PREshow3();}else if(w==4 && h==1){PREshow4();}else if(w==8 && h==3){PREshow299();}else if(w==9 && h==3){PREshow305();}else if(w==2 && h==4){PREshow320();}else if(w==3 && h==4){PREshow339();}else if(w==4 && h==4){PREshow340();}else if(w==6 && h==4){PREshow359();}else if(w==7 && h==4){PREshow360();}else if(w==9 && h==4){PREshow362();}else if(w==3 && h==5){PREshow419();}else if(w==4 && h==5){PREshow439();}else if(w==5 && h==5){PREshow459();}else if(w==6 && h==5){PREshow460();}else if(w==7 && h==5){PREshow461();}else if(w==8 && h==5){PREshow462();}else if(w==9 && h==5){PREshow463();}else if(w==1 && h==6){PREshow479();}else if(w==2 && h==6){PREshow499();}else if(w==3 && h==6){PREshow519();}else if(w==4 && h==6){PREshow539();}else if(w==5 && h==6){PREshow559();}else if(w==8 && h==6){PREshow599();}else if(w==1 && h==7){PREshow620();}else if(w==2 && h==7){PREshow639();}else if(w==8 && h==8){PREshow679();}else if(w==9 && h==8){PREshow699();}else if(w==1 && h==9){PREshow700();}else if(w==2 && h==9){PREshow719();}else if(w==3 && h==9){PREshow720();}else if(w==4 && h==9){PREshow721();}else if(w==5 && h==9){PREshow722();}else if(w==1 && h==10){PREshow727();}else if(w==2 && h==10){PREshow728();}else if(w==3 && h==10){PREshow729();}else if(w==4 && h==10){PREshow730();}else if(w==5 && h==10){PREshow731();}else if(w==6 && h==10){PREshow732();}else if(w==7 && h==10){PREshow733();}else if(w==8 && h==10){PREshow734();}else if(w==9 && h==10){PREshow735();}else if(w==1 && h==11){PREshow736();}else if(w==2 && h==11){PREshow737();}else if(w==3 && h==11){PREshow738();}else if(w==4 && h==11){PREshow739();}else if(w==5 && h==11){PREshow740();}else if(w==8 && h==11){PREshow743();}else if(w==9 && h==11){PREshow744();}else if(w==1 && h==12){PREshow745();}else if(w==2 && h==12){PREshow746();}else if(w==3 && h==12){PREshow747();}else if(w==4 && h==12){PREshow748();}else if(w==5 && h==12){PREshow749();}else if(w==6 && h==12){PREshow750();}else if(w==7 && h==12){PREshow751();}else if(w==8 && h==12){PREshow752();}else if(w==9 && h==12){PREshow753();}else if(w==1 && h==13){PREshow754();}else if(w==2 && h==13){PREshow755();}else if(w==3 && h==13){PREshow756();}else if(w==4 && h==13){PREshow757();}else if(w==5 && h==13){PREshow758();}else if(w==6 && h==13){PREshow759();}else if(w==7 && h==13){PREshow760();}else if(w==8 && h==13){PREshow761();}else if(w==9 && h==13){PREshow762();}else if(w==1 && h==14){PREshow763();}else if(w==2 && h==14){PREshow764();}else if(w==3 && h==14){PREshow765();}else if(w==4 && h==14){PREshow766();}else if(w==5 && h==14){PREshow767();}else if(w==6 && h==14){PREshow768();}else if(w==7 && h==14){PREshow769();}else if(w==8 && h==14){PREshow770();}else if(w==9 && h==14){PREshow771();}else if(w==1 && h==15){PREshow772();}else if(w==2 && h==15){PREshow773();}else if(w==3 && h==15){PREshow774();}else if(w==4 && h==15){PREshow775();}else if(w==5 && h==15){PREshow776();}else if(w==6 && h==15){PREshow777();}else if(w==7 && h==15){PREshow778();}else if(w==8 && h==15){PREshow779();}else if(w==9 && h==15){PREshow780();}else if(w==1 && h==16){PREshow781();}else if(w==2 && h==16){PREshow782();}else if(w==3 && h==16){PREshow783();}else if(w==4 && h==16){PREshow784();}else if(w==5 && h==16){PREshow785();}else if(w==6 && h==16){PREshow786();}else if(w==7 && h==16){PREshow787();}else if(w==8 && h==16){PREshow788();}else if(w==9 && h==16){PREshow789();}else if(w==1 && h==17){PREshow790();}else if(w==2 && h==17){PREshow791();}else if(w==3 && h==17){PREshow792();}else if(w==3 && h==17){PREshow793();}else if(w==4 && h==17){PREshow794();}else if(w==5 && h==17){PREshow795();}else if(w==6 && h==17){PREshow796();}else if(w==7 && h==17){PREshow797();}else if(w==8 && h==17){PREshow798();}else if(w==9 && h==17){PREshow799();}else if(w==1 && h==18){PREshow800();}else if(w==2 && h==18){PREshow801();}else if(w==3 && h==18){PREshow802();}else if(w==4 && h==18){PREshow803();}else if(w==5 && h==18){PREshow804();}else if(w==6 && h==18){PREshow805();}else if(w==7 && h==18){PREshow806();}else if(w==8 && h==18){PREshow807();}else if(w==9 && h==18){PREshow808();}else if(w==1 && h==19){PREshow809();}else if(w==2 && h==19){PREshow810();}else if(w==3 && h==19){PREshow811();}else if(w==4 && h==19){PREshow812();}else if(w==5 && h==19){PREshow813();}else if(w==6 && h==19){PREshow814();}else if(w==7 && h==19){PREshow815();}else if(w==8 && h==19){PREshow816();}else if(w==9 && h==19){PREshow817();}else if(w==1 && h==20){PREshow818();}else if(w==2 && h==20){PREshow819();}else if(w==3 && h==20){PREshow820();}else if(w==4 && h==20){PREshow821();}else if(w==5 && h==20){PREshow822();}else if(w==6 && h==20){PREshow823();}else if(w==7 && h==20){PREshow824();}else if(w==8 && h==20){PREshow825();}else if(w==9 && h==20){PREshow826();}else if(w==1 && h==21){PREshow827();}else if(w==2 && h==21){PREshow828();}else if(w==3 && h==21){PREshow829();}else if(w==4 && h==21){PREshow830();}else if(w==5 && h==21){PREshow831();}else if(w==6 && h==21){PREshow832();}else if(w==7 && h==21){PREshow833();}else if(w==8 && h==21){PREshow834();}else if(w==9 && h==21){PREshow835();}else if(w==1 && h==22){PREshow836();}else if(w==2 && h==22){PREshow837();}else if(w==3 && h==22){PREshow838();}else if(w==4 && h==22){PREshow839();}else if(w==5 && h==22){PREshow840();}else if(w==6 && h==22){PREshow841();}else if(w==7 && h==22){PREshow842();}else if(w==8 && h==22){PREshow843();}else if(w==9 && h==22){PREshow844();}else if(w==1 && h==23){PREshow845();}else if(w==1 && h==23){PREshow846();}else if(w==2 && h==23){PREshow847();}else if(w==3 && h==23){PREshow848();}else if(w==4 && h==23){PREshow849();}else if(w==5 && h==23){PREshow850();}else if(w==6 && h==23){PREshow851();}else if(w==7 && h==23){PREshow852();}else if(w==8 && h==23){PREshow853();}else if(w==9 && h==23){PREshow854();}else if(w==9 && h==23){PREshow855();}else if(w==1 && h==24){PREshow856();}else if(w==2 && h==24){PREshow857();}else if(w==3 && h==24){PREshow858();}else if(w==4 && h==24){PREshow859();}else if(w==5 && h==24){PREshow860();}else if(w==6 && h==24){PREshow861();}else if(w==7 && h==24){PREshow863();}else if(w==8 && h==24){PREshow864();}else if(w==9 && h==24){PREshow865();}else if(w==1 && h==25){PREshow866();}else if(w==2 && h==25){PREshow867();}else if(w==3 && h==25){PREshow868();}else if(w==4 && h==25){PREshow869();}else if(w==5 && h==25){PREshow870();}else if(w==6 && h==25){PREshow871();}else if(w==7 && h==25){PREshow872();}else if(w==8 && h==25){PREshow873();}else if(w==9 && h==25){PREshow874();}else if(w==1 && h==26){PREshow875();}else if(w==2 && h==26){PREshow876();}else if(w==3 && h==26){PREshow877();}else if(w==4 && h==26){PREshow878();}else if(w==5 && h==26){PREshow879();}else if(w==6 && h==26){PREshow880();}else if(w==7 && h==26){PREshow881();}else if(w==7 && h==26){PREshow881();}else if(w==8 && h==26){PREshow882();}else if(w==9 && h==26){PREshow883();}else if(w==1 && h==27){PREshow884();}else if(w==2 && h==27){PREshow885();}else if(w==3 && h==27){PREshow886();}else if(w==4 && h==27){PREshow887();}else if(w==5 && h==27){PREshow888();}else if(w==6 && h==27){PREshow889();}else if(w==7 && h==27){PREshow890();}else if(w==8 && h==27){PREshow891();}else if(w==9 && h==27){PREshow892();}else if(w==1 && h==28){PREshow893();}else if(w==2 && h==28){PREshow894();}else if(w==3 && h==28){PREshow895();}else if(w==4 && h==28){PREshow896();}else if(w==5 && h==28){PREshow897();}else if(w==6 && h==28){PREshow898();}else if(w==7 && h==28){PREshow899();}else if(w==8 && h==28){PREshow900();}else if(w==9 && h==28){PREshow901();}else if(w==1 && h==29){PREshow902();}else if(w==2 && h==29){PREshow903();}else if(w==3 && h==29){PREshow904();}else if(w==4 && h==29){PREshow905();}else if(w==5 && h==29){PREshow906();}else if(w==6 && h==29){PREshow907();}else if(w==7 && h==29){PREshow908();}else if(w==8 && h==29){PREshow909();}else if(w==9 && h==29){PREshow910();}else if(w==1 && h==30){PREshow911();}else if(w==2 && h==30){PREshow912();}else if(w==3 && h==30){PREshow913();}else if(w==4 && h==30){PREshow914();}else if(w==5 && h==30){PREshow915();}else if(w==6 && h==30){PREshow916();}else if(w==7 && h==30){PREshow917();}else if(w==8 && h==30){PREshow918();}else if(w==9 && h==30){PREshow919();}else if(w==1 && h==31){PREshow920();}else if(w==2 && h==31){PREshow921();}else if(w==3 && h==31){PREshow922();}else if(w==4 && h==31){PREshow923();}else if(w==5 && h==31){PREshow924();}else if(w==6 && h==31){PREshow925();}else if(w==7 && h==31){PREshow926();}else if(w==8 && h==31){PREshow927();}else if(w==9 && h==31){PREshow928();}else if(w==1 && h==32){PREshow929();}else if(w==2 && h==32){PREshow930();}else if(w==3 && h==32){PREshow931();}else if(w==4 && h==32){PREshow932();}else if(w==5 && h==32){PREshow933();}else if(w==6 && h==32){PREshow934();}else if(w==7 && h==32){PREshow935();}else if(w==8 && h==32){PREshow936();}else if(w==9 && h==32){PREshow937();}else if(w==1 && h==33){PREshow938();}else if(w==2 && h==33){PREshow939();}else if(w==3 && h==33){PREshow940();}else if(w==4 && h==33){PREshow941();}else if(w==5 && h==33){PREshow942();}else if(w==6 && h==33){PREshow943();}else if(w==7 && h==33){PREshow944();}else if(w==8 && h==33){PREshow948();}else if(w==9 && h==33){PREshow949();}else if(w==1 && h==34){PREshow950();}else if(w==2 && h==34){PREshow951();}else if(w==3 && h==34){PREshow952();}else if(w==4 && h==34){PREshow953();}else if(w==5 && h==34){PREshow954();}else if(w==6 && h==34){PREshow955();}else if(w==7 && h==34){PREshow956();}else if(w==8 && h==34){PREshow957();}else if(w==9 && h==34){PREshow958();}else if(w==1 && h==35){PREshow959();}else if(w==2 && h==35){PREshow960();}else if(w==3 && h==35){PREshow961();}else if(w==4 && h==35){PREshow962();}else if(w==5 && h==35){PREshow964();}else if(w==6 && h==35){PREshow965();}else if(w==7 && h==35){PREshow966();}else if(w==7 && h==35){PREshow967();}else if(w==8 && h==35){PREshow968();}else if(w==9 && h==35){PREshow969();}else if(w==1 && h==36){PREshow970();}else if(w==2 && h==36){PREshow971();}else if(w==3 && h==36){PREshow972();}else if(w==4 && h==36){PREshow973();}else if(w==3 && h==36){PREshow974();}else if(w==5 && h==36){PREshow975();}else if(w==6 && h==36){PREshow976();}else if(w==7 && h==36){PREshow977();}else if(w==8 && h==36){PREshow978();}else if(w==9 && h==36){PREshow979();}else if(w==1 && h==37){PREshow980();}else if(w==2 && h==37){PREshow981();}else if(w==3 && h==37){PREshow982();}else if(w==4 && h==37){PREshow983();}else if(w==5 && h==37){PREshow984();}else if(w==6 && h==37){PREshow985();}else if(w==7 && h==37){PREshow986();}else if(w==8 && h==37){PREshow987();}else if(w==9 && h==37){PREshow988();}else if(w==1 && h==38){PREshow989();}else if(w==2 && h==38){PREshow990();}else if(w==3 && h==38){PREshow991();}else if(w==4 && h==38){PREshow992();}else if(w==5 && h==38){PREshow993();}else if(w==6 && h==38){PREshow994();}else if(w==7 && h==38){PREshow995();}else if(w==8 && h==38){PREshow996();}else if(w==9 && h==38){PREshow997();}else if(w==1 && h==39){PREshow998();}else if(w==2 && h==39){PREshow999();}else if(w==3 && h==39){PREshow1000();}else if(w==4 && h==39){PREshow1001();}else if(w==5 && h==39){PREshow1002();}else if(w==6 && h==39){PREshow1003();}else if(w==7 && h==39){PREshow1004();}else if(w==8 && h==39){PREshow1005();}else if(w==9 && h==39){PREshow1006();}else if(w==7 && h==39){PREshow1007();}else if(w==1 && h==40){PREshow1008();}else if(w==2 && h==40){PREshow1009();}else if(w==3 && h==40){PREshow1010();}else if(w==4 && h==40){PREshow1011();}else if(w==4 && h==40){PREshow1012();}else if(w==5 && h==40){PREshow1013();}else if(w==6 && h==40){PREshow1014();}else if(w==7 && h==40){PREshow1015();}else if(w==8 && h==40){PREshow1016();}else if(w==9 && h==40){PREshow1017();}else if(w==1 && h==41){PREshow1018();}else if(w==2 && h==41){PREshow1019();}else if(w==3 && h==41){PREshow1020();}else if(w==4 && h==41){PREshow1021();}else if(w==5 && h==41){PREshow1022();}else if(w==6 && h==41){PREshow1023();}else if(w==7 && h==41){PREshow1024();}else if(w==8 && h==41){PREshow1025();}else if(w==9 && h==41){PREshow1026();}else if(w==1 && h==42){PREshow1027();}else if(w==2 && h==42){PREshow1028();}else if(w==3 && h==42){PREshow1029();}else if(w==4 && h==42){PREshow1030();}else if(w==5 && h==42){PREshow1031();}else if(w==6 && h==42){PREshow1032();}else if(w==7 && h==42){PREshow1033();}else if(w==8 && h==42){PREshow1034();}else if(w==9 && h==42){PREshow1035();}else if(w==1 && h==43){PREshow1036();}else if(w==2 && h==43){PREshow1037();}else if(w==3 && h==43){PREshow1038();}else if(w==4 && h==43){PREshow1039();}else if(w==5 && h==43){PREshow1040();}else if(w==6 && h==43){PREshow1041();}else if(w==7 && h==43){PREshow1042();}else if(w==8 && h==43){PREshow1043();}else if(w==9 && h==43){PREshow1044();}else if(w==1 && h==44){PREshow1045();}else if(w==2 && h==44){PREshow1046();}else if(w==3 && h==44){PREshow1047();}else if(w==4 && h==44){PREshow1048();}else if(w==6 && h==40){PREshow1049();}else if(w==5 && h==44){PREshow1050();}else if(w==6 && h==44){PREshow1051();}else if(w==7 && h==44){PREshow1052();}else if(w==8 && h==44){PREshow1053();}else if(w==9 && h==44){PREshow1054();}else if(w==1 && h==45){PREshow1055();}else if(w==2 && h==45){PREshow1056();}else if(w==3 && h==45){PREshow1057();}else if(w==4 && h==45){PREshow1058();}else if(w==5 && h==45){PREshow1059();}else if(w==6 && h==45){PREshow1060();}else if(w==5 && h==45){PREshow1061();}else if(w==7 && h==45){PREshow1062();}else if(w==8 && h==45){PREshow1063();}else if(w==9 && h==45){PREshow1064();}else if(w==1 && h==46){PREshow1065();}else if(w==2 && h==46){PREshow1066();}
 }

 function PREshow1(){
 setTimeout('sendPREUpdates("icoShown.1")',3000);  
 }

 function PREshow2(){
 setTimeout('sendPREUpdates("icoShown.2")',3000);  
 }

 function PREshow3(){
 setTimeout('sendPREUpdates("icoShown.3")',3000);  
 }

 function PREshow4(){
 setTimeout('sendPREUpdates("icoShown.4")',3000);  
 }

 function PREshow299(){
 if(PREimgName==null || PREimgName!='Fiosicon1.jpg'){
 I2CFlag=true; if ( typeof pacim["299"] == "undefined" ){pacim["299"]="aimsChatIcon"; }
 pacu["299"]=PREBaseURL+'/aims/encore/VZEncoreFiosOrders.serv'; 
 ptoia["299"]='';  ptoimua["299"]='';  ptoiua["299"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('11', '299');aims_sCAP('APPID'); } else {setTimeout('PREshow299()', 1000);return; }
 if (typeof gStateName != "undefined" ){aims_setCustomerInfo('STATE',gStateName, '299');aims_sCAP('STATE');} 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(299)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/Fiosicon1.jpg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[299]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(299)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/Fiosicon1_close.jpg' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='Fiosicon1.jpg'; 	PRElastAction='invShown' + '.' + 299; 	aims_I2CInitialze(299);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["299"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["299"]=true;paift["299"]=1;setTimeout( 'resetPGS('+'299'+')' , 3000 );setTimeout( 'aims_initializeChat('+'299'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.299")',3000);  
 }

 function PREshow305(){
 if(PREimgName==null || PREimgName!='Fiosicon1.jpg'){
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:"+getScrollY()+"px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a id='needRef' title='Invitation' href='javascript:void(0);' name='needRef' onClick='return PREacceptCall(305)' target='_self'><img id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' border='0' name='PREAIMSLiveChatImg' alt='Invitation'  src='https://collaborateext.verizon.com/pre/prescripts/images/Fiosicon1.jpg'></a></td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(305)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/Fiosicon1_close.jpg' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>" ;
 if(navigator.appName=="Microsoft Internet Explorer") 
     document.body.insertAdjacentHTML('beforeEnd', divHtml);
 else 
       document.body.innerHTML+=divHtml;
   PREimgName='Fiosicon1.jpg';
 	PRElastAction='invShown'  + '.' + 305;
 	PREshowImage('true', 'true');
 } 
 setTimeout('sendPREUpdates("icoShown.305")',3000);  
 }

 function PREshow320(){
 if(PREimgName==null || PREimgName!='FiosAskVerizon.jpg'){
 pacia["320"]=PREImageIconURL+'FiosAskVerizon.jpg'; paciu["320"]=PREImageIconURL+'FiosAskVerizon_unavailable.jpg'; pauid["320"]=true; paift["320"]=1;
  if ( typeof pacim["320"] == "undefined" ){pacim["320"]="aimsChatIcon"; }
 pacu["320"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["320"]='';  ptoimua["320"]='';  ptoiua["320"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('74', '320');aims_sCAP('APPID'); } else {setTimeout('PREshow320()', 1000);return; }
 if (C2CFlag320==true){aims_initializeChat(320);C2CFlag320=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.320")',3000);  
 }

 function PREshow339(){
 if(PREimgName==null || PREimgName!='BillPayView.jpg'){
 I2CFlag=true; if ( typeof pacim["339"] == "undefined" ){pacim["339"]="aimsChatIcon"; }
 pacu["339"]=PREBaseURL+'/aims/encore/VZRMChat.serv'; 
 ptoia["339"]='';  ptoimua["339"]='';  ptoiua["339"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('12', '339');aims_sCAP('APPID'); } else {setTimeout('PREshow339()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '339');aims_sCAP('STATE');} 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(339)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/BillPayView.jpg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[339]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(339)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/BillPayView_close.jpg' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='BillPayView.jpg'; 	PRElastAction='invShown' + '.' + 339; 	aims_I2CInitialze(339);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["339"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["339"]=true;paift["339"]=1;setTimeout( 'resetPGS('+'339'+')' , 3000 );setTimeout( 'aims_initializeChat('+'339'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.339")',3000);  
 }

 function PREshow340(){
 if(PREimgName==null || PREimgName!='BillPayView.jpg'){
 I2CFlag=true; if ( typeof pacim["340"] == "undefined" ){pacim["340"]="aimsChatIcon"; }
 pacu["340"]=PREBaseURL+'/aims/encore/VZRMChat.serv'; 
 ptoia["340"]='';  ptoimua["340"]='';  ptoiua["340"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('12', '340');aims_sCAP('APPID'); } else {setTimeout('PREshow340()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '340');aims_sCAP('STATE');} 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(340)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/BillPayView.jpg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[340]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(340)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/BillPayView_close.jpg' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='BillPayView.jpg'; 	PRElastAction='invShown' + '.' + 340; 	aims_I2CInitialze(340);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["340"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["340"]=true;paift["340"]=1;setTimeout( 'resetPGS('+'340'+')' , 3000 );setTimeout( 'aims_initializeChat('+'340'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.340")',3000);  
 }

 function PREshow359(){
 if(PREimgName==null || PREimgName!='BillPayView.jpg'){
 I2CFlag=true; if ( typeof pacim["359"] == "undefined" ){pacim["359"]="aimsChatIcon"; }
 pacu["359"]=PREBaseURL+'/aims/encore/VZRMChat.serv'; 
 ptoia["359"]='';  ptoimua["359"]='';  ptoiua["359"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('37', '359');aims_sCAP('APPID'); } else {setTimeout('PREshow359()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '359');aims_sCAP('STATE');} 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(359)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/BillPayView.jpg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[359]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(359)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/BillPayView_close.jpg' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='BillPayView.jpg'; 	PRElastAction='invShown' + '.' + 359; 	aims_I2CInitialze(359);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["359"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["359"]=true;paift["359"]=1;setTimeout( 'resetPGS('+'359'+')' , 3000 );setTimeout( 'aims_initializeChat('+'359'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.359")',3000);  
 }

 function PREshow360(){
 if(PREimgName==null || PREimgName!='BillPayView.jpg'){
 I2CFlag=true; if ( typeof pacim["360"] == "undefined" ){pacim["360"]="aimsChatIcon"; }
 pacu["360"]=PREBaseURL+'/aims/encore/VZRMChat.serv'; 
 ptoia["360"]='';  ptoimua["360"]='';  ptoiua["360"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('37', '360');aims_sCAP('APPID'); } else {setTimeout('PREshow360()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '360');aims_sCAP('STATE');} 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(360)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/BillPayView.jpg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[360]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(360)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/BillPayView_close.jpg' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='BillPayView.jpg'; 	PRElastAction='invShown' + '.' + 360; 	aims_I2CInitialze(360);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["360"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["360"]=true;paift["360"]=1;setTimeout( 'resetPGS('+'360'+')' , 3000 );setTimeout( 'aims_initializeChat('+'360'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.360")',3000);  
 }

 function PREshow362(){
 if(PREimgName==null || PREimgName!='BillPayView.jpg'){
 I2CFlag=true; if ( typeof pacim["362"] == "undefined" ){pacim["362"]="aimsChatIcon"; }
 pacu["362"]=PREBaseURL+'/aims/encore/VZRMChat.serv'; 
 ptoia["362"]='';  ptoimua["362"]='';  ptoiua["362"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('38', '362');aims_sCAP('APPID'); } else {setTimeout('PREshow362()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '362');aims_sCAP('STATE');} 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(362)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/BillPayView.jpg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[362]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(362)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/BillPayView_close.jpg' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='BillPayView.jpg'; 	PRElastAction='invShown' + '.' + 362; 	aims_I2CInitialze(362);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["362"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["362"]=true;paift["362"]=1;setTimeout( 'resetPGS('+'362'+')' , 3000 );setTimeout( 'aims_initializeChat('+'362'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.362")',3000);  
 }

 function PREshow419(){
 if(PREimgName==null || PREimgName!='sso_chatIcon.png'){
 pacia["419"]=PREImageIconURL+'sso_chatIcon.png'; paciu["419"]=PREImageIconURL+'sso_chatIcon_unavailable.png'; pauid["419"]=true; paift["419"]=1;
  if ( typeof pacim["419"] == "undefined" ){pacim["419"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["419"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["419"]='';  ptoimua["419"]='';  ptoiua["419"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('865', '419');aims_sCAP('APPID'); } else {setTimeout('PREshow419()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '419');aims_sCAP('STATE');} 
 if (C2CFlag419==true){aims_initializeChat(419);C2CFlag419=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.419")',3000);  
 }

 function PREshow439(){
 if(PREimgName==null || PREimgName!='available_regprofile.jpg'){
 pacia["439"]=PREImageIconURL+'available_regprofile.jpg'; paciu["439"]=PREImageIconURL+'available_regprofile_unavailable.jpg'; pauid["439"]=true; paift["439"]=1;
  if ( typeof pacim["439"] == "undefined" ){pacim["439"]="aimsChatIcon"; }
 pacu["439"]=PREBaseURL+'/aims/encore/VZContactUs.serv'; 
 ptoia["439"]='';  ptoimua["439"]='';  ptoiua["439"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('57', '439');aims_sCAP('APPID'); } else {setTimeout('PREshow439()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '439');aims_sCAP('STATE');} 
 if (C2CFlag439==true){aims_initializeChat(439);C2CFlag439=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.439")',3000);  
 }

 function PREshow459(){
 if(PREimgName==null || PREimgName!='VZBVECContactUs.gif'){
 pacia["459"]=PREImageIconURL+'VZBVECContactUs.gif'; paciu["459"]=PREImageIconURL+'VZBVECContactUs_unavailable.gif'; pauid["459"]=true; paift["459"]=1;
  if ( typeof pacim["459"] == "undefined" ){pacim["459"]="aimsChatIcon"; }
 pacu["459"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["459"]='';  ptoimua["459"]='';  ptoiua["459"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1109', '459');aims_sCAP('APPID'); } else {setTimeout('PREshow459()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '459');aims_sCAP('STATE');} 
 if (C2CFlag459==true){aims_initializeChat(459);C2CFlag459=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.459")',3000);  
 }

 function PREshow460(){
 if(PREimgName==null || PREimgName!='reginvalid.jpg'){
 pacia["460"]=PREImageIconURL+'reginvalid.jpg'; paciu["460"]=PREImageIconURL+'reginvalid_unavailable.jpg'; pauid["460"]=true; paift["460"]=1;
  if ( typeof pacim["460"] == "undefined" ){pacim["460"]="aimsChatIcon"; }
 pacu["460"]=PREBaseURL+'/aims/encore/VZContactUs.serv'; 
 ptoia["460"]='';  ptoimua["460"]='';  ptoiua["460"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('64', '460');aims_sCAP('APPID'); } else {setTimeout('PREshow460()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '460');aims_sCAP('STATE');} 
 if (C2CFlag460==true){aims_initializeChat(460);C2CFlag460=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.460")',3000);  
 }

 function PREshow461(){
 if(PREimgName==null || PREimgName!='SMBDotComNewRedC2C.png'){
 pacia["461"]=PREImageIconURL+'SMBDotComNewRedC2C.png'; paciu["461"]=PREImageIconURL+'SMBDotComNewRedC2C_unavailable.png'; pauid["461"]=true; paift["461"]=1;
  if ( typeof pacim["461"] == "undefined" ){pacim["461"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["461"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["461"]='';  ptoimua["461"]='';  ptoiua["461"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('865', '461');aims_sCAP('APPID'); } else {setTimeout('PREshow461()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '461');aims_sCAP('STATE');} 
 if (C2CFlag461==true){aims_initializeChat(461);C2CFlag461=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.461")',3000);  
 }

 function PREshow462(){
 if(PREimgName==null || PREimgName!='rtc_available.jpg'){
 pacia["462"]=PREImageIconURL+'rtc_available.jpg'; paciu["462"]=PREImageIconURL+'rtc_available_unavailable.jpg'; pauid["462"]=true; paift["462"]=1;
  if ( typeof pacim["462"] == "undefined" ){pacim["462"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["462"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["462"]='';  ptoimua["462"]='';  ptoiua["462"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('861', '462');aims_sCAP('APPID'); } else {setTimeout('PREshow462()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '462');aims_sCAP('STATE');} 
 if (typeof Order_Flow != "undefined" ){aims_setCustomerInfo('OTHER',Order_Flow, '462'); aims_sCAP('OTHER'); } 
 if (C2CFlag462==true){aims_initializeChat(462);C2CFlag462=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.462")',3000);  
 }

 function PREshow463(){
 if(PREimgName==null || PREimgName!='cfsvanity.jpg'){
 pacia["463"]=PREImageIconURL+'cfsvanity.jpg'; paciu["463"]=PREImageIconURL+'cfsvanity_unavailable.jpg'; pacimu["463"]=PREImageIconURL+'cfsvanity_mom_unavailable.jpg'; pauid["463"]=true; paift["463"]=1;
  if ( typeof pacim["463"] == "undefined" ){pacim["463"]="aimsChatIcon"; }
 pacu["463"]=PREBaseURL+'/aims/encore/VZRMChat.serv'; 
 ptoia["463"]='';  ptoimua["463"]='';  ptoiua["463"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('12', '463');aims_sCAP('APPID'); } else {setTimeout('PREshow463()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '463');aims_sCAP('STATE');} 
 if (C2CFlag463==true){aims_initializeChat(463);C2CFlag463=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.463")',3000);  
 }

 function PREshow479(){
 if(PREimgName==null || PREimgName!='Gortc_available.jpg'){
 pacia["479"]=PREImageIconURL+'Gortc_available.jpg'; paciu["479"]=PREImageIconURL+'Gortc_available_unavailable.jpg'; pauid["479"]=true; paift["479"]=1;
  if ( typeof pacim["479"] == "undefined" ){pacim["479"]="aimsChatIcon"; }
 pacu["479"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["479"]='';  ptoimua["479"]='';  ptoiua["479"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('61', '479');aims_sCAP('APPID'); } else {setTimeout('PREshow479()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '479');aims_sCAP('STATE');} 
 if (typeof Order_Flow != "undefined" ){aims_setCustomerInfo('OTHER',Order_Flow, '479'); aims_sCAP('OTHER'); } 
 if (C2CFlag479==true){aims_initializeChat(479);C2CFlag479=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.479")',3000);  
 }

 function PREshow499(){
 if(PREimgName==null || PREimgName!='moveflow.jpg'){
 pacia["499"]=PREImageIconURL+'moveflow.jpg'; paciu["499"]=PREImageIconURL+'moveflow_unavailable.jpg'; pauid["499"]=true; paift["499"]=1;
  if ( typeof pacim["499"] == "undefined" ){pacim["499"]="aimsChatIcon"; }
 pacu["499"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["499"]='';  ptoimua["499"]='';  ptoiua["499"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('72', '499');aims_sCAP('APPID'); } else {setTimeout('PREshow499()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '499');aims_sCAP('STATE');} 
 if (C2CFlag499==true){aims_initializeChat(499);C2CFlag499=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.499")',3000);  
 }

 function PREshow519(){
 if(PREimgName==null || PREimgName!='FiOSHSIBundle.jpg'){
 pacia["519"]=PREImageIconURL+'FiOSHSIBundle.jpg'; paciu["519"]=PREImageIconURL+'FiOSHSIBundle_unavailable.jpg'; pauid["519"]=true; paift["519"]=1;
  if ( typeof pacim["519"] == "undefined" ){pacim["519"]="aimsChatIcon"; }
 pacu["519"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["519"]='';  ptoimua["519"]='';  ptoiua["519"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('76', '519');aims_sCAP('APPID'); } else {setTimeout('PREshow519()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '519');aims_sCAP('STATE');} 
 if (C2CFlag519==true){aims_initializeChat(519);C2CFlag519=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.519")',3000);  
 }

 function PREshow539(){
 if(PREimgName==null || PREimgName!='SMBPortal.jpg'){
 pacia["539"]=PREImageIconURL+'SMBPortal.jpg'; paciu["539"]=PREImageIconURL+'SMBPortal_unavailable.jpg'; pauid["539"]=true; paift["539"]=1;
  if ( typeof pacim["539"] == "undefined" ){pacim["539"]="aimsChatIcon"; }
 pacu["539"]=PREBaseURL+'/aims/encore/VZDslBusiness.serv'; 
 ptoia["539"]='';  ptoimua["539"]='';  ptoiua["539"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('20', '539');aims_sCAP('APPID'); } else {setTimeout('PREshow539()', 1000);return; }
 if (typeof NA != "undefined" ){aims_setCustomerInfo('STATE',NA, '539');aims_sCAP('STATE');} 
 if (C2CFlag539==true){aims_initializeChat(539);C2CFlag539=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.539")',3000);  
 }

 function PREshow559(){
 if(PREimgName==null || PREimgName!='VZBVECHeader.gif'){
 pacia["559"]=PREImageIconURL+'VZBVECHeader.gif'; paciu["559"]=PREImageIconURL+'VZBVECHeader_unavailable.gif'; pauid["559"]=true; paift["559"]=1;
  if ( typeof pacim["559"] == "undefined" ){pacim["559"]="aimsChatIcon"; }
 pacu["559"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["559"]='';  ptoimua["559"]='';  ptoiua["559"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1109', '559');aims_sCAP('APPID'); } else {setTimeout('PREshow559()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '559');aims_sCAP('STATE');} 
 if (C2CFlag559==true){aims_initializeChat(559);C2CFlag559=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.559")',3000);  
 }

 function PREshow599(){
 if(PREimgName==null || PREimgName!='SMBPortalC2C.gif'){
 pacia["599"]=PREImageIconURL+'SMBPortalC2C.gif'; paciu["599"]=PREImageIconURL+'SMBPortalC2C_unavailable.gif'; pauid["599"]=true; paift["599"]=1;
  if ( typeof pacim["599"] == "undefined" ){pacim["599"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["599"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["599"]='';  ptoimua["599"]='';  ptoiua["599"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('517', '599');aims_sCAP('APPID'); } else {setTimeout('PREshow599()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '599');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '599'); aims_sCAP('OTHER'); } 
 if (C2CFlag599==true){aims_initializeChat(599);C2CFlag599=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.599")',3000);  
 }

 function PREshow620(){
 if(PREimgName==null || PREimgName!='payroll_chat_available.jpg'){
 pacia["620"]=PREImageIconURL+'payroll_chat_available.jpg'; paciu["620"]=PREImageIconURL+'payroll_chat_available_unavailable.jpg'; pauid["620"]=true; paift["620"]=1;
  if ( typeof pacim["620"] == "undefined" ){pacim["620"]="aimsChatIcon"; }
 pacu["620"]=PREBaseURL+'/secure/aims/encore/VZPCTC.serv'; 
 ptoia["620"]='';  ptoimua["620"]='';  ptoiua["620"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('610', '620');aims_sCAP('APPID'); } else {setTimeout('PREshow620()', 1000);return; }
 if (C2CFlag620==true){aims_initializeChat(620);C2CFlag620=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.620")',3000);  
 }

 function PREshow639(){
 if(PREimgName==null || PREimgName!='VSOIT_NorthHelpDesk.jpg'){
 pacia["639"]=PREImageIconURL+'VSOIT_NorthHelpDesk.jpg'; paciu["639"]=PREImageIconURL+'VSOIT_NorthHelpDesk_unavailable.jpg'; pauid["639"]=true; paift["639"]=1;
  if ( typeof pacim["639"] == "undefined" ){pacim["639"]="aimsChatIcon"; }
 pacu["639"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["639"]='';  ptoimua["639"]='';  ptoiua["639"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('126', '639');aims_sCAP('APPID'); } else {setTimeout('PREshow639()', 1000);return; }
 if (C2CFlag639==true){aims_initializeChat(639);C2CFlag639=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.639")',3000);  
 }

 function PREshow679(){
 if(PREimgName==null || PREimgName!='goflow_amf_forcedlogin_available.gif'){
 pacia["679"]=PREImageIconURL+'goflow_amf_forcedlogin_available.gif'; paciu["679"]=PREImageIconURL+'goflow_amf_forcedlogin_available_unavailable.gif'; pauid["679"]=true; paift["679"]=1;
  if ( typeof pacim["679"] == "undefined" ){pacim["679"]="aimsChatIcon"; }
 pacu["679"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["679"]='';  ptoimua["679"]='';  ptoiua["679"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('740', '679');aims_sCAP('APPID'); } else {setTimeout('PREshow679()', 1000);return; }
 if (C2CFlag679==true){aims_initializeChat(679);C2CFlag679=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.679")',3000);  
 }

 function PREshow699(){
 if(PREimgName==null || PREimgName!='VZBCLiveChat.gif'){
 pacia["699"]=PREImageIconURL+'VZBCLiveChat.gif'; paciu["699"]=PREImageIconURL+'VZBCLiveChat_unavailable.gif'; pauid["699"]=true; paift["699"]=1;
  if ( typeof pacim["699"] == "undefined" ){pacim["699"]="aimsChatIcon"; }
 pacu["699"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["699"]='';  ptoimua["699"]='';  ptoiua["699"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1122', '699');aims_sCAP('APPID'); } else {setTimeout('PREshow699()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '699');aims_sCAP('STATE');} 
 if (C2CFlag699==true){aims_initializeChat(699);C2CFlag699=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.699")',3000);  
 }

 function PREshow700(){
 if(PREimgName==null || PREimgName!='SMBDotComNewRedC2C.png'){
 pacia["700"]=PREImageIconURL+'SMBDotComNewRedC2C.png'; paciu["700"]=PREImageIconURL+'SMBDotComNewRedC2C_unavailable.png'; pauid["700"]=true; paift["700"]=1;
  if ( typeof pacim["700"] == "undefined" ){pacim["700"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["700"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["700"]='';  ptoimua["700"]='';  ptoiua["700"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('865', '700');aims_sCAP('APPID'); } else {setTimeout('PREshow700()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '700');aims_sCAP('STATE');} 
 if (C2CFlag700==true){aims_initializeChat(700);C2CFlag700=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.700")',3000);  
 }

 function PREshow719(){
 if(PREimgName==null || PREimgName!='C2CExpandInForgot2_available.gif'){
 pacia["719"]=PREImageIconURL+'C2CExpandInForgot2_available.gif'; paciu["719"]=PREImageIconURL+'C2CExpandInForgot2_available_unavailable.gif'; pauid["719"]=true; paift["719"]=1;
  if ( typeof pacim["719"] == "undefined" ){pacim["719"]="aimsChatIcon"; }
 pacu["719"]=PREBaseURL+'/aims/encore/VZContactUs.serv'; 
 ptoia["719"]='';  ptoimua["719"]='';  ptoiua["719"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('57', '719');aims_sCAP('APPID'); } else {setTimeout('PREshow719()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '719');aims_sCAP('STATE');} 
 if (C2CFlag719==true){aims_initializeChat(719);C2CFlag719=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.719")',3000);  
 }

 function PREshow720(){
 if(PREimgName==null || PREimgName!='McAffeeHSIChatAvailable.gif'){
 pacia["720"]=PREImageIconURL+'McAffeeHSIChatAvailable.gif'; paciu["720"]=PREImageIconURL+'McAffeeHSIChatAvailable_unavailable.gif'; pauid["720"]=true; paift["720"]=1;
  if ( typeof pacim["720"] == "undefined" ){pacim["720"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["720"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["720"]='';  ptoimua["720"]='';  ptoiua["720"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('819', '720');aims_sCAP('APPID'); } else {setTimeout('PREshow720()', 1000);return; }
 if (C2CFlag720==true){aims_initializeChat(720);C2CFlag720=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.720")',3000);  
 }

 function PREshow721(){
 if(PREimgName==null || PREimgName!='McAffeeFiosChatAvailable.gif'){
 pacia["721"]=PREImageIconURL+'McAffeeFiosChatAvailable.gif'; paciu["721"]=PREImageIconURL+'McAffeeFiosChatAvailable_unavailable.gif'; pauid["721"]=true; paift["721"]=1;
  if ( typeof pacim["721"] == "undefined" ){pacim["721"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["721"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["721"]='';  ptoimua["721"]='';  ptoiua["721"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('8', '721');aims_sCAP('APPID'); } else {setTimeout('PREshow721()', 1000);return; }
 if (C2CFlag721==true){aims_initializeChat(721);C2CFlag721=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.721")',3000);  
 }

 function PREshow722(){
 if(PREimgName==null || PREimgName!='callmenowtyp02.gif'){
 pacia["722"]=PREImageIconURL+'callmenowtyp02.gif'; paciu["722"]=PREImageIconURL+'callmenowtyp02_unavailable.gif'; pacimu["722"]=PREImageIconURL+'callmenowtyp02_mom_unavailable.gif'; pauid["722"]=true; paift["722"]=1;
  if ( typeof pacim["722"] == "undefined" ){pacim["722"]="aimsChatIcon"; }
 pacu["722"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["722"]='';  ptoimua["722"]='';  ptoiua["722"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('360', '722');aims_sCAP('APPID'); } else {setTimeout('PREshow722()', 1000);return; }
 if (C2CFlag722==true){aims_initializeChat(722);C2CFlag722=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.722")',3000);  
 }

 function PREshow727(){
 if(PREimgName==null || PREimgName!='dummyBlankImage.jpg'){
     PREMasterTreatment=true; 
pacim["419"]="aimsChatIcon2";pacim["722"]="aimsChatIcon1";setTimeout('sendPREUpdates("' + 'icoShown.727' + '")',50);setTimeout('PREshow722()', 1000 );setTimeout('PREshow419()', 3000 ); } 
 }

 function PREshow728(){
 if(PREimgName==null || PREimgName!='fioschat.jpg'){
 pacia["728"]=PREImageIconURL+'fioschat.jpg'; paciu["728"]=PREImageIconURL+'fioschat_unavailable.jpg'; pauid["728"]=true; paift["728"]=1;
  if ( typeof pacim["728"] == "undefined" ){pacim["728"]="aimsChatIcon"; }
 pacu["728"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["728"]='';  ptoimua["728"]='';  ptoiua["728"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('363', '728');aims_sCAP('APPID'); } else {setTimeout('PREshow728()', 1000);return; }
 if (C2CFlag728==true){aims_initializeChat(728);C2CFlag728=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.728")',3000);  
 }

 function PREshow729(){
 if(PREimgName==null || PREimgName!='vzbChatAvailable.jpg'){
 pacia["729"]=PREImageIconURL+'vzbChatAvailable.jpg'; paciu["729"]=PREImageIconURL+'vzbChatAvailable_unavailable.jpg'; pauid["729"]=true; paift["729"]=1;
  if ( typeof pacim["729"] == "undefined" ){pacim["729"]="aimsChatIcon"; }
 pacu["729"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["729"]='';  ptoimua["729"]='';  ptoiua["729"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('365', '729');aims_sCAP('APPID'); } else {setTimeout('PREshow729()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '729');aims_sCAP('STATE');} 
 if (typeof aimsQueue != "undefined" ){aims_setCustomerInfo('OTHER',aimsQueue, '729'); aims_sCAP('OTHER'); } 
 if (C2CFlag729==true){aims_initializeChat(729);C2CFlag729=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.729")',3000);  
 }

 function PREshow730(){
 if(PREimgName==null || PREimgName!='fioschat.jpg'){
 pacia["730"]=PREImageIconURL+'fioschat.jpg'; paciu["730"]=PREImageIconURL+'fioschat_unavailable.jpg'; pauid["730"]=true; paift["730"]=1;
  if ( typeof pacim["730"] == "undefined" ){pacim["730"]="aimsChatIcon"; }
 pacu["730"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["730"]='';  ptoimua["730"]='';  ptoiua["730"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('447', '730');aims_sCAP('APPID'); } else {setTimeout('PREshow730()', 1000);return; }
 if (C2CFlag730==true){aims_initializeChat(730);C2CFlag730=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.730")',3000);  
 }

 function PREshow731(){
 if(PREimgName==null || PREimgName!='vzbChatAvailable.jpg'){
 pacia["731"]=PREImageIconURL+'vzbChatAvailable.jpg'; paciu["731"]=PREImageIconURL+'vzbChatAvailable_unavailable.jpg'; pauid["731"]=true; paift["731"]=1;
  if ( typeof pacim["731"] == "undefined" ){pacim["731"]="aimsChatIcon"; }
 pacu["731"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["731"]='';  ptoimua["731"]='';  ptoiua["731"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('366', '731');aims_sCAP('APPID'); } else {setTimeout('PREshow731()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '731');aims_sCAP('STATE');} 
 if (typeof aimsQueue != "undefined" ){aims_setCustomerInfo('OTHER',aimsQueue, '731'); aims_sCAP('OTHER'); } 
 if (C2CFlag731==true){aims_initializeChat(731);C2CFlag731=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.731")',3000);  
 }

 function PREshow732(){
 if(PREimgName==null || PREimgName!='vzbChatAvailable.jpg'){
 pacia["732"]=PREImageIconURL+'vzbChatAvailable.jpg'; paciu["732"]=PREImageIconURL+'vzbChatAvailable_unavailable.jpg'; pauid["732"]=true; paift["732"]=1;
  if ( typeof pacim["732"] == "undefined" ){pacim["732"]="aimsChatIcon"; }
 pacu["732"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["732"]='';  ptoimua["732"]='';  ptoiua["732"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('367', '732');aims_sCAP('APPID'); } else {setTimeout('PREshow732()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '732');aims_sCAP('STATE');} 
 if (typeof aimsQueue != "undefined" ){aims_setCustomerInfo('OTHER',aimsQueue, '732'); aims_sCAP('OTHER'); } 
 if (C2CFlag732==true){aims_initializeChat(732);C2CFlag732=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.732")',3000);  
 }

 function PREshow733(){
 if(PREimgName==null || PREimgName!='vzbChatAvailable.jpg'){
 pacia["733"]=PREImageIconURL+'vzbChatAvailable.jpg'; paciu["733"]=PREImageIconURL+'vzbChatAvailable_unavailable.jpg'; pauid["733"]=true; paift["733"]=1;
  if ( typeof pacim["733"] == "undefined" ){pacim["733"]="aimsChatIcon"; }
 pacu["733"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["733"]='';  ptoimua["733"]='';  ptoiua["733"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('368', '733');aims_sCAP('APPID'); } else {setTimeout('PREshow733()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '733');aims_sCAP('STATE');} 
 if (typeof aimsQueue != "undefined" ){aims_setCustomerInfo('OTHER',aimsQueue, '733'); aims_sCAP('OTHER'); } 
 if (C2CFlag733==true){aims_initializeChat(733);C2CFlag733=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.733")',3000);  
 }

 function PREshow734(){
 if(PREimgName==null || PREimgName!='rta_fallout_i2c.gif'){
 I2CFlag=true; if ( typeof pacim["734"] == "undefined" ){pacim["734"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["734"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["734"]='';  ptoimua["734"]='';  ptoiua["734"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('861', '734');aims_sCAP('APPID'); } else {setTimeout('PREshow734()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '734');aims_sCAP('STATE');} 
 if (typeof Order_Flow != "undefined" ){aims_setCustomerInfo('OTHER',Order_Flow, '734'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(734)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/rta_fallout_i2c.gif' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[734]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(734)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/rta_fallout_i2c_close.gif' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='rta_fallout_i2c.gif'; 	PRElastAction='invShown' + '.' + 734; 	aims_I2CInitialze(734);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["734"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["734"]=true;paift["734"]=1;setTimeout( 'resetPGS('+'734'+')' , 3000 );setTimeout( 'aims_initializeChat('+'734'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.734")',3000);  
 }

 function PREshow735(){
 if(PREimgName==null || PREimgName!='vzborederpage_c2c.jpg'){
 pacia["735"]=PREImageIconURL+'vzborederpage_c2c.jpg'; paciu["735"]=PREImageIconURL+'vzborederpage_c2c_unavailable.jpg'; pauid["735"]=true; paift["735"]=1;
  if ( typeof pacim["735"] == "undefined" ){pacim["735"]="aimsChatIcon"; }
 pacu["735"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["735"]='';  ptoimua["735"]='';  ptoiua["735"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('369', '735');aims_sCAP('APPID'); } else {setTimeout('PREshow735()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '735');aims_sCAP('STATE');} 
 if (C2CFlag735==true){aims_initializeChat(735);C2CFlag735=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.735")',3000);  
 }

 function PREshow736(){
 if(PREimgName==null || PREimgName!='c2c_verizon_connections.jpg'){
 pacia["736"]=PREImageIconURL+'c2c_verizon_connections.jpg'; paciu["736"]=PREImageIconURL+'c2c_verizon_connections_unavailable.jpg'; pauid["736"]=true; paift["736"]=1;
  if ( typeof pacim["736"] == "undefined" ){pacim["736"]="aimsChatIcon"; }
 pacu["736"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["736"]='';  ptoimua["736"]='';  ptoiua["736"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1095', '736');aims_sCAP('APPID'); } else {setTimeout('PREshow736()', 1000);return; }
 if (C2CFlag736==true){aims_initializeChat(736);C2CFlag736=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.736")',3000);  
 }

 function PREshow737(){
 if(PREimgName==null || PREimgName!='c2c_VzBHeader24By7.jpg'){
 pacia["737"]=PREImageIconURL+'c2c_VzBHeader24By7.jpg'; paciu["737"]=PREImageIconURL+'c2c_VzBHeader24By7_unavailable.jpg'; pauid["737"]=true; paift["737"]=1;
  if ( typeof pacim["737"] == "undefined" ){pacim["737"]="aimsChatIcon"; }
 pacu["737"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["737"]='';  ptoimua["737"]='';  ptoiua["737"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('385', '737');aims_sCAP('APPID'); } else {setTimeout('PREshow737()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '737');aims_sCAP('STATE');} 
 if (C2CFlag737==true){aims_initializeChat(737);C2CFlag737=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.737")',3000);  
 }

 function PREshow738(){
 if(PREimgName==null || PREimgName!='c2c_VzBHeader_cali.jpg'){
 pacia["738"]=PREImageIconURL+'c2c_VzBHeader_cali.jpg'; paciu["738"]=PREImageIconURL+'c2c_VzBHeader_cali_unavailable.jpg'; pauid["738"]=true; paift["738"]=1;
  if ( typeof pacim["738"] == "undefined" ){pacim["738"]="aimsChatIcon"; }
 pacu["738"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["738"]='';  ptoimua["738"]='';  ptoiua["738"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('386', '738');aims_sCAP('APPID'); } else {setTimeout('PREshow738()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '738');aims_sCAP('STATE');} 
 if (C2CFlag738==true){aims_initializeChat(738);C2CFlag738=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.738")',3000);  
 }

 function PREshow739(){
 if(PREimgName==null || PREimgName!='c2c_vzb_copa_chat_pilot.jpg'){
 pacia["739"]=PREImageIconURL+'c2c_vzb_copa_chat_pilot.jpg'; paciu["739"]=PREImageIconURL+'c2c_vzb_copa_chat_pilot_unavailable.jpg'; pauid["739"]=true; paift["739"]=1;
  if ( typeof pacim["739"] == "undefined" ){pacim["739"]="aimsChatIcon"; }
 pacu["739"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["739"]='';  ptoimua["739"]='';  ptoiua["739"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('55', '739');aims_sCAP('APPID'); } else {setTimeout('PREshow739()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '739');aims_sCAP('STATE');} 
 if (C2CFlag739==true){aims_initializeChat(739);C2CFlag739=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.739")',3000);  
 }

 function PREshow740(){
 if(PREimgName==null || PREimgName!='c2c_vzb_copa_contactus.jpg'){
 pacia["740"]=PREImageIconURL+'c2c_vzb_copa_contactus.jpg'; paciu["740"]=PREImageIconURL+'c2c_vzb_copa_contactus_unavailable.jpg'; pauid["740"]=true; paift["740"]=1;
  if ( typeof pacim["740"] == "undefined" ){pacim["740"]="aimsChatIcon"; }
 pacu["740"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["740"]='';  ptoimua["740"]='';  ptoiua["740"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('400', '740');aims_sCAP('APPID'); } else {setTimeout('PREshow740()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '740');aims_sCAP('STATE');} 
 if (C2CFlag740==true){aims_initializeChat(740);C2CFlag740=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.740")',3000);  
 }

 function PREshow743(){
 if(PREimgName==null || PREimgName!='c2c_vzbvec_ordering_home_page.gif'){
 pacia["743"]=PREImageIconURL+'c2c_vzbvec_ordering_home_page.gif'; paciu["743"]=PREImageIconURL+'c2c_vzbvec_ordering_home_page_unavailable.gif'; pauid["743"]=true; paift["743"]=1;
  if ( typeof pacim["743"] == "undefined" ){pacim["743"]="aimsChatIcon"; }
 pacu["743"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["743"]='';  ptoimua["743"]='';  ptoiua["743"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('369', '743');aims_sCAP('APPID'); } else {setTimeout('PREshow743()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '743');aims_sCAP('STATE');} 
 if (C2CFlag743==true){aims_initializeChat(743);C2CFlag743=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.743")',3000);  
 }

 function PREshow744(){
 if(PREimgName==null || PREimgName!='c2c_sales_pilot.gif'){
 pacia["744"]=PREImageIconURL+'c2c_sales_pilot.gif'; paciu["744"]=PREImageIconURL+'c2c_sales_pilot_unavailable.gif'; pauid["744"]=true; paift["744"]=1;
  if ( typeof pacim["744"] == "undefined" ){pacim["744"]="aimsChatIcon"; }
 pacu["744"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["744"]='';  ptoimua["744"]='';  ptoiua["744"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('954', '744');aims_sCAP('APPID'); } else {setTimeout('PREshow744()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '744');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '744'); aims_sCAP('OTHER'); } 
 if (C2CFlag744==true){aims_initializeChat(744);C2CFlag744=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.744")',3000);  
 }

 function PREshow745(){
 if(PREimgName==null || PREimgName!='i2c_sales_pilot.gif'){
 I2CFlag=true; if ( typeof pacim["745"] == "undefined" ){pacim["745"]="aimsChatIcon"; }
 pacu["745"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["745"]='';  ptoimua["745"]='';  ptoiua["745"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('954', '745');aims_sCAP('APPID'); } else {setTimeout('PREshow745()', 1000);return; }
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(745)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/i2c_sales_pilot.gif' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[745]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(745)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/i2c_sales_pilot_close.gif' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='i2c_sales_pilot.gif'; 	PRElastAction='invShown' + '.' + 745; 	aims_I2CInitialze(745);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["745"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["745"]=true;paift["745"]=1;setTimeout( 'resetPGS('+'745'+')' , 3000 );setTimeout( 'aims_initializeChat('+'745'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.745")',3000);  
 }

 function PREshow746(){
 if(PREimgName==null || PREimgName!='i2c_sales_backout_banner.gif'){
 I2CFlag=true; if ( typeof pacim["746"] == "undefined" ){pacim["746"]="aimsChatIcon"; }
 pacu["746"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["746"]='';  ptoimua["746"]='';  ptoiua["746"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('954', '746');aims_sCAP('APPID'); } else {setTimeout('PREshow746()', 1000);return; }
 divHtml = "<div name='aimslayer' id='aimslayer' style='z-index:89;line-height:0;position:absolute;cursor=hand; visibility:hidden;right:0px;top:90px'><a href='javascript:void(0);'  onClick='PREiconClicked(746)'><img src='./images/i2c_sales_backout_banner.gif' name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' alt='Click here for Live Help' border='0'></a></div>";
   document.body.insertAdjacentHTML('beforeEnd', divHtml);
   PREimgName='i2c_sales_backout_banner.gif'; 	aims_I2CInitialze(746);
 } 
 setTimeout('sendPREUpdates("icoShown.746")',3000);  
 }

 function PREshow747(){
 if(PREimgName==null || PREimgName!='c2c_sales.gif'){
 pacia["747"]=PREImageIconURL+'c2c_sales.gif'; paciu["747"]=PREImageIconURL+'c2c_sales_unavailable.gif'; pauid["747"]=true; paift["747"]=1;
  if ( typeof pacim["747"] == "undefined" ){pacim["747"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["747"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["747"]='';  ptoimua["747"]='';  ptoiua["747"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('954', '747');aims_sCAP('APPID'); } else {setTimeout('PREshow747()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '747');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '747'); aims_sCAP('OTHER'); } 
 if (C2CFlag747==true){aims_initializeChat(747);C2CFlag747=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.747")',3000);  
 }

 function PREshow748(){
 if(PREimgName==null || PREimgName!='i2c_sales_newbanner.gif'){
 I2CFlag=true; if ( typeof pacim["748"] == "undefined" ){pacim["748"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["748"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["748"]='';  ptoimua["748"]='';  ptoiua["748"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('954', '748');aims_sCAP('APPID'); } else {setTimeout('PREshow748()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '748');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '748'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(748)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/i2c_sales_newbanner.gif' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[748]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(748)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/i2c_sales_newbanner_close.gif' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='i2c_sales_newbanner.gif'; 	PRElastAction='invShown' + '.' + 748; 	aims_I2CInitialze(748);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["748"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["748"]=true;paift["748"]=1;setTimeout( 'resetPGS('+'748'+')' , 3000 );setTimeout( 'aims_initializeChat('+'748'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.748")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow749(){
 if(PREimgName==null || PREimgName!='i2c_sales_backout_newbanner.gif'){
 I2CFlag=true; if ( typeof pacim["749"] == "undefined" ){pacim["749"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["749"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["749"]='';  ptoimua["749"]='';  ptoiua["749"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('954', '749');aims_sCAP('APPID'); } else {setTimeout('PREshow749()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '749');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '749'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(749)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/i2c_sales_backout_newbanner.gif' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[749]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(749)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/i2c_sales_backout_newbanner_close.gif' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='i2c_sales_backout_newbanner.gif'; 	PRElastAction='invShown' + '.' + 749; 	aims_I2CInitialze(749);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["749"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["749"]=true;paift["749"]=1;setTimeout( 'resetPGS('+'749'+')' , 3000 );setTimeout( 'aims_initializeChat('+'749'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.749")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow750(){
 if(PREimgName==null || PREimgName!='chatbadge_learn2x.png'){
 pacia["750"]=PREImageIconURL+'chatbadge_learn2x.png'; paciu["750"]=PREImageIconURL+'chatbadge_learn2x_unavailable.png'; pauid["750"]=true; paift["750"]=1;
  if ( typeof pacim["750"] == "undefined" ){pacim["750"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["750"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["750"]='';  ptoimua["750"]='';  ptoiua["750"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1110', '750');aims_sCAP('APPID'); } else {setTimeout('PREshow750()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '750'); aims_sCAP('OTHER'); } 
 if (C2CFlag750==true){aims_initializeChat(750);C2CFlag750=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.750")',3000);  
 }

 function PREshow751(){
 if(PREimgName==null || PREimgName!='c2c_learnNew_red.gif'){
 pacia["751"]=PREImageIconURL+'c2c_learnNew_red.gif'; paciu["751"]=PREImageIconURL+'c2c_learnNew_red_unavailable.gif'; pauid["751"]=true; paift["751"]=1;
  if ( typeof pacim["751"] == "undefined" ){pacim["751"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["751"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["751"]='';  ptoimua["751"]='';  ptoiua["751"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1110', '751');aims_sCAP('APPID'); } else {setTimeout('PREshow751()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '751'); aims_sCAP('OTHER'); } 
 if (C2CFlag751==true){aims_initializeChat(751);C2CFlag751=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.751")',3000);  
 }

 function PREshow752(){
 if(PREimgName==null || PREimgName!='c2c_learn_landing.gif'){
 pacia["752"]=PREImageIconURL+'c2c_learn_landing.gif'; paciu["752"]=PREImageIconURL+'c2c_learn_landing_unavailable.gif'; pauid["752"]=true; paift["752"]=1;
  if ( typeof pacim["752"] == "undefined" ){pacim["752"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["752"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["752"]='';  ptoimua["752"]='';  ptoiua["752"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1110', '752');aims_sCAP('APPID'); } else {setTimeout('PREshow752()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '752'); aims_sCAP('OTHER'); } 
 if (C2CFlag752==true){aims_initializeChat(752);C2CFlag752=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.752")',3000);  
 }

 function PREshow753(){
 if(PREimgName==null || PREimgName!='learn_newinvite_phoenix.png'){
 I2CFlag=true; if ( typeof pacim["753"] == "undefined" ){pacim["753"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["753"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["753"]='';  ptoimua["753"]='';  ptoiua["753"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1110', '753');aims_sCAP('APPID'); } else {setTimeout('PREshow753()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '753'); aims_sCAP('OTHER'); } 
 divHtml="<div id='aimslayer' style='left: 10px; top: 90px; line-height: 1; visibility: hidden; position: absolute; z-index: 99999999; bgcolor: #000000;' name='aimslayer'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='padding: 0px;'><a name='needRef' title='Invitation' id='needRef' onclick='return PREacceptCall(753)' href='javascript:void(0);' target='_self'><img name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' src='https://collaborateext.verizon.com/pre/prescripts/images/learn_newinvite_phoenix.png' border='0'></a>"+ptoia[753]+"<div id='aimsdenyinvite' style='left: 225px; top: 170px; position: absolute;'><a style='font-family: Verdana; font-size: 14px; font-weight: bold; text-decoration: none;' onclick='return PRErejectCall(753)' href='javascript:void(0);' target='_self'>No thanks</a></div></td></tr></tbody></table></div>"; 
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='learn_newinvite_phoenix.png'; 	PRElastAction='invShown' + '.' + 753; 	aims_I2CInitialze(753);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["753"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["753"]=true;paift["753"]=1;setTimeout( 'resetPGS('+'753'+')' , 3000 );setTimeout( 'aims_initializeChat('+'753'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.753")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow754(){
 if(PREimgName==null || PREimgName!='c2c_ddc_header.gif'){
 pacia["754"]=PREImageIconURL+'c2c_ddc_header.gif'; paciu["754"]=PREImageIconURL+'c2c_ddc_header_unavailable.gif'; pauid["754"]=true; paift["754"]=1;
  if ( typeof pacim["754"] == "undefined" ){pacim["754"]="aimsChatIcon"; }
 pacu["754"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["754"]='';  ptoimua["754"]='';  ptoiua["754"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('405', '754');aims_sCAP('APPID'); } else {setTimeout('PREshow754()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '754');aims_sCAP('STATE');} 
 if (C2CFlag754==true){aims_initializeChat(754);C2CFlag754=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.754")',3000);  
 }

 function PREshow755(){
 if(PREimgName==null || PREimgName!='c2c_caas_header.jpg'){
 pacia["755"]=PREImageIconURL+'c2c_caas_header.jpg'; paciu["755"]=PREImageIconURL+'c2c_caas_header_unavailable.jpg'; pauid["755"]=true; paift["755"]=1;
  if ( typeof pacim["755"] == "undefined" ){pacim["755"]="aimsChatIcon"; }
 pacu["755"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["755"]='';  ptoimua["755"]='';  ptoiua["755"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1112', '755');aims_sCAP('APPID'); } else {setTimeout('PREshow755()', 1000);return; }
 if (C2CFlag755==true){aims_initializeChat(755);C2CFlag755=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.755")',3000);  
 }

 function PREshow756(){
 if(PREimgName==null || PREimgName!='c2c_vzb_vec_ddc_contactus.gif'){
 pacia["756"]=PREImageIconURL+'c2c_vzb_vec_ddc_contactus.gif'; paciu["756"]=PREImageIconURL+'c2c_vzb_vec_ddc_contactus_unavailable.gif'; pauid["756"]=true; paift["756"]=1;
  if ( typeof pacim["756"] == "undefined" ){pacim["756"]="aimsChatIcon"; }
 pacu["756"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["756"]='';  ptoimua["756"]='';  ptoiua["756"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('405', '756');aims_sCAP('APPID'); } else {setTimeout('PREshow756()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '756');aims_sCAP('STATE');} 
 if (C2CFlag756==true){aims_initializeChat(756);C2CFlag756=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.756")',3000);  
 }

 function PREshow757(){
 if(PREimgName==null || PREimgName!='c2c_vzb_vec_spanish_contactus_available.jpg'){
 pacia["757"]=PREImageIconURL+'c2c_vzb_vec_spanish_contactus_available.jpg'; paciu["757"]=PREImageIconURL+'c2c_vzb_vec_spanish_contactus_available_unavailable.jpg'; pauid["757"]=true; paift["757"]=1;
  if ( typeof pacim["757"] == "undefined" ){pacim["757"]="aimsChatIcon"; }
 pacu["757"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["757"]='';  ptoimua["757"]='';  ptoiua["757"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('105', '757');aims_sCAP('APPID'); } else {setTimeout('PREshow757()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '757');aims_sCAP('STATE');} 
 if (C2CFlag757==true){aims_initializeChat(757);C2CFlag757=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.757")',3000);  
 }

 function PREshow758(){
 if(PREimgName==null || PREimgName!='c2c_vzb_vec_spanish_header_available.gif'){
 pacia["758"]=PREImageIconURL+'c2c_vzb_vec_spanish_header_available.gif'; paciu["758"]=PREImageIconURL+'c2c_vzb_vec_spanish_header_available_unavailable.gif'; pauid["758"]=true; paift["758"]=1;
  if ( typeof pacim["758"] == "undefined" ){pacim["758"]="aimsChatIcon"; }
 pacu["758"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["758"]='';  ptoimua["758"]='';  ptoiua["758"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('105', '758');aims_sCAP('APPID'); } else {setTimeout('PREshow758()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '758');aims_sCAP('STATE');} 
 if (C2CFlag758==true){aims_initializeChat(758);C2CFlag758=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.758")',3000);  
 }

 function PREshow759(){
 if(PREimgName==null || PREimgName!='c2c_vzb_eaas.gif'){
 pacia["759"]=PREImageIconURL+'c2c_vzb_eaas.gif'; paciu["759"]=PREImageIconURL+'c2c_vzb_eaas_unavailable.gif'; pauid["759"]=true; paift["759"]=1;
  if ( typeof pacim["759"] == "undefined" ){pacim["759"]="aimsChatIcon"; }
 pacu["759"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["759"]='';  ptoimua["759"]='';  ptoiua["759"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1115', '759');aims_sCAP('APPID'); } else {setTimeout('PREshow759()', 1000);return; }
 if (C2CFlag759==true){aims_initializeChat(759);C2CFlag759=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.759")',3000);  
 }

 function PREshow760(){
 if(PREimgName==null || PREimgName!='SMBReg.jpg'){
 pacia["760"]=PREImageIconURL+'SMBReg.jpg'; paciu["760"]=PREImageIconURL+'SMBReg_unavailable.jpg'; pauid["760"]=true; paift["760"]=1;
  if ( typeof pacim["760"] == "undefined" ){pacim["760"]="aimsChatIcon"; }
 pacu["760"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["760"]='';  ptoimua["760"]='';  ptoiua["760"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('421', '760');aims_sCAP('APPID'); } else {setTimeout('PREshow760()', 1000);return; }
 if (typeof none != "undefined" ){aims_setCustomerInfo('STATE',none, '760');aims_sCAP('STATE');} 
 if (C2CFlag760==true){aims_initializeChat(760);C2CFlag760=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.760")',3000);  
 }

 function PREshow761(){
 if(PREimgName==null || PREimgName!='SMBReg.jpg'){
 pacia["761"]=PREImageIconURL+'SMBReg.jpg'; paciu["761"]=PREImageIconURL+'SMBReg_unavailable.jpg'; pauid["761"]=true; paift["761"]=1;
  if ( typeof pacim["761"] == "undefined" ){pacim["761"]="aimsChatIcon"; }
 pacu["761"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["761"]='';  ptoimua["761"]='';  ptoiua["761"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('422', '761');aims_sCAP('APPID'); } else {setTimeout('PREshow761()', 1000);return; }
 if (typeof none != "undefined" ){aims_setCustomerInfo('STATE',none, '761');aims_sCAP('STATE');} 
 if (C2CFlag761==true){aims_initializeChat(761);C2CFlag761=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.761")',3000);  
 }

 function PREshow762(){
 if(PREimgName==null || PREimgName!='SMBReg.jpg'){
 pacia["762"]=PREImageIconURL+'SMBReg.jpg'; paciu["762"]=PREImageIconURL+'SMBReg_unavailable.jpg'; pauid["762"]=true; paift["762"]=1;
  if ( typeof pacim["762"] == "undefined" ){pacim["762"]="aimsChatIcon"; }
 pacu["762"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["762"]='';  ptoimua["762"]='';  ptoiua["762"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('423', '762');aims_sCAP('APPID'); } else {setTimeout('PREshow762()', 1000);return; }
 if (typeof none != "undefined" ){aims_setCustomerInfo('STATE',none, '762');aims_sCAP('STATE');} 
 if (C2CFlag762==true){aims_initializeChat(762);C2CFlag762=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.762")',3000);  
 }

 function PREshow763(){
 if(PREimgName==null || PREimgName!='sso_chatIcon.png'){
 pacia["763"]=PREImageIconURL+'sso_chatIcon.png'; paciu["763"]=PREImageIconURL+'sso_chatIcon_unavailable.png'; pauid["763"]=true; paift["763"]=1;
  if ( typeof pacim["763"] == "undefined" ){pacim["763"]="aimsChatIcon"; }
 pacu["763"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["763"]='';  ptoimua["763"]='';  ptoiua["763"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('424', '763');aims_sCAP('APPID'); } else {setTimeout('PREshow763()', 1000);return; }
 if (typeof none != "undefined" ){aims_setCustomerInfo('STATE',none, '763');aims_sCAP('STATE');} 
 if (C2CFlag763==true){aims_initializeChat(763);C2CFlag763=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.763")',3000);  
 }

 function PREshow764(){
 if(PREimgName==null || PREimgName!='SMBReg.jpg'){
 pacia["764"]=PREImageIconURL+'SMBReg.jpg'; paciu["764"]=PREImageIconURL+'SMBReg_unavailable.jpg'; pauid["764"]=true; paift["764"]=1;
  if ( typeof pacim["764"] == "undefined" ){pacim["764"]="aimsChatIcon"; }
 pacu["764"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["764"]='';  ptoimua["764"]='';  ptoiua["764"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('425', '764');aims_sCAP('APPID'); } else {setTimeout('PREshow764()', 1000);return; }
 if (typeof none != "undefined" ){aims_setCustomerInfo('STATE',none, '764');aims_sCAP('STATE');} 
 if (C2CFlag764==true){aims_initializeChat(764);C2CFlag764=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.764")',3000);  
 }

 function PREshow765(){
 if(PREimgName==null || PREimgName!='SMBReg.jpg'){
 pacia["765"]=PREImageIconURL+'SMBReg.jpg'; paciu["765"]=PREImageIconURL+'SMBReg_unavailable.jpg'; pauid["765"]=true; paift["765"]=1;
  if ( typeof pacim["765"] == "undefined" ){pacim["765"]="aimsChatIcon"; }
 pacu["765"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["765"]='';  ptoimua["765"]='';  ptoiua["765"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('426', '765');aims_sCAP('APPID'); } else {setTimeout('PREshow765()', 1000);return; }
 if (typeof none != "undefined" ){aims_setCustomerInfo('STATE',none, '765');aims_sCAP('STATE');} 
 if (C2CFlag765==true){aims_initializeChat(765);C2CFlag765=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.765")',3000);  
 }

 function PREshow766(){
 pauid["766"]=false; paift["766"]=3;pauha["766"]='TestLink'; 
 if ( typeof pacim["766"] == "undefined" ){pacim["766"]="aimsChatIcon"; }
 pacu["766"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["766"]='';  ptoimua["766"]='';  ptoiua["766"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('426', '766');aims_sCAP('APPID'); } else {setTimeout('PREshow766()', 1000);return; }
 if (typeof none != "undefined" ){aims_setCustomerInfo('STATE',none, '766');aims_sCAP('STATE');} 
 if (C2CFlag766==true){aims_initializeChat(766);C2CFlag766=false;}
 setTimeout('sendPREUpdates("icoShown.766")',3000);  
 }

 function PREshow767(){
 if(PREimgName==null || PREimgName!='VZBGCTChat.gif'){
 pacia["767"]=PREImageIconURL+'VZBGCTChat.gif'; paciu["767"]=PREImageIconURL+'VZBGCTChat_unavailable.gif'; pauid["767"]=true; paift["767"]=1;
  if ( typeof pacim["767"] == "undefined" ){pacim["767"]="aimsChatIcon"; }
 pacu["767"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["767"]='';  ptoimua["767"]='';  ptoiua["767"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('427', '767');aims_sCAP('APPID'); } else {setTimeout('PREshow767()', 1000);return; }
 if (C2CFlag767==true){aims_initializeChat(767);C2CFlag767=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.767")',3000);  
 }

 function PREshow768(){
 if(PREimgName==null || PREimgName!='Intuit.jpg'){
 pacia["768"]=PREImageIconURL+'Intuit.jpg'; paciu["768"]=PREImageIconURL+'Intuit_unavailable.jpg'; pauid["768"]=true; paift["768"]=1;
  if ( typeof pacim["768"] == "undefined" ){pacim["768"]="aimsChatIcon"; }
 pacu["768"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["768"]='';  ptoimua["768"]='';  ptoiua["768"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('434', '768');aims_sCAP('APPID'); } else {setTimeout('PREshow768()', 1000);return; }
 if (C2CFlag768==true){aims_initializeChat(768);C2CFlag768=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.768")',3000);  
 }

 function PREshow769(){
 if(PREimgName==null || PREimgName!='Intuit.gif'){
 pacia["769"]=PREImageIconURL+'Intuit.gif'; paciu["769"]=PREImageIconURL+'Intuit_unavailable.gif'; pauid["769"]=true; paift["769"]=1;
  if ( typeof pacim["769"] == "undefined" ){pacim["769"]="aimsChatIcon"; }
 pacu["769"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["769"]='';  ptoimua["769"]='';  ptoiua["769"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('435', '769');aims_sCAP('APPID'); } else {setTimeout('PREshow769()', 1000);return; }
 if (C2CFlag769==true){aims_initializeChat(769);C2CFlag769=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.769")',3000);  
 }

 function PREshow770(){
 if(PREimgName==null || PREimgName!='Google.jpg'){
 pacia["770"]=PREImageIconURL+'Google.jpg'; paciu["770"]=PREImageIconURL+'Google_unavailable.jpg'; pauid["770"]=true; paift["770"]=1;
  if ( typeof pacim["770"] == "undefined" ){pacim["770"]="aimsChatIcon"; }
 pacu["770"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["770"]='';  ptoimua["770"]='';  ptoiua["770"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('436', '770');aims_sCAP('APPID'); } else {setTimeout('PREshow770()', 1000);return; }
 if (C2CFlag770==true){aims_initializeChat(770);C2CFlag770=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.770")',3000);  
 }

 function PREshow771(){
 if(PREimgName==null || PREimgName!='Google.gif'){
 pacia["771"]=PREImageIconURL+'Google.gif'; paciu["771"]=PREImageIconURL+'Google_unavailable.gif'; pauid["771"]=true; paift["771"]=1;
  if ( typeof pacim["771"] == "undefined" ){pacim["771"]="aimsChatIcon"; }
 pacu["771"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["771"]='';  ptoimua["771"]='';  ptoiua["771"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('437', '771');aims_sCAP('APPID'); } else {setTimeout('PREshow771()', 1000);return; }
 if (C2CFlag771==true){aims_initializeChat(771);C2CFlag771=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.771")',3000);  
 }

 function PREshow772(){
 if(PREimgName==null || PREimgName!='IntuitNewInvite.gif'){
 I2CFlag=true; if ( typeof pacim["772"] == "undefined" ){pacim["772"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["772"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["772"]='';  ptoimua["772"]='';  ptoiua["772"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('434', '772');aims_sCAP('APPID'); } else {setTimeout('PREshow772()', 1000);return; }
 if (typeof none != "undefined" ){aims_setCustomerInfo('STATE',none, '772');aims_sCAP('STATE');} 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(772)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/IntuitNewInvite.gif' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[772]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(772)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/IntuitNewInvite_close.gif' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='IntuitNewInvite.gif'; 	PRElastAction='invShown' + '.' + 772; 	aims_I2CInitialze(772);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["772"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["772"]=true;paift["772"]=1;setTimeout( 'resetPGS('+'772'+')' , 3000 );setTimeout( 'aims_initializeChat('+'772'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.772")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow773(){
 if(PREimgName==null || PREimgName!='IntuitNewInvite.gif'){
 I2CFlag=true; if ( typeof pacim["773"] == "undefined" ){pacim["773"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["773"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["773"]='';  ptoimua["773"]='';  ptoiua["773"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('435', '773');aims_sCAP('APPID'); } else {setTimeout('PREshow773()', 1000);return; }
 if (typeof none != "undefined" ){aims_setCustomerInfo('STATE',none, '773');aims_sCAP('STATE');} 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(773)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/IntuitNewInvite.gif' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[773]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(773)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/IntuitNewInvite_close.gif' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='IntuitNewInvite.gif'; 	PRElastAction='invShown' + '.' + 773; 	aims_I2CInitialze(773);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["773"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["773"]=true;paift["773"]=1;setTimeout( 'resetPGS('+'773'+')' , 3000 );setTimeout( 'aims_initializeChat('+'773'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.773")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow774(){
 if(PREimgName==null || PREimgName!='VZBVECHeader.gif'){
 pacia["774"]=PREImageIconURL+'VZBVECHeader.gif'; paciu["774"]=PREImageIconURL+'VZBVECHeader_unavailable.gif'; pauid["774"]=true; paift["774"]=1;
  if ( typeof pacim["774"] == "undefined" ){pacim["774"]="aimsChatIcon"; }
 pacu["774"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["774"]='';  ptoimua["774"]='';  ptoiua["774"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('443', '774');aims_sCAP('APPID'); } else {setTimeout('PREshow774()', 1000);return; }
 if (C2CFlag774==true){aims_initializeChat(774);C2CFlag774=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.774")',3000);  
 }

 function PREshow775(){
 if(PREimgName==null || PREimgName!='VZBVECContactUs.gif'){
 pacia["775"]=PREImageIconURL+'VZBVECContactUs.gif'; paciu["775"]=PREImageIconURL+'VZBVECContactUs_unavailable.gif'; pauid["775"]=true; paift["775"]=1;
  if ( typeof pacim["775"] == "undefined" ){pacim["775"]="aimsChatIcon"; }
 pacu["775"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["775"]='';  ptoimua["775"]='';  ptoiua["775"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('443', '775');aims_sCAP('APPID'); } else {setTimeout('PREshow775()', 1000);return; }
 if (C2CFlag775==true){aims_initializeChat(775);C2CFlag775=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.775")',3000);  
 }

 function PREshow776(){
 if(PREimgName==null || PREimgName!='VZBVECHeader.gif'){
 pacia["776"]=PREImageIconURL+'VZBVECHeader.gif'; paciu["776"]=PREImageIconURL+'VZBVECHeader_unavailable.gif'; pauid["776"]=true; paift["776"]=1;
  if ( typeof pacim["776"] == "undefined" ){pacim["776"]="aimsChatIcon"; }
 pacu["776"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["776"]='';  ptoimua["776"]='';  ptoiua["776"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('439', '776');aims_sCAP('APPID'); } else {setTimeout('PREshow776()', 1000);return; }
 if (C2CFlag776==true){aims_initializeChat(776);C2CFlag776=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.776")',3000);  
 }

 function PREshow777(){
 if(PREimgName==null || PREimgName!='VZBVECContactUs.gif'){
 pacia["777"]=PREImageIconURL+'VZBVECContactUs.gif'; paciu["777"]=PREImageIconURL+'VZBVECContactUs_unavailable.gif'; pauid["777"]=true; paift["777"]=1;
  if ( typeof pacim["777"] == "undefined" ){pacim["777"]="aimsChatIcon"; }
 pacu["777"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["777"]='';  ptoimua["777"]='';  ptoiua["777"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('439', '777');aims_sCAP('APPID'); } else {setTimeout('PREshow777()', 1000);return; }
 if (C2CFlag777==true){aims_initializeChat(777);C2CFlag777=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.777")',3000);  
 }

 function PREshow778(){
 if(PREimgName==null || PREimgName!='fioschat.jpg'){
 pacia["778"]=PREImageIconURL+'fioschat.jpg'; paciu["778"]=PREImageIconURL+'fioschat_unavailable.jpg'; pauid["778"]=true; paift["778"]=1;
  if ( typeof pacim["778"] == "undefined" ){pacim["778"]="aimsChatIcon"; }
 pacu["778"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["778"]='';  ptoimua["778"]='';  ptoiua["778"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('430', '778');aims_sCAP('APPID'); } else {setTimeout('PREshow778()', 1000);return; }
 if (C2CFlag778==true){aims_initializeChat(778);C2CFlag778=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.778")',3000);  
 }

 function PREshow779(){
 if(PREimgName==null || PREimgName!='fioschat.jpg'){
 pacia["779"]=PREImageIconURL+'fioschat.jpg'; paciu["779"]=PREImageIconURL+'fioschat_unavailable.jpg'; pauid["779"]=true; paift["779"]=1;
  if ( typeof pacim["779"] == "undefined" ){pacim["779"]="aimsChatIcon"; }
 pacu["779"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["779"]='';  ptoimua["779"]='';  ptoiua["779"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('431', '779');aims_sCAP('APPID'); } else {setTimeout('PREshow779()', 1000);return; }
 if (C2CFlag779==true){aims_initializeChat(779);C2CFlag779=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.779")',3000);  
 }

 function PREshow780(){
 if(PREimgName==null || PREimgName!='fioschat.jpg'){
 pacia["780"]=PREImageIconURL+'fioschat.jpg'; paciu["780"]=PREImageIconURL+'fioschat_unavailable.jpg'; pauid["780"]=true; paift["780"]=1;
  if ( typeof pacim["780"] == "undefined" ){pacim["780"]="aimsChatIcon"; }
 pacu["780"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["780"]='';  ptoimua["780"]='';  ptoiua["780"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('432', '780');aims_sCAP('APPID'); } else {setTimeout('PREshow780()', 1000);return; }
 if (C2CFlag780==true){aims_initializeChat(780);C2CFlag780=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.780")',3000);  
 }

 function PREshow781(){
 if(PREimgName==null || PREimgName!='fioschat.jpg'){
 pacia["781"]=PREImageIconURL+'fioschat.jpg'; paciu["781"]=PREImageIconURL+'fioschat_unavailable.jpg'; pauid["781"]=true; paift["781"]=1;
  if ( typeof pacim["781"] == "undefined" ){pacim["781"]="aimsChatIcon"; }
 pacu["781"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["781"]='';  ptoimua["781"]='';  ptoiua["781"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('433', '781');aims_sCAP('APPID'); } else {setTimeout('PREshow781()', 1000);return; }
 if (C2CFlag781==true){aims_initializeChat(781);C2CFlag781=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.781")',3000);  
 }

 function PREshow782(){
 if(PREimgName==null || PREimgName!='fioschat.jpg'){
 pacia["782"]=PREImageIconURL+'fioschat.jpg'; paciu["782"]=PREImageIconURL+'fioschat_unavailable.jpg'; pauid["782"]=true; paift["782"]=1;
  if ( typeof pacim["782"] == "undefined" ){pacim["782"]="aimsChatIcon"; }
 pacu["782"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["782"]='';  ptoimua["782"]='';  ptoiua["782"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('448', '782');aims_sCAP('APPID'); } else {setTimeout('PREshow782()', 1000);return; }
 if (C2CFlag782==true){aims_initializeChat(782);C2CFlag782=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.782")',3000);  
 }

 function PREshow783(){
 if(PREimgName==null || PREimgName!='vzbChatAvailable.jpg'){
 pacia["783"]=PREImageIconURL+'vzbChatAvailable.jpg'; paciu["783"]=PREImageIconURL+'vzbChatAvailable_unavailable.jpg'; pauid["783"]=true; paift["783"]=1;
  if ( typeof pacim["783"] == "undefined" ){pacim["783"]="aimsChatIcon"; }
 pacu["783"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["783"]='';  ptoimua["783"]='';  ptoiua["783"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('365', '783');aims_sCAP('APPID'); } else {setTimeout('PREshow783()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '783');aims_sCAP('STATE');} 
 if (typeof aimsQueue != "undefined" ){aims_setCustomerInfo('OTHER',aimsQueue, '783'); aims_sCAP('OTHER'); } 
 if (C2CFlag783==true){aims_initializeChat(783);C2CFlag783=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.783")',3000);  
 }

 function PREshow784(){
 if(PREimgName==null || PREimgName!='vzbChatAvailable.jpg'){
 pacia["784"]=PREImageIconURL+'vzbChatAvailable.jpg'; paciu["784"]=PREImageIconURL+'vzbChatAvailable_unavailable.jpg'; pauid["784"]=true; paift["784"]=1;
  if ( typeof pacim["784"] == "undefined" ){pacim["784"]="aimsChatIcon"; }
 pacu["784"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["784"]='';  ptoimua["784"]='';  ptoiua["784"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('431', '784');aims_sCAP('APPID'); } else {setTimeout('PREshow784()', 1000);return; }
 if (C2CFlag784==true){aims_initializeChat(784);C2CFlag784=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.784")',3000);  
 }

 function PREshow785(){
 if(PREimgName==null || PREimgName!='vzbChatAvailable.jpg'){
 pacia["785"]=PREImageIconURL+'vzbChatAvailable.jpg'; paciu["785"]=PREImageIconURL+'vzbChatAvailable_unavailable.jpg'; pauid["785"]=true; paift["785"]=1;
  if ( typeof pacim["785"] == "undefined" ){pacim["785"]="aimsChatIcon"; }
 pacu["785"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["785"]='';  ptoimua["785"]='';  ptoiua["785"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('819', '785');aims_sCAP('APPID'); } else {setTimeout('PREshow785()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '785');aims_sCAP('STATE');} 
 if (C2CFlag785==true){aims_initializeChat(785);C2CFlag785=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.785")',3000);  
 }

 function PREshow786(){
 if(PREimgName==null || PREimgName!='Shoppingchat_now.jpg'){
 pacia["786"]=PREImageIconURL+'Shoppingchat_now.jpg'; paciu["786"]=PREImageIconURL+'Shoppingchat_now_unavailable.jpg'; pauid["786"]=true; paift["786"]=1;
  if ( typeof pacim["786"] == "undefined" ){pacim["786"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["786"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["786"]='';  ptoimua["786"]='';  ptoiua["786"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1110', '786');aims_sCAP('APPID'); } else {setTimeout('PREshow786()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '786'); aims_sCAP('OTHER'); } 
 if (C2CFlag786==true){aims_initializeChat(786);C2CFlag786=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.786")',3000);  
 }

 function PREshow787(){
 if(PREimgName==null || PREimgName!='Shoppingchat_now.jpg'){
     PREMasterTreatment=true; 
pacim["750"]="aimsChatIcon1";pacim["786"]="aimsChatIcon2";setTimeout('sendPREUpdates("' + 'icoShown.787' + '")',50);setTimeout('PREshow750()', 1000 );setTimeout('PREshow786()', 3000 ); } 
 }

 function PREshow788(){
 if(PREimgName==null || PREimgName!='vzbChatAvailable.jpg'){
 pacia["788"]=PREImageIconURL+'vzbChatAvailable.jpg'; paciu["788"]=PREImageIconURL+'vzbChatAvailable_unavailable.jpg'; pauid["788"]=true; paift["788"]=1;
  if ( typeof pacim["788"] == "undefined" ){pacim["788"]="aimsChatIcon"; }
 pacu["788"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["788"]='';  ptoimua["788"]='';  ptoiua["788"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('451', '788');aims_sCAP('APPID'); } else {setTimeout('PREshow788()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '788');aims_sCAP('STATE');} 
 if (typeof aimsQueue != "undefined" ){aims_setCustomerInfo('OTHER',aimsQueue, '788'); aims_sCAP('OTHER'); } 
 if (C2CFlag788==true){aims_initializeChat(788);C2CFlag788=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.788")',3000);  
 }

 function PREshow789(){
 if(PREimgName==null || PREimgName!='vzbChatAvailable.jpg'){
 pacia["789"]=PREImageIconURL+'vzbChatAvailable.jpg'; paciu["789"]=PREImageIconURL+'vzbChatAvailable_unavailable.jpg'; pauid["789"]=true; paift["789"]=1;
  if ( typeof pacim["789"] == "undefined" ){pacim["789"]="aimsChatIcon"; }
 pacu["789"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["789"]='';  ptoimua["789"]='';  ptoiua["789"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('451', '789');aims_sCAP('APPID'); } else {setTimeout('PREshow789()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '789');aims_sCAP('STATE');} 
 if (typeof aimsQueue != "undefined" ){aims_setCustomerInfo('OTHER',aimsQueue, '789'); aims_sCAP('OTHER'); } 
 if (C2CFlag789==true){aims_initializeChat(789);C2CFlag789=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.789")',3000);  
 }

 function PREshow790(){
 if(PREimgName==null || PREimgName!='IntuitEmailchat.jpg'){
 pacia["790"]=PREImageIconURL+'IntuitEmailchat.jpg'; paciu["790"]=PREImageIconURL+'IntuitEmailchat_unavailable.jpg'; pauid["790"]=true; paift["790"]=1;
  if ( typeof pacim["790"] == "undefined" ){pacim["790"]="aimsChatIcon"; }
 pacu["790"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["790"]='';  ptoimua["790"]='';  ptoiua["790"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('434', '790');aims_sCAP('APPID'); } else {setTimeout('PREshow790()', 1000);return; }
 if (C2CFlag790==true){aims_initializeChat(790);C2CFlag790=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.790")',3000);  
 }

 function PREshow791(){
 if(PREimgName==null || PREimgName!='VZBNetworx.gif'){
 pacia["791"]=PREImageIconURL+'VZBNetworx.gif'; paciu["791"]=PREImageIconURL+'VZBNetworx_unavailable.gif'; pauid["791"]=true; paift["791"]=1;
  if ( typeof pacim["791"] == "undefined" ){pacim["791"]="aimsChatIcon"; }
 pacu["791"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["791"]='';  ptoimua["791"]='';  ptoiua["791"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('508', '791');aims_sCAP('APPID'); } else {setTimeout('PREshow791()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '791');aims_sCAP('STATE');} 
 if (C2CFlag791==true){aims_initializeChat(791);C2CFlag791=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.791")',3000);  
 }

 function PREshow792(){
 if(PREimgName==null || PREimgName!='VZBCLiveChat.gif'){
 pacia["792"]=PREImageIconURL+'VZBCLiveChat.gif'; paciu["792"]=PREImageIconURL+'VZBCLiveChat_unavailable.gif'; pauid["792"]=true; paift["792"]=1;
  if ( typeof pacim["792"] == "undefined" ){pacim["792"]="aimsChatIcon"; }
 pacu["792"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["792"]='';  ptoimua["792"]='';  ptoiua["792"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1135', '792');aims_sCAP('APPID'); } else {setTimeout('PREshow792()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '792');aims_sCAP('STATE');} 
 if (C2CFlag792==true){aims_initializeChat(792);C2CFlag792=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.792")',3000);  
 }

 function PREshow793(){
 if(PREimgName==null || PREimgName!='vzbmb_chaticon.jpg'){
 pacia["793"]=PREImageIconURL+'vzbmb_chaticon.jpg'; paciu["793"]=PREImageIconURL+'vzbmb_chaticon_unavailable.jpg'; pauid["793"]=true; paift["793"]=1;
  if ( typeof pacim["793"] == "undefined" ){pacim["793"]="aimsChatIcon"; }
 pacu["793"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["793"]='';  ptoimua["793"]='';  ptoiua["793"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('515', '793');aims_sCAP('APPID'); } else {setTimeout('PREshow793()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '793');aims_sCAP('STATE');} 
 if (C2CFlag793==true){aims_initializeChat(793);C2CFlag793=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.793")',3000);  
 }

 function PREshow794(){
 if(PREimgName==null || PREimgName!='fioschat.jpg.gif'){
 pacia["794"]=PREImageIconURL+'fioschat.jpg.gif'; paciu["794"]=PREImageIconURL+'fioschat_unavailable.jpg'; pauid["794"]=true; paift["794"]=1;
  if ( typeof pacim["794"] == "undefined" ){pacim["794"]="aimsChatIcon"; }
 pacu["794"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["794"]='';  ptoimua["794"]='';  ptoiua["794"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1139', '794');aims_sCAP('APPID'); } else {setTimeout('PREshow794()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '794');aims_sCAP('STATE');} 
 if (C2CFlag794==true){aims_initializeChat(794);C2CFlag794=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.794")',3000);  
 }

 function PREshow795(){
 if(PREimgName==null || PREimgName!='addrval.jpg'){
 pacia["795"]=PREImageIconURL+'addrval.jpg'; paciu["795"]=PREImageIconURL+'addrval_unavailable.jpg'; pauid["795"]=true; paift["795"]=1;
  if ( typeof pacim["795"] == "undefined" ){pacim["795"]="aimsChatIcon"; }
 pacu["795"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["795"]='';  ptoimua["795"]='';  ptoiua["795"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('502', '795');aims_sCAP('APPID'); } else {setTimeout('PREshow795()', 1000);return; }
 if (typeof aimsInfo != "undefined" ){aims_setCustomerInfo('OTHER',aimsInfo, '795'); aims_sCAP('OTHER'); } 
 if (C2CFlag795==true){aims_initializeChat(795);C2CFlag795=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.795")',3000);  
 }

 function PREshow796(){
 if(PREimgName==null || PREimgName!='webchat_on_aims.png'){
 pacia["796"]=PREImageIconURL+'webchat_on_aims.png'; paciu["796"]=PREImageIconURL+'webchat_on_aims_unavailable.png'; pauid["796"]=true; paift["796"]=1;
  if ( typeof pacim["796"] == "undefined" ){pacim["796"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["796"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["796"]='';  ptoimua["796"]='';  ptoiua["796"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('511', '796');aims_sCAP('APPID'); } else {setTimeout('PREshow796()', 1000);return; }
 if (typeof aimsTicketType != "undefined" ){aims_setCustomerInfo('OTHER',aimsTicketType, '796'); aims_sCAP('OTHER'); } 
 if (C2CFlag796==true){aims_initializeChat(796);C2CFlag796=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.796")',3000);  
 }

 function PREshow797(){
 if(PREimgName==null || PREimgName!='VZBNetworx.gif'){
 pacia["797"]=PREImageIconURL+'VZBNetworx.gif'; paciu["797"]=PREImageIconURL+'VZBNetworx_unavailable.gif'; pauid["797"]=true; paift["797"]=1;
  if ( typeof pacim["797"] == "undefined" ){pacim["797"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["797"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["797"]='';  ptoimua["797"]='';  ptoiua["797"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('508', '797');aims_sCAP('APPID'); } else {setTimeout('PREshow797()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '797');aims_sCAP('STATE');} 
 if (C2CFlag797==true){aims_initializeChat(797);C2CFlag797=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.797")',3000);  
 }

 function PREshow798(){
 if(PREimgName==null || PREimgName!='vzbmb_chaticon.jpg'){
 pacia["798"]=PREImageIconURL+'vzbmb_chaticon.jpg'; paciu["798"]=PREImageIconURL+'vzbmb_chaticon_unavailable.jpg'; pauid["798"]=true; paift["798"]=1;
  if ( typeof pacim["798"] == "undefined" ){pacim["798"]="aimsChatIcon"; }
 pacu["798"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["798"]='';  ptoimua["798"]='';  ptoiua["798"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('515', '798');aims_sCAP('APPID'); } else {setTimeout('PREshow798()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '798');aims_sCAP('STATE');} 
 if (C2CFlag798==true){aims_initializeChat(798);C2CFlag798=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.798")',3000);  
 }

 function PREshow799(){
 if(PREimgName==null || PREimgName!='chat_72x18.png'){
 pacia["799"]=PREImageIconURL+'chat_72x18.png'; paciu["799"]=PREImageIconURL+'chat_72x18_unavailable.png'; pauid["799"]=true; paift["799"]=1;
  if ( typeof pacim["799"] == "undefined" ){pacim["799"]="aimsChatIcon"; }
 pacu["799"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["799"]='';  ptoimua["799"]='';  ptoiua["799"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1147', '799');aims_sCAP('APPID'); } else {setTimeout('PREshow799()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '799');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '799'); aims_sCAP('OTHER'); } 
 if (C2CFlag799==true){aims_initializeChat(799);C2CFlag799=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.799")',3000);  
 }

 function PREshow800(){
 if(PREimgName==null || PREimgName!='learn_newinvite_phoenix.png'){
 I2CFlag=true; if ( typeof pacim["800"] == "undefined" ){pacim["800"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["800"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["800"]='';  ptoimua["800"]='';  ptoiua["800"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1147', '800');aims_sCAP('APPID'); } else {setTimeout('PREshow800()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '800');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '800'); aims_sCAP('OTHER'); } 
 divHtml="<div id='aimslayer' style='left: 10px; top: 90px; line-height: 1; visibility: hidden; position: absolute; z-index: 99999999; bgcolor: #000000;' name='aimslayer'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='padding: 0px;'><a name='needRef' title='Invitation' id='needRef' onclick='return PREacceptCall(800)' href='javascript:void(0);' target='_self'><img name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' src='https://collaborateext.verizon.com/pre/prescripts/images/learn_newinvite_phoenix.png' border='0'></a>"+ptoia[800]+"<div id='aimsdenyinvite' style='left: 225px; top: 170px; position: absolute;'><a style='font-family: Verdana; font-size: 14px; font-weight: bold; text-decoration: none;' onclick='return PRErejectCall(800)' href='javascript:void(0);' target='_self'>No thanks</a></div></td></tr></tbody></table></div>"; 
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='learn_newinvite_phoenix.png'; 	PRElastAction='invShown' + '.' + 800; 	aims_I2CInitialze(800);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["800"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["800"]=true;paift["800"]=1;setTimeout( 'resetPGS('+'800'+')' , 3000 );setTimeout( 'aims_initializeChat('+'800'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.800")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow801(){
 if(PREimgName==null || PREimgName!='SMBOrderBackoutNewI2C.gif'){
 I2CFlag=true; if ( typeof pacim["801"] == "undefined" ){pacim["801"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["801"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["801"]='';  ptoimua["801"]='';  ptoiua["801"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1147', '801');aims_sCAP('APPID'); } else {setTimeout('PREshow801()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '801');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '801'); aims_sCAP('OTHER'); } 
 divHtml="<div id='aimslayer' style='left: 10px; top: 90px; line-height: 1; visibility: hidden; position: absolute; z-index: 99999999; bgcolor: #000000;' name='aimslayer'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='padding: 0px;'><a name='needRef' title='Invitation' id='needRef' onclick='return PREacceptCall(801)' href='javascript:void(0);' target='_self'><img name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' src='https://collaborateext.verizon.com/pre/prescripts/images/SMBOrderBackoutNewI2C.gif' border='0'></a>"+ptoia[801]+"<div id='aimsdenyinvite' style='left: 225px; top: 170px; position: absolute;'><a style='font-family: Verdana; font-size: 14px; font-weight: bold; text-decoration: none;' onclick='return PRErejectCall(801)' href='javascript:void(0);' target='_self'>No thanks</a></div></td></tr></tbody></table></div>"; 
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='SMBOrderBackoutNewI2C.gif'; 	PRElastAction='invShown' + '.' + 801; 	aims_I2CInitialze(801);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["801"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["801"]=true;paift["801"]=1;setTimeout( 'resetPGS('+'801'+')' , 3000 );setTimeout( 'aims_initializeChat('+'801'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.801")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow802(){
 if(PREimgName==null || PREimgName!='SMBDotComLegacyC2C.jpg'){
 pacia["802"]=PREImageIconURL+'SMBDotComLegacyC2C.jpg'; paciu["802"]=PREImageIconURL+'SMBDotComLegacyC2C_unavailable.jpg'; pauid["802"]=true; paift["802"]=1;
  if ( typeof pacim["802"] == "undefined" ){pacim["802"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["802"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["802"]='';  ptoimua["802"]='';  ptoiua["802"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1146', '802');aims_sCAP('APPID'); } else {setTimeout('PREshow802()', 1000);return; }
 if (typeof aimsInfo != "undefined" ){aims_setCustomerInfo('OTHER',aimsInfo, '802'); aims_sCAP('OTHER'); } 
 if (C2CFlag802==true){aims_initializeChat(802);C2CFlag802=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.802")',3000);  
 }

 function PREshow803(){
 if(PREimgName==null || PREimgName!='chat_72x18.png'){
 pacia["803"]=PREImageIconURL+'chat_72x18.png'; paciu["803"]=PREImageIconURL+'chat_72x18_unavailable.png'; pauid["803"]=true; paift["803"]=1;
  if ( typeof pacim["803"] == "undefined" ){pacim["803"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["803"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["803"]='';  ptoimua["803"]='';  ptoiua["803"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1146', '803');aims_sCAP('APPID'); } else {setTimeout('PREshow803()', 1000);return; }
 if (typeof aimsInfo != "undefined" ){aims_setCustomerInfo('OTHER',aimsInfo, '803'); aims_sCAP('OTHER'); } 
 if (C2CFlag803==true){aims_initializeChat(803);C2CFlag803=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.803")',3000);  
 }

 function PREshow804(){
 if(PREimgName==null || PREimgName!='learn_newinvite_phoenix.png'){
 I2CFlag=true; if ( typeof pacim["804"] == "undefined" ){pacim["804"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["804"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["804"]='';  ptoimua["804"]='';  ptoiua["804"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1146', '804');aims_sCAP('APPID'); } else {setTimeout('PREshow804()', 1000);return; }
 divHtml="<div id='aimslayer' style='left: 10px; top: 90px; line-height: 1; visibility: hidden; position: absolute; z-index: 99999999; bgcolor: #000000;' name='aimslayer'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='padding: 0px;'><a name='needRef' title='Invitation' id='needRef' onclick='return PREacceptCall(804)' href='javascript:void(0);' target='_self'><img name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' src='https://collaborateext.verizon.com/pre/prescripts/images/learn_newinvite_phoenix.png' border='0'></a>"+ptoia[804]+"<div id='aimsdenyinvite' style='left: 225px; top: 170px; position: absolute;'><a style='font-family: Verdana; font-size: 14px; font-weight: bold; text-decoration: none;' onclick='return PRErejectCall(804)' href='javascript:void(0);' target='_self'>No thanks</a></div></td></tr></tbody></table></div>"; 
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='learn_newinvite_phoenix.png'; 	PRElastAction='invShown' + '.' + 804; 	aims_I2CInitialze(804);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["804"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["804"]=true;paift["804"]=1;setTimeout( 'resetPGS('+'804'+')' , 3000 );setTimeout( 'aims_initializeChat('+'804'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.804")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow805(){
 if(PREimgName==null || PREimgName!='SMBDotComHomePage.jpg'){
 pacia["805"]=PREImageIconURL+'SMBDotComHomePage.jpg'; paciu["805"]=PREImageIconURL+'SMBDotComHomePage_unavailable.jpg'; pauid["805"]=true; paift["805"]=1;
  if ( typeof pacim["805"] == "undefined" ){pacim["805"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["805"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["805"]='';  ptoimua["805"]='';  ptoiua["805"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1146', '805');aims_sCAP('APPID'); } else {setTimeout('PREshow805()', 1000);return; }
 if (typeof aimsInfo != "undefined" ){aims_setCustomerInfo('OTHER',aimsInfo, '805'); aims_sCAP('OTHER'); } 
 if (C2CFlag805==true){aims_initializeChat(805);C2CFlag805=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.805")',3000);  
 }

 function PREshow806(){
 if(PREimgName==null || PREimgName!='SMBPortalC2C.gif'){
 pacia["806"]=PREImageIconURL+'SMBPortalC2C.gif'; paciu["806"]=PREImageIconURL+'SMBPortalC2C_unavailable.gif'; pauid["806"]=true; paift["806"]=1;
  if ( typeof pacim["806"] == "undefined" ){pacim["806"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["806"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["806"]='';  ptoimua["806"]='';  ptoiua["806"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('517', '806');aims_sCAP('APPID'); } else {setTimeout('PREshow806()', 1000);return; }
 if (typeof aimsInfo != "undefined" ){aims_setCustomerInfo('OTHER',aimsInfo, '806'); aims_sCAP('OTHER'); } 
 if (C2CFlag806==true){aims_initializeChat(806);C2CFlag806=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.806")',3000);  
 }

 function PREshow807(){
 if(PREimgName==null || PREimgName!='SMBPortalI2CNew.gif'){
 I2CFlag=true; if ( typeof pacim["807"] == "undefined" ){pacim["807"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["807"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["807"]='';  ptoimua["807"]='';  ptoiua["807"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('517', '807');aims_sCAP('APPID'); } else {setTimeout('PREshow807()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '807');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '807'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(807)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/SMBPortalI2CNew.gif' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[807]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(807)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/SMBPortalI2CNew_close.gif' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='SMBPortalI2CNew.gif'; 	PRElastAction='invShown' + '.' + 807; 	aims_I2CInitialze(807);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["807"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["807"]=true;paift["807"]=1;setTimeout( 'resetPGS('+'807'+')' , 3000 );setTimeout( 'aims_initializeChat('+'807'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.807")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow808(){
 if(PREimgName==null || PREimgName!='MB_C2C.jpg'){
 pacia["808"]=PREImageIconURL+'MB_C2C.jpg'; paciu["808"]=PREImageIconURL+'MB_C2C_unavailable.jpg'; pauid["808"]=true; paift["808"]=1;
  if ( typeof pacim["808"] == "undefined" ){pacim["808"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["808"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["808"]='';  ptoimua["808"]='';  ptoiua["808"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('519', '808');aims_sCAP('APPID'); } else {setTimeout('PREshow808()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '808');aims_sCAP('STATE');} 
 if (C2CFlag808==true){aims_initializeChat(808);C2CFlag808=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.808")',3000);  
 }

 function PREshow809(){
 pauid["809"]=false; paift["809"]=3;pauha["809"]='Chat now with a Verizon representative'; 
 if ( typeof pacim["809"] == "undefined" ){pacim["809"]="aimsChatIcon"; }
 pacu["809"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["809"]='';  ptoimua["809"]='';  ptoiua["809"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('519', '809');aims_sCAP('APPID'); } else {setTimeout('PREshow809()', 1000);return; }
 if (typeof aimsInfo != "undefined" ){aims_setCustomerInfo('OTHER',aimsInfo, '809'); aims_sCAP('OTHER'); } 
 if (C2CFlag809==true){aims_initializeChat(809);C2CFlag809=false;}
 setTimeout('sendPREUpdates("icoShown.809")',3000);  
 }

 function PREshow810(){
 if(PREimgName==null || PREimgName!='MB_C2C.jpg'){
     PREMasterTreatment=true; 
pacim["809"]="aimsChatIcon1";pacim["808"]="aimsChatIcon2";setTimeout('sendPREUpdates("' + 'icoShown.810' + '")',50);setTimeout('PREshow809()', 1000 );setTimeout('PREshow808()', 3000 ); } 
 }

 function PREshow811(){
 if(PREimgName==null || PREimgName!='MBI2C_ProactiveIcon.png'){
 I2CFlag=true; if ( typeof pacim["811"] == "undefined" ){pacim["811"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["811"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["811"]='';  ptoimua["811"]='';  ptoiua["811"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('519', '811');aims_sCAP('APPID'); } else {setTimeout('PREshow811()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '811');aims_sCAP('STATE');} 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(811)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/MBI2C_ProactiveIcon.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[811]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(811)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/MBI2C_ProactiveIcon_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='MBI2C_ProactiveIcon.png'; 	PRElastAction='invShown' + '.' + 811; 	aims_I2CInitialze(811);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["811"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["811"]=true;paift["811"]=1;setTimeout( 'resetPGS('+'811'+')' , 3000 );setTimeout( 'aims_initializeChat('+'811'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.811")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow812(){
 if(PREimgName==null || PREimgName!='icon_liveChat.jpg'){
 pacia["812"]=PREImageIconURL+'icon_liveChat.jpg'; paciu["812"]=PREImageIconURL+'icon_liveChat_unavailable.jpg'; pauid["812"]=true; paift["812"]=1;
  if ( typeof pacim["812"] == "undefined" ){pacim["812"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["812"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["812"]='';  ptoimua["812"]='';  ptoiua["812"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1176', '812');aims_sCAP('APPID'); } else {setTimeout('PREshow812()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '812'); aims_sCAP('OTHER'); } 
 if (C2CFlag812==true){aims_initializeChat(812);C2CFlag812=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.812")',3000);  
 }

 function PREshow813(){
 if(PREimgName==null || PREimgName!='IAD.gif'){
 pacia["813"]=PREImageIconURL+'IAD.gif'; paciu["813"]=PREImageIconURL+'IAD_unavailable.gif'; pauid["813"]=true; paift["813"]=1;
  if ( typeof pacim["813"] == "undefined" ){pacim["813"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["813"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["813"]='';  ptoimua["813"]='';  ptoiua["813"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('518', '813');aims_sCAP('APPID'); } else {setTimeout('PREshow813()', 1000);return; }
 if (typeof aimsInfo != "undefined" ){aims_setCustomerInfo('OTHER',aimsInfo, '813'); aims_sCAP('OTHER'); } 
 if (C2CFlag813==true){aims_initializeChat(813);C2CFlag813=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.813")',3000);  
 }

 function PREshow814(){
 if(PREimgName==null || PREimgName!='learn_newinvite_phoenix.png'){
 I2CFlag=true; if ( typeof pacim["814"] == "undefined" ){pacim["814"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["814"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["814"]='';  ptoimua["814"]='';  ptoiua["814"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1176', '814');aims_sCAP('APPID'); } else {setTimeout('PREshow814()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '814');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '814'); aims_sCAP('OTHER'); } 
 divHtml="<div id='aimslayer' style='left: 10px; top: 90px; line-height: 1; visibility: hidden; position: absolute; z-index: 99999999; bgcolor: #000000;' name='aimslayer'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='padding: 0px;'><a name='needRef' title='Invitation' id='needRef' onclick='return PREacceptCall(814)' href='javascript:void(0);' target='_self'><img name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' src='https://collaborateext.verizon.com/pre/prescripts/images/learn_newinvite_phoenix.png' border='0'></a>"+ptoia[814]+"<div id='aimsdenyinvite' style='left: 225px; top: 170px; position: absolute;'><a style='font-family: Verdana; font-size: 14px; font-weight: bold; text-decoration: none;' onclick='return PRErejectCall(814)' href='javascript:void(0);' target='_self'>No thanks</a></div></td></tr></tbody></table></div>"; 
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='learn_newinvite_phoenix.png'; 	PRElastAction='invShown' + '.' + 814; 	aims_I2CInitialze(814);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["814"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["814"]=true;paift["814"]=1;setTimeout( 'resetPGS('+'814'+')' , 3000 );setTimeout( 'aims_initializeChat('+'814'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.814")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow815(){
 if(PREimgName==null || PREimgName!='chat_moreinfo_chatnow_alt_130x31.png'){
 pacia["815"]=PREImageIconURL+'chat_moreinfo_chatnow_alt_130x31.png'; paciu["815"]=PREImageIconURL+'chat_moreinfo_chatnow_alt_130x31_unavailable.png'; pauid["815"]=true; paift["815"]=1;
  if ( typeof pacim["815"] == "undefined" ){pacim["815"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["815"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["815"]='';  ptoimua["815"]='';  ptoiua["815"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1148', '815');aims_sCAP('APPID'); } else {setTimeout('PREshow815()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '815');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '815'); aims_sCAP('OTHER'); } 
 if (C2CFlag815==true){aims_initializeChat(815);C2CFlag815=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.815")',3000);  
 }

 function PREshow816(){
 if(PREimgName==null || PREimgName!='rta_fallout_new_i2c.gif'){
 I2CFlag=true; if ( typeof pacim["816"] == "undefined" ){pacim["816"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["816"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["816"]='';  ptoimua["816"]='';  ptoiua["816"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1148', '816');aims_sCAP('APPID'); } else {setTimeout('PREshow816()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '816');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '816'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(816)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/rta_fallout_new_i2c.gif' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[816]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(816)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/rta_fallout_new_i2c_close.gif' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='rta_fallout_new_i2c.gif'; 	PRElastAction='invShown' + '.' + 816; 	aims_I2CInitialze(816);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["816"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["816"]=true;paift["816"]=1;setTimeout( 'resetPGS('+'816'+')' , 3000 );setTimeout( 'aims_initializeChat('+'816'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.816")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow817(){
 if(PREimgName==null || PREimgName!='hmc_learn_c2c.gif'){
 pacia["817"]=PREImageIconURL+'hmc_learn_c2c.gif'; paciu["817"]=PREImageIconURL+'hmc_learn_c2c_unavailable.gif'; pauid["817"]=true; paift["817"]=1;
  if ( typeof pacim["817"] == "undefined" ){pacim["817"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["817"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["817"]='';  ptoimua["817"]='';  ptoiua["817"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1145', '817');aims_sCAP('APPID'); } else {setTimeout('PREshow817()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '817');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '817'); aims_sCAP('OTHER'); } 
 if (C2CFlag817==true){aims_initializeChat(817);C2CFlag817=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.817")',3000);  
 }

 function PREshow818(){
 if(PREimgName==null || PREimgName!='hmc_shop_ctc.jpg'){
 pacia["818"]=PREImageIconURL+'hmc_shop_ctc.jpg'; paciu["818"]=PREImageIconURL+'hmc_shop_ctc_unavailable.jpg'; pauid["818"]=true; paift["818"]=1;
  if ( typeof pacim["818"] == "undefined" ){pacim["818"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["818"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["818"]='';  ptoimua["818"]='';  ptoiua["818"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1145', '818');aims_sCAP('APPID'); } else {setTimeout('PREshow818()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '818');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '818'); aims_sCAP('OTHER'); } 
 if (C2CFlag818==true){aims_initializeChat(818);C2CFlag818=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.818")',3000);  
 }

 function PREshow819(){
 if(PREimgName==null || PREimgName!='hmc_i2c_learn.gif'){
 I2CFlag=true; if ( typeof pacim["819"] == "undefined" ){pacim["819"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["819"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["819"]='';  ptoimua["819"]='';  ptoiua["819"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1145', '819');aims_sCAP('APPID'); } else {setTimeout('PREshow819()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '819');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '819'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(819)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/hmc_i2c_learn.gif' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[819]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(819)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/hmc_i2c_learn_close.gif' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='hmc_i2c_learn.gif'; 	PRElastAction='invShown' + '.' + 819; 	aims_I2CInitialze(819);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["819"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["819"]=true;paift["819"]=1;setTimeout( 'resetPGS('+'819'+')' , 3000 );setTimeout( 'aims_initializeChat('+'819'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.819")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow820(){
 if(PREimgName==null || PREimgName!='call_56x18.png'){
 pacia["820"]=PREImageIconURL+'call_56x18.png'; paciu["820"]=PREImageIconURL+'call_56x18_unavailable.png'; pauid["820"]=true; paift["820"]=1;
  if ( typeof pacim["820"] == "undefined" ){pacim["820"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["820"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["820"]='';  ptoimua["820"]='';  ptoiua["820"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('532', '820');aims_sCAP('APPID'); } else {setTimeout('PREshow820()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '820');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '820'); aims_sCAP('OTHER'); } 
 if (C2CFlag820==true){aims_initializeChat(820);C2CFlag820=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.820")',3000);  
 }

 function PREshow821(){
 if(PREimgName==null || PREimgName!='callmaster.jpg'){
     PREMasterTreatment=true; 
pacim["929"]="aimsChatIcon2";pacim["799"]="aimsChatIcon3";pacim["933"]="aimsChatIcon4";pacim["934"]="aimsChatIcon1";setTimeout('sendPREUpdates("' + 'icoShown.821' + '")',50);setTimeout('PREshow934()', 1000 );setTimeout('PREshow929()', 3000 );setTimeout('PREshow799()', 5000 );setTimeout('PREshow933()', 7000 ); } 
 }

 function PREshow822(){
 if(PREimgName==null || PREimgName!='SMBCreditI2CNew.gif'){
 I2CFlag=true; if ( typeof pacim["822"] == "undefined" ){pacim["822"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["822"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["822"]='';  ptoimua["822"]='';  ptoiua["822"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('531', '822');aims_sCAP('APPID'); } else {setTimeout('PREshow822()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '822');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '822'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(822)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/SMBCreditI2CNew.gif' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[822]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(822)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/SMBCreditI2CNew_close.gif' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='SMBCreditI2CNew.gif'; 	PRElastAction='invShown' + '.' + 822; 	aims_I2CInitialze(822);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["822"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["822"]=true;paift["822"]=1;setTimeout( 'resetPGS('+'822'+')' , 3000 );setTimeout( 'aims_initializeChat('+'822'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.822")',3000);  
 }

 function PREshow823(){
 if(PREimgName==null || PREimgName!='smbcreditc2c.jpg'){
 pacia["823"]=PREImageIconURL+'smbcreditc2c.jpg'; paciu["823"]=PREImageIconURL+'smbcreditc2c_unavailable.jpg'; pauid["823"]=true; paift["823"]=1;
  if ( typeof pacim["823"] == "undefined" ){pacim["823"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["823"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["823"]='';  ptoimua["823"]='';  ptoiua["823"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('531', '823');aims_sCAP('APPID'); } else {setTimeout('PREshow823()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '823');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '823'); aims_sCAP('OTHER'); } 
 if (C2CFlag823==true){aims_initializeChat(823);C2CFlag823=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.823")',3000);  
 }

 function PREshow824(){
 if(PREimgName==null || PREimgName!='SMBDotComNewRedC2C.png'){
 pacia["824"]=PREImageIconURL+'SMBDotComNewRedC2C.png'; paciu["824"]=PREImageIconURL+'SMBDotComNewRedC2C_unavailable.png'; pauid["824"]=true; paift["824"]=1;
  if ( typeof pacim["824"] == "undefined" ){pacim["824"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["824"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["824"]='';  ptoimua["824"]='';  ptoiua["824"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('865', '824');aims_sCAP('APPID'); } else {setTimeout('PREshow824()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '824');aims_sCAP('STATE');} 
 if (C2CFlag824==true){aims_initializeChat(824);C2CFlag824=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.824")',3000);  
 }

 function PREshow825(){
 if(PREimgName==null || PREimgName!='hmc_newcheckout_i2c.gif'){
 I2CFlag=true; if ( typeof pacim["825"] == "undefined" ){pacim["825"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["825"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["825"]='';  ptoimua["825"]='';  ptoiua["825"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1145', '825');aims_sCAP('APPID'); } else {setTimeout('PREshow825()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '825');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '825'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(825)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/hmc_newcheckout_i2c.gif' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[825]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(825)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/hmc_newcheckout_i2c_close.gif' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='hmc_newcheckout_i2c.gif'; 	PRElastAction='invShown' + '.' + 825; 	aims_I2CInitialze(825);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["825"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["825"]=true;paift["825"]=1;setTimeout( 'resetPGS('+'825'+')' , 3000 );setTimeout( 'aims_initializeChat('+'825'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.825")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow826(){
 if(PREimgName==null || PREimgName!='MBBillingRed.jpg'){
 pacia["826"]=PREImageIconURL+'MBBillingRed.jpg'; paciu["826"]=PREImageIconURL+'MBBillingRed_unavailable.jpg'; pauid["826"]=true; paift["826"]=1;
  if ( typeof pacim["826"] == "undefined" ){pacim["826"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["826"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["826"]='';  ptoimua["826"]='';  ptoiua["826"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('544', '826');aims_sCAP('APPID'); } else {setTimeout('PREshow826()', 1000);return; }
 if (C2CFlag826==true){aims_initializeChat(826);C2CFlag826=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.826")',3000);  
 }

 function PREshow827(){
 if(PREimgName==null || PREimgName!='VZBMBThinkSkinIPBB.gif'){
 pacia["827"]=PREImageIconURL+'VZBMBThinkSkinIPBB.gif'; paciu["827"]=PREImageIconURL+'VZBMBThinkSkinIPBB_unavailable.gif'; pauid["827"]=true; paift["827"]=1;
  if ( typeof pacim["827"] == "undefined" ){pacim["827"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["827"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["827"]='';  ptoimua["827"]='';  ptoiua["827"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('542', '827');aims_sCAP('APPID'); } else {setTimeout('PREshow827()', 1000);return; }
 if (C2CFlag827==true){aims_initializeChat(827);C2CFlag827=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.827")',3000);  
 }

 function PREshow828(){
 if(PREimgName==null || PREimgName!='MBSalesOrdering.jpg'){
 pacia["828"]=PREImageIconURL+'MBSalesOrdering.jpg'; paciu["828"]=PREImageIconURL+'MBSalesOrdering_unavailable.jpg'; pauid["828"]=true; paift["828"]=1;
  if ( typeof pacim["828"] == "undefined" ){pacim["828"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["828"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["828"]='';  ptoimua["828"]='';  ptoiua["828"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('519', '828');aims_sCAP('APPID'); } else {setTimeout('PREshow828()', 1000);return; }
 if (C2CFlag828==true){aims_initializeChat(828);C2CFlag828=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.828")',3000);  
 }

 function PREshow829(){
 if(PREimgName==null || PREimgName!='MBContactSalesGrey.jpg'){
 pacia["829"]=PREImageIconURL+'MBContactSalesGrey.jpg'; paciu["829"]=PREImageIconURL+'MBContactSalesGrey_unavailable.jpg'; pauid["829"]=true; paift["829"]=1;
  if ( typeof pacim["829"] == "undefined" ){pacim["829"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["829"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["829"]='';  ptoimua["829"]='';  ptoiua["829"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('519', '829');aims_sCAP('APPID'); } else {setTimeout('PREshow829()', 1000);return; }
 if (C2CFlag829==true){aims_initializeChat(829);C2CFlag829=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.829")',3000);  
 }

 function PREshow830(){
 if(PREimgName==null || PREimgName!='MBContactBillingGrey.jpg'){
 pacia["830"]=PREImageIconURL+'MBContactBillingGrey.jpg'; paciu["830"]=PREImageIconURL+'MBContactBillingGrey_unavailable.jpg'; pauid["830"]=true; paift["830"]=1;
  if ( typeof pacim["830"] == "undefined" ){pacim["830"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["830"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["830"]='';  ptoimua["830"]='';  ptoiua["830"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('544', '830');aims_sCAP('APPID'); } else {setTimeout('PREshow830()', 1000);return; }
 if (C2CFlag830==true){aims_initializeChat(830);C2CFlag830=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.830")',3000);  
 }

 function PREshow831(){
 if(PREimgName==null || PREimgName!='MBContacthelpdeskGrey.gif'){
 pacia["831"]=PREImageIconURL+'MBContacthelpdeskGrey.gif'; paciu["831"]=PREImageIconURL+'MBContacthelpdeskGrey_unavailable.gif'; pauid["831"]=true; paift["831"]=1;
  if ( typeof pacim["831"] == "undefined" ){pacim["831"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["831"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["831"]='';  ptoimua["831"]='';  ptoiua["831"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('545', '831');aims_sCAP('APPID'); } else {setTimeout('PREshow831()', 1000);return; }
 if (C2CFlag831==true){aims_initializeChat(831);C2CFlag831=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.831")',3000);  
 }

 function PREshow832(){
 if(PREimgName==null || PREimgName!='MBContactMaster.gif'){
     PREMasterTreatment=true; 
pacim["830"]="aimsChatIcon2";pacim["831"]="aimsChatIcon3";pacim["829"]="aimsChatIcon1";setTimeout('sendPREUpdates("' + 'icoShown.832' + '")',50);setTimeout('PREshow829()', 1000 );setTimeout('PREshow830()', 3000 );setTimeout('PREshow831()', 5000 ); } 
 }

 function PREshow833(){
 if(PREimgName==null || PREimgName!='SMBSaveOrderEmailNew.gif'){
 pacia["833"]=PREImageIconURL+'SMBSaveOrderEmailNew.gif'; paciu["833"]=PREImageIconURL+'SMBSaveOrderEmailNew_unavailable.gif'; pauid["833"]=true; paift["833"]=1;
  if ( typeof pacim["833"] == "undefined" ){pacim["833"]="aimsChatIcon"; }
 pacu["833"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["833"]='';  ptoimua["833"]='';  ptoiua["833"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('519', '833');aims_sCAP('APPID'); } else {setTimeout('PREshow833()', 1000);return; }
 if (C2CFlag833==true){aims_initializeChat(833);C2CFlag833=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.833")',3000);  
 }

 function PREshow834(){
 if(PREimgName==null || PREimgName!='ConsumerEmailBlast.jpg'){
 pacia["834"]=PREImageIconURL+'ConsumerEmailBlast.jpg'; paciu["834"]=PREImageIconURL+'ConsumerEmailBlast_unavailable.jpg'; pauid["834"]=true; paift["834"]=1;
  if ( typeof pacim["834"] == "undefined" ){pacim["834"]="aimsChatIcon"; }
 pacu["834"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["834"]='';  ptoimua["834"]='';  ptoiua["834"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('519', '834');aims_sCAP('APPID'); } else {setTimeout('PREshow834()', 1000);return; }
 if (C2CFlag834==true){aims_initializeChat(834);C2CFlag834=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.834")',3000);  
 }

 function PREshow835(){
 if(PREimgName==null || PREimgName!='chat_72x18.png'){
 pacia["835"]=PREImageIconURL+'chat_72x18.png'; paciu["835"]=PREImageIconURL+'chat_72x18_unavailable.png'; pauid["835"]=true; paift["835"]=1;
  if ( typeof pacim["835"] == "undefined" ){pacim["835"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["835"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["835"]='';  ptoimua["835"]='';  ptoiua["835"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('543', '835');aims_sCAP('APPID'); } else {setTimeout('PREshow835()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '835');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '835'); aims_sCAP('OTHER'); } 
 if (C2CFlag835==true){aims_initializeChat(835);C2CFlag835=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.835")',3000);  
 }

 function PREshow836(){
 if(PREimgName==null || PREimgName!='SMBSaveOrderNew.gif'){
 I2CFlag=true; if ( typeof pacim["836"] == "undefined" ){pacim["836"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["836"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["836"]='';  ptoimua["836"]='';  ptoiua["836"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('543', '836');aims_sCAP('APPID'); } else {setTimeout('PREshow836()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '836');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '836'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(836)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/SMBSaveOrderNew.gif' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[836]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(836)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/SMBSaveOrderNew_close.gif' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='SMBSaveOrderNew.gif'; 	PRElastAction='invShown' + '.' + 836; 	aims_I2CInitialze(836);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["836"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["836"]=true;paift["836"]=1;setTimeout( 'resetPGS('+'836'+')' , 3000 );setTimeout( 'aims_initializeChat('+'836'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.836")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow837(){
 if(PREimgName==null || PREimgName!='call_56x18.png'){
 pacia["837"]=PREImageIconURL+'call_56x18.png'; paciu["837"]=PREImageIconURL+'call_56x18_unavailable.png'; pauid["837"]=true; paift["837"]=1;
  if ( typeof pacim["837"] == "undefined" ){pacim["837"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["837"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["837"]='';  ptoimua["837"]='';  ptoiua["837"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('532', '837');aims_sCAP('APPID'); } else {setTimeout('PREshow837()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '837');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '837'); aims_sCAP('OTHER'); } 
 if (C2CFlag837==true){aims_initializeChat(837);C2CFlag837=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.837")',3000);  
 }

 function PREshow838(){
 if(PREimgName==null || PREimgName!='master_addchserv.jpg'){
     PREMasterTreatment=true; 
pacim["929"]="aimsChatIcon4";pacim["799"]="aimsChatIcon1";pacim["933"]="aimsChatIcon2";pacim["934"]="aimsChatIcon3";setTimeout('sendPREUpdates("' + 'icoShown.838' + '")',50);setTimeout('PREshow799()', 1000 );setTimeout('PREshow933()', 3000 );setTimeout('PREshow934()', 5000 );setTimeout('PREshow929()', 7000 ); } 
 }

 function PREshow839(){
 if(PREimgName==null || PREimgName!='whatsnextcons_avail.jpg'){
 pacia["839"]=PREImageIconURL+'whatsnextcons_avail.jpg'; paciu["839"]=PREImageIconURL+'whatsnextcons_avail_unavailable.jpg'; pauid["839"]=true; paift["839"]=1;
  if ( typeof pacim["839"] == "undefined" ){pacim["839"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["839"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["839"]='';  ptoimua["839"]='';  ptoiua["839"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('548', '839');aims_sCAP('APPID'); } else {setTimeout('PREshow839()', 1000);return; }
 if (C2CFlag839==true){aims_initializeChat(839);C2CFlag839=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.839")',3000);  
 }

 function PREshow840(){
 if(PREimgName==null || PREimgName!='whatsnextbuss_avail.jpg'){
 pacia["840"]=PREImageIconURL+'whatsnextbuss_avail.jpg'; paciu["840"]=PREImageIconURL+'whatsnextbuss_avail_unavailable.jpg'; pauid["840"]=true; paift["840"]=1;
  if ( typeof pacim["840"] == "undefined" ){pacim["840"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["840"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["840"]='';  ptoimua["840"]='';  ptoiua["840"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('549', '840');aims_sCAP('APPID'); } else {setTimeout('PREshow840()', 1000);return; }
 if (C2CFlag840==true){aims_initializeChat(840);C2CFlag840=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.840")',3000);  
 }

 function PREshow841(){
 if(PREimgName==null || PREimgName!='rapreg_avail.jpg'){
 pacia["841"]=PREImageIconURL+'rapreg_avail.jpg'; paciu["841"]=PREImageIconURL+'rapreg_avail_unavailable.jpg'; pauid["841"]=true; paift["841"]=1;
  if ( typeof pacim["841"] == "undefined" ){pacim["841"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["841"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["841"]='';  ptoimua["841"]='';  ptoiua["841"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('550', '841');aims_sCAP('APPID'); } else {setTimeout('PREshow841()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '841');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '841'); aims_sCAP('OTHER'); } 
 if (C2CFlag841==true){aims_initializeChat(841);C2CFlag841=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.841")',3000);  
 }

 function PREshow842(){
 if(PREimgName==null || PREimgName!='rapfios_avail.jpg'){
 pacia["842"]=PREImageIconURL+'rapfios_avail.jpg'; paciu["842"]=PREImageIconURL+'rapfios_avail_unavailable.jpg'; pauid["842"]=true; paift["842"]=1;
  if ( typeof pacim["842"] == "undefined" ){pacim["842"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["842"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["842"]='';  ptoimua["842"]='';  ptoiua["842"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('551', '842');aims_sCAP('APPID'); } else {setTimeout('PREshow842()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '842');aims_sCAP('STATE');} 
 if (C2CFlag842==true){aims_initializeChat(842);C2CFlag842=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.842")',3000);  
 }

 function PREshow843(){
 if(PREimgName==null || PREimgName!='rap_i2c.gif'){
 I2CFlag=true; if ( typeof pacim["843"] == "undefined" ){pacim["843"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["843"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["843"]='';  ptoimua["843"]='';  ptoiua["843"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('550', '843');aims_sCAP('APPID'); } else {setTimeout('PREshow843()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '843');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '843'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(843)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/rap_i2c.gif' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[843]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(843)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/rap_i2c_close.gif' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='rap_i2c.gif'; 	PRElastAction='invShown' + '.' + 843; 	aims_I2CInitialze(843);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["843"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["843"]=true;paift["843"]=1;setTimeout( 'resetPGS('+'843'+')' , 3000 );setTimeout( 'aims_initializeChat('+'843'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.843")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow844(){
 if(PREimgName==null || PREimgName!='smb_save_c2call_master.jpg'){
     PREMasterTreatment=true; 
pacim["820"]="aimsChatIcon2";pacim["835"]="aimsChatIcon1";setTimeout('sendPREUpdates("' + 'icoShown.844' + '")',50);setTimeout('PREshow835()', 1000 );setTimeout('PREshow820()', 3000 ); } 
 }

 function PREshow845(){
 if(PREimgName==null || PREimgName!='MBNew_C2C.gif'){
 pacia["845"]=PREImageIconURL+'MBNew_C2C.gif'; paciu["845"]=PREImageIconURL+'MBNew_C2C_unavailable.gif'; pauid["845"]=true; paift["845"]=1;
  if ( typeof pacim["845"] == "undefined" ){pacim["845"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["845"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["845"]='';  ptoimua["845"]='';  ptoiua["845"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('519', '845');aims_sCAP('APPID'); } else {setTimeout('PREshow845()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '845');aims_sCAP('STATE');} 
 if (C2CFlag845==true){aims_initializeChat(845);C2CFlag845=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.845")',3000);  
 }

 function PREshow846(){
 if(PREimgName==null || PREimgName!='speedtest_avail.jpg'){
 pacia["846"]=PREImageIconURL+'speedtest_avail.jpg'; paciu["846"]=PREImageIconURL+'speedtest_avail_unavailable.jpg'; pauid["846"]=true; paift["846"]=1;
  if ( typeof pacim["846"] == "undefined" ){pacim["846"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["846"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["846"]='';  ptoimua["846"]='';  ptoiua["846"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('819', '846');aims_sCAP('APPID'); } else {setTimeout('PREshow846()', 1000);return; }
 if (C2CFlag846==true){aims_initializeChat(846);C2CFlag846=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.846")',3000);  
 }

 function PREshow847(){
 if(PREimgName==null || PREimgName!='c2c_lcinsearch_grey.gif'){
 pacia["847"]=PREImageIconURL+'c2c_lcinsearch_grey.gif'; paciu["847"]=PREImageIconURL+'c2c_lcinsearch_grey_unavailable.gif'; pauid["847"]=true; paift["847"]=1;
  if ( typeof pacim["847"] == "undefined" ){pacim["847"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["847"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["847"]='';  ptoimua["847"]='';  ptoiua["847"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('954', '847');aims_sCAP('APPID'); } else {setTimeout('PREshow847()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '847'); aims_sCAP('OTHER'); } 
 if (C2CFlag847==true){aims_initializeChat(847);C2CFlag847=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.847")',3000);  
 }

 function PREshow848(){
 if(PREimgName==null || PREimgName!='VZBMBThinkSkinHD.gif'){
 pacia["848"]=PREImageIconURL+'VZBMBThinkSkinHD.gif'; paciu["848"]=PREImageIconURL+'VZBMBThinkSkinHD_unavailable.gif'; pauid["848"]=true; paift["848"]=1;
  if ( typeof pacim["848"] == "undefined" ){pacim["848"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["848"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["848"]='';  ptoimua["848"]='';  ptoiua["848"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('553', '848');aims_sCAP('APPID'); } else {setTimeout('PREshow848()', 1000);return; }
 if (C2CFlag848==true){aims_initializeChat(848);C2CFlag848=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.848")',3000);  
 }

 function PREshow849(){
 pauid["849"]=false; paift["849"]=3;pauha["849"]='<div class="cnt"><p style="font-style:normal;font-weight: normal; color: #666">I want to </p><a href="javascript:void(0);" class="hp-chat">Chat with an expert</a></div>'; 
 if ( typeof pacim["849"] == "undefined" ){pacim["849"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["849"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["849"]='';  ptoimua["849"]='';  ptoiua["849"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1146', '849');aims_sCAP('APPID'); } else {setTimeout('PREshow849()', 1000);return; }
 if (typeof aimsInfo != "undefined" ){aims_setCustomerInfo('OTHER',aimsInfo, '849'); aims_sCAP('OTHER'); } 
 if (C2CFlag849==true){aims_initializeChat(849);C2CFlag849=false;}
 setTimeout('sendPREUpdates("icoShown.849")',3000);  
 }

 function PREshow850(){
 if(PREimgName==null || PREimgName!='IHASelfInstallC2C.jpg'){
 pacia["850"]=PREImageIconURL+'IHASelfInstallC2C.jpg'; paciu["850"]=PREImageIconURL+'IHASelfInstallC2C_unavailable.jpg'; pauid["850"]=true; paift["850"]=1;
  if ( typeof pacim["850"] == "undefined" ){pacim["850"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["850"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["850"]='';  ptoimua["850"]='';  ptoiua["850"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('551', '850');aims_sCAP('APPID'); } else {setTimeout('PREshow850()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '850');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '850'); aims_sCAP('OTHER'); } 
 if (C2CFlag850==true){aims_initializeChat(850);C2CFlag850=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.850")',3000);  
 }

 function PREshow851(){
 if(PREimgName==null || PREimgName!='Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png'){
 pacia["851"]=PREImageIconURL+'Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png'; paciu["851"]=PREImageIconURL+'Phoenix_Redesign_Parking_Lot_Expert_Advice_082115_unavailable.png'; if ( typeof pacim["851"] == "undefined" ){pacim["851"]="aimsparkinglayer"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["851"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["851"]='';  ptoimua["851"]='';  ptoiua["851"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1110', '851');aims_sCAP('APPID'); } else {setTimeout('PREshow851()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '851'); aims_sCAP('OTHER'); } 
 if (C2CFlag851==true){C2CFlag851=false;}
  preParkingSide = "left";   
   preflyoutcoords = "240px";    
   preflyincoords = "8px";   
  divHtml="<div name='aimsparkinglayer' id='aimsparkinglayer' style='position: fixed; z-index: 99999999; top:400px; left:8px;  visibility:hidden; '><a href='javascript:void(0);' >  <img  id='parkingchaticon' style=' position: absolute;  cursor: pointer; max-width:none; margin-left:-240px;' name='PREAIMSParkingLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png' border='0' onClick='return PREparkingacceptCall(851)'  onmouseover='PREparkingflyOut()' onmouseout='PREparkingflyIn()' /></a>  </div> " ;      
 if ( !PREParkingshowImage){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimsprkglayerHolderDiv = document.createElement('div');
            aimsprkglayerHolderDiv.setAttribute('id', 'aimsparkinglayerHolder');
            document.body.appendChild(aimsprkglayerHolderDiv);
            document.getElementById("aimsparkinglayerHolder").innerHTML = divHtml;
          }
     }catch(ex){}
 }
  PREimgName='Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png'; 	PRElastAction='invShown' + '.' + 851; 	aims_parkingInitialze(851);
 } 
 setTimeout('sendPREUpdates("icoShown.851")',3000);  
 }

 function PREshow852(){
 if(PREimgName==null || PREimgName!='ACS_ChatOnline_ON.gif'){
 if (isUserOniPad()) { 
 pacia["852"]=PREImageIconURL+'ACS_ChatOnline_ON.gif'; paciu["852"]=PREImageIconURL+'ACS_ChatOnline_ON_unavailable.gif'; } else if (isUserOnMobile()  ||  isUserOnFireFoxMobile() || isUserOnMobile2()) { 
 pacia["852"]=PREImageIconURL+'ACS_ChatOnline_ON_mobile.gif'; paciu["852"]=PREImageIconURL+'ACS_ChatOnline_ON_mobile_unavailable.gif'; } else { 
 pacia["852"]=PREImageIconURL+'ACS_ChatOnline_ON.gif'; paciu["852"]=PREImageIconURL+'ACS_ChatOnline_ON_unavailable.gif'; } 
 pauid["852"]=true; paift["852"]=1;
  if ( typeof pacim["852"] == "undefined" ){pacim["852"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["852"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["852"]='';  ptoimua["852"]='';  ptoiua["852"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('556', '852');aims_sCAP('APPID'); } else {setTimeout('PREshow852()', 1000);return; }
 if (C2CFlag852==true){aims_initializeChat(852);C2CFlag852=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.852")',3000);  
 }

 function PREshow853(){
 if(PREimgName==null || PREimgName!='chat_button_spa_hd2.png'){
 pacia["853"]=PREImageIconURL+'chat_button_spa_hd2.png'; paciu["853"]=PREImageIconURL+'chat_button_spa_hd2_unavailable.png'; pauid["853"]=true; paift["853"]=1;
  if ( typeof pacim["853"] == "undefined" ){pacim["853"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["853"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["853"]='';  ptoimua["853"]='';  ptoiua["853"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('714', '853');aims_sCAP('APPID'); } else {setTimeout('PREshow853()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '853'); aims_sCAP('OTHER'); } 
 if (C2CFlag853==true){aims_initializeChat(853);C2CFlag853=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.853")',3000);  
 }

 function PREshow854(){
 if(PREimgName==null || PREimgName!='Phoenix_Spanish_invite.png'){
 I2CFlag=true; if ( typeof pacim["854"] == "undefined" ){pacim["854"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["854"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["854"]='';  ptoimua["854"]='';  ptoiua["854"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('714', '854');aims_sCAP('APPID'); } else {setTimeout('PREshow854()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '854'); aims_sCAP('OTHER'); } 
 divHtml="<div id='aimslayer' style='left: 10px; top: 90px; line-height: 1; visibility: hidden; position: absolute; z-index: 99999999; bgcolor: #000000;' name='aimslayer'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='padding: 0px;'><a name='needRef' title='Invitation' id='needRef' onclick='return PREacceptCall(854)' href='javascript:void(0);' target='_self'><img name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' src='https://collaborateext.verizon.com/pre/prescripts/images/Phoenix_Spanish_invite.png' border='0'></a>"+ptoia[854]+"<div id='aimsdenyinvite' style='left: 225px; top: 170px; position: absolute;'><a style='font-family: Verdana; font-size: 14px; font-weight: bold; text-decoration: none;' onclick='return PRErejectCall(854)' href='javascript:void(0);' target='_self'>No gracias</a></div></td></tr></tbody></table></div>"; 
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='Phoenix_Spanish_invite.png'; 	PRElastAction='invShown' + '.' + 854; 	aims_I2CInitialze(854);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["854"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["854"]=true;paift["854"]=1;setTimeout( 'resetPGS('+'854'+')' , 3000 );setTimeout( 'aims_initializeChat('+'854'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.854")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow855(){
 if(PREimgName==null || PREimgName!='HSITabletRapFlowC2C.png'){
 pacia["855"]=PREImageIconURL+'HSITabletRapFlowC2C.png'; paciu["855"]=PREImageIconURL+'HSITabletRapFlowC2C_unavailable.png'; pauid["855"]=true; paift["855"]=1;
  if ( typeof pacim["855"] == "undefined" ){pacim["855"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["855"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["855"]='';  ptoimua["855"]='';  ptoiua["855"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('560', '855');aims_sCAP('APPID'); } else {setTimeout('PREshow855()', 1000);return; }
 if (typeof aimsLob != "undefined" ){aims_setCustomerInfo('OTHER',aimsLob, '855'); aims_sCAP('OTHER'); } 
 if (C2CFlag855==true){aims_initializeChat(855);C2CFlag855=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.855")',3000);  
 }

 function PREshow856(){
 if(PREimgName==null || PREimgName!='VALinksOnInvite_I2C.png'){
 I2CFlag=true; if ( typeof pacim["856"] == "undefined" ){pacim["856"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["856"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["856"]='<div id=preTextHolder style=position:absolute;left:33px;top:150px;z-index:9999999999;width:58%;height:120px;><div id=preText style=position:relative;><a href="#" style="line-height: 22px;font-size:11px;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImage("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=74&lob=CTPN&initQ=Is service available at my address?",1,856);\'>Is service available at my address?</a><br><a href="#" style="line-height: 22px;font-size:11px;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImage("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=74&lob=CTPN&initQ=What if I can not order Verizon service for my address?",2,856);\'>What if I can\'t order Verizon service for my address?</a><br><a href="#" style="line-height: 22px;font-size:11px;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImage("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=74&lob=CTPN&initQ=Can you tell me more about plans and channel costs?",3,856);\'>Can you tell me more about plans and channel costs?</a><br><a href="#" style="line-height: 22px;font-size:11px;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;"onClick=\'invokeVAlinkOnImage("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=74&lob=CTPN",4,856);\'>More...</a></div></div>';  ptoimua["856"]='';  ptoiua["856"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1110', '856');aims_sCAP('APPID'); } else {setTimeout('PREshow856()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '856'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(856)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/VALinksOnInvite_I2C.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[856]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(856)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/VALinksOnInvite_I2C_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='VALinksOnInvite_I2C.png'; 	PRElastAction='invShown' + '.' + 856; 	aims_I2CInitialze(856);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["856"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["856"]=true;paift["856"]=1;setTimeout( 'resetPGS('+'856'+')' , 3000 );setTimeout( 'aims_initializeChat('+'856'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.856")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow857(){
 if(PREimgName==null || PREimgName!='RsdGlobalHomeC2CAd.jpg'){
 pacia["857"]=PREImageIconURL+'RsdGlobalHomeC2CAd.jpg'; paciu["857"]=PREImageIconURL+'RsdGlobalHomeC2CAd_unavailable.jpg'; pauid["857"]=true; paift["857"]=1;
  if ( typeof pacim["857"] == "undefined" ){pacim["857"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["857"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["857"]='';  ptoimua["857"]='';  ptoiua["857"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('561', '857');aims_sCAP('APPID'); } else {setTimeout('PREshow857()', 1000);return; }
 if (C2CFlag857==true){aims_initializeChat(857);C2CFlag857=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.857")',3000);  
 }

 function PREshow858(){
 if(PREimgName==null || PREimgName!='Sales_SaveOrderNew_C2C.jpg'){
 pacia["858"]=PREImageIconURL+'Sales_SaveOrderNew_C2C.jpg'; paciu["858"]=PREImageIconURL+'Sales_SaveOrderNew_C2C_unavailable.jpg'; pauid["858"]=true; paift["858"]=1;
  if ( typeof pacim["858"] == "undefined" ){pacim["858"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["858"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["858"]='';  ptoimua["858"]='';  ptoiua["858"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('954', '858');aims_sCAP('APPID'); } else {setTimeout('PREshow858()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '858');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '858'); aims_sCAP('OTHER'); } 
 if (C2CFlag858==true){aims_initializeChat(858);C2CFlag858=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.858")',3000);  
 }

 function PREshow859(){
 if(PREimgName==null || PREimgName!='SMBDotComNewRedC2C.gif'){
 pacia["859"]=PREImageIconURL+'SMBDotComNewRedC2C.gif'; paciu["859"]=PREImageIconURL+'SMBDotComNewRedC2C_unavailable.gif'; pauid["859"]=true; paift["859"]=1;
  if ( typeof pacim["859"] == "undefined" ){pacim["859"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["859"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["859"]='';  ptoimua["859"]='';  ptoiua["859"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('575', '859');aims_sCAP('APPID'); } else {setTimeout('PREshow859()', 1000);return; }
 if (C2CFlag859==true){aims_initializeChat(859);C2CFlag859=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.859")',3000);  
 }

 function PREshow860(){
 if(PREimgName==null || PREimgName!='learn_newinvite_phoenix.png'){
 I2CFlag=true; if ( typeof pacim["860"] == "undefined" ){pacim["860"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["860"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["860"]='';  ptoimua["860"]='';  ptoiua["860"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1110', '860');aims_sCAP('APPID'); } else {setTimeout('PREshow860()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '860'); aims_sCAP('OTHER'); } 
 divHtml="<div id='aimslayer' style='left: 10px; top: 90px; line-height: 1; visibility: hidden; position: absolute; z-index: 99999999; bgcolor: #000000;' name='aimslayer'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='padding: 0px;'><a name='needRef' title='Invitation' id='needRef' onclick='return PREacceptCall(860)' href='javascript:void(0);' target='_self'><img name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' src='https://collaborateext.verizon.com/pre/prescripts/images/learn_newinvite_phoenix.png' border='0'></a>"+ptoia[860]+"<div id='aimsdenyinvite' style='left: 225px; top: 170px; position: absolute;'><a style='font-family: Verdana; font-size: 14px; font-weight: bold; text-decoration: none;' onclick='return PRErejectCall(860)' href='javascript:void(0);' target='_self'>No thanks</a></div></td></tr></tbody></table></div>"; 
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='learn_newinvite_phoenix.png'; 	PRElastAction='invShown' + '.' + 860; 	aims_I2CInitialze(860);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["860"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["860"]=true;paift["860"]=1;setTimeout( 'resetPGS('+'860'+')' , 3000 );setTimeout( 'aims_initializeChat('+'860'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.860")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow861(){
 if(PREimgName==null || PREimgName!='HSITabletRapFlowC2C_New.png'){
 pacia["861"]=PREImageIconURL+'HSITabletRapFlowC2C_New.png'; paciu["861"]=PREImageIconURL+'HSITabletRapFlowC2C_New_unavailable.png'; pauid["861"]=true; paift["861"]=1;
  if ( typeof pacim["861"] == "undefined" ){pacim["861"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["861"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["861"]='';  ptoimua["861"]='';  ptoiua["861"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('560', '861');aims_sCAP('APPID'); } else {setTimeout('PREshow861()', 1000);return; }
 if (typeof aimsLob != "undefined" ){aims_setCustomerInfo('OTHER',aimsLob, '861'); aims_sCAP('OTHER'); } 
 if (C2CFlag861==true){aims_initializeChat(861);C2CFlag861=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.861")',3000);  
 }

 function PREshow863(){
 if(PREimgName==null || PREimgName!='Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png'){
 pacia["863"]=PREImageIconURL+'Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png'; paciu["863"]=PREImageIconURL+'Phoenix_Redesign_Parking_Lot_Expert_Advice_082115_unavailable.png'; if ( typeof pacim["863"] == "undefined" ){pacim["863"]="aimsparkinglayer"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["863"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["863"]='';  ptoimua["863"]='';  ptoiua["863"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1146', '863');aims_sCAP('APPID'); } else {setTimeout('PREshow863()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '863'); aims_sCAP('OTHER'); } 
 if (C2CFlag863==true){C2CFlag863=false;}
  preParkingSide = "left";   
   preflyoutcoords = "240px";    
   preflyincoords = "8px";   
  divHtml="<div name='aimsparkinglayer' id='aimsparkinglayer' style='position: fixed; z-index: 99999999; top:400px; left:8px;  visibility:hidden; '><a href='javascript:void(0);' >  <img  id='parkingchaticon' style=' position: absolute;  cursor: pointer; max-width:none; margin-left:-240px;' name='PREAIMSParkingLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png' border='0' onClick='return PREparkingacceptCall(863)'  onmouseover='PREparkingflyOut()' onmouseout='PREparkingflyIn()' /></a>  </div> " ;      
 if ( !PREParkingshowImage){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimsprkglayerHolderDiv = document.createElement('div');
            aimsprkglayerHolderDiv.setAttribute('id', 'aimsparkinglayerHolder');
            document.body.appendChild(aimsprkglayerHolderDiv);
            document.getElementById("aimsparkinglayerHolder").innerHTML = divHtml;
          }
     }catch(ex){}
 }
  PREimgName='Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png'; 	PRElastAction='invShown' + '.' + 863; 	aims_parkingInitialze(863);
 } 
 setTimeout('sendPREUpdates("icoShown.863")',3000);  
 }

 function PREshow864(){
 if(PREimgName==null || PREimgName!='Phoenix_Redesign_Parking_Lot_Guide_You_Along_the_way_082115.png'){
 pacia["864"]=PREImageIconURL+'Phoenix_Redesign_Parking_Lot_Guide_You_Along_the_way_082115.png'; paciu["864"]=PREImageIconURL+'Phoenix_Redesign_Parking_Lot_Guide_You_Along_the_way_082115_unavailable.png'; if ( typeof pacim["864"] == "undefined" ){pacim["864"]="aimsparkinglayer"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["864"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["864"]='';  ptoimua["864"]='';  ptoiua["864"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1147', '864');aims_sCAP('APPID'); } else {setTimeout('PREshow864()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '864'); aims_sCAP('OTHER'); } 
 if (C2CFlag864==true){C2CFlag864=false;}
  preParkingSide = "left";   
   preflyoutcoords = "240px";    
   preflyincoords = "8px";   
  divHtml="<div name='aimsparkinglayer' id='aimsparkinglayer' style='position: fixed; z-index: 99999999; top:400px; left:8px;  visibility:hidden; '><a href='javascript:void(0);' >  <img  id='parkingchaticon' style=' position: absolute;  cursor: pointer; max-width:none; margin-left:-240px;' name='PREAIMSParkingLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/Phoenix_Redesign_Parking_Lot_Guide_You_Along_the_way_082115.png' border='0' onClick='return PREparkingacceptCall(864)'  onmouseover='PREparkingflyOut()' onmouseout='PREparkingflyIn()' /></a>  </div> " ;      
 if ( !PREParkingshowImage){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimsprkglayerHolderDiv = document.createElement('div');
            aimsprkglayerHolderDiv.setAttribute('id', 'aimsparkinglayerHolder');
            document.body.appendChild(aimsprkglayerHolderDiv);
            document.getElementById("aimsparkinglayerHolder").innerHTML = divHtml;
          }
     }catch(ex){}
 }
  PREimgName='Phoenix_Redesign_Parking_Lot_Guide_You_Along_the_way_082115.png'; 	PRElastAction='invShown' + '.' + 864; 	aims_parkingInitialze(864);
 } 
 setTimeout('sendPREUpdates("icoShown.864")',3000);  
 }

 function PREshow865(){
 if(PREimgName==null || PREimgName!='call_56x18.png'){
 pacia["865"]=PREImageIconURL+'call_56x18.png'; paciu["865"]=PREImageIconURL+'call_56x18_unavailable.png'; pauid["865"]=true; paift["865"]=1;
  if ( typeof pacim["865"] == "undefined" ){pacim["865"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["865"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["865"]='';  ptoimua["865"]='';  ptoiua["865"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('532', '865');aims_sCAP('APPID'); } else {setTimeout('PREshow865()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '865');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '865'); aims_sCAP('OTHER'); } 
 if (C2CFlag865==true){aims_initializeChat(865);C2CFlag865=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.865")',3000);  
 }

 function PREshow866(){
 if(PREimgName==null || PREimgName!='SMBLearnC2Call.gif'){
     PREMasterTreatment=true; 
pacim["865"]="aimsChatIcon2";pacim["803"]="aimsChatIcon1";setTimeout('sendPREUpdates("' + 'icoShown.866' + '")',50);setTimeout('PREshow803()', 1000 );setTimeout('PREshow865()', 3000 ); } 
 }

 function PREshow867(){
 if(PREimgName==null || PREimgName!='SpanishRedButton.png'){
 pacia["867"]=PREImageIconURL+'SpanishRedButton.png'; paciu["867"]=PREImageIconURL+'SpanishRedButton_unavailable.png'; pauid["867"]=true; paift["867"]=1;
  if ( typeof pacim["867"] == "undefined" ){pacim["867"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["867"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["867"]='';  ptoimua["867"]='';  ptoiua["867"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('714', '867');aims_sCAP('APPID'); } else {setTimeout('PREshow867()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '867'); aims_sCAP('OTHER'); } 
 if (C2CFlag867==true){aims_initializeChat(867);C2CFlag867=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.867")',3000);  
 }

 function PREshow868(){
 if(PREimgName==null || PREimgName!='SPANishRedButton.png'){
     PREMasterTreatment=true; 
pacim["867"]="aimsChatIcon1";setTimeout('sendPREUpdates("' + 'icoShown.868' + '")',50);setTimeout('PREshow867()', 1000 ); } 
 }

 function PREshow869(){
 if(PREimgName==null || PREimgName!='SpanishShopParking.png'){
 pacia["869"]=PREImageIconURL+'SpanishShopParking.png'; paciu["869"]=PREImageIconURL+'SpanishShopParking_unavailable.png'; if ( typeof pacim["869"] == "undefined" ){pacim["869"]="aimsparkinglayer"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["869"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["869"]='';  ptoimua["869"]='';  ptoiua["869"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('714', '869');aims_sCAP('APPID'); } else {setTimeout('PREshow869()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '869'); aims_sCAP('OTHER'); } 
 if (C2CFlag869==true){C2CFlag869=false;}
  preParkingSide = "left";   
   preflyoutcoords = "240px";    
   preflyincoords = "8px";   
  divHtml="<div name='aimsparkinglayer' id='aimsparkinglayer' style='position: fixed; z-index: 99999999; top:400px; left:8px;  visibility:hidden; '><a href='javascript:void(0);' >  <img  id='parkingchaticon' style=' position: absolute;  cursor: pointer; max-width:none; margin-left:-240px;' name='PREAIMSParkingLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/SpanishShopParking.png' border='0' onClick='return PREparkingacceptCall(869)'  onmouseover='PREparkingflyOut()' onmouseout='PREparkingflyIn()' /></a>  </div> " ;      
 if ( !PREParkingshowImage){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimsprkglayerHolderDiv = document.createElement('div');
            aimsprkglayerHolderDiv.setAttribute('id', 'aimsparkinglayerHolder');
            document.body.appendChild(aimsprkglayerHolderDiv);
            document.getElementById("aimsparkinglayerHolder").innerHTML = divHtml;
          }
     }catch(ex){}
 }
  PREimgName='SpanishShopParking.png'; 	PRElastAction='invShown' + '.' + 869; 	aims_parkingInitialze(869);
 } 
 setTimeout('sendPREUpdates("icoShown.869")',3000);  
 }

 function PREshow870(){
 if(PREimgName==null || PREimgName!='SpanishLearnShopI2C.gif'){
 I2CFlag=true; if ( typeof pacim["870"] == "undefined" ){pacim["870"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["870"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["870"]='';  ptoimua["870"]='';  ptoiua["870"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('714', '870');aims_sCAP('APPID'); } else {setTimeout('PREshow870()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '870'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(870)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/SpanishLearnShopI2C.gif' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[870]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(870)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/SpanishLearnShopI2C_close.gif' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='SpanishLearnShopI2C.gif'; 	PRElastAction='invShown' + '.' + 870; 	aims_I2CInitialze(870);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["870"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["870"]=true;paift["870"]=1;setTimeout( 'resetPGS('+'870'+')' , 3000 );setTimeout( 'aims_initializeChat('+'870'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.870")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow871(){
 if(PREimgName==null || PREimgName!='empty.png'){
 pacia["871"]=PREImageIconURL+'empty.png'; paciu["871"]=PREImageIconURL+'empty_unavailable.png'; pauid["871"]=true; paift["871"]=1;
  if ( typeof pacim["871"] == "undefined" ){pacim["871"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["871"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["871"]='';  ptoimua["871"]='';  ptoiua["871"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('532', '871');aims_sCAP('APPID'); } else {setTimeout('PREshow871()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '871'); aims_sCAP('OTHER'); } 
 if (C2CFlag871==true){aims_initializeChat(871);C2CFlag871=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.871")',3000);  
 }

 function PREshow872(){
 if(PREimgName==null || PREimgName!='spanish_proactive_chat_invite_credit_fail.png'){
 I2CFlag=true; if ( typeof pacim["872"] == "undefined" ){pacim["872"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["872"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["872"]='';  ptoimua["872"]='';  ptoiua["872"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('565', '872');aims_sCAP('APPID'); } else {setTimeout('PREshow872()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '872');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '872'); aims_sCAP('OTHER'); } 
 divHtml="<div id='aimslayer' style='left: 10px; top: 90px; line-height: 1; visibility: hidden; position: absolute; z-index: 99999999; bgcolor: #000000;' name='aimslayer'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='padding: 0px;'><a name='needRef' title='Invitation' id='needRef' onclick='return PREacceptCall(872)' href='javascript:void(0);' target='_self'><img name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' src='https://collaborateext.verizon.com/pre/prescripts/images/spanish_proactive_chat_invite_credit_fail.png' border='0'></a>"+ptoia[872]+"<div id='aimsdenyinvite' style='left: 225px; top: 170px; position: absolute;'><a style='font-family: Verdana; font-size: 14px; font-weight: bold; text-decoration: none;' onclick='return PRErejectCall(872)' href='javascript:void(0);' target='_self'>No gracias</a></div></td></tr></tbody></table></div>"; 
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='spanish_proactive_chat_invite_credit_fail.png'; 	PRElastAction='invShown' + '.' + 872; 	aims_I2CInitialze(872);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["872"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["872"]=true;paift["872"]=1;setTimeout( 'resetPGS('+'872'+')' , 3000 );setTimeout( 'aims_initializeChat('+'872'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.872")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow873(){
 if(PREimgName==null || PREimgName!='chatCVC_button_spanish.png'){
 pacia["873"]=PREImageIconURL+'chatCVC_button_spanish.png'; paciu["873"]=PREImageIconURL+'chatCVC_button_spanish_unavailable.png'; pauid["873"]=true; paift["873"]=1;
  if ( typeof pacim["873"] == "undefined" ){pacim["873"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["873"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["873"]='';  ptoimua["873"]='';  ptoiua["873"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('565', '873');aims_sCAP('APPID'); } else {setTimeout('PREshow873()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '873');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '873'); aims_sCAP('OTHER'); } 
 if (C2CFlag873==true){aims_initializeChat(873);C2CFlag873=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.873")',3000);  
 }

 function PREshow874(){
 if(PREimgName==null || PREimgName!='VECChatNew.png'){
 pacia["874"]=PREImageIconURL+'VECChatNew.png'; paciu["874"]=PREImageIconURL+'VECChatNew_unavailable.png'; pauid["874"]=true; paift["874"]=1;
  if ( typeof pacim["874"] == "undefined" ){pacim["874"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["874"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["874"]='';  ptoimua["874"]='';  ptoiua["874"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('566', '874');aims_sCAP('APPID'); } else {setTimeout('PREshow874()', 1000);return; }
 if (C2CFlag874==true){aims_initializeChat(874);C2CFlag874=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.874")',3000);  
 }

 function PREshow875(){
 if(PREimgName==null || PREimgName!='GOeBusiness_c2c_red.gif'){
 pacia["875"]=PREImageIconURL+'GOeBusiness_c2c_red.gif'; paciu["875"]=PREImageIconURL+'GOeBusiness_c2c_red_unavailable.gif'; pauid["875"]=true; paift["875"]=1;
  if ( typeof pacim["875"] == "undefined" ){pacim["875"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["875"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["875"]='';  ptoimua["875"]='';  ptoiua["875"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('425', '875');aims_sCAP('APPID'); } else {setTimeout('PREshow875()', 1000);return; }
 if (C2CFlag875==true){aims_initializeChat(875);C2CFlag875=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.875")',3000);  
 }

 function PREshow876(){
 if(PREimgName==null || PREimgName!='GOeBusiness_addUser_c2c_red.gif'){
 pacia["876"]=PREImageIconURL+'GOeBusiness_addUser_c2c_red.gif'; paciu["876"]=PREImageIconURL+'GOeBusiness_addUser_c2c_red_unavailable.gif'; pauid["876"]=true; paift["876"]=1;
  if ( typeof pacim["876"] == "undefined" ){pacim["876"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["876"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["876"]='';  ptoimua["876"]='';  ptoiua["876"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('425', '876');aims_sCAP('APPID'); } else {setTimeout('PREshow876()', 1000);return; }
 if (C2CFlag876==true){aims_initializeChat(876);C2CFlag876=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.876")',3000);  
 }

 function PREshow877(){
 if(PREimgName==null || PREimgName!='VZBECommC2C.png'){
 pacia["877"]=PREImageIconURL+'VZBECommC2C.png'; paciu["877"]=PREImageIconURL+'VZBECommC2C_unavailable.png'; pauid["877"]=true; paift["877"]=1;
  if ( typeof pacim["877"] == "undefined" ){pacim["877"]="aimsChatIcon"; }
 pacu["877"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["877"]='';  ptoimua["877"]='';  ptoiua["877"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('370', '877');aims_sCAP('APPID'); } else {setTimeout('PREshow877()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '877');aims_sCAP('STATE');} 
 if (C2CFlag877==true){aims_initializeChat(877);C2CFlag877=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.877")',3000);  
 }

 function PREshow878(){
 if(PREimgName==null || PREimgName!='MLPWelcomebackP2C.png'){
 pacia["878"]=PREImageIconURL+'MLPWelcomebackP2C.png'; paciu["878"]=PREImageIconURL+'MLPWelcomebackP2C_unavailable.png'; if ( typeof pacim["878"] == "undefined" ){pacim["878"]="aimsparkinglayer"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["878"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["878"]='';  ptoimua["878"]='';  ptoiua["878"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1197', '878');aims_sCAP('APPID'); } else {setTimeout('PREshow878()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '878');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '878'); aims_sCAP('OTHER'); } 
 if (C2CFlag878==true){C2CFlag878=false;}
  preParkingSide = "left";   
   preflyoutcoords = "240px";    
   preflyincoords = "8px";   
  divHtml="<div name='aimsparkinglayer' id='aimsparkinglayer' style='position: fixed; z-index: 99999999; top:400px; left:8px;  visibility:hidden; '><a href='javascript:void(0);' >  <img  id='parkingchaticon' style=' position: absolute;  cursor: pointer; max-width:none; margin-left:-240px;' name='PREAIMSParkingLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/MLPWelcomebackP2C.png' border='0' onClick='return PREparkingacceptCall(878)'  onmouseover='PREparkingflyOut()' onmouseout='PREparkingflyIn()' /></a>  </div> " ;      
 if ( !PREParkingshowImage){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimsprkglayerHolderDiv = document.createElement('div');
            aimsprkglayerHolderDiv.setAttribute('id', 'aimsparkinglayerHolder');
            document.body.appendChild(aimsprkglayerHolderDiv);
            document.getElementById("aimsparkinglayerHolder").innerHTML = divHtml;
          }
     }catch(ex){}
 }
  PREimgName='MLPWelcomebackP2C.png'; 	PRElastAction='invShown' + '.' + 878; 	aims_parkingInitialze(878);
 } 
 setTimeout('sendPREUpdates("icoShown.878")',3000);  
 }

 function PREshow879(){
 if(PREimgName==null || PREimgName!='mlp_welcomeback_red_c2c.gif'){
 pacia["879"]=PREImageIconURL+'mlp_welcomeback_red_c2c.gif'; paciu["879"]=PREImageIconURL+'mlp_welcomeback_red_c2c_unavailable.gif'; pauid["879"]=true; paift["879"]=1;
  if ( typeof pacim["879"] == "undefined" ){pacim["879"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["879"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["879"]='';  ptoimua["879"]='';  ptoiua["879"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1197', '879');aims_sCAP('APPID'); } else {setTimeout('PREshow879()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '879');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '879'); aims_sCAP('OTHER'); } 
 if (C2CFlag879==true){aims_initializeChat(879);C2CFlag879=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.879")',3000);  
 }

 function PREshow880(){
 if(PREimgName==null || PREimgName!='ChatInvite_iont_top.gif'){
 I2CFlag=true; if ( typeof pacim["880"] == "undefined" ){pacim["880"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["880"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["880"]='';  ptoimua["880"]='';  ptoiua["880"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1197', '880');aims_sCAP('APPID'); } else {setTimeout('PREshow880()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '880');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '880'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(880)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/ChatInvite_iont_top.gif' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[880]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(880)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/ChatInvite_iont_top_close.gif' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='ChatInvite_iont_top.gif'; 	PRElastAction='invShown' + '.' + 880; 	aims_I2CInitialze(880);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["880"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["880"]=true;paift["880"]=1;setTimeout( 'resetPGS('+'880'+')' , 3000 );setTimeout( 'aims_initializeChat('+'880'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.880")',3000);  
 }

 function PREshow881(){
 if(PREimgName==null || PREimgName!='FiosRapFlowC2C.png'){
 pacia["881"]=PREImageIconURL+'FiosRapFlowC2C.png'; paciu["881"]=PREImageIconURL+'FiosRapFlowC2C_unavailable.png'; pauid["881"]=true; paift["881"]=1;
  if ( typeof pacim["881"] == "undefined" ){pacim["881"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["881"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["881"]='';  ptoimua["881"]='';  ptoiua["881"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('551', '881');aims_sCAP('APPID'); } else {setTimeout('PREshow881()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '881'); aims_sCAP('OTHER'); } 
 if (C2CFlag881==true){aims_initializeChat(881);C2CFlag881=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.881")',3000);  
 }

 function PREshow881(){
 if(PREimgName==null || PREimgName!='FiosRapFlowC2C.png'){
 pacia["881"]=PREImageIconURL+'FiosRapFlowC2C.png'; paciu["881"]=PREImageIconURL+'FiosRapFlowC2C_unavailable.png'; pauid["881"]=true; paift["881"]=1;
  if ( typeof pacim["881"] == "undefined" ){pacim["881"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["881"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["881"]='';  ptoimua["881"]='';  ptoiua["881"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('551', '881');aims_sCAP('APPID'); } else {setTimeout('PREshow881()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '881'); aims_sCAP('OTHER'); } 
 if (C2CFlag881==true){aims_initializeChat(881);C2CFlag881=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.881")',3000);  
 }

 function PREshow882(){
 if(PREimgName==null || PREimgName!='singninGlobalP2C.png'){
 pacia["882"]=PREImageIconURL+'singninGlobalP2C.png'; paciu["882"]=PREImageIconURL+'singninGlobalP2C_unavailable.png'; if ( typeof pacim["882"] == "undefined" ){pacim["882"]="aimsparkinglayer"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["882"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["882"]='';  ptoimua["882"]='';  ptoiua["882"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('420', '882');aims_sCAP('APPID'); } else {setTimeout('PREshow882()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '882');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '882'); aims_sCAP('OTHER'); } 
 if (C2CFlag882==true){C2CFlag882=false;}
  preParkingSide = "left";   
   preflyoutcoords = "240px";    
   preflyincoords = "8px";   
  divHtml="<div name='aimsparkinglayer' id='aimsparkinglayer' style='position: fixed; z-index: 99999999; top:400px; left:8px;  visibility:hidden; '><a href='javascript:void(0);' >  <img  id='parkingchaticon' style=' position: absolute;  cursor: pointer; max-width:none; margin-left:-240px;' name='PREAIMSParkingLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/singninGlobalP2C.png' border='0' onClick='return PREparkingacceptCall(882)'  onmouseover='PREparkingflyOut()' onmouseout='PREparkingflyIn()' /></a>  </div> " ;      
 if ( !PREParkingshowImage){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimsprkglayerHolderDiv = document.createElement('div');
            aimsprkglayerHolderDiv.setAttribute('id', 'aimsparkinglayerHolder');
            document.body.appendChild(aimsprkglayerHolderDiv);
            document.getElementById("aimsparkinglayerHolder").innerHTML = divHtml;
          }
     }catch(ex){}
 }
  PREimgName='singninGlobalP2C.png'; 	PRElastAction='invShown' + '.' + 882; 	aims_parkingInitialze(882);
 } 
 setTimeout('sendPREUpdates("icoShown.882")',3000);  
 }

 function PREshow883(){
 if(PREimgName==null || PREimgName!='singninGlobal.gif'){
 pacia["883"]=PREImageIconURL+'singninGlobal.gif'; paciu["883"]=PREImageIconURL+'singninGlobal_unavailable.gif'; pauid["883"]=true; paift["883"]=1;
  if ( typeof pacim["883"] == "undefined" ){pacim["883"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["883"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["883"]='';  ptoimua["883"]='';  ptoiua["883"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('420', '883');aims_sCAP('APPID'); } else {setTimeout('PREshow883()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '883');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '883'); aims_sCAP('OTHER'); } 
 if (C2CFlag883==true){aims_initializeChat(883);C2CFlag883=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.883")',3000);  
 }

 function PREshow884(){
 if(PREimgName==null || PREimgName!='Proactive Icon.gif'){
 I2CFlag=true; if ( typeof pacim["884"] == "undefined" ){pacim["884"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["884"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["884"]='';  ptoimua["884"]='';  ptoiua["884"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('301', '884');aims_sCAP('APPID'); } else {setTimeout('PREshow884()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '884');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '884'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(884)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/Proactive Icon.gif' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[884]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(884)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/Proactive Icon_close.gif' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='Proactive Icon.gif'; 	PRElastAction='invShown' + '.' + 884; 	aims_I2CInitialze(884);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["884"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["884"]=true;paift["884"]=1;setTimeout( 'resetPGS('+'884'+')' , 3000 );setTimeout( 'aims_initializeChat('+'884'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.884")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow885(){
 if(PREimgName==null || PREimgName!='Login_Help_Icon2.png'){
 pacia["885"]=PREImageIconURL+'Login_Help_Icon2.png'; paciu["885"]=PREImageIconURL+'Login_Help_Icon2_unavailable.png'; pauid["885"]=true; paift["885"]=1;
  if ( typeof pacim["885"] == "undefined" ){pacim["885"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["885"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["885"]='';  ptoimua["885"]='';  ptoiua["885"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('301', '885');aims_sCAP('APPID'); } else {setTimeout('PREshow885()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '885');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '885'); aims_sCAP('OTHER'); } 
 if (C2CFlag885==true){aims_initializeChat(885);C2CFlag885=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.885")',3000);  
 }

 function PREshow886(){
 if(PREimgName==null || PREimgName!='P-15 VEC Login parking Lot.png'){
 pacia["886"]=PREImageIconURL+'P-15 VEC Login parking Lot.png'; paciu["886"]=PREImageIconURL+'P-15 VEC Login parking Lot_unavailable.png'; if ( typeof pacim["886"] == "undefined" ){pacim["886"]="aimsparkinglayer"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["886"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["886"]='';  ptoimua["886"]='';  ptoiua["886"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('301', '886');aims_sCAP('APPID'); } else {setTimeout('PREshow886()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '886'); aims_sCAP('OTHER'); } 
 if (C2CFlag886==true){C2CFlag886=false;}
  preParkingSide = "left";   
   preflyoutcoords = "240px";    
   preflyincoords = "8px";   
  divHtml="<div name='aimsparkinglayer' id='aimsparkinglayer' style='position: fixed; z-index: 99999999; top:400px; left:8px;  visibility:hidden; '><a href='javascript:void(0);' >  <img  id='parkingchaticon' style=' position: absolute;  cursor: pointer; max-width:none; margin-left:-240px;' name='PREAIMSParkingLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/P-15 VEC Login parking Lot.png' border='0' onClick='return PREparkingacceptCall(886)'  onmouseover='PREparkingflyOut()' onmouseout='PREparkingflyIn()' /></a>  </div> " ;      
 if ( !PREParkingshowImage){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimsprkglayerHolderDiv = document.createElement('div');
            aimsprkglayerHolderDiv.setAttribute('id', 'aimsparkinglayerHolder');
            document.body.appendChild(aimsprkglayerHolderDiv);
            document.getElementById("aimsparkinglayerHolder").innerHTML = divHtml;
          }
     }catch(ex){}
 }
  PREimgName='P-15 VEC Login parking Lot.png'; 	PRElastAction='invShown' + '.' + 886; 	aims_parkingInitialze(886);
 } 
 setTimeout('sendPREUpdates("icoShown.886")',3000);  
 }

 function PREshow887(){
 if(PREimgName==null || PREimgName!='P-15 VEC Orders parking Lot.png'){
 pacia["887"]=PREImageIconURL+'P-15 VEC Orders parking Lot.png'; paciu["887"]=PREImageIconURL+'P-15 VEC Orders parking Lot_unavailable.png'; if ( typeof pacim["887"] == "undefined" ){pacim["887"]="aimsparkinglayer"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["887"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["887"]='';  ptoimua["887"]='';  ptoiua["887"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('302', '887');aims_sCAP('APPID'); } else {setTimeout('PREshow887()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '887'); aims_sCAP('OTHER'); } 
 if (C2CFlag887==true){C2CFlag887=false;}
  preParkingSide = "left";   
   preflyoutcoords = "240px";    
   preflyincoords = "8px";   
  divHtml="<div name='aimsparkinglayer' id='aimsparkinglayer' style='position: fixed; z-index: 99999999; top:400px; left:8px;  visibility:hidden; '><a href='javascript:void(0);' >  <img  id='parkingchaticon' style=' position: absolute;  cursor: pointer; max-width:none; margin-left:-240px;' name='PREAIMSParkingLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/P-15 VEC Orders parking Lot.png' border='0' onClick='return PREparkingacceptCall(887)'  onmouseover='PREparkingflyOut()' onmouseout='PREparkingflyIn()' /></a>  </div> " ;      
 if ( !PREParkingshowImage){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimsprkglayerHolderDiv = document.createElement('div');
            aimsprkglayerHolderDiv.setAttribute('id', 'aimsparkinglayerHolder');
            document.body.appendChild(aimsprkglayerHolderDiv);
            document.getElementById("aimsparkinglayerHolder").innerHTML = divHtml;
          }
     }catch(ex){}
 }
  PREimgName='P-15 VEC Orders parking Lot.png'; 	PRElastAction='invShown' + '.' + 887; 	aims_parkingInitialze(887);
 } 
 setTimeout('sendPREUpdates("icoShown.887")',3000);  
 }

 function PREshow888(){
 if(PREimgName==null || PREimgName!='P-15 VEC Orders parking Lot.png'){
 pacia["888"]=PREImageIconURL+'P-15 VEC Orders parking Lot.png'; paciu["888"]=PREImageIconURL+'P-15 VEC Orders parking Lot_unavailable.png'; if ( typeof pacim["888"] == "undefined" ){pacim["888"]="aimsparkinglayer"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["888"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["888"]='';  ptoimua["888"]='';  ptoiua["888"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('303', '888');aims_sCAP('APPID'); } else {setTimeout('PREshow888()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '888'); aims_sCAP('OTHER'); } 
 if (C2CFlag888==true){C2CFlag888=false;}
  preParkingSide = "left";   
   preflyoutcoords = "240px";    
   preflyincoords = "8px";   
  divHtml="<div name='aimsparkinglayer' id='aimsparkinglayer' style='position: fixed; z-index: 99999999; top:400px; left:8px;  visibility:hidden; '><a href='javascript:void(0);' >  <img  id='parkingchaticon' style=' position: absolute;  cursor: pointer; max-width:none; margin-left:-240px;' name='PREAIMSParkingLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/P-15 VEC Orders parking Lot.png' border='0' onClick='return PREparkingacceptCall(888)'  onmouseover='PREparkingflyOut()' onmouseout='PREparkingflyIn()' /></a>  </div> " ;      
 if ( !PREParkingshowImage){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimsprkglayerHolderDiv = document.createElement('div');
            aimsprkglayerHolderDiv.setAttribute('id', 'aimsparkinglayerHolder');
            document.body.appendChild(aimsprkglayerHolderDiv);
            document.getElementById("aimsparkinglayerHolder").innerHTML = divHtml;
          }
     }catch(ex){}
 }
  PREimgName='P-15 VEC Orders parking Lot.png'; 	PRElastAction='invShown' + '.' + 888; 	aims_parkingInitialze(888);
 } 
 setTimeout('sendPREUpdates("icoShown.888")',3000);  
 }

 function PREshow889(){
 if(PREimgName==null || PREimgName!='Proactive Icon.gif'){
 I2CFlag=true; if ( typeof pacim["889"] == "undefined" ){pacim["889"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["889"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["889"]='<div id=preTextHolder style=position:absolute;left:15px;top:168px;z-index:9999999999;><div id=preText style=position:relative;vertical-align:top; width="60%"><A style="LINE-HEIGHT: 22px; FONT-FAMILY: JunkFont1, Arial, sans-serif; COLOR: #0066cc; FONT-SIZE: 12px; FONT-WEIGHT: bold; TEXT-DECORATION: none" href="https://enterprisecenter.verizon.com/enterprisesolutions/global/dlink/global/body/viewPersonalProfile.do?tabName=sitePreferences&mode=edit" title="Disable Proactive Chat window by editing chat preference option under Site Preference settings">Disable Proactive Chat</A></div></DIV>';  ptoimua["889"]='';  ptoiua["889"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('302', '889');aims_sCAP('APPID'); } else {setTimeout('PREshow889()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '889');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '889'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(889)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/Proactive Icon.gif' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[889]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(889)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/Proactive Icon_close.gif' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='Proactive Icon.gif'; 	PRElastAction='invShown' + '.' + 889; 	aims_I2CInitialze(889);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["889"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["889"]=true;paift["889"]=1;setTimeout( 'resetPGS('+'889'+')' , 3000 );setTimeout( 'aims_initializeChat('+'889'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.889")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow890(){
 if(PREimgName==null || PREimgName!='Proactive Icon.gif'){
 I2CFlag=true; if ( typeof pacim["890"] == "undefined" ){pacim["890"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["890"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["890"]='<div id=preTextHolder style=position:absolute;left:15px;top:168px;z-index:9999999999;><div id=preText style=position:relative;vertical-align:top; width="60%"><A style="LINE-HEIGHT: 22px; FONT-FAMILY: JunkFont1, Arial, sans-serif; COLOR: #0066cc; FONT-SIZE: 12px; FONT-WEIGHT: bold; TEXT-DECORATION: none" href="https://enterprisecenter.verizon.com/enterprisesolutions/global/dlink/global/body/viewPersonalProfile.do?tabName=sitePreferences&mode=edit" title="Disable Proactive Chat window by editing chat preference option under Site Preference settings">Disable Proactive Chat</A></div></DIV>';  ptoimua["890"]='';  ptoiua["890"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('303', '890');aims_sCAP('APPID'); } else {setTimeout('PREshow890()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '890');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '890'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(890)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/Proactive Icon.gif' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[890]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(890)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/Proactive Icon_close.gif' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='Proactive Icon.gif'; 	PRElastAction='invShown' + '.' + 890; 	aims_I2CInitialze(890);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["890"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["890"]=true;paift["890"]=1;setTimeout( 'resetPGS('+'890'+')' , 3000 );setTimeout( 'aims_initializeChat('+'890'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.890")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow891(){
 if(PREimgName==null || PREimgName!='SMBDotComNewRedC2C.gif'){
     PREMasterTreatment=true; 
pacim["865"]="aimsChatIcon2";pacim["892"]="aimsChatIcon1";setTimeout('sendPREUpdates("' + 'icoShown.891' + '")',50);setTimeout('PREshow892()', 1000 );setTimeout('PREshow865()', 3000 ); } 
 }

 function PREshow892(){
 if(PREimgName==null || PREimgName!='chat_72x18.png'){
 pacia["892"]=PREImageIconURL+'chat_72x18.png'; paciu["892"]=PREImageIconURL+'chat_72x18_unavailable.png'; pauid["892"]=true; paift["892"]=1;
  if ( typeof pacim["892"] == "undefined" ){pacim["892"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["892"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["892"]='';  ptoimua["892"]='';  ptoiua["892"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1147', '892');aims_sCAP('APPID'); } else {setTimeout('PREshow892()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '892');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '892'); aims_sCAP('OTHER'); } 
 if (C2CFlag892==true){aims_initializeChat(892);C2CFlag892=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.892")',3000);  
 }

 function PREshow893(){
 if(PREimgName==null || PREimgName!='Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png'){
 pacia["893"]=PREImageIconURL+'Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png'; paciu["893"]=PREImageIconURL+'Phoenix_Redesign_Parking_Lot_Expert_Advice_082115_unavailable.png'; if ( typeof pacim["893"] == "undefined" ){pacim["893"]="aimsparkinglayer"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["893"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["893"]='';  ptoimua["893"]='';  ptoiua["893"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1147', '893');aims_sCAP('APPID'); } else {setTimeout('PREshow893()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '893');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '893'); aims_sCAP('OTHER'); } 
 if (C2CFlag893==true){C2CFlag893=false;}
  preParkingSide = "left";   
   preflyoutcoords = "240px";    
   preflyincoords = "8px";   
  divHtml="<div name='aimsparkinglayer' id='aimsparkinglayer' style='position: fixed; z-index: 99999999; top:400px; left:8px;  visibility:hidden; '><a href='javascript:void(0);' >  <img  id='parkingchaticon' style=' position: absolute;  cursor: pointer; max-width:none; margin-left:-240px;' name='PREAIMSParkingLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png' border='0' onClick='return PREparkingacceptCall(893)'  onmouseover='PREparkingflyOut()' onmouseout='PREparkingflyIn()' /></a>  </div> " ;      
 if ( !PREParkingshowImage){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimsprkglayerHolderDiv = document.createElement('div');
            aimsprkglayerHolderDiv.setAttribute('id', 'aimsparkinglayerHolder');
            document.body.appendChild(aimsprkglayerHolderDiv);
            document.getElementById("aimsparkinglayerHolder").innerHTML = divHtml;
          }
     }catch(ex){}
 }
  PREimgName='Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png'; 	PRElastAction='invShown' + '.' + 893; 	aims_parkingInitialze(893);
 } 
 setTimeout('sendPREUpdates("icoShown.893")',3000);  
 }

 function PREshow894(){
 if(PREimgName==null || PREimgName!='learn_newinvite_phoenix.png'){
 I2CFlag=true; if ( typeof pacim["894"] == "undefined" ){pacim["894"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["894"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["894"]='';  ptoimua["894"]='';  ptoiua["894"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1147', '894');aims_sCAP('APPID'); } else {setTimeout('PREshow894()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '894'); aims_sCAP('OTHER'); } 
 divHtml="<div id='aimslayer' style='left: 10px; top: 90px; line-height: 1; visibility: hidden; position: absolute; z-index: 99999999; bgcolor: #000000;' name='aimslayer'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='padding: 0px;'><a name='needRef' title='Invitation' id='needRef' onclick='return PREacceptCall(894)' href='javascript:void(0);' target='_self'><img name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' src='https://collaborateext.verizon.com/pre/prescripts/images/learn_newinvite_phoenix.png' border='0'></a>"+ptoia[894]+"<div id='aimsdenyinvite' style='left: 225px; top: 170px; position: absolute;'><a style='font-family: Verdana; font-size: 14px; font-weight: bold; text-decoration: none;' onclick='return PRErejectCall(894)' href='javascript:void(0);' target='_self'>No thanks</a></div></td></tr></tbody></table></div>"; 
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='learn_newinvite_phoenix.png'; 	PRElastAction='invShown' + '.' + 894; 	aims_I2CInitialze(894);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["894"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["894"]=true;paift["894"]=1;setTimeout( 'resetPGS('+'894'+')' , 3000 );setTimeout( 'aims_initializeChat('+'894'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.894")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow895(){
 if(PREimgName==null || PREimgName!='vscvzb_chatnow_red.gif'){
 pacia["895"]=PREImageIconURL+'vscvzb_chatnow_red.gif'; paciu["895"]=PREImageIconURL+'vscvzb_chatnow_red_unavailable.gif'; pauid["895"]=true; paift["895"]=1;
  if ( typeof pacim["895"] == "undefined" ){pacim["895"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["895"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["895"]='';  ptoimua["895"]='';  ptoiua["895"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1089', '895');aims_sCAP('APPID'); } else {setTimeout('PREshow895()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '895');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '895'); aims_sCAP('OTHER'); } 
 if (C2CFlag895==true){aims_initializeChat(895);C2CFlag895=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.895")',3000);  
 }

 function PREshow896(){
 if(PREimgName==null || PREimgName!='newproactive_va.png'){
 I2CFlag=true; if ( typeof pacim["896"] == "undefined" ){pacim["896"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["896"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["896"]='<div id=preTextHolder style=position:absolute;left:25px;top:160px;z-index:9999999999;width:65%;height:120px;><div id=preText style=position:absolute;><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=145&lob=CFPP&proactive=y&initQ=Payment arrangement",1,896);\'>- Make a payment arrangement</a><br /><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=145&lob=CFPP&proactive=y&initQ=View or print a Verizon bill",2,896);\'>- View or print a Verizon bill</a><br /><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=145&lob=CFPP&proactive=y&initQ=What is my balance and due date?",3,896);\'>- See a Verizon bill balance and due date</a><br /></div><br /><div style="vertical-align:top; position:absolute;top:125px;"><table id="aimsvatable" bgcolor="#FFFFFF"  cellpadding="0" cellspacing="0"><tr><td><input type="text" id="va_initQ" name="initQ" style="border-bottom: 1px solid rgb(164, 164, 164);border-top: 0px; border-left: 0px; border-right: 0px; width: 280px; height: 34px; color: rgb(51, 51, 51); line-height: 2; font-family: helvetica, arial, sans serif; font-size: 14px;" value="Ask me a question" size="40" onfocus="this.value=\'\'"/></td><td><a href="" onClick=\'if (document.getElementById("va_initQ").value == "") { return false; } else { invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=145&lob=CFPP&proactive=y&initQ=" + document.getElementById("va_initQ").value ,4,896); }\'><input type="image" src="https://collaborateext.verizon.com/aims/includes/images/encore/search_vaIcon.png" onload=setTimeout("placeProactiveVABanners()",1000)></a></td></tr></table></div></div><DIV style="POSITION: absolute; TOP: 144px; LEFT: 312px" width="100px"><SPAN tyle="border: 1px solid rgb(200, 200, 200);" id=proactiveChatIcon name="proactiveChatIcon"></SPAN></DIV>';  ptoimua["896"]='';  ptoiua["896"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('74', '896');aims_sCAP('APPID'); } else {setTimeout('PREshow896()', 1000);return; }
 if (typeof vaFlow != "undefined" ){aims_setCustomerInfo('OTHER',vaFlow, '896'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(896)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/newproactive_va_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(896)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/newproactive_va.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[896]+"</td></tr></table></div>" ;
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='newproactive_va.png'; 	PRElastAction='invShown' + '.' + 896; 	aims_I2CInitialze(896);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["896"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["896"]=true;paift["896"]=1;setTimeout( 'resetPGS('+'896'+')' , 3000 );setTimeout( 'aims_initializeChat('+'896'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.896")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow897(){
 if(PREimgName==null || PREimgName!='newproactive_va.png'){
 I2CFlag=true; if ( typeof pacim["897"] == "undefined" ){pacim["897"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["897"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["897"]='<div id=preTextHolder style=position:absolute;left:25px;top:160px;z-index:9999999999;width:65%;height:120px;><div id=preText style=position:absolute;><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=145&lob=CFPB&proactive=y&initQ=Payment arrangement",1,897);\'>- Make a payment arrangement</a><br /><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=145&lob=CFPB&proactive=y&initQ=View or print a Verizon bill",2,897);\'>- View or print a Verizon bill</a><br /><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=145&lob=CFPB&proactive=y&initQ=What is my balance and due date?",3,897);\'>- See a Verizon bill balance and due date</a><br /></div><br /><div style="vertical-align:top; position:absolute;top:125px;"><table id="aimsvatable" bgcolor="#FFFFFF"  cellpadding="0" cellspacing="0"><tr><td><input type="text" id="va_initQ" name="initQ" style="border-bottom: 1px solid rgb(164, 164, 164);border-top: 0px; border-left: 0px; border-right: 0px; width: 280px; height: 34px; color: rgb(51, 51, 51); line-height: 2; font-family: helvetica, arial, sans serif; font-size: 14px;" value="Ask me a question" size="40" onfocus="this.value=\'\'"/></td><td><a href="" onClick=\'if (document.getElementById("va_initQ").value == "") { return false; } else { invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=145&lob=CFPB&proactive=y&initQ=" + document.getElementById("va_initQ").value ,4,897); }\'><input type="image" src="https://collaborateext.verizon.com/aims/includes/images/encore/search_vaIcon.png" onload=setTimeout("placeProactiveVABanners()",1000)></a></td></tr></table></div></div><DIV style="POSITION: absolute; TOP: 144px; LEFT: 312px" width="100px"><SPAN tyle="border: 1px solid rgb(200, 200, 200);" id=proactiveChatIcon name="proactiveChatIcon"></SPAN></DIV>';  ptoimua["897"]='';  ptoiua["897"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('74', '897');aims_sCAP('APPID'); } else {setTimeout('PREshow897()', 1000);return; }
 if (typeof vaFlow != "undefined" ){aims_setCustomerInfo('OTHER',vaFlow, '897'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(897)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/newproactive_va_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(897)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/newproactive_va.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[897]+"</td></tr></table></div>" ;
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='newproactive_va.png'; 	PRElastAction='invShown' + '.' + 897; 	aims_I2CInitialze(897);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["897"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["897"]=true;paift["897"]=1;setTimeout( 'resetPGS('+'897'+')' , 3000 );setTimeout( 'aims_initializeChat('+'897'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.897")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow898(){
 if(PREimgName==null || PREimgName!='newproactive_va.png'){
 I2CFlag=true; if ( typeof pacim["898"] == "undefined" ){pacim["898"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["898"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["898"]='<div id=preTextHolder style=position:absolute;left:25px;top:160px;z-index:9999999999;width:65%;height:120px;><div id=preText style=position:absolute;><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=123&lob=CPPT&proactive=y&initQ=I cannot receive incoming calls",1,898);\'>- Restore the ability to make or receive calls</a><br /><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=123&lob=CPPT&proactive=y&initQ=I am having problems with long distance calling",2,898);\'>- Ask questions about long distance calls</a><br /><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=123&lob=CPPT&proactive=y&initQ=Phone line repair",3,898);\'>- Reschedule or get an update on a repair visit</a><br /></div><br /><div style="vertical-align:top; position:absolute;top:125px;"><table id="aimsvatable" bgcolor="#FFFFFF"  cellpadding="0" cellspacing="0"><tr><td><input type="text" id="va_initQ" name="initQ" style="border-bottom: 1px solid rgb(164, 164, 164);border-top: 0px; border-left: 0px; border-right: 0px; width: 280px; height: 34px; color: rgb(51, 51, 51); line-height: 2; font-family: helvetica, arial, sans serif; font-size: 14px;" value="Ask me a question" size="40" onfocus="this.value=\'\'"/></td><td><a href="" onClick=\'if (document.getElementById("va_initQ").value == "") { return false; } else { invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=123&lob=CPPT&proactive=y&initQ=" + document.getElementById("va_initQ").value ,4,898); }\'><input type="image" src="https://collaborateext.verizon.com/aims/includes/images/encore/search_vaIcon.png" onload=setTimeout("placeProactiveVABanners()",1000)></a></td></tr></table></div></div><DIV style="POSITION: absolute; TOP: 144px; LEFT: 312px" width="100px"><SPAN tyle="border: 1px solid rgb(200, 200, 200);" id=proactiveChatIcon name="proactiveChatIcon"></SPAN></DIV>';  ptoimua["898"]='';  ptoiua["898"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('74', '898');aims_sCAP('APPID'); } else {setTimeout('PREshow898()', 1000);return; }
 if (typeof vaFlow != "undefined" ){aims_setCustomerInfo('OTHER',vaFlow, '898'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(898)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/newproactive_va_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(898)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/newproactive_va.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[898]+"</td></tr></table></div>" ;
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='newproactive_va.png'; 	PRElastAction='invShown' + '.' + 898; 	aims_I2CInitialze(898);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["898"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["898"]=true;paift["898"]=1;setTimeout( 'resetPGS('+'898'+')' , 3000 );setTimeout( 'aims_initializeChat('+'898'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.898")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow899(){
 if(PREimgName==null || PREimgName!='newproactive_va.png'){
 I2CFlag=true; if ( typeof pacim["899"] == "undefined" ){pacim["899"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["899"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["899"]='<div id=preTextHolder style=position:absolute;left:25px;top:160px;z-index:9999999999;width:65%;height:120px;><div id=preText style=position:absolute;><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=123&lob=CPPV&proactive=y&initQ=Find the phone number to retrieve voice mail",1,899);\'>- Find the phone number to retrieve voice mail</a><br /><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=123&lob=CPPV&proactive=y&initQ=Download the Home Voice Mail User Guide",2,899);\'>- Download the Home Voice Mail User Guide</a><br /><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=123&lob=CPPV&proactive=y&initQ=How do I check my messages with OnePoint voice mail?",3,899);\'>- Download the one point Voice Mail User Guide</a><br /></div><br /><div style="vertical-align:top; position:absolute;top:125px;"><table id="aimsvatable" bgcolor="#FFFFFF"  cellpadding="0" cellspacing="0"><tr><td><input type="text" id="va_initQ" name="initQ" style="border-bottom: 1px solid rgb(164, 164, 164);border-top: 0px; border-left: 0px; border-right: 0px; width: 280px; height: 34px; color: rgb(51, 51, 51); line-height: 2; font-family: helvetica, arial, sans serif; font-size: 14px;" value="Ask me a question" size="40" onfocus="this.value=\'\'"/></td><td><a href="" onClick=\'if (document.getElementById("va_initQ").value == "") { return false; } else { invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=123&lob=CPPV&proactive=y&initQ=" + document.getElementById("va_initQ").value ,4,899); }\'><input type="image" src="https://collaborateext.verizon.com/aims/includes/images/encore/search_vaIcon.png" onload=setTimeout("placeProactiveVABanners()",1000)></a></td></tr></table></div></div><DIV style="POSITION: absolute; TOP: 144px; LEFT: 312px" width="100px"><SPAN tyle="border: 1px solid rgb(200, 200, 200);" id=proactiveChatIcon name="proactiveChatIcon"></SPAN></DIV>';  ptoimua["899"]='';  ptoiua["899"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('74', '899');aims_sCAP('APPID'); } else {setTimeout('PREshow899()', 1000);return; }
 if (typeof vaFlow != "undefined" ){aims_setCustomerInfo('OTHER',vaFlow, '899'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(899)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/newproactive_va_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(899)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/newproactive_va.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[899]+"</td></tr></table></div>" ;
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='newproactive_va.png'; 	PRElastAction='invShown' + '.' + 899; 	aims_I2CInitialze(899);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["899"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["899"]=true;paift["899"]=1;setTimeout( 'resetPGS('+'899'+')' , 3000 );setTimeout( 'aims_initializeChat('+'899'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.899")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow900(){
 if(PREimgName==null || PREimgName!='newproactive_va.png'){
 I2CFlag=true; if ( typeof pacim["900"] == "undefined" ){pacim["900"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["900"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["900"]='<div id=preTextHolder style=position:absolute;left:25px;top:160px;z-index:9999999999;width:65%;height:120px;><div id=preText style=position:absolute;><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&lob=CIPS&proactive=y&initQ=Set up a Verizon email account with Outlook",1,900);\'>- Set up a Verizon email account with Outlook</a><br /><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&lob=CIPS&proactive=y&initQ=Set up a router to use FiOS Internet",2,900);\'>- Set up a router to use FiOS Internet</a><br /><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&lob=CIPS&proactive=y&initQ=Connect a new device to the Internet via Wi-Fi",3,900);\'>- Connect a new device to the Internet via Wi-Fi</a><br /></div><br /><div style="vertical-align:top; position:absolute;top:125px;"><table id="aimsvatable" bgcolor="#FFFFFF"  cellpadding="0" cellspacing="0"><tr><td><input type="text" id="va_initQ" name="initQ" style="border-bottom: 1px solid rgb(164, 164, 164);border-top: 0px; border-left: 0px; border-right: 0px; width: 280px; height: 34px; color: rgb(51, 51, 51); line-height: 2; font-family: helvetica, arial, sans serif; font-size: 14px;" value="Ask me a question" size="40" onfocus="this.value=\'\'"/></td><td><a href="" onClick=\'if (document.getElementById("va_initQ").value == "") { return false; } else { invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&lob=CIPS&proactive=y&initQ=" + document.getElementById("va_initQ").value ,4,900); }\'><input type="image" src="https://collaborateext.verizon.com/aims/includes/images/encore/search_vaIcon.png" onload=setTimeout("placeProactiveVABanners()",1000)></a></td></tr></table></div></div><DIV style="POSITION: absolute; TOP: 144px; LEFT: 312px" width="100px"><SPAN tyle="border: 1px solid rgb(200, 200, 200);" id=proactiveChatIcon name="proactiveChatIcon"></SPAN></DIV>';  ptoimua["900"]='';  ptoiua["900"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('74', '900');aims_sCAP('APPID'); } else {setTimeout('PREshow900()', 1000);return; }
 if (typeof vaFlow != "undefined" ){aims_setCustomerInfo('OTHER',vaFlow, '900'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(900)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/newproactive_va_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(900)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/newproactive_va.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[900]+"</td></tr></table></div>" ;
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='newproactive_va.png'; 	PRElastAction='invShown' + '.' + 900; 	aims_I2CInitialze(900);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["900"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["900"]=true;paift["900"]=1;setTimeout( 'resetPGS('+'900'+')' , 3000 );setTimeout( 'aims_initializeChat('+'900'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.900")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow901(){
 if(PREimgName==null || PREimgName!='newproactive_va.png'){
 I2CFlag=true; if ( typeof pacim["901"] == "undefined" ){pacim["901"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["901"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["901"]='<div id=preTextHolder style=position:absolute;left:25px;top:160px;z-index:9999999999;width:65%;height:120px;><div id=preText style=position:absolute;><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&lob=CIPC&proactive=y&initQ=Recover a Verizon User ID",1,901);\'>- Recover a Verizon User ID</a><br /><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&lob=CIPC&proactive=y&initQ=Reset a Verizon password",2,901);\'>- Reset a Verizon password</a><br /><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&lob=CIPC&proactive=y&initQ=How do I change my Secret Question?",3,901);\'>- Select a new Verizon security question</a><br /></div><br /><div style="vertical-align:top; position:absolute;top:125px;"><table id="aimsvatable" bgcolor="#FFFFFF"  cellpadding="0" cellspacing="0"><tr><td><input type="text" id="va_initQ" name="initQ" style="border-bottom: 1px solid rgb(164, 164, 164);border-top: 0px; border-left: 0px; border-right: 0px; width: 280px; height: 34px; color: rgb(51, 51, 51); line-height: 2; font-family: helvetica, arial, sans serif; font-size: 14px;" value="Ask me a question" size="40" onfocus="this.value=\'\'"/></td><td><a href="" onClick=\'if (document.getElementById("va_initQ").value == "") { return false; } else { invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&lob=CIPC&proactive=y&initQ=" + document.getElementById("va_initQ").value ,4,901); }\'><input type="image" src="https://collaborateext.verizon.com/aims/includes/images/encore/search_vaIcon.png" onload=setTimeout("placeProactiveVABanners()",1000)></a></td></tr></table></div></div><DIV style="POSITION: absolute; TOP: 144px; LEFT: 312px" width="100px"><SPAN tyle="border: 1px solid rgb(200, 200, 200);" id=proactiveChatIcon name="proactiveChatIcon"></SPAN></DIV>';  ptoimua["901"]='';  ptoiua["901"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('74', '901');aims_sCAP('APPID'); } else {setTimeout('PREshow901()', 1000);return; }
 if (typeof vaFlow != "undefined" ){aims_setCustomerInfo('OTHER',vaFlow, '901'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(901)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/newproactive_va_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(901)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/newproactive_va.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[901]+"</td></tr></table></div>" ;
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='newproactive_va.png'; 	PRElastAction='invShown' + '.' + 901; 	aims_I2CInitialze(901);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["901"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["901"]=true;paift["901"]=1;setTimeout( 'resetPGS('+'901'+')' , 3000 );setTimeout( 'aims_initializeChat('+'901'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.901")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow902(){
 if(PREimgName==null || PREimgName!='newproactive_va.png'){
 I2CFlag=true; if ( typeof pacim["902"] == "undefined" ){pacim["902"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["902"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["902"]='<div id=preTextHolder style=position:absolute;left:25px;top:160px;z-index:9999999999;width:65%;height:120px;><div id=preText style=position:absolute;><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=74&lob=CTPT&proactive=y&initQ=Reprogram a remote control",1,902);\'>- Reprogram a remote control</a><br /><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=74&lob=CTPT&proactive=y&initQ=Reset a Set-Top Box or DVR to fix a technical issue",2,902);\'>- Reset a Set-Top Box or DVR to fix a technical issue</a><br /><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=74&lob=CTPT&proactive=y&initQ=Fix a remote that appears to be broken",3,902);\'>- Fix a remote that appears to be broken</a><br /></div><br /><div style="vertical-align:top; position:absolute;top:125px;"><table id="aimsvatable" bgcolor="#FFFFFF"  cellpadding="0" cellspacing="0"><tr><td><input type="text" id="va_initQ" name="initQ" style="border-bottom: 1px solid rgb(164, 164, 164);border-top: 0px; border-left: 0px; border-right: 0px; width: 280px; height: 34px; color: rgb(51, 51, 51); line-height: 2; font-family: helvetica, arial, sans serif; font-size: 14px;" value="Ask me a question" size="40" onfocus="this.value=\'\'"/></td><td><a href="" onClick=\'if (document.getElementById("va_initQ").value == "") { return false; } else { invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=74&lob=CTPT&proactive=y&initQ=" + document.getElementById("va_initQ").value ,4,902); }\'><input type="image" src="https://collaborateext.verizon.com/aims/includes/images/encore/search_vaIcon.png" onload=setTimeout("placeProactiveVABanners()",1000)></a></td></tr></table></div></div><DIV style="POSITION: absolute; TOP: 144px; LEFT: 312px" width="100px"><SPAN tyle="border: 1px solid rgb(200, 200, 200);" id=proactiveChatIcon name="proactiveChatIcon"></SPAN></DIV>';  ptoimua["902"]='';  ptoiua["902"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('74', '902');aims_sCAP('APPID'); } else {setTimeout('PREshow902()', 1000);return; }
 if (typeof vaFlow != "undefined" ){aims_setCustomerInfo('OTHER',vaFlow, '902'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(902)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/newproactive_va_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(902)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/newproactive_va.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[902]+"</td></tr></table></div>" ;
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='newproactive_va.png'; 	PRElastAction='invShown' + '.' + 902; 	aims_I2CInitialze(902);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["902"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["902"]=true;paift["902"]=1;setTimeout( 'resetPGS('+'902'+')' , 3000 );setTimeout( 'aims_initializeChat('+'902'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.902")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow903(){
 if(PREimgName==null || PREimgName!='newproactive_va.png'){
 I2CFlag=true; if ( typeof pacim["903"] == "undefined" ){pacim["903"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["903"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["903"]='<div id=preTextHolder style=position:absolute;left:25px;top:160px;z-index:9999999999;width:65%;height:120px;><div id=preText style=position:absolute;><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=74&lob=CTPT&proactive=y&initQ=Set up a remote control",1,903);\'>- Set up a remote control</a><br /><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=74&lob=CTPT&proactive=y&initQ=How do I install the set top box myself?",2,903);\'>- Set up a Set-Top Box or DVR</a><br /><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=74&lob=CTPT&proactive=y&initQ=See Verizon equipment and channel prices",3,903);\'>- See Verizon equipment and channel prices</a><br /></div><br /><div style="vertical-align:top; position:absolute;top:125px;"><table id="aimsvatable" bgcolor="#FFFFFF"  cellpadding="0" cellspacing="0"><tr><td><input type="text" id="va_initQ" name="initQ" style="border-bottom: 1px solid rgb(164, 164, 164);border-top: 0px; border-left: 0px; border-right: 0px; width: 280px; height: 34px; color: rgb(51, 51, 51); line-height: 2; font-family: helvetica, arial, sans serif; font-size: 14px;" value="Ask me a question" size="40" onfocus="this.value=\'\'"/></td><td><a href="" onClick=\'if (document.getElementById("va_initQ").value == "") { return false; } else { invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=74&lob=CTPT&proactive=y&initQ=" + document.getElementById("va_initQ").value ,4,903); }\'><input type="image" src="https://collaborateext.verizon.com/aims/includes/images/encore/search_vaIcon.png" onload=setTimeout("placeProactiveVABanners()",1000)></a></td></tr></table></div></div><DIV style="POSITION: absolute; TOP: 144px; LEFT: 312px" width="100px"><SPAN tyle="border: 1px solid rgb(200, 200, 200);" id=proactiveChatIcon name="proactiveChatIcon"></SPAN></DIV>';  ptoimua["903"]='';  ptoiua["903"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('74', '903');aims_sCAP('APPID'); } else {setTimeout('PREshow903()', 1000);return; }
 if (typeof vaFlow != "undefined" ){aims_setCustomerInfo('OTHER',vaFlow, '903'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(903)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/newproactive_va_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(903)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/newproactive_va.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[903]+"</td></tr></table></div>" ;
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='newproactive_va.png'; 	PRElastAction='invShown' + '.' + 903; 	aims_I2CInitialze(903);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["903"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["903"]=true;paift["903"]=1;setTimeout( 'resetPGS('+'903'+')' , 3000 );setTimeout( 'aims_initializeChat('+'903'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.903")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow904(){
 if(PREimgName==null || PREimgName!='newproactive_va.png'){
 I2CFlag=true; if ( typeof pacim["904"] == "undefined" ){pacim["904"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["904"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["904"]='<div id=preTextHolder style=position:absolute;left:25px;top:160px;z-index:9999999999;width:65%;height:120px;><div id=preText style=position:absolute;><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=83&lob=CHPT&proactive=y&initQ=Recover a Verizon User ID",1,904);\'>- Recover a Verizon User ID</a><br /><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=83&lob=CHPT&proactive=y&initQ=Reset a Verizon password",2,904);\'>- Reset a Verizon password</a><br /><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=83&lob=CHPT&proactive=y&initQ=How do I change my Secret Question?",3,904);\'>- Select a new Verizon security question</a><br /></div><br /><div style="vertical-align:top; position:absolute;top:125px;"><table id="aimsvatable" bgcolor="#FFFFFF"  cellpadding="0" cellspacing="0"><tr><td><input type="text" id="va_initQ" name="initQ" style="border-bottom: 1px solid rgb(164, 164, 164);border-top: 0px; border-left: 0px; border-right: 0px; width: 280px; height: 34px; color: rgb(51, 51, 51); line-height: 2; font-family: helvetica, arial, sans serif; font-size: 14px;" value="Ask me a question" size="40" onfocus="this.value=\'\'"/></td><td><a href="" onClick=\'if (document.getElementById("va_initQ").value == "") { return false; } else { invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=83&lob=CHPT&proactive=y&initQ=" + document.getElementById("va_initQ").value ,4,904); }\'><input type="image" src="https://collaborateext.verizon.com/aims/includes/images/encore/search_vaIcon.png" onload=setTimeout("placeProactiveVABanners()",1000)></a></td></tr></table></div></div><DIV style="POSITION: absolute; TOP: 144px; LEFT: 312px" width="100px"><SPAN tyle="border: 1px solid rgb(200, 200, 200);" id=proactiveChatIcon name="proactiveChatIcon"></SPAN></DIV>';  ptoimua["904"]='';  ptoiua["904"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('74', '904');aims_sCAP('APPID'); } else {setTimeout('PREshow904()', 1000);return; }
 if (typeof vaFlow != "undefined" ){aims_setCustomerInfo('OTHER',vaFlow, '904'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(904)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/newproactive_va_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(904)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/newproactive_va.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[904]+"</td></tr></table></div>" ;
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='newproactive_va.png'; 	PRElastAction='invShown' + '.' + 904; 	aims_I2CInitialze(904);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["904"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["904"]=true;paift["904"]=1;setTimeout( 'resetPGS('+'904'+')' , 3000 );setTimeout( 'aims_initializeChat('+'904'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.904")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow905(){
 if(PREimgName==null || PREimgName!='newproactive_va.png'){
 I2CFlag=true; if ( typeof pacim["905"] == "undefined" ){pacim["905"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["905"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["905"]='<div id=preTextHolder style=position:absolute;left:25px;top:160px;z-index:9999999999;width:65%;height:120px;><div id=preText style=position:absolute;><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=83&lob=CHPC&proactive=y&initQ=Troubleshoot a slow Internet connection",1,905);\'>- Troubleshoot a slow Internet connection</a><br /><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=83&lob=CHPC&proactive=y&initQ=Find the routers default user name and password",2,905);\'>- Find the routers default user name and password</a><br /><a href="#" style="line-height: 22px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=83&lob=CHPC&proactive=y&initQ=Set up a Verizon email account in Outlook",3,905);\'>- Set up a Verizon email account in Outlook</a><br /></div><br /><div style="vertical-align:top; position:absolute;top:125px;"><table id="aimsvatable" bgcolor="#FFFFFF"  cellpadding="0" cellspacing="0"><tr><td><input type="text" id="va_initQ" name="initQ" style="border-bottom: 1px solid rgb(164, 164, 164);border-top: 0px; border-left: 0px; border-right: 0px; width: 280px; height: 34px; color: rgb(51, 51, 51); line-height: 2; font-family: helvetica, arial, sans serif; font-size: 14px;" value="Ask me a question" size="40" onfocus="this.value=\'\'"/></td><td><a href="" onClick=\'if (document.getElementById("va_initQ").value == "") { return false; } else { invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=83&lob=CHPC&proactive=y&initQ=" + document.getElementById("va_initQ").value ,4,905); }\'><input type="image" src="https://collaborateext.verizon.com/aims/includes/images/encore/search_vaIcon.png" onload=setTimeout("placeProactiveVABanners()",1000)></a></td></tr></table></div></div><DIV style="POSITION: absolute; TOP: 144px; LEFT: 312px" width="100px"><SPAN tyle="border: 1px solid rgb(200, 200, 200);" id=proactiveChatIcon name="proactiveChatIcon"></SPAN></DIV>';  ptoimua["905"]='';  ptoiua["905"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('74', '905');aims_sCAP('APPID'); } else {setTimeout('PREshow905()', 1000);return; }
 if (typeof vaFlow != "undefined" ){aims_setCustomerInfo('OTHER',vaFlow, '905'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(905)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/newproactive_va_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(905)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/newproactive_va.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[905]+"</td></tr></table></div>" ;
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='newproactive_va.png'; 	PRElastAction='invShown' + '.' + 905; 	aims_I2CInitialze(905);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["905"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["905"]=true;paift["905"]=1;setTimeout( 'resetPGS('+'905'+')' , 3000 );setTimeout( 'aims_initializeChat('+'905'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.905")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow906(){
 if(PREimgName==null || PREimgName!='reponline.gif'){
 pacia["906"]=PREImageIconURL+'reponline.gif'; paciu["906"]=PREImageIconURL+'reponline_unavailable.gif'; pauid["906"]=true; paift["906"]=1;
  if ( typeof pacim["906"] == "undefined" ){pacim["906"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["906"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["906"]='';  ptoimua["906"]='';  ptoiua["906"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('301', '906');aims_sCAP('APPID'); } else {setTimeout('PREshow906()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '906');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '906'); aims_sCAP('OTHER'); } 
 if (C2CFlag906==true){aims_initializeChat(906);C2CFlag906=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.906")',3000);  
 }

 function PREshow907(){
 if(PREimgName==null || PREimgName!='reponline.gif'){
 pacia["907"]=PREImageIconURL+'reponline.gif'; paciu["907"]=PREImageIconURL+'reponline_unavailable.gif'; pauid["907"]=true; paift["907"]=1;
  if ( typeof pacim["907"] == "undefined" ){pacim["907"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["907"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["907"]='';  ptoimua["907"]='';  ptoiua["907"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('301', '907');aims_sCAP('APPID'); } else {setTimeout('PREshow907()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '907');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '907'); aims_sCAP('OTHER'); } 
 if (C2CFlag907==true){aims_initializeChat(907);C2CFlag907=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.907")',3000);  
 }

 function PREshow908(){
 if(PREimgName==null || PREimgName!='reponline.gif'){
 pacia["908"]=PREImageIconURL+'reponline.gif'; paciu["908"]=PREImageIconURL+'reponline_unavailable.gif'; pauid["908"]=true; paift["908"]=1;
  if ( typeof pacim["908"] == "undefined" ){pacim["908"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["908"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["908"]='';  ptoimua["908"]='';  ptoiua["908"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('301', '908');aims_sCAP('APPID'); } else {setTimeout('PREshow908()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '908');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '908'); aims_sCAP('OTHER'); } 
 if (C2CFlag908==true){aims_initializeChat(908);C2CFlag908=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.908")',3000);  
 }

 function PREshow909(){
 if(PREimgName==null || PREimgName!='reponline.gif'){
 pacia["909"]=PREImageIconURL+'reponline.gif'; paciu["909"]=PREImageIconURL+'reponline_unavailable.gif'; pauid["909"]=true; paift["909"]=1;
  if ( typeof pacim["909"] == "undefined" ){pacim["909"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["909"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["909"]='';  ptoimua["909"]='';  ptoiua["909"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('302', '909');aims_sCAP('APPID'); } else {setTimeout('PREshow909()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '909');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '909'); aims_sCAP('OTHER'); } 
 if (C2CFlag909==true){aims_initializeChat(909);C2CFlag909=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.909")',3000);  
 }

 function PREshow910(){
 if(PREimgName==null || PREimgName!='reponline.gif'){
 pacia["910"]=PREImageIconURL+'reponline.gif'; paciu["910"]=PREImageIconURL+'reponline_unavailable.gif'; pauid["910"]=true; paift["910"]=1;
  if ( typeof pacim["910"] == "undefined" ){pacim["910"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["910"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["910"]='';  ptoimua["910"]='';  ptoiua["910"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('303', '910');aims_sCAP('APPID'); } else {setTimeout('PREshow910()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '910');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '910'); aims_sCAP('OTHER'); } 
 if (C2CFlag910==true){aims_initializeChat(910);C2CFlag910=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.910")',3000);  
 }

 function PREshow911(){
 if(PREimgName==null || PREimgName!='VECChatNew.png'){
 pacia["911"]=PREImageIconURL+'VECChatNew.png'; paciu["911"]=PREImageIconURL+'VECChatNew_unavailable.png'; pauid["911"]=true; paift["911"]=1;
  if ( typeof pacim["911"] == "undefined" ){pacim["911"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["911"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["911"]='';  ptoimua["911"]='';  ptoiua["911"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('304', '911');aims_sCAP('APPID'); } else {setTimeout('PREshow911()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '911');aims_sCAP('STATE');} 
 if (typeof aimsChatCreditFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsChatCreditFlow, '911'); aims_sCAP('OTHER'); } 
 if (C2CFlag911==true){aims_initializeChat(911);C2CFlag911=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.911")',3000);  
 }

 function PREshow912(){
 if(PREimgName==null || PREimgName!='VECChatNew.png'){
 pacia["912"]=PREImageIconURL+'VECChatNew.png'; paciu["912"]=PREImageIconURL+'VECChatNew_unavailable.png'; pauid["912"]=true; paift["912"]=1;
  if ( typeof pacim["912"] == "undefined" ){pacim["912"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["912"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["912"]='';  ptoimua["912"]='';  ptoiua["912"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('305', '912');aims_sCAP('APPID'); } else {setTimeout('PREshow912()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '912');aims_sCAP('STATE');} 
 if (typeof aimsChatCreditFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsChatCreditFlow, '912'); aims_sCAP('OTHER'); } 
 if (C2CFlag912==true){aims_initializeChat(912);C2CFlag912=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.912")',3000);  
 }

 function PREshow913(){
 if(PREimgName==null || PREimgName!='Proactive Icon.gif'){
 I2CFlag=true; if ( typeof pacim["913"] == "undefined" ){pacim["913"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["913"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["913"]='<div id=preTextHolder style=position:absolute;left:15px;top:168px;z-index:9999999999;><div id=preText style=position:relative;vertical-align:top; width="60%"><A style="LINE-HEIGHT: 22px; FONT-FAMILY: JunkFont1, Arial, sans-serif; COLOR: #0066cc; FONT-SIZE: 12px; FONT-WEIGHT: bold; TEXT-DECORATION: none" href="https://enterprisecenter.verizon.com/enterprisesolutions/global/dlink/global/body/viewPersonalProfile.do?tabName=sitePreferences&mode=edit" title="Disable Proactive Chat window by editing chat preference option under Site Preference settings">Disable Proactive Chat</A></div></DIV>';  ptoimua["913"]='';  ptoiua["913"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('304', '913');aims_sCAP('APPID'); } else {setTimeout('PREshow913()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '913');aims_sCAP('STATE');} 
 if (typeof aimsChatCreditFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsChatCreditFlow, '913'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(913)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/Proactive Icon.gif' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[913]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(913)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/Proactive Icon_close.gif' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='Proactive Icon.gif'; 	PRElastAction='invShown' + '.' + 913; 	aims_I2CInitialze(913);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["913"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["913"]=true;paift["913"]=1;setTimeout( 'resetPGS('+'913'+')' , 3000 );setTimeout( 'aims_initializeChat('+'913'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.913")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow914(){
 if(PREimgName==null || PREimgName!='Proactive Icon.gif'){
 I2CFlag=true; if ( typeof pacim["914"] == "undefined" ){pacim["914"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["914"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["914"]='<div id=preTextHolder style=position:absolute;left:15px;top:168px;z-index:9999999999;><div id=preText style=position:relative;vertical-align:top; width="60%"><A style="LINE-HEIGHT: 22px; FONT-FAMILY: JunkFont1, Arial, sans-serif; COLOR: #0066cc; FONT-SIZE: 12px; FONT-WEIGHT: bold; TEXT-DECORATION: none" href="https://enterprisecenter.verizon.com/enterprisesolutions/global/dlink/global/body/viewPersonalProfile.do?tabName=sitePreferences&mode=edit" title="Disable Proactive Chat window by editing chat preference option under Site Preference settings">Disable Proactive Chat</A></div></DIV>';  ptoimua["914"]='';  ptoiua["914"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('305', '914');aims_sCAP('APPID'); } else {setTimeout('PREshow914()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '914');aims_sCAP('STATE');} 
 if (typeof aimsChatCreditFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsChatCreditFlow, '914'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(914)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/Proactive Icon.gif' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[914]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(914)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/Proactive Icon_close.gif' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='Proactive Icon.gif'; 	PRElastAction='invShown' + '.' + 914; 	aims_I2CInitialze(914);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["914"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["914"]=true;paift["914"]=1;setTimeout( 'resetPGS('+'914'+')' , 3000 );setTimeout( 'aims_initializeChat('+'914'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.914")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow915(){
 if(PREimgName==null || PREimgName!='SMBDotComNewRedC2C.gif'){
     PREMasterTreatment=true; 
pacim["865"]="aimsChatIcon2";pacim["916"]="aimsChatIcon1";setTimeout('sendPREUpdates("' + 'icoShown.915' + '")',50);setTimeout('PREshow916()', 1000 );setTimeout('PREshow865()', 3000 ); } 
 }

 function PREshow916(){
 if(PREimgName==null || PREimgName!='chat_72x18.png'){
 pacia["916"]=PREImageIconURL+'chat_72x18.png'; paciu["916"]=PREImageIconURL+'chat_72x18_unavailable.png'; pauid["916"]=true; paift["916"]=1;
  if ( typeof pacim["916"] == "undefined" ){pacim["916"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["916"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["916"]='';  ptoimua["916"]='';  ptoiua["916"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1147', '916');aims_sCAP('APPID'); } else {setTimeout('PREshow916()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '916');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '916'); aims_sCAP('OTHER'); } 
 if (C2CFlag916==true){aims_initializeChat(916);C2CFlag916=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.916")',3000);  
 }

 function PREshow917(){
 if(PREimgName==null || PREimgName!='Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png'){
 pacia["917"]=PREImageIconURL+'Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png'; paciu["917"]=PREImageIconURL+'Phoenix_Redesign_Parking_Lot_Expert_Advice_082115_unavailable.png'; if ( typeof pacim["917"] == "undefined" ){pacim["917"]="aimsparkinglayer"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["917"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["917"]='';  ptoimua["917"]='';  ptoiua["917"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1147', '917');aims_sCAP('APPID'); } else {setTimeout('PREshow917()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '917');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '917'); aims_sCAP('OTHER'); } 
 if (C2CFlag917==true){C2CFlag917=false;}
  preParkingSide = "left";   
   preflyoutcoords = "240px";    
   preflyincoords = "8px";   
  divHtml="<div name='aimsparkinglayer' id='aimsparkinglayer' style='position: fixed; z-index: 99999999; top:400px; left:8px;  visibility:hidden; '><a href='javascript:void(0);' >  <img  id='parkingchaticon' style=' position: absolute;  cursor: pointer; max-width:none; margin-left:-240px;' name='PREAIMSParkingLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png' border='0' onClick='return PREparkingacceptCall(917)'  onmouseover='PREparkingflyOut()' onmouseout='PREparkingflyIn()' /></a>  </div> " ;      
 if ( !PREParkingshowImage){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimsprkglayerHolderDiv = document.createElement('div');
            aimsprkglayerHolderDiv.setAttribute('id', 'aimsparkinglayerHolder');
            document.body.appendChild(aimsprkglayerHolderDiv);
            document.getElementById("aimsparkinglayerHolder").innerHTML = divHtml;
          }
     }catch(ex){}
 }
  PREimgName='Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png'; 	PRElastAction='invShown' + '.' + 917; 	aims_parkingInitialze(917);
 } 
 setTimeout('sendPREUpdates("icoShown.917")',3000);  
 }

 function PREshow918(){
 if(PREimgName==null || PREimgName!='learn_newinvite_phoenix.png'){
 I2CFlag=true; if ( typeof pacim["918"] == "undefined" ){pacim["918"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["918"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["918"]='';  ptoimua["918"]='';  ptoiua["918"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1147', '918');aims_sCAP('APPID'); } else {setTimeout('PREshow918()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '918');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '918'); aims_sCAP('OTHER'); } 
 divHtml="<div id='aimslayer' style='left: 10px; top: 90px; line-height: 1; visibility: hidden; position: absolute; z-index: 99999999; bgcolor: #000000;' name='aimslayer'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='padding: 0px;'><a name='needRef' title='Invitation' id='needRef' onclick='return PREacceptCall(918)' href='javascript:void(0);' target='_self'><img name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' src='https://collaborateext.verizon.com/pre/prescripts/images/learn_newinvite_phoenix.png' border='0'></a>"+ptoia[918]+"<div id='aimsdenyinvite' style='left: 225px; top: 170px; position: absolute;'><a style='font-family: Verdana; font-size: 14px; font-weight: bold; text-decoration: none;' onclick='return PRErejectCall(918)' href='javascript:void(0);' target='_self'>No thanks</a></div></td></tr></tbody></table></div>"; 
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='learn_newinvite_phoenix.png'; 	PRElastAction='invShown' + '.' + 918; 	aims_I2CInitialze(918);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["918"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["918"]=true;paift["918"]=1;setTimeout( 'resetPGS('+'918'+')' , 3000 );setTimeout( 'aims_initializeChat('+'918'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.918")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow919(){
 if(PREimgName==null || PREimgName!='SMBDotComNewRedC2C.gif'){
 pacia["919"]=PREImageIconURL+'SMBDotComNewRedC2C.gif'; paciu["919"]=PREImageIconURL+'SMBDotComNewRedC2C_unavailable.gif'; pauid["919"]=true; paift["919"]=1;
  if ( typeof pacim["919"] == "undefined" ){pacim["919"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["919"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["919"]='';  ptoimua["919"]='';  ptoiua["919"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1109', '919');aims_sCAP('APPID'); } else {setTimeout('PREshow919()', 1000);return; }
 if (typeof aimsChatCreditFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsChatCreditFlow, '919'); aims_sCAP('OTHER'); } 
 if (C2CFlag919==true){aims_initializeChat(919);C2CFlag919=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.919")',3000);  
 }

 function PREshow920(){
 if(PREimgName==null || PREimgName!='chatbadge_learn2x.png'){
 pacia["920"]=PREImageIconURL+'chatbadge_learn2x.png'; paciu["920"]=PREImageIconURL+'chatbadge_learn2x_unavailable.png'; pauid["920"]=true; paift["920"]=1;
  if ( typeof pacim["920"] == "undefined" ){pacim["920"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["920"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["920"]='';  ptoimua["920"]='';  ptoiua["920"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1110', '920');aims_sCAP('APPID'); } else {setTimeout('PREshow920()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '920'); aims_sCAP('OTHER'); } 
 if (C2CFlag920==true){aims_initializeChat(920);C2CFlag920=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.920")',3000);  
 }

 function PREshow921(){
 if(PREimgName==null || PREimgName!='VZBECommIDSC2C.png'){
 pacia["921"]=PREImageIconURL+'VZBECommIDSC2C.png'; paciu["921"]=PREImageIconURL+'VZBECommIDSC2C_unavailable.png'; pauid["921"]=true; paift["921"]=1;
  if ( typeof pacim["921"] == "undefined" ){pacim["921"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["921"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["921"]='';  ptoimua["921"]='';  ptoiua["921"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('370', '921');aims_sCAP('APPID'); } else {setTimeout('PREshow921()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '921');aims_sCAP('STATE');} 
 if (C2CFlag921==true){aims_initializeChat(921);C2CFlag921=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.921")',3000);  
 }

 function PREshow922(){
 if(PREimgName==null || PREimgName!='VZBECommIDSC2C.png'){
     PREMasterTreatment=true; 
pacim["923"]="aimsChatIcon2";pacim["921"]="aimsChatIcon1";setTimeout('sendPREUpdates("' + 'icoShown.922' + '")',50);setTimeout('PREshow921()', 1000 );setTimeout('PREshow923()', 3000 ); } 
 }

 function PREshow923(){
 if(PREimgName==null || PREimgName!='VZBECommIDSC2CLC.gif'){
 pacia["923"]=PREImageIconURL+'VZBECommIDSC2CLC.gif'; paciu["923"]=PREImageIconURL+'VZBECommIDSC2CLC_unavailable.gif'; pauid["923"]=true; paift["923"]=1;
  if ( typeof pacim["923"] == "undefined" ){pacim["923"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["923"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["923"]='';  ptoimua["923"]='';  ptoiua["923"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('370', '923');aims_sCAP('APPID'); } else {setTimeout('PREshow923()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '923');aims_sCAP('STATE');} 
 if (C2CFlag923==true){aims_initializeChat(923);C2CFlag923=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.923")',3000);  
 }

 function PREshow924(){
 if(PREimgName==null || PREimgName!='siwizardchat.png'){
 pacia["924"]=PREImageIconURL+'siwizardchat.png'; paciu["924"]=PREImageIconURL+'siwizardchat_unavailable.png'; pauid["924"]=true; paift["924"]=1;
  if ( typeof pacim["924"] == "undefined" ){pacim["924"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["924"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["924"]='';  ptoimua["924"]='';  ptoiua["924"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('551', '924');aims_sCAP('APPID'); } else {setTimeout('PREshow924()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '924');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '924'); aims_sCAP('OTHER'); } 
 if (C2CFlag924==true){aims_initializeChat(924);C2CFlag924=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.924")',3000);  
 }

 function PREshow925(){
 if(PREimgName==null || PREimgName!='aphelpdesk_chat.jpg'){
 pacia["925"]=PREImageIconURL+'aphelpdesk_chat.jpg'; paciu["925"]=PREImageIconURL+'aphelpdesk_chat_unavailable.jpg'; pauid["925"]=true; paift["925"]=1;
  if ( typeof pacim["925"] == "undefined" ){pacim["925"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborate.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["925"]='https://collaborate.verizon.com/secure/aims/encore/VZCTC.serv'; 
 ptoia["925"]='';  ptoimua["925"]='';  ptoiua["925"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('586', '925');aims_sCAP('APPID'); } else {setTimeout('PREshow925()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '925');aims_sCAP('STATE');} 
 if (C2CFlag925==true){aims_initializeChat(925);C2CFlag925=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.925")',3000);  
 }

 function PREshow926(){
 if(PREimgName==null || PREimgName!='chat_72x18.png'){
 pacia["926"]=PREImageIconURL+'chat_72x18.png'; paciu["926"]=PREImageIconURL+'chat_72x18_unavailable.png'; pauid["926"]=true; paift["926"]=1;
  if ( typeof pacim["926"] == "undefined" ){pacim["926"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["926"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["926"]='';  ptoimua["926"]='';  ptoiua["926"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1146', '926');aims_sCAP('APPID'); } else {setTimeout('PREshow926()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '926');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '926'); aims_sCAP('OTHER'); } 
 if (C2CFlag926==true){aims_initializeChat(926);C2CFlag926=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.926")',3000);  
 }

 function PREshow927(){
 if(PREimgName==null || PREimgName!='SMBOrderNewRedC2C.png'){
     PREMasterTreatment=true; 
pacim["865"]="aimsChatIcon2";pacim["926"]="aimsChatIcon1";setTimeout('sendPREUpdates("' + 'icoShown.927' + '")',50);setTimeout('PREshow926()', 1000 );setTimeout('PREshow865()', 3000 ); } 
 }

 function PREshow928(){
 if(PREimgName==null || PREimgName!='learn_newinvite_phoenix.png'){
 I2CFlag=true; if ( typeof pacim["928"] == "undefined" ){pacim["928"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["928"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["928"]='';  ptoimua["928"]='';  ptoiua["928"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1146', '928');aims_sCAP('APPID'); } else {setTimeout('PREshow928()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '928'); aims_sCAP('OTHER'); } 
 divHtml="<div id='aimslayer' style='left: 10px; top: 90px; line-height: 1; visibility: hidden; position: absolute; z-index: 99999999; bgcolor: #000000;' name='aimslayer'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='padding: 0px;'><a name='needRef' title='Invitation' id='needRef' onclick='return PREacceptCall(928)' href='javascript:void(0);' target='_self'><img name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' src='https://collaborateext.verizon.com/pre/prescripts/images/learn_newinvite_phoenix.png' border='0'></a>"+ptoia[928]+"<div id='aimsdenyinvite' style='left: 225px; top: 170px; position: absolute;'><a style='font-family: Verdana; font-size: 14px; font-weight: bold; text-decoration: none;' onclick='return PRErejectCall(928)' href='javascript:void(0);' target='_self'>No thanks</a></div></td></tr></tbody></table></div>"; 
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='learn_newinvite_phoenix.png'; 	PRElastAction='invShown' + '.' + 928; 	aims_I2CInitialze(928);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["928"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["928"]=true;paift["928"]=1;setTimeout( 'resetPGS('+'928'+')' , 3000 );setTimeout( 'aims_initializeChat('+'928'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.928")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow929(){
 if(PREimgName==null || PREimgName!='call_56x18.png'){
 pacia["929"]=PREImageIconURL+'call_56x18.png'; paciu["929"]=PREImageIconURL+'call_56x18_unavailable.png'; pauid["929"]=true; paift["929"]=1;
  if ( typeof pacim["929"] == "undefined" ){pacim["929"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["929"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["929"]='';  ptoimua["929"]='';  ptoiua["929"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('532', '929');aims_sCAP('APPID'); } else {setTimeout('PREshow929()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '929');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '929'); aims_sCAP('OTHER'); } 
 if (C2CFlag929==true){aims_initializeChat(929);C2CFlag929=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.929")',3000);  
 }

 function PREshow930(){
 if(PREimgName==null || PREimgName!='SSBLearnC2CMaster.png'){
 pacia["930"]=PREImageIconURL+'SSBLearnC2CMaster.png'; paciu["930"]=PREImageIconURL+'SSBLearnC2CMaster_unavailable.png'; pauid["930"]=true; paift["930"]=1;
  if ( typeof pacim["930"] == "undefined" ){pacim["930"]="aimsChatIcon"; }
 pacu["930"]=PREBaseURL+'dummy'; 
 ptoia["930"]='';  ptoimua["930"]='';  ptoiua["930"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('dummy', '930');aims_sCAP('APPID'); } else {setTimeout('PREshow930()', 1000);return; }
 if (C2CFlag930==true){aims_initializeChat(930);C2CFlag930=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.930")',3000);  
 }

 function PREshow931(){
 if(PREimgName==null || PREimgName!='SMBOrderNewRedC2CI2C.gif'){
 I2CFlag=true; if ( typeof pacim["931"] == "undefined" ){pacim["931"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["931"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["931"]='';  ptoimua["931"]='';  ptoiua["931"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1147', '931');aims_sCAP('APPID'); } else {setTimeout('PREshow931()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '931'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(931)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/SMBOrderNewRedC2CI2C.gif' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[931]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(931)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/SMBOrderNewRedC2CI2C_close.gif' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='SMBOrderNewRedC2CI2C.gif'; 	PRElastAction='invShown' + '.' + 931; 	aims_I2CInitialze(931);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["931"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["931"]=true;paift["931"]=1;setTimeout( 'resetPGS('+'931'+')' , 3000 );setTimeout( 'aims_initializeChat('+'931'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.931")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow932(){
 if(PREimgName==null || PREimgName!='Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png'){
 pacia["932"]=PREImageIconURL+'Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png'; paciu["932"]=PREImageIconURL+'Phoenix_Redesign_Parking_Lot_Expert_Advice_082115_unavailable.png'; pauid["932"]=true; paift["932"]=1;
  if ( typeof pacim["932"] == "undefined" ){pacim["932"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["932"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["932"]='';  ptoimua["932"]='';  ptoiua["932"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1147', '932');aims_sCAP('APPID'); } else {setTimeout('PREshow932()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '932'); aims_sCAP('OTHER'); } 
 if (C2CFlag932==true){aims_initializeChat(932);C2CFlag932=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.932")',3000);  
 }

 function PREshow933(){
 if(PREimgName==null || PREimgName!='call_56x18.png'){
 pacia["933"]=PREImageIconURL+'call_56x18.png'; paciu["933"]=PREImageIconURL+'call_56x18_unavailable.png'; pauid["933"]=true; paift["933"]=1;
  if ( typeof pacim["933"] == "undefined" ){pacim["933"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["933"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["933"]='';  ptoimua["933"]='';  ptoiua["933"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('532', '933');aims_sCAP('APPID'); } else {setTimeout('PREshow933()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '933');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '933'); aims_sCAP('OTHER'); } 
 if (C2CFlag933==true){aims_initializeChat(933);C2CFlag933=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.933")',3000);  
 }

 function PREshow934(){
 if(PREimgName==null || PREimgName!='chat_72x18.png'){
 pacia["934"]=PREImageIconURL+'chat_72x18.png'; paciu["934"]=PREImageIconURL+'chat_72x18_unavailable.png'; pauid["934"]=true; paift["934"]=1;
  if ( typeof pacim["934"] == "undefined" ){pacim["934"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["934"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["934"]='';  ptoimua["934"]='';  ptoiua["934"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1147', '934');aims_sCAP('APPID'); } else {setTimeout('PREshow934()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '934');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '934'); aims_sCAP('OTHER'); } 
 if (C2CFlag934==true){aims_initializeChat(934);C2CFlag934=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.934")',3000);  
 }

 function PREshow935(){
 if(PREimgName==null || PREimgName!='Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png'){
 pacia["935"]=PREImageIconURL+'Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png'; paciu["935"]=PREImageIconURL+'Phoenix_Redesign_Parking_Lot_Expert_Advice_082115_unavailable.png'; if ( typeof pacim["935"] == "undefined" ){pacim["935"]="aimsparkinglayer"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["935"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["935"]='';  ptoimua["935"]='';  ptoiua["935"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1146', '935');aims_sCAP('APPID'); } else {setTimeout('PREshow935()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '935');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '935'); aims_sCAP('OTHER'); } 
 if (C2CFlag935==true){C2CFlag935=false;}
  preParkingSide = "left";   
   preflyoutcoords = "240px";    
   preflyincoords = "8px";   
  divHtml="<div name='aimsparkinglayer' id='aimsparkinglayer' style='position: fixed; z-index: 99999999; top:400px; left:8px;  visibility:hidden; '><a href='javascript:void(0);' >  <img  id='parkingchaticon' style=' position: absolute;  cursor: pointer; max-width:none; margin-left:-240px;' name='PREAIMSParkingLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png' border='0' onClick='return PREparkingacceptCall(935)'  onmouseover='PREparkingflyOut()' onmouseout='PREparkingflyIn()' /></a>  </div> " ;      
 if ( !PREParkingshowImage){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimsprkglayerHolderDiv = document.createElement('div');
            aimsprkglayerHolderDiv.setAttribute('id', 'aimsparkinglayerHolder');
            document.body.appendChild(aimsprkglayerHolderDiv);
            document.getElementById("aimsparkinglayerHolder").innerHTML = divHtml;
          }
     }catch(ex){}
 }
  PREimgName='Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png'; 	PRElastAction='invShown' + '.' + 935; 	aims_parkingInitialze(935);
 } 
 setTimeout('sendPREUpdates("icoShown.935")',3000);  
 }

 function PREshow936(){
 if(PREimgName==null || PREimgName!='MB_I2C.gif'){
 I2CFlag=true; if ( typeof pacim["936"] == "undefined" ){pacim["936"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["936"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["936"]='<div id=preTextHolder style=position:absolute;left:15px;top:168px;z-index:9999999999;><div id=preText style=position:relative;vertical-align:top; width="60%"><A style="LINE-HEIGHT: 22px; FONT-FAMILY: JunkFont1, Arial, sans-serif; COLOR: #0066cc; FONT-SIZE: 12px; FONT-WEIGHT: bold; TEXT-DECORATION: none" href="https://enterprisecenter.verizon.com/enterprisesolutions/global/dlink/global/body/viewPersonalProfile.do?tabName=sitePreferences&mode=edit" title="Disable Proactive Chat window by editing chat preference option under Site Preference settings">Disable Proactive Chat</A></div></DIV>';  ptoimua["936"]='';  ptoiua["936"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('542', '936');aims_sCAP('APPID'); } else {setTimeout('PREshow936()', 1000);return; }
 if (typeof aimsChatCreditFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsChatCreditFlow, '936'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(936)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/MB_I2C.gif' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[936]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(936)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/MB_I2C_close.gif' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='MB_I2C.gif'; 	PRElastAction='invShown' + '.' + 936; 	aims_I2CInitialze(936);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["936"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["936"]=true;paift["936"]=1;setTimeout( 'resetPGS('+'936'+')' , 3000 );setTimeout( 'aims_initializeChat('+'936'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.936")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow937(){
 if(PREimgName==null || PREimgName!='chat_icon.png'){
 pacia["937"]=PREImageIconURL+'chat_icon.png'; paciu["937"]=PREImageIconURL+'chat_icon_unavailable.png'; pauid["937"]=true; paift["937"]=1;
  if ( typeof pacim["937"] == "undefined" ){pacim["937"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["937"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["937"]='';  ptoimua["937"]='';  ptoiua["937"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('954', '937');aims_sCAP('APPID'); } else {setTimeout('PREshow937()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '937');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '937'); aims_sCAP('OTHER'); } 
 if (C2CFlag937==true){aims_initializeChat(937);C2CFlag937=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.937")',3000);  
 }

 function PREshow938(){
 if(PREimgName==null || PREimgName!='learn_newinvite_phoenix.png'){
 I2CFlag=true; if ( typeof pacim["938"] == "undefined" ){pacim["938"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["938"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["938"]='';  ptoimua["938"]='';  ptoiua["938"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('954', '938');aims_sCAP('APPID'); } else {setTimeout('PREshow938()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '938');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '938'); aims_sCAP('OTHER'); } 
 divHtml="<div id='aimslayer' style='left: 10px; top: 90px; line-height: 1; visibility: hidden; position: absolute; z-index: 99999999; bgcolor: #000000;' name='aimslayer'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='padding: 0px;'><a name='needRef' title='Invitation' id='needRef' onclick='return PREacceptCall(938)' href='javascript:void(0);' target='_self'><img name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' src='https://collaborateext.verizon.com/pre/prescripts/images/learn_newinvite_phoenix.png' border='0'></a>"+ptoia[938]+"<div id='aimsdenyinvite' style='left: 225px; top: 170px; position: absolute;'><a style='font-family: Verdana; font-size: 14px; font-weight: bold; text-decoration: none;' onclick='return PRErejectCall(938)' href='javascript:void(0);' target='_self'>No thanks</a></div></td></tr></tbody></table></div>"; 
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='learn_newinvite_phoenix.png'; 	PRElastAction='invShown' + '.' + 938; 	aims_I2CInitialze(938);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["938"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["938"]=true;paift["938"]=1;setTimeout( 'resetPGS('+'938'+')' , 3000 );setTimeout( 'aims_initializeChat('+'938'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.938")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow939(){
 if(PREimgName==null || PREimgName!='chat_icon.png'){
 pacia["939"]=PREImageIconURL+'chat_icon.png'; paciu["939"]=PREImageIconURL+'chat_icon_unavailable.png'; pauid["939"]=true; paift["939"]=1;
  if ( typeof pacim["939"] == "undefined" ){pacim["939"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["939"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["939"]='';  ptoimua["939"]='';  ptoiua["939"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('954', '939');aims_sCAP('APPID'); } else {setTimeout('PREshow939()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '939');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '939'); aims_sCAP('OTHER'); } 
 if (C2CFlag939==true){aims_initializeChat(939);C2CFlag939=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.939")',3000);  
 }

 function PREshow940(){
 if(PREimgName==null || PREimgName!='learn_newinvite_phoenix.png'){
 I2CFlag=true; if ( typeof pacim["940"] == "undefined" ){pacim["940"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["940"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["940"]='';  ptoimua["940"]='';  ptoiua["940"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('954', '940');aims_sCAP('APPID'); } else {setTimeout('PREshow940()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '940');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '940'); aims_sCAP('OTHER'); } 
 divHtml="<div id='aimslayer' style='left: 10px; top: 90px; line-height: 1; visibility: hidden; position: absolute; z-index: 99999999; bgcolor: #000000;' name='aimslayer'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='padding: 0px;'><a name='needRef' title='Invitation' id='needRef' onclick='return PREacceptCall(940)' href='javascript:void(0);' target='_self'><img name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' src='https://collaborateext.verizon.com/pre/prescripts/images/learn_newinvite_phoenix.png' border='0'></a>"+ptoia[940]+"<div id='aimsdenyinvite' style='left: 225px; top: 170px; position: absolute;'><a style='font-family: Verdana; font-size: 14px; font-weight: bold; text-decoration: none;' onclick='return PRErejectCall(940)' href='javascript:void(0);' target='_self'>No thanks</a></div></td></tr></tbody></table></div>"; 
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='learn_newinvite_phoenix.png'; 	PRElastAction='invShown' + '.' + 940; 	aims_I2CInitialze(940);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["940"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["940"]=true;paift["940"]=1;setTimeout( 'resetPGS('+'940'+')' , 3000 );setTimeout( 'aims_initializeChat('+'940'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.940")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120001);   
 }

 function PREshow941(){
 if(PREimgName==null || PREimgName!='chat_icon-cvc.png'){
 pacia["941"]=PREImageIconURL+'chat_icon-cvc.png'; paciu["941"]=PREImageIconURL+'chat_icon-cvc_unavailable.png'; pauid["941"]=true; paift["941"]=1;
  if ( typeof pacim["941"] == "undefined" ){pacim["941"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["941"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["941"]='';  ptoimua["941"]='';  ptoiua["941"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('861', '941');aims_sCAP('APPID'); } else {setTimeout('PREshow941()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '941');aims_sCAP('STATE');} 
 if (typeof Order_Flow != "undefined" ){aims_setCustomerInfo('OTHER',Order_Flow, '941'); aims_sCAP('OTHER'); } 
 if (C2CFlag941==true){aims_initializeChat(941);C2CFlag941=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.941")',3000);  
 }

 function PREshow942(){
 if(PREimgName==null || PREimgName!='learn_newinvite_phoenix_credit.png'){
 I2CFlag=true; if ( typeof pacim["942"] == "undefined" ){pacim["942"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["942"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["942"]='';  ptoimua["942"]='';  ptoiua["942"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('861', '942');aims_sCAP('APPID'); } else {setTimeout('PREshow942()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '942');aims_sCAP('STATE');} 
 if (typeof Order_Flow != "undefined" ){aims_setCustomerInfo('OTHER',Order_Flow, '942'); aims_sCAP('OTHER'); } 
 divHtml="<div id='aimslayer' style='left: 10px; top: 90px; line-height: 1; visibility: hidden; position: absolute; z-index: 99999999; bgcolor: #000000;' name='aimslayer'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='padding: 0px;'><a name='needRef' title='Invitation' id='needRef' onclick='return PREacceptCall(942)' href='javascript:void(0);' target='_self'><img name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' src='https://collaborateext.verizon.com/pre/prescripts/images/learn_newinvite_phoenix_credit.png' border='0'></a>"+ptoia[942]+"<div id='aimsdenyinvite' style='left: 225px; top: 170px; position: absolute;'><a style='font-family: Verdana; font-size: 14px; font-weight: bold; text-decoration: none;' onclick='return PRErejectCall(942)' href='javascript:void(0);' target='_self'>No thanks</a></div></td></tr></tbody></table></div>"; 
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='learn_newinvite_phoenix_credit.png'; 	PRElastAction='invShown' + '.' + 942; 	aims_I2CInitialze(942);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["942"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["942"]=true;paift["942"]=1;setTimeout( 'resetPGS('+'942'+')' , 3000 );setTimeout( 'aims_initializeChat('+'942'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.942")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow943(){
 if(PREimgName==null || PREimgName!='chatbadge_learn2x.png'){
 if (isUserOniPad()) { 
 pacia["943"]=PREImageIconURL+'chatbadge_learn2x.png'; paciu["943"]=PREImageIconURL+'chatbadge_learn2x_unavailable.png'; } else if (isUserOnMobile()  ||  isUserOnFireFoxMobile() || isUserOnMobile2()) { 
 pacia["943"]=PREImageIconURL+'chatbadge_learn2x_mobile.png'; paciu["943"]=PREImageIconURL+'chatbadge_learn2x_mobile_unavailable.png'; } else { 
 pacia["943"]=PREImageIconURL+'chatbadge_learn2x.png'; paciu["943"]=PREImageIconURL+'chatbadge_learn2x_unavailable.png'; } 
 pauid["943"]=true; paift["943"]=1;
  if ( typeof pacim["943"] == "undefined" ){pacim["943"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["943"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["943"]='';  ptoimua["943"]='';  ptoiua["943"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1110', '943');aims_sCAP('APPID'); } else {setTimeout('PREshow943()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '943'); aims_sCAP('OTHER'); } 
 if (C2CFlag943==true){aims_initializeChat(943);C2CFlag943=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.943")',3000);  
 }

 function PREshow944(){
 if(PREimgName==null || PREimgName!='phoenix_qc_master.png'){
     PREMasterTreatment=true; 
pacim["858"]="aimsChatIcon2";pacim["937"]="aimsChatIcon1";setTimeout('sendPREUpdates("' + 'icoShown.944' + '")',50);setTimeout('PREshow937()', 1000 );setTimeout('PREshow858()', 3000 ); } 
 }

 function PREshow948(){
 setTimeout('sendPREUpdates("icoShown.948")',3000);  
 }

 function PREshow949(){
 setTimeout('sendPREUpdates("icoShown.949")',3000);  
 }

 function PREshow950(){
 setTimeout('sendPREUpdates("icoShown.950")',3000);  
 }

 function PREshow951(){
 if(PREimgName==null || PREimgName!='ChatNow_Need More-Info_CVCsmall.png'){
 pacia["951"]=PREImageIconURL+'ChatNow_Need More-Info_CVCsmall.png'; paciu["951"]=PREImageIconURL+'ChatNow_Need More-Info_CVCsmall_unavailable.png'; pauid["951"]=true; paift["951"]=1;
  if ( typeof pacim["951"] == "undefined" ){pacim["951"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["951"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["951"]='';  ptoimua["951"]='';  ptoiua["951"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('531', '951');aims_sCAP('APPID'); } else {setTimeout('PREshow951()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '951');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '951'); aims_sCAP('OTHER'); } 
 if (C2CFlag951==true){aims_initializeChat(951);C2CFlag951=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.951")',3000);  
 }

 function PREshow952(){
 if(PREimgName==null || PREimgName!='chatinvite_siwizard.gif'){
 I2CFlag=true; if ( typeof pacim["952"] == "undefined" ){pacim["952"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["952"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["952"]='';  ptoimua["952"]='';  ptoiua["952"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('551', '952');aims_sCAP('APPID'); } else {setTimeout('PREshow952()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '952');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '952'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(952)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/chatinvite_siwizard.gif' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[952]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(952)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/chatinvite_siwizard_close.gif' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='chatinvite_siwizard.gif'; 	PRElastAction='invShown' + '.' + 952; 	aims_I2CInitialze(952);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["952"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["952"]=true;paift["952"]=1;setTimeout( 'resetPGS('+'952'+')' , 3000 );setTimeout( 'aims_initializeChat('+'952'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.952")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow953(){
 if(PREimgName==null || PREimgName!='slipicon_liveChat.jpg'){
 pacia["953"]=PREImageIconURL+'slipicon_liveChat.jpg'; paciu["953"]=PREImageIconURL+'slipicon_liveChat_unavailable.jpg'; pauid["953"]=true; paift["953"]=1;
  if ( typeof pacim["953"] == "undefined" ){pacim["953"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["953"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["953"]='';  ptoimua["953"]='';  ptoiua["953"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('551', '953');aims_sCAP('APPID'); } else {setTimeout('PREshow953()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '953');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '953'); aims_sCAP('OTHER'); } 
 if (C2CFlag953==true){aims_initializeChat(953);C2CFlag953=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.953")',3000);  
 }

 function PREshow954(){
 if(PREimgName==null || PREimgName!='disputeschat.png'){
 pacia["954"]=PREImageIconURL+'disputeschat.png'; paciu["954"]=PREImageIconURL+'disputeschat_unavailable.png'; pauid["954"]=true; paift["954"]=1;
  if ( typeof pacim["954"] == "undefined" ){pacim["954"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["954"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["954"]='';  ptoimua["954"]='';  ptoiua["954"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('99', '954');aims_sCAP('APPID'); } else {setTimeout('PREshow954()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '954');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '954'); aims_sCAP('OTHER'); } 
 if (C2CFlag954==true){aims_initializeChat(954);C2CFlag954=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.954")',3000);  
 }

 function PREshow955(){
 if(PREimgName==null || PREimgName!='parking_blank.png'){
 pacia["955"]=PREImageIconURL+'parking_blank.png'; paciu["955"]=PREImageIconURL+'parking_blank_unavailable.png'; if ( typeof pacim["955"] == "undefined" ){pacim["955"]="aimsparkinglayer"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["955"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["955"]='';  ptoimua["955"]='';  ptoiua["955"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('954', '955');aims_sCAP('APPID'); } else {setTimeout('PREshow955()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '955');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '955'); aims_sCAP('OTHER'); } 
 if (C2CFlag955==true){C2CFlag955=false;}
  preParkingSide = "left";   
   preflyoutcoords = "240px";    
   preflyincoords = "8px";   
  divHtml="<div name='aimsparkinglayer' id='aimsparkinglayer' style='position: fixed; z-index: 99999999; top:400px; left:8px;  visibility:hidden; '><a href='javascript:void(0);' >  <img  id='parkingchaticon' style=' position: absolute;  cursor: pointer; max-width:none; margin-left:-240px;' name='PREAIMSParkingLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/parking_blank.png' border='0' onClick='return PREparkingacceptCall(955)'  onmouseover='PREparkingflyOut()' onmouseout='PREparkingflyIn()' /></a>  </div> " ;      
 if ( !PREParkingshowImage){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimsprkglayerHolderDiv = document.createElement('div');
            aimsprkglayerHolderDiv.setAttribute('id', 'aimsparkinglayerHolder');
            document.body.appendChild(aimsprkglayerHolderDiv);
            document.getElementById("aimsparkinglayerHolder").innerHTML = divHtml;
          }
     }catch(ex){}
 }
  PREimgName='parking_blank.png'; 	PRElastAction='invShown' + '.' + 955; 	aims_parkingInitialze(955);
 } 
 setTimeout('sendPREUpdates("icoShown.955")',3000);  
 }

 function PREshow956(){
 if(PREimgName==null || PREimgName!='SMBLBONewMaster.png'){
     PREMasterTreatment=true; 
pacim["958"]="aimsChatIcon1";pacim["957"]="aimsChatIcon2";setTimeout('sendPREUpdates("' + 'icoShown.956' + '")',50);setTimeout('PREshow958()', 1000 );setTimeout('PREshow957()', 3000 ); } 
 }

 function PREshow957(){
 if(PREimgName==null || PREimgName!='call_56x18.png'){
 pacia["957"]=PREImageIconURL+'call_56x18.png'; paciu["957"]=PREImageIconURL+'call_56x18_unavailable.png'; pauid["957"]=true; paift["957"]=1;
  if ( typeof pacim["957"] == "undefined" ){pacim["957"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["957"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["957"]='';  ptoimua["957"]='';  ptoiua["957"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('532', '957');aims_sCAP('APPID'); } else {setTimeout('PREshow957()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '957');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '957'); aims_sCAP('OTHER'); } 
 if (C2CFlag957==true){aims_initializeChat(957);C2CFlag957=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.957")',3000);  
 }

 function PREshow958(){
 if(PREimgName==null || PREimgName!='chat_72x18.png'){
 pacia["958"]=PREImageIconURL+'chat_72x18.png'; paciu["958"]=PREImageIconURL+'chat_72x18_unavailable.png'; pauid["958"]=true; paift["958"]=1;
  if ( typeof pacim["958"] == "undefined" ){pacim["958"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["958"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["958"]='';  ptoimua["958"]='';  ptoiua["958"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1147', '958');aims_sCAP('APPID'); } else {setTimeout('PREshow958()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '958');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '958'); aims_sCAP('OTHER'); } 
 if (C2CFlag958==true){aims_initializeChat(958);C2CFlag958=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.958")',3000);  
 }

 function PREshow959(){
 if(PREimgName==null || PREimgName!='SMBRegistrationBizAcct_parking.png'){
 pacia["959"]=PREImageIconURL+'SMBRegistrationBizAcct_parking.png'; paciu["959"]=PREImageIconURL+'SMBRegistrationBizAcct_parking_unavailable.png'; if ( typeof pacim["959"] == "undefined" ){pacim["959"]="aimsparkinglayer"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["959"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["959"]='';  ptoimua["959"]='';  ptoiua["959"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('420', '959');aims_sCAP('APPID'); } else {setTimeout('PREshow959()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '959');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '959'); aims_sCAP('OTHER'); } 
 if (C2CFlag959==true){C2CFlag959=false;}
  preParkingSide = "left";   
   preflyoutcoords = "240px";    
   preflyincoords = "8px";   
  divHtml="<div name='aimsparkinglayer' id='aimsparkinglayer' style='position: fixed; z-index: 99999999; top:400px; left:8px;  visibility:hidden; '><a href='javascript:void(0);' >  <img  id='parkingchaticon' style=' position: absolute;  cursor: pointer; max-width:none; margin-left:-240px;' name='PREAIMSParkingLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/SMBRegistrationBizAcct_parking.png' border='0' onClick='return PREparkingacceptCall(959)'  onmouseover='PREparkingflyOut()' onmouseout='PREparkingflyIn()' /></a>  </div> " ;      
 if ( !PREParkingshowImage){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimsprkglayerHolderDiv = document.createElement('div');
            aimsprkglayerHolderDiv.setAttribute('id', 'aimsparkinglayerHolder');
            document.body.appendChild(aimsprkglayerHolderDiv);
            document.getElementById("aimsparkinglayerHolder").innerHTML = divHtml;
          }
     }catch(ex){}
 }
  PREimgName='SMBRegistrationBizAcct_parking.png'; 	PRElastAction='invShown' + '.' + 959; 	aims_parkingInitialze(959);
 } 
 setTimeout('sendPREUpdates("icoShown.959")',3000);  
 }

 function PREshow960(){
 if(PREimgName==null || PREimgName!='chat_145x56.png'){
 pacia["960"]=PREImageIconURL+'chat_145x56.png'; paciu["960"]=PREImageIconURL+'chat_145x56_unavailable.png'; pauid["960"]=true; paift["960"]=1;
  if ( typeof pacim["960"] == "undefined" ){pacim["960"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["960"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["960"]='';  ptoimua["960"]='';  ptoiua["960"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1095', '960');aims_sCAP('APPID'); } else {setTimeout('PREshow960()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '960');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '960'); aims_sCAP('OTHER'); } 
 if (C2CFlag960==true){aims_initializeChat(960);C2CFlag960=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.960")',3000);  
 }

 function PREshow961(){
 if(PREimgName==null || PREimgName!='VZNewConn_affinity_chat.png'){
 pacia["961"]=PREImageIconURL+'VZNewConn_affinity_chat.png'; paciu["961"]=PREImageIconURL+'VZNewConn_affinity_chat_unavailable.png'; pauid["961"]=true; paift["961"]=1;
  if ( typeof pacim["961"] == "undefined" ){pacim["961"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["961"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["961"]='';  ptoimua["961"]='';  ptoiua["961"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('524', '961');aims_sCAP('APPID'); } else {setTimeout('PREshow961()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '961');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '961'); aims_sCAP('OTHER'); } 
 if (C2CFlag961==true){aims_initializeChat(961);C2CFlag961=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.961")',3000);  
 }

 function PREshow962(){
 if(PREimgName==null || PREimgName!='VPrice_Chat_Available.png'){
 pacia["962"]=PREImageIconURL+'VPrice_Chat_Available.png'; paciu["962"]=PREImageIconURL+'VPrice_Chat_Available_unavailable.png'; pauid["962"]=true; paift["962"]=1;
  if ( typeof pacim["962"] == "undefined" ){pacim["962"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["962"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["962"]='';  ptoimua["962"]='';  ptoiua["962"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1238', '962');aims_sCAP('APPID'); } else {setTimeout('PREshow962()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '962');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '962'); aims_sCAP('OTHER'); } 
 if (C2CFlag962==true){aims_initializeChat(962);C2CFlag962=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.962")',3000);  
 }

 function PREshow964(){
 if(PREimgName==null || PREimgName!='proactiveChatIconVEC3.png'){
 I2CFlag=true; if ( typeof pacim["964"] == "undefined" ){pacim["964"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["964"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["964"]='<div id=preTextHolder style=position:absolute;left:45px;top:232px;z-index:9999999999;><div id=preText style=position:relative;vertical-align:top; width="60%"><A style="LINE-HEIGHT: 22px; FONT-FAMILY: JunkFont1, Arial, sans-serif; COLOR: #0066cc; FONT-SIZE: 12px; FONT-WEIGHT: bold; TEXT-DECORATION: none" href="https://enterprisecenter.verizon.com/enterprisesolutions/global/dlink/global/body/viewPersonalProfile.do?tabName=sitePreferences&mode=edit" title="Disable Proactive Chat window by editing chat preference option under Site Preference settings">Disable Proactive Chat</A></div></DIV>';  ptoimua["964"]='';  ptoiua["964"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('370', '964');aims_sCAP('APPID'); } else {setTimeout('PREshow964()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '964'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(964)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/proactiveChatIconVEC3.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[964]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(964)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/proactiveChatIconVEC3_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='proactiveChatIconVEC3.png'; 	PRElastAction='invShown' + '.' + 964; 	aims_I2CInitialze(964);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["964"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["964"]=true;paift["964"]=1;setTimeout( 'resetPGS('+'964'+')' , 3000 );setTimeout( 'aims_initializeChat('+'964'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.964")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow965(){
 setTimeout('sendPREUpdates("icoShown.965")',3000);  
 }

 function PREshow966(){
 if(PREimgName==null || PREimgName!='phoenix_rap_new.png'){
 I2CFlag=true; if ( typeof pacim["966"] == "undefined" ){pacim["966"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["966"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["966"]='';  ptoimua["966"]='';  ptoiua["966"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('551', '966');aims_sCAP('APPID'); } else {setTimeout('PREshow966()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '966'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:"+getScrollY()+"px'><table border='0' cellSpacing='0' cellPadding='0'><tr><td  style='padding: 0px;'><a id='needRef' title='Invitation' href='javascript:void(0);' name='needRef' onClick='return PREacceptCall(966)' target='_self'><img id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' border='0' name='PREAIMSLiveChatImg' alt='Live Chat'  src='https://collaborateext.verizon.com/pre/prescripts/images/phoenix_rap_new.png'></a><div id='aimsdenyinvite'  style='position:absolute;top:155px;left:25px;'><a href='javascript:void(0);' onClick='return PRErejectCall(966)'  target='_self'><img onload='PREsetImageLoaded()' border='0' name='need_close' alt='Close Invitation' src='https://collaborateext.verizon.com/pre/prescripts/images/phoenix_rap_new_close.png'></a></div></td></tr></table></div>" ;
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='phoenix_rap_new.png'; 	PRElastAction='invShown' + '.' + 966; 	aims_I2CInitialze(966);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["966"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["966"]=true;paift["966"]=1;setTimeout( 'resetPGS('+'966'+')' , 3000 );setTimeout( 'aims_initializeChat('+'966'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.966")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow967(){
 if(PREimgName==null || PREimgName!='phoenix_rap_new.png'){
 I2CFlag=true; if ( typeof pacim["967"] == "undefined" ){pacim["967"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["967"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["967"]='';  ptoimua["967"]='';  ptoiua["967"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('560', '967');aims_sCAP('APPID'); } else {setTimeout('PREshow967()', 1000);return; }
 if (typeof aimsLob != "undefined" ){aims_setCustomerInfo('OTHER',aimsLob, '967'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(967)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/phoenix_rap_new.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[967]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(967)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/phoenix_rap_new_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='phoenix_rap_new.png'; 	PRElastAction='invShown' + '.' + 967; 	aims_I2CInitialze(967);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["967"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["967"]=true;paift["967"]=1;setTimeout( 'resetPGS('+'967'+')' , 3000 );setTimeout( 'aims_initializeChat('+'967'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.967")',3000);  
 }

 function PREshow968(){
 if(PREimgName==null || PREimgName!='phoenix_rap_new.png'){
 I2CFlag=true; if ( typeof pacim["968"] == "undefined" ){pacim["968"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["968"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["968"]='';  ptoimua["968"]='';  ptoiua["968"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('551', '968');aims_sCAP('APPID'); } else {setTimeout('PREshow968()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '968');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '968'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(968)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/phoenix_rap_new.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[968]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(968)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/phoenix_rap_new_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='phoenix_rap_new.png'; 	PRElastAction='invShown' + '.' + 968; 	aims_I2CInitialze(968);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["968"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["968"]=true;paift["968"]=1;setTimeout( 'resetPGS('+'968'+')' , 3000 );setTimeout( 'aims_initializeChat('+'968'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.968")',3000);  
 }

 function PREshow969(){
 if(PREimgName==null || PREimgName!='phoenix_rap_new.png'){
 I2CFlag=true; if ( typeof pacim["969"] == "undefined" ){pacim["969"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["969"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["969"]='';  ptoimua["969"]='';  ptoiua["969"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('551', '969');aims_sCAP('APPID'); } else {setTimeout('PREshow969()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '969');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '969'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(969)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/phoenix_rap_new.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[969]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(969)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/phoenix_rap_new_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='phoenix_rap_new.png'; 	PRElastAction='invShown' + '.' + 969; 	aims_I2CInitialze(969);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["969"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["969"]=true;paift["969"]=1;setTimeout( 'resetPGS('+'969'+')' , 3000 );setTimeout( 'aims_initializeChat('+'969'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.969")',3000);  
 }

 function PREshow970(){
 if(PREimgName==null || PREimgName!='learn_newinvite_phoenix.png'){
 I2CFlag=true; if ( typeof pacim["970"] == "undefined" ){pacim["970"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["970"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["970"]='';  ptoimua["970"]='';  ptoiua["970"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1110', '970');aims_sCAP('APPID'); } else {setTimeout('PREshow970()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '970'); aims_sCAP('OTHER'); } 
 divHtml="<div id='aimslayer' style='left: 10px; top: 90px; line-height: 1; visibility: hidden; position: absolute; z-index: 99999999; bgcolor: #000000;' name='aimslayer'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='padding: 0px;'><a name='needRef' title='Invitation' id='needRef' onclick='return PREacceptCall(970)' href='javascript:void(0);' target='_self'><img name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' src='https://collaborateext.verizon.com/pre/prescripts/images/learn_newinvite_phoenix.png' border='0'></a>"+ptoia[970]+"<div id='aimsdenyinvite' style='left: 225px; top: 170px; position: absolute;'><a style='font-family: Verdana; font-size: 14px; font-weight: bold; text-decoration: none;' onclick='return PRErejectCall(970)' href='javascript:void(0);' target='_self'>No thanks</a></div></td></tr></tbody></table></div>"; 
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='learn_newinvite_phoenix.png'; 	PRElastAction='invShown' + '.' + 970; 	aims_I2CInitialze(970);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["970"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["970"]=true;paift["970"]=1;setTimeout( 'resetPGS('+'970'+')' , 3000 );setTimeout( 'aims_initializeChat('+'970'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.970")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow971(){
 if(PREimgName==null || PREimgName!='chatbadge_learn2x.png'){
 pacia["971"]=PREImageIconURL+'chatbadge_learn2x.png'; paciu["971"]=PREImageIconURL+'chatbadge_learn2x_unavailable.png'; pauid["971"]=true; paift["971"]=1;
  if ( typeof pacim["971"] == "undefined" ){pacim["971"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["971"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["971"]='';  ptoimua["971"]='';  ptoiua["971"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1110', '971');aims_sCAP('APPID'); } else {setTimeout('PREshow971()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '971'); aims_sCAP('OTHER'); } 
 if (C2CFlag971==true){aims_initializeChat(971);C2CFlag971=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.971")',3000);  
 }

 function PREshow972(){
 if(PREimgName==null || PREimgName!='siwizardchatmenu.png'){
 if (isUserOniPad()) { 
 pacia["972"]=PREImageIconURL+'siwizardchatmenu.png'; paciu["972"]=PREImageIconURL+'siwizardchatmenu_unavailable.png'; } else if (isUserOnMobile()  ||  isUserOnFireFoxMobile() || isUserOnMobile2()) { 
 pacia["972"]=PREImageIconURL+'siwizardchatmenu_mobile.png'; paciu["972"]=PREImageIconURL+'siwizardchatmenu_mobile_unavailable.png'; } else { 
 pacia["972"]=PREImageIconURL+'siwizardchatmenu.png'; paciu["972"]=PREImageIconURL+'siwizardchatmenu_unavailable.png'; } 
 pauid["972"]=true; paift["972"]=1;
  if ( typeof pacim["972"] == "undefined" ){pacim["972"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["972"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["972"]='';  ptoimua["972"]='';  ptoiua["972"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('642', '972');aims_sCAP('APPID'); } else {setTimeout('PREshow972()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '972');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '972'); aims_sCAP('OTHER'); } 
 if (C2CFlag972==true){aims_initializeChat(972);C2CFlag972=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.972")',3000);  
 }

 function PREshow973(){
 if(PREimgName==null || PREimgName!='siwizardchatnew.png'){
 if (isUserOniPad()) { 
 pacia["973"]=PREImageIconURL+'siwizardchatnew.png'; paciu["973"]=PREImageIconURL+'siwizardchatnew_unavailable.png'; } else if (isUserOnMobile()  ||  isUserOnFireFoxMobile() || isUserOnMobile2()) { 
 pacia["973"]=PREImageIconURL+'siwizardchatnew_mobile.png'; paciu["973"]=PREImageIconURL+'siwizardchatnew_mobile_unavailable.png'; } else { 
 pacia["973"]=PREImageIconURL+'siwizardchatnew.png'; paciu["973"]=PREImageIconURL+'siwizardchatnew_unavailable.png'; } 
 pauid["973"]=true; paift["973"]=1;
  if ( typeof pacim["973"] == "undefined" ){pacim["973"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["973"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["973"]='';  ptoimua["973"]='';  ptoiua["973"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('642', '973');aims_sCAP('APPID'); } else {setTimeout('PREshow973()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '973');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '973'); aims_sCAP('OTHER'); } 
 if (C2CFlag973==true){aims_initializeChat(973);C2CFlag973=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.973")',3000);  
 }

 function PREshow974(){
 if(PREimgName==null || PREimgName!='siwizardchatnew.png'){
 if (isUserOniPad()) { 
 pacia["974"]=PREImageIconURL+'siwizardchatnew.png'; paciu["974"]=PREImageIconURL+'siwizardchatnew_unavailable.png'; } else if (isUserOnMobile()  ||  isUserOnFireFoxMobile() || isUserOnMobile2()) { 
 pacia["974"]=PREImageIconURL+'siwizardchatnew_mobile.png'; paciu["974"]=PREImageIconURL+'siwizardchatnew_mobile_unavailable.png'; } else { 
 pacia["974"]=PREImageIconURL+'siwizardchatnew.png'; paciu["974"]=PREImageIconURL+'siwizardchatnew_unavailable.png'; } 
 pauid["974"]=true; paift["974"]=1;
  if ( typeof pacim["974"] == "undefined" ){pacim["974"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["974"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["974"]='';  ptoimua["974"]='';  ptoiua["974"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('551', '974');aims_sCAP('APPID'); } else {setTimeout('PREshow974()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '974');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '974'); aims_sCAP('OTHER'); } 
 if (C2CFlag974==true){aims_initializeChat(974);C2CFlag974=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.974")',3000);  
 }

 function PREshow975(){
 if(PREimgName==null || PREimgName!='siwizardchatnew.png'){
 if (isUserOniPad()) { 
 pacia["975"]=PREImageIconURL+'siwizardchatnew.png'; paciu["975"]=PREImageIconURL+'siwizardchatnew_unavailable.png'; } else if (isUserOnMobile()  ||  isUserOnFireFoxMobile() || isUserOnMobile2()) { 
 pacia["975"]=PREImageIconURL+'siwizardchatnew_mobile.png'; paciu["975"]=PREImageIconURL+'siwizardchatnew_mobile_unavailable.png'; } else { 
 pacia["975"]=PREImageIconURL+'siwizardchatnew.png'; paciu["975"]=PREImageIconURL+'siwizardchatnew_unavailable.png'; } 
 pauid["975"]=true; paift["975"]=1;
  if ( typeof pacim["975"] == "undefined" ){pacim["975"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["975"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["975"]='';  ptoimua["975"]='';  ptoiua["975"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('551', '975');aims_sCAP('APPID'); } else {setTimeout('PREshow975()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '975');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '975'); aims_sCAP('OTHER'); } 
 if (C2CFlag975==true){aims_initializeChat(975);C2CFlag975=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.975")',3000);  
 }

 function PREshow976(){
 if(PREimgName==null || PREimgName!='VEC2_chatOnlineTicket.png'){
 pacia["976"]=PREImageIconURL+'VEC2_chatOnlineTicket.png'; paciu["976"]=PREImageIconURL+'VEC2_chatOnlineTicket_unavailable.png'; pauid["976"]=true; paift["976"]=1;
  if ( typeof pacim["976"] == "undefined" ){pacim["976"]="aimsChatIcon"; }
 pacu["976"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["976"]='';  ptoimua["976"]='';  ptoiua["976"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('366', '976');aims_sCAP('APPID'); } else {setTimeout('PREshow976()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '976');aims_sCAP('STATE');} 
 if (typeof aimsQueue != "undefined" ){aims_setCustomerInfo('OTHER',aimsQueue, '976'); aims_sCAP('OTHER'); } 
 if (C2CFlag976==true){aims_initializeChat(976);C2CFlag976=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.976")',3000);  
 }

 function PREshow977(){
 if(PREimgName==null || PREimgName!='VEC2_chatOnlineTicket.png'){
 pacia["977"]=PREImageIconURL+'VEC2_chatOnlineTicket.png'; paciu["977"]=PREImageIconURL+'VEC2_chatOnlineTicket_unavailable.png'; pauid["977"]=true; paift["977"]=1;
  if ( typeof pacim["977"] == "undefined" ){pacim["977"]="aimsChatIcon"; }
 pacu["977"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["977"]='';  ptoimua["977"]='';  ptoiua["977"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('367', '977');aims_sCAP('APPID'); } else {setTimeout('PREshow977()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '977');aims_sCAP('STATE');} 
 if (typeof aimsQueue != "undefined" ){aims_setCustomerInfo('OTHER',aimsQueue, '977'); aims_sCAP('OTHER'); } 
 if (C2CFlag977==true){aims_initializeChat(977);C2CFlag977=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.977")',3000);  
 }

 function PREshow978(){
 if(PREimgName==null || PREimgName!='VEC2_chatOnlineTicket.png'){
 pacia["978"]=PREImageIconURL+'VEC2_chatOnlineTicket.png'; paciu["978"]=PREImageIconURL+'VEC2_chatOnlineTicket_unavailable.png'; pauid["978"]=true; paift["978"]=1;
  if ( typeof pacim["978"] == "undefined" ){pacim["978"]="aimsChatIcon"; }
 pacu["978"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["978"]='';  ptoimua["978"]='';  ptoiua["978"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('365', '978');aims_sCAP('APPID'); } else {setTimeout('PREshow978()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '978');aims_sCAP('STATE');} 
 if (typeof aimsQueue != "undefined" ){aims_setCustomerInfo('OTHER',aimsQueue, '978'); aims_sCAP('OTHER'); } 
 if (C2CFlag978==true){aims_initializeChat(978);C2CFlag978=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.978")',3000);  
 }

 function PREshow979(){
 if(PREimgName==null || PREimgName!='VEC2_chatOnlineTicket.png'){
 pacia["979"]=PREImageIconURL+'VEC2_chatOnlineTicket.png'; paciu["979"]=PREImageIconURL+'VEC2_chatOnlineTicket_unavailable.png'; pauid["979"]=true; paift["979"]=1;
  if ( typeof pacim["979"] == "undefined" ){pacim["979"]="aimsChatIcon"; }
 pacu["979"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["979"]='';  ptoimua["979"]='';  ptoiua["979"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('368', '979');aims_sCAP('APPID'); } else {setTimeout('PREshow979()', 1000);return; }
 if (typeof aims != "undefined" ){aims_setCustomerInfo('STATE',aims, '979');aims_sCAP('STATE');} 
 if (typeof aimsQueue != "undefined" ){aims_setCustomerInfo('OTHER',aimsQueue, '979'); aims_sCAP('OTHER'); } 
 if (C2CFlag979==true){aims_initializeChat(979);C2CFlag979=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.979")',3000);  
 }

 function PREshow980(){
 if(PREimgName==null || PREimgName!='SMBDotComNewRedC2C.gif'){
     PREMasterTreatment=true; 
pacim["865"]="aimsChatIcon2";pacim["981"]="aimsChatIcon1";setTimeout('sendPREUpdates("' + 'icoShown.980' + '")',50);setTimeout('PREshow981()', 1000 );setTimeout('PREshow865()', 3000 ); } 
 }

 function PREshow981(){
 if(PREimgName==null || PREimgName!='chat_72x18.png'){
 pacia["981"]=PREImageIconURL+'chat_72x18.png'; paciu["981"]=PREImageIconURL+'chat_72x18_unavailable.png'; pauid["981"]=true; paift["981"]=1;
  if ( typeof pacim["981"] == "undefined" ){pacim["981"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["981"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["981"]='';  ptoimua["981"]='';  ptoiua["981"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1147', '981');aims_sCAP('APPID'); } else {setTimeout('PREshow981()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '981');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '981'); aims_sCAP('OTHER'); } 
 if (C2CFlag981==true){aims_initializeChat(981);C2CFlag981=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.981")',3000);  
 }

 function PREshow982(){
 if(PREimgName==null || PREimgName!='siwizardchat.png'){
     PREMasterTreatment=true; 
pacim["973"]="aimsChatIcon2";pacim["972"]="aimsChatIcon1";pacim["975"]="aimsChatIcon4";pacim["974"]="aimsChatIcon3";setTimeout('sendPREUpdates("' + 'icoShown.982' + '")',50);setTimeout('PREshow972()', 1000 );setTimeout('PREshow973()', 3000 );setTimeout('PREshow974()', 5000 );setTimeout('PREshow975()', 7000 ); } 
 }

 function PREshow983(){
 if(PREimgName==null || PREimgName!='phoenix_new_invite2.jpg'){
 I2CFlag=true; if ( typeof pacim["983"] == "undefined" ){pacim["983"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["983"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["983"]='';  ptoimua["983"]='';  ptoiua["983"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('574', '983');aims_sCAP('APPID'); } else {setTimeout('PREshow983()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '983'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:"+getScrollY()+"px'><table border='0' cellSpacing='0' cellPadding='0'><tr><td  style='padding: 0px;'><a id='needRef' title='Invitation' href='javascript:void(0);' name='needRef' onClick='return PREacceptCall(983)' target='_self'><img id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' border='0' name='PREAIMSLiveChatImg' alt='Live Chat'  src='https://collaborateext.verizon.com/pre/prescripts/images/phoenix_new_invite2.jpg'></a><div id='aimsdenyinvite'  style='position:absolute;top:155px;left:25px;'><a href='javascript:void(0);' onClick='return PRErejectCall(983)'  target='_self'><img onload='PREsetImageLoaded()' border='0' name='need_close' alt='Close Invitation' src='https://collaborateext.verizon.com/pre/prescripts/images/phoenix_new_invite2_close.jpg'></a></div></td></tr></table></div>" ;
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='phoenix_new_invite2.jpg'; 	PRElastAction='invShown' + '.' + 983; 	aims_I2CInitialze(983);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["983"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["983"]=true;paift["983"]=1;setTimeout( 'resetPGS('+'983'+')' , 3000 );setTimeout( 'aims_initializeChat('+'983'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.983")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow984(){
 if(PREimgName==null || PREimgName!='hybrid_new_i2c_accept.png'){
 I2CFlag=true; if ( typeof pacim["984"] == "undefined" ){pacim["984"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["984"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["984"]='<div id=preTextHolder style=position:absolute;left:25px;top:225px;z-index:9999999999;width:75%;height:60px;><div id=preText style=position:absolute;><a href="#" style="line-height: 18px;font-size:12px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&lob=CPPT&initQ=Is Fios service available at my address?",1,984);\'>Is Fios service available at my address?</a><br /><a href="#" style="line-height: 18px;font-size:12px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&lob=CPPT&initQ=What if I cant order Fios for my address?",2,984);\'>What if I can\'t order Fios for my address?</a><br /><a href="#" style="line-height: 18px;font-size:12px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew(" https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&lob=CPPT&initQ=What Fios Internet plans do you have?",3,984);\'>What Fios Internet plans do you have?</a><br /></div><br /><div id="preText" style="position:absolute;top:58px;"><table id="aimsvatable" style="padding: 2px; vertical-align: middle;" bgColor="#ffffff" cellSpacing="0" cellPadding="0"><tr><td><input name="initQ" id="va_initQ" style="border-bottom: 1px solid rgb(164, 164, 164);border-top: 0px; border-left: 0px; border-right: 0px; width: 280px; height: 34px; color: rgb(51, 51, 51); line-height: 2; font-family: helvetica, arial, sans serif; font-size: 14px;" onfocus="this.value=\'\'" type="text" size="35" value="Ask me a question"></td><td style="padding: 2px; vertical-align: middle;"><a onclick=\'if (document.getElementById("va_initQ").value == "") { return false; } else { invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&amp;lob=CPPT&amp;proactive=y&amp;initQ=" + document.getElementById("va_initQ").value ,4,984); }\' href=""><input type="image" src="https://collaborateext.verizon.com/aims/includes/images/encore/search_vaIcon.png"></a></td></tr></table></div></div><DIV style="POSITION: absolute; TOP: 144px; LEFT: 312px"></DIV>';  ptoimua["984"]='';  ptoiua["984"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('574', '984');aims_sCAP('APPID'); } else {setTimeout('PREshow984()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '984'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(984)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/hybrid_new_i2c_accept_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(984)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/hybrid_new_i2c_accept.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[984]+"</td></tr></table></div>" ;
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='hybrid_new_i2c_accept.png'; 	PRElastAction='invShown' + '.' + 984; 	aims_I2CInitialze(984);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["984"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["984"]=true;paift["984"]=1;setTimeout( 'resetPGS('+'984'+')' , 3000 );setTimeout( 'aims_initializeChat('+'984'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.984")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow985(){
 if(PREimgName==null || PREimgName!='hybrid_new_i2c_accept.png'){
 I2CFlag=true; if ( typeof pacim["985"] == "undefined" ){pacim["985"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["985"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["985"]='<div id=preTextHolder style=position:absolute;left:25px;top:225px;z-index:9999999999;width:75%;height:60px;><div id=preText style=position:absolute;><a href="#" style="line-height: 18px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&lob=CIPS&proactive=y&initQ=Set up a Verizon email account with Outlook",1,985);\'>- Set up a Verizon email account with Outlook</a><br /><a href="#" style="line-height: 18px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&lob=CIPS&proactive=y&initQ=Set up a router to use Fios Internet",2,985);\'>- Set up a router to use Fios Internet</a><br /><a href="#" style="line-height: 18px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&lob=CIPS&proactive=y&initQ=Connect a new device to the Internet via Wi-Fi",3,985);\'>- Connect a new device to the Internet via Wi-Fi</a><br /></div><br /><div style="vertical-align:top; position:absolute;top:58px;"><table id="aimsvatable" style="padding: 2px; vertical-align: middle;" bgColor="#ffffff" cellSpacing="0" cellPadding="0"><tr><td><input name="initQ" id="va_initQ" style="border-bottom: 1px solid rgb(164, 164, 164);border-top: 0px; border-left: 0px; border-right: 0px; width: 280px; height: 34px; color: rgb(51, 51, 51); line-height: 2; font-family: helvetica, arial, sans serif; font-size: 14px;" onfocus="this.value=\'\'" type="text" size="35" value="Ask me a question"></td><td style="padding: 2px; vertical-align: middle;"><a onclick=\'if (document.getElementById("va_initQ").value == "") { return false; } else { invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&amp;lob=CIPS&amp;proactive=y&amp;initQ=" + document.getElementById("va_initQ").value ,4,985); }\' href=""><input type="image" src="https://collaborateext.verizon.com/aims/includes/images/encore/search_vaIcon.png"></a></td></tr></table></div></div><DIV style="POSITION: absolute; TOP: 144px; LEFT: 312px"></DIV>';  ptoimua["985"]='';  ptoiua["985"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('574', '985');aims_sCAP('APPID'); } else {setTimeout('PREshow985()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '985'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(985)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/hybrid_new_i2c_accept_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(985)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/hybrid_new_i2c_accept.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[985]+"</td></tr></table></div>" ;
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='hybrid_new_i2c_accept.png'; 	PRElastAction='invShown' + '.' + 985; 	aims_I2CInitialze(985);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["985"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["985"]=true;paift["985"]=1;setTimeout( 'resetPGS('+'985'+')' , 3000 );setTimeout( 'aims_initializeChat('+'985'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.985")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow986(){
 if(PREimgName==null || PREimgName!='hybrid_new_i2c_accept.png'){
 I2CFlag=true; if ( typeof pacim["986"] == "undefined" ){pacim["986"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["986"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["986"]='<div id=preTextHolder style=position:absolute;left:25px;top:225px;z-index:9999999999;width:75%;height:60px;><div id=preText style=position:absolute;><a href="#" style="line-height: 18px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=74&lob=CTPT&proactive=y&initQ=Set up a remote control",1,986);\'>- Set up a remote control</a><br /><a href="#" style="line-height: 18px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=74&lob=CTPT&proactive=y&initQ=How do I install the set top box myself?",2,986);\'>- Set up a Set-Top Box or DVR</a><br /><a href="#" style="line-height: 18px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=74&lob=CTPT&proactive=y&initQ=See Verizon equipment and channel prices",3,986);\'>- See Verizon equipment and channel prices</a><br /></div><br /><div style="vertical-align:top; position:absolute;top:58px;"><table id="aimsvatable" style="padding: 2px; vertical-align: middle;" bgColor="#ffffff" cellSpacing="0" cellPadding="0"><tr><td><input name="initQ" id="va_initQ" style="border-bottom: 1px solid rgb(164, 164, 164);border-top: 0px; border-left: 0px; border-right: 0px; width: 280px; height: 34px; color: rgb(51, 51, 51); line-height: 2; font-family: helvetica, arial, sans serif; font-size: 14px;" onfocus="this.value=\'\'" type="text" size="35" value="Ask me a question"></td><td style="padding: 2px; vertical-align: middle;"><a onclick=\'if (document.getElementById("va_initQ").value == "") { return false; } else { invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&amp;lob=CTPT&amp;proactive=y&amp;initQ=" + document.getElementById("va_initQ").value ,4,986); }\' href=""><input type="image" src="https://collaborateext.verizon.com/aims/includes/images/encore/search_vaIcon.png"></a></td></tr></table></div></div><DIV style="POSITION: absolute; TOP: 144px; LEFT: 312px"></DIV>';  ptoimua["986"]='';  ptoiua["986"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('574', '986');aims_sCAP('APPID'); } else {setTimeout('PREshow986()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '986'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(986)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/hybrid_new_i2c_accept_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(986)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/hybrid_new_i2c_accept.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[986]+"</td></tr></table></div>" ;
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='hybrid_new_i2c_accept.png'; 	PRElastAction='invShown' + '.' + 986; 	aims_I2CInitialze(986);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["986"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["986"]=true;paift["986"]=1;setTimeout( 'resetPGS('+'986'+')' , 3000 );setTimeout( 'aims_initializeChat('+'986'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.986")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow987(){
 if(PREimgName==null || PREimgName!='learn_newinvite_phoenix.png'){
 I2CFlag=true; if ( typeof pacim["987"] == "undefined" ){pacim["987"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["987"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["987"]='';  ptoimua["987"]='';  ptoiua["987"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('590', '987');aims_sCAP('APPID'); } else {setTimeout('PREshow987()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '987'); aims_sCAP('OTHER'); } 
 divHtml="<div id='aimslayer' style='left: 10px; top: 90px; line-height: 1; visibility: hidden; position: absolute; z-index: 99999999; bgcolor: #000000;' name='aimslayer'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='padding: 0px;'><a name='needRef' title='Invitation' id='needRef' onclick='return PREacceptCall(987)' href='javascript:void(0);' target='_self'><img name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' src='https://collaborateext.verizon.com/pre/prescripts/images/learn_newinvite_phoenix.png' border='0'></a>"+ptoia[987]+"<div id='aimsdenyinvite' style='left: 225px; top: 170px; position: absolute;'><a style='font-family: Verdana; font-size: 14px; font-weight: bold; text-decoration: none;' onclick='return PRErejectCall(987)' href='javascript:void(0);' target='_self'>No thanks</a></div></td></tr></tbody></table></div>"; 
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='learn_newinvite_phoenix.png'; 	PRElastAction='invShown' + '.' + 987; 	aims_I2CInitialze(987);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["987"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["987"]=true;paift["987"]=1;setTimeout( 'resetPGS('+'987'+')' , 3000 );setTimeout( 'aims_initializeChat('+'987'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.987")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow988(){
 if(PREimgName==null || PREimgName!='search_parking.png'){
 pacia["988"]=PREImageIconURL+'search_parking.png'; paciu["988"]=PREImageIconURL+'search_parking_unavailable.png'; if ( typeof pacim["988"] == "undefined" ){pacim["988"]="aimsparkinglayer"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["988"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["988"]='';  ptoimua["988"]='';  ptoiua["988"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('590', '988');aims_sCAP('APPID'); } else {setTimeout('PREshow988()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '988'); aims_sCAP('OTHER'); } 
 if (C2CFlag988==true){C2CFlag988=false;}
  preParkingSide = "left";   
   preflyoutcoords = "240px";    
   preflyincoords = "8px";   
  divHtml="<div name='aimsparkinglayer' id='aimsparkinglayer' style='position: fixed; z-index: 99999999; top:400px; left:8px;  visibility:hidden; '><a href='javascript:void(0);' >  <img  id='parkingchaticon' style=' position: absolute;  cursor: pointer; max-width:none; margin-left:-240px;' name='PREAIMSParkingLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/search_parking.png' border='0' onClick='return PREparkingacceptCall(988)'  onmouseover='PREparkingflyOut()' onmouseout='PREparkingflyIn()' /></a>  </div> " ;      
 if ( !PREParkingshowImage){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimsprkglayerHolderDiv = document.createElement('div');
            aimsprkglayerHolderDiv.setAttribute('id', 'aimsparkinglayerHolder');
            document.body.appendChild(aimsprkglayerHolderDiv);
            document.getElementById("aimsparkinglayerHolder").innerHTML = divHtml;
          }
     }catch(ex){}
 }
  PREimgName='search_parking.png'; 	PRElastAction='invShown' + '.' + 988; 	aims_parkingInitialze(988);
 } 
 setTimeout('sendPREUpdates("icoShown.988")',3000);  
 }

 function PREshow989(){
 if(PREimgName==null || PREimgName!='learn_newinvite_phoenix.png'){
 I2CFlag=true; if ( typeof pacim["989"] == "undefined" ){pacim["989"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["989"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["989"]='';  ptoimua["989"]='';  ptoiua["989"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1110', '989');aims_sCAP('APPID'); } else {setTimeout('PREshow989()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '989'); aims_sCAP('OTHER'); } 
 divHtml="<div id='aimslayer' style='left: 10px; top: 90px; line-height: 1; visibility: hidden; position: absolute; z-index: 99999999; bgcolor: #000000;' name='aimslayer'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='padding: 0px;'><a name='needRef' title='Invitation' id='needRef' onclick='return PREacceptCall(989)' href='javascript:void(0);' target='_self'><img name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' src='https://collaborateext.verizon.com/pre/prescripts/images/learn_newinvite_phoenix.png' border='0'></a>"+ptoia[989]+"<div id='aimsdenyinvite' style='left: 225px; top: 170px; position: absolute;'><a style='font-family: Verdana; font-size: 14px; font-weight: bold; text-decoration: none;' onclick='return PRErejectCall(989)' href='javascript:void(0);' target='_self'>No thanks</a></div></td></tr></tbody></table></div>"; 
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='learn_newinvite_phoenix.png'; 	PRElastAction='invShown' + '.' + 989; 	aims_I2CInitialze(989);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["989"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["989"]=true;paift["989"]=1;setTimeout( 'resetPGS('+'989'+')' , 3000 );setTimeout( 'aims_initializeChat('+'989'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.989")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow990(){
 if(PREimgName==null || PREimgName!='hybrid_new_i2c_accept.png'){
 I2CFlag=true; if ( typeof pacim["990"] == "undefined" ){pacim["990"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["990"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["990"]='<div id=preTextHolder style=position:absolute;left:25px;top:225px;z-index:9999999999;width:75%;height:60px;><div id=preText style=position:absolute;><a href="#" style="line-height: 18px;font-size:12px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=74&lob=CTPN&initQ=Is service available at my address?",1,990);\'>Is service available at my address?</a><br /><a href="#" style="line-height: 18px;font-size:12px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=74&lob=CTPN&initQ=What if I cant order Verizon service for my address?",2,990);\'>What if I can\'t order Verizon service for my address?</a><br /><a href="#" style="line-height: 18px;font-size:12px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew(" https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=74&lob=CTPN&initQ=Can you tell me more about plans and channel costs?",3,990);\'>Can you tell me more about plans and channel costs?</a><br /></div><br /><div id="preText" style="position:absolute;top:58px;"><table id="aimsvatable" style="padding: 2px; vertical-align: middle;" bgColor="#ffffff" cellSpacing="0" cellPadding="0"><tr><td><input name="initQ" id="va_initQ" style="border-bottom: 1px solid rgb(164, 164, 164);border-top: 0px; border-left: 0px; border-right: 0px; width: 280px; height: 34px; color: rgb(51, 51, 51); line-height: 2; font-family: helvetica, arial, sans serif; font-size: 14px;" onfocus="this.value=\'\'" type="text" size="35" value="Ask me a question"></td><td style="padding: 2px; vertical-align: middle;"><a onclick=\'if (document.getElementById("va_initQ").value == "") { return false; } else { invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=74&amp;lob=CTPN&amp;proactive=y&amp;initQ=" + document.getElementById("va_initQ").value ,4,990); }\' href=""><input type="image" src="https://collaborateext.verizon.com/aims/includes/images/encore/search_vaIcon.png"></a></td></tr></table></div></div><DIV style="POSITION: absolute; TOP: 144px; LEFT: 312px"></DIV>';  ptoimua["990"]='';  ptoiua["990"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1110', '990');aims_sCAP('APPID'); } else {setTimeout('PREshow990()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '990'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(990)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/hybrid_new_i2c_accept_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(990)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/hybrid_new_i2c_accept.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[990]+"</td></tr></table></div>" ;
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='hybrid_new_i2c_accept.png'; 	PRElastAction='invShown' + '.' + 990; 	aims_I2CInitialze(990);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["990"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["990"]=true;paift["990"]=1;setTimeout( 'resetPGS('+'990'+')' , 3000 );setTimeout( 'aims_initializeChat('+'990'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.990")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',180000);   
 }

 function PREshow991(){
 if(PREimgName==null || PREimgName!='rapchat.png'){
 if (isUserOniPad()) { 
 pacia["991"]=PREImageIconURL+'rapchat.png'; paciu["991"]=PREImageIconURL+'rapchat_unavailable.png'; } else if (isUserOnMobile()  ||  isUserOnFireFoxMobile() || isUserOnMobile2()) { 
 pacia["991"]=PREImageIconURL+'rapchat_mobile.png'; paciu["991"]=PREImageIconURL+'rapchat_mobile_unavailable.png'; } else { 
 pacia["991"]=PREImageIconURL+'rapchat.png'; paciu["991"]=PREImageIconURL+'rapchat_unavailable.png'; } 
 pauid["991"]=true; paift["991"]=1;
  if ( typeof pacim["991"] == "undefined" ){pacim["991"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["991"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["991"]='';  ptoimua["991"]='';  ptoiua["991"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('551', '991');aims_sCAP('APPID'); } else {setTimeout('PREshow991()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '991'); aims_sCAP('OTHER'); } 
 if (C2CFlag991==true){aims_initializeChat(991);C2CFlag991=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.991")',3000);  
 }

 function PREshow992(){
 if(PREimgName==null || PREimgName!='crmholiday_park.png'){
 pacia["992"]=PREImageIconURL+'crmholiday_park.png'; paciu["992"]=PREImageIconURL+'crmholiday_park_unavailable.png'; if ( typeof pacim["992"] == "undefined" ){pacim["992"]="aimsparkinglayer"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["992"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["992"]='';  ptoimua["992"]='';  ptoiua["992"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('561', '992');aims_sCAP('APPID'); } else {setTimeout('PREshow992()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '992'); aims_sCAP('OTHER'); } 
 if (C2CFlag992==true){C2CFlag992=false;}
  preParkingSide = "left";   
   preflyoutcoords = "240px";    
   preflyincoords = "8px";   
  divHtml="<div name='aimsparkinglayer' id='aimsparkinglayer' style='position: fixed; z-index: 99999999; top:400px; left:8px;  visibility:hidden; '><a href='javascript:void(0);' >  <img  id='parkingchaticon' style=' position: absolute;  cursor: pointer; max-width:none; margin-left:-240px;' name='PREAIMSParkingLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/crmholiday_park.png' border='0' onClick='return PREparkingacceptCall(992)'  onmouseover='PREparkingflyOut()' onmouseout='PREparkingflyIn()' /></a>  </div> " ;      
 if ( !PREParkingshowImage){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimsprkglayerHolderDiv = document.createElement('div');
            aimsprkglayerHolderDiv.setAttribute('id', 'aimsparkinglayerHolder');
            document.body.appendChild(aimsprkglayerHolderDiv);
            document.getElementById("aimsparkinglayerHolder").innerHTML = divHtml;
          }
     }catch(ex){}
 }
  PREimgName='crmholiday_park.png'; 	PRElastAction='invShown' + '.' + 992; 	aims_parkingInitialze(992);
 } 
 setTimeout('sendPREUpdates("icoShown.992")',3000);  
 }

 function PREshow993(){
 if(PREimgName==null || PREimgName!='learn_proactive.png'){
 I2CFlag=true; if ( typeof pacim["993"] == "undefined" ){pacim["993"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["993"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["993"]='';  ptoimua["993"]='';  ptoiua["993"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('561', '993');aims_sCAP('APPID'); } else {setTimeout('PREshow993()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '993'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:"+getScrollY()+"px'><table border='0' cellSpacing='0' cellPadding='0'><tr><td  style='padding: 0px;'><a id='needRef' title='Invitation' href='javascript:void(0);' name='needRef' onClick='return PREacceptCall(993)' target='_self'><img id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' border='0' name='PREAIMSLiveChatImg' alt='Live Chat'  src='https://collaborateext.verizon.com/pre/prescripts/images/learn_proactive.png'></a><div id='aimsdenyinvite'  style='position:absolute;top:155px;left:25px;'><a href='javascript:void(0);' onClick='return PRErejectCall(993)'  target='_self'><img onload='PREsetImageLoaded()' border='0' name='need_close' alt='Close Invitation' src='https://collaborateext.verizon.com/pre/prescripts/images/learn_proactive_close.png'></a></div></td></tr></table></div>" ;
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='learn_proactive.png'; 	PRElastAction='invShown' + '.' + 993; 	aims_I2CInitialze(993);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["993"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["993"]=true;paift["993"]=1;setTimeout( 'resetPGS('+'993'+')' , 3000 );setTimeout( 'aims_initializeChat('+'993'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.993")',3000);  
 }

 function PREshow994(){
 if(PREimgName==null || PREimgName!='chatbadge_learn2x.png'){
 if (isUserOniPad()) { 
 pacia["994"]=PREImageIconURL+'chatbadge_learn2x.png'; paciu["994"]=PREImageIconURL+'chatbadge_learn2x_unavailable.png'; } else if (isUserOnMobile()  ||  isUserOnFireFoxMobile() || isUserOnMobile2()) { 
 pacia["994"]=PREImageIconURL+'chatbadge_learn2x_mobile.png'; paciu["994"]=PREImageIconURL+'chatbadge_learn2x_mobile_unavailable.png'; } else { 
 pacia["994"]=PREImageIconURL+'chatbadge_learn2x.png'; paciu["994"]=PREImageIconURL+'chatbadge_learn2x_unavailable.png'; } 
 pauid["994"]=true; paift["994"]=1;
  if ( typeof pacim["994"] == "undefined" ){pacim["994"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["994"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["994"]='';  ptoimua["994"]='';  ptoiua["994"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1110', '994');aims_sCAP('APPID'); } else {setTimeout('PREshow994()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '994'); aims_sCAP('OTHER'); } 
 if (C2CFlag994==true){aims_initializeChat(994);C2CFlag994=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.994")',3000);  
 }

 function PREshow995(){
 if(PREimgName==null || PREimgName!='vec_liveChat2.png'){
 pacia["995"]=PREImageIconURL+'vec_liveChat2.png'; paciu["995"]=PREImageIconURL+'vec_liveChat2_unavailable.png'; pauid["995"]=true; paift["995"]=1;
  if ( typeof pacim["995"] == "undefined" ){pacim["995"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["995"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["995"]='';  ptoimua["995"]='';  ptoiua["995"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('304', '995');aims_sCAP('APPID'); } else {setTimeout('PREshow995()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '995');aims_sCAP('STATE');} 
 if (typeof aimsChatCreditFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsChatCreditFlow, '995'); aims_sCAP('OTHER'); } 
 if (C2CFlag995==true){aims_initializeChat(995);C2CFlag995=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.995")',3000);  
 }

 function PREshow996(){
 if(PREimgName==null || PREimgName!='VEC2ChatNew.png'){
 pacia["996"]=PREImageIconURL+'VEC2ChatNew.png'; paciu["996"]=PREImageIconURL+'VEC2ChatNew_unavailable.png'; pauid["996"]=true; paift["996"]=1;
  if ( typeof pacim["996"] == "undefined" ){pacim["996"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["996"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["996"]='';  ptoimua["996"]='';  ptoiua["996"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('305', '996');aims_sCAP('APPID'); } else {setTimeout('PREshow996()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '996');aims_sCAP('STATE');} 
 if (typeof aimsChatCreditFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsChatCreditFlow, '996'); aims_sCAP('OTHER'); } 
 if (C2CFlag996==true){aims_initializeChat(996);C2CFlag996=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.996")',3000);  
 }

 function PREshow997(){
 if(PREimgName==null || PREimgName!='proactiveChatIconVEC3.png'){
 I2CFlag=true; if ( typeof pacim["997"] == "undefined" ){pacim["997"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["997"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["997"]='<div id=preTextHolder style=position:absolute;left:45px;top:232px;z-index:9999999999;><div id=preText style=position:relative;vertical-align:top; width="60%"><A style="LINE-HEIGHT: 22px; FONT-FAMILY: JunkFont1, Arial, sans-serif; COLOR: #0066cc; FONT-SIZE: 12px; FONT-WEIGHT: bold; TEXT-DECORATION: none" href="https://enterprisecenter.verizon.com/enterprisesolutions/global/dlink/global/body/viewPersonalProfile.do?tabName=sitePreferences&mode=edit" title="Disable Proactive Chat window by editing chat preference option under Site Preference settings">Disable Proactive Chat</A></div></DIV>';  ptoimua["997"]='';  ptoiua["997"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('304', '997');aims_sCAP('APPID'); } else {setTimeout('PREshow997()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '997');aims_sCAP('STATE');} 
 if (typeof aimsChatCreditFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsChatCreditFlow, '997'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(997)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/proactiveChatIconVEC3.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[997]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(997)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/proactiveChatIconVEC3_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='proactiveChatIconVEC3.png'; 	PRElastAction='invShown' + '.' + 997; 	aims_I2CInitialze(997);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["997"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["997"]=true;paift["997"]=1;setTimeout( 'resetPGS('+'997'+')' , 3000 );setTimeout( 'aims_initializeChat('+'997'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.997")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow998(){
 if(PREimgName==null || PREimgName!='proactiveChatIconVEC3.png'){
 I2CFlag=true; if ( typeof pacim["998"] == "undefined" ){pacim["998"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["998"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["998"]='<div id=preTextHolder style=position:absolute;left:45px;top:232px;z-index:9999999999;><div id=preText style=position:relative;vertical-align:top; width="60%"><A style="LINE-HEIGHT: 22px; FONT-FAMILY: JunkFont1, Arial, sans-serif; COLOR: #0066cc; FONT-SIZE: 12px; FONT-WEIGHT: bold; TEXT-DECORATION: none" href="https://enterprisecenter.verizon.com/enterprisesolutions/global/dlink/global/body/viewPersonalProfile.do?tabName=sitePreferences&mode=edit" title="Disable Proactive Chat window by editing chat preference option under Site Preference settings">Disable Proactive Chat</A></div></DIV>';  ptoimua["998"]='';  ptoiua["998"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('305', '998');aims_sCAP('APPID'); } else {setTimeout('PREshow998()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '998');aims_sCAP('STATE');} 
 if (typeof aimsChatCreditFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsChatCreditFlow, '998'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(998)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/proactiveChatIconVEC3.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[998]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(998)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/proactiveChatIconVEC3_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='proactiveChatIconVEC3.png'; 	PRElastAction='invShown' + '.' + 998; 	aims_I2CInitialze(998);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["998"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["998"]=true;paift["998"]=1;setTimeout( 'resetPGS('+'998'+')' , 3000 );setTimeout( 'aims_initializeChat('+'998'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.998")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow999(){
 if(PREimgName==null || PREimgName!='chatbadge_learn2x.png'){
 pacia["999"]=PREImageIconURL+'chatbadge_learn2x.png'; paciu["999"]=PREImageIconURL+'chatbadge_learn2x_unavailable.png'; pauid["999"]=true; paift["999"]=1;
  if ( typeof pacim["999"] == "undefined" ){pacim["999"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["999"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["999"]='';  ptoimua["999"]='';  ptoiua["999"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('596', '999');aims_sCAP('APPID'); } else {setTimeout('PREshow999()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '999');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '999'); aims_sCAP('OTHER'); } 
 if (C2CFlag999==true){aims_initializeChat(999);C2CFlag999=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.999")',3000);  
 }

 function PREshow1000(){
 if(PREimgName==null || PREimgName!='learn_newinvite_phoenix.png'){
 I2CFlag=true; if ( typeof pacim["1000"] == "undefined" ){pacim["1000"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1000"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1000"]='';  ptoimua["1000"]='';  ptoiua["1000"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('596', '1000');aims_sCAP('APPID'); } else {setTimeout('PREshow1000()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1000');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1000'); aims_sCAP('OTHER'); } 
 divHtml="<div id='aimslayer' style='left: 10px; top: 90px; line-height: 1; visibility: hidden; position: absolute; z-index: 99999999; bgcolor: #000000;' name='aimslayer'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='padding: 0px;'><a name='needRef' title='Invitation' id='needRef' onclick='return PREacceptCall(1000)' href='javascript:void(0);' target='_self'><img name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' src='https://collaborateext.verizon.com/pre/prescripts/images/learn_newinvite_phoenix.png' border='0'></a>"+ptoia[1000]+"<div id='aimsdenyinvite' style='left: 225px; top: 170px; position: absolute;'><a style='font-family: Verdana; font-size: 14px; font-weight: bold; text-decoration: none;' onclick='return PRErejectCall(1000)' href='javascript:void(0);' target='_self'>No thanks</a></div></td></tr></tbody></table></div>"; 
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='learn_newinvite_phoenix.png'; 	PRElastAction='invShown' + '.' + 1000; 	aims_I2CInitialze(1000);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["1000"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["1000"]=true;paift["1000"]=1;setTimeout( 'resetPGS('+'1000'+')' , 3000 );setTimeout( 'aims_initializeChat('+'1000'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.1000")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow1001(){
 if(PREimgName==null || PREimgName!='chat_72x18.png'){
 pacia["1001"]=PREImageIconURL+'chat_72x18.png'; paciu["1001"]=PREImageIconURL+'chat_72x18_unavailable.png'; pauid["1001"]=true; paift["1001"]=1;
  if ( typeof pacim["1001"] == "undefined" ){pacim["1001"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1001"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1001"]='';  ptoimua["1001"]='';  ptoiua["1001"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1146', '1001');aims_sCAP('APPID'); } else {setTimeout('PREshow1001()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1001');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1001'); aims_sCAP('OTHER'); } 
 if (C2CFlag1001==true){aims_initializeChat(1001);C2CFlag1001=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1001")',3000);  
 }

 function PREshow1002(){
 if(PREimgName==null || PREimgName!='learn_newinvite_phoenix.png'){
 I2CFlag=true; if ( typeof pacim["1002"] == "undefined" ){pacim["1002"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1002"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1002"]='';  ptoimua["1002"]='';  ptoiua["1002"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1146', '1002');aims_sCAP('APPID'); } else {setTimeout('PREshow1002()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1002');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1002'); aims_sCAP('OTHER'); } 
 divHtml="<div id='aimslayer' style='left: 10px; top: 90px; line-height: 1; visibility: hidden; position: absolute; z-index: 99999999; bgcolor: #000000;' name='aimslayer'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='padding: 0px;'><a name='needRef' title='Invitation' id='needRef' onclick='return PREacceptCall(1002)' href='javascript:void(0);' target='_self'><img name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' src='https://collaborateext.verizon.com/pre/prescripts/images/learn_newinvite_phoenix.png' border='0'></a>"+ptoia[1002]+"<div id='aimsdenyinvite' style='left: 225px; top: 170px; position: absolute;'><a style='font-family: Verdana; font-size: 14px; font-weight: bold; text-decoration: none;' onclick='return PRErejectCall(1002)' href='javascript:void(0);' target='_self'>No thanks</a></div></td></tr></tbody></table></div>"; 
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='learn_newinvite_phoenix.png'; 	PRElastAction='invShown' + '.' + 1002; 	aims_I2CInitialze(1002);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["1002"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["1002"]=true;paift["1002"]=1;setTimeout( 'resetPGS('+'1002'+')' , 3000 );setTimeout( 'aims_initializeChat('+'1002'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.1002")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow1003(){
 if(PREimgName==null || PREimgName!='chat_chatnow_alt_125x31.png'){
     PREMasterTreatment=true; 
pacim["1001"]="aimsChatIcon1";pacim["865"]="aimsChatIcon2";setTimeout('sendPREUpdates("' + 'icoShown.1003' + '")',50);setTimeout('PREshow1001()', 1000 );setTimeout('PREshow865()', 3000 ); } 
 }

 function PREshow1004(){
 if(PREimgName==null || PREimgName!='blank_button.png'){
     PREMasterTreatment=true; 
pacim["1005"]="aimsChatIcon1";pacim["1006"]="aimsChatIcon2";setTimeout('sendPREUpdates("' + 'icoShown.1004' + '")',50);setTimeout('PREshow1005()', 1000 );setTimeout('PREshow1006()', 3000 ); } 
 }

 function PREshow1005(){
 if(PREimgName==null || PREimgName!='chat_72x18.png'){
 pacia["1005"]=PREImageIconURL+'chat_72x18.png'; paciu["1005"]=PREImageIconURL+'chat_72x18_unavailable.png'; pauid["1005"]=true; paift["1005"]=1;
  if ( typeof pacim["1005"] == "undefined" ){pacim["1005"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1005"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1005"]='';  ptoimua["1005"]='';  ptoiua["1005"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('549', '1005');aims_sCAP('APPID'); } else {setTimeout('PREshow1005()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1005');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1005'); aims_sCAP('OTHER'); } 
 if (C2CFlag1005==true){aims_initializeChat(1005);C2CFlag1005=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1005")',3000);  
 }

 function PREshow1006(){
 if(PREimgName==null || PREimgName!='call_56x18.png'){
 pacia["1006"]=PREImageIconURL+'call_56x18.png'; paciu["1006"]=PREImageIconURL+'call_56x18_unavailable.png'; pauid["1006"]=true; paift["1006"]=1;
  if ( typeof pacim["1006"] == "undefined" ){pacim["1006"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1006"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1006"]='';  ptoimua["1006"]='';  ptoiua["1006"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('532', '1006');aims_sCAP('APPID'); } else {setTimeout('PREshow1006()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1006');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1006'); aims_sCAP('OTHER'); } 
 if (C2CFlag1006==true){aims_initializeChat(1006);C2CFlag1006=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1006")',3000);  
 }

 function PREshow1007(){
 if(PREimgName==null || PREimgName!='STIDNewRedC2C.gif'){
 pacia["1007"]=PREImageIconURL+'STIDNewRedC2C.gif'; paciu["1007"]=PREImageIconURL+'STIDNewRedC2C_unavailable.gif'; pauid["1007"]=true; paift["1007"]=1;
  if ( typeof pacim["1007"] == "undefined" ){pacim["1007"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1007"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1007"]='';  ptoimua["1007"]='';  ptoiua["1007"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('630', '1007');aims_sCAP('APPID'); } else {setTimeout('PREshow1007()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1007');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1007'); aims_sCAP('OTHER'); } 
 if (C2CFlag1007==true){aims_initializeChat(1007);C2CFlag1007=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1007")',3000);  
 }

 function PREshow1008(){
 if(PREimgName==null || PREimgName!='whatsnextCTCNew.png'){
 pacia["1008"]=PREImageIconURL+'whatsnextCTCNew.png'; paciu["1008"]=PREImageIconURL+'whatsnextCTCNew_unavailable.png'; pauid["1008"]=true; paift["1008"]=1;
  if ( typeof pacim["1008"] == "undefined" ){pacim["1008"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1008"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1008"]='';  ptoimua["1008"]='';  ptoiua["1008"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('630', '1008');aims_sCAP('APPID'); } else {setTimeout('PREshow1008()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1008');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1008'); aims_sCAP('OTHER'); } 
 if (C2CFlag1008==true){aims_initializeChat(1008);C2CFlag1008=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1008")',3000);  
 }

 function PREshow1009(){
 if(PREimgName==null || PREimgName!='whatsnext_p2c_auth.png'){
 pacia["1009"]=PREImageIconURL+'whatsnext_p2c_auth.png'; paciu["1009"]=PREImageIconURL+'whatsnext_p2c_auth_unavailable.png'; if ( typeof pacim["1009"] == "undefined" ){pacim["1009"]="aimsparkinglayer"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1009"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1009"]='';  ptoimua["1009"]='';  ptoiua["1009"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('630', '1009');aims_sCAP('APPID'); } else {setTimeout('PREshow1009()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1009'); aims_sCAP('OTHER'); } 
 if (C2CFlag1009==true){C2CFlag1009=false;}
  preParkingSide = "left";   
   preflyoutcoords = "240px";    
   preflyincoords = "8px";   
  divHtml="<div name='aimsparkinglayer' id='aimsparkinglayer' style='position: fixed; z-index: 99999999; top:400px; left:8px;  visibility:hidden; '><a href='javascript:void(0);' >  <img  id='parkingchaticon' style=' position: absolute;  cursor: pointer; max-width:none; margin-left:-240px;' name='PREAIMSParkingLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/whatsnext_p2c_auth.png' border='0' onClick='return PREparkingacceptCall(1009)'  onmouseover='PREparkingflyOut()' onmouseout='PREparkingflyIn()' /></a>  </div> " ;      
 if ( !PREParkingshowImage){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimsprkglayerHolderDiv = document.createElement('div');
            aimsprkglayerHolderDiv.setAttribute('id', 'aimsparkinglayerHolder');
            document.body.appendChild(aimsprkglayerHolderDiv);
            document.getElementById("aimsparkinglayerHolder").innerHTML = divHtml;
          }
     }catch(ex){}
 }
  PREimgName='whatsnext_p2c_auth.png'; 	PRElastAction='invShown' + '.' + 1009; 	aims_parkingInitialze(1009);
 } 
 setTimeout('sendPREUpdates("icoShown.1009")',3000);  
 }

 function PREshow1010(){
 if(PREimgName==null || PREimgName!='whatsnext_p2c_reg.png'){
 pacia["1010"]=PREImageIconURL+'whatsnext_p2c_reg.png'; paciu["1010"]=PREImageIconURL+'whatsnext_p2c_reg_unavailable.png'; if ( typeof pacim["1010"] == "undefined" ){pacim["1010"]="aimsparkinglayer"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1010"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1010"]='';  ptoimua["1010"]='';  ptoiua["1010"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('630', '1010');aims_sCAP('APPID'); } else {setTimeout('PREshow1010()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1010'); aims_sCAP('OTHER'); } 
 if (C2CFlag1010==true){C2CFlag1010=false;}
  preParkingSide = "left";   
   preflyoutcoords = "240px";    
   preflyincoords = "8px";   
  divHtml="<div name='aimsparkinglayer' id='aimsparkinglayer' style='position: fixed; z-index: 99999999; top:400px; left:8px;  visibility:hidden; '><a href='javascript:void(0);' >  <img  id='parkingchaticon' style=' position: absolute;  cursor: pointer; max-width:none; margin-left:-240px;' name='PREAIMSParkingLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/whatsnext_p2c_reg.png' border='0' onClick='return PREparkingacceptCall(1010)'  onmouseover='PREparkingflyOut()' onmouseout='PREparkingflyIn()' /></a>  </div> " ;      
 if ( !PREParkingshowImage){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimsprkglayerHolderDiv = document.createElement('div');
            aimsprkglayerHolderDiv.setAttribute('id', 'aimsparkinglayerHolder');
            document.body.appendChild(aimsprkglayerHolderDiv);
            document.getElementById("aimsparkinglayerHolder").innerHTML = divHtml;
          }
     }catch(ex){}
 }
  PREimgName='whatsnext_p2c_reg.png'; 	PRElastAction='invShown' + '.' + 1010; 	aims_parkingInitialze(1010);
 } 
 setTimeout('sendPREUpdates("icoShown.1010")',3000);  
 }

 function PREshow1011(){
 if(PREimgName==null || PREimgName!='hybrid_new_i2c_accept.png'){
 I2CFlag=true; if ( typeof pacim["1011"] == "undefined" ){pacim["1011"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1011"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1011"]='<div id=preTextHolder style=position:absolute;left:25px;top:225px;z-index:9999999999;width:75%;height:60px;><div id=preText style=text-align:left; position:absolute;><a href="#" style="line-height: 18px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=74&lob=PUAR&proactive=y&initQ=How do I order new Fios TV equipment?",1,1011);\'>- How do I order new Fios TV equipment?</a><br /><a href="#" style="line-height: 18px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=74&lob=PUAR&proactive=y&initQ=Can you tell me about plans and channel costs",2,1011);\'>- Can you tell me about plans & channel costs?</a><br /><a href="#" style="line-height: 18px;font-size:13px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=74&lob=PUAR&proactive=y&initQ=How do I order a Pay Per View",3,1011);\'>- How do I order a Pay Per View?</a><br /></div><br /><div style="vertical-align:top; position:absolute;top:58px;"><table id="aimsvatable" style="padding: 2px; vertical-align: middle;" bgColor="#ffffff" cellSpacing="0" cellPadding="0"><tr><td><input name="initQ" id="va_initQ" style="border-bottom: 1px solid rgb(164, 164, 164);border-top: 0px; border-left: 0px; border-right: 0px; width: 280px; height: 34px; color: rgb(51, 51, 51); line-height: 2; font-family: helvetica, arial, sans serif; font-size: 14px;" onfocus="this.value=\'\'" type="text" size="35" value="Ask me a question"></td><td style="padding: 2px; vertical-align: middle;"><a onclick=\'if (document.getElementById("va_initQ").value == "") { return false; } else { invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&amp;lob=PUAR&amp;proactive=y&amp;initQ=" + document.getElementById("va_initQ").value ,4,1011); }\' href=""><input type="image" src="https://collaborateext.verizon.com/aims/includes/images/encore/search_vaIcon.png"></a></td></tr></table></div></div><DIV style="POSITION: absolute; TOP: 144px; LEFT: 312px"></DIV>';  ptoimua["1011"]='';  ptoiua["1011"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1176', '1011');aims_sCAP('APPID'); } else {setTimeout('PREshow1011()', 1000);return; }
 if (typeof vaFlow != "undefined" ){aims_setCustomerInfo('OTHER',vaFlow, '1011'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(1011)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/hybrid_new_i2c_accept_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(1011)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/hybrid_new_i2c_accept.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[1011]+"</td></tr></table></div>" ;
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='hybrid_new_i2c_accept.png'; 	PRElastAction='invShown' + '.' + 1011; 	aims_I2CInitialze(1011);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["1011"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["1011"]=true;paift["1011"]=1;setTimeout( 'resetPGS('+'1011'+')' , 3000 );setTimeout( 'aims_initializeChat('+'1011'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.1011")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow1012(){
 if(PREimgName==null || PREimgName!='chat_chatnow.png'){
 pacia["1012"]=PREImageIconURL+'chat_chatnow.png'; paciu["1012"]=PREImageIconURL+'chat_chatnow_unavailable.png'; pauid["1012"]=true; paift["1012"]=1;
  if ( typeof pacim["1012"] == "undefined" ){pacim["1012"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1012"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1012"]='';  ptoimua["1012"]='';  ptoiua["1012"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('dummy', '1012');aims_sCAP('APPID'); } else {setTimeout('PREshow1012()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1012');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1012'); aims_sCAP('OTHER'); } 
 if (C2CFlag1012==true){aims_initializeChat(1012);C2CFlag1012=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1012")',3000);  
 }

 function PREshow1013(){
 if(PREimgName==null || PREimgName!='chat_chatnow.png'){
 pacia["1013"]=PREImageIconURL+'chat_chatnow.png'; paciu["1013"]=PREImageIconURL+'chat_chatnow_unavailable.png'; pauid["1013"]=true; paift["1013"]=1;
  if ( typeof pacim["1013"] == "undefined" ){pacim["1013"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1013"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1013"]='';  ptoimua["1013"]='';  ptoiua["1013"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('640', '1013');aims_sCAP('APPID'); } else {setTimeout('PREshow1013()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1013');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1013'); aims_sCAP('OTHER'); } 
 if (C2CFlag1013==true){aims_initializeChat(1013);C2CFlag1013=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1013")',3000);  
 }

 function PREshow1014(){
 if(PREimgName==null || PREimgName!='hybrid_new_i2c_accept.png'){
 I2CFlag=true; if ( typeof pacim["1014"] == "undefined" ){pacim["1014"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1014"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1014"]='<div id=preTextHolder style=position:absolute;left:25px;top:225px;z-index:9999999999;width:75%;height:60px;><div id=preText style=position:absolute;><a href="#" style="line-height: 18px;font-size:12px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&lob=CFIP&initQ=Is Fios service available at my address?",1,1014);\'>Is Fios service available at my address?</a><br /><a href="#" style="line-height: 18px;font-size:12px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&lob=CFIP&initQ=What if I cant order Fios for my address?",2,1014);\'>What if I can\'t order Fios for my address?</a><br /><a href="#" style="line-height: 18px;font-size:12px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew(" https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&lob=CFIP&initQ=What Fios Internet plans do you have?",3,1014);\'>What Fios Internet plans do you have?</a><br /></div><br /><div id="preText" style="position:absolute;top:58px;"><table id="aimsvatable" style="padding: 2px; vertical-align: middle;" bgColor="#ffffff" cellSpacing="0" cellPadding="0"><tr><td><input name="initQ" id="va_initQ" style="border-bottom: 1px solid rgb(164, 164, 164);border-top: 0px; border-left: 0px; border-right: 0px; width: 280px; height: 34px; color: rgb(51, 51, 51); line-height: 2; font-family: helvetica, arial, sans serif; font-size: 14px;" onfocus="this.value=\'\'" type="text" size="35" value="Ask me a question"></td><td style="padding: 2px; vertical-align: middle;"><a onclick=\'if (document.getElementById("va_initQ").value == "") { return false; } else { invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&amp;lob=CFIP&amp;proactive=y&amp;initQ=" + document.getElementById("va_initQ").value ,4,1014); }\' href=""><input type="image" src="https://collaborateext.verizon.com/aims/includes/images/encore/search_vaIcon.png"></a></td></tr></table></div></div><DIV style="POSITION: absolute; TOP: 144px; LEFT: 312px"></DIV>';  ptoimua["1014"]='';  ptoiua["1014"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1110', '1014');aims_sCAP('APPID'); } else {setTimeout('PREshow1014()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1014'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(1014)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/hybrid_new_i2c_accept_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(1014)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/hybrid_new_i2c_accept.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[1014]+"</td></tr></table></div>" ;
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='hybrid_new_i2c_accept.png'; 	PRElastAction='invShown' + '.' + 1014; 	aims_I2CInitialze(1014);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["1014"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["1014"]=true;paift["1014"]=1;setTimeout( 'resetPGS('+'1014'+')' , 3000 );setTimeout( 'aims_initializeChat('+'1014'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.1014")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow1015(){
 if(PREimgName==null || PREimgName!='hybrid_new_i2c_accept.png'){
 I2CFlag=true; if ( typeof pacim["1015"] == "undefined" ){pacim["1015"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1015"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1015"]='<div id=preTextHolder style=position:absolute;left:25px;top:225px;z-index:9999999999;width:75%;height:60px;><div id=preText style=position:absolute;><a href="#" style="line-height: 18px;font-size:12px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=83&lob=CHIP&initQ=Is Verizon service available at my address?",1,1015);\'>Is Verizon service available at my address?</a><br /><a href="#" style="line-height: 18px;font-size:12px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=83&lob=CHIP&initQ=What if I cant order High Speed Internet?",2,1015);\'>What if I can\'t order High Speed Internet?</a><br /><a href="#" style="line-height: 18px;font-size:12px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew(" https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=83&lob=CHIP&initQ=How much does High Speed Internet cost?",3,1015);\'>How much does High Speed Internet cost?</a><br /></div><br /><div id="preText" style="position:absolute;top:58px;"><table id="aimsvatable" style="padding: 2px; vertical-align: middle;" bgColor="#ffffff" cellSpacing="0" cellPadding="0"><tr><td><input name="initQ" id="va_initQ" style="border-bottom: 1px solid rgb(164, 164, 164);border-top: 0px; border-left: 0px; border-right: 0px; width: 280px; height: 34px; color: rgb(51, 51, 51); line-height: 2; font-family: helvetica, arial, sans serif; font-size: 14px;" onfocus="this.value=\'\'" type="text" size="35" value="Ask me a question"></td><td style="padding: 2px; vertical-align: middle;"><a onclick=\'if (document.getElementById("va_initQ").value == "") { return false; } else { invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=83&amp;lob=CHIP&amp;proactive=y&amp;initQ=" + document.getElementById("va_initQ").value ,4,1015); }\' href=""><input type="image" src="https://collaborateext.verizon.com/aims/includes/images/encore/search_vaIcon.png"></a></td></tr></table></div></div><DIV style="POSITION: absolute; TOP: 144px; LEFT: 312px"></DIV>';  ptoimua["1015"]='';  ptoiua["1015"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1110', '1015');aims_sCAP('APPID'); } else {setTimeout('PREshow1015()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1015'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(1015)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/hybrid_new_i2c_accept_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(1015)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/hybrid_new_i2c_accept.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[1015]+"</td></tr></table></div>" ;
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='hybrid_new_i2c_accept.png'; 	PRElastAction='invShown' + '.' + 1015; 	aims_I2CInitialze(1015);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["1015"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["1015"]=true;paift["1015"]=1;setTimeout( 'resetPGS('+'1015'+')' , 3000 );setTimeout( 'aims_initializeChat('+'1015'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.1015")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow1016(){
 if(PREimgName==null || PREimgName!='hybrid_new_i2c_accept.png'){
 I2CFlag=true; if ( typeof pacim["1016"] == "undefined" ){pacim["1016"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1016"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1016"]='<div id=preTextHolder style=position:absolute;left:25px;top:225px;z-index:9999999999;width:75%;height:60px;><div id=preText style=position:absolute;><a href="#" style="line-height: 18px;font-size:12px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&lob=CFIP&initQ=Is Fios service available at my address?",1,1016);\'>Is Fios service available at my address?</a><br /><a href="#" style="line-height: 18px;font-size:12px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&lob=CFIP&initQ=What if I cant order Fios for my address?",2,1016);\'>What if I can\'t order Fios for my address?</a><br /><a href="#" style="line-height: 18px;font-size:12px; text-decoration:  none;font-weight:bold;font-family:JunkFont1, Arial, sans-serif;color: #0066cc;" onClick=\'invokeVAlinkOnImageNew(" https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&lob=CFIP&initQ=What Fios Internet plans do you have?",3,1016);\'>What Fios Internet plans do you have?</a><br /></div><br /><div id="preText" style="position:absolute;top:58px;"><table id="aimsvatable" style="padding: 2px; vertical-align: middle;" bgColor="#ffffff" cellSpacing="0" cellPadding="0"><tr><td><input name="initQ" id="va_initQ" style="border-bottom: 1px solid rgb(164, 164, 164);border-top: 0px; border-left: 0px; border-right: 0px; width: 280px; height: 34px; color: rgb(51, 51, 51); line-height: 2; font-family: helvetica, arial, sans serif; font-size: 14px;" onfocus="this.value=\'\'" type="text" size="35" value="Ask me a question"></td><td style="padding: 2px; vertical-align: middle;"><a onclick=\'if (document.getElementById("va_initQ").value == "") { return false; } else { invokeVAlinkOnImageNew("https://collaborateext.verizon.com/aims/encore/VZCTC.serv?appid=84&amp;lob=CFIP&amp;proactive=y&amp;initQ=" + document.getElementById("va_initQ").value ,4,1016); }\' href=""><input type="image" src="https://collaborateext.verizon.com/aims/includes/images/encore/search_vaIcon.png"></a></td></tr></table></div></div><DIV style="POSITION: absolute; TOP: 144px; LEFT: 312px"></DIV>';  ptoimua["1016"]='';  ptoiua["1016"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1110', '1016');aims_sCAP('APPID'); } else {setTimeout('PREshow1016()', 1000);return; }
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1016'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(1016)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/hybrid_new_i2c_accept_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(1016)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/hybrid_new_i2c_accept.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[1016]+"</td></tr></table></div>" ;
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='hybrid_new_i2c_accept.png'; 	PRElastAction='invShown' + '.' + 1016; 	aims_I2CInitialze(1016);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["1016"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["1016"]=true;paift["1016"]=1;setTimeout( 'resetPGS('+'1016'+')' , 3000 );setTimeout( 'aims_initializeChat('+'1016'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.1016")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow1017(){
 if(PREimgName==null || PREimgName!='learn_newinvite_phoenix.png'){
 I2CFlag=true; if ( typeof pacim["1017"] == "undefined" ){pacim["1017"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1017"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1017"]='';  ptoimua["1017"]='';  ptoiua["1017"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('954', '1017');aims_sCAP('APPID'); } else {setTimeout('PREshow1017()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1017');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1017'); aims_sCAP('OTHER'); } 
 divHtml="<div id='aimslayer' style='left: 10px; top: 90px; line-height: 1; visibility: hidden; position: absolute; z-index: 99999999; bgcolor: #000000;' name='aimslayer'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='padding: 0px;'><a name='needRef' title='Invitation' id='needRef' onclick='return PREacceptCall(1017)' href='javascript:void(0);' target='_self'><img name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' src='https://collaborateext.verizon.com/pre/prescripts/images/learn_newinvite_phoenix.png' border='0'></a>"+ptoia[1017]+"<div id='aimsdenyinvite' style='left: 225px; top: 170px; position: absolute;'><a style='font-family: Verdana; font-size: 14px; font-weight: bold; text-decoration: none;' onclick='return PRErejectCall(1017)' href='javascript:void(0);' target='_self'>No thanks</a></div></td></tr></tbody></table></div>"; 
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='learn_newinvite_phoenix.png'; 	PRElastAction='invShown' + '.' + 1017; 	aims_I2CInitialze(1017);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["1017"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["1017"]=true;paift["1017"]=1;setTimeout( 'resetPGS('+'1017'+')' , 3000 );setTimeout( 'aims_initializeChat('+'1017'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.1017")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow1018(){
 if(PREimgName==null || PREimgName!='learn_newinvite_phoenix.png'){
 I2CFlag=true; if ( typeof pacim["1018"] == "undefined" ){pacim["1018"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1018"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1018"]='';  ptoimua["1018"]='';  ptoiua["1018"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('954', '1018');aims_sCAP('APPID'); } else {setTimeout('PREshow1018()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1018');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1018'); aims_sCAP('OTHER'); } 
 divHtml="<div id='aimslayer' style='left: 10px; top: 90px; line-height: 1; visibility: hidden; position: absolute; z-index: 99999999; bgcolor: #000000;' name='aimslayer'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='padding: 0px;'><a name='needRef' title='Invitation' id='needRef' onclick='return PREacceptCall(1018)' href='javascript:void(0);' target='_self'><img name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' src='https://collaborateext.verizon.com/pre/prescripts/images/learn_newinvite_phoenix.png' border='0'></a>"+ptoia[1018]+"<div id='aimsdenyinvite' style='left: 225px; top: 170px; position: absolute;'><a style='font-family: Verdana; font-size: 14px; font-weight: bold; text-decoration: none;' onclick='return PRErejectCall(1018)' href='javascript:void(0);' target='_self'>No thanks</a></div></td></tr></tbody></table></div>"; 
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='learn_newinvite_phoenix.png'; 	PRElastAction='invShown' + '.' + 1018; 	aims_I2CInitialze(1018);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["1018"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["1018"]=true;paift["1018"]=1;setTimeout( 'resetPGS('+'1018'+')' , 3000 );setTimeout( 'aims_initializeChat('+'1018'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.1018")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow1019(){
 if(PREimgName==null || PREimgName!='learn_newinvite_phoenix.png'){
 I2CFlag=true; if ( typeof pacim["1019"] == "undefined" ){pacim["1019"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1019"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1019"]='';  ptoimua["1019"]='';  ptoiua["1019"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1147', '1019');aims_sCAP('APPID'); } else {setTimeout('PREshow1019()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1019');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1019'); aims_sCAP('OTHER'); } 
 divHtml="<div id='aimslayer' style='left: 10px; top: 90px; line-height: 1; visibility: hidden; position: absolute; z-index: 99999999; bgcolor: #000000;' name='aimslayer'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='padding: 0px;'><a name='needRef' title='Invitation' id='needRef' onclick='return PREacceptCall(1019)' href='javascript:void(0);' target='_self'><img name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' src='https://collaborateext.verizon.com/pre/prescripts/images/learn_newinvite_phoenix.png' border='0'></a>"+ptoia[1019]+"<div id='aimsdenyinvite' style='left: 225px; top: 170px; position: absolute;'><a style='font-family: Verdana; font-size: 14px; font-weight: bold; text-decoration: none;' onclick='return PRErejectCall(1019)' href='javascript:void(0);' target='_self'>No thanks</a></div></td></tr></tbody></table></div>"; 
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='learn_newinvite_phoenix.png'; 	PRElastAction='invShown' + '.' + 1019; 	aims_I2CInitialze(1019);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["1019"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["1019"]=true;paift["1019"]=1;setTimeout( 'resetPGS('+'1019'+')' , 3000 );setTimeout( 'aims_initializeChat('+'1019'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.1019")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow1020(){
 if(PREimgName==null || PREimgName!='chat_72x18.png'){
 pacia["1020"]=PREImageIconURL+'chat_72x18.png'; paciu["1020"]=PREImageIconURL+'chat_72x18_unavailable.png'; pauid["1020"]=true; paift["1020"]=1;
  if ( typeof pacim["1020"] == "undefined" ){pacim["1020"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1020"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1020"]='';  ptoimua["1020"]='';  ptoiua["1020"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('954', '1020');aims_sCAP('APPID'); } else {setTimeout('PREshow1020()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1020');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1020'); aims_sCAP('OTHER'); } 
 if (C2CFlag1020==true){aims_initializeChat(1020);C2CFlag1020=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1020")',3000);  
 }

 function PREshow1021(){
 if(PREimgName==null || PREimgName!='vtp_chat_available.png'){
 pacia["1021"]=PREImageIconURL+'vtp_chat_available.png'; paciu["1021"]=PREImageIconURL+'vtp_chat_available_unavailable.png'; pauid["1021"]=true; paift["1021"]=1;
  if ( typeof pacim["1021"] == "undefined" ){pacim["1021"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1021"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1021"]='';  ptoimua["1021"]='';  ptoiua["1021"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('954', '1021');aims_sCAP('APPID'); } else {setTimeout('PREshow1021()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1021');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1021'); aims_sCAP('OTHER'); } 
 if (C2CFlag1021==true){aims_initializeChat(1021);C2CFlag1021=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1021")',3000);  
 }

 function PREshow1022(){
 if(PREimgName==null || PREimgName!='vtp_chat_available.png'){
 pacia["1022"]=PREImageIconURL+'vtp_chat_available.png'; paciu["1022"]=PREImageIconURL+'vtp_chat_available_unavailable.png'; pauid["1022"]=true; paift["1022"]=1;
  if ( typeof pacim["1022"] == "undefined" ){pacim["1022"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1022"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1022"]='';  ptoimua["1022"]='';  ptoiua["1022"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1147', '1022');aims_sCAP('APPID'); } else {setTimeout('PREshow1022()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1022');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1022'); aims_sCAP('OTHER'); } 
 if (C2CFlag1022==true){aims_initializeChat(1022);C2CFlag1022=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1022")',3000);  
 }

 function PREshow1023(){
 if(PREimgName==null || PREimgName!='chat_72x18.png'){
 pacia["1023"]=PREImageIconURL+'chat_72x18.png'; paciu["1023"]=PREImageIconURL+'chat_72x18_unavailable.png'; pauid["1023"]=true; paift["1023"]=1;
  if ( typeof pacim["1023"] == "undefined" ){pacim["1023"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1023"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1023"]='';  ptoimua["1023"]='';  ptoiua["1023"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('954', '1023');aims_sCAP('APPID'); } else {setTimeout('PREshow1023()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1023');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1023'); aims_sCAP('OTHER'); } 
 if (C2CFlag1023==true){aims_initializeChat(1023);C2CFlag1023=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1023")',3000);  
 }

 function PREshow1024(){
 if(PREimgName==null || PREimgName!='chat_72x18.png'){
 pacia["1024"]=PREImageIconURL+'chat_72x18.png'; paciu["1024"]=PREImageIconURL+'chat_72x18_unavailable.png'; pauid["1024"]=true; paift["1024"]=1;
  if ( typeof pacim["1024"] == "undefined" ){pacim["1024"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1024"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1024"]='';  ptoimua["1024"]='';  ptoiua["1024"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('954', '1024');aims_sCAP('APPID'); } else {setTimeout('PREshow1024()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1024');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1024'); aims_sCAP('OTHER'); } 
 if (C2CFlag1024==true){aims_initializeChat(1024);C2CFlag1024=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1024")',3000);  
 }

 function PREshow1025(){
 if(PREimgName==null || PREimgName!='vtp_chat_available.png'){
 pacia["1025"]=PREImageIconURL+'vtp_chat_available.png'; paciu["1025"]=PREImageIconURL+'vtp_chat_available_unavailable.png'; pauid["1025"]=true; paift["1025"]=1;
  if ( typeof pacim["1025"] == "undefined" ){pacim["1025"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1025"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1025"]='';  ptoimua["1025"]='';  ptoiua["1025"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('954', '1025');aims_sCAP('APPID'); } else {setTimeout('PREshow1025()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1025');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1025'); aims_sCAP('OTHER'); } 
 if (C2CFlag1025==true){aims_initializeChat(1025);C2CFlag1025=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1025")',3000);  
 }

 function PREshow1026(){
 if(PREimgName==null || PREimgName!='vtp_chat_available.png'){
 pacia["1026"]=PREImageIconURL+'vtp_chat_available.png'; paciu["1026"]=PREImageIconURL+'vtp_chat_available_unavailable.png'; pauid["1026"]=true; paift["1026"]=1;
  if ( typeof pacim["1026"] == "undefined" ){pacim["1026"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1026"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1026"]='';  ptoimua["1026"]='';  ptoiua["1026"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('954', '1026');aims_sCAP('APPID'); } else {setTimeout('PREshow1026()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1026');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1026'); aims_sCAP('OTHER'); } 
 if (C2CFlag1026==true){aims_initializeChat(1026);C2CFlag1026=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1026")',3000);  
 }

 function PREshow1027(){
 if(PREimgName==null || PREimgName!='vtp_chat_available.png'){
 pacia["1027"]=PREImageIconURL+'vtp_chat_available.png'; paciu["1027"]=PREImageIconURL+'vtp_chat_available_unavailable.png'; pauid["1027"]=true; paift["1027"]=1;
  if ( typeof pacim["1027"] == "undefined" ){pacim["1027"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1027"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1027"]='';  ptoimua["1027"]='';  ptoiua["1027"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1147', '1027');aims_sCAP('APPID'); } else {setTimeout('PREshow1027()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1027');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1027'); aims_sCAP('OTHER'); } 
 if (C2CFlag1027==true){aims_initializeChat(1027);C2CFlag1027=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1027")',3000);  
 }

 function PREshow1028(){
 if(PREimgName==null || PREimgName!='vtp_chat_available.png'){
 pacia["1028"]=PREImageIconURL+'vtp_chat_available.png'; paciu["1028"]=PREImageIconURL+'vtp_chat_available_unavailable.png'; pauid["1028"]=true; paift["1028"]=1;
  if ( typeof pacim["1028"] == "undefined" ){pacim["1028"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1028"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1028"]='';  ptoimua["1028"]='';  ptoiua["1028"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1147', '1028');aims_sCAP('APPID'); } else {setTimeout('PREshow1028()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1028');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1028'); aims_sCAP('OTHER'); } 
 if (C2CFlag1028==true){aims_initializeChat(1028);C2CFlag1028=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1028")',3000);  
 }

 function PREshow1029(){
 if(PREimgName==null || PREimgName!='vtp_smb_call.png'){
 pacia["1029"]=PREImageIconURL+'vtp_smb_call.png'; paciu["1029"]=PREImageIconURL+'vtp_smb_call_unavailable.png'; pauid["1029"]=true; paift["1029"]=1;
  if ( typeof pacim["1029"] == "undefined" ){pacim["1029"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1029"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1029"]='';  ptoimua["1029"]='';  ptoiua["1029"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('532', '1029');aims_sCAP('APPID'); } else {setTimeout('PREshow1029()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1029');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1029'); aims_sCAP('OTHER'); } 
 if (C2CFlag1029==true){aims_initializeChat(1029);C2CFlag1029=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1029")',3000);  
 }

 function PREshow1030(){
 if(PREimgName==null || PREimgName!='vtp_smb_call.png'){
 pacia["1030"]=PREImageIconURL+'vtp_smb_call.png'; paciu["1030"]=PREImageIconURL+'vtp_smb_call_unavailable.png'; pauid["1030"]=true; paift["1030"]=1;
  if ( typeof pacim["1030"] == "undefined" ){pacim["1030"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1030"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1030"]='';  ptoimua["1030"]='';  ptoiua["1030"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('532', '1030');aims_sCAP('APPID'); } else {setTimeout('PREshow1030()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1030');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1030'); aims_sCAP('OTHER'); } 
 if (C2CFlag1030==true){aims_initializeChat(1030);C2CFlag1030=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1030")',3000);  
 }

 function PREshow1031(){
 if(PREimgName==null || PREimgName!='vtp_smb_call.png'){
 pacia["1031"]=PREImageIconURL+'vtp_smb_call.png'; paciu["1031"]=PREImageIconURL+'vtp_smb_call_unavailable.png'; pauid["1031"]=true; paift["1031"]=1;
  if ( typeof pacim["1031"] == "undefined" ){pacim["1031"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1031"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1031"]='';  ptoimua["1031"]='';  ptoiua["1031"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('532', '1031');aims_sCAP('APPID'); } else {setTimeout('PREshow1031()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1031');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1031'); aims_sCAP('OTHER'); } 
 if (C2CFlag1031==true){aims_initializeChat(1031);C2CFlag1031=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1031")',3000);  
 }

 function PREshow1032(){
 if(PREimgName==null || PREimgName!='vec_ecomm_white.png'){
 pacia["1032"]=PREImageIconURL+'vec_ecomm_white.png'; paciu["1032"]=PREImageIconURL+'vec_ecomm_white_unavailable.png'; pauid["1032"]=true; paift["1032"]=1;
  if ( typeof pacim["1032"] == "undefined" ){pacim["1032"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1032"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1032"]='';  ptoimua["1032"]='';  ptoiua["1032"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('653', '1032');aims_sCAP('APPID'); } else {setTimeout('PREshow1032()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1032');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1032'); aims_sCAP('OTHER'); } 
 if (C2CFlag1032==true){aims_initializeChat(1032);C2CFlag1032=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1032")',3000);  
 }

 function PREshow1033(){
 if(PREimgName==null || PREimgName!='vz_vec_ecomm_chat.png'){
 pacia["1033"]=PREImageIconURL+'vz_vec_ecomm_chat.png'; paciu["1033"]=PREImageIconURL+'vz_vec_ecomm_chat_unavailable.png'; pauid["1033"]=true; paift["1033"]=1;
  if ( typeof pacim["1033"] == "undefined" ){pacim["1033"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1033"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1033"]='';  ptoimua["1033"]='';  ptoiua["1033"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('653', '1033');aims_sCAP('APPID'); } else {setTimeout('PREshow1033()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1033');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1033'); aims_sCAP('OTHER'); } 
 if (C2CFlag1033==true){aims_initializeChat(1033);C2CFlag1033=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1033")',3000);  
 }

 function PREshow1034(){
 if(PREimgName==null || PREimgName!='vz_vec_ecomm_chat.png'){
 pacia["1034"]=PREImageIconURL+'vz_vec_ecomm_chat.png'; paciu["1034"]=PREImageIconURL+'vz_vec_ecomm_chat_unavailable.png'; pauid["1034"]=true; paift["1034"]=1;
  if ( typeof pacim["1034"] == "undefined" ){pacim["1034"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1034"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1034"]='';  ptoimua["1034"]='';  ptoiua["1034"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('653', '1034');aims_sCAP('APPID'); } else {setTimeout('PREshow1034()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1034');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1034'); aims_sCAP('OTHER'); } 
 if (C2CFlag1034==true){aims_initializeChat(1034);C2CFlag1034=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1034")',3000);  
 }

 function PREshow1035(){
 if(PREimgName==null || PREimgName!='vz_vec_ecomm_chat.png'){
 pacia["1035"]=PREImageIconURL+'vz_vec_ecomm_chat.png'; paciu["1035"]=PREImageIconURL+'vz_vec_ecomm_chat_unavailable.png'; pauid["1035"]=true; paift["1035"]=1;
  if ( typeof pacim["1035"] == "undefined" ){pacim["1035"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1035"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1035"]='';  ptoimua["1035"]='';  ptoiua["1035"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('653', '1035');aims_sCAP('APPID'); } else {setTimeout('PREshow1035()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1035');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1035'); aims_sCAP('OTHER'); } 
 if (C2CFlag1035==true){aims_initializeChat(1035);C2CFlag1035=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1035")',3000);  
 }

 function PREshow1036(){
 if(PREimgName==null || PREimgName!='vz_vec_ecomm_chat.png'){
 pacia["1036"]=PREImageIconURL+'vz_vec_ecomm_chat.png'; paciu["1036"]=PREImageIconURL+'vz_vec_ecomm_chat_unavailable.png'; pauid["1036"]=true; paift["1036"]=1;
  if ( typeof pacim["1036"] == "undefined" ){pacim["1036"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1036"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1036"]='';  ptoimua["1036"]='';  ptoiua["1036"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('653', '1036');aims_sCAP('APPID'); } else {setTimeout('PREshow1036()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1036');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1036'); aims_sCAP('OTHER'); } 
 if (C2CFlag1036==true){aims_initializeChat(1036);C2CFlag1036=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1036")',3000);  
 }

 function PREshow1037(){
 if(PREimgName==null || PREimgName!='vz_vec_ecomm_chat.png'){
 pacia["1037"]=PREImageIconURL+'vz_vec_ecomm_chat.png'; paciu["1037"]=PREImageIconURL+'vz_vec_ecomm_chat_unavailable.png'; pauid["1037"]=true; paift["1037"]=1;
  if ( typeof pacim["1037"] == "undefined" ){pacim["1037"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1037"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1037"]='';  ptoimua["1037"]='';  ptoiua["1037"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('653', '1037');aims_sCAP('APPID'); } else {setTimeout('PREshow1037()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1037');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1037'); aims_sCAP('OTHER'); } 
 if (C2CFlag1037==true){aims_initializeChat(1037);C2CFlag1037=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1037")',3000);  
 }

 function PREshow1038(){
 if(PREimgName==null || PREimgName!='ves_emea_chat.png'){
 pacia["1038"]=PREImageIconURL+'ves_emea_chat.png'; paciu["1038"]=PREImageIconURL+'ves_emea_chat_unavailable.png'; pauid["1038"]=true; paift["1038"]=1;
  if ( typeof pacim["1038"] == "undefined" ){pacim["1038"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1038"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1038"]='';  ptoimua["1038"]='';  ptoiua["1038"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('713', '1038');aims_sCAP('APPID'); } else {setTimeout('PREshow1038()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1038');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1038'); aims_sCAP('OTHER'); } 
 if (C2CFlag1038==true){aims_initializeChat(1038);C2CFlag1038=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1038")',3000);  
 }

 function PREshow1039(){
 if(PREimgName==null || PREimgName!='ves_emea_billing.png'){
     PREMasterTreatment=true; 
pacim["1047"]="aimsChatIcon3";pacim["1046"]="aimsChatIcon2";pacim["1038"]="aimsChatIcon1";setTimeout('sendPREUpdates("' + 'icoShown.1039' + '")',50);setTimeout('PREshow1038()', 1000 );setTimeout('PREshow1046()', 3000 );setTimeout('PREshow1047()', 5000 ); } 
 }

 function PREshow1040(){
 if(PREimgName==null || PREimgName!='chat_chatnow.png'){
     PREMasterTreatment=true; 
pacim["865"]="aimsChatIcon2";pacim["1049"]="aimsChatIcon1";setTimeout('sendPREUpdates("' + 'icoShown.1040' + '")',50);setTimeout('PREshow1049()', 1000 );setTimeout('PREshow865()', 3000 ); } 
 }

 function PREshow1041(){
 if(PREimgName==null || PREimgName!='ForgotChatButton.png'){
 pacia["1041"]=PREImageIconURL+'ForgotChatButton.png'; paciu["1041"]=PREImageIconURL+'ForgotChatButton_unavailable.png'; pauid["1041"]=true; paift["1041"]=1;
  if ( typeof pacim["1041"] == "undefined" ){pacim["1041"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1041"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1041"]='';  ptoimua["1041"]='';  ptoiua["1041"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('865', '1041');aims_sCAP('APPID'); } else {setTimeout('PREshow1041()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1041');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1041'); aims_sCAP('OTHER'); } 
 if (C2CFlag1041==true){aims_initializeChat(1041);C2CFlag1041=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1041")',3000);  
 }

 function PREshow1042(){
 if(PREimgName==null || PREimgName!='chat_72x18.png'){
     PREMasterTreatment=true; 
pacim["1020"]="aimsChatIcon1";pacim["1024"]="aimsChatIcon3";pacim["1023"]="aimsChatIcon2";setTimeout('sendPREUpdates("' + 'icoShown.1042' + '")',50);setTimeout('PREshow1020()', 1000 );setTimeout('PREshow1023()', 3000 );setTimeout('PREshow1024()', 5000 ); } 
 }

 function PREshow1043(){
 if(PREimgName==null || PREimgName!='vtp_chat_available.png'){
     PREMasterTreatment=true; 
pacim["1021"]="aimsChatIcon1";pacim["1026"]="aimsChatIcon3";pacim["1025"]="aimsChatIcon2";setTimeout('sendPREUpdates("' + 'icoShown.1043' + '")',50);setTimeout('PREshow1021()', 1000 );setTimeout('PREshow1025()', 3000 );setTimeout('PREshow1026()', 5000 ); } 
 }

 function PREshow1044(){
 if(PREimgName==null || PREimgName!='vtp_chat_available.png'){
     PREMasterTreatment=true; 
pacim["1030"]="aimsChatIcon5";pacim["1031"]="aimsChatIcon6";pacim["1022"]="aimsChatIcon1";pacim["1029"]="aimsChatIcon4";pacim["1028"]="aimsChatIcon3";pacim["1027"]="aimsChatIcon2";setTimeout('sendPREUpdates("' + 'icoShown.1044' + '")',50);setTimeout('PREshow1022()', 1000 );setTimeout('PREshow1027()', 3000 );setTimeout('PREshow1028()', 5000 );setTimeout('PREshow1029()', 7000 );setTimeout('PREshow1030()', 9000 );setTimeout('PREshow1031()', 11000 ); } 
 }

 function PREshow1045(){
 if(PREimgName==null || PREimgName!='vz_vec_ecomm_chat.png'){
     PREMasterTreatment=true; 
pacim["1032"]="aimsChatIcon1";pacim["1033"]="aimsChatIcon2";pacim["1035"]="aimsChatIcon4";pacim["1034"]="aimsChatIcon3";pacim["1037"]="aimsChatIcon6";pacim["1036"]="aimsChatIcon5";setTimeout('sendPREUpdates("' + 'icoShown.1045' + '")',50);setTimeout('PREshow1032()', 1000 );setTimeout('PREshow1033()', 3000 );setTimeout('PREshow1034()', 5000 );setTimeout('PREshow1035()', 7000 );setTimeout('PREshow1036()', 9000 );setTimeout('PREshow1037()', 11000 ); } 
 }

 function PREshow1046(){
 if(PREimgName==null || PREimgName!='ves_emea_chat.png'){
 pacia["1046"]=PREImageIconURL+'ves_emea_chat.png'; paciu["1046"]=PREImageIconURL+'ves_emea_chat_unavailable.png'; pauid["1046"]=true; paift["1046"]=1;
  if ( typeof pacim["1046"] == "undefined" ){pacim["1046"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1046"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1046"]='';  ptoimua["1046"]='';  ptoiua["1046"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('713', '1046');aims_sCAP('APPID'); } else {setTimeout('PREshow1046()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1046');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1046'); aims_sCAP('OTHER'); } 
 if (C2CFlag1046==true){aims_initializeChat(1046);C2CFlag1046=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1046")',3000);  
 }

 function PREshow1047(){
 if(PREimgName==null || PREimgName!='ves_emea_chat.png'){
 pacia["1047"]=PREImageIconURL+'ves_emea_chat.png'; paciu["1047"]=PREImageIconURL+'ves_emea_chat_unavailable.png'; pauid["1047"]=true; paift["1047"]=1;
  if ( typeof pacim["1047"] == "undefined" ){pacim["1047"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1047"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1047"]='';  ptoimua["1047"]='';  ptoiua["1047"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('713', '1047');aims_sCAP('APPID'); } else {setTimeout('PREshow1047()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1047');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1047'); aims_sCAP('OTHER'); } 
 if (C2CFlag1047==true){aims_initializeChat(1047);C2CFlag1047=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1047")',3000);  
 }

 function PREshow1048(){
 if(PREimgName==null || PREimgName!='learn_newinvite_phoenix.png'){
 I2CFlag=true; if ( typeof pacim["1048"] == "undefined" ){pacim["1048"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1048"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1048"]='';  ptoimua["1048"]='';  ptoiua["1048"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1146', '1048');aims_sCAP('APPID'); } else {setTimeout('PREshow1048()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1048');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1048'); aims_sCAP('OTHER'); } 
 divHtml="<div id='aimslayer' style='left: 10px; top: 90px; line-height: 1; visibility: hidden; position: absolute; z-index: 99999999; bgcolor: #000000;' name='aimslayer'><table border='0' cellspacing='0' cellpadding='0'><tbody><tr><td style='padding: 0px;'><a name='needRef' title='Invitation' id='needRef' onclick='return PREacceptCall(1048)' href='javascript:void(0);' target='_self'><img name='PREAIMSLiveChatImg' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' src='https://collaborateext.verizon.com/pre/prescripts/images/learn_newinvite_phoenix.png' border='0'></a>"+ptoia[1048]+"<div id='aimsdenyinvite' style='left: 225px; top: 170px; position: absolute;'><a style='font-family: Verdana; font-size: 14px; font-weight: bold; text-decoration: none;' onclick='return PRErejectCall(1048)' href='javascript:void(0);' target='_self'>No thanks</a></div></td></tr></tbody></table></div>"; 
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='learn_newinvite_phoenix.png'; 	PRElastAction='invShown' + '.' + 1048; 	aims_I2CInitialze(1048);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["1048"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["1048"]=true;paift["1048"]=1;setTimeout( 'resetPGS('+'1048'+')' , 3000 );setTimeout( 'aims_initializeChat('+'1048'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.1048")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow1049(){
 if(PREimgName==null || PREimgName!='chat_72x18.png'){
 pacia["1049"]=PREImageIconURL+'chat_72x18.png'; paciu["1049"]=PREImageIconURL+'chat_72x18_unavailable.png'; pauid["1049"]=true; paift["1049"]=1;
  if ( typeof pacim["1049"] == "undefined" ){pacim["1049"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1049"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1049"]='';  ptoimua["1049"]='';  ptoiua["1049"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1146', '1049');aims_sCAP('APPID'); } else {setTimeout('PREshow1049()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1049');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1049'); aims_sCAP('OTHER'); } 
 if (C2CFlag1049==true){aims_initializeChat(1049);C2CFlag1049=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1049")',3000);  
 }

 function PREshow1050(){
 if(PREimgName==null || PREimgName!='call_menow.png'){
 pacia["1050"]=PREImageIconURL+'call_menow.png'; paciu["1050"]=PREImageIconURL+'call_menow_unavailable.png'; pauid["1050"]=true; paift["1050"]=1;
  if ( typeof pacim["1050"] == "undefined" ){pacim["1050"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1050"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1050"]='';  ptoimua["1050"]='';  ptoiua["1050"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('532', '1050');aims_sCAP('APPID'); } else {setTimeout('PREshow1050()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1050');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1050'); aims_sCAP('OTHER'); } 
 if (C2CFlag1050==true){aims_initializeChat(1050);C2CFlag1050=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1050")',3000);  
 }

 function PREshow1051(){
 if(PREimgName==null || PREimgName!='Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png'){
 pacia["1051"]=PREImageIconURL+'Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png'; paciu["1051"]=PREImageIconURL+'Phoenix_Redesign_Parking_Lot_Expert_Advice_082115_unavailable.png'; if ( typeof pacim["1051"] == "undefined" ){pacim["1051"]="aimsparkinglayer"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1051"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1051"]='';  ptoimua["1051"]='';  ptoiua["1051"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1146', '1051');aims_sCAP('APPID'); } else {setTimeout('PREshow1051()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1051');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1051'); aims_sCAP('OTHER'); } 
 if (C2CFlag1051==true){C2CFlag1051=false;}
  preParkingSide = "left";   
   preflyoutcoords = "240px";    
   preflyincoords = "8px";   
  divHtml="<div name='aimsparkinglayer' id='aimsparkinglayer' style='position: fixed; z-index: 99999999; top:400px; left:8px;  visibility:hidden; '><a href='javascript:void(0);' >  <img  id='parkingchaticon' style=' position: absolute;  cursor: pointer; max-width:none; margin-left:-240px;' name='PREAIMSParkingLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png' border='0' onClick='return PREparkingacceptCall(1051)'  onmouseover='PREparkingflyOut()' onmouseout='PREparkingflyIn()' /></a>  </div> " ;      
 if ( !PREParkingshowImage){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimsprkglayerHolderDiv = document.createElement('div');
            aimsprkglayerHolderDiv.setAttribute('id', 'aimsparkinglayerHolder');
            document.body.appendChild(aimsprkglayerHolderDiv);
            document.getElementById("aimsparkinglayerHolder").innerHTML = divHtml;
          }
     }catch(ex){}
 }
  PREimgName='Phoenix_Redesign_Parking_Lot_Expert_Advice_082115.png'; 	PRElastAction='invShown' + '.' + 1051; 	aims_parkingInitialze(1051);
 } 
 setTimeout('sendPREUpdates("icoShown.1051")',3000);  
 }

 function PREshow1052(){
 if(PREimgName==null || PREimgName!='chat_moreinfo_chatnow_alt_130x31.png'){
     PREMasterTreatment=true; 
pacim["1056"]="aimsChatIcon1";pacim["1053"]="aimsChatIcon2";setTimeout('sendPREUpdates("' + 'icoShown.1052' + '")',50);setTimeout('PREshow1056()', 1000 );setTimeout('PREshow1053()', 3000 ); } 
 }

 function PREshow1053(){
 if(PREimgName==null || PREimgName!='chat_callnow_alt_147x31_blank.png'){
 pacia["1053"]=PREImageIconURL+'chat_callnow_alt_147x31_blank.png'; paciu["1053"]=PREImageIconURL+'chat_callnow_alt_147x31_blank_unavailable.png'; pauid["1053"]=true; paift["1053"]=1;
  if ( typeof pacim["1053"] == "undefined" ){pacim["1053"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1053"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1053"]='';  ptoimua["1053"]='';  ptoiua["1053"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('532', '1053');aims_sCAP('APPID'); } else {setTimeout('PREshow1053()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1053');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1053'); aims_sCAP('OTHER'); } 
 if (C2CFlag1053==true){aims_initializeChat(1053);C2CFlag1053=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1053")',3000);  
 }

 function PREshow1054(){
 if(PREimgName==null || PREimgName!='chat_72x18.png'){
 if (isUserOniPad()) { 
 pacia["1054"]=PREImageIconURL+'chat_72x18.png'; paciu["1054"]=PREImageIconURL+'chat_72x18_unavailable.png'; } else if (isUserOnMobile()  ||  isUserOnFireFoxMobile() || isUserOnMobile2()) { 
 pacia["1054"]=PREImageIconURL+'chat_72x18_mobile.png'; paciu["1054"]=PREImageIconURL+'chat_72x18_mobile_unavailable.png'; } else { 
 pacia["1054"]=PREImageIconURL+'chat_72x18.png'; paciu["1054"]=PREImageIconURL+'chat_72x18_unavailable.png'; } 
 pauid["1054"]=true; paift["1054"]=1;
  if ( typeof pacim["1054"] == "undefined" ){pacim["1054"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1054"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1054"]='';  ptoimua["1054"]='';  ptoiua["1054"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1147', '1054');aims_sCAP('APPID'); } else {setTimeout('PREshow1054()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1054');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1054'); aims_sCAP('OTHER'); } 
 if (C2CFlag1054==true){aims_initializeChat(1054);C2CFlag1054=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1054")',3000);  
 }

 function PREshow1055(){
 if(PREimgName==null || PREimgName!='call_56x18.png'){
 if (isUserOniPad()) { 
 pacia["1055"]=PREImageIconURL+'call_56x18.png'; paciu["1055"]=PREImageIconURL+'call_56x18_unavailable.png'; } else if (isUserOnMobile()  ||  isUserOnFireFoxMobile() || isUserOnMobile2()) { 
 pacia["1055"]=PREImageIconURL+'call_56x18_mobile.png'; paciu["1055"]=PREImageIconURL+'call_56x18_mobile_unavailable.png'; } else { 
 pacia["1055"]=PREImageIconURL+'call_56x18.png'; paciu["1055"]=PREImageIconURL+'call_56x18_unavailable.png'; } 
 pauid["1055"]=true; paift["1055"]=1;
  if ( typeof pacim["1055"] == "undefined" ){pacim["1055"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1055"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1055"]='';  ptoimua["1055"]='';  ptoiua["1055"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('532', '1055');aims_sCAP('APPID'); } else {setTimeout('PREshow1055()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1055');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1055'); aims_sCAP('OTHER'); } 
 if (C2CFlag1055==true){aims_initializeChat(1055);C2CFlag1055=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1055")',3000);  
 }

 function PREshow1056(){
 if(PREimgName==null || PREimgName!='ChatNow_Need More-Info_CVCsmall.png'){
 pacia["1056"]=PREImageIconURL+'ChatNow_Need More-Info_CVCsmall.png'; paciu["1056"]=PREImageIconURL+'ChatNow_Need More-Info_CVCsmall_unavailable.png'; pauid["1056"]=true; paift["1056"]=1;
  if ( typeof pacim["1056"] == "undefined" ){pacim["1056"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1056"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1056"]='';  ptoimua["1056"]='';  ptoiua["1056"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('531', '1056');aims_sCAP('APPID'); } else {setTimeout('PREshow1056()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1056');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1056'); aims_sCAP('OTHER'); } 
 if (C2CFlag1056==true){aims_initializeChat(1056);C2CFlag1056=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1056")',3000);  
 }

 function PREshow1057(){
 if(PREimgName==null || PREimgName!='chat_chatnow_alt_125x31.png'){
     PREMasterTreatment=true; 
pacim["1054"]="aimsChatIcon1";pacim["1055"]="aimsChatIcon2";setTimeout('sendPREUpdates("' + 'icoShown.1057' + '")',50);setTimeout('PREshow1054()', 1000 );setTimeout('PREshow1055()', 3000 ); } 
 }

 function PREshow1058(){
 if(PREimgName==null || PREimgName!='learn_proactive.png'){
 I2CFlag=true; if ( typeof pacim["1058"] == "undefined" ){pacim["1058"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1058"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1058"]='';  ptoimua["1058"]='';  ptoiua["1058"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('1147', '1058');aims_sCAP('APPID'); } else {setTimeout('PREshow1058()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1058');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1058'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(1058)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/learn_proactive.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[1058]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(1058)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/learn_proactive_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='learn_proactive.png'; 	PRElastAction='invShown' + '.' + 1058; 	aims_I2CInitialze(1058);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["1058"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["1058"]=true;paift["1058"]=1;setTimeout( 'resetPGS('+'1058'+')' , 3000 );setTimeout( 'aims_initializeChat('+'1058'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.1058")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow1059(){
 if(PREimgName==null || PREimgName!='vec_liveChat2.png'){
 pacia["1059"]=PREImageIconURL+'vec_liveChat2.png'; paciu["1059"]=PREImageIconURL+'vec_liveChat2_unavailable.png'; pauid["1059"]=true; paift["1059"]=1;
  if ( typeof pacim["1059"] == "undefined" ){pacim["1059"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1059"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1059"]='';  ptoimua["1059"]='';  ptoiua["1059"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('713', '1059');aims_sCAP('APPID'); } else {setTimeout('PREshow1059()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1059');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1059'); aims_sCAP('OTHER'); } 
 if (C2CFlag1059==true){aims_initializeChat(1059);C2CFlag1059=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1059")',3000);  
 }

 function PREshow1060(){
 if(PREimgName==null || PREimgName!='proactiveChatIconVEC3.png'){
 I2CFlag=true; if ( typeof pacim["1060"] == "undefined" ){pacim["1060"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1060"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1060"]='<div id=preTextHolder style=position:absolute;left:45px;top:232px;z-index:9999999999;><div id=preText style=position:relative;vertical-align:top; width="60%"><A style="LINE-HEIGHT: 22px; FONT-FAMILY: JunkFont1, Arial, sans-serif; COLOR: #0066cc; FONT-SIZE: 12px; FONT-WEIGHT: bold; TEXT-DECORATION: none" href="https://enterprisecenter.verizon.com/enterprisesolutions/global/dlink/global/body/viewPersonalProfile.do?tabName=sitePreferences&mode=edit" title="Disable Proactive Chat window by editing chat preference option under Site Preference settings">Disable Proactive Chat</A></div></DIV>';  ptoimua["1060"]='';  ptoiua["1060"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('713', '1060');aims_sCAP('APPID'); } else {setTimeout('PREshow1060()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1060');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1060'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(1060)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/proactiveChatIconVEC3.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[1060]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(1060)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/proactiveChatIconVEC3_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='proactiveChatIconVEC3.png'; 	PRElastAction='invShown' + '.' + 1060; 	aims_I2CInitialze(1060);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["1060"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["1060"]=true;paift["1060"]=1;setTimeout( 'resetPGS('+'1060'+')' , 3000 );setTimeout( 'aims_initializeChat('+'1060'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.1060")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow1061(){
 if(PREimgName==null || PREimgName!='proactiveChatIconVEC3.png'){
 I2CFlag=true; if ( typeof pacim["1061"] == "undefined" ){pacim["1061"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1061"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1061"]='<div id=preTextHolder style=position:absolute;left:45px;top:232px;z-index:9999999999;><div id=preText style=position:relative;vertical-align:top; width="60%"><A style="LINE-HEIGHT: 22px; FONT-FAMILY: JunkFont1, Arial, sans-serif; COLOR: #0066cc; FONT-SIZE: 12px; FONT-WEIGHT: bold; TEXT-DECORATION: none" href="https://enterprisecenter.verizon.com/enterprisesolutions/global/dlink/global/body/viewPersonalProfile.do?tabName=sitePreferences&mode=edit" title="Disable Proactive Chat window by editing chat preference option under Site Preference settings">Disable Proactive Chat</A></div></DIV>';  ptoimua["1061"]='';  ptoiua["1061"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('713', '1061');aims_sCAP('APPID'); } else {setTimeout('PREshow1061()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1061');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1061'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(1061)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/proactiveChatIconVEC3.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[1061]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(1061)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/proactiveChatIconVEC3_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='proactiveChatIconVEC3.png'; 	PRElastAction='invShown' + '.' + 1061; 	aims_I2CInitialze(1061);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["1061"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["1061"]=true;paift["1061"]=1;setTimeout( 'resetPGS('+'1061'+')' , 3000 );setTimeout( 'aims_initializeChat('+'1061'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.1061")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }

 function PREshow1062(){
 if(PREimgName==null || PREimgName!='VZBVECContactUs.gif'){
 pacia["1062"]=PREImageIconURL+'VZBVECContactUs.gif'; paciu["1062"]=PREImageIconURL+'VZBVECContactUs_unavailable.gif'; pauid["1062"]=true; paift["1062"]=1;
  if ( typeof pacim["1062"] == "undefined" ){pacim["1062"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1062"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1062"]='';  ptoimua["1062"]='';  ptoiua["1062"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('713', '1062');aims_sCAP('APPID'); } else {setTimeout('PREshow1062()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1062');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1062'); aims_sCAP('OTHER'); } 
 if (C2CFlag1062==true){aims_initializeChat(1062);C2CFlag1062=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1062")',3000);  
 }

 function PREshow1063(){
 if(PREimgName==null || PREimgName!='ForgotChatButton.png'){
 if (isUserOniPad()) { 
 pacia["1063"]=PREImageIconURL+'ForgotChatButton.png'; paciu["1063"]=PREImageIconURL+'ForgotChatButton_unavailable.png'; } else if (isUserOnMobile()  ||  isUserOnFireFoxMobile() || isUserOnMobile2()) { 
 pacia["1063"]=PREImageIconURL+'ForgotChatButton_mobile.png'; paciu["1063"]=PREImageIconURL+'ForgotChatButton_mobile_unavailable.png'; } else { 
 pacia["1063"]=PREImageIconURL+'ForgotChatButton.png'; paciu["1063"]=PREImageIconURL+'ForgotChatButton_unavailable.png'; } 
 pauid["1063"]=true; paift["1063"]=1;
  if ( typeof pacim["1063"] == "undefined" ){pacim["1063"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1063"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1063"]='';  ptoimua["1063"]='';  ptoiua["1063"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('424', '1063');aims_sCAP('APPID'); } else {setTimeout('PREshow1063()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1063');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1063'); aims_sCAP('OTHER'); } 
 if (C2CFlag1063==true){aims_initializeChat(1063);C2CFlag1063=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1063")',3000);  
 }

 function PREshow1064(){
 if(PREimgName==null || PREimgName!='ForgotChatButton.png'){
 if (isUserOniPad()) { 
 pacia["1064"]=PREImageIconURL+'ForgotChatButton.png'; paciu["1064"]=PREImageIconURL+'ForgotChatButton_unavailable.png'; } else if (isUserOnMobile()  ||  isUserOnFireFoxMobile() || isUserOnMobile2()) { 
 pacia["1064"]=PREImageIconURL+'ForgotChatButton_mobile.png'; paciu["1064"]=PREImageIconURL+'ForgotChatButton_mobile_unavailable.png'; } else { 
 pacia["1064"]=PREImageIconURL+'ForgotChatButton.png'; paciu["1064"]=PREImageIconURL+'ForgotChatButton_unavailable.png'; } 
 pauid["1064"]=true; paift["1064"]=1;
  if ( typeof pacim["1064"] == "undefined" ){pacim["1064"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1064"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1064"]='';  ptoimua["1064"]='';  ptoiua["1064"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('425', '1064');aims_sCAP('APPID'); } else {setTimeout('PREshow1064()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1064');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1064'); aims_sCAP('OTHER'); } 
 if (C2CFlag1064==true){aims_initializeChat(1064);C2CFlag1064=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1064")',3000);  
 }

 function PREshow1065(){
 if(PREimgName==null || PREimgName!='EnterpriseChat.png'){
 pacia["1065"]=PREImageIconURL+'EnterpriseChat.png'; paciu["1065"]=PREImageIconURL+'EnterpriseChat_unavailable.png'; pauid["1065"]=true; paift["1065"]=1;
  if ( typeof pacim["1065"] == "undefined" ){pacim["1065"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1065"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1065"]='';  ptoimua["1065"]='';  ptoiua["1065"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('713', '1065');aims_sCAP('APPID'); } else {setTimeout('PREshow1065()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1065');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1065'); aims_sCAP('OTHER'); } 
 if (C2CFlag1065==true){aims_initializeChat(1065);C2CFlag1065=false;}
 } 
 setTimeout('sendPREUpdates("icoShown.1065")',3000);  
 }

 function PREshow1066(){
 if(PREimgName==null || PREimgName!='EnterpriseI2C.png'){
 I2CFlag=true; if ( typeof pacim["1066"] == "undefined" ){pacim["1066"]="aimsChatIcon"; }
 pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/CheckChat.serv"; 
 pacu["1066"]=PREBaseURL+'/aims/encore/VZCTC.serv'; 
 ptoia["1066"]='';  ptoimua["1066"]='';  ptoiua["1066"]=''; 
 if (typeof aims_setCustomerAppId != "undefined"){aims_setCustomerAppId('713', '1066');aims_sCAP('APPID'); } else {setTimeout('PREshow1066()', 1000);return; }
 if (typeof aimsState != "undefined" ){aims_setCustomerInfo('STATE',aimsState, '1066');aims_sCAP('STATE');} 
 if (typeof aimsFlow != "undefined" ){aims_setCustomerInfo('OTHER',aimsFlow, '1066'); aims_sCAP('OTHER'); } 
 divHtml="<div name='aimslayer' id='aimslayer' style='z-index:99999999;line-height:0;position:absolute;visibility:hidden;bgcolor:#000000;left:10px;top:120px'><table border='0' cellspacing='0' cellpadding='0'><tr><td><a name='needRef' id='needRef' href='javascript:void(0);' title='Invitation' onClick='return PREacceptCall(1066)' target='_self'  ><img name='PREAIMSLiveChatImg' src='https://collaborateext.verizon.com/pre/prescripts/images/EnterpriseI2C.png' id='PREAIMSLiveChatImg' onload='PREsetImageLoaded()' alt='Live Chat' border='0'></a>"+ptoia[1066]+"</td></tr><tr><td><a href='javascript:void(0);' onClick='return PRErejectCall(1066)' target='_self'><img name='need_close' src='https://collaborateext.verizon.com/pre/prescripts/images/EnterpriseI2C_close.png' border='0' onload ='PREsetImageLoaded()'  alt='Close Invitation'></a></td></tr></table></div>";
 if ( !PREShowImage ){
     try{
         if(navigator.appName=="Microsoft Internet Explorer") 
            document.body.insertAdjacentHTML('beforeEnd', divHtml);
         else {
             //document.body.innerHTML +=divHtml;
            var aimslayerHolderDiv = document.createElement('div');
            aimslayerHolderDiv.setAttribute('id', 'aimslayerHolder');
            document.body.appendChild(aimslayerHolderDiv);
            if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
            	document.getElementById("aimslayerHolder").innerHTML = '<div></div>';
          		} else { 
            	document.getElementById("aimslayerHolder").innerHTML = divHtml;
          		}
          }
     }catch(ex){}
 }
   PREimgName='EnterpriseI2C.png'; 	PRElastAction='invShown' + '.' + 1066; 	aims_I2CInitialze(1066);
    if ( PREStickyIcon ){
var aimsChatIconElementId=pacim["1066"];var aimsChatIconElement=document.getElementById( aimsChatIconElementId );
        if( aimsChatIconElement!=null ) { pauid["1066"]=true;paift["1066"]=1;setTimeout( 'resetPGS('+'1066'+')' , 3000 );setTimeout( 'aims_initializeChat('+'1066'+')' , 4000 );}
    }
 } 
 setTimeout('sendPREUpdates("icoShown.1066")',3000);  
 setTimeout('gradualHide("' + "aimslayer" + '")',120000);   
 }
 
 var pre_VALinkChatWindow = new Array();
 	function invokeVAlinkOnImage( vaUrl , vafaqId, preTreatId, k ){
    document.cookie = 'CLOSE_ASK_VERIZON_SILENTLY=Y; path=/; domain=verizon.com;';  
 	if( pre_VALinkChatWindow[vafaqId]!=null && pre_VALinkChatWindow[vafaqId].closed==false ){
 		pre_VALinkChatWindow[vafaqId].focus();
 	} else {
 		var windowname="AIMSVACHATWINDOW";
 	pre_VALinkChatWindow = window.open(vaUrl,windowname,"menubar=1,resizable=1,width=350,height=250,left=0,top=0");
 	for(k=1; k<=20; k++) 
 	{
    	if (vafaqId == k)
 			{
 		PRElastAction = "VALink"+k+"Clicked." +preTreatId;
 			}
 	}
 	setTimeout('sendPREUpdates("' + PRElastAction + '")',1000);}
 	}
 
 	function invokeVAlinkOnImageNew( vaUrl , vafaqId, preTreatId, k ){
    document.cookie = 'CLOSE_ASK_VERIZON_SILENTLY=Y; path=/; domain=verizon.com;';  
 	if( pre_VALinkChatWindow[vafaqId]!=null && pre_VALinkChatWindow[vafaqId].closed==false ){
 		pre_VALinkChatWindow[vafaqId].focus();
 	} else {
 		var windowname="AIMSVACHATWINDOW";
 	pre_VALinkChatWindow = window.open(vaUrl,windowname,"menubar=1,resizable=1,width=320,height=700,left=0,top=0");
 	for(k=1; k<=20; k++) 
 	{
    	if (vafaqId == k)
 			{
 		PRElastAction = "VALink"+k+"Clicked." +preTreatId;
 			}
 	}
 		PREhideImage(); 
 	setTimeout('sendPREUpdates("' + PRElastAction + '")',1000);}
 	}
 function PREparkingflyOut() 
 { 
 eval("document.getElementById('aimsparkinglayer').style."+preParkingSide+"='"+preflyoutcoords+"'");  
 } 
 function PREparkingflyIn() 
 { 
 eval("document.getElementById('aimsparkinglayer').style."+preParkingSide+"='"+preflyincoords+"'");   
 } 
 
 var is_chrome = false;
 try {
   is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1; 
 }
 catch (ex) {}
 
 function PREshowImage(idx, ani){
 	PREShowImage = true;
 	if (IE) {
 		Border=document.body.clientWidth;
 	} else if (NS) {
 		Border=window.innerWidth;
 	} else if (DOM) {
 		Border=window.innerWidth;
 	}
 	if(idx=='true'){
             if(document.getElementById("aimslayer") != null)
 		document.getElementById("aimslayer").style.visibility = "visible";
 	if(ani=='true'){
 	PREAnimate=true;
 		document.getElementById("aimslayer").style.visibility="visible";
  }
 }
 }
 
 function PREParkingshowImage11(idx, ani){
 	if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {
 		PREParkingshowImage = false;
         if(document.getElementById("aimsparkinglayer") != null)
 		document.getElementById("aimsparkinglayer").style.visibility = "hidden";
 	} else {
 		PREParkingshowImage = true;
         if(document.getElementById("aimsparkinglayer") != null)
 		document.getElementById("aimsparkinglayer").style.visibility = "visible";
 	}
 }
 	function getURLPathForRequest() { 
 		return escape(window.document.location); 
 	} 

 	function PREsendPreRequest() {
 		if (DOM && IE) {
 			document.body.removeChild(PREcommandImage);
 			PREcommandImage=document.createElement('IMG');
 			PREcommandImage.style.visibility="hidden";
 			document.body.appendChild(PREcommandImage);
 		} else if (!MAC) 
 			PREcommandImage=new Image;
 		 else if (MAC) 
 			PREcommandImage=document.createElement('IMG');
 		if (isUserOnMobile() || isUserOnFireFoxMobile() || isUserOnMobile2()) {  
 			isMobile = "Y";  
 		}  

 		if (PREpageID==null) PREpageID=Math.round(Math.random()*9999999999);
 		var url=PRErequestUrl+'?url='+ getURLPathForRequest() +
 						'&title='+escape(document.title)+
 						'&topWinTitle='+escape(PREtopWinowTitle)+
 						'&id='+PREpageID+ 
 						 '&cmdName='+PREcmdName+ 
 						 '&isMobile='+isMobile; 
 		var cookies='none';
 		var tmpPreCookie=readCookiePRE('AIMSSESSIONID');
		if(tmpPreCookie!=null)
			cookies=tmpPreCookie;
 		url=url+"&cookie="+escape(cookies);
 			url=url+"&stage="+PREstage;
 			url=url+'&lastAction='+PRElastAction;
 			url=url+'&timestamp='+PREgetCurrentTime();
			if(typeof aimsTrackingVar != 'undefined') {
				url=url+'&custTrack='+escape(aimsTrackingVar);
			}
			if(typeof aimsInfo != 'undefined') {url=url+'&aimsInfo='+aimsInfo;}
 		var preHostCustVars='none';
 		var preHostCustVarsTemp= '';
		if(typeof aimsChatCreditFlow != 'undefined') {
			if (preHostCustVarsTemp=='') {
				preHostCustVarsTemp='aimsChatCreditFlow'+'__'+aimsChatCreditFlow;
			}
 			else {
 				preHostCustVarsTemp=preHostCustVarsTemp + ':' +'aimsChatCreditFlow'+ '__'+  aimsChatCreditFlow ;
			}
		} 
			if(preHostCustVarsTemp!='') 
 				preHostCustVars=preHostCustVarsTemp;
 
				url=url+'&aimsHostVars='+preHostCustVars;
 
			try { 
			if (typeof aims_setCustomerAppId != "undefined"){  
				url = url + '&prdCt='+order.attr1; 
				url = url + '&prdItmCate='+order.bd; 
				url = url + '&prdItmQty='+order.qn; 
				url = url + '&prdItmPrice='+order.pc; 
 				if (url.length+order.ca.length < 2220)
					url = url + '&prdItmName='+order.ca; 
 				else 
					url = url + '&prdItmName=' + 'none'; 
			} 
 			} catch (AddIgnExp){//ignore the exp   
 			} // end of Try  
 
 			url=url+'&referrer=';
 			var ref=escape(document.referrer);
 			if (url.length+ref.length<2220)
 				url=url+ref;
 			PREcommandImage.src=url;
 			PREsendImage=false;
 			PREreqWaitCount=0;
   			if (userTrailFlag&&PREstage=="start")
  			{ 
  			        setTimeout('PREUserTrailSafeSend()',1000);
  			} 
 			if (PREstage=="start")
 				PREstage="subseq";
 			PRElastAction="none";
 		} 
 		function sendPREUpdates(preupdateVal) {
 			PRElastAction=preupdateVal;
 		    PREsendPreRequest();
 		} 
 		function PREheartbeat() {
 			if(PREstopRequest) return; 
 			PREreqWaitCount++; 
 			if(PREreqWaitCount>5) 
 				PREsendImage=true; 
 			if(PREsendImage) 
 			{ 
 				 PREsendPreRequest();
 			} 
 			setTimeout("PREcheckImage()",500);
 		heartBeatTimeoutVar = setTimeout('PREheartbeat()', 10000); 
 		} 
  function readCookiePRE(PREcookieName) {
	var PREnameEQ=PREcookieName + "=";
	var PREca=document.cookie.split(';');
	for(var PREi=0; PREi< PREca.length;PREi++) { 
		var PREc=PREca[PREi]; 
		while (PREc.charAt(0)==' ') PREc=PREc.substring(1,PREc.length);
		if (PREc.indexOf(PREnameEQ)==0) return PREc.substring(PREnameEQ.length,PREc.length);
	}
	return null;
} 
 	function PREgetCurrentTime() {
 		var d=new Date(); 
 		return d.getTime(); 
 	} 
 	function PREengage(pPREtreatmentId) {
 		var name="chat"; 
 	    var params='width=520,height=650,left=30,top=10,menubar=no,scrollbars=0';
 		var win=window.open(PREchatUrl, name, params);
 	PREInvAcceptedCall(pPREtreatmentId); 
 	} 
 	 
 	function I2Cengage(pPREtreatmentId) {
 		aims_constructChatPostForm();
 	    if (isparkingClicked==true){ 
 		    aimsChatType[pPREtreatmentId]='C2C';
 	        isparkingClicked=false; 
 	       } 
 	    else {
 		aimsChatType[pPREtreatmentId]='I2C';
 	       } 
 		aims_startChat(pPREtreatmentId);
 	} 
 	 
 	function PREshowIcon() {
 		PreIconPosX=document.body.clientWidth -160;
 		document.all.icon.style.left=PreIconPosX;
 		document.all.icon.style.top =PreIconPosY;
 		document.all.icon.style.visibility = "visible";
 		setTimeout('PREsendPreRequest()',500);
 		PRElastAction="icoShown"; 
 	} 
 	function PREiconClicked(pPREtreatmentId) {
 		 document.all.PREAIMSLiveChatImg.style.visibility = "hidden";
 		 PREengage(pPREtreatmentId);
 	} 
 	function PREshowInvite() {
 		PREshowImage();
 	} 
 	function PREcheckImage() {
 		if (!PREsendImage) {
 			if(! PREcommandImage.complete){
 				PREimageLoading = true;
 			    setTimeout("PREcheckImage()",500);
 				return;
 			} 
 			var w=PREcommandImage.width;
 			var h=PREcommandImage.height;
 			PREimageLoading = false;
 			if (w==0) 
 			{	 
 				PREsendImage=true;
 				return;
 			} 
 			PREsendImage=true;
 			PREhandleImageCommand(w,h);
 		} 
 	} 
 	var closeInviteTitle="Close Invitation";
 	var inviteTitle="You are invited to chat";
 	var PREimageURL='';
	var preAccpCalltrys=0; 
	function PREInvAcceptedCall(pPREtreatmentId) {
	    if ( aimsChatType[pPREtreatmentId] == 'I2C' ) {
	        PRElastAction="invAccepted" + "." + pPREtreatmentId;
	    } 
	    else { 
	        PRElastAction="icoClicked" + "." + pPREtreatmentId;
	    } 
	    var cookieVal = readCookiePRE('AIMSSESSIONID'); 
	    if ( (preAccpCalltrys<preAccpCalltrysMax ) && ( cookieVal==null) ) {
			preAccpCalltrys=preAccpCalltrys + 1; 
			setTimeout('PREInvAcceptedCall('+pPREtreatmentId+')',1000); 
	    } 
	    else { 
			PREsendPreRequest(); 
	    } 
     } 
	function PREUserTrail(pRefresh, isPost) {
		try {
			if ( typeof submitHTMLSource != "undefined" ){				submitHTMLSource(pRefresh, isPost);  			        var pageURL=escape( window.document.location ); 
  			        var rule10PagesArray=['ordernew','accountreview/upgraderenewalcenter','existingservice','processsavecart' ,'reginvalid', 'foryoursmallbiz']; 
  			        if ( rule10PagesArray != 'undefined' ) { 
				        if ( rule10PagesArray.length==1 && rule10PagesArray[0]=='ALL') {
				            setInterval('submitHTMLSource("true", isPost)',40000); 
				        } 
				        else { 
                           for ( i=0; i<rule10PagesArray.length; i++  ) {
                                if ( pageURL.toLowerCase().indexOf( rule10PagesArray[i].toLowerCase() )>0 ) {
                                    setInterval('submitHTMLSource("true", isPost)',40000); 
                                    break; 
                                } 
                            } 
 				        } 
  			        } 
			} 		} 		catch(e){} 
	} 
 	function PREacceptCall(pPREtreatmentId) {
 		if (typeof AimsChatStatus == 'function') { 
 		    AimsChatStatus("A"); 
 		} 
 		 
 		if (isitDragged1) { 
 		  isitDragged1 = false; 
 		  return; 
 		} 
 		PREhideImage(); 
		if (I2CFlag==true)
 			I2Cengage(pPREtreatmentId);
 		else
 			PREengage(pPREtreatmentId);
 	} 
 	function PREparkingacceptCall(pPREtreatmentId) {
 		if (typeof AimsChatStatus == 'function') { 
 		    AimsChatStatus("A"); 
 		} 
 	    isparkingClicked = true; 
 		I2Cengage(pPREtreatmentId);
 	} 

//isAIMSNC method for New Connect.
function isAIMSNC(){ 
//aimsNcDBcode snippet from DB configuration.
return "false";
var returnVal = "false"; 
try { 
	var tempStr = "ABbC,ASD,"; 
	if (typeof aimsFlow != "undefined"  ) { 
		if (tempStr.indexOf(aimsFlow+",")!=-1) returnVal="true"; 
	} 
} catch (ignoreExep) {} 
return returnVal; 
} 

function isAIMSVECProactiveSuppressed(pPREtreatmentId){  
	var tempStr = "NONE"; 
//isAimsVecProactSupp snippet from DB configuration.
	tempStr = "884,914,890,936,889,913,995,997,998,1060,1061,"; 

try { 
		if((tempStr.indexOf(pPREtreatmentId) != -1))
		{ 
			return true; 
		} else { 
			return false; 
		}
	} catch (ignoreexp) {}; 
} 
 
 	function doNotShowVECProactiveAgain(){ 
       document.cookie = 'VEC_NO_PROACTIVE_SHOW=Y; path=/; domain=verizon.com;';  
 	}


function isTreatmentClick2Call(pPREtreatmentId){  
	var tempStr = "NONE"; 
//isTreatmentCall from DB configuration.
	tempStr = "722,820,893,871,837,865,933,929,"; 

	try { 
		var strButtonText = 'Live Chat'; 
		if((tempStr.indexOf(pPREtreatmentId) != -1))
		{ 
			strButtonText = 'Call Now'; 
		}
		return strButtonText; 
	} catch (ignoreexp) {}; 
} 
 	function PREwriteDoc(str) {
 		document.writeln(str); 
 	} 
 	function PREsetImageLoaded() {
 		PREImageLoaded=true;
 	} 
 	 function PRErejectCall(pPREtreatmentId) {
 		if (typeof AimsChatStatus == 'function') { 
 		    AimsChatStatus("R"); 
 		} 
 		PRElastAction="invDeclined" + "." + pPREtreatmentId;
 		PREhideImage(); 
			if (isAIMSVECProactiveSuppressed(pPREtreatmentId)) { 
					doNotShowVECProactiveAgain(); 
			} 
       setTimeout('PREsendPreRequest()',500);  
 	} 
 	function PREshowImage11() {
 		PREShowImage=true;
 		PREAnimate=true;
 	if (IE) { 
 			Border=document.body.clientWidth;
 		} else if (NS) {
 			Border=window.innerWidth;
 		} else if (DOM) {
 			Border=window.innerWidth;
 	} 
 		document.all.aimslayer.style.visibility="visible";
 		PREanimateImage();
 	} 
 	function PREhideImage() {
 		PREPos=-30;
 		PREDir=3;
 		PREShowImage=false;
 		if (IE) {
 			document.all.aimslayer.style.visibility='hidden';
 			document.all.PREAIMSLiveChatImg.style.visibility='hidden';
 			document.body.removeChild(aimslayer);
 		} else if (NS) {
 			document.layers.aimslayer.visibility='hidden';
 			//document.all.PREAIMSLiveChatImg.style.visibility='hidden';
 			//document.body.removeChild(aimslayer);
 			document.getElementById("PREAIMSLiveChatImg").style.visibility='hidden';
 			document.body.removeChild(document.getElementById("aimslayerHolder"));
 		} else if (DOM) { 
 			PREgetObj('aimslayer').style.visibility='hidden';
 			//document.all.PREAIMSLiveChatImg.style.visibility = 'hidden';
 			//document.body.removeChild(aimslayer);
 			document.getElementById("PREAIMSLiveChatImg").style.visibility='hidden';
 			document.body.removeChild(document.getElementById("aimslayerHolder"));
 		} 
 	} 
 	function PREhideIcon() {
 			document.all.icon.style.visibility="hidden";
 	} 
 	function PREimageToggler() {
 		if (PREShowImage && PREImageLoaded) {
 			var top;
 			var left;
 	 
 			if (IE) { 
 			    scrollPosY=0;
 			    scrollPosX=0;
 	            eval('try {' + 
 	                'if (typeof(document.documentElement) != "undefined") {'+
 	                    'scrollPosY=document.documentElement.scrollTop;'+
 	                    'scrollPosX=document.documentElement.scrollLeft;'+
 	                '}' + 
 	            '} catch (e) {}'); 
 	            scrollPosY=Math.max(document.body.scrollTop, scrollPosY);
 	            scrollPosX=Math.max(document.body.scrollLeft, scrollPosX);
 	            top=scrollPosY; 
 	           left=scrollPosX; 
 				if ((PreTop<0) || ((PreTop==top) && (PreLeft==left))) {
 					document.all.aimslayer.style.visibility='visible';
 					if(!PREFocusFlag){
 						document.all.needRef.focus();
 						PREFocusFlag=true;
 					}
 				} else {
 					document.all.aimslayer.style.visibility='hidden';
 				}
 			} else if (NS) {
 				top=PageYOffset; 
 				left=PageXOffset; 
 				if ((PreTop<0) || ((PreTop==top) && (PreLeft==left))) {
 					document.layers.aimslayer.visibility='visible';
 				} else { 
 					document.layers.aimslayer.visibility='hidden';
 				} 
 			} else if (DOM){
 				top=PageYOffset;
 				left=PageXOffset;
 				if ((PreTop<0) || ((PreTop==top) && (PreLeft==left))) {
 					PREgetObj('aimslayer').style.visibility='visible';
 					if(!PREFocusFlag){  
 						PREgetObj('needRef').focus();
 						PREFocusFlag=true;
 					} 
 				} else { 
 							PREgetObj('aimslayer').style.visibility='hidden';
 						} 
 					} 
 					PREplaceImage();
 					PreTop=top;
 					PreLeft=left;
 				} 
 				setTimeout('PREimageToggler()', 250); 
 			} 
 			function PREchangeImage(name, image, animate) {
 				PREAnimate=animate; 
 				var img=PREgetImage(document,name);
 				if(img!=null)  
 					img.src=PREimageURL+image;
 			} 
 			function PREgetImage(doc, name) {
 				if (DOM) 
					return doc.getElementsByTagName('IMG')[name]; 
 				var lays = doc.layers; 
 				if (! lays) 
 					return doc[name]; 
 				for (var i=0; i<doc.images.length; i++) {
 					if (doc.images[i].name==name)
 						return doc.images[i];
 				} 
 				for (var l=0; l<lays.length; l++) {
 					img=PREgetImage(lays[l].document, name);
 					if (img!=null)
 						return img;
 				} 
 				return null;
 			} 
 			function PREanimateImage(){
 			if (IE) { 
 				Border = document.body.clientWidth; 
 			} else if (NS) { 
 				Border=window.innerWidth;
 			} else if (DOM) { 
 				Border=window.innerWidth;
 			} 

 			if (PREAnimate && PREImageLoaded)
 			PREPos=PREPos + PREDir;  
 				if (PREPos > Border - 345 - 20 )  
 			PREDir = - PREHumanStep;  
 			PREplaceImage(); 
 			if ((PREPos > 30) || (PREDir > 0)) 
 			setTimeout('PREanimateImage()', 25); 
 			} 
 			function PREgetObj(id) {
 				if (document.getElementById) 
 					return document.getElementById(id); 
 				else if (document.all) 
 					return document.all(id); 
 			} 

			var preOnScroll = window.onscroll;
			window.onscroll=function(){
 				if( preOnScroll!=null ){
 					eval( "preOnScroll()" );
 				} 
 				if(PREImageLoaded)	
					PREchangePREImageOnScroll();
 			}; 

 			function PREplaceImage() {
 				var y=100; 
 				var x=PREPos; 
 				if (typeof(posX) != 'undefined')
 					x = posX;
 				if (typeof(posY) != 'undefined')
 					y = posY; 
 				var obj = null; 
 				if (IE) { 
 					obj=document.all.aimslayer.style;
 				} else if (NS) { 
 					obj=document.layers.aimslayer;
 				} else if (DOM) { 
 					obj=PREgetObj('aimslayer').style;
 				} 
 				if (IE) { 
 					scrollPosY=0;
 					scrollPosX=0;
 					eval('try {'+
 						'if (typeof(document.documentElement) != "undefined") {' + 
 							'scrollPosY = document.documentElement.scrollTop;' + 
 							'scrollPosX = document.documentElement.scrollLeft;' + 
 						'}' + 
 					'} catch (e) {}'); 
 					scrollPosY=Math.max(document.body.scrollTop, scrollPosY);
 					scrollPosX=Math.max(document.body.scrollLeft, scrollPosX);
 					obj.left=scrollPosX + x + 'px';
 					obj.top=scrollPosY + y + 'px';
 				} else if (NS) { 
 					obj.left=PageXOffset+x;
 					obj.top=PageYOffset+y;
 				} else if (DOM) { 
 					obj.left=PageXOffset+x+'px';
 					obj.top=PageYOffset+y+'px';
 				} 
 			} 
 		function PREchangePREImageOnScroll() {
 	           if ( isitDragged == true) { 
 			       return; 
 			    } 
 			try{
 			if ( PREShowImage ){
 				var y=100;
 				var x=PREPos;
 				if (typeof(posX) != 'undefined')
 					x=posX;
 				if (typeof(posY) != 'undefined')
 					y=posY;
 				var obj = null; 
 				if (IE) {
 					obj=document.all.aimslayer.style;
 				} else if (NS) { 
 					obj=document.layers.aimslayer;
 				} else if (DOM) { 
 					obj = PREgetObj('aimslayer').style;
 				} 
 				if (IE) { 
 					scrollPosY=0;
 					scrollPosX=0;
 					eval('try {' + 
 						'if (typeof(document.documentElement) != "undefined"){'+
 							'scrollPosY=document.documentElement.scrollTop;'+
 							'scrollPosX=document.documentElement.scrollLeft;'+
 						'}' + 
 					'} catch (e) {}'); 
 					scrollPosY = Math.max(document.body.scrollTop, scrollPosY); 
 					scrollPosX = Math.max(document.body.scrollLeft, scrollPosX); 
 					obj.left=scrollPosX+x+40+'px';
 					obj.top=scrollPosY+y+'px';
 				} else if (NS) { 
 					obj.left=PageXOffset+40+x;
 					obj.top=PageYOffset+y;
 				} else if (DOM) { 
 					try { 
 						if( typeof window.pageYOffset != 'undefined' ){ 
 							PageXOffset = window.pageXOffset; 
 							PageYOffset = window.pageYOffset; 
 						}  
 					} catch ( ex ) { }
 					obj.left=PageXOffset+x+40+'px'; 
 					obj.top=PageYOffset+y+'px'; 
 				} 
 				} 
 				}catch(ex){} 
 			} 
			function PRELearnFlowResetFlags(){
				PREstage = 'start';PREstopRequest = false;C2CFlag750 = true;resetPGS( '750' );
			}
			function callAIMSLearnFlowFlags(){
				//PREheartbeat();
			}
 			function PREUserTrailSafeSend(){
  			        if( !PREcommandImage.complete ) { 
  			            setTimeout('PREUserTrailSafeSend()', 500);  
  			            return; 
  			        } 
  			        var pageURL=escape( window.document.location ); 
					if(!isPost(pageURL)) { 
                      PREUserTrail("false", "false"); 
 	                } 
 	        } 
 			function isPost(pageURL){
  			        var pageSourceEnabledFlowArray=['pedro','cfstest2','creditfinalbill','fiosdataconfig','fdvoiceconfig','voiceconfig','hsiaconfig','dtvconfig','wrlsconfig','wrlsconfigphones','wirelessequipmentfeatureconfig','addtloffers','revieworder','billingcredit','creditaddlinfo','ddandtos','preferredcarrierchangeform','ordersummary','orderconfirmation','existingservice','directorderinglanding','addchangeservices','shopping','fiostv/plans','fiosinternet/plans','highspeedinternet','medium/solutions', 'medium/products', 'medium/about', 'medium/bundles', 'medium/resources' , 'medium/solutions', 'medium/products', 'medium/about', 'medium/bundles', 'medium/resources', 'smbportalweb', 'com/products', 'com/bundles', 'com/default', 'upgraderenewalcenter', 'selectservicesbundle', 'creditinformation','reginvalid.aspx','reg/authenticateandrequestpin','existingservice','processsavecart','mlp','smallbusiness/bolton', 'smallbusiness/iont','smallbusiness/bolton', 'smallbusiness/iont','ordernew/buildbundle','ordernew/customize','ordernew/billinginfo','ordernew/ordersummary','ordernew/orderconfirmation','ordernew/directordering','splOffersOverview','fiostvconfig','myverizonnew','contact-us','net/myvzslip','ordernew/ordersummaryslip','addressInfo','productrecommender','bundleoffers','payment/95756','broadbandTermOverview','nonPromoRolloff','internetspeedtest','healthcare-industry','ordering/checkavailability','ExistingOrder','VzConnections','EmployeeFlow','searchresults','campaign.verizon.com','expertcare','eActivation','expertcare','appsproductoverview','sso/stid','whatsnext','voiceoverview.jsp','enterprisecenter','businessDigitalVoice','accessories','registration/ngen/regstarted','verizonenterprise','SO/OrderNew','faux','bizspecial','ordersupp','BuildFios']; 
  			        if ( pageSourceEnabledFlowArray != 'undefined' ) { 
				        if ( pageSourceEnabledFlowArray.length==1 && pageSourceEnabledFlowArray[0]=='ALL') {
                           PREUserTrail("false", "true"); 
				            return "true"; 
				        } 
				        else { 
                           for ( i=0; i<pageSourceEnabledFlowArray.length; i++  ) {
                                if ( pageURL.toLowerCase().indexOf( pageSourceEnabledFlowArray[i].toLowerCase() )>0 ) {
                                    PREUserTrail("false", "true"); 
                                    return "true"; 
                                    break; 
                                } 
                            } 
 				        } 
  			        } 
                   return "false"; 
 			} 
 	function resetAIMSVariables(){
 		setTimeout('resetAgainAIMSVariables()', 2000); 
 			} 
 	function isPhoenixFlow(treatmentid){
  			        var phoenixTreatmentIdsArray=[937,960,942,938,939,940,941]; 
  			        var result="N"; 
  			        if ( phoenixTreatmentIdsArray != 'undefined' ) { 
                           for ( i=0; i<phoenixTreatmentIdsArray.length; i++  ) {
                                if ( treatmentid == phoenixTreatmentIdsArray[i]) {
                                    result="Y"; 
                                    break; 
                                } 
                            } 
   			        } 
 		return result; 
 			} 
 	function resetAgainAIMSVariables(){

      C2CFlag320 = true;       C2CFlag419 = true;       C2CFlag439 = true;       C2CFlag459 = true;       C2CFlag460 = true;       C2CFlag461 = true;       C2CFlag462 = true;       C2CFlag463 = true;       C2CFlag479 = true;       C2CFlag499 = true;       C2CFlag519 = true;       C2CFlag539 = true;       C2CFlag559 = true;       C2CFlag599 = true;       C2CFlag620 = true;       C2CFlag639 = true;       C2CFlag679 = true;       C2CFlag699 = true;       C2CFlag700 = true;       C2CFlag719 = true;       C2CFlag720 = true;       C2CFlag721 = true;       C2CFlag722 = true;       C2CFlag727 = true;       C2CFlag728 = true;       C2CFlag729 = true;       C2CFlag730 = true;       C2CFlag731 = true;       C2CFlag732 = true;       C2CFlag733 = true;       C2CFlag735 = true;       C2CFlag736 = true;       C2CFlag737 = true;       C2CFlag738 = true;       C2CFlag739 = true;       C2CFlag740 = true;       C2CFlag743 = true;       C2CFlag744 = true;       C2CFlag747 = true;       C2CFlag750 = true;       C2CFlag751 = true;       C2CFlag752 = true;       C2CFlag754 = true;       C2CFlag755 = true;       C2CFlag756 = true;       C2CFlag757 = true;       C2CFlag758 = true;       C2CFlag759 = true;       C2CFlag760 = true;       C2CFlag761 = true;       C2CFlag762 = true;       C2CFlag763 = true;       C2CFlag764 = true;       C2CFlag765 = true;       C2CFlag766 = true;       C2CFlag767 = true;       C2CFlag768 = true;       C2CFlag769 = true;       C2CFlag770 = true;       C2CFlag771 = true;       C2CFlag774 = true;       C2CFlag775 = true;       C2CFlag776 = true;       C2CFlag777 = true;       C2CFlag778 = true;       C2CFlag779 = true;       C2CFlag780 = true;       C2CFlag781 = true;       C2CFlag782 = true;       C2CFlag783 = true;       C2CFlag784 = true;       C2CFlag785 = true;       C2CFlag786 = true;       C2CFlag787 = true;       C2CFlag788 = true;       C2CFlag789 = true;       C2CFlag790 = true;       C2CFlag791 = true;       C2CFlag792 = true;       C2CFlag793 = true;       C2CFlag794 = true;       C2CFlag795 = true;       C2CFlag796 = true;       C2CFlag797 = true;       C2CFlag798 = true;       C2CFlag799 = true;       C2CFlag802 = true;       C2CFlag803 = true;       C2CFlag805 = true;       C2CFlag806 = true;       C2CFlag808 = true;       C2CFlag809 = true;       C2CFlag810 = true;       C2CFlag812 = true;       C2CFlag813 = true;       C2CFlag815 = true;       C2CFlag817 = true;       C2CFlag818 = true;       C2CFlag820 = true;       C2CFlag821 = true;       C2CFlag823 = true;       C2CFlag824 = true;       C2CFlag826 = true;       C2CFlag827 = true;       C2CFlag828 = true;       C2CFlag829 = true;       C2CFlag830 = true;       C2CFlag831 = true;       C2CFlag832 = true;       C2CFlag833 = true;       C2CFlag834 = true;       C2CFlag835 = true;       C2CFlag837 = true;       C2CFlag838 = true;       C2CFlag839 = true;       C2CFlag840 = true;       C2CFlag841 = true;       C2CFlag842 = true;       C2CFlag844 = true;       C2CFlag845 = true;       C2CFlag846 = true;       C2CFlag847 = true;       C2CFlag848 = true;       C2CFlag849 = true;       C2CFlag850 = true;       C2CFlag851 = true;       C2CFlag852 = true;       C2CFlag853 = true;       C2CFlag855 = true;       C2CFlag857 = true;       C2CFlag858 = true;       C2CFlag859 = true;       C2CFlag861 = true;       C2CFlag863 = true;       C2CFlag864 = true;       C2CFlag865 = true;       C2CFlag866 = true;       C2CFlag867 = true;       C2CFlag868 = true;       C2CFlag869 = true;       C2CFlag871 = true;       C2CFlag873 = true;       C2CFlag874 = true;       C2CFlag875 = true;       C2CFlag876 = true;       C2CFlag877 = true;       C2CFlag878 = true;       C2CFlag879 = true;       C2CFlag881 = true;       C2CFlag881 = true;       C2CFlag882 = true;       C2CFlag883 = true;       C2CFlag885 = true;       C2CFlag886 = true;       C2CFlag887 = true;       C2CFlag888 = true;       C2CFlag891 = true;       C2CFlag892 = true;       C2CFlag893 = true;       C2CFlag895 = true;       C2CFlag906 = true;       C2CFlag907 = true;       C2CFlag908 = true;       C2CFlag909 = true;       C2CFlag910 = true;       C2CFlag911 = true;       C2CFlag912 = true;       C2CFlag915 = true;       C2CFlag916 = true;       C2CFlag917 = true;       C2CFlag919 = true;       C2CFlag920 = true;       C2CFlag921 = true;       C2CFlag922 = true;       C2CFlag923 = true;       C2CFlag924 = true;       C2CFlag925 = true;       C2CFlag926 = true;       C2CFlag927 = true;       C2CFlag929 = true;       C2CFlag930 = true;       C2CFlag932 = true;       C2CFlag933 = true;       C2CFlag934 = true;       C2CFlag935 = true;       C2CFlag937 = true;       C2CFlag939 = true;       C2CFlag941 = true;       C2CFlag943 = true;       C2CFlag944 = true;       C2CFlag951 = true;       C2CFlag953 = true;       C2CFlag954 = true;       C2CFlag955 = true;       C2CFlag956 = true;       C2CFlag957 = true;       C2CFlag958 = true;       C2CFlag959 = true;       C2CFlag960 = true;       C2CFlag961 = true;       C2CFlag962 = true;       C2CFlag971 = true;       C2CFlag972 = true;       C2CFlag973 = true;       C2CFlag974 = true;       C2CFlag975 = true;       C2CFlag976 = true;       C2CFlag977 = true;       C2CFlag978 = true;       C2CFlag979 = true;       C2CFlag980 = true;       C2CFlag981 = true;       C2CFlag982 = true;       C2CFlag988 = true;       C2CFlag991 = true;       C2CFlag992 = true;       C2CFlag994 = true;       C2CFlag995 = true;       C2CFlag996 = true;       C2CFlag999 = true;       C2CFlag1001 = true;       C2CFlag1003 = true;       C2CFlag1004 = true;       C2CFlag1005 = true;       C2CFlag1006 = true;       C2CFlag1007 = true;       C2CFlag1008 = true;       C2CFlag1009 = true;       C2CFlag1010 = true;       C2CFlag1012 = true;       C2CFlag1013 = true;       C2CFlag1020 = true;       C2CFlag1021 = true;       C2CFlag1022 = true;       C2CFlag1023 = true;       C2CFlag1024 = true;       C2CFlag1025 = true;       C2CFlag1026 = true;       C2CFlag1027 = true;       C2CFlag1028 = true;       C2CFlag1029 = true;       C2CFlag1030 = true;       C2CFlag1031 = true;       C2CFlag1032 = true;       C2CFlag1033 = true;       C2CFlag1034 = true;       C2CFlag1035 = true;       C2CFlag1036 = true;       C2CFlag1037 = true;       C2CFlag1038 = true;       C2CFlag1039 = true;       C2CFlag1040 = true;       C2CFlag1041 = true;       C2CFlag1042 = true;       C2CFlag1043 = true;       C2CFlag1044 = true;       C2CFlag1045 = true;       C2CFlag1046 = true;       C2CFlag1047 = true;       C2CFlag1049 = true;       C2CFlag1050 = true;       C2CFlag1051 = true;       C2CFlag1052 = true;       C2CFlag1053 = true;       C2CFlag1054 = true;       C2CFlag1055 = true;       C2CFlag1056 = true;       C2CFlag1057 = true;       C2CFlag1059 = true;       C2CFlag1062 = true;       C2CFlag1063 = true;       C2CFlag1064 = true;       C2CFlag1065 = true; 
 	    aims_use_html_available_default = "Click here to chat with an Agent"; 
 		aims_use_html_unavailable = "Chat with an Agent not available at this moment."; 
 		aims_use_html_available_style = "cursor:pointer;color:#00afdb;font-weight:bold;"; 
 		aims_use_html_unavailable_style = "cursor:default;color:DarkRed;font-weight:bold;"; 
 		aims_use_html_available_class = null; 
 		aims_use_html_unavailable_class = null; 
 		aims_use_html_available_class_hover = null; 
 		aims_use_html_unavailable_class_hover = null; 
 		pacaf = new Array(); 
 		pacuf = new Array(); 
 		pacmuf = new Array(); 
 		aims_availability_check_interval ="30000"; 
 		aims_icon_type = 0; 
 		AimsChatStatusCount = 0; 
 		chatStatusSend = new Array();
 		checkImageCounter = new Array(); 
 		chatInitDone = new Array(); 
 		aims_customerInfoAppIdMap = new Array(); 
 		aims_customerInfo = new Array(); 
 		aims_customerExtraInfo = new Array(); 
 		aims_checkAvailabilityParams = new Array(); 
 		PREcommandImage; 
 		PREpageID; 
 	    PREtopWinowTitle=""; 
 		PREstage="start"; 
 		PREsendImage=true; 
 		PREreqWaitCount=0; 
 		PREimageLoading=false; 
 		PRElastAction="none"; 
 		PREPos=-30; 
 		PREoldPos=PREPos; 
 		Border=100; 
 		PREHumanStep= 1; 
 		PREDir=1; 
 		PageXOffset=0; 
 		PageYOffset=0; 
 		PREAnimate=false; 
 		PREShowImage=false; 
 	    PREParkingshowImage=false; 
 		PreTop=-1; 
 		PreLeft=-1; 
 		PREFocusFlag=false;
 		PREImageLoaded=false; 
 		PreIconPosY=100; 
 		PreIconPosX=0; 
 		PREstopRequest=false; 
 		PREimgName=null; 
 		pacia=new Array(); 
 		paciu=new Array(); 
 		pacimu=new Array(); 
 		pacu=new Array(); 
 		pacim=new Array(); 
 		pauid=new Array(); 
 		paift=new Array(); 
 		ptoia=new Array(); 
 		ptoimua=new Array(); 
 		ptoiua=new Array(); 
 		PREMasterTreatment=false; 
 		pauha=new Array(); 
 		PREStickyIcon=false; 
 		aims_icon_id = "aimsChatIcon"; 
 		aims_icon_x_pos = 0; 
 		aims_icon_y_pos = 0; 
 		aims_i2c_sendImage = new Array(); 
 		aims_i2c_commandImage = new Array(); 
 		i2c_checkImageCounter = 0; 
 		aims_i2c_checkImgTimer = new Array(); 
 		preGlobalStatusMap = new Array(); 
 		aims_i2c_chat_available_function = new Array(); 
 		aims_i2c_chat_unavailable_function = new Array(); 
 		aims_i2c_chat_mom_unavailable_function = new Array(); 
 		aimsChatType = new Array(); 
 		chatInProgress = "N"; 
 		chatIconElements = new Array(); 
 		aims_commandImage = new Array(); 
 		aims_sendImage = new Array(); 
 		aims_checkImgTimer = new Array(); 
 		aims_ctcChatWindowMaster = new Array(); 
 		aims_ctcChatWindow = null; 
 	    PRErequestUrl="https://collaborateext.verizon.com/pre/pre/pre.serv"; 
 	    PREchatUrl='/ForYourHome/ClickToChat/ChatWindow.aspx?chatType=InviteToChat'; 
 	    PREChatParams='width=472,height=320,menubar=no,scrollbars=0'; 
 	    PREcmdName='FiosOR7001'; 
 	    PREimageURL="https://collaborateext.verizon.com/pre/prescripts/images/"; 
 	    PREImageIconURL="https://collaborateext.verizon.com/pre/prescripts/images/"; 
 	    PREBaseURL="https://collaborateext.verizon.com"; 
 	    pre_chat_availability_url="https://collaborateext.verizon.com/aims/encore/ChatAvailabilityStatus.serv"; 
 	    aims_blank_image_url="https://collaborateext.verizon.com/pre/prescripts/images/AIMSChatLoading.gif"; 
 	    userTrailFlag=true; 
	    preAccpCalltrysMax=10; 
 	    I2CFlag=false; 
 	    closeInviteTitle="Close Invitation";
 	    inviteTitle="You are invited to chat";
 	    PREimageURL='';
	    preAccpCalltrys=0; 
        try { 
              if ( typeof document.getElementById("aimsparkinglayer") != "undefined"){ 
                document.getElementById("aimsparkinglayer").removeNode(true); } 
            } catch (ex) {};
  	    if ( heartBeatTimeoutVar != null ) { 
  	          clearTimeout (heartBeatTimeoutVar); 
 		} 
 		heartBeatTimeoutVar = setTimeout('PREheartbeat()', 100); 
 } 
	    var heartBeatTimeoutVar = null; 
 		heartBeatTimeoutVar = setTimeout('PREheartbeat()', 100); 
