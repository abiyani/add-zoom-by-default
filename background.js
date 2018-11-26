chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
  if (/calendar.google.com.*\/eventedit$/i.test(details.url)) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { execute_setCalendarDefaults: true });
    });
  }
});