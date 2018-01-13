(function (window) {
    'use strict';
    var App = window.App || {};
    var dataCount = 0;

    function DataStore()
    {
        dataCount++;
        if (dataCount > 1)
        {
            return;  // делаем data закрытым? одноразовым?
        }
        this.data = {};
    }

    DataStore.prototype.add = function (key, val)
    {
        this.data[key] = val;
    };

    DataStore.prototype.get = function (key)
    {
        return this.data[key];
    };

    DataStore.prototype.getAll = function ()
    {
        return this.data;
    };

    DataStore.prototype.remove = function (key)
    {
        delete this.data[key];
    };

    App.DataStore = DataStore;
    window.App = App;
})(window);