import React from "react"
import ReactDOM from "react-dom"

var item = {
    name: "",
    desc: "",
    category: "",
    priceInfoArr: [],
    imgInfoArr: [],
}
const root = document.getElementById("root")

const KeyCodes = {
    comma: 188,
    enter: 13,
};

let imgData = []
let imgNames=[]
const delimiters = [KeyCodes.comma, KeyCodes.enter];

function create_prod() {
    return fetch("/add_item", {
        method: "post",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
        else {
            return new Promise((resolve, reject) => {
                reject("Server error")
            })
        }
    }).catch(err => {
        return new Promise((resolve, reject) => {
            reject(err)
        })
    })
}


function imgGrid(imgData) {
    const img_root = document.getElementById("img_root");
    class Img extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            var src = this.props.src
            return (
                <img src={src} style={{ width: "100%", height: "200px" }} className="form_imgFrame" />
            )
        }
    }
    class ControlImg extends React.Component {
        constructor(props) {
            super(props);
            this.state = { editable: false, imgText: "" }
            this.editImg = this.editImg.bind(this)
            this.delImg = this.delImg.bind(this)
            this.handleChange = this.handleChange.bind(this)
            this.saveEdit = this.saveEdit.bind(this)
            this.imgText = this.props.imgText
        }
        editImg(e) {
            this.setState(state => ({ editable: state.editable ? false : true }),
                function () { console.log(this.state.editable) })
        }
        delImg(e) {
            fetch("/temp/delete",{
                method:"post",
                mode:"cors",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({src:this.props.src})
            }).then(res=>{
                if (res.ok) {
            return this.props.unMounter(this.props.index)
                }
            }).catch(err=>{
                console.log(err)
            })
        }
        handleChange(e) {
            this.setState({ imgText: e.target.value })
        }
        saveEdit(e) {
            this.setState(state => {
                state.editable = false
                return state;
            }, () => {
                this.props.adjustEditer(this.props.index, "imgText", this.state.imgText)
            })
        }
        render() {
            return (
                <div>
                    <div>
                        <div style={{ display: "inline" }}>
                            <button onClick={this.editImg} type="button" className="w3-button w3-theme-d1">
                                <i class="fa fa-edit"> </i>
                            </button>
                        </div>
                        <div style={{ display: "inline" }}>
                            <button onClick={this.delImg} type="button" className="w3-button w3-theme-d1 w3-margin-bottom">
                                <i class="fa fa-remove"> </i>
                            </button>
                        </div>
                    </div>
                    {this.state.editable ? (<div>
                        <input className="w3-input" placeholder="Add image info" onChange={this.handleChange} value={this.state.imgText} />
                        <div>
                            <button onClick={this.saveEdit} type="button" className="w3-button w3-theme-d1 w3-margin-bottom">
                                <i class="fa fa-save"> </i>
                            </button>
                        </div>
                    </div>) :
                        <label className="w3-container">{this.state.imgText ? this.state.imgText : <i style={{ fontweight: "lighter" }}>Add image info:</i>}</label>}
                </div>
            )
        }
    }
    class ImgGrid extends React.Component {
        constructor(props) {
            super(props);
            this.state = this.props.data;
        }
        updateView() {
            setState()
        }
        render() {
            return (
                <div>
                    <Img src={this.props.data.src} />
                    <ControlImg index={this.props.index} imgText={this.props.imgText} src={this.props.data.filePath}
                        unMounter={this.props.unMounter} adjustEditer={this.props.adjustEditer} />
                </div>
            )
        }
    }
    class App extends React.Component {
        constructor(props) {
            super(props)
            this.state = { imgData: this.props.data }
            this.unMountImgGrid = this.unMountImgGrid.bind(this)
            this.adjustEdit = this.adjustEdit.bind(this)
        }
        componentDidUpdate(prevProps) {
            if (prevProps.imgData !== this.props.imgData) {
                this.setState(state => {
                    state.imgData = this.props.imgData;
                    return state;
                })
            }
        }
        adjustEdit(index, prop, value) {
            this.setState(state => {
                state.imgData[index][prop] = value
                //imgData = this.state.imgData
                return state
            })
        }
        unMountImgGrid(index) {
            this.state.imgData.splice(index, 1)
            this.setState(state => state)
            //imgData = this.state.imgData
            getImgStates(imgData)
        }
        render() {
            const { imgData } = this.state
            console.log(imgData)
            item.imgInfoArr=imgData.map(imgObj=>({"src":imgObj.filePath,
            imgText:imgObj.imgText}))
            //item.imgInfoArr.push({ src: data.filePath, imgText: data.imgText })
            console.log(item.imgInfoArr)
            return (
                imgData.map((data, index) => {
                    return <ImgGrid data={data} index={index} unMounter={this.unMountImgGrid}
                        adjustEditer={this.adjustEdit} />
                })
            )

        }
    }
    ReactDOM.render(<App data={imgData} />, img_root)
}

