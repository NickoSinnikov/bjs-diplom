// для авторизации
let userForm = new UserForm();
userForm.loginFormCallback = function(data) {
    ApiConnector.login(data, (response) => {

        if (response.success === true) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(`Произошла ошибка: ${response.error}`);
        }
    });
}

//для регистрации
userForm.registerFormCallback = function(data) {
    ApiConnector.register(data, (response) => {

        if (response.success === true) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(`Произошла ошибка: ${response.error}`);
        }
    });
}