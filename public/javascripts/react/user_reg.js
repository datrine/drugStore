var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var root = document.getElementById("register_root");
//represents the name of a product
function valEmail() {
    return fetch("/validate/email", {
        method: "post",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: user.email })
    }).then(function (res) {
        if (res.ok) {
            return res.json();
        } else return new Promise(function (resolve, reject) {
            reject('Server Error');
        });
    }).catch(function (err) {
        return new Promise(function (resolve, reject) {
            reject(err);
        });
    });
}
function valUsername() {
    return fetch("/validate/username", {
        method: "post",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: user.username })
    }).then(function (res) {
        if (res.ok) {
            return res.json();
        }
        return new Promise(function (resolve, reject) {
            reject("server error!");
        });
    }).catch(function (err) {
        return new Promise(function (resolve, reject) {
            reject("server error!");
        });
    });
}
function register(user) {
    return fetch("/register", {
        method: "post",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: user })
    }).then(function (res) {
        if (res.ok) {
            return res.json();
        }
        return new Promise(function (resolve, reject) {
            reject("Server error, user probably not saved");
        });
    }).catch(function (err) {
        return new Promise(function (resolve, reject) {
            reject("Server error, user probably not saved");
        });
    });
}
function verifyEmail() {
    return fetch("/verify_email", {
        method: "post",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: user.username, password: user.password }) }).then(function (res) {
        if (res.ok) {
            res.json();
        }
    }).then(function (res) {
        if (res.isSentVerEmail) {
            console.log("Email sent");
            return res;
        }
    });
}
function autoLogin() {
    return fetch("/login", {
        method: "post",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: user.username, password: user.password })
    }).then(function (res) {
        if (res.ok) {
            return res.json();
        } else {
            return new Promise(function (resolve, reject) {
                reject("Server error, user probably not saved");
            });
        }
    }).catch(function (err) {
        return new Promise(function (resolve, reject) {
            reject("Server error, user probably not saved");
        });
    });
}

var PreEmailVerify = function (_React$Component) {
    _inherits(PreEmailVerify, _React$Component);

    function PreEmailVerify(props) {
        _classCallCheck(this, PreEmailVerify);

        var _this = _possibleConstructorReturn(this, (PreEmailVerify.__proto__ || Object.getPrototypeOf(PreEmailVerify)).call(this, props));

        _this.state = {};
        _this.handlePassChange = _this.handlePassChange.bind(_this);
        register(user).catch(function (err) {
            console.log(err);
        });
        return _this;
    }

    _createClass(PreEmailVerify, [{
        key: "handlePassChange",
        value: function handlePassChange(event) {}
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "" },
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "p",
                        null,
                        "Thank you for registering"
                    ),
                    React.createElement(
                        "p",
                        null,
                        React.createElement("i", { className: "fa fa-check w3-text-green" }),
                        "Just one more step to go"
                    ),
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "p",
                            null,
                            "A verification Email has been sent to your email. Please confirm that the email your submitted is yours"
                        )
                    )
                ),
                React.createElement("div", null)
            );
        }
    }]);

    return PreEmailVerify;
}(React.Component);

