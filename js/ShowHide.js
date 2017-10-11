
const kinveyAppID = 'kid_rJ-ZpN9sW';
const kinveyAppSecret = '621af0adf1d240b6a321f78fb36285a2';
const kinveyServiceBaseUrl = 'https://baas.kinvey.com/';


function showView(viewId){
    $("main > section").hide();
    
    $("#" + viewId).show();
    
}

function showHomeView(){
    
    showView('viewHome');
    
}



function showLoginView(){
    showView('viewLogin');
    
}
function login(){
    
    let authBase64 = btoa(kinveyAppID + ":" + kinveyAppSecret);
    let loginUrl = kinveyServiceBaseUrl + "user/" + kinveyAppID + "/login";
    let loginData = {
        username: $("#loginUser").val(),
        password: $("#loginPass").val(),
        
        
    };
    $.ajax ({
        method: "POST",
        url: loginUrl,
        data: loginData,
        headers: { "Authorization": "Basic " + authBase64 },
        success: loginSuccess,
        error: showAjaxError
    
        
        
    });
    
    function loginSuccess(data, status){
        sessionStorage.authToken = data._kmd.authtoken;
        
        showHideNavitagionLinks();
        showListBooksView();
        
        showInfo("Login Successful");
        
    }
    }
    
    
function showInfo(messageText){
    
    $("#infoBox").text(messageText).show().delay(3000).fadeOut();
}

function showRegisterView(){
    showView('viewRegister');
    
}
function register(){
    
    
}

function showListBooksView(){
    

    showView('viewList');
    
    let booksUrl = kinveyServiceBaseUrl + "appdata/" + kinveyAppID + "/Books";
    let authHeaders = {'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),};
   
    
        
        
    
    $.ajax ({
        method: "GET",
        url: booksUrl,
        headers: authHeaders,
        success: booksLoaded,
        error: showAjaxError
    
        
        
    });
    
    function booksLoaded(data, status){
        
        
        showInfo("BooksLoaded");
        alert(JSON.stringify(data));
}
}

function showCreateBooksView(){
    showView('viewCreate');
    
}
function createBook(){
    
    
}

function showLogoutView(){
    
    sessionStorage.clear();
    showHomeView();
    showHideNavitagionLinks();
    
    logoutInfo("bye bitch");
    
}
 function logoutInfo(messageText){
     $("#infoBox").text(messageText).show().delay(1300).fadeOut();
 }

function showHideNavitagionLinks () {
    
    let loggedIn = sessionStorage.authToken != null;
    
    if(loggedIn) {
        
    $("#viewHome").hide();
    $("#viewMenu").show();
    $("#viewPhones").show();
            
        
    } else {
           
    $("#viewHome").show();
    $("#viewMenu").hide();
    $("#viewPhones").hide();
        
    }
}
$(function(){
    
    
    $("#loginButton").click(login);
   
    
    
    showHomeView()
    showHideNavitagionLinks()
}) 

//--------------------------------------------------------------------------------//




    






function showAjaxError (data,status){
    let errorMsg = "Error: " + JSON.stringify(data);
    $('#errorBox').text(errorMsg).show();
    
}
