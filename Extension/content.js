window.is_modal_open = false

//acknowledged = false

let createModal = (modalContent) => {
  // Definitions

  let modal = document.createElement("div"),
      modalStyle = document.createElement("style"),
      modalCSS = '.js-modal{ position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); max-width: 650px; border-radius: 5px; } .js-modal img, .js-modal iframe, .js-modal video{ max-width: 100%; } .js-modal-inner{ position: relative; padding: 10px; } .js-modal-close{ position: absolute; top: -10px; right: -10px; background-color: white; color: #000000; border-width: 0; font-size: 10px; height: 24px; width: 24px; border-radius: 100%; text-align: center; }',
      modalClose = '<button class="js-modal-close" id="js_modal_close">X</button>',
      theBody = document.getElementsByTagName('body')[0],
      theHead = document.getElementsByTagName('head')[0];

  // Add content and attributes to the modal
  modal.setAttribute("class", "js-modal");
  modal.innerHTML = '<div class="js-modal-inner">' + modalContent + modalClose + '</div>';
  theBody.appendChild(modal);
  window.is_modal_open = true;

  modalClose = document.querySelector("#js_modal_close");

  // Add the modal styles dynamically
  if(modalStyle.styleSheet){
      modalStyle.styleSheet.cssText = modalCSS;
  } else {
      modalStyle.appendChild(document.createTextNode(modalCSS));
  }
  theHead.appendChild(modalStyle);

  // Close the modal on button-click
  if(modalClose) {
    modalClose.addEventListener('click', function() {
      window.is_modal_open = false
      modal.remove();
      modalStyle.remove();
    });
  }
  setTimeout(function(){

   window.is_modal_open = false
      modal.remove();
      modalStyle.remove(); 
      //acknowledged = true
    }, 3000);
}


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
            let old_length = t.dataset.rageCageProcess || 0;
            let text = t.value.slice(+old_length);
            chrome.runtime.sendMessage({message: 'input', data: text}, function(response) {
               if (response.value > .5 && window.is_modal_open === false){
                    createModal('We noticed you might be angry!')
                    box.dataset.rageCageProcess = box.value.length;
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
           let old_length = box.dataset.rageCageProcess || 0;
           let text = t.innerText.slice(+old_length);
            chrome.runtime.sendMessage({message: 'input', data: text}, function(response) {
               if (response.value > .5 && window.is_modal_open === false){
                    createModal('We noticed you might be angry!')
                    box.dataset.rageCageProcess = box.value.length;
                 }
            });
        }
    }
});
