define(["lib/backbone"],function(e){var t=e.Model.extend({defaults:{uid:0,name:"New Grid"}}),n=e.Collection.extend({model:t,localStorage:new e.LocalStorage("constellation-index"),selectedModel:null,selectedIndex:-1,_uid:0,initialize:function(){this.listenTo(this,"sync",this.onSync)},onSync:function(){this.length?(this._uid=Math.max.apply(null,this.pluck("uid").concat([0]))+1,this.selectModelAt(0)):this.newRecord()},newRecord:function(){this.create({uid:this._uid++}),this.selectModelAt(this.length-1)},selectModelAt:function(e){return e!==this.selectedIndex&&e>=0&&e<this.length&&(this.selectedIndex=e,this.selectedModel=this.at(e),this.trigger("select")),this.selectedModel}});return new n});