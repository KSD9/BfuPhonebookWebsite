
const kinveyAppID = 'kid_rJ-ZpN9sW';
const kinveyAppSecret = '621af0adf1d240b6a321f78fb36285a2';
const kinveyServiceBaseUrl = 'https://baas.kinvey.com/';


function showView(viewId){
    $("main > section").hide();
    
    $("#" + viewId).show();
}

function showDelegateView(){

    showView('viewDelegate');

    $("#viewPhones").hide();
    $("#text").text ("Делегати");



}

function showRefereeView(){

    showView('viewPhones')
   
    $("#viewDelegate").hide();
	 $("#viewThirdLeague").hide();
	$("#viewCommision").hide();
    $("#text").text ("Съдий");
}
function showCommisionView(){
	showView('viewCommision')
	$("#viewPhones").hide();
    $("#viewDelegate").hide();
	 $("#viewThirdLeague").hide();
	
    $("#text").text ("Комисия");
	
}

function showThirdLeagueView(){
	showView('viewThirdLeague')
	$("#viewPhones").hide();
    $("#viewDelegate").hide();
	$("#viewCommision").hide();
	$("#text").text ("Трета Лига");
	
    
	
}
function login(){
    
    let authBase64 = btoa(kinveyAppID + ":" + kinveyAppSecret);
    let loginUrl = kinveyServiceBaseUrl + "user/" + kinveyAppID + "/login";
    let loginData = {
        username: $("#username").val(),
        password: $("#password").val(),
        
        
    };
    $.ajax ({
        method: "POST",
        url: loginUrl,
        data: loginData,
        headers: { "Authorization": "Basic " + authBase64 },
     success: loginSuccess,
		error: showAjaxError
    
        
        
    });



function loginSuccess(data,status){
        sessionStorage.authToken = data._kmd.authtoken;
        
        
        showInfo("Влязохте успешно!");
        
       showHideNavitagionLinks();
		
		
        
    }
}


	
function showInfo(messageText){
	
	$("#infoBox").text(messageText).show().delay(3000).fadeOut();
}

function showHideNavitagionLinks () {
    
    let loggedIn = sessionStorage.authToken != null;
    
    if(loggedIn) {
        
    $("#viewHome").hide();
    $("#viewPhones").show();
    $("#viewMenu").show();
    $("#viewDelegate").show();
	$("#viewCommision").show();
	$("#viewThirdLeague").show();
    $("footer").show();
    showRefereeView();
    
        
        
    } else {
          
    $("#viewHome").show();
    $("#viewPhones").hide();
    $("#viewMenu").hide();
    $("#viewDelegate").hide();
	$("#viewCommision").hide();
	$("#viewThirdLeague").hide();
    $("footer").hide();
        
    }
}



function showLogoutView(){
	
	sessionStorage.clear();
	
	showHideNavitagionLinks();
	
	
}
$(function(){
    
    
    
    $("#loginButton").click(login);
    
    
    
   $("#linkLogout").click( showLogoutView);

   



    $("#linkReferee").click(showRefereeView);
	  $("#linkCommision").click(showCommisionView);
	
   
         $("#linkDelegate").click(showDelegateView);
		 $("#linkThirdLeague").click(showThirdLeagueView);
         


    
    showHideNavitagionLinks()
}) 

function showAjaxError (data,status){
	let errorMsg = "Моля Въведете правилни данни!";
	$('#errorBox').text(errorMsg).show().delay(3000).fadeOut();
	
}
