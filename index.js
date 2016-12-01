var Lawnchair =require('lawnchair');
module.exports.LawnchairPromise=function(options) {
        var ret = {};
        ['keys','save','batch','get','exists','each','all','remove','nuke'].forEach(function(key){
                ret[key] = function() {
                        var args = Array.prototype.slice.apply(arguments);
                        return new Promise(function(resolve1,reject1){
                                args.push(resolve1);
                                new Lawnchair(options, function(store) {
                                        store[key].apply(store, args);
                                })
                        });
                }
        });
		return ret;

}
