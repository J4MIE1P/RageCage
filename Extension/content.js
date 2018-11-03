var input_fields = document.querySelectorAll("input");
var spaces = 0;
for (var i = 0; i < input_fields.length; i++){
    let box = input_fields[i];
    let listener = box.addEventListener("input", function(event) {
    let c = event.data;
       if(c !== null && c===' '){
            spaces+=1;
            console.log(spaces);
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