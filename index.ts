var Lawnchair =require('lawnchair');
module.exports.LawnchairPromise=function(options) {
	return new Promise((resolve, reject)=>{
		new Lawnchair(options, function(store) {
			const ret = {};
			['keys','save','batch','get','exists','each','all','remove','nuke'].forEach(key=>{
				ret[key] = function() {
					var args = Array.prototype.slice.apply(arguments);
					return new Promise(resolve1=>{
						args.push(resolve1);
						store[key].apply(store, args);
					});
				}
			});
			resolve(ret);
		});
	});

}
