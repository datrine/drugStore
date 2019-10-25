var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { react } from "babel-types";

function beginCart(params) {
    fetch("/login", {}).then().catch();
}

var cart_root = document.getElementById("cart_root");

var BuyModel = function (_React$Component) {
    _inherits(BuyModel, _React$Component);

    function BuyModel(props) {
        _classCallCheck(this, BuyModel);

        var _this = _possibleConstructorReturn(this, (BuyModel.__proto__ || Object.getPrototypeOf(BuyModel)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(BuyModel, [{
        key: "handleDeleteItem",
        value: function handleDeleteItem(e) {
            if (cart.includes(this.props.model)) {
                cart.splice(this.props.id, 1);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var item_info = this.props.item.model;

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    null,
                    React.createElement("img", { src: item.src }),
                    item.priceObj.map(function (obj, id) {
                        React.createElement(
                            "p",
                            null,
                            obj.quantifier,
                            ": ",
                            obj.price,
                            ":",
                            obj.quantifier * obj.price
                        );
                    }),
                    React.createElement(
                        "button",
                        null,
                        React.createElement("i", { className: "fa fa-remove" })
                    )
                )
            );
        }
    }]);

    return BuyModel;
}(React.Component);

var CartApp = function (_React$Component2) {
    _inherits(CartApp, _React$Component2);

    function CartApp(props) {
        _classCallCheck(this, CartApp);

        var _this2 = _possibleConstructorReturn(this, (CartApp.__proto__ || Object.getPrototypeOf(CartApp)).call(this, props));

        _this2.handleItemDelete = _this2.handleItemDelete.bind(_this2);
        return _this2;
    }

    _createClass(CartApp, [{
        key: "handleItemDelete",
        value: function handleItemDelete() {
            this.setState(function (state) {
                return state;
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return React.createElement(
                "div",
                null,
                cart.map(function (model, id) {
                    return React.createElement(BuyModel, { itemDelete: _this3.handleItemDelete, key: model.item_Id, id: id, model: model });
                }),
                React.createElement(
                    "div",
                    { className: "w3-btn" },
                    "Save Cart"
                ),
                React.createElement(
                    "div",
                    { className: "w3-btn" },
                    "Delete Cart"
                )
            );
        }
    }]);

    return CartApp;
}(React.Component);

var cart = [];
var buyModel = {
    time_selected: Date.now(),
    item_Id: null,
    item_info: {}
};