// Model
var tabs = [];

// View
function renderTabs() {
  var tabList = $("#tab-list");
  tabList.empty();
  tabs.forEach(function (tab, index) {
    var listItem = $("<li>");
    var closeButton = $('<button class="close-tab">&times;</button>');
    var tabButton = $('<button class="tab-button">' + tab.title + "</button>");
    listItem.append(tabButton);
    listItem.append(closeButton);
    tabList.append(listItem);

    // Event listener for tab switching
    tabButton.on("click", function () {
      showTab(index);
    });

    // Event listener for closing tab
    closeButton.on("click", function (event) {
      event.stopPropagation(); // Prevent tab switch when closing
      closeTab(index);
    });
  });
}

function renderTabContent(index) {
  var tabContent = $("#tab-content");
  tabContent.empty();
  if (tabs[index]) {
    var tab = tabs[index];
    if (tab.url) {
      var iframe = $("<iframe>", {
        src: tab.url,
        frameborder: 0,
        scrolling: "auto",
        style: "width:100%;height:100%;",
      });
      tabContent.append(iframe);
    } else {
      var inputUrl = $(
        '<input type="text" class="url-input" placeholder="Enter URL">'
      );
      tabContent.append(inputUrl);

      inputUrl.on("keypress", function (event) {
        if (event.keyCode === 13) {
          var url = $(this).val();
          loadUrl(index, url);
        }
      });
    }
  }
}

// Controller
function addTab() {
  tabs.push({ title: "New Tab", url: "" });
  renderTabs();
  showTab(tabs.length - 1);
}

function closeTab(index) {
  tabs.splice(index, 1);
  renderTabs();
  if (index === tabs.length) {
    showTab(index - 1);
  } else {
    showTab(index);
  }
}

function showTab(index) {
  renderTabContent(index);
}

function loadUrl(index, url) {
  tabs[index].url = url;
  renderTabContent(index);
}

// Initialize
$(document).ready(function () {
  $("#add-tab").on("click", addTab);
  addTab(); // Initial tab
});
