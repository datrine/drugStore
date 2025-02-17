(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var allowedAttributes = {
  value: "data-value",
  disabled: "data-disabled",
  class: "class",
  type: "type"
};

var Element = function () {
  function Element(element) {
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var i18n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Element);

    this._node = element instanceof HTMLElement ? element : document.createElement(element);
    this._config = { i18n: i18n };

    this._setAttributes(attributes);

    if (attributes.textContent) {
      this._setTextContent(attributes.textContent);
    }

    return this;
  }

  _createClass(Element, [{
    key: "get",
    value: function get() {
      return this._node;
    }
  }, {
    key: "append",
    value: function append(element) {
      this._node.appendChild(element);
      return this;
    }
  }, {
    key: "addClass",
    value: function addClass(className) {
      this._node.classList.add(className);
      return this;
    }
  }, {
    key: "removeClass",
    value: function removeClass(className) {
      this._node.classList.remove(className);
      return this;
    }
  }, {
    key: "toggleClass",
    value: function toggleClass(className) {
      this._node.classList.toggle(className);
      return this;
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(type, callback) {
      this._node.addEventListener(type, callback);
      return this;
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(type, callback) {
      this._node.removeEventListener(type, callback);
      return this;
    }
  }, {
    key: "setText",
    value: function setText(text) {
      this._setTextContent(text);
      return this;
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      return window.getComputedStyle(this._node).height;
    }
  }, {
    key: "setTop",
    value: function setTop(top) {
      this._node.style.top = top + "px";
      return this;
    }
  }, {
    key: "focus",
    value: function focus() {
      this._node.focus();
      return this;
    }
  }, {
    key: "_setTextContent",
    value: function _setTextContent(textContent) {
      this._node.textContent = textContent;
    }
  }, {
    key: "_setAttributes",
    value: function _setAttributes(attributes) {
      for (var key in attributes) {
        if (allowedAttributes[key] && attributes[key]) {
          this._setAttribute(allowedAttributes[key], attributes[key]);
        }
      }
    }
  }, {
    key: "_setAttribute",
    value: function _setAttribute(key, value) {
      this._node.setAttribute(key, value);
    }
  }]);

  return Element;
}();

exports.default = Element;
},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Element = require("./components/Element");

var _Element2 = _interopRequireDefault(_Element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SelectPure = function () {
  function SelectPure(element, config) {
    _classCallCheck(this, SelectPure);

    this._config = _extends({}, config);
    this._state = {
      opened: false
    };
    this._icons = [];

    this._boundHandleClick = this._handleClick.bind(this);
    this._boundUnselectOption = this._unselectOption.bind(this);
    this._boundSortOptions = this._sortOptions.bind(this);

    this._body = new _Element2.default(document.body);

    this._create(element);
    this._setValue();
  }

  _createClass(SelectPure, [{
    key: "_create",
    value: function _create(_element) {
      var element = typeof _element === "string" ? document.querySelector(_element) : _element;

      this._parent = new _Element2.default(element);
      this._select = new _Element2.default("div", { class: "select-pure__select" });
      this._label = new _Element2.default("span", { class: "select-pure__label" });
      this._optionsWrapper = new _Element2.default("div", { class: "select-pure__options" });

      if (this._config.multiple) {
        this._select.addClass("select-pure__select--multiple");
      }

      this._options = this._generateOptions();

      this._select.addEventListener("click", this._boundHandleClick);
      this._select.append(this._label.get());
      this._select.append(this._optionsWrapper.get());
      this._parent.append(this._select.get());
    }
  }, {
    key: "_generateOptions",
    value: function _generateOptions() {
      var _this = this;

      if (this._config.autocomplete) {
        this._autocomplete = new _Element2.default("input", { class: "select-pure__autocomplete", type: "text" });
        this._autocomplete.addEventListener("input", this._boundSortOptions);

        this._optionsWrapper.append(this._autocomplete.get());
      }

      return this._config.options.map(function (_option) {
        var option = new _Element2.default("div", {
          class: "select-pure__option",
          value: _option.value,
          textContent: _option.label,
          disabled: _option.disabled
        });

        _this._optionsWrapper.append(option.get());

        return option;
      });
    }
  }, {
    key: "_handleClick",
    value: function _handleClick(event) {
      event.stopPropagation();

      if (event.target.className === "select-pure__autocomplete") {
        return;
      }

      if (this._state.opened) {
        var option = this._options.find(function (_option) {
          return _option.get() === event.target;
        });

        if (option) {
          this._setValue(option.get().getAttribute("data-value"), true);
        }

        this._select.removeClass("select-pure__select--opened");
        this._body.removeEventListener("click", this._boundHandleClick);
        this._select.addEventListener("click", this._boundHandleClick);

        this._state.opened = false;
        return;
      }

      if (event.target.className === this._config.icon) {
        return;
      }

      this._select.addClass("select-pure__select--opened");
      this._body.addEventListener("click", this._boundHandleClick);
      this._select.removeEventListener("click", this._boundHandleClick);

      this._state.opened = true;

      if (this._autocomplete) {
        this._autocomplete.focus();
      }
    }
  }, {
    key: "_setValue",
    value: function _setValue(value, manual, unselected) {
      var _this2 = this;

      if (value && !unselected) {
        this._config.value = this._config.multiple ? this._config.value.concat(value) : value;
      }
      if (value && unselected) {
        this._config.value = value;
      }

      this._options.forEach(function (_option) {
        _option.removeClass("select-pure__option--selected");
      });

      if (this._config.multiple) {
        var options = this._config.value.map(function (_value) {
          var option = _this2._config.options.find(function (_option) {
            return _option.value === _value;
          });
          var optionNode = _this2._options.find(function (_option) {
            return _option.get().getAttribute("data-value") === option.value.toString();
          });

          optionNode.addClass("select-pure__option--selected");

          return option;
        });

        this._selectOptions(options, manual);

        return;
      }

      if (!this._config.options.length) {
        return;
      }

      var option = this._config.value ? this._config.options.find(function (_option) {
        return _option.value.toString() === _this2._config.value;
      }) : this._config.options[0];

      var optionNode = this._options.find(function (_option) {
        return _option.get().getAttribute("data-value") === option.value.toString();
      });

      optionNode.addClass("select-pure__option--selected");
      this._selectOption(option, manual);
    }
  }, {
    key: "_selectOption",
    value: function _selectOption(option, manual) {
      this._selectedOption = option;

      this._label.setText(option.label);

      if (this._config.onChange && manual) {
        this._config.onChange(option.value);
      }
    }
  }, {
    key: "_selectOptions",
    value: function _selectOptions(options, manual) {
      var _this3 = this;

      this._label.setText("");

      this._icons = options.map(function (_option) {
        var selectedLabel = new _Element2.default("span", {
          class: "select-pure__selected-label",
          textContent: _option.label
        });
        var icon = new _Element2.default("i", {
          class: _this3._config.icon,
          value: _option.value
        });

        icon.addEventListener("click", _this3._boundUnselectOption);

        selectedLabel.append(icon.get());
        _this3._label.append(selectedLabel.get());

        return icon.get();
      });

      if (manual) {
        // eslint-disable-next-line no-magic-numbers
        this._optionsWrapper.setTop(Number(this._select.getHeight().split("px")[0]) + 5);
      }

      if (this._config.onChange && manual) {
        this._config.onChange(this._config.value);
      }
    }
  }, {
    key: "_unselectOption",
    value: function _unselectOption(event) {
      var newValue = [].concat(_toConsumableArray(this._config.value));
      var index = newValue.indexOf(event.target.getAttribute("data-value"));

      // eslint-disable-next-line no-magic-numbers
      if (index !== -1) {
        newValue.splice(index, 1);
      }

      this._setValue(newValue, true, true);
    }
  }, {
    key: "_sortOptions",
    value: function _sortOptions(event) {
      this._options.forEach(function (_option) {
        if (!_option.get().textContent.toLowerCase().startsWith(event.target.value.toLowerCase())) {
          _option.addClass("select-pure__option--hidden");
          return;
        }
        _option.removeClass("select-pure__option--hidden");
      });
    }
  }]);

  return SelectPure;
}();

exports.default = SelectPure;
},{"./components/Element":1}],3:[function(require,module,exports){
var SelectPure =require("select-pure") 

},{"select-pure":2}]},{},[3]);
