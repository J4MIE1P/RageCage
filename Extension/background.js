chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher ({
                pageUrl: {hostEquals: 'developer.chrome.com'}
            })
            ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, senderResponse){
        if(request.message === 'input'){
            console.log(request.data);
        }
        senderResponse();
    }
)
/*
function getScore(text){
    console.log(text);
    *do HTTP stuff*
}
  */