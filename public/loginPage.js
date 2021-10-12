// для авторизации
let userForm = new UserForm();
userForm.loginFormCallback = function(data) {
    ApiConnector.login(data, (response) => {

        if (response) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(messsage);
        }
    });
}

//для регистрации
userForm.registerFormCallback = function(data) {
    ApiConnector.register(data, (response) => {

        if (response) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(messsage);
        }
    });
}