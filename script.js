let selectedText = "---";

const url = "http://103-45-246-83.cloud-xip.com:8100/"

const callDictSvc = (selectedText, lang) => {
    
    var newURL = url + "dict?lang=" + lang + "&query=" + encodeURI( selectedText);
    chrome.tabs.create({ url: newURL });
}

const setError = (error) => { 
    let info = "";
    if( error != null)
        info = "Error: " + error;
    
    document.getElementById("err").innerHTML = info;
}

document.getElementById("save-btn-en").addEventListener("click", function(e){
    setError( null);
    e.preventDefault();
    callDictSvc( selectedText, "en");
});


document.getElementById("save-btn-de").addEventListener("click", function(e){
    setError( null);
    e.preventDefault();
    callDictSvc( selectedText, "de");
});

window.onload = async () => {
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  let result;
  try {
    [{result}] = await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: () => getSelection().toString(),
    });
  } catch (e) {
    return; // ignoring an unsupported page like chrome://extensions
  }
  selectedText = result.trim();
  document.getElementById("selectedText").innerHTML=selectedText;    
}