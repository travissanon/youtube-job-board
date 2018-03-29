/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/helpers.js":
/*!******************************!*\
  !*** ./public/js/helpers.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const regex = {\n  Email: /^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$/,\n  Url: /^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$/,\n  MinChar: /^.{2,}$/,\n  MinCharLong: /^.{100,}$/,\n};\n\nlet validate = () => {\n  if (regex.MinChar.test(data.title) === false || regex.MinChar.test(data.title) === false || data.title === '') {\n    console.log('Please enter a valid title');\n  } else if (regex.MinChar.test(data.channel) === false || regex.MinChar.test(data.channel) === false || data.channel === '') {\n    console.log('Please enter a valid channel');\n  } else if (regex.MinCharLong.test(data.description) === false || data.description === '') {\n    console.log('Please enter a description longer than 100 characters');\n  } else if (regex.Url.test(data.aUrl) === false || regex.MinChar.test(data.aUrl) === false || data.aUrl === '') {\n    console.log('Please enter a link to the application');\n  } else if (regex.Email.test(data.email) === false || data.title === '') {\n    console.log('Please enter a valid email');\n  } else if (regex.Url.test(data.hUrl) === false || regex.MinChar.test(data.hUrl) === false || data.hUrl === '') {\n    console.log('Please add your company url');\n  } else {\n    sendData(data);\n  }\n}\n\nlet timeDiff = (time) => {\n  let dateMade = new Date(time + 1000*3600);\n  let currentDate = new Date();\n  let diff = Math.floor(Math.abs(currentDate.getTime() - dateMade.getTime()) / 36e5);\n  if (diff === 0) { \n    return 'Just now'; \n  } else if (diff > 0) { \n    return `${diff}h`; \n  }\n}\n\nlet createAndName = (el, name) => {\n  let create = document.createElement(el)\n  create.className = name\n  return create;\n}\n\nmodule.exports = { regex, validate, timeDiff, createAndName }\n\n//# sourceURL=webpack:///./public/js/helpers.js?");

/***/ }),

