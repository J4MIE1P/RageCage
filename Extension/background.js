chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({on: true}, function() {
        console.log('Initialized checkbox with value true!');
    });
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
            url = "http://127.0.0.1:5000/tone/" + request.data; //ex. http://127.0.0.1:5000/i hate you
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == XMLHttpRequest.DONE){
                    console.log(xhr.responseText);
                   senderResponse({value: xhr.responseText});
                }
            }
            console.log('start http');
            xhr.open('GET', url, false);
            xhr.send(null);
            //senderResponse({'xd': 'ayylmao'});
        }
    }
)