function uploadimg() {
    let arrFiles = Array.from(document.querySelector("#imgs").files)
    document.querySelector("#imgs").innerHTML = ""
    arrFiles.forEach(fileRead)
    function fileRead(file) {
        var name = Date.now() + file.name;
        imgNames.push(name)
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener("load", () => {
            var name = Date.now() + file.name;
            var src = reader.result
            //imgData.push({ name, src })
            fetch("/temp", {
                method: "post",
                mode: 'cors', // no-cors, cors, *same-origin
                headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({ imgUrl: src, name })
            }).then(res => {
                if (res.status === 200) {
                    return res.json()
                }
            }).then(data => {
                imgData.push({ name, src, filePath: data.filePath })
                //item.imgInfoArr.push(data)
                //ensure rendering only occurs after adding last item
                if (imgData.length === arrFiles.length) {
                    imgGrid(imgData)
                }
            }).catch(err => {
                console.log(err);
            })
        })
    }
}
console.log(item)
//represents the name of a product
class Name extends React.Component {
    constructor(props) {
        super(props)
        this.state = { name: item.name }
        this.handleValueChanged = this.handleValueChanged.bind(this)
    }
    handleValueChanged(e) {
        let name = e.target.value
        this.setState(state => {
            state.name = name;
            item.name = name;
            return state
        })
    }
    render() {
        let value = this.state.name
        return (<div className="pad_div">
            <div>
                <label htmlFor="Name" className="w3-label w3-text-white">Name: </label>
            </div>
            <input required name="Name" className="w3-input" value={value} onChange={this.handleValueChanged} />
        </div>)
    }
}

class Description extends React.Component {
    constructor(props) {
        super(props)
        this.state = { desc: item.desc, }
        this.handleValueChanged = this.handleValueChanged.bind(this)
    }
    handleValueChanged(e) {
        let desc = e.target.value;
        this.setState(state => {
            state.desc = desc;
            item.desc = desc;
            return state
        })
    }
    render() {
        let value = this.state.desc
        return (<div className="pad_div">
            <div>
                <label htmlFor="Desc" className="w3-label w3-text-white">Description: </label>
            </div>
            <textarea required className="w3-input" name="Desc" value={value} onChange={this.handleValueChanged}>

            </textarea>
        </div>)
    }
}