var Name = function (_React$Component2) {
    _inherits(Name, _React$Component2);

    function Name(props) {
        _classCallCheck(this, Name);

        var _this2 = _possibleConstructorReturn(this, (Name.__proto__ || Object.getPrototypeOf(Name)).call(this, props));

        _this2.state = {
            name: (user.lname ? user.lname + " " : "") + (user.fname ? user.fname + " " : "") + (user.mname ? user.mname : "") || "",
            isValid: false
        };
        _this2.onChange = _this2.onChange.bind(_this2);
        return _this2;
    }

    _createClass(Name, [{
        key: "onChange",
        value: function onChange(e) {
            var _this3 = this;

            var name = e.target.value;

            var _name$split = name.split(" "),
                _name$split2 = _slicedToArray(_name$split, 3),
                lname = _name$split2[0],
                fname = _name$split2[1],
                mname = _name$split2[2];

            this.setState(function (state) {
                state.name = name;
                user.fname = fname ? fname : "";
                user.lname = lname ? lname : "";
                user.mname = mname ? mname : "";
                if (user.fname && (user.lname || user.mname)) {
                    state.isValid = true;
                }
                return state;
            }, function () {
                console.log(_this3.state.name);
                if (_this3.state.isValid) {
                    _this3.props.hasEdited(true);
                } else {
                    _this3.props.hasEdited(false);
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var isValid = this.state.isValid;
            return React.createElement(
                "div",
                { className: "div_subview" },
                React.createElement(
                    "div",
                    { className: "div_label" },
                    React.createElement(
                        "p",
                        null,
                        "Full name here.."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    isValid ? React.createElement("i", { className: "fa fa-check w3-text-green" }) : null,
                    React.createElement("input", { required: true, value: this.state.name, onChange: this.onChange, className: "input_name" })
                )
            );
        }
    }]);

    return Name;
}(React.Component);

var EndofLine = function (_React$Component3) {
    _inherits(EndofLine, _React$Component3);

    function EndofLine(props) {
        _classCallCheck(this, EndofLine);

        var _this4 = _possibleConstructorReturn(this, (EndofLine.__proto__ || Object.getPrototypeOf(EndofLine)).call(this, props));

        _this4.state = { canNext: false };
        _this4.onClick = _this4.onClick.bind(_this4);
        return _this4;
    }

    _createClass(EndofLine, [{
        key: "onClick",
        value: function onClick(e) {
            var _this5 = this;

            fetch("/register", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }).then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            }).then(function (res) {
                if (res.isSaved) {
                    _this5.props.hasEdited(true);
                }
            }).catch(function (err) {
                console.log(err);
                _this5.props.hasEdited(true);
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "div_subview" },
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { onClick: this.onClick, className: "" },
                        "Register"
                    )
                )
            );
        }
    }]);

    return EndofLine;
}(React.Component);

var Password = function (_React$Component4) {
    _inherits(Password, _React$Component4);

    function Password(props) {
        _classCallCheck(this, Password);

        var _this6 = _possibleConstructorReturn(this, (Password.__proto__ || Object.getPrototypeOf(Password)).call(this, props));

        _this6.state = { password: user.password || "", re_pass: "", equal: true, validPass: false };
        _this6.handlePassChange = _this6.handlePassChange.bind(_this6);
        _this6.handleRePassChange = _this6.handleRePassChange.bind(_this6);
        return _this6;
    }

    _createClass(Password, [{
        key: "handleRePassChange",
        value: function handleRePassChange(event) {
            var value = event.target.value;
            var elem = event.target;
            this.setState(function (state) {
                state.re_pass = value;
                if (value.length > 0 && state.password !== state.re_pass) {
                    state.equal = false;
                    elem.classList.add("pass_error");
                    console.log();
                } else {
                    elem.classList.remove("pass_error");
                    //only update password if password equal to re_pass 
                    user.password = value;
                    state.equal = true;
                    console.log("equal");
                }
                return state;
            });
        }
    }, {
        key: "handlePassChange",
        value: function handlePassChange(event) {
            var _this7 = this;

            var value = event.target.value;
            this.setState(function (state) {
                state.password = value;
                user.password = value;
                if (state.password !== state.re_pass) {
                    state.equal = false;
                    state.validPass = true;
                } else {
                    state.equal = true;
                    state.validPass = false;
                    //only update password if password equal to re_pass 
                    user.password = value;
                }
                return state;
            }, function () {
                console.log(_this7.state.password);
                if (user.password) {
                    _this7.props.hasEdited(true);
                } else {
                    _this7.props.hasEdited(false);
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "" },
                React.createElement(
                    "div",
                    { className: "div_label" },
                    React.createElement(
                        "label",
                        null,
                        "Enter password...."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    this.state.validPass ? React.createElement("i", { className: "fa fa-check w3-text-green" }) : React.createElement("i", null),
                    React.createElement("input", { className: "input_pass", type: "password", autocomplete: "new-password",
                        value: this.state.pass, onChange: this.handlePassChange })
                ),
                React.createElement(
                    "div",
                    { className: "div_label" },
                    React.createElement(
                        "label",
                        null,
                        "Confirm password...."
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    this.state.equal && this.state.re_pass ? React.createElement("i", { className: "fa fa-check w3-text-green" }) : !this.state.equal && this.state.re_pass ? React.createElement("i", { className: "fa fa-remove w3-text-red" }) : null,
                    " ",
                    React.createElement("input", { className: "input_pass", type: "password", placeholder: "Please confirm password...",
                        value: this.state.re_pass, onChange: this.handleRePassChange })
                )
            );
        }
    }]);

    return Password;
}(React.Component);

var Username = function (_React$Component5) {
    _inherits(Username, _React$Component5);

    function Username(props) {
        _classCallCheck(this, Username);

        var _this8 = _possibleConstructorReturn(this, (Username.__proto__ || Object.getPrototypeOf(Username)).call(this, props));

        _this8.state = { username: user.username || "", validUsername: true, isUnique: true };
        _this8.props.hasEdited(!!_this8.state.username);
        _this8.onChange = _this8.onChange.bind(_this8);
        return _this8;
    }

    _createClass(Username, [{
        key: "onChange",
        value: function onChange(e) {
            var _this9 = this;

            var username = e.target.value;

            this.setState(function (state) {
                user.username = username;
                state.username = username;
                state.isUnique = true;
                state.validUsername = true;
                return state;
            }, function () {
                if (username.length > 1) {
                    valUsername(_this9.state.username).then(function (res) {
                        if (res.valid) {
                            _this9.props.hasEdited(true);
                        } else {
                            _this9.setState(function (state) {
                                state.isUnique = false;
                                state.validUsername = false;
                                return state;
                            });
                            //this.props.hasEdited(false)
                        }
                    }).catch(function (err) {
                        console.log("Could not validate!");
                        _this9.hasEdited(false);
                    });
                }
                console.log(_this9.state.username);
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "div_subview" },
                React.createElement(
                    "div",
                    { className: "div_label" },
                    React.createElement(
                        "label",
                        null,
                        "Enter username..."
                    )
                ),
                React.createElement("input", { value: this.state.username, onChange: this.onChange,
                    className: "input_text" }),
                this.state.isUnique ? null : React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "p",
                        null,
                        "Username already taken"
                    )
                ),
                this.state.validUsername ? null : React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "p",
                        null,
                        "Username not valid"
                    )
                )
            );
        }
    }]);

    return Username;
}(React.Component);

