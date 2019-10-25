var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var root = document.getElementById("login_app");
var logview = void 0;
function findSession() {
    return fetch("/login", {
        method: "post",
        mode: 'cors',
        headers: {
            "Content-Type": 'application/json'
        }
    }).then(function (res) {
        if (res.ok) {
            return res.json();
        }
    }).catch(function (res) {
        console.log(res);
    });
}
function loginUser(user) {
    return fetch("/login", {
        method: "post",
        mode: 'cors',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(user)
    }).then(function (res) {
        if (res.ok) {
            return res.json();
        } else return new Promise(function (resolve, reject) {
            reject("server error!");
        });
    }).catch(function (res) {
        return new Promise(function (resolve, reject) {
            reject(err);
        });
    });
}

var ForgetPassView = function (_React$Component) {
    _inherits(ForgetPassView, _React$Component);

    function ForgetPassView(props) {
        _classCallCheck(this, ForgetPassView);

        return _possibleConstructorReturn(this, (ForgetPassView.__proto__ || Object.getPrototypeOf(ForgetPassView)).call(this, props));
    }

    _createClass(ForgetPassView, [{
        key: "render",
        value: function render() {
            var formRecov = void 0;
            if (window.screen.width <= 600) {
                formRecov = React.createElement(
                    "form",
                    { className: "form_recoverySmall" },
                    React.createElement(
                        "label",
                        null,
                        "Please enter your recovery email"
                    ),
                    React.createElement("input", { placeholder: "Email..." }),
                    React.createElement(
                        "button",
                        { className: "w3-btn w3-cyan" },
                        "Send"
                    )
                );
            }
            if (window.screen.width > 600) {
                formRecov = React.createElement(
                    "form",
                    { className: "form_recovery" },
                    React.createElement(
                        "label",
                        null,
                        "Please enter your recovery email"
                    ),
                    React.createElement("input", { placeholder: "Email..." }),
                    React.createElement(
                        "button",
                        { className: "w3-btn w3-cyan" },
                        "Send"
                    )
                );
            }
            return React.createElement(
                "div",
                { className: "overlay" },
                formRecov
            );
        }
    }]);

    return ForgetPassView;
}(React.Component);

var LogInView = function (_React$Component2) {
    _inherits(LogInView, _React$Component2);

    function LogInView(props) {
        _classCallCheck(this, LogInView);

        var _this2 = _possibleConstructorReturn(this, (LogInView.__proto__ || Object.getPrototypeOf(LogInView)).call(this, props));

        _this2.state = { showForgotPass: false, username: "", password: "" };
        _this2.onForgotPassClick = _this2.onForgotPassClick.bind(_this2);
        _this2.onLogInClick = _this2.onLogInClick.bind(_this2);
        _this2.onPassChange = _this2.onPassChange.bind(_this2);
        _this2.onUserChange = _this2.onUserChange.bind(_this2);
        _this2.onCloseClick = _this2.onCloseClick.bind(_this2);
        return _this2;
    }

    _createClass(LogInView, [{
        key: "onCloseClick",
        value: function onCloseClick(e) {
            e.preventDefault();
            ReactDOM.unmountComponentAtNode(logview);
        }
    }, {
        key: "onPassChange",
        value: function onPassChange(e) {
            this.setState({ password: e.target.value });
        }
    }, {
        key: "onUserChange",
        value: function onUserChange(e) {
            this.setState({ username: e.target.value });
        }
    }, {
        key: "onForgotPassClick",
        value: function onForgotPassClick(e) {
            e.preventDefault();
            /* this.setState(state => {
                 state.showForgotPass = true;
                 return state;
             }) */
            ReactDOM.unmountComponentAtNode(logview);
            ShowReactRecoveryView();
        }
    }, {
        key: "onLogInClick",
        value: function onLogInClick(e) {
            e.preventDefault();
            loginUser({ username: this.state.username, password: this.state.password }).then(function (res) {
                if (res.isLoggedIn) {
                    window.location.href = location.href;
                } else {
                    console.log(res.info);
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var formLog = void 0;
            if (window.screen.width < 600) {
                formLog = React.createElement(
                    "div",
                    { className: "div_login w3-hide-medium w3-hide-large" },
                    React.createElement(
                        "div",
                        { className: "overlay" },
                        React.createElement(
                            "form",
                            { className: "form_loggerSmall" },
                            React.createElement(
                                "div",
                                { className: "w3-container", style: { paddingRight: 0 } },
                                React.createElement("i", { onClick: this.onCloseClick, className: "close_btn fa fa-remove w3-right w3-text-red" })
                            ),
                            React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "label",
                                    { htmlFOR: "username" },
                                    "Username/Email"
                                ),
                                React.createElement("input", { required: true, className: "w3-input", onChange: this.onUserChange })
                            ),
                            React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "label",
                                    { htmlFOR: "password" },
                                    "Password"
                                ),
                                React.createElement("input", { required: true, className: "w3-input", type: "password", onChange: this.onPassChange })
                            ),
                            React.createElement(
                                "button",
                                { onClick: this.onLogInClick, type: "submit", name: "", className: "w3-btn w3-cyan w3-text-white w3-round" },
                                "Log In"
                            ),
                            React.createElement(
                                "div",
                                { className: "w3-right" },
                                React.createElement(
                                    "p",
                                    null,
                                    "forgot password? ",
                                    React.createElement(
                                        "button",
                                        { className: "w3-btn w3-text-white w3-cyan",
                                            onClick: this.onForgotPassClick },
                                        "Click"
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "w3-hide" },
                                React.createElement(
                                    "a",
                                    { href: "/register" },
                                    "Register"
                                )
                            )
                        )
                    )
                );
            } else {
                formLog = React.createElement(
                    "div",
                    { className: "div_login w3-hide-small" },
                    React.createElement(
                        "div",
                        { className: "overlay" },
                        React.createElement(
                            "form",
                            { className: "form_logger" },
                            React.createElement(
                                "div",
                                { className: "w3-container", style: { paddingRight: 0 } },
                                React.createElement("i", { onClick: this.onCloseClick, className: "close_btn fa fa-remove w3-right w3-text-red" })
                            ),
                            React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "label",
                                    { htmlFOR: "username" },
                                    "Username/Email"
                                ),
                                React.createElement("input", { required: true, className: "w3-input", onChange: this.onUserChange })
                            ),
                            React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "label",
                                    { htmlFOR: "password" },
                                    "Password"
                                ),
                                React.createElement("input", { required: true, className: "w3-input", type: "password", onChange: this.onPassChange })
                            ),
                            React.createElement("input", { onClick: this.onLogInClick, type: "submit", name: "log in" }),
                            React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "div",
                                    { className: "w3-right" },
                                    React.createElement(
                                        "p",
                                        null,
                                        "forgot password? ",
                                        React.createElement(
                                            "button",
                                            { className: "w3-btn w3-cyan w3-text-white w3-round", onForgotPassClick: this.onForgotPassClick },
                                            "Click"
                                        )
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    null,
                                    React.createElement(
                                        "p",
                                        null,
                                        "Or log in via"
                                    )
                                )
                            )
                        )
                    )
                );
            }return React.createElement(
                "div",
                null,
                this.state.showForgotPass ? React.createElement(ForgetPassView, null) : formLog
            );
        }
    }]);

    return LogInView;
}(React.Component);

