// Listens for messages from the content script
chrome.runtime.onMessage.addListener(function (msg, sender) {
    // Validate the message's structure
    if ((msg.from === 'content')){ 

    	//enable or disable the page/browser action icon
    	if ((msg.subject === 'showPageAction')) {
	    	//alert(sender.tab.url);	    	

	        // Initiates the page action to show (aka the icon to be active) on this current tab
	        chrome.pageAction.show(sender.tab.id);
    	}else if ((msg.subject === 'hidePageAction')) {
	    	//alert(sender.tab.url);	    	

	        // Initiates the page action to show (aka the icon to be active) on this current tab
	        chrome.pageAction.hide(sender.tab.id);
    	}
    }

    // Validate the message's structure
    if ((msg.from === 'app')){

    	//send a message to all available and open tabs
    	if ((msg.subject === 'sendMsgAlTabsAction')){
    		
    		chrome.tabs.query({}, function(tabs) {
			    var message = {"from": "background", "subject": "updateAvailableCredits"};
			    
			    for (var i=0; i<tabs.length; ++i) {
			        chrome.tabs.sendMessage(tabs[i].id, message);
			    }
			});
    	}
    }
});

// Check when the page action icon
// is clicked by the user on activation
chrome.pageAction.onClicked.addListener(function(tab) {
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, {"from": "background", "subject": "clickedPageAction"});
	});
});

//Check if the history state of browser has changed or not
//Important for web applications which use SPA
//Because page refresh won't work here
chrome.webNavigation.onHistoryStateUpdated.addListener(function(data) {
	
	// Send a message to the active tab
	// in the content script
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var activeTab = tabs[0];
		chrome.tabs.sendMessage(activeTab.id, {"from": "background", "subject": "checkHistoryUpdated", "result": data});
	});
});

//Send message to all tabs
// chrome.tabs.query({}, function(tabs) {
//     var message = {foo: bar};
//     for (var i=0; i<tabs.length; ++i) {
//         chrome.tabs.sendMessage(tabs[i].id, message);
//     }
// });