const showSuccessBtn = document.getElementById("show-success-btn");
const showErrorBtn = document.getElementById("show-error-btn");
const refreshBtn = document.getElementById("refresh-caseInfo");

function transmitEvent(type, detail) {
  const event = new CustomEvent(type, {
    detail,
    bubbles: true,
    composed: true,
  });

  window.dispatchEvent(event);
}

showSuccessBtn.addEventListener("click", () => {
  transmitEvent('notificationBanner-show', {
    type: "success",
    header: "This is a success message from the button click.",
    content: "This is the content of the success message.",
  });
});

showErrorBtn.addEventListener("click", () => {
  transmitEvent('notificationBanner-show', {
    type: "error",
      header: "This is an error message from the button click.",
      content: "This is the content of the error message.",
  });
});

refreshBtn.addEventListener("click", () => {
  transmitEvent('caseInfoSummary-refresh', {});
});

const errorTypes = [
  'caseInfoSummary-isLoading',
  'caseInfoSummary-isLoaded',
  'caseInfoSummary-isError',
  'caseInfoSummary-refresh',
  'notificationBanner-show'
];

errorTypes.forEach((eventName) => {
  window.addEventListener(eventName, (e) => {
    console.log(`EVENT EMITTER: ${eventName}`, e.detail)
  });
});

window.addEventListener('cps-error', (e) => {
  transmitEvent('notificationBanner-show', {
    type: "error",
    header: "There was a serious error",
    content: e.detail.message
  });
});