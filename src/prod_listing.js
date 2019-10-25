import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import startCartApp from "./mycart_react"

let root = document.getElementById("root")
let cart={item_list:[]}
function fetchList(opts = {}) {
    return fetch("/listing", {
        method: "post",
        mode: "cors",
        body: JSON.stringify(opts)
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
        else {
            return new Promise((res, rej) => rej(err))
        }
    }).catch(err => new Promise((res, rej) => rej(err)))
}
class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = { prodObj: this.props.prodObj,showCartEdit:false }
    }
    handlePreCartClick(e){
        let elem=e.target
        this.setState({showCartEdit:!this.state.showCartEdit},()=>{
           if( elem.classList.contains("w3-text-cyan")){
               elem.classList.replace("w3-text-cyan","w3-text-red")
           }
           else{
               elem.classList.replace("w3-text-red","w3-text-cyan")
           }
        })
    }
    handleInputCartQuanChange(e){
        let value=e.target.value
        let sub_list=this.props.section.sub_list
        let elem=e.target;
        let id=Number(elem.dataset.id)
        if (!sub_list.includes(subsec=>subsec.id===id)) {
            let curIndex=sub_list.findIndex(subsec=>subsec.id===id)
            sub_list[curIndex].id=id
            sub_list[curIndex].quantity=Number(value) 
            sub_list[curIndex].quantifier=this.props.prodObj.priceDet[curIndex].quantifier
            sub_list[curIndex].price=this.props.prodObj.priceDet[curIndex].price
            console.log(sub_list[curIndex])
        }
        else{
            console.log("ase o")
        }
    }
    handleAddToCartClick(e){
        if (true) {
            console.log(cart)
            startCartApp(cart)
        }
        this.setState({showCartEdit:!this.state.showCartEdit},()=>{
        })
    }
    render() {
        let prodObj = this.state.prodObj
        let sub_list=this.props.section.sub_list||[]
        console.log(this.props.section)
        //only generate list for empty section_list
        if (sub_list.length===0) {
            for (let index = 0; index < prodObj.priceDet.length; index++) {
                sub_list.push({id:index})
            }
            //add back to list
            this.props.section.sub_list=sub_list
        }
        let imgSrc = prodObj.imgs && prodObj.imgs[0].src
        
        {/*get the lowest priceobj*/}
        let low_price=prodObj.priceDet.sort(
            (priceObjA,priceObjB) => 
            priceObjA.price-priceObjB.price)[0]

        return (<div className="w3-container w3-col l3 m6" 
        style={{ height:"400px", width: "300px", margin: "auto", textAlign: "center" }}>
            {prodObj.imgs ? <img style={{ width: "250px", height: "250px" }} src={imgSrc} /> : null}
            <h4 style={{ textTransform: "capitalize" }}>{prodObj.name}</h4>
            {
            <div className="w3-container">
            &#8358;{low_price.price}

            <div>
            <button onClick={this.handlePreCartClick.bind(this)} style={{marginRight:"20px"}} 
            className="w3-btn w3-text-cyan"><i className="fa fa-cart-plus"></i></button>
            <button className="w3-btn w3-text-cyan"><i className="fa fa-heart"></i></button>
            </div>

            </div>}
                <a href={"/product/" + prodObj._id} className="w3-btn w3-cyan w3-text-white">More Info</a>
            <div>
            {/**/}
            

            {this.state.showCartEdit?<div className="overlay">
            <div className="center_overlayDiv w3-text-cyan w3-white">
            <h4>{prodObj.name}</h4>
            {prodObj.priceDet.map((priceObj,index)=>{
                return(<div className="w3-container" style={{marginTop:"10px"}}>
                  <div className="w3-col" style={{width:"50%"}}>Quantity: <input onChange={this.handleInputCartQuanChange.bind(this)} 
                  data-id={index}  type="number" style={{width:"50px"}}/> </div>  
                    <div className="w3-col" style={{width:"50%"}}> (@ &#8358;{priceObj.price} per {priceObj.quantifier})</div> 
                </div>)
            })}
            {/**/}
            <button className="w3-btn w3-text-white w3-cyan" onClick={this.handleAddToCartClick.bind(this)}>
            Add to Cart</button>
             </div></div>
            :null}</div>
        </div>)
    }
}
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, err: null }
    }
    static getDerivedStateFromError(err) {
        return { hasError: true, err: err }
    }
    componentDidCatch(err, info) {
        let log = console.log
        log(err);
        log(info)
    }
    render() {
        if (this.state.hasError) {
            return <h4>Render Error</h4>
        }
        return this.props.children
    }
}
class ListingApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = { listings: [], }
    }
    componentDidMount() {
        fetchList().then(listings => {
            this.setState({ listings: listings })
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
      /* */ let {listings}=this.state
        if (listings) {
            for (let i = 0; i < listings.length; i++) {
                let section={name:listings[i].name,img:listings[i].imgs[0].src,id:listings[i]._id}
                cart.item_list.push(section)
            }
        }
        return (<div className="w3-container">
            {listings.map((listing,index) => {
                console.log(listing)
                return <ErrorBoundary><Suspense fallback={<div>Loading...</div>}>
                    <Product key={index} prodObj={listing} section={cart.item_list[index]}/>
                </Suspense></ErrorBoundary>
            })}
        </div>)
    }
}

ReactDOM.render(<ListingApp />, root)