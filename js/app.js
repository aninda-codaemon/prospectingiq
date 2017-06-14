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
		var fx_ft_logo = chrome.extension.getURL('/img/iq32.png');
		var fx_ft_pw_logo = chrome.extension.getURL('/img/ktc_logo.png');

		//check if popup is already
		//in the page or not
		if ($('.popup').length <= 0){
	    	$('#prosiq_pop_holder').html(data);
	    	$('.popup').fadeIn();
		}

	    $('.close-button img').attr('src', cls_btn_icon);	    
	    $('img.clps_img_arrw').attr('src', clps_img_arrw);
	    $('img.clps_img_ic').attr('src', clps_img_ic);

	    $('img.fx-ft-logo').attr('src', fx_ft_logo);
	    $('img.fx-ft-pw-logo').attr('src', fx_ft_pw_logo);

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

		    		//KTC API URL
		    		//var ktc_url = 'https://api.knowthycustomer.com/v1/linkedin_lookup?api_key='+apiak+'&social_url='+lnkdinurl;
		    		ktc_url = chrome.runtime.getURL('sample.json');

		    		//call ajax with the url to fetch the user report
		    		$.ajax({
						url: ktc_url,
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
				        	console.log('Enrichment API response', jqXHR.responseJSON);
				        	var json_resp = jqXHR.responseJSON;
				        	var rem_crd = (jqXHR.getResponseHeader('x-ratelimit-remaining-year') != null)?parseInt(jqXHR.getResponseHeader('x-ratelimit-remaining-year')):0;
				        	var tot_crd = (jqXHR.getResponseHeader('x-ratelimit-limit-year') != null)?parseInt(jqXHR.getResponseHeader('x-ratelimit-limit-year')):0;

				        	var stdata = {apiak: items.ktcapiak.apiak, user_info: {r_crd: rem_crd, t_crd: tot_crd}};
				        	ktcinfo = stdata;
							chrome.storage.local.set({ktcapiak: stdata}, function() {
								console.log('Data updated in local');
							});

							if ($('.popup').length > 0){
								//get social icons
								var mail_icn = chrome.extension.getURL('img/icons/mail_icon.png');
								var mob_icn = chrome.extension.getURL('img/icons/mobile_icon.png');
								var shar_icn = chrome.extension.getURL('img/icons/share_icon.png');
								
								if (json_resp.entities.people.length > 0){
									$('#initial-state').html('');
									$('#login-box').html('');
									$('#social-data').html(data);						    	
							    	console.log('Social data displayed');

							    	$('img.mail-icn').attr('src', mail_icn);
							    	$('img.mob-icn').attr('src', mob_icn);
							    	$('img.sha-icn').attr('src', shar_icn);
							    	
							    	//getting the email ids
							    	//console.log('Email ids', json_resp.entities.people[0].contact.emails);
							    	var soc_email = json_resp.entities.people[0].contact.emails;

							    	if (soc_email.length > 1){
							    		$('#soc_eml_more').text('+' + (soc_email.length - 1) + ' more found');
							    	}

							    	$('#soc_eml_hl_all').html('');
							    	soc_email.forEach(function(emails){
							    		var allle = '';
							    		$('p.soc-eml-pri > a').text(emails.address);
							    		allle = '<p class="margin-0"><a href="javascript: void(0);" class="login-text">' + emails.address + '</a></p>';
							    		$('#soc_eml_hl_all').append(allle);
							    	});

							    	//console.log('Phone Nos.', json_resp.entities.people[0].contact.phones);
							    	var soc_phones = json_resp.entities.people[0].contact.phones;

							    	if (soc_phones.length > 1){
							    		$('#soc_pho_more').text('+' + (soc_phones.length - 1) + ' more found');
							    	}

							    	$('#soc_pho_hl_all').html('');
							    	soc_phones.forEach(function(phones){
							    		var allle = '';
							    		$('p.soc-pho-pri > a').text(usphone(phones.number));
							    		allle = '<p class="margin-0"><a href="javascript: void(0);" class="login-text">' + usphone(phones.number) + '</a></p>';
							    		$('#soc_pho_hl_all').append(allle);
							    	});

							    	//get all the social profiles
							    	var soc_prof = json_resp.entities.people[0].social.profiles;
							    	//console.log('Social profiles', soc_prof);

							    	soc_prof.forEach(function(profiles){
							    		//console.log('Profile', profiles);
							    		$('#soc_url_hl').html('');

							    		//generate the social block
							    		appendSocialBlock(profiles);
							    	});

						    	}else{
						    		console.log('Report for linkedin url not generated....');

						    		$.get(chrome.extension.getURL('/html/user_info_not_found.html'), function(data) {
						    			$('#initial-state').html('');
										$('#login-box').html('');
										$('#social-data').html(data);
										$('#usr_nof_nm_hl').text($('.pv-top-card-section__name').text());
						    		});
						    	}

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

var appendSocialBlock = function(prfdata){

	var fb_icn = chrome.extension.getURL('img/icons/fb_icon.png');
	var tw_icn = chrome.extension.getURL('img/icons/twitter_icon.png');
	var lnk_icn = chrome.extension.getURL('img/icons/linkedin_icon.png');
	var pnt_icn = chrome.extension.getURL('img/icons/pinterest.png');
	var gp_icn = chrome.extension.getURL('img/icons/google_plus_icon.png');
	var fs_icn = chrome.extension.getURL('img/icons/foursquare_icon.png');
	var am_icn = chrome.extension.getURL('img/icons/amazon_icon.png');
	var fl_icn = chrome.extension.getURL('img/icons/flickr_icon.png');
	var in_icn = chrome.extension.getURL('img/icons/instagram_icon.png');

	if (prfdata.site !== null){
		$.get(chrome.extension.getURL('/html/social_url_blocks.html'), function(data) {		
			
			if (prfdata.domain === 'linkedin.com'){
				appendSocialBlockData(data, prfdata);
				$('img.soc-rd-icn').last().attr('src', lnk_icn);
				
			}else if (prfdata.domain === 'amazon.com'){
				appendSocialBlockData(data, prfdata);
				$('img.soc-rd-icn').last().attr('src', am_icn);

			}else if (prfdata.domain === 'flickr.com'){
				appendSocialBlockData(data, prfdata);
		    	$('img.soc-rd-icn').last().attr('src', fl_icn);

			}else if (prfdata.domain === 'plus.google.com'){
				appendSocialBlockData(data, prfdata);
				$('img.soc-rd-icn').last().attr('src', gp_icn);

			}else if (prfdata.domain === 'cyber.law.harvard.edu'){
				//find image for cyber.law.harvard.edu

			}else if (prfdata.domain === 'whitepages.plus'){
				//find image for cyber.law.harvard.edu

			}else if (prfdata.domain === 'blog.beenverified.com'){
				//find image for cyber.law.harvard.edu

			}else if (prfdata.domain === 'beenverified.com'){
				//find image for cyber.law.harvard.edu

			}else if (prfdata.domain === 'twitter.com'){
				appendSocialBlockData(data, prfdata);
				$('img.soc-rd-icn').last().attr('src', tw_icn);

			}else if (prfdata.domain === 'facebook.com'){
				appendSocialBlockData(data, prfdata);
				$('img.soc-rd-icn').last().attr('src', fb_icn);

			}else if (prfdata.domain === 'pinterest.com'){
				appendSocialBlockData(data, prfdata);
				$('img.soc-rd-icn').last().attr('src', pnt_icn);
				
			}else if (prfdata.domain === 'foursquare.com'){
				appendSocialBlockData(data, prfdata);
				$('img.soc-rd-icn').last().attr('src', fs_icn);
				
			}else if (prfdata.domain === 'instagram.com'){
				appendSocialBlockData(data, prfdata);
				$('img.soc-rd-icn').last().attr('src', in_icn);
				
			}else if (prfdata.domain === 'en.gravatar.com'){
				//find image for en.gravatar.com
				
			}else if (prfdata.domain === 'en.gravatar.com'){
				//find image for en.gravatar.com
				
			}else if (prfdata.domain === 'gravatar.com'){
				//find image for gravatar.com
				
			}else if (prfdata.domain === 'angel.co'){
				//find image for angel.co
				
			}else if (prfdata.domain === 'klout.com'){
				//find image for klout.com
				
			}			
		});
	}
};

var appendSocialBlockData = function(htmldata, prfdata){
	$('#soc_url_hl').append(htmldata);
	var sh_icn = chrome.extension.getURL('img/share-icon.png');
	$('img.soc-sh-icn').last().attr('src', sh_icn);
	$('.soc-rd-url-btn').last().attr('data-href', prfdata.url);
	$('.soc-url-nm').last().text(capitalizeFirstLetter(prfdata.site));
}

$(document).on('click', '#soc_eml_more', function(event){
	event.preventDefault();

	$('.soc-eml-pri').hide();
	$('.soc-eml-more-p').hide();
	$('#soc_eml_hl_all').fadeIn();
});

$(document).on('click', '#soc_pho_more', function(event){
	event.preventDefault();

	$('.soc-pho-pri').hide();
	$('.soc-pho-more-p').hide();
	$('#soc_pho_hl_all').fadeIn();
});

$(document).on('click', '.eml_pho_shwall', function(event){
	event.preventDefault();
	$('#soc_eml_more').trigger('click');
	$('#soc_pho_more').trigger('click');
});

$(document).on('click', '.soc-rd-url-btn', function(event){
	event.preventDefault();
	console.log(event.target, $(event.target).parent());
	var url;

	if ($(event.target).is(':button')){
		url = $(event.target).attr('data-href');	
		window.open(url, '_blank');
		console.log('Redirect url: ', url);
	}else{
		url = $(event.target).parent().attr('data-href');	
		window.open(url, '_blank');
		console.log('Redirect url: ', url);
	}
});

var checkString = function(data) {
    return /^[a-z0-9_-]+$/i.test(data)
};

var removeTrailSlash = function (site) {     
    return site.replace(/\/$/, "");
}

var usphone = function (phone) {
    //normalize string and remove all unnecessary characters
    phone = phone.replace(/[^\d]/g, "");

    //check if number length equals to 10
    if (phone.length == 10) {
        //reformat and return phone number
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    }

    return null;
}

var capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}