var Email = function (_React$Component6) {
    _inherits(Email, _React$Component6);

    function Email(props) {
        _classCallCheck(this, Email);

        var _this10 = _possibleConstructorReturn(this, (Email.__proto__ || Object.getPrototypeOf(Email)).call(this, props));

        console.log(_this10.state);
        _this10.state = { email: user.email || "", validEmail: true, isUnique: true };
        _this10.props.hasEdited(!!_this10.state.email);
        _this10.onChange = _this10.onChange.bind(_this10);
        return _this10;
    }

    _createClass(Email, [{
        key: "onChange",
        value: function onChange(e) {
            var _this11 = this;

            var email = e.target.value;
            this.setState(function (state) {
                user.email = email;
                state.email = email;
                state.isUnique = true;
                state.validEmail = true;
                return state;
            }, function () {
                if (email.length > 1) {
                    valEmail(_this11.state.email).then(function (res) {
                        if (res.valid) {
                            _this11.props.hasEdited(true);
                        } else {

                            _this11.setState(function (state) {
                                state.isUnique = false;
                                state.validEmail = false;
                                return state;
                            });
                            //this.props.hasEdited(false)
                        }
                    }).catch(function (err) {
                        console.log(err);
                        _this11.props.hasEdited(false);
                    });
                }
                console.log(_this11.state.email);
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "div_subview" },
                React.createElement(
                    "div",
                    { className: "div_label" },
                    React.createElement(
                        "p",
                        null,
                        "Enter email..."
                    )
                ),
                React.createElement("input", { value: this.state.email, onChange: this.onChange, className: "input_text" }),
                this.state.isUnique ? null : React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "p",
                        null,
                        "Email already taken"
                    )
                ),
                this.state.validEmail ? null : React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "p",
                        null,
                        "Email not valid"
                    )
                )
            );
        }
    }]);

    return Email;
}(React.Component);

var viewArray = [{ viewItem: Name, type: "name" }, { viewItem: Email, type: "email" }, { viewItem: Username, type: "username" }, { viewItem: Password, type: "password" }, { viewItem: PreEmailVerify, type: "pre_email" }];

