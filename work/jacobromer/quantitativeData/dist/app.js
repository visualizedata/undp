webpackJsonp([1],{0:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var o=n(37),a=r(o),i=n(82),s=r(i);a["default"].render(a["default"].createElement(s["default"],null),document.getElementById("root"))},82:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=function(e,t,n){for(var r=!0;r;){var o=e,a=t,i=n;s=l=u=void 0,r=!1,null===o&&(o=Function.prototype);var s=Object.getOwnPropertyDescriptor(o,a);if(void 0!==s){if("value"in s)return s.value;var u=s.get;return void 0===u?void 0:u.call(i)}var l=Object.getPrototypeOf(o);if(null===l)return void 0;e=l,t=a,n=i,r=!0}},u=n(37),l=r(u),c=n(83),p=r(c),d=n(161),f=r(d),h=n(85),m=function(e){function t(){o(this,t),s(Object.getPrototypeOf(t.prototype),"constructor",this).call(this),this.handleSelectChange=this.handleSelectChange.bind(this),this._data=f["default"].parse(h.replace(/\./g,"").replace(/,/g,".")).reduce(function(e,t){return e[t.countryName]=t,e},{}),this._selectOptions=Object.keys(this._data).sort(function(e,t){return e.localeCompare(t)}),this.state={currentCountry:this._data[this._selectOptions[1]],selectedValue:this._selectOptions[1]}}return a(t,e),i(t,[{key:"handleSelectChange",value:function(e){this.setState({currentCountry:this._data[e.target.value],selectedValue:e.target.value}),console.log(this._data[e.target.value])}},{key:"render",value:function(){var e=this.state.currentCountry,t=e.expectedSchoolingMale-e.expectedSchoolingFemale;if(t=t%1===0?parseInt(t,10):t.toFixed(1),""!==e.earnedIncomeRatio)var n=parseInt(100*(1-parseFloat(e.earnedIncomeRatio)));if(e.percentageWomenInParliament)var r=parseInt(e.percentageWomenInParliament);return console.log(this.state.selectedValue),l["default"].createElement("span",null,l["default"].createElement("h1",null,l["default"].createElement("span",null,"As a ",l["default"].createElement("u",null,"woman")," in "),l["default"].createElement("label",null,l["default"].createElement("select",{id:"countryselect",value:this.state.selectValue,defaultValue:"Angola",onChange:this.handleSelectChange},this._selectOptions.reduce(function(e,t,n){return e.push(l["default"].createElement("option",{key:n,value:t},t)),e},[]))),l["default"].createElement("span",null,", ",l["default"].createElement("br",null)),l["default"].createElement("span",null,"you earn "),l["default"].createElement(p["default"],{value:n?n:0,theshold:10,whatIsBetter:"lower",addlText:"%"}),l["default"].createElement("span",null," less than men"),l["default"].createElement("span",null,", you go to school for "),l["default"].createElement(p["default"],{value:t,threshold:1,whatIsBetter:"lower"}),l["default"].createElement("span",null," years less than men, "),l["default"].createElement("span",null,"you live an average "),l["default"].createElement(p["default"],{value:this.state.currentCountry.lifeExpectancyFemale,threshold:60,whatIsBetter:"higher"}),l["default"].createElement("span",null," years, "),l["default"].createElement("span",null," and women hold "),l["default"].createElement(p["default"],{value:r,threshold:40,whatIsBetter:"higher",addlText:"%"}),l["default"].createElement("span",null," of all seats in parliament.")),l["default"].createElement("h1",{className:"underline"},"Why?"))}}]),t}(u.Component);t["default"]=m,e.exports=t["default"]},83:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=function(e,t,n){for(var r=!0;r;){var o=e,a=t,i=n;s=l=u=void 0,r=!1,null===o&&(o=Function.prototype);var s=Object.getOwnPropertyDescriptor(o,a);if(void 0!==s){if("value"in s)return s.value;var u=s.get;return void 0===u?void 0:u.call(i)}var l=Object.getPrototypeOf(o);if(null===l)return void 0;e=l,t=a,n=i,r=!0}},u=n(37),l=r(u),c=n(84),p=r(c),d=function(e){function t(e){o(this,t),s(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e),this._prevValue=0,this.state={currentValue:0,prevValue:0},this.isGood=this.isGood.bind(this)}return a(t,e),i(t,[{key:"componentWillMount",value:function(){this.setState({currentValue:this.props.value})}},{key:"componentWillReceiveProps",value:function(e){this._currentValue=e.value,this._prevValue=this.state.currentValue,this.setState({currentValue:e.value,prevValue:this.state.currentValue})}},{key:"componentWillUpdate",value:function(){this.count(this._prevValue,this._currentValue)}},{key:"count",value:function(e,t){new p["default"](this._el,e,t,t%1===0?0:1,1.5,{useEasing:!0}).start()}},{key:"isGood",value:function(){return console.log(this.state.currentValue),this.state.currentValue<=0?"strike":"lower"===this.props.whatIsBetter?this._currentValue<this.props.threshold?"good":"bad":"higher"===this.props.whatIsBetter?this._currentValue>this.props.threshold?"good":"bad":void 0}},{key:"render",value:function(){var e=this,t=this.isGood();return l["default"].createElement("div",null,l["default"].createElement("span",{ref:function(t){return e._el=l["default"].findDOMNode(t)},className:t+" counter"},this.state.currentValue),this.props.addlText?l["default"].createElement("span",{className:t+" counter"},this.props.addlText):l["default"].createElement("span",null))}}]),t}(u.Component);t["default"]=d,e.exports=t["default"]},84:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t,n,r,o,a){for(var i=0,s=["webkit","moz","ms","o"],u=0;u<s.length&&!window.requestAnimationFrame;++u)window.requestAnimationFrame=window[s[u]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[s[u]+"CancelAnimationFrame"]||window[s[u]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,t){var n=(new Date).getTime(),r=Math.max(0,16-(n-i)),o=window.setTimeout(function(){e(n+r)},r);return i=n+r,o}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)}),this.options={useEasing:!0,useGrouping:!0,separator:",",decimal:"."};for(var l in a)a.hasOwnProperty(l)&&(this.options[l]=a[l]);""===this.options.separator&&(this.options.useGrouping=!1),this.options.prefix||(this.options.prefix=""),this.options.suffix||(this.options.suffix=""),this.d="string"==typeof e?document.getElementById(e):e,this.startVal=Number(t),isNaN(t)&&(this.startVal=Number(t.match(/[\d]+/g).join(""))),this.endVal=Number(n),isNaN(n)&&(this.endVal=Number(n.match(/[\d]+/g).join(""))),this.countDown=this.startVal>this.endVal,this.frameVal=this.startVal,this.decimals=Math.max(0,r||0),this.dec=Math.pow(10,this.decimals),this.duration=1e3*Number(o)||2e3;var c=this;this.version=function(){return"1.5.3"},this.printValue=function(e){var t=isNaN(e)?"--":c.formatNumber(e);"INPUT"==c.d.tagName?this.d.value=t:"text"==c.d.tagName?this.d.textContent=t:this.d.innerHTML=t},this.easeOutExpo=function(e,t,n,r){return n*(-Math.pow(2,-10*e/r)+1)*1024/1023+t},this.count=function(e){c.startTime||(c.startTime=e),c.timestamp=e;var t=e-c.startTime;c.remaining=c.duration-t,c.options.useEasing?c.countDown?c.frameVal=c.startVal-c.easeOutExpo(t,0,c.startVal-c.endVal,c.duration):c.frameVal=c.easeOutExpo(t,c.startVal,c.endVal-c.startVal,c.duration):c.countDown?c.frameVal=c.startVal-(c.startVal-c.endVal)*(t/c.duration):c.frameVal=c.startVal+(c.endVal-c.startVal)*(t/c.duration),c.countDown?c.frameVal=c.frameVal<c.endVal?c.endVal:c.frameVal:c.frameVal=c.frameVal>c.endVal?c.endVal:c.frameVal,c.frameVal=Math.round(c.frameVal*c.dec)/c.dec,c.printValue(c.frameVal),t<c.duration?c.rAF=requestAnimationFrame(c.count):c.callback&&c.callback()},this.start=function(e){return c.callback=e,isNaN(c.endVal)||isNaN(c.startVal)||c.startVal===c.endVal?(console.log("countUp error: startVal or endVal is not a number"),c.printValue(n)):c.rAF=requestAnimationFrame(c.count),!1},this.pauseResume=function(){c.paused?(c.paused=!1,delete c.startTime,c.duration=c.remaining,c.startVal=c.frameVal,requestAnimationFrame(c.count)):(c.paused=!0,cancelAnimationFrame(c.rAF))},this.reset=function(){c.paused=!1,delete c.startTime,c.startVal=t,cancelAnimationFrame(c.rAF),c.printValue(c.startVal)},this.update=function(e){cancelAnimationFrame(c.rAF),c.paused=!1,delete c.startTime,c.startVal=c.frameVal,c.endVal=Number(e),c.countDown=c.startVal>c.endVal,c.rAF=requestAnimationFrame(c.count)},this.formatNumber=function(e){e=e.toFixed(c.decimals),e+="";var t,n,r,o;if(t=e.split("."),n=t[0],r=t.length>1?c.options.decimal+t[1]:"",o=/(\d+)(\d{3})/,c.options.useGrouping)for(;o.test(n);)n=n.replace(o,"$1"+c.options.separator+"$2");return c.options.prefix+n+r+c.options.suffix},c.printValue(c.startVal)};t["default"]=n,e.exports=t["default"]},85:function(e,t){e.exports="countryName	earnedIncomeRatio	earnedIncomeFemale	earnedIncomeMale	hdiFemale	hdiMale	lifeExpectancyFemale	lifeExpectancyMale	meanSchoolingFemale	meanSchoolingMale	expectedSchoolingFemale	expectedSchoolingMale	gniPerCapitaFemale	gniPerCapitaMale	womenInParliament	totalSeatsInParliament	percentageWomenInParliament\nAlgeria	0,16	 2.371,00 	 14.522,00 	0,629	0,746	72,7	69,4	5,9	7,8	14,2	13,8	3.695	21.219	146	462	32%\nAngola	0,63	 4.717,00 	 7.526,00 	..	..	53,4	50,4	..	..	8,7	14,0	5.080	7.587	81	220	37%\nBenin	0,68	 1.284,00 	 1.883,00 	0,428	0,520	60,7	57,9	2,0	4,4	9,4	12,7	1.455	1.999	7	83	8%\nBotswana	0,47	 10.868,00 	 23.047,00 	0,669	0,694	66,8	62,1	8,7	9,0	11,7	11,6	11.491	18.054	6	63	10%\nBurkina Faso	0,67	 1.214,00 	 1.816,00 	0,376	0,407	56,9	55,7	1,9	1,1	7,0	8,0	1.335	1.871	12	90	13%\nBurundi	0,79	 495,00 	 628,00 	0,370	0,410	56,1	52,2	2,2	3,3	9,6	10,7	685	815	32	105	30%\nCameroon	0,63	 1.816,00 	 2.868,00 	0,468	0,537	56,2	53,9	5,1	6,7	9,5	11,2	2.062	3.052	56	180	31%\nCape Verde	0,47	 2.839,00 	 6.038,00 	..	..	78,8	71,1	..	..	13,6	12,9	4.266	8.480	15	72	21%\nChad	0,62	 1.141,00 	 1.844,00 	0,319	0,419	52,1	50,3	0,6	2,3	5,9	8,9	1.289	1.953	28	188	15%\nComoros				..	..	62,3	59,5	..	..	12,3	13,2	798	2.201	1	33	3%\nCongo				0,543	0,585	60,2	57,4	5,5	6,7	10,9	11,3	4.222	5.597	10	136	7%\nCôte d'Ivoire	0,48	 1.314,00 	 2.736,00 	..	..	51,6	50,0	3,1	5,4	..	..	1.866	3.648	23	251	9%\nDjibouti				..	..	63,4	60,2	..	..	5,9	6,9	1.907	4.300	7	55	13%\nDRC				0,304	0,369	51,8	48,2	2,1	4,1	8,4	10,9	390	499	44	492	9%\nEgypt	0,26	 2.784,00 	 10.629,00 	0,617	0,722	73,6	68,8	5,3	7,5	12,7	13,3	4.225	16.522			\nEquatorial Guinea				..	..	54,6	51,7	..	..	6,9	10,0	17.769	25.977	24	100	24%\nEritrea				..	..	65,2	60,5	..	..	3,7	4,6	986	1.309	33	150	22%\nEthiopia	0,67	 917,00 	 1.360,00 	0,401	0,470	65,3	62,0	1,4	3,6	8,0	9,0	1.090	1.515	152	547	28%\nGabon				..	..	64,5	62,4	8,4	6,4	..	..	14.003	19.919	17	120	14%\nGambia				..	..	60,2	57,5	2,0	3,6	..	..	1.309	1.811	5	53	9%\nGhana	0,66	 1.637,00 	 2.466,00 	0,537	0,607	62,1	60,2	5,9	8,1	10,9	12,1	2.937	4.138	30	275	11%\nGuinea				0,344	0,439	56,9	55,3	0,8	2,6	7,4	10,1	913	1.370	14	102	14%\nGuinea-Bissau				..	..	55,8	52,8	1,4	3,4	..	..	907	1.275	25	114	22%\nKenya	0,65	 1.384,00 	 2.139,00 	0,508	0,560	63,6	59,8	5,4	7,1	10,7	11,3	1.763	2.554	69	350	20%\nLesotho	0,61	 1.493,00 	 2.447,00 	0,474	0,488	49,5	49,2	6,8	4,6	11,6	10,6	2.217	3.395	32	120	27%\nLiberia				0,379	0,482	61,5	59,6	2,3	5,6	8,9	12,4	634	868	8	73	11%\nLibya				0,749	0,805	77,3	73,5	7,5	7,5	16,4	15,9	10.649	32.678	30	188	16%\nMadagascar	0,72	 818,00 	 1.140,00 	0,476	0,519	66,2	63,2	4,8	5,6	10,2	10,5	1.102	1.566	31	151	21%\nMalawi	0,79	 794,00 	 1.010,00 	0,389	0,437	55,4	55,1	3,4	5,1	10,8	10,7	652	777	32	192	17%\nMali	0,41	 707,00 	 1.714,00 	0,350	0,455	54,9	55,1	1,4	2,6	7,6	9,6	914	2.076	14	147	10%\nMauritania	0,28	 1.128,00 	 4.058,00 	0,425	0,530	63,1	60,0	2,6	4,9	8,1	8,3	1.362	4.592	37	147	25%\nMauritius	0,45	 9.812,00 	 21.630,00 	0,750	0,784	77,1	70,3	8,0	9,1	15,9	15,2	10.980	22.726	8	69	12%\nMorocco	0,28	 2.296,00 	 8.175,00 	0,545	0,658	72,7	69,1	3,2	5,6	10,6	11,6	3.215	10.692	67	395	17%\nMozambique				0,343	0,391	51,0	49,3	0,8	1,7	8,9	10,1	939	1.086	99	250	40%\nNamibia	0,61	 5.712,00 	 9.371,00 	0,616	0,631	67,1	61,7	6,3	6,1	11,4	11,3	7.288	11.196	22	78	28%\nNiger				0,275	0,385	58,6	58,3	0,8	2,1	4,8	6,1	471	1.268	15	113	13%\nNigeria	0,58	 1.940,00 	 3.357,00 	0,458	0,546	52,8	52,2	4,2	6,3	8,2	9,8	4.068	6.594	24	360	7%\nRwanda				0,463	0,487	65,7	62,4	3,1	3,6	10,3	10,2	1.263	1.550	51	80	64%\nSao Tome				0,524	0,586	68,3	64,3	4,0	5,5	11,4	11,2	2.001	4.248	10	55	18%\nSenegal	0,57	 1.413,00 	 2.497,00 	0,449	0,520	64,9	61,9	3,4	5,6	7,8	8,1	1.642	2.717	64	150	43%\nSeychelles				..	..	78,1	69,0	9,4	9,4	12,1	11,1	..	..	14	32	44%\nSierra Leone				0,329	0,412	45,8	45,3	2,0	3,8	6,1	8,4	1.617	2.016	15	121	12%\nSomalia				..	..	56,7	53,4	..	..	..	..	..	..	38	275	14%\nSouth Africa	0,52	 7.950,00 	 15.145,00 	..	..	58,8	54,7	9,8	10,1	..	..	8.539	15.233	166	400	42%\nSouth Sudan				..	..	56,3	54,2	..	..	..	..	..	..	88	332	27%\nSudan				..	..	63,9	60,3	2,5	3,8	..	..	1.692	5.153	86	354	24%\nSwaziland				0,493	0,562	48,3	49,6	7,4	6,8	10,9	11,8	3.738	7.384	4	65	6%\nTanzania	0,69	 1.302,00 	 1.899,00 	0,466	0,509	62,9	60,2	4,5	5,8	9,0	9,3	1.501	1.903	126	350	36%\nTogo				0,401	0,499	57,4	55,6	3,3	6,7	8,5	11,9	998	1.263	16	91	18%\nTunisia				0,669	0,751	78,3	73,6	5,5	7,5	15,0	14,0	4.751	16.226	68	217	31%\nUganda	0,73	 1.139,00 	 1.563,00 	0,456	0,509	60,4	58,0	4,3	6,4	10,6	10,9	1.167	1.502	135	386	35%\nZambia	0,63	 1.322,00 	 2.094,00 	0,534	0,585	60,0	56,3	5,8	7,2	13,0	13,9	2.344	3.455	20	158	13%\nZimbabwe				0,468	0,515	60,8	58,8	6,7	7,8	9,1	9,5	1.124	1.496	85	270	31%"},161:function(e,t){(function(){function t(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){if(t)for(var n=Object.keys(t),r=0;r<n.length;r++){var o=n[r];e[o]=t[o]}}),e}function n(e){var t;return(t=e.match(/(['"]?)(.*)\1/))&&t[2]||e}function r(e){return!/#@/.test(e[0])}function o(e,t){return e.split(t).map(function(e){var e=n(e),t=+e;return t===parseInt(e,10)?t:e})}function a(e,n){var r=t({header:!0},n);this.sep=e,this.header=r.header}var i="\n";a.prototype.stringify=function(e){var t=this.sep,n=!!this.header,r="object"==typeof e[0]&&Object.keys(e[0]),o=r&&r.join(t),a=n?o+i:"";return e&&r?a+e.map(function(e){var n=r.reduce(function(t,n){return t.push(e[n]),t},[]);return n.join(t)}).join(i):""},a.prototype.parse=function(e){var t=this.sep,n=e.split(/[\n\r]/).filter(r),a=!!this.header,i=a?o(n.shift(),t):{};return n.length<1?[]:n.reduce(function(e,n){var r=a?{}:[];return e.push(o(n,t).reduce(function(e,t,n){return e[i[n]||n]=t,e},r)),e},[])};var s=new a("	");t(s,{TSV:s,CSV:new a(","),Parser:a}),"undefined"!=typeof e&&e.exports?e.exports=s:this.TSV=s}).call(this)}});