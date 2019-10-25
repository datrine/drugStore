import React from "react"
import ReactDOM from "react-dom"
const root = document.getElementById("billing_root")


class BuyModel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handleDeleteItem= this.handleDeleteItem.bind(this)
    }
    handleDeleteItem(id) {
        //this.props.itemDelete(this.props.id)
        return (e)=>{
            this.props.section.sub_list[id].quantity=0;
            this.props.handleSectionUpdate()
        }
    }
    render() {
        var { section } = this.props
        console.log(section)
        return (<div>
            <div style={{textTransform:"capitalize",fontWeight:"bold",fontSize:"20px"}}>({this.props.id+1}) {section.name}</div> <div>
                <table className="w3-table">
                    <tr>
                        <th style={{textAlign:"center"}}>Quantity</th>
                        <th style={{textAlign:"center"}}>Price (&#8358;)</th>
                        <th style={{textAlign:"center"}}>Total &#8358;</th>
                        <th style={{textAlign:"center"}}></th>
                    </tr>
            {section.sub_list.map((item,index) =>
                    <tr>
                        <td style={{textAlign:"center"}}>{item.quantity}</td>
                        <td style={{textAlign:"center"}}> {item.price}</td>
                        <td style={{textAlign:"center"}}>{(item.quantity * item.price)}</td>
                        <td style={{textAlign:"center"}}><span onClick={this.handleDeleteItem(index)} className="fa fa-remove w3-text-red"></span></td>
                    </tr>)}
                </table>
            </div>
        </div>)
    }
}

class CartApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = { cart: this.props.cart || null }
        this.handleCheckOut=this.handleCheckOut.bind(this)
    }
    handleChildSectionUpdate(){
        console.log(this.props.cart)
        this.setState(state=>state)
    }
    handleCheckOut(cart) {
        console.log(cart)
        return (e)=>{
        fetch("/cart/checkout",{
            method:"post",
            mode:"cors",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({cart})
        }).then(res=>{
            if (res.ok) {
            return res.json()
            }
            else{
                throw new Error(res.statusText)
            }
        }).then(savedCart=>{
            location.href="/cart/billing?cart_id="+savedCart._id
        }).catch(err=>{
            console.log(err)
        })
    }
    }
    render() {
        let filterCart={};
        var cart_nots = document.getElementsByClassName("cart_not")
        let cart = this.props.cart;
        console.log(cart.item_list)
        for (let index = 0; index < cart_nots.length; index++) {
            cart_nots[index].textContent=cart.item_list.length
        }
        return (cart.item_list.length>0 ? <div className="w3-text-white w3-green" 
        style={{width:"300px",maxWidth:"600px",margin:"auto",paddingBottom:"20px"}}>
            {cart.item_list.map((section, id) =>
                <BuyModel handleSectionUpdate={this.handleChildSectionUpdate.bind(this)} 
                key={id} id={id} section={section} />)}
            <div className="w3-container">
            <button className="w3-btn w3-text-white w3-text-white w3-round" style={{marginRight:"10px"}}>Delete</button>
            </div>
        </div> : null)
    }
}
function startCartAppBilling(cart) {
let cart_root = document.getElementById("divCartBilling")
    ReactDOM.render(<CartApp cart={cart} />, cart_root)
}
//ReactDOM.render(<CartApp/>,cart_root)



class Billing extends React.Component{
    render(){
        return (<div className="w3-container" style={{width:"300px",margin:"auto"}}>
        <h2>Billing Information</h2>
        <form>
            <input className="w3-input" placeholder="Full name"/>
            <input className="w3-input" placeholder="Email" type="email"/>
            <input type="tel" className="w3-input" placeholder="Mobile Number"/>
            <textarea className="w3-input" placeholder="Address 1"></textarea>
            <button className="w3-btn w3-cyan w3-text-white" style={{marginRight:"20px"}}>Pay on Delivery</button>
            <button className="w3-btn w3-cyan w3-text-white">Pay Now</button></form>
        </div>)
    }
}




let logview;
//fetch cart
function fetchCart() {
    let url=new URL(location.href)
    let cart_id=url.searchParams.get("cart_id")||"no_query"
    console.log(cart_id)
    return fetch("/cart/billing",{
        method:"post",
        mode:"cors",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({cart_id:cart_id})
    }).then(res=>{
        if (res.ok) {
            return res.json()
        }
    }).catch(err=>{
        console.log(err)
    })
}
class BillingApp extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        startCartAppBilling(this.props.cart)
    }
    render() {
        return (<div>
        <div className="w3-container" id="divCartBilling"></div>
        <Billing/>
            </div>)
    }
}
// show Notifier
function ShowBillingView() {
fetchCart().then(cart=>{
        if (cart) {
    ReactDOM.render(<BillingApp cart={cart}/>, root)
        }
    })
}
ShowBillingView()