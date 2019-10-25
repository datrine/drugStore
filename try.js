"use strict";

var _reactTagInput = require("react-tag-input");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var KeyCodes = {
  comma: 188,
  enter: 13
};
var delimiters = [KeyCodes.comma, KeyCodes.enter];
var root = document.getElementById("root");

function create_prod() {
  return fetch("/add_item", {
    method: "post",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(item)
  }).then(function (res) {
    if (res.ok) {
      return res.json();
    } else {
      return new Promise(function (resolve, reject) {
        reject("Server error");
      });
    }
  })["catch"](function (err) {
    return new Promise(function (resolve, reject) {
      reject(err);
    });
  });
}

var imgData = [];

function imgGrid(imgData) {
  var img_root = document.getElementById("img_root");

  var Img =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Img, _React$Component);

    function Img(props) {
      _classCallCheck(this, Img);

      return _possibleConstructorReturn(this, _getPrototypeOf(Img).call(this, props));
    }

    _createClass(Img, [{
      key: "render",
      value: function render() {
        var src = this.props.src;
        return React.createElement("img", {
          src: src,
          style: {
            width: "100%",
            height: "200px"
          },
          className: "form_imgFrame"
        });
      }
    }]);

    return Img;
  }(React.Component);

  var ControlImg =
  /*#__PURE__*/
  function (_React$Component2) {
    _inherits(ControlImg, _React$Component2);

    function ControlImg(props) {
      var _this;

      _classCallCheck(this, ControlImg);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ControlImg).call(this, props));
      _this.state = {
        editable: false,
        imgText: ""
      };
      _this.editImg = _this.editImg.bind(_assertThisInitialized(_this));
      _this.delImg = _this.delImg.bind(_assertThisInitialized(_this));
      _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
      _this.saveEdit = _this.saveEdit.bind(_assertThisInitialized(_this));
      _this.imgText = _this.props.imgText;
      return _this;
    }

    _createClass(ControlImg, [{
      key: "editImg",
      value: function editImg(e) {
        this.setState(function (state) {
          return {
            editable: state.editable ? false : true
          };
        }, function () {
          console.log(this.state.editable);
        });
      }
    }, {
      key: "delImg",
      value: function delImg(e) {
        return this.props.unMounter(this.props.index);
      }
    }, {
      key: "handleChange",
      value: function handleChange(e) {
        this.setState({
          imgText: e.target.value
        });
      }
    }, {
      key: "saveEdit",
      value: function saveEdit(e) {
        var _this2 = this;

        this.setState(function (state) {
          state.editable = false;
          return state;
        }, function () {
          _this2.props.adjustEditer(_this2.props.index, "imgText", _this2.state.imgText);
        });
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement("div", null, React.createElement("div", null, React.createElement("div", {
          style: {
            display: "inline"
          }
        }, React.createElement("button", {
          onClick: this.editImg,
          type: "button",
          className: "w3-button w3-theme-d1"
        }, React.createElement("i", {
          "class": "fa fa-edit"
        }, " "))), React.createElement("div", {
          style: {
            display: "inline"
          }
        }, React.createElement("button", {
          onClick: this.delImg,
          type: "button",
          className: "w3-button w3-theme-d1 w3-margin-bottom"
        }, React.createElement("i", {
          "class": "fa fa-remove"
        }, " ")))), this.state.editable ? React.createElement("div", null, React.createElement("input", {
          className: "w3-input",
          placeholder: "Add image info",
          onChange: this.handleChange,
          value: this.state.imgText
        }), React.createElement("div", null, React.createElement("button", {
          onClick: this.saveEdit,
          type: "button",
          className: "w3-button w3-theme-d1 w3-margin-bottom"
        }, React.createElement("i", {
          "class": "fa fa-save"
        }, " ")))) : React.createElement("label", {
          className: "w3-container"
        }, this.state.imgText ? this.state.imgText : React.createElement("i", {
          style: {
            fontweight: "lighter"
          }
        }, "Add image info:")));
      }
    }]);

    return ControlImg;
  }(React.Component);

  var ImgGrid =
  /*#__PURE__*/
  function (_React$Component3) {
    _inherits(ImgGrid, _React$Component3);

    function ImgGrid(props) {
      var _this3;

      _classCallCheck(this, ImgGrid);

      _this3 = _possibleConstructorReturn(this, _getPrototypeOf(ImgGrid).call(this, props));
      _this3.state = _this3.props.data;
      return _this3;
    }

    _createClass(ImgGrid, [{
      key: "updateView",
      value: function updateView() {
        setState();
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement("div", null, React.createElement(Img, {
          src: this.props.data.src
        }), React.createElement(ControlImg, {
          index: this.props.index,
          imgText: this.props.imgText,
          unMounter: this.props.unMounter,
          adjustEditer: this.props.adjustEditer
        }));
      }
    }]);

    return ImgGrid;
  }(React.Component);

  var App =
  /*#__PURE__*/
  function (_React$Component4) {
    _inherits(App, _React$Component4);

    function App(props) {
      var _this4;

      _classCallCheck(this, App);

      _this4 = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
      _this4.state = {
        imgData: _this4.props.data
      };
      _this4.unMountImgGrid = _this4.unMountImgGrid.bind(_assertThisInitialized(_this4));
      _this4.adjustEdit = _this4.adjustEdit.bind(_assertThisInitialized(_this4));
      return _this4;
    }

    _createClass(App, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var _this5 = this;

        if (prevProps.imgData !== this.props.imgData) {
          this.setState(function (state) {
            state.imgData = _this5.props.imgData;
            return state;
          });
        }
      }
    }, {
      key: "adjustEdit",
      value: function adjustEdit(index, prop, value) {
        var _this6 = this;

        this.setState(function (state) {
          state.imgData[index][prop] = value;
          imgData = _this6.state.imgData;
          return state;
        });
      }
    }, {
      key: "unMountImgGrid",
      value: function unMountImgGrid(index) {
        this.state.imgData.splice(index, 1);
        this.setState(function (state) {
          return state;
        });
        imgData = this.state.imgData;
        getImgStates(imgData);
      }
    }, {
      key: "render",
      value: function render() {
        var _this7 = this;

        var imgData = this.state.imgData;
        console.log(imgData); //item.imgInfoArr={filePath:imgData.filePath,imgText:imgData.imgText}

        console.log(imgData);
        console.log(item.imgInfoArr);
        return imgData.map(function (data, index) {
          item.imgInfoArr.push({
            src: data.filePath,
            imgText: data.imgText
          });
          return React.createElement(ImgGrid, {
            data: data,
            index: index,
            unMounter: _this7.unMountImgGrid,
            adjustEditer: _this7.adjustEdit
          });
        });
      }
    }]);

    return App;
  }(React.Component);

  ReactDOM.render(React.createElement(App, {
    data: imgData
  }), img_root);
}

