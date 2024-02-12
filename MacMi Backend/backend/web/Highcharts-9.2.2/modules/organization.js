/*
 Highcharts JS v9.2.2 (2021-08-24)
 Organization chart series type

 (c) 2019-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
'use strict';(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/organization",["highcharts","highcharts/modules/sankey"],function(h){b(h);b.Highcharts=h;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function h(b,n,q,a){b.hasOwnProperty(n)||(b[n]=a.apply(null,q))}b=b?b._modules:{};h(b,"Series/Organization/OrganizationPoint.js",[b["Core/Series/SeriesRegistry.js"]],function(b){var n=
this&&this.__extends||function(){var b=function(a,d){b=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(b,a){b.__proto__=a}||function(b,a){for(var d in a)a.hasOwnProperty(d)&&(b[d]=a[d])};return b(a,d)};return function(a,d){function q(){this.constructor=a}b(a,d);a.prototype=null===d?Object.create(d):(q.prototype=d.prototype,new q)}}();return function(b){function a(){var a=null!==b&&b.apply(this,arguments)||this;a.fromNode=void 0;a.linksFrom=void 0;a.linksTo=void 0;a.options=void 0;
a.series=void 0;a.toNode=void 0;return a}n(a,b);a.prototype.getSum=function(){return 1};return a}(b.seriesTypes.sankey.prototype.pointClass)});h(b,"Series/Organization/OrganizationSeries.js",[b["Series/Organization/OrganizationPoint.js"],b["Core/Color/Palette.js"],b["Core/Series/SeriesRegistry.js"],b["Core/Utilities.js"]],function(b,n,q,a){var d=this&&this.__extends||function(){var b=function(a,c){b=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(c,b){c.__proto__=b}||function(c,b){for(var e in b)b.hasOwnProperty(e)&&
(c[e]=b[e])};return b(a,c)};return function(a,c){function e(){this.constructor=a}b(a,c);a.prototype=null===c?Object.create(c):(e.prototype=c.prototype,new e)}}(),h=q.seriesTypes.sankey,t=a.css,u=a.extend,v=a.merge,w=a.pick,x=a.wrap;a=function(b){function a(){var c=null!==b&&b.apply(this,arguments)||this;c.data=void 0;c.options=void 0;c.points=void 0;return c}d(a,b);a.curvedPath=function(c,b){for(var a=[],e=0;e<c.length;e++){var f=c[e][1],g=c[e][2];if("number"===typeof f&&"number"===typeof g)if(0===
e)a.push(["M",f,g]);else if(e===c.length-1)a.push(["L",f,g]);else if(b){var k=c[e-1],m=c[e+1];if(k&&m){var r=k[1];k=k[2];var p=m[1];m=m[2];if("number"===typeof r&&"number"===typeof p&&"number"===typeof k&&"number"===typeof m&&r!==p&&k!==m){var d=r<p?1:-1,h=k<m?1:-1;a.push(["L",f-d*Math.min(Math.abs(f-r),b),g-h*Math.min(Math.abs(g-k),b)],["C",f,g,f,g,f+d*Math.min(Math.abs(f-p),b),g+h*Math.min(Math.abs(g-m),b)])}}}else a.push(["L",f,g])}return a};a.prototype.alignDataLabel=function(c,a,l){if(l.useHTML){var e=
c.shapeArgs.width,f=c.shapeArgs.height,g=this.options.borderWidth+2*this.options.dataLabels.padding;this.chart.inverted&&(e=f,f=c.shapeArgs.width);f-=g;e-=g;if(g=a.text)t(g.element.parentNode,{width:e+"px",height:f+"px"}),t(g.element,{left:0,top:0,width:"100%",height:"100%",overflow:"hidden"});a.getBBox=function(){return{width:e,height:f}};a.width=e;a.height=f}b.prototype.alignDataLabel.apply(this,arguments)};a.prototype.createNode=function(a){a=b.prototype.createNode.call(this,a);a.getSum=function(){return 1};
return a};a.prototype.createNodeColumn=function(){var a=b.prototype.createNodeColumn.call(this);x(a,"offset",function(a,b,c){a=a.call(this,b,c);return b.hangsFrom?{absoluteTop:b.hangsFrom.nodeY}:a});return a};a.prototype.pointAttribs=function(a,b){var c=this,e=h.prototype.pointAttribs.call(c,a,b),f=c.mapOptionsToLevel[(a.isNode?a.level:a.fromNode.level)||0]||{},g=a.options,k=f.states&&f.states[b]||{};b=["borderRadius","linkColor","linkLineWidth"].reduce(function(a,b){a[b]=w(k[b],g[b],f[b],c.options[b]);
return a},{});a.isNode?b.borderRadius&&(e.r=b.borderRadius):(e.stroke=b.linkColor,e["stroke-width"]=b.linkLineWidth,delete e.fill);return e};a.prototype.translateLink=function(b){var c=b.fromNode,l=b.toNode,d=Math.round(this.options.linkLineWidth)%2/2,f=Math.floor(c.shapeArgs.x+c.shapeArgs.width)+d,g=Math.floor(c.shapeArgs.y+c.shapeArgs.height/2)+d,k=Math.floor(l.shapeArgs.x)+d,m=Math.floor(l.shapeArgs.y+l.shapeArgs.height/2)+d,h=this.options.hangingIndent;var p=l.options.offset;var n=/%$/.test(p)&&
parseInt(p,10),q=this.chart.inverted;q&&(f-=c.shapeArgs.width,k+=l.shapeArgs.width);p=Math.floor(k+(q?1:-1)*(this.colDistance-this.nodeWidth)/2)+d;n&&(50<=n||-50>=n)&&(p=k=Math.floor(k+(q?-.5:.5)*l.shapeArgs.width)+d,m=l.shapeArgs.y,0<n&&(m+=l.shapeArgs.height));l.hangsFrom===c&&(this.chart.inverted?(g=Math.floor(c.shapeArgs.y+c.shapeArgs.height-h/2)+d,m=l.shapeArgs.y+l.shapeArgs.height):g=Math.floor(c.shapeArgs.y+h/2)+d,p=k=Math.floor(l.shapeArgs.x+l.shapeArgs.width/2)+d);b.plotY=1;b.shapeType="path";
b.shapeArgs={d:a.curvedPath([["M",f,g],["L",p,g],["L",p,m],["L",k,m]],this.options.linkRadius)}};a.prototype.translateNode=function(a,b){h.prototype.translateNode.call(this,a,b);a.hangsFrom&&(a.shapeArgs.height-=this.options.hangingIndent,this.chart.inverted||(a.shapeArgs.y+=this.options.hangingIndent));a.nodeHeight=this.chart.inverted?a.shapeArgs.width:a.shapeArgs.height};a.defaultOptions=v(h.defaultOptions,{borderColor:n.neutralColor60,borderRadius:3,linkRadius:10,borderWidth:1,dataLabels:{nodeFormatter:function(){function a(a){return Object.keys(a).reduce(function(b,
c){return b+c+":"+a[c]+";"},'style="')+'"'}var b={width:"100%",height:"100%",display:"flex","flex-direction":"row","align-items":"center","justify-content":"center"},d={"max-height":"100%","border-radius":"50%"},h={width:"100%",padding:0,"text-align":"center","white-space":"normal"},f={margin:0},g={margin:0},k={opacity:.75,margin:"5px"};this.point.image&&(d["max-width"]="30%",h.width="70%");this.series.chart.renderer.forExport&&(b.display="block",h.position="absolute",h.left=this.point.image?"30%":
0,h.top=0);b="<div "+a(b)+">";this.point.image&&(b+='<img src="'+this.point.image+'" '+a(d)+">");b+="<div "+a(h)+">";this.point.name&&(b+="<h4 "+a(f)+">"+this.point.name+"</h4>");this.point.title&&(b+="<p "+a(g)+">"+(this.point.title||"")+"</p>");this.point.description&&(b+="<p "+a(k)+">"+this.point.description+"</p>");return b+"</div></div>"},style:{fontWeight:"normal",fontSize:"13px"},useHTML:!0},hangingIndent:20,linkColor:n.neutralColor60,linkLineWidth:1,nodeWidth:50,tooltip:{nodeFormat:"{point.name}<br>{point.title}<br>{point.description}"}});
return a}(h);u(a.prototype,{pointClass:b});q.registerSeriesType("organization",a);"";"";return a});h(b,"masters/modules/organization.src.js",[],function(){})});
//# sourceMappingURL=organization.js.map