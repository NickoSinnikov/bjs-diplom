const { response } = require("express");

let logoutButton = new LogoutButton();
logoutButton.action = function() {
    ApiConnector.logout((response) => {
        if (response.success === true) {
            location.reload();
        }
    });
}

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(result.data)
    }
});