class Price extends React.Component {
    constructor(props) {
        super(props)
        this.state = { price: this.props.price }
        this.handlePriceChange = this.handlePriceChange.bind(this)
    }
    //handler for price input value change
    handlePriceChange(e) {
        let price = e.target.value
        this.setState(state => {
            state.price = price;
            return state;
        }, () => {
            let { price } = this.state
            this.props.onPriceEdited(price)
        })
    }
    render() {
        var price = this.props.price;
        let screen_width = window.screen.width
        return (<div>
            {screen_width > 600 ?
                <input required type="number" onChange={this.handlePriceChange} value={price} /> :
                <div className="w3-container">
                    <div><label className="w3-text-white">Price (&#8358;)</label></div>
                    <input required type="number" onChange={this.handlePriceChange} value={price} />
                </div>}
        </div>)
    }
}
//quantifier for price
class Quantifier extends React.Component {
    constructor(props) {
        super(props)
        this.state = { editable: false, quantifier: this.props.quantifier || "unit" }
        this.handleQuanChange = this.handleQuanChange.bind(this)
    }
    handleQuanChange(e) {
        let quantifier = e.target.value
        this.setState(state => {
            state.quantifier = quantifier
            return state;
        }, () => {
            let { quantifier } = this.state
            this.props.onEditQuantifier(quantifier)
        })
    }
    render() {
        var quantifier = this.state.quantifier;
        <input onChange={this.handleQuanChange} value={quantifier} />
        let screen_width = window.screen.width
        return (<div>
            {screen_width > 600 ?
                <input required onChange={this.handleQuanChange} value={quantifier} /> :
                <div className="w3-container">
                    <div><label className="w3-text-white">Quantifier (Kg, cartoon, sachet etc)</label></div>
                    <input required onChange={this.handleQuanChange} value={quantifier} />
                </div>}
        </div>)
    }
}
//represents the price container for a price object
class PriceObj extends React.Component {
    constructor(props) {
        super(props)
        this.state = { priceObj: this.props.priceObj }
        this.handleDeletePriceObj = this.handleDeletePriceObj.bind(this)
        this.handlePriceEdited = this.handlePriceEdited.bind(this)
        this.handleQuantifierEdited = this.handleQuantifierEdited.bind(this)
    }
    componentDidUpdate(prevProps) {
        if (this.props.priceObj !== prevProps.priceObj) {
            this.setState(state => {
                state.priceObj = this.props.priceObj;
                return state;
            })
        }
    }
    handlePriceEdited(price) {
        this.props.priceObj.price = price
        this.setState(state => {
            state.priceObj = this.props.priceObj
            return state;
        })
        //this.props.onEdited(this.props.priceObjIndex, this.props.priceObj)
    }
    handleQuantifierEdited(quantifier) {
        this.props.priceObj.quantifier = quantifier
        this.setState(state => {
            state.priceObj = this.props.priceObj
            return state;
        })
    }
    handleDeletePriceObj(e) {
        e.preventDefault()
        this.props.onDelete(this.props.priceObjIndex)
    }
    render() {
        let price = this.state.priceObj.price
        let quantifier = this.state.priceObj.quantifier
        let screen_width = window.screen.width
        return (<React.Fragment>
            {screen_width > 600 ?
                <React.Fragment>
                    <td>
                        <Price priceObjIndex={this.props.priceObjIndex} onPriceDeleted={this.handleDeletePriceObj}
                            onPriceEdited={this.handlePriceEdited} price={price} />
                    </td>
                    <td>
                        <Quantifier onEditQuantifier={this.handleQuantifierEdited} quantifier={quantifier} />
                    </td>
                    <td><div className="w3-container">
                        <button className="w3-btn w3-red" onClick={this.handleDeletePriceObj}><i className="fa fa-remove"></i></button>
                    </div></td></React.Fragment> : <div>
                    <Price productId={this.props.productId} priceObjIndex={this.props.priceObjIndex} onPriceDeleted={this.handleDeletePriceObj}
                        onPriceEdited={this.handlePriceEdited} price={price} />
                    <Quantifier onEditQuantifier={this.handleQuantifierEdited} quantifier={quantifier} />
                    <div className="w3-container">
                        <button type="button" className="w3-btn w3-red" onClick={this.handleDeletePriceObj}><i className="fa fa-remove"></i></button>
                    </div>
                </div>}
        </React.Fragment>)
    }
}
//represents prices' details including price object array
class PriceDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = { priceInfoArr: item.priceInfoArr || [] }
        this.handlePriceObjEdited = this.handlePriceObjEdited.bind(this)
        this.handleAddPriceObj = this.handleAddPriceObj.bind(this)
        this.handleDeletePriceObj = this.handleDeletePriceObj.bind(this)
    }
    //add a priceObj to the pricedetail collection
    handleAddPriceObj(e) {
        e.preventDefault()
        this.setState(state => {
            state.priceInfoArr.push({ price: null, quantifier: "unit" })
            return state;
        })
    }
    //handles updating a priceObj to the priceDet array
    handlePriceObjEdited(index, priceObj) {
        //this.props.priceDet[index]=priceObj
        //this.props.updateParent(this.props.priceDet)
    }
    //handles removing a priceObj from the priceDet array
    handleDeletePriceObj(index) {
        this.setState(state => {
            state.priceInfoArr.splice(index, 1)
            return state;
        })
    }
    render() {
        let priceInfoArr = this.state.priceInfoArr
        let screen_width = window.screen.width
        console.log(priceInfoArr)
        return (<div className="pad_div">
            <div>
                <div className="w3-btn w3-white w3-text-cyan" onClick={this.handleAddPriceObj}>Add Price</div>
            </div>
            {screen_width > 600 ?
                <div className="w3-container">
                    <table className="w3-table">
                        <tr>
                            <th className="w3-text-white">Price (&#8358;)</th>
                            <th className="w3-text-white">Quantity (Kg, cartoon, sachet, etc)</th>
                            <th></th>
                        </tr>

                        {priceInfoArr.length > 0 ? [].slice.call(priceInfoArr).map((priceObj, index) => {
                            return (
                                <tr>
                                    <PriceObj key={index} priceObj={priceObj} onEdited={this.handlePriceObjEdited}
                                        onDelete={this.handleDeletePriceObj}
                                        priceObjIndex={index}>
                                    </PriceObj>
                                </tr>
                            )
                        }) : <p>Prices</p>}
                    </table></div>
                : <div className="w3-container">
                    {priceInfoArr.length > 0 ? [].slice.call(priceInfoArr).map((priceObj, index) => {
                        return (
                            <div>
                                <PriceObj key={index} priceObj={priceObj} onEdited={this.handlePriceObjEdited}
                                    onDelete={this.handleDeletePriceObj}
                                    priceObjIndex={index}>
                                </PriceObj>
                            </div>
                        )
                    }) : <p>Prices</p>}
                </div>}
        </div>)
    }
}
class MediaGrid extends React.Component {
    constructor(props) {
        super(props)
        this.handleInputUpload = this.handleInputUpload.bind(this)
        //this.handleChildUpdate = this.handleChildUpdate.bind(this)
    }
    handleInputUpload(e) {
        let arrImg = Array.from(e.target.files)
        //imgArrDiv.innerHTML = ""
        imgData = []
        imgNames = []
        uploadimg();
        //this.render()
    }
    render() {
        //let videoObjArr = this.props.media.videos;
        return (<div className=" pad_div">
            <div id="img_root"></div>
            <label className="w3-btn w3-white w3-text-cyan">Select Imgs
            <input hidden className="w3-btn" id="imgs" onChange={this.handleInputUpload} type="file" multiple /></label>
        </div>)
    }
}


