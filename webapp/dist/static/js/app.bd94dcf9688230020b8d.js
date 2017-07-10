webpackJsonp([1],[,,,,,,,function(e,t,a){"use strict";var n={API_URL:"http://192.168.99.1:8888/api",RESPONSE_BONUS:0,DEFAULT_TIMEOUT:60};t.a=n},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,a){"use strict";var n=a(3),o=a(264),s=a(245),r=a.n(s),i=a(247),u=a.n(i),c=a(246),l=a.n(c),d=a(242),v=a.n(d);n.default.use(o.a),t.a=new o.a({routes:[{path:"/",name:"Home",component:r.a},{path:"/stats",name:"Stats",component:u.a},{path:"/register",name:"Register",component:l.a},{path:"/game",name:"Game",component:v.a},{path:"*",redirect:"/"}]})},function(e,t,a){"use strict";var n=a(181),o=a(180),s=a(182);t.a={register:n.a,quizz:o.a,stats:s.a}},,function(e,t){},function(e,t){},function(e,t,a){function n(e){a(233)}var o=a(4)(a(183),a(259),n,null,null);e.exports=o.exports},,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(3),o=a(156),s=a(155),r=a(150),i=a.n(r),u=a(154),c=a.n(u),l=a(153),d=a.n(l),v=a(148),f=a(149),m=a(152),h=(a.n(m),a(151));a.n(h);n.default.use(o.a),n.default.use(s.a),n.default.use(i.a),n.default.use(c.a),n.default.config.productionTip=!1,n.default.http.headers.common["Cache-Control"]="no-cache, no-store, must-revalidate",n.default.http.headers.common.Expires="0";var p=new o.a.Store({modules:f.a});new n.default({el:"#app",store:p,router:v.a,template:"<App/>",components:{App:d.a}})},function(e,t,a){"use strict";var n,o=a(12),s=a.n(o),r=a(3),i=a(7),u={state:{quizz:[]},mutations:(n={},s()(n,"QUIZZ",function(e){e.quizzPending=!0}),s()(n,"QUIZZ_SUCCESS",function(e,t){e.quizzPending=!1;for(var a=0;a<t.length;a++)e.quizz.push(t[a])}),s()(n,"QUIZZ_FAILED",function(e){e.quizzPending=!1}),n),actions:{getQuizz:function(e,t){var a=e.commit;a("QUIZZ");var n=i.a.API_URL+"/questions";return r.default.http.get(n).then(function(e){return e.json()}).then(function(e){return a("QUIZZ_SUCCESS",e),e}).catch(function(){a("QUIZZ_FAILED")})},sendAnswer:function(e,t){var a=(e.commit,t.question),n=t.answer,o=t.userId,s=i.a.API_URL+"/questions/"+a.id;return r.default.http.post(s,{user_id:o,answer:n})}},getters:{getQuizz:function(e){return e.quizz}}};t.a=u},function(e,t,a){"use strict";var n,o=a(12),s=a.n(o),r=a(3),i=a(7),u=a(239),c=a.n(u),l={state:{isLoggedIn:!1,user:null},mutations:(n={},s()(n,"REGISTER",function(e){e.pending=!0}),s()(n,"REGISTER_SUCCESS",function(e,t){e.isLoggedIn=!0,e.user=t,e.registerPending=!1}),s()(n,"REGISTER_FAILED",function(e){e.isLoggedIn=!1,e.registerPending=!1}),s()(n,"LOGOUT",function(e){e.isLoggedIn=!1,e.user=null}),s()(n,"USER_GET",function(e){e.registerPending=!0}),s()(n,"USER_GET_FAILED",function(e){e.pendingUser=!1}),n),actions:{getUser:function(e,t){var a=e.commit;a("USER_GET");var n=i.a.API_URL+"/users/"+c()(t.email);return r.default.http.get(n,t).then(function(e){return e.json()}).then(function(e){return a("REGISTER_SUCCESS",e),e}).catch(function(){a("USER_GET_FAILED")})},register:function(e,t){var a=e.commit;a("REGISTER");var n=i.a.API_URL+"/users";return r.default.http.post(n,t).then(function(e){return e.json()}).then(function(e){return a("REGISTER_SUCCESS",e),e}).catch(function(){a("REGISTER_FAILED")})},logout:function(e){var t=e.commit;localStorage.removeItem("token"),t("LOGOUT")}},getters:{isLoggedIn:function(e){return e.isLoggedIn},getUser:function(e){return e.user}}};t.a=l},function(e,t,a){"use strict";var n,o=a(12),s=a.n(o),r=a(3),i=a(7),u={state:{users:{},stats:{}},mutations:(n={},s()(n,"STATS",function(e){e.statsPending=!0}),s()(n,"STATS_SUCCESS",function(e,t){e.statsPending=!1,e.stats[t.date]=t}),s()(n,"STATS_FAILED",function(e){e.statsPending=!1}),s()(n,"USERS",function(e){e.usersPending=!0}),s()(n,"USERS_SUCCESS",function(e,t){e.users[t.id]=t,e.usersPending=!1}),s()(n,"USERS_FAILED",function(e){e.usersPending=!1}),n),actions:{getStats:function(e,t){var a=e.commit;a("STATS");var n=i.a.API_URL+"/scores";return t&&(n+="?date="+t),r.default.http.get(n).then(function(e){return e.json()}).then(function(e){return a("STATS_SUCCESS",e),e}).catch(function(){a("STATS_FAILED")})}},getters:{getUsers:function(e){return e.users},getStats:function(e){return e.stats}}};t.a=u},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"app",beforeCreate:function(){this.$store.dispatch("getQuizz")}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"counter",props:{counter:Object},mounted:function(){var e=this;setTimeout(function(){e.counter.value=!1},2900)}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(0),o=a.n(n),s=a(241),r=a.n(s),i=a(244),u=a.n(i),c=a(243),l=a.n(c),d=a(249),v=a.n(d),f=a(7);t.default={name:"game",components:{Counter:r.a,Quizz:u.a,Over:l.a,Distractor:v.a},beforeCreate:function(){this.$store.getters.isLoggedIn||this.$router.push({name:"Register"})},data:function(){return{timeout:f.a.DEFAULT_TIMEOUT,maxTimeout:f.a.DEFAULT_TIMEOUT,counter:{value:!0},over:!1,idQuestion:0,quizz:this.$store.getters.getQuizz}},methods:{sendAnswer:function(e){this.$store.dispatch("sendAnswer",{question:this.quizz[this.idQuestion],userId:this.$store.getters.getUser.id,answer:e})},nextQuestion:function(e){this.sendAnswer(e),this.idQuestion<this.quizz.length-1?(this.idQuestion+=1,this.timeout+=f.a.RESPONSE_BONUS,this.timeout>this.maxTimeout&&(this.timeout=this.maxTimeout)):this.over=!0}},mounted:function(){function e(){setTimeout(function(){n.timeout>0?(n.timeout-=.01,e()):n.over=!0},10)}var t=o()().format("YYYY-MM-DD"),a=this.$store.getters.getUser;a.scores&&a.scores.hasOwnProperty(t)&&(this.over=!0);var n=this;e();var s=new Date;window.addEventListener("focus",function(){var e=new Date;n.timeout-=(e-s)/1e3},!1),window.addEventListener("blur",function(){s=new Date},!1)}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(0),o=a.n(n);t.default={name:"over",data:function(){return{user:this.$store.getters.getUser,loading:!0}},computed:{currentDate:function(){return o()().format("YYYY-MM-DD")},scoring:function(){var e=this.todayScore();return e>25?"Woaaaahhh got a pretty nice score !":e>18?"Not bad :) !":e>10?"You're having a good day !":e>5?"Well played, "+this.user.name:"Not bad, "+this.user.name},tomorrow:function(){return"See you tomorrow to beat your score !"}},methods:{todayScore:function(){return this.user.scores?this.user.scores[this.currentDate]:0}},mounted:function(){var e=this;this.$store.dispatch("getUser",{email:this.user.email}).then(function(t){t&&(e.user=t),e.loading=!1})}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"quizz",props:{question:String,answers:Array,callback:Function}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"home"}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(248),o=a.n(n);t.default={name:"register",components:{countrySelect:o.a},computed:{greeting:function(){var e=new Date,t=e.getHours();return t>=5&&t<13?"Good morning":t>=13&&t<18?"Good afternoon":"Good evening"}},methods:{matchUser:function(){var e=this;if(this.error=null,2!==this.user.email.split("@").length)return void this.$message.error("Email is not valid.");this.$store.dispatch("getUser",{email:this.user.email}).then(function(t){t?e.$router.push({name:"Game"}):e.completeProfile=!0})},register:function(){var e=this;if(this.user.name.length<1||this.user.country.length<1)return void this.$message.error("Please complete all form.");this.$store.dispatch("register",this.user).then(function(t){e.$router.push({name:"Game"})})}},data:function(){return{completeProfile:!1,error:null,user:{email:"",country:"",name:"",cool:!1}}}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(0),o=a.n(n),s=a(250),r=a.n(s);t.default={name:"stats",components:{ScoreCard:r.a},methods:{currentDate:function(){return o()().format("YYYY-MM-DD")}}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"countrySelect",props:{user:Object},data:function(){return{countries:[],state:""}},methods:{querySearch:function(e,t){var a=this.countries;t(e?a.filter(this.createFilter(e)):a)},createFilter:function(e){return function(t){return 0===t.value.toLowerCase().indexOf(e.toLowerCase())}},loadAll:function(){return[{code:"AF",value:"Afghanistan"},{code:"AX",value:"Aland Islands"},{code:"AL",value:"albania"},{code:"DZ",value:"Algeria"},{code:"AS",value:"American Samoa"},{code:"AD",value:"Andorra"},{code:"AO",value:"Angola"},{code:"AI",value:"Anguilla"},{code:"AQ",value:"Antarctica"},{code:"AG",value:"Antigua and Barbuda"},{code:"AR",value:"Argentina"},{code:"AM",value:"Armenia"},{code:"AW",value:"Aruba"},{code:"AU",value:"Australia"},{code:"AT",value:"Austria"},{code:"AZ",value:"Azerbaijan"},{code:"BS",value:"Bahamas"},{code:"BH",value:"Bahrain"},{code:"BD",value:"Bangladesh"},{code:"BB",value:"Barbados"},{code:"BY",value:"Belarus"},{code:"BE",value:"Belgium"},{code:"BZ",value:"Belize"},{code:"BJ",value:"Benin"},{code:"BM",value:"Bermuda"},{code:"BT",value:"Bhutan"},{code:"BO",value:"Bolivia, Plurinational State of"},{code:"BQ",value:"Bonaire, Sint Eustatius and Saba"},{code:"BA",value:"Bosnia and Herzegovina"},{code:"BW",value:"Botswana"},{code:"BV",value:"Bouvet Island"},{code:"BR",value:"Brazil"},{code:"IO",value:"British Indian Ocean Territory"},{code:"BN",value:"Brunei Darussalam"},{code:"BG",value:"Bulgaria"},{code:"BF",value:"Burkina Faso"},{code:"BI",value:"Burundi"},{code:"KH",value:"Cambodia"},{code:"CM",value:"Cameroon"},{code:"CA",value:"Canada"},{code:"CV",value:"Cape Verde"},{code:"KY",value:"Cayman Islands"},{code:"CF",value:"Central African Republic"},{code:"TD",value:"Chad"},{code:"CL",value:"Chile"},{code:"CN",value:"China"},{code:"CX",value:"Christmas Island"},{code:"CC",value:"Cocos (Keeling) Islands"},{code:"CO",value:"Colombia"},{code:"KM",value:"Comoros"},{code:"CG",value:"Congo"},{code:"CD",value:"Congo, the Democratic Republic of the"},{code:"CK",value:"Cook Islands"},{code:"CR",value:"Costa Rica"},{code:"CI",value:"Côte d'Ivoire"},{code:"HR",value:"Croatia"},{code:"CU",value:"Cuba"},{code:"CW",value:"Curaçao"},{code:"CY",value:"Cyprus"},{code:"CZ",value:"Czech Republic"},{code:"DK",value:"Denmark"},{code:"DJ",value:"Djibouti"},{code:"DM",value:"Dominica"},{code:"DO",value:"Dominican Republic"},{code:"EC",value:"Ecuador"},{code:"EG",value:"Egypt"},{code:"SV",value:"El Salvador"},{code:"GQ",value:"Equatorial Guinea"},{code:"ER",value:"Eritrea"},{code:"EE",value:"Estonia"},{code:"ET",value:"Ethiopia"},{code:"FK",value:"Falkland Islands (Malvinas)"},{code:"FO",value:"Faroe Islands"},{code:"FJ",value:"Fiji"},{code:"FI",value:"Finland"},{code:"FR",value:"France"},{code:"GF",value:"French Guiana"},{code:"PF",value:"French Polynesia"},{code:"TF",value:"French Southern Territories"},{code:"GA",value:"Gabon"},{code:"GM",value:"Gambia"},{code:"GE",value:"Georgia"},{code:"DE",value:"Germany"},{code:"GH",value:"Ghana"},{code:"GI",value:"Gibraltar"},{code:"GR",value:"Greece"},{code:"GL",value:"Greenland"},{code:"GD",value:"Grenada"},{code:"GP",value:"Guadeloupe"},{code:"GU",value:"Guam"},{code:"GT",value:"Guatemala"},{code:"GG",value:"Guernsey"},{code:"GN",value:"Guinea"},{code:"GW",value:"Guinea-Bissau"},{code:"GY",value:"Guyana"},{code:"HT",value:"Haiti"},{code:"HM",value:"Heard Island and McDonald Islands"},{code:"VA",value:"Holy See (Vatican City State)"},{code:"HN",value:"Honduras"},{code:"HK",value:"Hong Kong"},{code:"HU",value:"Hungary"},{code:"IS",value:"Iceland"},{code:"IN",value:"India"},{code:"ID",value:"Indonesia"},{code:"IR",value:"Iran, Islamic Republic of"},{code:"IQ",value:"Iraq"},{code:"IE",value:"Ireland"},{code:"IM",value:"Isle of Man"},{code:"IL",value:"Israel"},{code:"IT",value:"Italy"},{code:"JM",value:"Jamaica"},{code:"JP",value:"Japan"},{code:"JE",value:"Jersey"},{code:"JO",value:"Jordan"},{code:"KZ",value:"Kazakhstan"},{code:"KE",value:"Kenya"},{code:"KI",value:"Kiribati"},{code:"KP",value:"Korea, Democratic People's Republic of"},{code:"KR",value:"Korea, Republic of"},{code:"KW",value:"Kuwait"},{code:"KG",value:"Kyrgyzstan"},{code:"LA",value:"Lao People's Democratic Republic"},{code:"LV",value:"Latvia"},{code:"LB",value:"Lebanon"},{code:"LS",value:"Lesotho"},{code:"LR",value:"Liberia"},{code:"LY",value:"Libya"},{code:"LI",value:"Liechtenstein"},{code:"LT",value:"Lithuania"},{code:"LU",value:"Luxembourg"},{code:"MO",value:"Macao"},{code:"MK",value:"Macedonia, the Former Yugoslav Republic of"},{code:"MG",value:"Madagascar"},{code:"MW",value:"Malawi"},{code:"MY",value:"Malaysia"},{code:"MV",value:"Maldives"},{code:"ML",value:"Mali"},{code:"MT",value:"Malta"},{code:"MH",value:"Marshall Islands"},{code:"MQ",value:"Martinique"},{code:"MR",value:"Mauritania"},{code:"MU",value:"Mauritius"},{code:"YT",value:"Mayotte"},{code:"MX",value:"Mexico"},{code:"FM",value:"Micronesia, Federated States of"},{code:"MD",value:"Moldova, Republic of"},{code:"MC",value:"Monaco"},{code:"MN",value:"Mongolia"},{code:"ME",value:"Montenegro"},{code:"MS",value:"Montserrat"},{code:"MA",value:"Morocco"},{code:"MZ",value:"Mozambique"},{code:"MM",value:"Myanmar"},{code:"NA",value:"Namibia"},{code:"NR",value:"Nauru"},{code:"NP",value:"Nepal"},{code:"NL",value:"Netherlands"},{code:"NC",value:"New Caledonia"},{code:"NZ",value:"New Zealand"},{code:"NI",value:"Nicaragua"},{code:"NE",value:"Niger"},{code:"NG",value:"Nigeria"},{code:"NU",value:"Niue"},{code:"NF",value:"Norfolk Island"},{code:"MP",value:"Northern Mariana Islands"},{code:"NO",value:"Norway"},{code:"OM",value:"Oman"},{code:"PK",value:"Pakistan"},{code:"PW",value:"Palau"},{code:"PS",value:"Palestine, State of"},{code:"PA",value:"Panama"},{code:"PG",value:"Papua New Guinea"},{code:"PY",value:"Paraguay"},{code:"PE",value:"Peru"},{code:"PH",value:"Philippines"},{code:"PN",value:"Pitcairn"},{code:"PL",value:"Poland"},{code:"PT",value:"Portugal"},{code:"PR",value:"Puerto Rico"},{code:"QA",value:"Qatar"},{code:"RE",value:"Réunion"},{code:"RO",value:"Romania"},{code:"RU",value:"Russian Federation"},{code:"RW",value:"Rwanda"},{code:"BL",value:"Saint Barthélemy"},{code:"SH",value:"Saint Helena, Ascension and Tristan da Cunha"},{code:"KN",value:"Saint Kitts and Nevis"},{code:"LC",value:"Saint Lucia"},{code:"MF",value:"Saint Martin (French part)"},{code:"PM",value:"Saint Pierre and Miquelon"},{code:"VC",value:"Saint Vincent and the Grenadines"},{code:"WS",value:"Samoa"},{code:"SM",value:"San Marino"},{code:"ST",value:"Sao Tome and Principe"},{code:"SA",value:"Saudi Arabia"},{code:"SN",value:"Senegal"},{code:"RS",value:"Serbia"},{code:"SC",value:"Seychelles"},{code:"SL",value:"Sierra Leone"},{code:"SG",value:"Singapore"},{code:"SX",value:"Sint Maarten (Dutch part)"},{code:"SK",value:"Slovakia"},{code:"SI",value:"Slovenia"},{code:"SB",value:"Solomon Islands"},{code:"SO",value:"Somalia"},{code:"ZA",value:"South Africa"},{code:"GS",value:"South Georgia and the South Sandwich Islands"},{code:"SS",value:"South Sudan"},{code:"ES",value:"Spain"},{code:"LK",value:"Sri Lanka"},{code:"SD",value:"Sudan"},{code:"SR",value:"Suriname"},{code:"SJ",value:"Svalbard and Jan Mayen"},{code:"SZ",value:"Swaziland"},{code:"SE",value:"Sweden"},{code:"CH",value:"Switzerland"},{code:"SY",value:"Syrian Arab Republic"},{code:"TW",value:"Taiwan, Province of China"},{code:"TJ",value:"Tajikistan"},{code:"TZ",value:"Tanzania, United Republic of"},{code:"TH",value:"Thailand"},{code:"TL",value:"Timor-Leste"},{code:"TG",value:"Togo"},{code:"TK",value:"Tokelau"},{code:"TO",value:"Tonga"},{code:"TT",value:"Trinidad and Tobago"},{code:"TN",value:"Tunisia"},{code:"TR",value:"Turkey"},{code:"TM",value:"Turkmenistan"},{code:"TC",value:"Turks and Caicos Islands"},{code:"TV",value:"Tuvalu"},{code:"UG",value:"Uganda"},{code:"UA",value:"Ukraine"},{code:"AE",value:"United Arab Emirates"},{code:"GB",value:"United Kingdom"},{code:"US",value:"United States"},{code:"UM",value:"United States Minor Outlying Islands"},{code:"UY",value:"Uruguay"},{code:"UZ",value:"Uzbekistan"},{code:"VU",value:"Vanuatu"},{code:"VE",value:"Venezuela, Bolivarian Republic of"},{code:"VN",value:"Viet Nam"},{code:"VG",value:"Virgin Islands, British"},{code:"VI",value:"Virgin Islands, U.S."},{code:"WF",value:"Wallis and Futuna"},{code:"EH",value:"Western Sahara"},{code:"YE",value:"Yemen"},{code:"ZM",value:"Zambia"},{code:"ZW",value:"Zimbabwe"}]},handleSelect:function(e){this.user.country=e.value}},mounted:function(){this.countries=this.loadAll()}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"distractor",props:{counter:Number}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(251),o=a.n(n);t.default={name:"score-card",components:{UserScore:o.a},data:function(){return{users:[]}},props:{title:String,datetime:String},methods:{refresh:function(){var e=this;this.$store.dispatch("getStats",this.datetime).then(function(t){e.users=t});var t=this;setTimeout(function(){t.refresh()},1e3)}},mounted:function(){this.refresh()}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"score-user",date:function(){return{user:{}}},props:{user:Object,datetime:String,score:Number},methods:{getUser:function(){var e=this.$store.getters.getUsers,t=e[this.userId];if(t)return this.user=t,t;this.fetchUser()},fetchUser:function(){var e=this;this.$store.dispatch("getUser",this.userId).then(function(){e.getUser()})}},mounted:function(){this.getUser()}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},,,function(e,t,a){function n(e){return a(o(e))}function o(e){var t=s[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}var s={"./af":32,"./af.js":32,"./ar":39,"./ar-dz":33,"./ar-dz.js":33,"./ar-kw":34,"./ar-kw.js":34,"./ar-ly":35,"./ar-ly.js":35,"./ar-ma":36,"./ar-ma.js":36,"./ar-sa":37,"./ar-sa.js":37,"./ar-tn":38,"./ar-tn.js":38,"./ar.js":39,"./az":40,"./az.js":40,"./be":41,"./be.js":41,"./bg":42,"./bg.js":42,"./bn":43,"./bn.js":43,"./bo":44,"./bo.js":44,"./br":45,"./br.js":45,"./bs":46,"./bs.js":46,"./ca":47,"./ca.js":47,"./cs":48,"./cs.js":48,"./cv":49,"./cv.js":49,"./cy":50,"./cy.js":50,"./da":51,"./da.js":51,"./de":54,"./de-at":52,"./de-at.js":52,"./de-ch":53,"./de-ch.js":53,"./de.js":54,"./dv":55,"./dv.js":55,"./el":56,"./el.js":56,"./en-au":57,"./en-au.js":57,"./en-ca":58,"./en-ca.js":58,"./en-gb":59,"./en-gb.js":59,"./en-ie":60,"./en-ie.js":60,"./en-nz":61,"./en-nz.js":61,"./eo":62,"./eo.js":62,"./es":64,"./es-do":63,"./es-do.js":63,"./es.js":64,"./et":65,"./et.js":65,"./eu":66,"./eu.js":66,"./fa":67,"./fa.js":67,"./fi":68,"./fi.js":68,"./fo":69,"./fo.js":69,"./fr":72,"./fr-ca":70,"./fr-ca.js":70,"./fr-ch":71,"./fr-ch.js":71,"./fr.js":72,"./fy":73,"./fy.js":73,"./gd":74,"./gd.js":74,"./gl":75,"./gl.js":75,"./gom-latn":76,"./gom-latn.js":76,"./he":77,"./he.js":77,"./hi":78,"./hi.js":78,"./hr":79,"./hr.js":79,"./hu":80,"./hu.js":80,"./hy-am":81,"./hy-am.js":81,"./id":82,"./id.js":82,"./is":83,"./is.js":83,"./it":84,"./it.js":84,"./ja":85,"./ja.js":85,"./jv":86,"./jv.js":86,"./ka":87,"./ka.js":87,"./kk":88,"./kk.js":88,"./km":89,"./km.js":89,"./kn":90,"./kn.js":90,"./ko":91,"./ko.js":91,"./ky":92,"./ky.js":92,"./lb":93,"./lb.js":93,"./lo":94,"./lo.js":94,"./lt":95,"./lt.js":95,"./lv":96,"./lv.js":96,"./me":97,"./me.js":97,"./mi":98,"./mi.js":98,"./mk":99,"./mk.js":99,"./ml":100,"./ml.js":100,"./mr":101,"./mr.js":101,"./ms":103,"./ms-my":102,"./ms-my.js":102,"./ms.js":103,"./my":104,"./my.js":104,"./nb":105,"./nb.js":105,"./ne":106,"./ne.js":106,"./nl":108,"./nl-be":107,"./nl-be.js":107,"./nl.js":108,"./nn":109,"./nn.js":109,"./pa-in":110,"./pa-in.js":110,"./pl":111,"./pl.js":111,"./pt":113,"./pt-br":112,"./pt-br.js":112,"./pt.js":113,"./ro":114,"./ro.js":114,"./ru":115,"./ru.js":115,"./sd":116,"./sd.js":116,"./se":117,"./se.js":117,"./si":118,"./si.js":118,"./sk":119,"./sk.js":119,"./sl":120,"./sl.js":120,"./sq":121,"./sq.js":121,"./sr":123,"./sr-cyrl":122,"./sr-cyrl.js":122,"./sr.js":123,"./ss":124,"./ss.js":124,"./sv":125,"./sv.js":125,"./sw":126,"./sw.js":126,"./ta":127,"./ta.js":127,"./te":128,"./te.js":128,"./tet":129,"./tet.js":129,"./th":130,"./th.js":130,"./tl-ph":131,"./tl-ph.js":131,"./tlh":132,"./tlh.js":132,"./tr":133,"./tr.js":133,"./tzl":134,"./tzl.js":134,"./tzm":136,"./tzm-latn":135,"./tzm-latn.js":135,"./tzm.js":136,"./uk":137,"./uk.js":137,"./ur":138,"./ur.js":138,"./uz":140,"./uz-latn":139,"./uz-latn.js":139,"./uz.js":140,"./vi":141,"./vi.js":141,"./x-pseudo":142,"./x-pseudo.js":142,"./yo":143,"./yo.js":143,"./zh-cn":144,"./zh-cn.js":144,"./zh-hk":145,"./zh-hk.js":145,"./zh-tw":146,"./zh-tw.js":146};n.keys=function(){return Object.keys(s)},n.resolve=o,e.exports=n,n.id=240},function(e,t,a){function n(e){a(235)}var o=a(4)(a(184),a(261),n,"data-v-783a12c1",null);e.exports=o.exports},function(e,t,a){function n(e){a(227)}var o=a(4)(a(185),a(253),n,"data-v-1500047d",null);e.exports=o.exports},function(e,t,a){function n(e){a(237)}var o=a(4)(a(186),a(263),n,"data-v-c4069742",null);e.exports=o.exports},function(e,t,a){function n(e){a(234)}var o=a(4)(a(187),a(260),n,null,null);e.exports=o.exports},function(e,t,a){function n(e){a(236)}var o=a(4)(a(188),a(262),n,"data-v-889afec6",null);e.exports=o.exports},function(e,t,a){function n(e){a(226)}var o=a(4)(a(189),a(252),n,null,null);e.exports=o.exports},function(e,t,a){function n(e){a(229)}var o=a(4)(a(190),a(255),n,null,null);e.exports=o.exports},function(e,t,a){function n(e){a(228)}var o=a(4)(a(191),a(254),n,"data-v-166e6920",null);e.exports=o.exports},function(e,t,a){function n(e){a(231)}var o=a(4)(a(192),a(257),n,"data-v-4cbeb01b",null);e.exports=o.exports},function(e,t,a){function n(e){a(232)}var o=a(4)(a(193),a(258),n,null,null);e.exports=o.exports},function(e,t,a){function n(e){a(230)}var o=a(4)(a(194),a(256),n,null,null);e.exports=o.exports},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"register-wrapper"},[a("div",{staticClass:"register-title"}),e._v(" "),a("div",{staticClass:"register-content"},[a("div",{staticClass:"register-content_inner"},[a("div",{staticClass:"register-card"},[a("h3",{},[e._v("\n        "+e._s(e.greeting)+"! "),a("span",{staticStyle:{"margin-left":"5px"}},[e._v("Welcome Back")])]),e._v(" "),a("div",{staticStyle:{color:"#999","text-align":"center","margin-bottom":"30px"}},[e._v("\n          Enter your detail below\n        ")]),e._v(" "),e.completeProfile?e._e():a("div",[a("el-form",{staticStyle:{"text-align":"left"},attrs:{"label-position":"top","label-width":"100px",model:e.user}},[a("el-form-item",{attrs:{label:"Email*"}},[a("el-input",{attrs:{type:"email",min:"3"},model:{value:e.user.email,callback:function(t){e.user.email=t},expression:"user.email"}}),e._v(" "),a("span",{staticStyle:{color:"#999"}},[e._v("\n                *We will not use your email for anything not related to this game.\n              ")])],1),e._v(" "),a("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:e.matchUser}},[e._v("\n              Continue\n            ")])],1)],1),e._v(" "),e.completeProfile?a("div",[a("el-form",{staticStyle:{"text-align":"left"},attrs:{"label-position":"top","label-width":"100px",model:e.user}},[a("el-form-item",[a("el-checkbox",{model:{value:e.user.cool,callback:function(t){e.user.cool=t},expression:"user.cool"}},[e._v("I'm cool !")])],1),e._v(" "),a("el-form-item",[a("el-input",{attrs:{placeholder:"Name..."},model:{value:e.user.name,callback:function(t){e.user.name=t},expression:"user.name"}})],1),e._v(" "),a("el-form-item",[a("countrySelect",{attrs:{user:e.user}})],1),e._v(" "),a("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:e.register}},[e._v("\n              Register\n            ")])],1)],1):e._e()])])]),e._v(" "),a("div",{staticClass:"register-footer"})])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.over?e._e():a("Counter",{directives:[{name:"show",rawName:"v-show",value:e.counter.value,expression:"counter.value"}],attrs:{counter:e.counter}}),e._v(" "),!e.over&&e.quizz.length>0&&e.timeout>0?a("div",{staticClass:"quizz_container"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!e.counter.value,expression:"!counter.value"}],staticClass:"quizz_timer"},[a("div",{staticStyle:{float:"right","font-size":"14px",width:"60px","text-align":"right",color:"white"}},[e._v("\n        "+e._s(Math.ceil(e.timeout))+"s\n        "),a("i",{staticClass:"material-icons",staticStyle:{"vertical-align":"middle","font-size":"18px"}},[e._v("")])]),e._v(" "),a("el-progress",{staticStyle:{"padding-top":"5px"},attrs:{"stroke-width":10,percentage:e.timeout/e.maxTimeout*100,"show-text":!1}})],1),e._v(" "),a("div",{staticClass:"quizz",class:{active:!e.counter.value}},[a("Quizz",{attrs:{callback:e.nextQuestion,question:e.quizz[e.idQuestion].text,answers:e.quizz[e.idQuestion].answers}})],1),e._v(" "),a("Distractor",{attrs:{counter:e.idQuestion}})],1):e._e(),e._v(" "),e.over?a("Over"):e._e()],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-autocomplete",{staticClass:"inline-input",staticStyle:{width:"100%"},attrs:{"fetch-suggestions":e.querySearch,placeholder:"Select a country..."},on:{select:e.handleSelect},model:{value:e.state,callback:function(t){e.state=t},expression:"state"}})],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"stats_container"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12,xs:24}},[a("ScoreCard",{attrs:{title:"Global Top"}})],1),e._v(" "),a("el-col",{attrs:{span:12,xs:24}},[a("ScoreCard",{attrs:{title:"Today's Top",datetime:e.currentDate()}})],1)],1)],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"card-user"},[a("span",{staticClass:"card-user_name"},[e._v("\n    "+e._s(e.user.name)+"\n  ")]),e._v(" "),a("span",{staticClass:"card-user_score"},[e._v("\n    "+e._s(e.user.scores[e.datetime])+"\n    "),a("i",{staticClass:"material-icons"},[e._v("")])])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.counter>4?a("div",{attrs:{id:"pikachu"}}):e._e(),e._v(" "),e.counter>9?a("div",{attrs:{id:"salameche"}}):e._e(),e._v(" "),e.counter>14?a("div",{attrs:{id:"carapuce"}}):e._e(),e._v(" "),e.counter>19?a("div",{attrs:{id:"bulbizarre"}}):e._e()])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"card"},[a("h2",{staticClass:"card-header"},[e._v("\n    "+e._s(e.title)+"\n  ")]),e._v(" "),a("div",e._l(e.users,function(t){return a("UserScore",{key:t.id,attrs:{datetime:e.datetime,user:t}})}))])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h1",{staticClass:"quizz_title"},[e._v(e._s(e.question))]),e._v(" "),a("div",{staticClass:"quizz_wrapper"},[a("el-row",{attrs:{gutter:20}},e._l(e.answers,function(t,n){return a("el-col",{key:n,attrs:{span:12,xs:24}},[a("div",{staticClass:"quizz-btn_wrapper"},[a("el-button",{attrs:{type:"default"},on:{click:function(t){e.callback(n)}}},[e._v("\n            "+e._s(t)+"\n          ")])],1)])}))],1)])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},staticRenderFns:[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("ul",{staticClass:"cb-slideshow"},[a("li",[a("div",[e._v("3")])]),e._v(" "),a("li",[a("div",[e._v("2")])]),e._v(" "),a("li",[a("div",[e._v("1")])])])])}]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h1",[e._v("Home")]),e._v(" "),a("div",{staticStyle:{"margin-top":"100px"}},[a("router-link",{attrs:{to:"/stats"}},[a("el-button",{attrs:{type:"primary"}},[e._v("Show stats")])],1),e._v(" "),a("router-link",{attrs:{to:"/register"}},[a("el-button",{attrs:{type:"primary"}},[e._v("Let's play !")])],1)],1)])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticStyle:{"text-align":"right",margin:"20px"}},[a("router-link",{attrs:{to:"/register"}},[a("el-button",{attrs:{type:"primary"}},[a("i",{staticClass:"material-icons",staticStyle:{"font-size":"16px","line-height":"16px","vertical-align":"middle"}},[e._v("")]),e._v("\n        play again !")])],1)],1),e._v(" "),a("h1",[e._v("Game Over !")]),e._v(" "),a("div",{staticClass:"scoring-3"},[a("div",{staticClass:"scoring-2"},[a("div",{staticClass:"scoring-1"},[a("h3",[e._v(e._s(e.todayScore()))]),e._v(" "),a("span",[e._v("points")])])])]),e._v(" "),a("h4",{staticStyle:{"font-size":"24px"}},[e._v("\n    "+e._s(e.scoring)),a("br"),e._v("\n    "+e._s(e.tomorrow)+"\n  ")])])},staticRenderFns:[]}},,,,,function(e,t){}],[179]);
//# sourceMappingURL=app.bd94dcf9688230020b8d.js.map