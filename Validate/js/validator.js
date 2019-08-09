$(function () {
  'use strict';

  window.Validator = function (val, rule) {
    /*
    {
      max: 10,
      min: 2
    }
    */
    this.is_valid = function (new_val) {
      var key;
      if (new_val !== undefined)
        val = new_val;

      /*如果不是必填项且用户未填写任何内容则直接判定为合法*/
      if (!rule.required && !val)
        return true;

      for (key in rule) {
        /*防止重复检查*/
        if (key === 'required')
          continue;

        /*调用rule中相对应的方法*/
        var r = this['validate_' + key]();
        if (!r) return false;
      }

      return true;
    }

    this.validate_max = function () {
      pre_max_min();
      return val <= rule.max;
    }

    this.validate_min = function () {
      pre_max_min();
      return val >= rule.min;
    }

    this.validate_maxlength = function () {
      pre_length();
      return val.length <= rule.maxlength;
    }

    this.validate_minlength = function () {
      pre_length();
      return val.length >= rule.minlength;
    }

    //  输入的值是否为数字 是->true 否->false
    this.validate_numeric = function () {
      return $.isNumeric(val);
    }

    //  输入的值是否为空 否->true 是->false
    this.validate_required = function () {
      //  将输入的值中的space删除
      var real = $.trim(val);

      if (!real && real !== 0) {
        return false;
      }
      return true;
    }

    this.validate_pattern = function () {
      var reg = new RegExp(rule.pattern);
      return reg.test(val);
      //  测试输入数据是否符合正则 返回bool值
    }

    /*用于完成validator_max和validator_min的前置工作
  即将类型转换为float  */

    function pre_max_min() {
      val = parseFloat(val);
    }

    /*用于完成validator_maxlength和validator_minlength的前置工作
  即将类型转换为String  */

    function pre_length() {
      val = val.toString();
    }
  }
})