function uploadimg() {
  var arrFiles = Array.from(document.querySelector("#imgs").files);
  document.querySelector("#imgs").innerHTML = "";
  arrFiles.forEach(fileRead);

  function fileRead(file) {
    var name = Date.now() + file.name;
    imgNames.push(name);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", function () {
      var name = Date.now() + file.name;
      var src = reader.result; //imgData.push({ name, src })

      fetch("/temp", {
        method: "post",
        mode: 'cors',
        // no-cors, cors, *same-origin
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          imgUrl: src,
          name: name
        })
      }).then(function (res) {
        if (res.status === 200) {
          return res.json();
        }
      }).then(function (data) {
        imgData.push({
          name: name,
          src: src,
          filePath: data.filePath
        }); //item.imgInfoArr.push(data)
        //ensure rendering only occurs after adding last item

        if (imgData.length === arrFiles.length) {
          imgGrid(imgData);
        }
      })["catch"](function (err) {
        console.log(err);
      });
    });
  }
} //represents the name of a product


var Name =
/*#__PURE__*/
function (_React$Component5) {
  _inherits(Name, _React$Component5);

  function Name(props) {
    var _this8;

    _classCallCheck(this, Name);

    _this8 = _possibleConstructorReturn(this, _getPrototypeOf(Name).call(this, props));
    _this8.state = {
      name: item.name
    };
    _this8.handleValueChanged = _this8.handleValueChanged.bind(_assertThisInitialized(_this8));
    return _this8;
  }

  _createClass(Name, [{
    key: "handleValueChanged",
    value: function handleValueChanged(e) {
      var name = e.target.value;
      this.setState(function (state) {
        state.name = name;
        item.name = name;
        return state;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var value = this.state.name;
      return React.createElement("div", {
        className: "pad_div"
      }, React.createElement("div", null, React.createElement("label", {
        htmlFor: "Name",
        className: "w3-label w3-text-white"
      }, "Name: ")), React.createElement("input", {
        required: true,
        name: "Name",
        className: "w3-input",
        value: value,
        onChange: this.handleValueChanged
      }));
    }
  }]);

  return Name;
}(React.Component);

var Description =
/*#__PURE__*/
function (_React$Component6) {
  _inherits(Description, _React$Component6);

  function Description(props) {
    var _this9;

    _classCallCheck(this, Description);

    _this9 = _possibleConstructorReturn(this, _getPrototypeOf(Description).call(this, props));
    _this9.state = {
      desc: item.desc
    };
    _this9.handleValueChanged = _this9.handleValueChanged.bind(_assertThisInitialized(_this9));
    return _this9;
  }

  _createClass(Description, [{
    key: "handleValueChanged",
    value: function handleValueChanged(e) {
      var desc = e.target.value;
      this.setState(function (state) {
        state.desc = desc;
        item.desc = desc;
        return state;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var value = this.state.desc;
      return React.createElement("div", {
        className: "pad_div"
      }, React.createElement("div", null, React.createElement("label", {
        htmlFor: "Desc",
        className: "w3-label w3-text-white"
      }, "Description: ")), React.createElement("textarea", {
        required: true,
        className: "w3-input",
        name: "Desc",
        value: value,
        onChange: this.handleValueChanged
      }));
    }
  }]);

  return Description;
}(React.Component);

var Price =
/*#__PURE__*/
function (_React$Component7) {
  _inherits(Price, _React$Component7);

  function Price(props) {
    var _this10;

    _classCallCheck(this, Price);

    _this10 = _possibleConstructorReturn(this, _getPrototypeOf(Price).call(this, props));
    _this10.state = {
      price: _this10.props.price
    };
    _this10.handlePriceChange = _this10.handlePriceChange.bind(_assertThisInitialized(_this10));
    return _this10;
  } //handler for price input value change


  _createClass(Price, [{
    key: "handlePriceChange",
    value: function handlePriceChange(e) {
      var _this11 = this;

      var price = e.target.value;
      this.setState(function (state) {
        state.price = price;
        return state;
      }, function () {
        var price = _this11.state.price;

        _this11.props.onPriceEdited(price);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var price = this.props.price;
      var screen_width = window.screen.width;
      return React.createElement("div", null, screen_width > 600 ? React.createElement("input", {
        required: true,
        type: "number",
        onChange: this.handlePriceChange,
        value: price
      }) : React.createElement("div", {
        className: "w3-container"
      }, React.createElement("div", null, React.createElement("label", {
        className: "w3-text-white"
      }, "Price (\u20A6)")), React.createElement("input", {
        required: true,
        type: "number",
        onChange: this.handlePriceChange,
        value: price
      })));
    }
  }]);

  return Price;
}(React.Component); //quantifier for price


var Quantifier =
/*#__PURE__*/
function (_React$Component8) {
  _inherits(Quantifier, _React$Component8);

  function Quantifier(props) {
    var _this12;

    _classCallCheck(this, Quantifier);

    _this12 = _possibleConstructorReturn(this, _getPrototypeOf(Quantifier).call(this, props));
    _this12.state = {
      editable: false,
      quantifier: _this12.props.quantifier || "unit"
    };
    _this12.handleQuanChange = _this12.handleQuanChange.bind(_assertThisInitialized(_this12));
    return _this12;
  }

  _createClass(Quantifier, [{
    key: "handleQuanChange",
    value: function handleQuanChange(e) {
      var _this13 = this;

      var quantifier = e.target.value;
      this.setState(function (state) {
        state.quantifier = quantifier;
        return state;
      }, function () {
        var quantifier = _this13.state.quantifier;

        _this13.props.onEditQuantifier(quantifier);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var quantifier = this.state.quantifier;
      React.createElement("input", {
        onChange: this.handleQuanChange,
        value: quantifier
      });
      var screen_width = window.screen.width;
      return React.createElement("div", null, screen_width > 600 ? React.createElement("input", {
        required: true,
        onChange: this.handleQuanChange,
        value: quantifier
      }) : React.createElement("div", {
        className: "w3-container"
      }, React.createElement("div", null, React.createElement("label", {
        className: "w3-text-white"
      }, "Quantifier (Kg, cartoon, sachet etc)")), React.createElement("input", {
        required: true,
        onChange: this.handleQuanChange,
        value: quantifier
      })));
    }
  }]);

  return Quantifier;
}(React.Component); //represents the price container for a price object


var PriceObj =
/*#__PURE__*/
function (_React$Component9) {
  _inherits(PriceObj, _React$Component9);

  function PriceObj(props) {
    var _this14;

    _classCallCheck(this, PriceObj);

    _this14 = _possibleConstructorReturn(this, _getPrototypeOf(PriceObj).call(this, props));
    _this14.state = {
      priceObj: _this14.props.priceObj
    };
    _this14.handleDeletePriceObj = _this14.handleDeletePriceObj.bind(_assertThisInitialized(_this14));
    _this14.handlePriceEdited = _this14.handlePriceEdited.bind(_assertThisInitialized(_this14));
    _this14.handleQuantifierEdited = _this14.handleQuantifierEdited.bind(_assertThisInitialized(_this14));
    return _this14;
  }

  _createClass(PriceObj, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this15 = this;

      if (this.props.priceObj !== prevProps.priceObj) {
        this.setState(function (state) {
          state.priceObj = _this15.props.priceObj;
          return state;
        });
      }
    }
  }, {
    key: "handlePriceEdited",
    value: function handlePriceEdited(price) {
      var _this16 = this;

      this.props.priceObj.price = price;
      this.setState(function (state) {
        state.priceObj = _this16.props.priceObj;
        return state;
      }); //this.props.onEdited(this.props.priceObjIndex, this.props.priceObj)
    }
  }, {
    key: "handleQuantifierEdited",
    value: function handleQuantifierEdited(quantifier) {
      var _this17 = this;

      this.props.priceObj.quantifier = quantifier;
      this.setState(function (state) {
        state.priceObj = _this17.props.priceObj;
        return state;
      });
    }
  }, {
    key: "handleDeletePriceObj",
    value: function handleDeletePriceObj(e) {
      e.preventDefault();
      this.props.onDelete(this.props.priceObjIndex);
    }
  }, {
    key: "render",
    value: function render() {
      var price = this.state.priceObj.price;
      var quantifier = this.state.priceObj.quantifier;
      var screen_width = window.screen.width;
      return React.createElement(React.Fragment, null, screen_width > 600 ? React.createElement(React.Fragment, null, React.createElement("td", null, React.createElement(Price, {
        priceObjIndex: this.props.priceObjIndex,
        onPriceDeleted: this.handleDeletePriceObj,
        onPriceEdited: this.handlePriceEdited,
        price: price
      })), React.createElement("td", null, React.createElement(Quantifier, {
        onEditQuantifier: this.handleQuantifierEdited,
        quantifier: quantifier
      })), React.createElement("td", null, React.createElement("div", {
        className: "w3-container"
      }, React.createElement("button", {
        className: "w3-btn w3-red",
        onClick: this.handleDeletePriceObj
      }, React.createElement("i", {
        className: "fa fa-remove"
      }))))) : React.createElement("div", null, React.createElement(Price, {
        productId: this.props.productId,
        priceObjIndex: this.props.priceObjIndex,
        onPriceDeleted: this.handleDeletePriceObj,
        onPriceEdited: this.handlePriceEdited,
        price: price
      }), React.createElement(Quantifier, {
        onEditQuantifier: this.handleQuantifierEdited,
        quantifier: quantifier
      }), React.createElement("div", {
        className: "w3-container"
      }, React.createElement("button", {
        type: "button",
        className: "w3-btn w3-red",
        onClick: this.handleDeletePriceObj
      }, React.createElement("i", {
        className: "fa fa-remove"
      })))));
    }
  }]);

  return PriceObj;
}(React.Component); //represents prices' details including price object array


var PriceDetails =
/*#__PURE__*/
function (_React$Component10) {
  _inherits(PriceDetails, _React$Component10);

  function PriceDetails(props) {
    var _this18;

    _classCallCheck(this, PriceDetails);

    _this18 = _possibleConstructorReturn(this, _getPrototypeOf(PriceDetails).call(this, props));
    _this18.state = {
      priceInfoArr: item.priceInfoArr || []
    };
    _this18.handlePriceObjEdited = _this18.handlePriceObjEdited.bind(_assertThisInitialized(_this18));
    _this18.handleAddPriceObj = _this18.handleAddPriceObj.bind(_assertThisInitialized(_this18));
    _this18.handleDeletePriceObj = _this18.handleDeletePriceObj.bind(_assertThisInitialized(_this18));
    return _this18;
  } //add a priceObj to the pricedetail collection


  _createClass(PriceDetails, [{
    key: "handleAddPriceObj",
    value: function handleAddPriceObj(e) {
      e.preventDefault();
      this.setState(function (state) {
        state.priceInfoArr.push({
          price: null,
          quantifier: "unit"
        });
        return state;
      });
    } //handles updating a priceObj to the priceDet array

  }, {
    key: "handlePriceObjEdited",
    value: function handlePriceObjEdited(index, priceObj) {} //this.props.priceDet[index]=priceObj
    //this.props.updateParent(this.props.priceDet)
    //handles removing a priceObj from the priceDet array

  }, {
    key: "handleDeletePriceObj",
    value: function handleDeletePriceObj(index) {
      this.setState(function (state) {
        state.priceInfoArr.splice(index, 1);
        return state;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this19 = this;

      var priceInfoArr = this.state.priceInfoArr;
      var screen_width = window.screen.width;
      console.log(priceInfoArr);
      return React.createElement("div", {
        className: "pad_div"
      }, React.createElement("div", null, React.createElement("div", {
        className: "w3-btn w3-white w3-text-cyan",
        onClick: this.handleAddPriceObj
      }, "Add Price")), screen_width > 600 ? React.createElement("div", {
        className: "w3-container"
      }, React.createElement("table", {
        className: "w3-table"
      }, React.createElement("tr", null, React.createElement("th", {
        className: "w3-text-white"
      }, "Price (\u20A6)"), React.createElement("th", {
        className: "w3-text-white"
      }, "Quantity (Kg, cartoon, sachet, etc)"), React.createElement("th", null)), priceInfoArr.length > 0 ? [].slice.call(priceInfoArr).map(function (priceObj, index) {
        return React.createElement("tr", null, React.createElement(PriceObj, {
          key: index,
          priceObj: priceObj,
          onEdited: _this19.handlePriceObjEdited,
          onDelete: _this19.handleDeletePriceObj,
          priceObjIndex: index
        }));
      }) : React.createElement("p", null, "Prices"))) : React.createElement("div", {
        className: "w3-container"
      }, priceInfoArr.length > 0 ? [].slice.call(priceInfoArr).map(function (priceObj, index) {
        return React.createElement("div", null, React.createElement(PriceObj, {
          key: index,
          priceObj: priceObj,
          onEdited: _this19.handlePriceObjEdited,
          onDelete: _this19.handleDeletePriceObj,
          priceObjIndex: index
        }));
      }) : React.createElement("p", null, "Prices")));
    }
  }]);

  return PriceDetails;
}(React.Component);

var MediaGrid =
/*#__PURE__*/
function (_React$Component11) {
  _inherits(MediaGrid, _React$Component11);

  function MediaGrid(props) {
    var _this20;

    _classCallCheck(this, MediaGrid);

    _this20 = _possibleConstructorReturn(this, _getPrototypeOf(MediaGrid).call(this, props));
    _this20.handleInputUpload = _this20.handleInputUpload.bind(_assertThisInitialized(_this20)); //this.handleChildUpdate = this.handleChildUpdate.bind(this)

    return _this20;
  }

  _createClass(MediaGrid, [{
    key: "handleInputUpload",
    value: function handleInputUpload(e) {
      var arrImg = Array.from(e.target.files); //imgArrDiv.innerHTML = ""

      imgData = [];
      imgNames = [];
      uploadimg(); //this.render()
    }
  }, {
    key: "render",
    value: function render() {
      //let videoObjArr = this.props.media.videos;
      return React.createElement("div", {
        className: " pad_div"
      }, React.createElement("div", {
        id: "img_root"
      }), React.createElement("label", {
        className: "w3-btn w3-white w3-text-cyan"
      }, "Select Imgs", React.createElement("input", {
        hidden: true,
        className: "w3-btn",
        id: "imgs",
        onChange: this.handleInputUpload,
        type: "file",
        multiple: true
      })));
    }
  }]);

  return MediaGrid;
}(React.Component);

var Tags =
/*#__PURE__*/
function (_React$Component12) {
  _inherits(Tags, _React$Component12);

  function Tags(props) {
    var _this21;

    _classCallCheck(this, Tags);

    _this21 = _possibleConstructorReturn(this, _getPrototypeOf(Tags).call(this, props));
    _this21.state = {
      tags: item.tags
    };
    _this21.handleValueChanged = _this21.handleValueChanged.bind(_assertThisInitialized(_this21));
    return _this21;
  }

  _createClass(Tags, [{
    key: "handleValueChanged",
    value: function handleValueChanged(e) {
      var name = e.target.value;
      this.setState(function (state) {
        state.name = name;
        item.name = name;
        return state;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var value = this.state.name;
      return React.createElement("div", {
        className: "pad_div"
      }, React.createElement("div", null, React.createElement("label", {
        htmlFor: "Name",
        className: "w3-label w3-text-white"
      }, "Tags: ")), React.createElement("input", {
        name: "Name",
        className: "w3-input",
        value: value,
        onChange: this.handleValueChanged
      }));
    }
  }]);

  return Tags;
}(React.Component);

var Category =
/*#__PURE__*/
function (_React$Component13) {
  _inherits(Category, _React$Component13);

  function Category(props) {
    var _this22;

    _classCallCheck(this, Category);

    _this22 = _possibleConstructorReturn(this, _getPrototypeOf(Category).call(this, props));
    _this22.state = {
      tags: [{
        id: "Thailand",
        text: "Thailand"
      }, {
        id: "India",
        text: "India"
      }],
      suggestions: [{
        id: 'USA',
        text: 'USA'
      }, {
        id: 'Germany',
        text: 'Germany'
      }, {
        id: 'Austria',
        text: 'Austria'
      }, {
        id: 'Costa Rica',
        text: 'Costa Rica'
      }, {
        id: 'Sri Lanka',
        text: 'Sri Lanka'
      }, {
        id: 'Thailand',
        text: 'Thailand'
      }]
    };
    _this22.handleDelete = _this22.handleDelete.bind(_assertThisInitialized(_this22));
    _this22.handleAddition = _this22.handleAddition.bind(_assertThisInitialized(_this22));
    _this22.handleDrag = _this22.handleDrag.bind(_assertThisInitialized(_this22));
    return _this22;
  }

  _createClass(Category, [{
    key: "handleDelete",
    value: function handleDelete(i) {
      var tags = this.state.tags;
      this.setState({
        tags: tags.filter(function (tag, index) {
          return index !== i;
        })
      });
    }
  }, {
    key: "handleAddition",
    value: function handleAddition(tag) {
      this.setState(function (state) {
        return {
          tags: [].concat(_toConsumableArray(state.tags), [tag])
        };
      });
    }
  }, {
    key: "handleDrag",
    value: function handleDrag(tag, currPos, newPos) {
      var tags = _toConsumableArray(this.state.tags);

      var newTags = tags.slice();
      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag); // re-render

      this.setState({
        tags: newTags
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          tags = _this$state.tags,
          suggestions = _this$state.suggestions;
      return React.createElement("div", null, React.createElement(_reactTagInput.WithContext, {
        tags: tags,
        suggestions: suggestions,
        handleDelete: this.handleDelete,
        handleAddition: this.handleAddition,
        handleDrag: this.handleDrag,
        delimiters: delimiters
      }));
    }
  }]);

  return Category;
}(React.Component);

var ProductObj =
/*#__PURE__*/
function (_React$Component14) {
  _inherits(ProductObj, _React$Component14);

  function ProductObj(props) {
    var _this23;

    _classCallCheck(this, ProductObj);

    _this23 = _possibleConstructorReturn(this, _getPrototypeOf(ProductObj).call(this, props));
    _this23.data = _this23.props.data;
    _this23.handleNameUpdate = _this23.handleNameUpdate.bind(_assertThisInitialized(_this23));
    _this23.handleDescUpdate = _this23.handleDescUpdate.bind(_assertThisInitialized(_this23));
    _this23.handleCreate = _this23.handleCreate.bind(_assertThisInitialized(_this23));
    _this23.handleMediagridUpdate = _this23.handleMediagridUpdate.bind(_assertThisInitialized(_this23));
    _this23.handlePriceDetailsUpdate = _this23.handlePriceDetailsUpdate.bind(_assertThisInitialized(_this23));
    return _this23;
  }

  _createClass(ProductObj, [{
    key: "handleCreate",
    value: function handleCreate(e) {
      e.preventDefault();
      console.log(item);
      create_prod().then(function (res) {
        if (res.isCreated) {
          alert("Product saved...");
        }
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }, {
    key: "handleNameUpdate",
    value: function handleNameUpdate(name) {
      this.props.data.name = name;
      this.render();
    }
  }, {
    key: "handleDescUpdate",
    value: function handleDescUpdate(desc) {
      this.props.data.desc = desc;
      this.render();
    }
  }, {
    key: "handleMediagridUpdate",
    value: function handleMediagridUpdate(media) {
      //this.props.data.imgs=media.imgs
      this.render();
    }
  }, {
    key: "handlePriceDetailsUpdate",
    value: function handlePriceDetailsUpdate(priceDet) {
      //this.props.data.priceDet=priceDet
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("form", {
        className: "w3-container w3-cyan",
        onSubmit: this.handleCreate
      }, React.createElement(Name, {
        updateParent: this.handleNameUpdate
      }), React.createElement(Category, null), React.createElement(Description, {
        updateParent: this.handleDescUpdate
      }), React.createElement(PriceDetails, {
        updateParent: this.handlePriceDetailsUpdate
      }), React.createElement(Tags, {
        updateParent: this.handlePriceDetailsUpdate
      }), React.createElement(MediaGrid, {
        updateParent: this.handleDescUpdate
      }), React.createElement("input", {
        type: "submit",
        value: "Create",
        className: "w3-btn w3-white w3-text-cyan"
      }));
    }
  }]);

  return ProductObj;
}(React.Component);

var App =
/*#__PURE__*/
function (_React$Component15) {
  _inherits(App, _React$Component15);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null, React.createElement(ProductObj, {
        data: item
      }));
    }
  }]);

  return App;
}(React.Component);

function beginCreateProdReact() {
  ReactDOM.render(React.createElement(App, null), root);
}

var item = {
  name: "",
  desc: "",
  category: "",
  priceInfoArr: [],
  imgInfoArr: []
};
