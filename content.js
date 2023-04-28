chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.text === 'search') {
      var regex = new RegExp(request.regex, 'gi');
      var matches = Array.from(document.querySelectorAll('body, body *'))
  .filter(element => element.innerText && element.innerText.match(regex))
  .map(element => element.innerText.match(regex)[0]).reduce((accumulator, currentValue) => {
    if (!accumulator.includes(currentValue)) {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, []);
  alert(matches);
      sendResponse({result: matches});
    }
  });
  