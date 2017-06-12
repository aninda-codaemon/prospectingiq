var ktcinfo;

// Function to initialise the 
// chrome extension popup
var initpop = function(){

	if ($('#prosiq_pop_holder').length <= 0){
		$('body').append('<div id="prosiq_pop_holder"></div>');
		$('body').append('<div class="collapse-icon"><div class="arrow-left" style="float: left;"><img src="img/back_icon_32.png" class="custom-arrow clps_img_arrw"></div><div class="logo"><img src="img/iq_logo_32.png" class="logo-margin clps_img_ic"></div></div>');
	}
	
	// if($('.collapse-icon').is(":visible")) {
	// 	$('.collapse-icon').hide();
	// }
	
	//hide the credit display information
	if ($('.credit-button').is(":visible")){
		$('.credit-button').hide();
	}

	$.get(chrome.extension.getURL('/html/container.html'), function(data) {
		//get the close btn
		var cls_btn_icon = chrome.extension.getURL('/img/close_icon.png');		
		var clps_img_arrw = chrome.extension.getURL('/img/back_icon_32.png');
		var clps_img_ic = chrome.extension.getURL('/img/iq32.png');

		//check if popup is already
		//in the page or not
		if ($('.popup').length <= 0){
	    	$('#prosiq_pop_holder').html(data);
	    	$('.popup').fadeIn();
		}

	    $('.close-button img').attr('src', cls_btn_icon);	    
	    $('img.clps_img_arrw').attr('src', clps_img_arrw);
	    $('img.clps_img_ic').attr('src', clps_img_ic);

	    $('img.topsection__image').attr('src', $('img.pv-top-card-section__image').attr('src'));
	    $('.topsection__name').html($('.pv-top-card-section__name').text());
	    $('.topsection__headline').html($('.pv-top-card-section__headline').text());

    	$('.topsection__company').html($('h3.pv-top-card-section__company').text());
    	if ($('h3.pv-top-card-section__school').text().length > 0){$('.topsection__school').html(" | " + $('h3.pv-top-card-section__school').text());}
    	$('.topsection__location').html($('h3.pv-top-card-section__location').text());
    	
    	checkLogin();
	});
}

var checkLogin = function(){

	chrome.storage.local.get("ktcapiak", function(items) {
	    if (!chrome.runtime.error) {
	      	console.log('Check login storage data');

		    if (items.ktcapiak === undefined){
		    	console.log('Show login page');

		    	$.get(chrome.extension.getURL('/html/login.html'), function(data) {
		    		if ($('.popup').length > 0){
		    			$('#initial-state').html('');
		    			$('#social-data').html('');
				    	$('#login-box').html(data);	
				    	var logo_icon = chrome.extension.getURL('/img/logo.png');
				    	$('img.login-box-logo').attr('src', logo_icon);			    	
					}
		    	});
		    }else{
		    	console.log('Show retrieve information', items.ktcapiak);

		    	//set the global variable
		    	ktcinfo = items.ktcapiak;

		    	$.get(chrome.extension.getURL('/html/initial_state.html'), function(data) {
		    		if ($('.popup').length > 0){
		    			console.log('Current url', window.location.href);
				    	$('#login-box').html('');
				    	$('#social-data').html('');
						$('#initial-state').html(data);						
						$('#rt_inf_nm').html($('.pv-top-card-section__name').text());				    	
				    	$('#ret_cnt_inf_btn').attr('data-href', window.location.href);
					}
		    	});
		    }
	    }else{
	    	console.log('Login storage error', chrome.runtime.error);
	    }
  	});
}

var checkLogout = function(){
	$.get(chrome.extension.getURL('/html/login.html'), function(data) {
		if ($('.popup').length > 0){
			$('#initial-state').html('');
			$('#social-data').html('');
	    	$('#login-box').html(data);
	    	var logo_icon = chrome.extension.getURL('/img/logo.png');
	    	$('img.login-box-logo').attr('src', logo_icon);
	    	console.log('Logged out');	    	
		}
	});
}

//popup close click
$(document).on('click', '.close-button a', function(event){
	event.preventDefault();
	console.log('Event Popup Closed');
	$('#prosiq_pop_holder').fadeOut();
	$('#prosiq_pop_holder').remove();
});

// $(document).click(function(event) {
// 	console.log('Event Target', event.target.nodeName);

// 	if (!$(event.target).hasClass('clps_img_arrw')){

// 	    if(!$(event.target).closest('.popup').length) {
// 	    	console.log('Event target not closer to popup');

// 	        if($('.popup').is(":visible")) {
// 	        	//$('.popup').hide();
// 	        	//$('.close-button a').trigger('click');
// 	        	$('.popup').fadeOut();
// 	        	$('.collapse-icon').fadeIn();
// 	        	console.log('Popup is visible');        	
// 	        }else{
// 	        	console.log('Popup is not visible');

