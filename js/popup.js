/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
/*
function is_email(email){
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(filter.test(email)){
        return true;
    }
    else{
        return false;
    }
}

function is_name(name){
    if(name.length > 2){
        return true;
    }
    else{
        return false;
    }
}

function is_phone(phone){
     if(phone.length >= 10){
        return true;
    }
    else{
        return false;
    }
}
*/



jQuery(document).ready(function($) {
	
	//the variable to control the notification
	var PopUpNotification = {
		init : function(){
			$('.login_message').hide();
			$('.registration-message').hide();
			$('.login_successful').hide();
			$('.registration-successful').hide();
		},
		logininit : function(){
			$('.registration-message').hide();
			$('.registration-successful').hide();
			$('#sitemodal-login-submit-div').hide();
			$('#login-ajaxloader').show();
		},
		registrationinit : function(){
			$('.login_message').hide();
			$('.login_successful').hide();
			$('#registration-form-popup').hide();
			$('#register-ajaxloader').show();
		},
		
		registrationformhide : function(){
			$('.popup-registration-form').hide();
		},
		registrationformshow : function(){
			$('.popup-registration-form').show();
		},
		
		loginformhide : function(){
			$('.popup-login-form').hide();
		},
		loginformshow : function(){
			$('.popup-login-form').show();
		}
	}
	
	
	/*
	 *Main functionality
	 **/
	
	$('.popup-login').bind('click', function(){
		
		//if the widget button is pressed
		if($(this).attr('name') == 'popup-widge-loign-button'){
			PopUpNotification.registrationformhide();
			PopUpNotification.loginformshow();
		}
		else if($(this).attr('name') == 'popup-widge-reg-button'){
			PopUpNotification.loginformhide();
			PopUpNotification.registrationformshow();
		}
		else{
			PopUpNotification.registrationformshow();
			PopUpNotification.loginformshow();
		}

		//hiding all the notification divs
		PopUpNotification.init();

		var this_obj = this;
		var id = '#popup-content';

		//Get the screen height and width
		var blanketHeight = $(document).height();
		var blanketWidth = $(window).width();

		//Set heigth and width to blanket to fill up the whole screen
		$('#blanket').css({'width':blanketWidth,'height':blanketHeight});

		//transition effect        
		$('#blanket').fadeIn(1000);    
		$('#blanket').fadeTo("slow",0.8);    

		//Get the window height and width
		var winH = $(window).height();
		var winW = $(window).width();

		//Set the popup window to center
		$(id).css('top',  winH/2-$(id).height()/1.2);
		$(id).css('left', winW/2-$(id).width()/2);

		//transition effect
		$(id).show(1000);
		return false;
	})
          

		//if close button is clicked
	$('.close').click(function (e) {
		//Cancel the link behavior       
		$('#blanket').fadeOut();
		$('.window').slideUp();           
		return false;
	});        

	// now if someone tries to login

	$('.sitemodal-login-submit').bind('click', function(){		
		
		//initialize the process
		PopUpNotification.init();
		PopUpNotification.logininit();
		
		
		//starting ajax
		var redirect = window.location.href;	
		var fid = '#sitemodal-login-submit-form';
		var action = $(fid).attr('action');
		var username = $("input[type=text][name=log]").val();
		var password = $("input[type=password][name=pwd]").val();
				
		//login ajax

		$.ajax({
			url: action,
			data: 'log=' + username + '&pwd=' + password + '&testcookie=1',
			type: 'POST',
			cache: false,
			success: function (resp) {
				
				//inidcation
				$('#login-ajaxloader').hide();
				$('#sitemodal-login-submit-div').show();
				
				
				var error = $('#login_error', resp).html();
				if(error){
					$('.login_message').html($('#login_error', resp).html());					
					$('.login_message').show();
				}
				
				
				else{
					$('.login_successful').html("Redirecting............");
					$('.login_successful').show();
					window.location.href = redirect;
				}
								
				return false;
			},
			error : function(jqXHR, textStatus, errorThrown){
				$('#login-ajaxloader').hide();
				$('#sitemodal-login-submit-div').show();
				jQuery('#footer').html(textStatus);
				alert(textStatus);
				return false;
			}
		});
		return false;
	});

	/*
	 *handling the registration form
	 *
	 **/
	$('.button-register').bind('click', function(){
		
		
		//registratin process initializtion
		PopUpNotification.init();
		PopUpNotification.registrationinit()

		$.ajax({
			async : true,
			type : 'post',			
			dataType : "html",
			url : PopUp.ajaxurl,
			cache : false,
			timeout : 10000,
			data : {
				'action' : 'popup_user_registration',
				'salutation' : $('#salutation').val(),
				'fname' : $("input[type=text][name=fname]").val(),
				'lname' : $("input[type=text][name=lname]").val(),				
				'road' : $("input[type=text][name=road]").val(),				
				'place' : $("input[type=text][name=place]").val(),
				'land' : $("input[type=text][name=land]").val(),
				'username' : $("input[type=text][name=username]").val(),
				'email' : $("input[type=text][name=email]").val(),				
				'birth-day' : $('#birth-day').val(),				
				'birth-month' : $('#birth-month').val(),
				'birth-year' : $('#birth-year').val(),
				'password1' : $("input[type=password][name=password1]").val(),
				'password2' : $("input[type=password][name=password2]").val(),

			},

			success : function(resp){
				
				//indication
				$('#register-ajaxloader').hide();
				$('#registration-form-popup').show();
				
				
				if(resp == 'a'){
					$('.registration-successful').html("successfull");
					$('.registration-successful').show();
				}
				else{
					$('.registration-message').html($(resp).html());
					$('.registration-message').show();
				}				
				return false;
			},
			error : function(jqXHR, textStatus, errorThrown){
				$('#register-ajaxloader').hide();
				$('#registration-form-popup').show();
				jQuery('#footer').html(textStatus);
				alert(textStatus);
				return false;
			}
		});


		return false;
	})

  
});
