(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    function CheckList(selector)
    {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$element = $(selector);
        this.element = document.querySelector(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

   CheckList.prototype.addClickHandler = function (fn) {
        this.$element.on('click', 'input', function (event) {
            var email = event.target.value;
            fn(email)
                .then(function ()
                {
                    this.removeRow(email);
                }.bind(this));
        }.bind(this));
    };

    CheckList.prototype.addDoubleClickHandler = function ()
    {
        this.element.addEventListener('dblclick', function(event){
            var email = event.target.innerHTML;
            console.log('Редактирование заказа', email);
            console.log('data: ', this.element.innerHTML);
        }.bind(this));
    };



    CheckList.prototype.addRow = function (coffeeOrder)
    {
        this.removeRow(coffeeOrder.emailAddress);
        var rowElement = new Row(coffeeOrder);
        this.$element.append(rowElement.$element);
    };

    CheckList.prototype.removeRow = function (email) {
        this.$element
            .find('[value="' + email + '"]')
            .closest('[data-coffee-order="checkbox"]')
            .remove();
    };

    function Row(coffeeOrder)
    {
        var $div = $('<div></div>', {
            'data-coffee-order': 'checkbox', // Обратите внимание на одинарные кавычки. Они нужны, елси мы используем специальные символы: - (тире)
            'class': 'checkbox' // Здесь class также берем в одинарные кавычки, потому что это зарезервированное JavaScript слово
        });

        var $label = $('<label></label>');

        var $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: coffeeOrder.emailAddress
        });

        var description = ' [' + coffeeOrder.strength + 'x] ';
        description += coffeeOrder.size + ' ';
        if (coffeeOrder.flavor) {
            description += coffeeOrder.flavor + ' ';
        }
        description += coffeeOrder.coffee + ', ';
        description += ' (' + coffeeOrder.emailAddress + ')';


        $label.append($checkbox);
        $label.append(description);
        $div.append($label);



        this.$element = $div;
        switch (coffeeOrder.flavor)
        {
            case ('caramel'):
                this.$element.css('color', 'brown');
                break;
            case ('almond'):
                this.$element.css('color', 'blue');
                break;
            case ('mocha'):
                this.$element.css('color', 'orange');
                break;
        }

        }



    App.CheckList = CheckList;
    window.App = App;
})(window);