// 	        	if ($('.popup').length > 0){
// 	        		$('.collapse-icon').fadeIn();
// 	        	}	        	
// 	        }
// 	    }else{
// 	    	console.log('Event target closer to popup');
// 	    }
// 	}

// 	if (!$(event.target).hasClass('clps_img_arrw')){
// 		if (event.target.id == 'prosiq_pop_holder' || $(event.target).parents("#prosiq_pop_holder").length){
// 			console.log('Inside Popup Div');
// 		}else {
			
// 			if($('.popup').is(":visible")) {
// 	        	//$('.popup').hide();
// 	        	//$('.close-button a').trigger('click');
// 	        	$('.popup').fadeOut();
// 	        	$('.collapse-icon').fadeIn();
// 	        	console.log('Popup is visible');      	
// 	        }else{
// 	        	console.log('Popup is not visible');

// 	        	if ($('.popup').length > 0){
// 	        		$('.collapse-icon').fadeIn();
// 	        	}	        	
// 	        }

// 			console.log('Outside Popup Div');
// 		}
// 	}
// });

// $(document).on('click', '.arrow-left', function(event){
// 	event.preventDefault();
// 	$('.collapse-icon').fadeOut();
// 	$('.popup').fadeIn();
// });

// Click on the get 
// access API button
$(document).on('click', '#s_a_k_btn', function(event){
	event.preventDefault();

	var flag = 0;
	var apiak = $('#api_access_key');

	//console.log(checkString($.trim(apiak.val())));
	if ($.trim(apiak.val()) === '' || checkString($.trim(apiak.val())) === false){
		console.log('Data has error');
		$('#apiak_msg').text('Improper input value');
		return false;
	}else{
		$('#apiak_msg').text('');
		console.log('Data has no error', $('#api_access_key').val());
	}

	//save the data in chrome local storage
	var stdata = {apiak: $.trim(apiak.val()), user_info: {}};
	chrome.storage.local.set({ktcapiak: stdata}, function() {
		checkLogin();

		//send message to all tabs to update
		//popup in all tabs
		// chrome.runtime.sendMessage({
		//     from:    'app',
		//     subject: 'sendMsgAlTabsAction'
		// });
	});

	//use ajax to call API for
	//getting the user credits
	// console.log('Decode uri',decodeURI('https://api.knowthycustomer.com/v1/linkedin_lookup?api_key=240a660ce9024b05b222b8ffb8b709ea&social_url=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fjoc3rd'));
	// $.ajax({
	// 	url: 'https://api.knowthycustomer.com/v1/linkedin_lookup?api_key=240a660ce9024b05b222b8ffb8b709ea&social_url=https://www.linkedin.com/in/subhasish-karmakar-335b85111/',
	// 	data: {access_key: $.trim(apiak.val())},
	// 	type: 'GET',
	// 	dataType: 'json',
	// 	cache: false,
	// 	// success: function(response){
	// 	// 	console.log('Access Key Check API Response', response.status);

	// 	// 	//save the data in chrome local storage
	// 	// 	var stdata = {apiak: $.trim(apiak.val()), user_info: {user_credits: 13}};
	// 	// 	chrome.storage.local.set({ktcapiak: stdata}, function() {
	// 	// 		checkLogin();

	// 	// 		//send message to all tabs to update
	// 	// 		//popup in all tabs
	// 	// 		// chrome.runtime.sendMessage({
	// 	// 		//     from:    'app',
	// 	// 		//     subject: 'sendMsgAlTabsAction'
	// 	// 		// });
	// 	// 	});
	// 	// },
	// 	// error: function(xhr, error){
 //  //       	console.debug('Login ajax error xhr', xhr); 
 //  //       	console.debug('Login ajax error', error);
 // 	// 	}
	// }).done(function(data, textStatus, jqXHR){
	// 	console.log('Login ajax xhr all remain', jqXHR.getResponseHeader('x-ratelimit-remaining-year'));
	// 	console.debug('Login ajax done xhr limit', jqXHR.getResponseHeader('x-ratelimit-limit-year')); 
 //        console.debug('Login ajax done textStatus', textStatus);
 //        console.debug('Login ajax done data', data);

 //        //save the data in chrome local storage
	// 	var stdata = {apiak: $.trim(apiak.val()), user_info: {user_credits: 13}};
	// 	// chrome.storage.local.set({ktcapiak: stdata}, function() {
	// 	// 	checkLogin();

	// 	// 	//send message to all tabs to update
	// 	// 	//popup in all tabs
	// 	// 	// chrome.runtime.sendMessage({
	// 	// 	//     from:    'app',
	// 	// 	//     subject: 'sendMsgAlTabsAction'
	// 	// 	// });
	// 	// });
	// });	
});

