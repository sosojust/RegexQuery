document.addEventListener('DOMContentLoaded', function() {
    var searchBtn = document.getElementById('search-btn');
    var regexInput = document.getElementById('regex-input');
    var presetsSelect = document.getElementById('presets');
    var copyBtn = document.getElementById('copy-btn');
    var currentTab;
  
    // Get the current tab when the popup is opened
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      currentTab = tabs[0];
    });
  
    
    // When the Search button is clicked, send a message to content.js
    searchBtn.addEventListener('click', function() {
      var regex;
        // 如果有预选择内容，优先选择预选择内容
      if (presetsSelect.value.length > 0) {
        regex = presetsSelect.value;
      }else{
        regex = regexInput.value;
      }
      if (regex.length > 0) {
        chrome.tabs.sendMessage(currentTab.id, {text: 'search', regex: regex}, function(response) {
          if (response.result.length > 0) {
            copyBtn.disabled = false;
            copyBtn.addEventListener('click', function() {
              copyToClipboard(response.result.join('\n'));
              alert('Copied to clipboard!');
            });
          }
        });
      }
    });
  
    // Copy the text to the clipboard
    function copyToClipboard(text) {
      var textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  
    // When a preset is selected, update the regex input field
    presetsSelect.addEventListener('change', function() {
      regexInput.value = presetsSelect.value;
    });
  });
  