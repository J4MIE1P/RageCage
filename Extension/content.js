var input_fields = document.querySelectorAll("input");
var text_areas = document.querySelectorAll("textarea")
var spaces = 0;
for (var i = 0; i < input_fields.length; i++){
    let box = input_fields[i];
    let listener = box.addEventListener("input", function(event) {
    let c = event.data;
       if(c !== null && c===' '){
            spaces+=1;
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
for (var i = 0; i < text_areas.length; i++){
    let box = text_areas[i];
    let listener = box.addEventListener("input", function(event) {
    let c = event.data;
       if(c !== null && c===' '){
            spaces+=1;
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