function setCalendarDefaults(call_count = 0) {
  // Note that we anchor the regexp at end to make sure there is nothing after '/eventedit'
  // in URL. This is to avoid clicking on the button when editing an existing event.
  // TODO: We can make this an optional feature - show user a prompt maybe when editing ?
  if (/calendar.google.com.*\/eventedit$/i.test(window.location.toString())) {
    var zoom_button = document.getElementById("zoom_schedule_button");
    // DOM loading might be delayed, so retry 5 times with some backoff.
    if (call_count < 5 && zoom_button == null) {
      window.setTimeout(function () { setCalendarDefaults(call_count + 1) }, 500 * (call_count + 1));
      return;
    }
    if (zoom_button !== null && zoom_button.style.display.toLowerCase() != "none") {
      console.log("Clicking on 'Make it a Zoom meeting' button");
      zoom_button.click();
    } else {
      console.log("No 'Make it a Zoom meeting' button found on the page");
    }
  }
}
setCalendarDefaults(0);
chrome.runtime.onMessage.addListener(
  function (request) {
    if (request.execute_setCalendarDefaults == true) {
      setCalendarDefaults(0);
    }
  }
);