//represents the categories/tags of a product
class Tags extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: [
                { id: 1, name: "Apples" },
                { id: 2, name: "Pears" },
            ],
            suggestions:[
                {id:3,names:"Bananas"},
                {id:4,name:"Mangos"},
                {id:5,name:"Lemons"},
                {id:6,name:"Apricots"},
            ]
        }
    }
    handleDelete(e) {
        const tags=this.state.tags.slice(0)
        let id=Number( e.target.dataset.id)
        let index=tags.findIndex(tag=>
            tag.id===id)
        tags.splice(index,1)
        this.setState({tags},()=>{
            item.category=tags.map(tag=>tag.name)
        })
    }
    handleAddition(e){
        let elem=e.target
        if (e.keyCode===13) {
        let tag={};
        tag.name=e.target.value
        tag.id=this.state.tags.length
        const tags=[].concat(this.state.tags,tag)
        e.preventDefault()
        this.setState({tags},()=>{
            item.category=tags.map(tag=>tag.name)
        elem.value=""
        elem.focus()
        })
        }
    }
    render() {
        return (
            <div>
                {this.state.tags.map(tag=>(<label className="w3-white w3-text-cyan w3-round" 
                style={{marginRight:"5px",paddingLeft:"5px"}}>
                    {tag.name}<i onClick={this.handleDelete.bind(this)} data-id={tag.id} className="fa fa-close w3-text-red"></i>
                </label>))}
                <input className="w3-input" onKeyDown={this.handleAddition.bind(this)}/>
            </div>
        )
    }
}

class ProductObj extends React.Component {
    constructor(props) {
        super(props)
        this.data = this.props.data
        this.handleNameUpdate = this.handleNameUpdate.bind(this)
        this.handleDescUpdate = this.handleDescUpdate.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
        this.handleMediagridUpdate = this.handleMediagridUpdate.bind(this)
        this.handlePriceDetailsUpdate = this.handlePriceDetailsUpdate.bind(this)
    }
    handleCreate(e) {
        e.preventDefault()
        console.log(item)
        create_prod().then(res => {
            if (res.isCreated) {
                alert("Product saved...")
            }
        }).catch(err => {
            console.log(err)
        })
    }
    handleNameUpdate(name) {
        this.props.data.name = name
        this.render()
    }
    handleDescUpdate(desc) {
        this.props.data.desc = desc
        this.render()
    }
    handleMediagridUpdate(media) {
        //this.props.data.imgs=media.imgs
        this.render()
    }
    handlePriceDetailsUpdate(priceDet) {
        //this.props.data.priceDet=priceDet
        this.render()
    }
    render() {
        return (
            <form className="w3-container w3-cyan" onSubmit={this.handleCreate}>
                <Name updateParent={this.handleNameUpdate} />
                <Description updateParent={this.handleDescUpdate} />
                <PriceDetails updateParent={this.handlePriceDetailsUpdate} />
                <Tags updateParent={this.handlePriceDetailsUpdate} />
                <MediaGrid updateParent={this.handleDescUpdate} />
                <input type="submit" value="Create" className="w3-btn w3-white w3-text-cyan" />
            </form>)
    }
}



class App extends React.Component {
    render() {
        return (
            <div>
                <ProductObj data={item} />
            </div>
        )
    }
}
ReactDOM.render(<App />, root)
