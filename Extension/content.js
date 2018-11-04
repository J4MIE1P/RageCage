var spaces = 0;
var checkText = true;

chrome.runtime.onMessage.addListener(
    function(request, sender, senderResponse) {
        if (request.message == 'status'){
            checkText = request.enabled;
        }
    });

document.addEventListener("input", function(event) {
    let t = event.target;
    let c = event.data;
    if (t.type == "text" || t.type == "input" || t.type == "textarea"){
        if(c !== null && c===' '){
            spaces+=1;
        }
        if(spaces >= 2 && checkText){
           spaces = 0;
           let text = t.value;
            chrome.runtime.sendMessage({message: 'input', data: text}, function(response) {
               if (response.value > .5){
                     alert('Chill out');
                 }
            });
        }
    }
    else if(t.type != "password"){
        if(c !== null && c===' '){
            spaces+=1;
        }
        if(spaces >= 2 && checkText){
           spaces = 0;
           let text = t.innerText;
            chrome.runtime.sendMessage({message: 'input', data: text}, function(response) {
               if (response.value > .5){
                     alert('Chill out');
                 }
            });
        }
    }
});