var slider = document.getElementById("toggleOnOff");

chrome.storage.sync.get(['on'], function(result) {
  slider.checked = result.on;
});

slider.addEventListener('change', function (){
  chrome.storage.sync.set({on: slider.checked}, function() {
    console.log('switched!');
  });
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {message: 'status', enabled: slider.checked}, function(response) {
      console.log('hit me');
    });
  });
});