/***/ "./public/js/index.js":
/*!****************************!*\
  !*** ./public/js/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { regex, validate, createAndName, timeDiff } = __webpack_require__(/*! ./helpers */ \"./public/js/helpers.js\");\nlet currentJobs = document.getElementById('jobs');\nlet ref = firebase.database().ref().child('current-jobs');\n\nref.on('value', gotData, errData);\n\nlet tagSkills = [];\n\nlet postJob = document.forms.postJob;\npostJob.setAttribute('autocomplete', 'off');\n\npostJob.addEventListener('submit', (e) => {\n  e.preventDefault();\n  if (e.keycode === 13) {\n    return false;\n  } else {\n    let data = {\n      channel: postJob.querySelector('input[name=\"job_channel\"]').value,\n      description: postJob.querySelector('textarea[name=\"job_description\"]').value,\n      title: postJob.querySelector('input[name=\"job_title\"]').value,\n      email: postJob.querySelector('input[name=\"job_email\"]').value,\n      apply: postJob.querySelector('input[name=\"job_apply\"]').value,\n      hUrl: postJob.querySelector('input[name=\"job_hUrl\"]').value,\n      aUrl: postJob.querySelector('input[name=\"job_aUrl\"]').value,\n      skills: tagSkills,\n      time: firebase.database.ServerValue.TIMESTAMP,\n    };\n\n    validate(data);\n  }\n});\n\nlet sendData = (data) => {\n  ref.push(data);\n  confirmation();\n}\n\nlet confirmation = () => {\n  document.location.replace(\"./index.html\");\n  if (window.location.href.match('./index.html') != null) {\n    console.log('yeet');\n    console.log(window.location.search);\n   }\n  // let banner = document.createElement('div');\n  // banner.className = 'confirm-banner';\n\n  // let bannerText = document.createElement('h3');\n  // bannerText.appendChild(document.createTextNode('Thanks for submitting. 👌'));\n  // banner.appendChild(bannerText);\n\n  // document.body.prepend(banner);\n}\n\nfunction gotData(data) {\n  let jobs = data.val();\n  let keys = Object.keys(jobs);\n  keys.reverse();\n  for (var i = 0; i <= keys.length; i++) {\n    let k = keys[i];\n    let info = {\n      title: document.createTextNode(jobs[k].title),\n      channel: document.createTextNode(jobs[k].channel),\n      skills: jobs[k].skills,\n      time: jobs[k].time,\n      desc: document.createTextNode(jobs[k].description),\n      email: jobs[k].email,\n    }\n\n    let job = createAndName('div', 'job_id');\n\n    let dropdown = createAndName('div', 'dropdown');\n\n    let dicon = createAndName('i', 'fas fa-angle-double-down');\n    dropdown.appendChild(dicon);\n    job.appendChild(dropdown);\n\n    let mainInfo = createAndName('div', 'main-info');\n    job.appendChild(mainInfo);\n\n    let h2 = document.createElement('h2');\n    h2.appendChild(info.title);\n    mainInfo.appendChild(h2);\n\n    let h3 = document.createElement('h3');\n    h3.appendChild(info.channel);\n    mainInfo.appendChild(h3);\n\n    let ul = document.createElement('ul');\n    info.skills.forEach((skill) => {\n      let li = document.createElement('li');\n      li.innerHTML += skill;\n      ul.appendChild(li);\n    });\n    job.appendChild(ul);\n\n    let p = document.createElement('p');\n    let timeCreated = timeDiff(info.time);\n    p.appendChild(document.createTextNode(timeCreated));\n    job.appendChild(p);\n\n    let button = document.createElement('button');\n    let apply = document.createTextNode('Apply');\n    let mail = document.createElement('a');\n    mail.href = `mailto:${info.email}?Subject=Hello%20again`;\n    button.type = 'button';\n    button.name = 'apply';\n    mail.appendChild(button);\n    button.appendChild(apply);\n    job.appendChild(mail);\n\n    currentJobs.appendChild(job);\n\n    let moreInfo = document.createElement('div');\n    moreInfo.className = 'more-info';\n    job.appendChild(moreInfo);\n\n    let text = document.createElement('div');\n    text.className = 'text';\n    moreInfo.appendChild(text);\n\n    let ap = document.createElement('p');\n    ap.appendChild(info.desc);\n    text.appendChild(ap);\n\n    let social = document.createElement('div');\n    social.className = 'social';\n\n    let twitter = document.createElement('button');\n    let facebook = document.createElement('button');\n\n    twitter.name = 'tweet';\n    facebook.name = 'share';\n\n    let twitIcon = document.createElement('i');\n    let fbIcon = document.createElement('i');\n\n    twitIcon.className = 'fab fa-twitter';\n    fbIcon.className = 'fab fa-facebook-f';\n\n    let twitName = document.createTextNode('Tweet this job');\n    let fbName = document.createTextNode('Share this job');\n\n    twitter.appendChild(twitIcon);\n    twitter.appendChild(twitName);\n    social.appendChild(twitter);\n\n    facebook.appendChild(fbIcon);\n    facebook.appendChild(fbName);\n    social.appendChild(facebook);\n    \n    moreInfo.appendChild(social);\n  }\n\n  let exJob = document.querySelectorAll('.job_id');\n\n  exJob.forEach((job) => {\n    job.querySelector('.dropdown').addEventListener('click', () => {\n      alert('fuck all');\n      job.querySelector('.more-info').style.display = job.querySelector('.more-info').style.display === 'none' ? 'flex' : 'none';\n    });\n  });\n};\n\nfunction errData(err) {\n  console.log('Error!');\n  console.log(err);\n};\n\nlet tagsInput = document.getElementById('tagsInput');\nlet tags = document.getElementById('tags');\nvar remove;\n\ntags.addEventListener('keyup', function (e) {\n  e.preventDefault();\n  if (e.keyCode === 13) {\n    let newTag = document.createElement('span');\n    newTag.className = 'tag';\n    newTag.innerHTML = '<span>' + this.value + '</span> <span class=\"x\">x</span>';\n    tagsInput.insertBefore(newTag, tags);\n    tagSkills.push(this.value);\n    console.log(tagSkills);\n    this.value = '';\n    remove = document.querySelectorAll('.x');\n  };\n\n  remove.forEach((x) => {\n    x.addEventListener('click', () => {\n      x.parentNode.parentNode.removeChild(x.parentNode);\n      tagSkills.splice(tagSkills.indexOf(x.parentNode.firstChild.innerHTML));\n      console.log(tagSkills);\n    });\n  });\n});\n\n//# sourceURL=webpack:///./public/js/index.js?");

/***/ })

/******/ });