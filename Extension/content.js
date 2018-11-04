let createModal = (modalContent) => {
  // Definitions
  let modal = document.createElement("div"),
      modalStyle = document.createElement("style"),
      modalCSS = '.js-modal{ position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(0, 0, 0, .1); max-width: 650px; border-radius: 5px; } .js-modal img, .js-modal iframe, .js-modal video{ max-width: 100%; } .js-modal-inner{ position: relative; padding: 10px; } .js-modal-close{ position: absolute; top: -10px; right: -10px; background-color: black; color: #eee; border-width: 0; font-size: 10px; height: 24px; width: 24px; border-radius: 100%; text-align: center; }',
      modalClose = '<button class="js-modal-close" id="js_modal_close">X</button>',
      theBody = document.getElementsByTagName('body')[0],
      theHead = document.getElementsByTagName('head')[0];

  // Add content and attributes to the modal
  modal.setAttribute("class", "js-modal");
  modal.innerHTML = '<div class="js-modal-inner">' + modalContent + modalClose + '</div>';
  theBody.appendChild(modal);

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
      modal.remove();
      modalStyle.remove();
    });
  }
}

var input_fields = document.querySelectorAll("input");
var spaces = 0;
for (var i = 0; i < input_fields.length; i++){
    let box = input_fields[i];
    let listener = box.addEventListener("input", function(event) {
    let c = event.data;
       if(c !== null && c===' '){
            spaces+=1;
            createModal('Hello modal');
       }
       if(spaces >= 2){
           spaces = 0;
           let text = box.value;
           chrome.runtime.sendMessage({message: 'input', data: text}, function(response) {
              if (response.value > .5){
                    alert('Chill out');
                }
           });
       }
    });
}
