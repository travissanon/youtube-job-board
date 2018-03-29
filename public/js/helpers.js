const regex = {
  Email: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
  Url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  MinChar: /^.{2,}$/,
  MinCharLong: /^.{100,}$/,
};

let validate = () => {
  if (regex.MinChar.test(data.title) === false || regex.MinChar.test(data.title) === false || data.title === '') {
    console.log('Please enter a valid title');
  } else if (regex.MinChar.test(data.channel) === false || regex.MinChar.test(data.channel) === false || data.channel === '') {
    console.log('Please enter a valid channel');
  } else if (regex.MinCharLong.test(data.description) === false || data.description === '') {
    console.log('Please enter a description longer than 100 characters');
  } else if (regex.Url.test(data.aUrl) === false || regex.MinChar.test(data.aUrl) === false || data.aUrl === '') {
    console.log('Please enter a link to the application');
  } else if (regex.Email.test(data.email) === false || data.title === '') {
    console.log('Please enter a valid email');
  } else if (regex.Url.test(data.hUrl) === false || regex.MinChar.test(data.hUrl) === false || data.hUrl === '') {
    console.log('Please add your company url');
  } else {
    sendData(data);
  }
}

let timeDiff = (time) => {
  let dateMade = new Date(time + 1000*3600);
  let currentDate = new Date();
  let diff = Math.floor(Math.abs(currentDate.getTime() - dateMade.getTime()) / 36e5);
  if (diff === 0) { 
    return 'Just now'; 
  } else if (diff > 0) { 
    return `${diff}h`; 
  }
}

let createAndName = (el, name) => {
  let create = document.createElement(el)
  create.className = name
  return create;
}

module.exports = { regex, validate, timeDiff, createAndName }