//Click on the button to handle data retrieval from KTC
$(document).on('click', '#ret_cnt_inf_btn', function(event){
	event.preventDefault();
	console.log('Retrieve contact info btn', $(this).attr('data-href'));
	console.log('Retrieve contact info btn user info', ktcinfo);

	//remove the ktc info stored in local storage
	//chrome.storage.local.remove("ktcapiak", function() {})
	//checkLogout();
	//return 0;

	chrome.storage.local.get("ktcapiak", function(items) {
	    if (!chrome.runtime.error) {
	      	console.log('Check login storage data');

		    if (items.ktcapiak === undefined){
		    	console.log('Retrieve report not logged in');
		    	checkLogin();
		    }else{
		    	if (items.ktcapiak.apiak === undefined){
		    		console.log('Retrieve report no api key');
		    		checkLogin();	
		    	}else{
		    		var apiak = items.ktcapiak.apiak;
		    		var lnkdinurl = encodeURI(removeTrailSlash($('#ret_cnt_inf_btn').attr('data-href')));
		    		//apiak = '240a660ce9024b05b222b8ffb8b709ea';
		    		console.log(lnkdinurl);
		    		//return 1;

		    		//call ajax with the url to fetch the user report
		    		$.ajax({
						url: 'https://api.knowthycustomer.com/v1/linkedin_lookup?api_key='+apiak+'&social_url='+lnkdinurl,
						data: {},
						type: 'GET',
						dataType: 'json',
						crossDomain: true,
						contentType: 'application/json',
						/*headers: {						    
						    'Content-Type':'application/json'
						  },
						cache: false*/
						error: function(jqXHR, textStatus, errorThrown){
							console.log('Ajax error', errorThrown);
							console.log('Ajax jqXHR', jqXHR.responseJSON.message);
							console.log('Ajax jqXHR', jqXHR);
							console.log('Ajax text status', textStatus);

							if (jqXHR.status == 403){
								console.log('Invalid API Key, Back To Login Form');
								chrome.storage.local.remove("ktcapiak", function() {})
								checkLogout();
								$('#apiak_msg').text(jqXHR.responseJSON.message);
							} else if (jqXHR.status == 429) {
								console.log('Credit limit exceeded');

								//display the credit limit exceeded message
								$.get(chrome.extension.getURL('/html/credit_limit.html'), function(data) {
									$('#initial-state').html('');
									$('#social-data').html('');
									$('#credit-limit').html(data).fadeIn();
									$('#usr_crd_sh_st').text(0);
						    		$('.credit-button').fadeIn();
						    		$('.credit-button').addClass('credit-button-pink');
								});
							}
						}
					}).done(function(response, textStatus, jqXHR){
						console.log('Login ajax xhr all remain', jqXHR.getResponseHeader('x-ratelimit-remaining-year'));
						console.debug('Login ajax done xhr limit', jqXHR.getResponseHeader('x-ratelimit-limit-year')); 
				        console.debug('Login ajax done textStatus', textStatus);
				        console.debug('Login ajax done response', response);

				        $.get(chrome.extension.getURL('/html/social_data.html'), function(data) {
				        	console.log('Enrichment API response', jqXHR.responseText);
				        	var rem_crd = parseInt(jqXHR.getResponseHeader('x-ratelimit-remaining-year'));
				        	var tot_crd = parseInt(jqXHR.getResponseHeader('x-ratelimit-limit-year'));

				        	var stdata = {apiak: items.ktcapiak.apiak, user_info: {r_crd: rem_crd, t_crd: tot_crd}};
				        	ktcinfo = stdata;
							chrome.storage.local.set({ktcapiak: stdata}, function() {
								console.log('Data updated in local');
							});

							if ($('.popup').length > 0){
								$('#initial-state').html('');
								$('#login-box').html('');
								$('#social-data').html(data);						    	
						    	console.log('Social data displayed');

						    	if ($('.credit-button').length > 0){
						    		$('#usr_crd_sh_st').text(rem_crd);
						    		$('.credit-button').fadeIn();
						    	}
							}
						});

				        //save the data in chrome local storage
						// var stdata = {apiak: $.trim(apiak.val()), user_info: {user_credits: 13}};
						// chrome.storage.local.set({ktcapiak: stdata}, function() {
						// 	checkLogin();

						// 	//send message to all tabs to update
						// 	//popup in all tabs
						// 	// chrome.runtime.sendMessage({
						// 	//     from:    'app',
						// 	//     subject: 'sendMsgAlTabsAction'
						// 	// });
						// });
					});
		    	}
		    }
		}else{
			console.log('Chrome internal error report generate API', chrome.runtime.error);
		}
	});
});

var checkString = function(data) {
    return /^[a-z0-9_-]+$/i.test(data)
};

var removeTrailSlash = function (site) {     
    return site.replace(/\/$/, "");
}