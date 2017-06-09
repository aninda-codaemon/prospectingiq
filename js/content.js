// This script gets loaded when the page that matches the regular expression in manifest.json gets loaded too.
// It sends a message to background.js (which is the supreme communicator channel) to say, "Hey, show the page action, this page matches our criteria."
var bro_url = window.location.href;

//check if user is looking 
//into the connection profile
if (/linkedin.com/.test(bro_url)){
	console.log('from linkedin');

	if (/\/in\//.test(bro_url)){
		console.log('Enable page action icon');

		chrome.runtime.sendMessage({
		    from:    'content',
		    subject: 'showPageAction'
		});
	}else{
		console.log('Disable page action icon');
		
		chrome.runtime.sendMessage({
		    from:    'content',
		    subject: 'hidePageAction'
		});
	}
}else{
	console.log('other url');
}

//Get all messages on content js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	if (request.from === "background"){

		//check if user history is updated or not
		if (request.subject === "checkHistoryUpdated"){
			
			var tab_url = request.result.url;

			//check if user is looking 
			//into the connection profile
			if (/\/in\//.test(tab_url)){
				console.log('Enable page action icon');

				chrome.runtime.sendMessage({
				    from:    'content',
				    subject: 'showPageAction'
				});

				if ($('#prosiq_pop_holder').length <= 0){					
					console.log('Popup not opened');
				}else{
					console.log('Popup opened');
					
					//initiate the popup modal div
					initpop();
				}

			}else{
				console.log('Disable page action icon');

				chrome.runtime.sendMessage({
				    from:    'content',
				    subject: 'hidePageAction'
				});
			}
		}
		// Check background message for page action 
		// icon clicked by the user
		else if (request.subject === "clickedPageAction"){
			console.log('Page action icon is clicked');
			console.log('Injecting the modal popup.....');

			if ($('.collapse-icon').length <= 0){
				if($('.collapse-icon').is(":visible")) {
					$('.collapse-icon').hide();
				}
			}
			
			//initiate the popup modal div
			initpop();			
		}else if (request.subject === "updateAvailableCredits"){
			console.log('Received message from background', request);
		}
	}
});

