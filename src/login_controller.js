import React from "react"
import ReactDOM from "react-dom"
const root = document.getElementById("login_app")
let logview;
function findSession() {
    return fetch("/login",{
        method:"post",
        mode:'cors',
        headers:{
            "Content-Type":'application/json'
        },
    }).then(res=>{
        if (res.ok) {
            return res.json()
        }
        else return new Promise((resolve,reject)=>{reject("server error!")})
    }).catch(err=>{
         return new Promise((resolve,reject)=>{reject(err)})
    })
}
function loginUser(user) {
    return fetch("/login",{
        method:"post",
        mode:'cors',
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify(user)
    }).then(res=>{
        if (res.ok) {
            return res.json()
        }
        else return new Promise((resolve,reject)=>{reject("server error!")})
    }).catch(res=>{
        return new Promise((resolve,reject)=>{reject(err)})
    })
}
function logoutUser() {
    return fetch("/logout",{
        method:"get",
        mode:'cors',
        headers:{
            "Content-Type":'application/json'
        },
    }).then(res=>{
        if (res.ok) {
            return res.json()
        }
        else return new Promise((resolve,reject)=>{reject("server error!")})
    }).catch(res=>{
        return new Promise((resolve,reject)=>{reject(err)})
    })
}
class ForgetPassView extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let formRecov;
        if(window.screen.width<=600){
        formRecov=<form className="form_recoverySmall">
            <label>Please enter your recovery email</label>
            <input placeholder="Email..." />
                <button className="w3-btn w3-cyan">Send</button>
        </form>}
        if (window.screen.width>600) {
            formRecov=<form className="form_recovery">
                <label>Please enter your recovery email</label>
                <input placeholder="Email..." />
                <button className="w3-btn w3-cyan">Send</button>
            </form>
        }
        return (<div className="overlay">
            {formRecov}
        </div>)
    }
}
class LogInView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showForgotPass: false,username:"",password:"" }
        this.onForgotPassClick = this.onForgotPassClick.bind(this)
        this.onLogInClick = this.onLogInClick.bind(this)
        this.onPassChange=this.onPassChange.bind(this)
        this.onUserChange=this.onUserChange.bind(this)
        this.onCloseClick=this.onCloseClick.bind(this)
    }
    onCloseClick(e){
        e.preventDefault()
        ReactDOM.unmountComponentAtNode(logview)
    }
    onPassChange(e){
        this.setState({password:e.target.value})
    }
    onUserChange(e){
        this.setState({username:e.target.value})
    }
    onForgotPassClick(e) {
        e.preventDefault()
       /* this.setState(state => {
            state.showForgotPass = true;
            return state;
        }) */
        ReactDOM.unmountComponentAtNode(logview)
        ShowReactRecoveryView()
    }
    onLogInClick(e){
        e.preventDefault()
        loginUser({username:this.state.username,password:this.state.password}).then(res=>{
            if (res.isLoggedIn) {
                window.location.href=location.href
            }
            else{
                console.log(res.info)
            }
        })
    }
    render() {
        let formLog;
        if(window.screen.width<600){
            formLog = <div className="div_login w3-hide-medium w3-hide-large"> 
            <div className="overlay">
            <form className="form_loggerSmall">
            <div className="w3-container" style={{paddingRight:0}}>
                <i onClick={this.onCloseClick} className="close_btn fa fa-remove w3-right w3-text-red"></i>
            </div>
                <div>
                    <label htmlFOR="username">Username/Email</label>
                    <input required className="w3-input" onChange ={this.onUserChange}/>
                </div>
                <div>
                    <label htmlFOR="password">Password</label>
                    <input required className="w3-input" type="password" onChange={this.onPassChange} />
                </div>
                <button onClick={this.onLogInClick} type="submit" name="" className="w3-btn w3-cyan w3-text-white w3-round">
                    Log In
                </button>
                    <div className="w3-right">
                        <p>forgot password? <button className="w3-btn w3-text-white w3-cyan" 
                        onClick={this.onForgotPassClick}>Click</button></p>
                    </div>
                    <div className="w3-hide">
                    <a href="/register">Register</a></div>
            </form>
                </div></div>
           
        } 
        else{
        formLog = <div className="div_login w3-hide-small"> 
        <div className="overlay">
        <form className="form_logger">
        <div className="w3-container" style={{paddingRight:0}}>
            <i onClick={this.onCloseClick} className="close_btn fa fa-remove w3-right w3-text-red"></i>
        </div>
            <div>
                <label htmlFOR="username">Username/Email</label>
                <input required className="w3-input" onChange ={this.onUserChange}/>
            </div>
            <div>
                <label htmlFOR="password">Password</label>
                <input required className="w3-input" type="password" onChange={this.onPassChange} />
            </div>
            <input onClick={this.onLogInClick} type="submit" name="log in" />
            <div>
                <div className="w3-right">
                    <p>forgot password? <button className="w3-btn w3-cyan w3-text-white w3-round" onForgotPassClick={this.onForgotPassClick}>Click</button></p>
                </div>
                <div>
                <p>Or log in via</p></div>
            </div>
        </form>
            </div></div>
       } return (<div>

            {this.state.showForgotPass ? <ForgetPassView /> : formLog}
        </div>)
    }
}
class Notifier extends React.Component {
    constructor(props) {
        super(props)
        this.state = { showLogview: false }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(e) {
      /*   this.setState(state => {
            state.showLogview = true;
            return state;
        })*/
        e.preventDefault()
        ReactDOM.unmountComponentAtNode(logview)
        ShowReactLogin()
    }
    render() {
        return (
            <div>
                    <p>You're not logged in. please <button onClick={this.handleClick}>click</button> to log in</p>
            </div>)
    }
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={showApp:true,showLoginDirect:this.props.option.showLoginDirect}
        this.updateShowApp=this.updateShowApp.bind(this)
        this.showLogin=this.showLogin.bind(this)
    }
    showLogin(canShowLogin){
        this.setState({showLoginDirect:canShowLogin})
    }
    updateShowApp(isShowLogin){
        this.setState({showApp:isShowLogin})
    }
    render() {
        var {showLoginDirect}=this.state
        return (
            <div>
               {this.state.showApp?
                (showLoginDirect?<LogInView data={this.state} updateShowApp={this.updateShowApp}/>: 
                <Notifier showLogin={this.showLogin} />)
                :null}
            </div>
        )
    }
}
// show login view
function ShowReactLogin() {
    logview = document.getElementById("div_logview")
    findSession().then(res=>{
        if (!res.isLoggedIn) {
    ReactDOM.render(<LogInView/>, logview)
        }
    })
}
// show recovery view
function ShowReactRecoveryView() {
    logview = document.getElementById("div_logview")
    findSession().then(res=>{
        if (!res.isLoggedIn) {
    ReactDOM.render(<ForgetPassView/>, logview)
        }
    })
}
// show Notifier
function ShowReactNotifierView() {
    console.log("showing notifier")
    logview = document.getElementById("div_logview")
    findSession().then(res=>{
        editLogBtns(res.isLoggedIn)
        if (!res.isLoggedIn) {
    ReactDOM.render(<Notifier/>, logview)
        }
    })
}

function editLogBtns(isLoggedIn) {
    let log_btns=document.getElementsByClassName("log_btn")
    for (let index = 0; index < log_btns.length; index++) {
        log_btns[index].textContent=isLoggedIn?"Log out":"Log in"
        log_btns[index].addEventListener("click",(e)=>{
        if (isLoggedIn) {
           /**/ logoutUser().then(res=>{
                if (!res.isLoggedIn) {
                    ReactDOM.render(<Notifier/>, logview)
                    w3_closeSidebar()
                }
            })
        }
        else if (!isLoggedIn) {
    ReactDOM.render(<LogInView/>, logview)
        }
        })
    }
}

ShowReactNotifierView()