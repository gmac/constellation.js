// Constellation.js 0.2.0
// (c) 2011-2013 Greg MacWilliam
// Freely distributed under the MIT license
// Docs: https://github.com/gmac/constellation.js
(function(t,n){var e=n(Math.sqrt,Math.min,Math.max,Math.abs);"undefined"!=typeof exports?module.exports=e:"function"==typeof define&&define.amd?define(e):t.Const=e})(this,function(t,n,e,i){function o(t){return t instanceof Array}function s(t){return"function"==typeof t}function r(t){return Array.prototype.slice.call(t)}var h={},u=h.utils={size:function(t){if(o(t))return t.length;var n=0;for(var e in t)t.hasOwnProperty(e)&&n++;return n},contains:function(t,n){if(o(t)){if(s(Array.prototype.indexOf))return t.indexOf(n)>=0;for(var e=t.length,i=0;e>i;)if(t[i++]===n)return!0}return t&&t.hasOwnProperty(n)},each:function(t,n,e){var i=0;if(o(t))for(var s=t.length;s>i;)n.call(e,t[i],i++);else for(i in t)t.hasOwnProperty(i)&&n.call(e,t[i],i);return t},map:function(t,n,e){var i=0;if(o(t))for(var s=t.length;s>i;)t[i]=n.call(e,t[i],i++);else for(i in t)t.hasOwnProperty(i)&&(t[i]=n.call(e,t[i],i));return t},all:function(t,n,e){for(var i=t.length,o=0;i>o;)if(!n.call(e,t[o],o++))return!1;return!0},toArray:function(t){var n=[];for(var e in t)t.hasOwnProperty(e)&&n.push(t[e]);return n}},a=h.Point=function(t,n){this.x=t||0,this.y=n||0},d=h.Rect=function(t,n,e,i){this.x=t||0,this.y=n||0,this.width=e||0,this.height=i||0};h.distance=function(n,e){var i=e.x-n.x,o=e.y-n.y;return t(i*i+o*o)},h.ccw=function(t,n,e,i){return i?(e.y-t.y)*(n.x-t.x)>(n.y-t.y)*(e.x-t.x):(e.y-t.y)*(n.x-t.x)>=(n.y-t.y)*(e.x-t.x)},h.intersect=function(t,n,e,i){return h.ccw(t,e,i)!==h.ccw(n,e,i)&&h.ccw(t,n,e)!==h.ccw(t,n,i)},h.degreesToRadians=function(t){return t*Math.PI/180},h.radiansToDegrees=function(t){return 180*t/Math.PI},h.angleRadians=function(t,n){return Math.atan2(n.y-t.y,n.x-t.x)},h.angleDegrees=function(t,n){var e=h.radiansToDegrees(h.angleRadians(t,n));return 0>e?e+360:e},h.angleSector=function(t,n,e){var i=2*Math.PI;return n=n||8,e=e||i/(2*n),0>t&&(t=i+t),t+=e,t>i&&(t-=i),Math.floor(t/(i/n))},h.getRectForPointRing=function(t){var i=t[0],o=i.x,s=i.x,r=i.y,h=i.y;return u.each(t,function(t){o=n(o,t.x),s=e(s,t.x),r=n(r,t.y),h=e(h,t.y)}),new d(o,r,s-o,h-r)},h.hitTestRect=function(t,i){var o=n(i.x,i.x+i.width),s=e(i.x,i.x+i.width),r=n(i.y,i.y+i.height),h=e(i.y,i.y+i.height);return t.x>=o&&t.y>=r&&s>=t.x&&h>=t.y},h.hitTestPointRing=function(t,e){for(var i,o,s=e.length,r=new a(0,t.y),h=0,u=0;s>u;)i=e[u],o=e[(u+1)%s],r.x=n(r.x,n(i.x,o.x)-1),h+=this.intersect(r,t,i,o)?1:0,u++;return h%2>0},h.snapPointToLineSegment=function(t,n,e){var i=t.x-n.x,o=t.y-n.y,s=e.x-n.x,r=e.y-n.y,h=s*s+r*r,u=i*s+o*r,d=u/h;return 0>d?new a(n.x,n.y):d>1?new a(e.x,e.y):new a(n.x+s*d,n.y+r*d)},h.getNearestPointToPoint=function(t,n){var e,o,s=null,r=0/0,u=n.length-1;for(n.sort(function(n,e){return n=i(t.x-n.x),e=i(t.x-e.x),e-n});u>=0&&(e=n[u--],r>i(t.x-e.x)||isNaN(r));)o=h.distance(t,e),(r>o||isNaN(r))&&(s=e,r=o);return s};var c=h.Node=function(t,n,e,i,o){this.id=t,this.x=n||0,this.y=e||0,this.to=o||{},this.data=i||null},f=h.Polygon=function(t,n,e){this.id=t,this.nodes=n.slice(),this.data=e||null},l=h.Path=function(t,n,e){this.nodes=t||[],this.weight=n||0,this.estimate=e||0};l.prototype={copy:function(t,n){return new l(this.nodes.slice(),t||this.weight,n||this.estimate)},last:function(){return this.nodes[this.nodes.length-1]},contains:function(t){return u.contains(t)},prioratize:function(t,n){return n.estimate-t.estimate},dispose:function(){this.nodes.length=0,this.nodes=null}};var y=h.Grid=function(t){this.reset(t)};return y.prototype={nodes:{},polys:{},_i:0,toJSON:function(){return{nodes:this.nodes,polys:this.polys,i:this._i}},reset:function(t){this.nodes={},this.polys={},this._i=0,t&&(t.i&&(this._i=t.i),u.each(t.nodes||{},function(t){this.nodes[t.id]=t},this),u.each(t.polys||{},function(t){this.polys[t.id]=t},this))},addNode:function(t,n,e){"object"==typeof t&&(e=t,t=0);var i=new c(e&&e.id||"n"+this._i++,t,n,e);return this.nodes[i.id]=i,i},getNodeById:function(t){return this.nodes.hasOwnProperty(t)?this.nodes[t]:null},getNodes:function(t,n){return(!o(t)||n)&&(t=r(arguments)),u.map(t.slice(),function(t){return this.getNodeById(t)},this)},getNumNodes:function(){return u.size(this.nodes)},hasNodes:function(t,n){return(!o(t)||n)&&(t=r(arguments)),u.all(t,function(t){return this.nodes.hasOwnProperty(t)},this)},joinNodes:function(t,n){(!o(t)||n)&&(t=r(arguments));var e=!1;return t.length>1&&this.hasNodes(t)&&u.each(t,function(n){for(var i=this.nodes[n],o=t.length,s=0;o>s;)n=t[s++],n!==i.id&&(i.to[n]=1,e=!0)},this),e},splitNodes:function(t,n){if((!o(t)||n)&&(t=r(arguments)),2>t.length)return this.detachNodes(t);var e=!1;return u.each(t,function(n){var i=this.nodes[n];if(i&&i.to)for(n in i.to)u.contains(t,n)&&(delete i.to[n],e=!0)},this),e},detachNodes:function(t,n){(!o(t)||n)&&(t=r(arguments));var e=!1;return u.each(t,function(t){var n,i,o=this.nodes[t];if(o&&o.to){for(i in o.to)delete o.to[i],n=this.nodes[i],n&&n.to&&delete n.to[t];e=!0}},this),e},removeNodes:function(t,n){(!o(t)||n)&&(t=r(arguments));var e=this.detachNodes(t);return u.each(t,function(t){var n,i;if(this.nodes.hasOwnProperty(t)){delete this.nodes[t];for(i in this.polys)n=this.polys[i],n&&u.contains(n.nodes,t)&&delete this.polys[i];e=!0}},this),e},addPolygon:function(t,n){if(t.length>=3&&this.hasNodes(t)){var e=new f("p"+this._i++,t,n);return this.polys[e.id]=e,e}return null},getPolygonById:function(t){return this.polys.hasOwnProperty(t)?this.polys[t]:null},getPolygons:function(t,n){return(!o(t)||n)&&(t=r(arguments)),u.map(t.slice(),function(t){return this.getPolygonById(t)},this)},getNodesForPolygon:function(t){return this.polys.hasOwnProperty(t)?u.map(this.polys[t].nodes.slice(),function(t){return this.nodes[t]},this):null},getNumPolygons:function(){return u.size(this.polys)},removePolygons:function(t,n){(!o(t)||n)&&(t=r(arguments));var e=!1;return u.each(t,function(t){this.polys.hasOwnProperty(t)&&(delete this.polys[t],e=!0)},this),e},findPath:function(t,n,e,i){var o,r,u,a,d,c,f,y=[],g={},p=this.getNodeById(t),P=this.getNodeById(n),v=0;for(s(e)||(e=h.distance),s(i)||(i=h.distance),y.push(new l([p],e(p,p)));y.length>0;){r=y.pop(),p=r.last();for(f in p.to)p.to.hasOwnProperty(f)&&(u=this.nodes[f],u&&!r.contains(u)&&(d=r.weight+e(p,u),(g[u.id]||d)>=d&&(g[u.id]=d,c=d+i(u,P),(!o||o.weight>c)&&(a=r.copy(d,c),a.nodes.push(u),u.id===P.id?(o&&o.dispose(),o=a):y.push(a),a=null))),u=null);r.dispose(),r=p=null,y.sort(l.prototype.prioratize),v++}return y=g=P=null,{valid:!!o,weight:o?o.weight:0,cycles:v,nodes:o?o.nodes:[]}},findPathWithFewestNodes:function(t,n){var e=function(){return 1};return this.findPath(t,n,e,e)},snapPointToGrid:function(t,n){var e=null,i=0/0,o=[],s={};return u.each(this.nodes,function(n,r){if(t.id!==r)for(var u in n.to)if(n.to.hasOwnProperty(u)&&!s.hasOwnProperty(u+" "+n.id)){var a=this.nodes[u],d=h.snapPointToLineSegment(t,n,a),c=h.distance(t,d);s[n.id+" "+a.id]=!0,(!e||i>c)&&(e=d,i=c,o[0]=n.id,o[1]=a.id)}},this),n?{point:e,offset:i,segment:o}:e||t},getNearestNodeToNode:function(t){var n=[],e=this.getNodeById(t);return e?(u.each(this.nodes,function(t){t.id!==e.id&&n.push(t)},this),h.getNearestPointToPoint(e,n)):null},getNearestNodeToPoint:function(t){return h.getNearestPointToPoint(t,u.toArray(this.nodes))},hitTestPointInPolygons:function(t){for(var n in this.polys)if(this.polys.hasOwnProperty(n)&&h.hitTestPointRing(t,this.getNodesForPolygon(n)))return!0;return!1},getPolygonHitsForPoint:function(t){var n=[];return u.each(this.polys,function(e,i){h.hitTestPointRing(t,this.getNodesForPolygon(i))&&n.push(e.id)},this),n},getNodesInPolygon:function(t){var n=[],e=this.getPolygonById(t),i=this.getNodesForPolygon(t),o=h.getRectForPointRing(i);return e&&u.each(this.nodes,function(t){(u.contains(e.nodes,t.id)||h.hitTestRect(t,o)&&h.hitTestPointRing(t,i))&&n.push(t.id)},this),n},getNodesInRect:function(t){var n=[];return u.each(this.nodes,function(e){h.hitTestRect(e,t)&&n.push(e.id)},this),n},bridgePoints:function(t,n,e){function i(t,n){var e,i=this.addNode(t.x,t.y);if(n.length)for(e in n){var o=this.getPolygonById(n[e]).nodes;for(var s in o)this.joinNodes(i.id,o[s])}else{var r=this.snapPointToGrid(t,!0);if(r.point){i.x=r.point.x,i.y=r.point.y;for(e in r.segment)this.joinNodes(i.id,r.segment[e])}}return i.id}var o=this.getPolygonHitsForPoint(t),s=this.getPolygonHitsForPoint(n);if(o.length&&s.length){for(var r=[],h=o.length-1;h>=0;)u.contains(s,o[h])&&r.push(o[h]),h--;if(r.length)return[t,e?this.snapPointToGrid(n):n]}var a=i.call(this,t,o),d=i.call(this,n,s),c=this.findPath(a,d);return this.removeNodes(a,d),c.valid?(c=c.nodes,c.unshift(t),c.push(n),c):[]}},h});