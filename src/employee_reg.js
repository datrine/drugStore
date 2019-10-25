const register_employee_root = document.getElementById("register_employee_root")
//represents the name of a product
function valEmail() {
    return fetch("/validate/email", {
        method: "post",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email })
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
        return Error("server error!")
    }).catch(err => err)
}
function valUsername() {
    return fetch("/validate/username", {
        method: "post",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user.username })
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
        return Error("server error!")
    }).catch(err => err)
}
function register(user) {
    return fetch("/register", {
        method: "post",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user })
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
        return Error("server error!")
    }).then(res => {
        if (res.isSaved) {
            return fetch("/login", {
                method: "post",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: user.username, password: user.password })
            })
        }
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
    }).then(res => {
        if (res.isLoggedIn) {
            console.log("You're logged in")
            
            return fetch("/verify_email", {
                method: "post",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: user.username, password: user.password })})
        }
    }).then(res=>{
        if (res.ok) {
            res.json()
        }
    }).then(res=>{
        if (res.isSentVerEmail) {
            console.log("Email sent")
            return res;
        }
    }).catch(err => console.log(err))
}
class PreEmailVerify extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handlePassChange = this.handlePassChange.bind(this)
        register(user).catch(err => {
            console.log("Not verified")
        })
    }

    handlePassChange(event) {

    }
    render() {
        return (<div className="">
            <div>
                <p>Thank you for registering</p>
                <p><i className="fa fa-check w3-text-green"></i>Just one more step to go</p>
                <div>
                    <p>A verification Email has been sent to your email.
                        Please confirm that the email your submitted is yours</p>
                </div>
            </div>
            <div>
            </div>
        </div>)
    }
}
class Name extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ((user.lname ? user.lname + " " : "") +
                (user.fname ? user.fname + " " : "") + (user.mname ? user.mname : "")) || ""
        }
        this.onChange = this.onChange.bind(this)
    }
    onChange(e) {
        let name = e.target.value
        let [lname, fname, mname] = name.split(" ")
        this.setState(state => {
            state.name = name
            user.fname = fname ? fname : "";
            user.lname = lname ? lname : "";
            user.mname = mname ? mname : "";
            return state;
        }, () => {
            console.log(this.state.name)
            if (user.fname || user.lname || user.mname) {
                this.props.hasEdited(true)
            }
            else {
                this.props.hasEdited(false)
            }
        })
    }
    render() {
        return (<div className="div_subview">
            <div className="div_label">
                <p>Full name here...</p>
            </div>
            <div>

                <input value={this.state.name} onChange={this.onChange} className="input_text" />
            </div>
        </div>)
    }
}
class EndofLine extends React.Component {
    constructor(props) {
        super(props)
        this.state = { canNext: false }
        this.onClick = this.onClick.bind(this)
    }
    onClick(e) {
        fetch("/register", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(res => {
            if (res.isSaved) {
                this.props.hasEdited(true)
            }
        }).catch(err => {
            console.log(err)
            this.props.hasEdited(true)
        })
    }
    render() {
        return (<div className="div_subview">
            <div>
                <div onClick={this.onClick} className="">Register</div>
            </div>
        </div>)
    }
}
class Password extends React.Component {
    constructor(props) {
        super(props)
        this.state = { password: user.password || "", re_pass: "", equal: true, validPass: false }
        this.handlePassChange = this.handlePassChange.bind(this)
        this.handleRePassChange = this.handleRePassChange.bind(this)
    }
    handleRePassChange(event) {
        let value = event.target.value
        let elem = event.target
        this.setState(state => {
            state.re_pass = value;
            if (value.length > 0 && state.password !== state.re_pass) {
                state.equal = false;
                elem.classList.add("pass_error")
                console.log()
            } else {
                elem.classList.remove("pass_error")
                //only update password if password equal to re_pass 
                user.password = value;
                state.equal = true;
                console.log("equal")
            }
            return state;
        })
    }
    handlePassChange(event) {
        let value = event.target.value
        this.setState(state => {
            state.password = value;
            user.password = value
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
        }, () => {
            console.log(this.state.password)
            if (user.password) {
                this.props.hasEdited(true)
            }
            else {
                this.props.hasEdited(false)
            }
        })
    }
    render() {
        return (<div className="">
            <div className="div_label">
                <label>Enter password....</label>
            </div>
            <div>
                {this.state.validPass ? <i className="fa fa-check w3-text-green"></i> : <i></i>} 
                <input className="input_pass" type="password" autocomplete="new-password"
                    value={this.state.pass} onChange={this.handlePassChange} />
            </div>
            <div className="div_label">
                <label>Confirm password....</label>
            </div>
            <div>
                {this.state.equal&&this.state.re_pass? <i className="fa fa-check w3-text-green"></i> : 
               (!this.state.equal&&this.state.re_pass?<i className="fa fa-remove w3-text-red"></i>:null)
            } <input className="input_pass" type="password" placeholder="Please confirm password..."
                    value={this.state.re_pass} onChange={this.handleRePassChange} />
            </div>
        </div>)
    }
}
class Username extends React.Component {
    constructor(props) {
        super(props)
        this.state = { username: user.username || "", validUsername: true, isUnique: true }
        this.props.hasEdited(!!this.state.username)
        this.onChange = this.onChange.bind(this)
    }
    onChange(e) {
        let username = e.target.value

        this.setState(state => {
            user.username = username
            state.username = username
            state.isUnique = true
            state.validUsername = true
            return state;
        }, () => {
            if (username.length > 1) {
                valUsername(this.state.username).then(res => {
                    if (res.valid) {
                        this.props.hasEdited(true)
                    }
                    else {
                        this.setState(state => {
                            state.isUnique = false
                            state.validUsername = false
                            return state;
                        })
                        //this.props.hasEdited(false)
                    }
                }).catch(err => {
                    console.log("Could not validate!")
                    this.hasEdited(false)
                })
            }
            console.log(this.state.username)
        })
    }
    render() {
        return (<div className="div_subview">
            <div className="div_label">
                <label>Enter username...</label>
            </div>
            <input value={this.state.username} onChange={this.onChange}
                className="input_text" />
            {this.state.isUnique ? null : <div><p>Username already taken</p>
            </div>}
            {this.state.validUsername ? null : <div><p>Username not valid</p>
            </div>}
        </div>)
    }
}
class EmployeeDet extends React.Component {
    constructor(props) {
        super(props)
        this.state = { role: user.role || "", isUnique: true }
        this.props.hasEdited(!!this.state.username)
        this.onSelectRoleChange = this.onSelectRoleChange.bind(this)
    }
    onSelectRoleChange(e) {
        let role = e.target.value

        this.setState(state => {
            user.role = role
            state.role = username
            return state;
        })
    }
    render() {
        return (<div className="div_subview">
            <div className="div_label">
                <label>Select role...</label>
            </div>
            <select onChange={this.onSelectRoleChange}>
                <option>CEO</option>
                <option>Branch Manager</option>
                <option>Pharmacist</option>
                <option>Cashier</option>
                <option>Security</option>
            </select>
        </div>)
    }
}
class Email extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.state)
        this.state = { email: user.email || "", validEmail: true, isUnique: true }
        this.props.hasEdited(!!this.state.email)
        this.onChange = this.onChange.bind(this)
    }
    onChange(e) {
        let email = e.target.value
        this.setState(state => {
            user.email = email
            state.email = email
            state.isUnique = true
            state.validEmail = true;
            return state;
        }, () => {
            if (email.length > 1) {
                valEmail(this.state.email).then(res => {
                    if (res.valid) {
                        this.props.hasEdited(true)
                    }
                    else {
                        this.setState(state => {
                            state.isUnique = false;
                            state.validEmail = false;
                            return state
                        })
                        //this.props.hasEdited(false)
                    }
                }).catch(err => {
                    console.log(err)
                    this.props.hasEdited(false)
                })
            }
            console.log(this.state.email)
        })
    }
    render() {
        return (<div className="div_subview">
            <div className="div_label">
                <p>Enter email...</p></div>
            <input value={this.state.email} onChange={this.onChange} className="input_text" />
            {this.state.isUnique ? null : <div><p>Email already taken</p>
            </div>}
            {this.state.validEmail ? null : <div><p>Email not valid</p>
            </div>}
        </div>)
    }
}
let viewArray = [{ viewItem: Name, type: "name" }, { viewItem: Email, type: "email", },
{ viewItem: Username, type: "username" }, { viewItem: Password, type: "password" },
{ viewItem: PreEmailVerify, type: "pre_email" }]
class RegisterEmployeeApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = { view: 0, canNext: false }
        this.handleNextClick = this.handleNextClick.bind(this)
        this.handlePrevClick = this.handlePrevClick.bind(this)
        this.handleReloadClick = this.handleReloadClick.bind(this)
        this.handleViewEdit = this.handleViewEdit.bind(this)
    }
    handleNextClick(e) {
        //process and validate value
        let item = viewArray[this.state.view]
        if (viewArray.length - 1 > this.state.view) {
            this.setState({ view: ++this.state.view, canNext: false })
        }
    }

    handleReloadClick(e) {
        this.setState(state => state)
    }
    handleViewEdit(can_move_to_next) {
        this.setState(state => {
            state.canNext = can_move_to_next
            return state
        })
    }
    handlePrevClick(e) {
        if (this.state.view > 0) {
            this.setState({ view: --this.state.view })
        }
    }
    render() {
        view = this.state.view
        let View;
        switch (view) {
            case 0:
                View = <Name hasEdited={this.handleViewEdit} view={view} />
                break;
            case 1:
                View = <Email hasEdited={this.handleViewEdit} view={view} />
                break;
            case 2:
                View = <Username hasEdited={this.handleViewEdit} view={view} />
                break;
            case 3:
                View = <Password hasEdited={this.handleViewEdit} view={view} />
                break;
                case 4:
                    View = <EmployeeDet hasEdited={this.handleViewEdit} view={view} />
                    break;
            case 5:
                View = <PreEmailVerify hasEdited={this.handleViewEdit} view={view} />
                break;
            default:
                break;
        }
        //let View = viewArray[view].viewItem
        let EndofLine = <div><p>Thanks for registering with us!</p></div>;
        return (
            <div className="div_superview">
                {View}
                <div className="div_controls">
                    {view > 0 ? <div onClick={this.handlePrevClick} className="div_prev w3-button">
                        <i className="fa fa-arrow-left"></i></div> : null}
                    {this.state.canNext ?
                        <div className="div_next w3-button" onClick={this.handleNextClick}>Next</div> : null}
                    <div className="div_save" onClick={this.handleReloadClick}>Log in</div>
                </div>
            </div>
        )
    }
}
function beginReact() {
    ReactDOM.render(<RegisterEmployeeApp />, register_employee_root)
}

var user = {
    fname: "",
    lname: "",
    mname: "",
    email: "",
    password: "",
    username: "",
    role:""
}