var RegisterApp = function (_React$Component7) {
    _inherits(RegisterApp, _React$Component7);

    function RegisterApp(props) {
        _classCallCheck(this, RegisterApp);

        var _this12 = _possibleConstructorReturn(this, (RegisterApp.__proto__ || Object.getPrototypeOf(RegisterApp)).call(this, props));

        _this12.state = { view: 0, canNext: false };
        _this12.handleNextClick = _this12.handleNextClick.bind(_this12);
        _this12.handleRegisterClick = _this12.handleRegisterClick.bind(_this12);
        _this12.handlePrevClick = _this12.handlePrevClick.bind(_this12);
        _this12.handleReloadClick = _this12.handleReloadClick.bind(_this12);
        _this12.handleViewEdit = _this12.handleViewEdit.bind(_this12);
        return _this12;
    }

    _createClass(RegisterApp, [{
        key: "handleRegisterClick",
        value: function handleRegisterClick(e) {
            var _this13 = this;

            //process and validate value
            e.preventDefault();
            var item = viewArray[this.state.view];
            register(user).then(function (res) {
                if (res.isSaved) {
                    return autoLogin();
                } else {
                    return new Promise(function (resolve, reject) {
                        reject("Likely server error");
                    });
                }
            }).then(function (res) {
                if (res.isLoggedIn) {
                    console.log("You're logged in");
                    if (viewArray.length - 1 > _this13.state.view) {
                        _this13.setState({ view: ++_this13.state.view, canNext: false });
                    }
                } else {
                    return new Promise(function (resolve, reject) {
                        reject("Likely server error");
                    });
                }
            }).catch(function (err) {
                console.log(err);
            });
        }
    }, {
        key: "handleNextClick",
        value: function handleNextClick(e) {
            //process and validate value
            e.preventDefault();
            var item = viewArray[this.state.view];
            if (viewArray.length - 1 > this.state.view) {
                this.setState({ view: ++this.state.view, canNext: false });
            }
        }
    }, {
        key: "handleReloadClick",
        value: function handleReloadClick(e) {
            this.setState(function (state) {
                return state;
            });
        }
    }, {
        key: "handleViewEdit",
        value: function handleViewEdit(can_move_to_next) {
            this.setState(function (state) {
                state.canNext = can_move_to_next;
                return state;
            });
        }
    }, {
        key: "handlePrevClick",
        value: function handlePrevClick(e) {
            if (this.state.view > 0) {
                this.setState({ view: --this.state.view });
            }
        }
    }, {
        key: "render",
        value: function render() {
            view = this.state.view;
            var submitBtn = view === 3 ? React.createElement(
                "div",
                { className: "div_next w3-btn w3-cyan w3-text-white", onClick: this.handleRegisterClick },
                "Save"
            ) : React.createElement(
                "div",
                { className: "div_next w3-btn w3-cyan w3-text-white", onClick: this.handleNextClick },
                "Next"
            );
            var View = void 0;
            switch (view) {
                case 0:
                    View = React.createElement(Name, { hasEdited: this.handleViewEdit, view: view });
                    break;
                case 1:
                    View = React.createElement(Email, { hasEdited: this.handleViewEdit, view: view });
                    break;
                case 2:
                    View = React.createElement(Username, { hasEdited: this.handleViewEdit, view: view });
                    break;
                case 3:
                    View = React.createElement(Password, { hasEdited: this.handleViewEdit, view: view });
                    break;
                case 4:
                    View = React.createElement(PreEmailVerify, { hasEdited: this.handleViewEdit, view: view });
                    break;
                default:
                    break;
            }
            //let View = viewArray[view].viewItem
            var EndofLine = React.createElement(
                "div",
                null,
                React.createElement(
                    "p",
                    null,
                    "Thanks for registering with us!"
                )
            );
            return React.createElement(
                "form",
                { className: "div_superview" },
                React.createElement(
                    "div",
                    { className: "div_inputview" },
                    View
                ),
                React.createElement(
                    "div",
                    { className: "div_controls" },
                    view > 0 ? React.createElement(
                        "div",
                        { onClick: this.handlePrevClick, className: "div_prev w3-btn w3-cyan w3-text-white" },
                        "Back"
                    ) : null,
                    this.state.canNext ? submitBtn : null,
                    React.createElement(
                        "div",
                        { className: "w3-hide", onClick: this.handleReloadClick },
                        "Log in Via"
                    )
                )
            );
        }
    }]);

    return RegisterApp;
}(React.Component);

function beginRegisterReact() {
    ReactDOM.render(React.createElement(RegisterApp, null), root);
}

var user = {
    fname: "",
    lname: "",
    mname: "",
    email: "",
    password: "",
    username: "",
    role: {
        ceo: "ceo"
    }
};