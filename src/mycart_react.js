import React from "react";
import ReactDOM from "react-dom"
let cart = []
let buyModel = {
    time_selected: Date.now(),
    item_Id: null,
    item_info: {},
}
function beginCart(params) {
    fetch("/login", {

    }).then().catch()
}

let cart_root = document.getElementById("divCart")
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
            <div style={{textTransform:"capitalize",fontWeight:"bold"}}>({this.props.id+1}) {section.name}</div> <div>
                <table className="w3-table">
                    <tr>
                        <th>Quantity</th>
                        <th style={{textAlign:"center"}}>Price (&#8358;)</th>
                        <th style={{textAlign:"center"}}>Total &#8358;</th>
                        <th></th>
                    </tr>
            {section.sub_list.map((item,index) =>
                    <tr>
                        <td>{item.quantity}</td>
                        <td> {item.price}</td>
                        <td>{(item.quantity * item.price)}</td>
                        <td><span onClick={this.handleDeleteItem(index)} className="fa fa-remove w3-text-red"></span></td>
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
        console.log("a render")
        var cart_nots = document.getElementsByClassName("cart_not")
        let cart = this.props.cart;
        filterCart.item_list = cart.item_list.filter(section => {
            let mini_list = section.sub_list.filter(item_obj => {
                return item_obj.quantity > 0
            });
            console.log(mini_list)
            section.sub_list = mini_list;
            return mini_list.length > 0
        })
        console.log(filterCart.item_list)
        for (let index = 0; index < cart_nots.length; index++) {
            cart_nots[index].textContent=filterCart.item_list.length
        }
        return (filterCart.item_list.length>0 ? <div className="w3-text-white">
        <div className="w3-container" style={{padding:0,textAlign:"right"}}>
        <span className="w3-text-white" style={{marginRight:"10px"}}>-</span>
        <span className="fa fa-times w3-text-red"></span></div>
            {filterCart.item_list.map((section, id) =>
                <BuyModel handleSectionUpdate={this.handleChildSectionUpdate.bind(this)} 
                key={id} id={id} section={section} />)}
            <div className="w3-container">
            <button className="w3-btn w3-white w3-text-cyan" style={{marginRight:"10px"}}>Delete</button>
            <button onClick={this.handleCheckOut(filterCart)} className="w3-btn w3-white w3-text-cyan">Check out</button>
            </div>
        </div> : null)
    }
}
function startCartApp(cart) {
    ReactDOM.render(<CartApp cart={cart} />, cart_root)
}
//ReactDOM.render(<CartApp/>,cart_root)


export default startCartApp