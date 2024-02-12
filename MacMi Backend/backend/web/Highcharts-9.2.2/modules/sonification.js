/*
 Highcharts JS v9.2.2 (2021-08-24)

 Sonification module

 (c) 2012-2021 ystein Moseng

 License: www.highcharts.com/license
*/
'use strict';(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/sonification",["highcharts"],function(m){b(m);b.Highcharts=m;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function m(d,b,g,p){d.hasOwnProperty(b)||(d[b]=p.apply(null,g))}b=b?b._modules:{};m(b,"Extensions/Sonification/Instrument.js",[b["Core/Globals.js"],b["Core/Utilities.js"]],function(d,b){function g(c){this.init(c)}
var p=b.error,l=b.merge,k=b.pick,A=b.uniqueKey,n={type:"oscillator",playCallbackInterval:20,masterVolume:1,oscillator:{waveformShape:"sine"}};g.prototype.init=function(c){if(this.initAudioContext()){this.options=l(n,c);this.id=this.options.id=c&&c.id||A();this.masterVolume=this.options.masterVolume||0;c=d.audioContext;var a=this.destinationNode||c.destination;this.gainNode=c.createGain();this.setGain(0);(this.panNode=c.createStereoPanner&&c.createStereoPanner())?(this.setPan(0),this.gainNode.connect(this.panNode),
this.panNode.connect(a)):this.gainNode.connect(a);"oscillator"===this.options.type&&this.initOscillator(this.options.oscillator);this.playCallbackTimers=[]}else p(29)};g.prototype.copy=function(c){return new g(l(this.options,{id:null},c))};g.prototype.initAudioContext=function(){var c=d.win.AudioContext||d.win.webkitAudioContext,a=!!d.audioContext;return c?(d.audioContext=d.audioContext||new c,!a&&d.audioContext&&"running"===d.audioContext.state&&d.audioContext.suspend(),!!(d.audioContext&&d.audioContext.createOscillator&&
d.audioContext.createGain)):!1};g.prototype.initOscillator=function(c){this.oscillator=d.audioContext.createOscillator();this.oscillator.type=c.waveformShape;this.oscillator.connect(this.gainNode);this.oscillatorStarted=!1};g.prototype.setPan=function(c){this.panNode&&this.panNode.pan.setValueAtTime(c,d.audioContext.currentTime)};g.prototype.setGain=function(c,a){var e=this.gainNode;c*=this.masterVolume;e&&(1.2<c&&(console.warn("Highcharts sonification warning: Volume of instrument set too high."),
c=1.2),a?(e.gain.setValueAtTime(e.gain.value,d.audioContext.currentTime),e.gain.linearRampToValueAtTime(c,d.audioContext.currentTime+a/1E3)):e.gain.setValueAtTime(c,d.audioContext.currentTime))};g.prototype.cancelGainRamp=function(){this.gainNode&&this.gainNode.gain.cancelScheduledValues(0)};g.prototype.setMasterVolume=function(c){this.masterVolume=c||0};g.prototype.getValidFrequency=function(c,a,e){var f=this.options.allowedFrequencies,b=k(e,Infinity),d=k(a,-Infinity);return f&&f.length?f.reduce(function(a,
e){return Math.abs(e-c)<Math.abs(a-c)&&e<b&&e>d?e:a},Infinity):c};g.prototype.clearPlayCallbackTimers=function(){this.playCallbackTimers.forEach(function(c){clearInterval(c)});this.playCallbackTimers=[]};g.prototype.setFrequency=function(c,a){a=a||{};c=this.getValidFrequency(c,a.min,a.max);"oscillator"===this.options.type&&this.oscillatorPlay(c)};g.prototype.oscillatorPlay=function(c){this.oscillatorStarted||(this.oscillator.start(),this.oscillatorStarted=!0);this.oscillator.frequency.setValueAtTime(c,
d.audioContext.currentTime)};g.prototype.preparePlay=function(){this.setGain(.001);"suspended"===d.audioContext.state&&d.audioContext.resume();this.oscillator&&!this.oscillatorStarted&&(this.oscillator.start(),this.oscillatorStarted=!0)};g.prototype.play=function(c){var a=this,e=c.duration||0,f=function(e,f,b){var d=c.duration,g=0,k=a.options.playCallbackInterval;if("function"===typeof e){var l=setInterval(function(){g++;var c=g*k/d;if(1<=c)a[f](e(1),b),clearInterval(l);else a[f](e(c),b)},k);a.playCallbackTimers.push(l)}else a[f](e,
b)};if(a.id)if("suspended"===d.audioContext.state||this.oscillator&&!this.oscillatorStarted)a.preparePlay(),setTimeout(function(){a.play(c)},10);else{a.playCallbackTimers.length&&a.clearPlayCallbackTimers();a.cancelGainRamp();a.stopOscillatorTimeout&&(clearTimeout(a.stopOscillatorTimeout),delete a.stopOscillatorTimeout);a.stopTimeout&&(clearTimeout(a.stopTimeout),delete a.stopTimeout,a.stopCallback&&(a._play=a.play,a.play=function(){},a.stopCallback("cancelled"),a.play=a._play));var b=e<d.sonification.fadeOutDuration+
20;a.stopCallback=c.onEnd;var g=function(){delete a.stopTimeout;a.stop(b)};e?(a.stopTimeout=setTimeout(g,b?e:e-d.sonification.fadeOutDuration),f(c.frequency,"setFrequency",{minFrequency:c.minFrequency,maxFrequency:c.maxFrequency}),f(k(c.volume,1),"setGain",4),f(k(c.pan,0),"setPan")):g()}};g.prototype.mute=function(){this.setGain(.0001,.8*d.sonification.fadeOutDuration)};g.prototype.stop=function(c,a,e){var f=this,b=function(){f.stopOscillatorTimeout&&delete f.stopOscillatorTimeout;try{f.oscillator.stop()}catch(y){}f.oscillator.disconnect(f.gainNode);
f.initOscillator(f.options.oscillator);a&&a(e);f.stopCallback&&f.stopCallback(e)};f.playCallbackTimers.length&&f.clearPlayCallbackTimers();f.stopTimeout&&clearTimeout(f.stopTimeout);c?(f.setGain(0),b()):(f.mute(),f.stopOscillatorTimeout=setTimeout(b,d.sonification.fadeOutDuration+100))};return g});m(b,"Extensions/Sonification/MusicalFrequencies.js",[],function(){return[16.351597831287414,17.323914436054505,18.354047994837977,19.445436482630058,20.601722307054366,21.826764464562746,23.12465141947715,
24.499714748859326,25.956543598746574,27.5,29.13523509488062,30.86770632850775,32.70319566257483,34.64782887210901,36.70809598967594,38.890872965260115,41.20344461410875,43.653528929125486,46.2493028389543,48.999429497718666,51.91308719749314,55,58.27047018976124,61.7354126570155,65.40639132514966,69.29565774421802,73.41619197935188,77.78174593052023,82.4068892282175,87.30705785825097,92.4986056779086,97.99885899543733,103.82617439498628,110,116.54094037952248,123.47082531403103,130.8127826502993,
138.59131548843604,146.8323839587038,155.56349186104046,164.81377845643496,174.61411571650194,184.9972113558172,195.99771799087463,207.65234878997256,220,233.08188075904496,246.94165062806206,261.6255653005986,277.1826309768721,293.6647679174076,311.1269837220809,329.6275569128699,349.2282314330039,369.9944227116344,391.99543598174927,415.3046975799451,440,466.1637615180899,493.8833012561241,523.2511306011972,554.3652619537442,587.3295358348151,622.2539674441618,659.2551138257398,698.4564628660078,
739.9888454232688,783.9908719634985,830.6093951598903,880,932.3275230361799,987.7666025122483,1046.5022612023945,1108.7305239074883,1174.6590716696303,1244.5079348883237,1318.5102276514797,1396.9129257320155,1479.9776908465376,1567.981743926997,1661.2187903197805,1760,1864.6550460723597,1975.533205024496,2093.004522404789,2217.4610478149766,2349.31814333926,2489.0158697766474,2637.02045530296,2793.825851464031,2959.955381693075,3135.9634878539946,3322.437580639561,3520,3729.3100921447194,3951.066410048992,
4186.009044809578]});m(b,"Extensions/Sonification/Utilities.js",[b["Extensions/Sonification/MusicalFrequencies.js"],b["Core/Utilities.js"]],function(b,h){function d(b){this.init(b||[])}var p=h.clamp;d.prototype.init=function(b){this.supportedSignals=b;this.signals={}};d.prototype.registerSignalCallbacks=function(b){var d=this;d.supportedSignals.forEach(function(g){var k=b[g];k&&(d.signals[g]=d.signals[g]||[]).push(k)})};d.prototype.clearSignalCallbacks=function(b){var d=this;b?b.forEach(function(b){d.signals[b]&&
delete d.signals[b]}):d.signals={}};d.prototype.emitSignal=function(b,d){var g;this.signals[b]&&this.signals[b].forEach(function(b){b=b(d);g="undefined"!==typeof b?b:g});return g};return{musicalFrequencies:b,SignalHandler:d,getMusicalScale:function(d){return b.filter(function(b,g){var k=g%12+1;return d.some(function(c){return c===k})})},calculateDataExtremes:function(b,d){return b.series.reduce(function(b,g){g.points.forEach(function(c){c="undefined"!==typeof c[d]?c[d]:c.options[d];b.min=Math.min(b.min,
c);b.max=Math.max(b.max,c)});return b},{min:Infinity,max:-Infinity})},virtualAxisTranslate:function(b,d,g,n){var c=d.max-d.min;b=g.min+Math.abs(g.max-g.min)*(n?d.max-b:b-d.min)/c;return 0<c?p(b,g.min,g.max):g.min}}});m(b,"Extensions/Sonification/InstrumentDefinitions.js",[b["Extensions/Sonification/Instrument.js"],b["Extensions/Sonification/Utilities.js"]],function(b,h){var d={};["sine","square","triangle","sawtooth"].forEach(function(g){d[g]=new b({oscillator:{waveformShape:g}});d[g+"Musical"]=new b({allowedFrequencies:h.musicalFrequencies,
oscillator:{waveformShape:g}});d[g+"Major"]=new b({allowedFrequencies:h.getMusicalScale([1,3,5,6,8,10,12]),oscillator:{waveformShape:g}})});return d});m(b,"Extensions/Sonification/Earcon.js",[b["Core/Globals.js"],b["Core/Utilities.js"]],function(b,h){function d(b){this.init(b||{})}var p=h.error,l=h.merge,k=h.pick,m=h.uniqueKey;d.prototype.init=function(b){this.options=b;this.options.id||(this.options.id=this.id=m());this.instrumentsPlaying={}};d.prototype.sonify=function(d){var c=l(this.options,d),
a=k(c.volume,1),e=c.pan,f=this,g=d&&d.onEnd,n=f.options.onEnd;c.instruments.forEach(function(c){var d="string"===typeof c.instrument?b.sonification.instruments[c.instrument]:c.instrument,t=l(c.playOptions),w="";if(d&&d.play){if(c.playOptions){t.pan=k(e,t.pan);var h=t.onEnd;t.onEnd=function(){delete f.instrumentsPlaying[w];h&&h.apply(this,arguments);Object.keys(f.instrumentsPlaying).length||(g&&g.apply(this,arguments),n&&n.apply(this,arguments))};c=d.copy();c.setMasterVolume(a);w=c.id;f.instrumentsPlaying[w]=
c;c.play(t)}}else p(30)})};d.prototype.cancelSonify=function(b){var c=this.instrumentsPlaying,a=c&&Object.keys(c);a&&a.length&&(a.forEach(function(a){c[a].stop(!b,null,"cancelled")}),this.instrumentsPlaying={})};return d});m(b,"Extensions/Sonification/PointSonify.js",[b["Core/Globals.js"],b["Core/Utilities.js"],b["Extensions/Sonification/Utilities.js"]],function(b,h,g){var d=h.error,l=h.merge,k=h.pick,m={minDuration:20,maxDuration:2E3,minVolume:.1,maxVolume:1,minPan:-1,maxPan:1,minFrequency:220,maxFrequency:2200};
return{pointSonify:function(h){var c=this,a=c.series.chart,e=k(h.masterVolume,a.options.sonification&&a.options.sonification.masterVolume),f=h.dataExtremes||{},r=function(a,b,d){if("function"===typeof a)return b?function(b){return a(c,f,b)}:a(c,f);if("string"===typeof a){var e=(b="-"===a.charAt(0))?a.slice(1):a,h=k(c[e],c.options[e]);f[e]=f[e]||g.calculateDataExtremes(c.series.chart,e);return g.virtualAxisTranslate(h,f[e],d,b)}return a};a.sonification.currentlyPlayingPoint=c;c.sonification=c.sonification||
{};c.sonification.instrumentsPlaying=c.sonification.instrumentsPlaying||{};var p=c.sonification.signalHandler=c.sonification.signalHandler||new g.SignalHandler(["onEnd"]);p.clearSignalCallbacks();p.registerSignalCallbacks({onEnd:h.onEnd});!c.isNull&&c.visible&&c.series.visible?h.instruments.forEach(function(f){var g="string"===typeof f.instrument?b.sonification.instruments[f.instrument]:f.instrument,k=f.instrumentMapping||{},h=l(m,f.instrumentOptions),n=g.id,t=function(b){f.onEnd&&f.onEnd.apply(this,
arguments);a.sonification&&a.sonification.currentlyPlayingPoint&&delete a.sonification.currentlyPlayingPoint;c.sonification&&c.sonification.instrumentsPlaying&&(delete c.sonification.instrumentsPlaying[n],Object.keys(c.sonification.instrumentsPlaying).length||p.emitSignal("onEnd",b))};g&&g.play?("undefined"!==typeof e&&g.setMasterVolume(e),c.sonification.instrumentsPlaying[g.id]=g,g.play({frequency:r(k.frequency,!0,{min:h.minFrequency,max:h.maxFrequency}),duration:r(k.duration,!1,{min:h.minDuration,
max:h.maxDuration}),pan:r(k.pan,!0,{min:h.minPan,max:h.maxPan}),volume:r(k.volume,!0,{min:h.minVolume,max:h.maxVolume}),onEnd:t,minFrequency:h.minFrequency,maxFrequency:h.maxFrequency})):d(30)}):p.emitSignal("onEnd")},pointCancelSonify:function(b){var c=this.sonification&&this.sonification.instrumentsPlaying,a=c&&Object.keys(c);a&&a.length&&(a.forEach(function(a){c[a].stop(!b,null,"cancelled")}),this.sonification.instrumentsPlaying={},this.sonification.signalHandler.emitSignal("onEnd","cancelled"))}}});
m(b,"Extensions/Sonification/ChartSonify.js",[b["Core/Globals.js"],b["Core/Series/Point.js"],b["Core/Utilities.js"],b["Extensions/Sonification/Utilities.js"]],function(b,h,g,p){function d(a,b){return"function"===typeof b?b(a):x(a[b],a.options[b])}function k(a,b){return a.points.reduce(function(a,c){c=d(c,b);a.min=Math.min(a.min,c);a.max=Math.max(a.max,c);return a},{min:Infinity,max:-Infinity})}function m(a,b,c){var e=(b||[]).slice(0);b=a.options.sonification&&a.options.sonification.defaultInstrumentOptions;
var q=function(a){return{instrumentMapping:a.mapping}};b&&e.push(q(b));a.series.forEach(function(a){(a=a.options.sonification&&a.options.sonification.instruments)&&(e=e.concat(a.map(q)))});return e.reduce(function(b,c){Object.keys(c.instrumentMapping||{}).forEach(function(e){e=c.instrumentMapping[e];"string"!==typeof e||b[e]||(b[e]=p.calculateDataExtremes(a,e))});return b},u(c))}function n(a,c){return c.reduce(function(c,e){var q=e.earcon;e.condition?(e=e.condition(a),e instanceof b.sonification.Earcon?
c.push(e):e&&c.push(q)):e.onPoint&&a.id===e.onPoint&&c.push(q);return c},[])}function c(a){return a.map(function(a){var c=a.instrument;c=("string"===typeof c?b.sonification.instruments[c]:c).copy();return u(a,{instrument:c})})}function a(a,b){a.forEach(function(a){a=a.instrument;"string"!==typeof a&&a.setMasterVolume(b)});return a}function e(a,b,c){var e=a.points[a.points.length-1];return b.reduce(function(a,b){b=b.instrumentMapping.duration;b="string"===typeof b?0:"function"===typeof b?b(e,c):b;
return Math.max(a,b)},0)}function f(q,f){var g=f.timeExtremes||k(q,f.pointPlayTime),D=m(q.chart,f.instruments,f.dataExtremes),I=e(q,f.instruments,D),B=x(f.masterVolume,1),l=c(f.instruments),r=a(l,B);l=q.points.reduce(function(a,c){var e=n(c,f.earcons||[]),q=p.virtualAxisTranslate(d(c,f.pointPlayTime),g,{min:0,max:Math.max(f.duration-I,10)});return a.concat(new b.sonification.TimelineEvent({eventObject:c,time:q,id:c.id,playOptions:{instruments:r,dataExtremes:D,masterVolume:B}}),e.map(function(a){return new b.sonification.TimelineEvent({eventObject:a,
time:q,playOptions:{volume:B}})}))},[]);return new b.sonification.TimelinePath({events:l,onStart:function(){if(f.onStart)f.onStart(q)},onEventStart:function(a){var b=a.options&&a.options.eventObject;if(b instanceof h){if(!b.series.visible&&!b.series.chart.series.some(function(a){return a.visible}))return a.timelinePath.timeline.pause(),a.timelinePath.timeline.resetCursor(),!1;if(f.onPointStart)f.onPointStart(a,b)}},onEventEnd:function(a){var b=a.event&&a.event.options&&a.event.options.eventObject;
if(b instanceof h&&f.onPointEnd)f.onPointEnd(a.event,b)},onEnd:function(){if(f.onEnd)f.onEnd(q)},targetDuration:f.duration})}function r(a,b,c){var e=c.seriesOptions||{},f=a.chart.options.sonification&&a.chart.options.sonification.defaultInstrumentOptions&&a.chart.options.sonification.defaultInstrumentOptions.mapping&&a.chart.options.sonification.defaultInstrumentOptions.mapping.pointPlayTime||"x",d=C(a);return u(d,{dataExtremes:b,timeExtremes:k(a,f),instruments:c.instruments||d.instruments,onStart:c.onSeriesStart||
d.onStart,onEnd:c.onSeriesEnd||d.onEnd,earcons:c.earcons||d.earcons,masterVolume:x(c.masterVolume,d.masterVolume)},J(e)?K(e,function(b){return b.id===x(a.id,a.options.id)})||{}:e,{pointPlayTime:f})}function y(a,c,e){if("sequential"===a||"simultaneous"===a){var f=c.series.reduce(function(a,b){b.visible&&!1!==(b.options.sonification&&b.options.sonification.enabled)&&a.push({series:b,seriesOptions:e(b)});return a},[]);"simultaneous"===a&&(f=[f])}else f=a.reduce(function(a,f){f=v(f).reduce(function(a,
f){var d;if("string"===typeof f){var g=c.get(f);g.visible&&(d={series:g,seriesOptions:e(g)})}else f instanceof b.sonification.Earcon&&(d=new b.sonification.TimelinePath({events:[new b.sonification.TimelineEvent({eventObject:f})]}));f.silentWait&&(d=new b.sonification.TimelinePath({silentWait:f.silentWait}));d&&a.push(d);return a},[]);f.length&&a.push(f);return a},[]);return f}function t(a,c){return c?a.reduce(function(e,f,d){f=v(f);e.push(f);d<a.length-1&&f.some(function(a){return a.series})&&e.push(new b.sonification.TimelinePath({silentWait:c}));
return e},[]):a}function E(a){return a.reduce(function(a,b){b=v(b);return a+(1===b.length&&b[0].options&&b[0].options.silentWait||0)},0)}function z(a){var c=a.reduce(function(a,b){(b=b.events)&&b.length&&(a.min=Math.min(b[0].time,a.min),a.max=Math.max(b[b.length-1].time,a.max));return a},{min:Infinity,max:-Infinity});a.forEach(function(a){var e=a.events,f=e&&e.length,d=[];f&&e[0].time<=c.min||d.push(new b.sonification.TimelineEvent({time:c.min}));f&&e[e.length-1].time>=c.max||d.push(new b.sonification.TimelineEvent({time:c.max}));
d.length&&a.addTimelineEvents(d)})}function w(a){return a.reduce(function(a,b){return a+v(b).reduce(function(a,b){return(b=b.series&&b.seriesOptions&&b.seriesOptions.timeExtremes)?Math.max(a,b.max-b.min):a},0)},0)}function F(a,c){var e=Math.max(c-E(a),0),d=w(a);return a.reduce(function(a,c){c=v(c).reduce(function(a,c){c instanceof b.sonification.TimelinePath?a.push(c):c.series&&(c.seriesOptions.duration=c.seriesOptions.duration||p.virtualAxisTranslate(c.seriesOptions.timeExtremes.max-c.seriesOptions.timeExtremes.min,
{min:0,max:d},{min:0,max:e}),a.push(f(c.series,c.seriesOptions)));return a},[]);a.push(c);return a},[])}function G(a,b){if(b&&b.instruments)return b.instruments;var c=a.chart.options.sonification&&a.chart.options.sonification.defaultInstrumentOptions||{},e=function(a){L(a,function(b,c){null===b&&delete a[c]})};return(a.options.sonification&&a.options.sonification.instruments||[{}]).map(function(a){e(a.mapping||{});e(a);return{instrument:a.instrument||c.instrument,instrumentOptions:u(c,a,{mapping:void 0,
instrument:void 0}),instrumentMapping:u(c.mapping,a.mapping)}})}function C(a){var b=a.options.sonification||{},c=a.chart.options.sonification||{},e=c.events||{},f=b.events||{};return{onEnd:f.onSeriesEnd||e.onSeriesEnd,onStart:f.onSeriesStart||e.onSeriesStart,onPointEnd:f.onPointEnd||e.onPointEnd,onPointStart:f.onPointStart||e.onPointStart,pointPlayTime:c.defaultInstrumentOptions&&c.defaultInstrumentOptions.mapping&&c.defaultInstrumentOptions.mapping.pointPlayTime,masterVolume:c.masterVolume,instruments:G(a),
earcons:b.earcons||c.earcons}}function H(a,b){a=a.options.sonification||{};return u({duration:a.duration,afterSeriesWait:a.afterSeriesWait,pointPlayTime:a.defaultInstrumentOptions&&a.defaultInstrumentOptions.mapping&&a.defaultInstrumentOptions.mapping.pointPlayTime,order:a.order,onSeriesStart:a.events&&a.events.onSeriesStart,onSeriesEnd:a.events&&a.events.onSeriesEnd,onEnd:a.events&&a.events.onEnd},b)}"";var K=g.find,J=g.isArray,u=g.merge,x=g.pick,v=g.splat,L=g.objectEach;return{chartSonify:function(a){var c=
H(this,a);this.sonification.timeline&&this.sonification.timeline.pause();this.sonification.duration=c.duration;var e=m(this,c.instruments,c.dataExtremes);a=y(c.order,this,function(a){return r(a,e,c)});a=t(a,c.afterSeriesWait||0);a=F(a,c.duration);a.forEach(function(a){z(a)});this.sonification.timeline=new b.sonification.Timeline({paths:a,onEnd:c.onEnd});this.sonification.timeline.play()},seriesSonify:function(a){var c=this.chart.options.sonification,e=this.options.sonification;a=u({duration:e&&e.duration||
c&&c.duration},C(this),a);c=f(this,a);e=this.chart.sonification;e.timeline&&e.timeline.pause();e.duration=a.duration;e.timeline=new b.sonification.Timeline({paths:[c]});e.timeline.play()},pause:function(a){this.sonification.timeline?this.sonification.timeline.pause(x(a,!0)):this.sonification.currentlyPlayingPoint&&this.sonification.currentlyPlayingPoint.cancelSonify(a)},resume:function(a){this.sonification.timeline&&this.sonification.timeline.play(a)},rewind:function(a){this.sonification.timeline&&
this.sonification.timeline.rewind(a)},cancel:function(a){this.pauseSonify(a);this.resetSonifyCursor()},getCurrentPoints:function(){if(this.sonification.timeline){var a=this.sonification.timeline.getCursor();return Object.keys(a).map(function(b){return a[b].eventObject}).filter(function(a){return a instanceof h})}return[]},setCursor:function(a){var b=this.sonification.timeline;b&&v(a).forEach(function(a){b.setCursor(a.id)})},resetCursor:function(){this.sonification.timeline&&this.sonification.timeline.resetCursor()},
resetCursorEnd:function(){this.sonification.timeline&&this.sonification.timeline.resetCursorEnd()}}});m(b,"Extensions/Sonification/Timeline.js",[b["Core/Globals.js"],b["Core/Utilities.js"],b["Extensions/Sonification/Utilities.js"]],function(b,h,g){function d(a){this.init(a||{})}function l(a){this.init(a)}function k(a){this.init(a||{})}var m=h.merge,n=h.splat,c=h.uniqueKey;d.prototype.init=function(a){this.options=a;this.time=a.time||0;this.id=this.options.id=a.id||c()};d.prototype.play=function(a){var b=
this.options.eventObject,c=this.options.onEnd,d=a&&a.onEnd,g=this.options.playOptions&&this.options.playOptions.onEnd;a=m(this.options.playOptions,a);b&&b.sonify?(a.onEnd=c||d||g?function(){var a=arguments;[c,d,g].forEach(function(b){b&&b.apply(this,a)})}:void 0,b.sonify(a)):(d&&d(),c&&c())};d.prototype.cancel=function(a){this.options.eventObject.cancelSonify(a)};l.prototype.init=function(a){this.options=a;this.id=this.options.id=a.id||c();this.cursor=0;this.eventsPlaying={};this.events=a.silentWait?
[new d({time:0}),new d({time:a.silentWait})]:this.options.events;this.targetDuration=a.targetDuration||a.silentWait;this.sortEvents();this.updateEventIdMap();this.signalHandler=new g.SignalHandler(["playOnEnd","masterOnEnd","onStart","onEventStart","onEventEnd"]);this.signalHandler.registerSignalCallbacks(m(a,{masterOnEnd:a.onEnd}))};l.prototype.sortEvents=function(){this.events=this.events.sort(function(a,b){return a.time-b.time})};l.prototype.updateEventIdMap=function(){this.eventIdMap=this.events.reduce(function(a,
b,c){a[b.id]=c;return a},{})};l.prototype.addTimelineEvents=function(a){this.events=this.events.concat(a);this.sortEvents();this.updateEventIdMap()};l.prototype.getCursor=function(){return this.events[this.cursor]};l.prototype.setCursor=function(a){a=this.eventIdMap[a];return"undefined"!==typeof a?(this.cursor=a,!0):!1};l.prototype.play=function(a){this.pause();this.signalHandler.emitSignal("onStart");this.signalHandler.clearSignalCallbacks(["playOnEnd"]);this.signalHandler.registerSignalCallbacks({playOnEnd:a});
this.playEvents(1)};l.prototype.rewind=function(a){this.pause();this.signalHandler.emitSignal("onStart");this.signalHandler.clearSignalCallbacks(["playOnEnd"]);this.signalHandler.registerSignalCallbacks({playOnEnd:a});this.playEvents(-1)};l.prototype.resetCursor=function(){this.cursor=0};l.prototype.resetCursorEnd=function(){this.cursor=this.events.length-1};l.prototype.pause=function(a){var b=this;clearTimeout(b.nextScheduledPlay);Object.keys(b.eventsPlaying).forEach(function(c){b.eventsPlaying[c]&&
b.eventsPlaying[c].cancel(a)});b.eventsPlaying={}};l.prototype.playEvents=function(a){var b=this,c=b.events[this.cursor],d=b.events[this.cursor+a],g=function(a){b.signalHandler.emitSignal("masterOnEnd",a);b.signalHandler.emitSignal("playOnEnd",a)};c.timelinePath=b;if(!1===b.signalHandler.emitSignal("onEventStart",c))g({event:c,cancelled:!0});else if(b.eventsPlaying[c.id]=c,c.play({onEnd:function(a){a={event:c,cancelled:!!a};delete b.eventsPlaying[c.id];b.signalHandler.emitSignal("onEventEnd",a);d||
g(a)}}),d){var h=Math.abs(d.time-c.time);1>h?(b.cursor+=a,b.playEvents(a)):this.nextScheduledPlay=setTimeout(function(){b.cursor+=a;b.playEvents(a)},h)}};k.prototype.init=function(a){this.options=a;this.cursor=0;this.paths=a.paths||[];this.pathsPlaying={};this.signalHandler=new g.SignalHandler(["playOnEnd","masterOnEnd","onPathStart","onPathEnd"]);this.signalHandler.registerSignalCallbacks(m(a,{masterOnEnd:a.onEnd}))};k.prototype.play=function(a){this.pause();this.signalHandler.clearSignalCallbacks(["playOnEnd"]);
this.signalHandler.registerSignalCallbacks({playOnEnd:a});this.playPaths(1)};k.prototype.rewind=function(a){this.pause();this.signalHandler.clearSignalCallbacks(["playOnEnd"]);this.signalHandler.registerSignalCallbacks({playOnEnd:a});this.playPaths(-1)};k.prototype.playPaths=function(a){var c=this,d=c.signalHandler;if(c.paths.length){var g=n(this.paths[this.cursor]),h=this.paths[this.cursor+a],k=0,l=function(b){d.emitSignal("onPathStart",b);c.pathsPlaying[b.id]=b;b[0<a?"play":"rewind"](function(e){e=
e&&e.cancelled;var f={path:b,cancelled:e};delete c.pathsPlaying[b.id];d.emitSignal("onPathEnd",f);k++;k>=g.length&&(h&&!e?(c.cursor+=a,n(h).forEach(function(b){b[0<a?"resetCursor":"resetCursorEnd"]()}),c.playPaths(a)):(d.emitSignal("playOnEnd",f),d.emitSignal("masterOnEnd",f)))})};g.forEach(function(a){a&&(a.timeline=c,setTimeout(function(){l(a)},b.sonification.fadeOutDuration))})}else{var m={cancelled:!1};d.emitSignal("playOnEnd",m);d.emitSignal("masterOnEnd",m)}};k.prototype.pause=function(a){var b=
this;Object.keys(b.pathsPlaying).forEach(function(c){b.pathsPlaying[c]&&b.pathsPlaying[c].pause(a)});b.pathsPlaying={}};k.prototype.resetCursor=function(){this.paths.forEach(function(a){n(a).forEach(function(a){a.resetCursor()})});this.cursor=0};k.prototype.resetCursorEnd=function(){this.paths.forEach(function(a){n(a).forEach(function(a){a.resetCursorEnd()})});this.cursor=this.paths.length-1};k.prototype.setCursor=function(a){return this.paths.some(function(b){return n(b).some(function(b){return b.setCursor(a)})})};
k.prototype.getCursor=function(){return this.getCurrentPlayingPaths().reduce(function(a,b){a[b.id]=b.getCursor();return a},{})};k.prototype.atStart=function(){return this.cursor?!1:!n(this.paths[0]).some(function(a){return a.cursor})};k.prototype.getCurrentPlayingPaths=function(){return this.paths.length?n(this.paths[this.cursor]):[]};return{TimelineEvent:d,TimelinePath:l,Timeline:k}});m(b,"Extensions/Sonification/Options.js",[],function(){return{sonification:{enabled:!1,duration:2500,afterSeriesWait:700,
masterVolume:1,order:"sequential",defaultInstrumentOptions:{instrument:"sineMusical",minFrequency:392,maxFrequency:1046,mapping:{pointPlayTime:"x",duration:200,frequency:"y"}}}}});m(b,"Extensions/Sonification/Sonification.js",[b["Core/Chart/Chart.js"],b["Core/Globals.js"],b["Core/DefaultOptions.js"],b["Core/Series/Point.js"],b["Core/Series/Series.js"],b["Core/Utilities.js"],b["Extensions/Sonification/Instrument.js"],b["Extensions/Sonification/InstrumentDefinitions.js"],b["Extensions/Sonification/Earcon.js"],
b["Extensions/Sonification/PointSonify.js"],b["Extensions/Sonification/ChartSonify.js"],b["Extensions/Sonification/Utilities.js"],b["Extensions/Sonification/Timeline.js"],b["Extensions/Sonification/Options.js"]],function(b,h,g,m,l,k,A,n,c,a,e,f,r,y){g=g.defaultOptions;var d=k.addEvent,p=k.extend,z=k.merge;h.sonification={fadeOutDuration:20,utilities:f,Instrument:A,instruments:n,Earcon:c,TimelineEvent:r.TimelineEvent,TimelinePath:r.TimelinePath,Timeline:r.Timeline};z(!0,g,y);m.prototype.sonify=a.pointSonify;
m.prototype.cancelSonify=a.pointCancelSonify;l.prototype.sonify=e.seriesSonify;p(b.prototype,{sonify:e.chartSonify,pauseSonify:e.pause,resumeSonify:e.resume,rewindSonify:e.rewind,cancelSonify:e.cancel,getCurrentSonifyPoints:e.getCurrentPoints,setSonifyCursor:e.setCursor,resetSonifyCursor:e.resetCursor,resetSonifyCursorEnd:e.resetCursorEnd});d(b,"init",function(){this.sonification={}});d(b,"update",function(a){(a=a.options.sonification)&&z(!0,this.options.sonification,a)})});m(b,"masters/modules/sonification.src.js",
[],function(){})});
//# sourceMappingURL=sonification.js.map