var Notifier = function (_React$Component3) {
    _inherits(Notifier, _React$Component3);

    function Notifier(props) {
        _classCallCheck(this, Notifier);

        var _this3 = _possibleConstructorReturn(this, (Notifier.__proto__ || Object.getPrototypeOf(Notifier)).call(this, props));

        _this3.state = { showLogview: false };
        _this3.handleClick = _this3.handleClick.bind(_this3);
        return _this3;
    }

    _createClass(Notifier, [{
        key: "handleClick",
        value: function handleClick(e) {
            /*   this.setState(state => {
                  state.showLogview = true;
                  return state;
              })*/
            this.props.showLogin(true);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "p",
                    null,
                    "You're not logged in. please ",
                    React.createElement(
                        "button",
                        { onClick: this.handleClick },
                        "click"
                    ),
                    " to log in"
                )
            );
        }
    }]);

    return Notifier;
}(React.Component);

var App = function (_React$Component4) {
    _inherits(App, _React$Component4);

    function App(props) {
        _classCallCheck(this, App);

        var _this4 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this4.state = { showApp: true, showLoginDirect: _this4.props.option.showLoginDirect };
        _this4.updateShowApp = _this4.updateShowApp.bind(_this4);
        _this4.showLogin = _this4.showLogin.bind(_this4);
        return _this4;
    }

    _createClass(App, [{
        key: "showLogin",
        value: function showLogin(canShowLogin) {
            this.setState({ showLoginDirect: canShowLogin });
        }
    }, {
        key: "updateShowApp",
        value: function updateShowApp(isShowLogin) {
            this.setState({ showApp: isShowLogin });
        }
    }, {
        key: "render",
        value: function render() {
            var showLoginDirect = this.state.showLoginDirect;

            return React.createElement(
                "div",
                null,
                this.state.showApp ? showLoginDirect ? React.createElement(LogInView, { data: this.state, updateShowApp: this.updateShowApp }) : React.createElement(Notifier, { showLogin: this.showLogin }) : null
            );
        }
    }]);

    return App;
}(React.Component);

function beginReactLogin() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    findSession().then(function (res) {
        if (!res.isLoggedIn) {
            ReactDOM.render(React.createElement(App, { option: opt }), root);
        }
    });
}
// show login view
function ShowReactLogin() {
    logview = document.getElementById("div_logview");
    findSession().then(function (res) {
        if (!res.isLoggedIn) {
            ReactDOM.render(React.createElement(LogInView, null), logview);
        }
    });
}
// show recovery view
function ShowReactRecoveryView() {
    logview = document.getElementById("div_logview");
    findSession().then(function (res) {
        if (!res.isLoggedIn) {
            ReactDOM.render(React.createElement(ForgetPassView, null), logview);
        }
    });
}
// show Notifier
function ShowReactNotifierView() {
    logview = document.getElementById("div_logview");
    findSession().then(function (res) {
        if (!res.isLoggedIn) {
            ReactDOM.render(React.createElement(Notifier, null), logview);
        }
    });
}