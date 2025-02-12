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

let ratesBoard = new RatesBoard();

function getCurrencyRate() {
    ApiConnector.gerStocks(response => {
        if (response.success) {
            RatesBoard.clearTable();
            RatesBoard.fillTable(result.data);
        }
    });
}
getCurrencyRate();
setInterval(getCurrencyRate, 60000);

let moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(result.data);
            MoneyManager.setMessage(response.success, 'Баланс пополнен')
        } else {
            MoneyManager.setMessage('Ошибка пополнения');
        }
    })
}
moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(result.data);
            MoneyManager.setMessage(response.success, 'Ковертирование  выполнено')
        } else {
            MoneyManager.setMessage('Ошибка конвертации');
        }
    })
}
moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(result.data);
            MoneyManager.setMessage(response.success, 'Перевод  выполнен')
        } else {
            MoneyManager.setMessage('Ошибка перевода');
        }
    });
}
let favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(result.data);
        moneyManager.updateUsersList(result.data);
    }
});
favoritesWidget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(result.data);
            moneyManager.updateUsersList(result.data);
            favoritesWidget.setMessage('Пользователь добавлен')
        } else {
            favoritesWidget.setMessage('Ошибка добавления пользователя')
        }
    });
}
favoritesWidget.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(result.data);
            moneyManager.updateUsersList(result.data);
            favoritesWidget.setMessage('Пользователь удален')
        } else {
            favoritesWidget.setMessage('Ошибка удаления пользователя')
        }
    });
}