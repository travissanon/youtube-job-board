const { regex, validate, createAndName, timeDiff } = require('./helpers');
let currentJobs = document.getElementById('jobs');
let ref = firebase.database().ref().child('current-jobs');

ref.on('value', gotData, errData);

let tagSkills = [];

let postJob = document.forms.postJob;
postJob.setAttribute('autocomplete', 'off');

postJob.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.keycode === 13) {
    return false;
  } else {
    let data = {
      channel: postJob.querySelector('input[name="job_channel"]').value,
      description: postJob.querySelector('textarea[name="job_description"]').value,
      title: postJob.querySelector('input[name="job_title"]').value,
      email: postJob.querySelector('input[name="job_email"]').value,
      apply: postJob.querySelector('input[name="job_apply"]').value,
      hUrl: postJob.querySelector('input[name="job_hUrl"]').value,
      aUrl: postJob.querySelector('input[name="job_aUrl"]').value,
      skills: tagSkills,
      time: firebase.database.ServerValue.TIMESTAMP,
    };

    validate(data);
  }
});

let sendData = (data) => {
  ref.push(data);
  confirmation();
}

let confirmation = () => {
  document.location.replace("./index.html");
  if (window.location.href.match('./index.html') != null) {
    console.log('yeet');
    console.log(window.location.search);
   }
  // let banner = document.createElement('div');
  // banner.className = 'confirm-banner';

  // let bannerText = document.createElement('h3');
  // bannerText.appendChild(document.createTextNode('Thanks for submitting. 👌'));
  // banner.appendChild(bannerText);

  // document.body.prepend(banner);
}

function gotData(data) {
  let jobs = data.val();
  let keys = Object.keys(jobs);
  keys.reverse();
  for (var i = 0; i <= keys.length; i++) {
    let k = keys[i];
    let info = {
      title: document.createTextNode(jobs[k].title),
      channel: document.createTextNode(jobs[k].channel),
      skills: jobs[k].skills,
      time: jobs[k].time,
      desc: document.createTextNode(jobs[k].description),
      email: jobs[k].email,
    }

    let job = createAndName('div', 'job_id');

    let dropdown = createAndName('div', 'dropdown');

    let dicon = createAndName('i', 'fas fa-angle-double-down');
    dropdown.appendChild(dicon);
    job.appendChild(dropdown);

    let mainInfo = createAndName('div', 'main-info');
    job.appendChild(mainInfo);

    let h2 = document.createElement('h2');
    h2.appendChild(info.title);
    mainInfo.appendChild(h2);

    let h3 = document.createElement('h3');
    h3.appendChild(info.channel);
    mainInfo.appendChild(h3);

    let ul = document.createElement('ul');
    info.skills.forEach((skill) => {
      let li = document.createElement('li');
      li.innerHTML += skill;
      ul.appendChild(li);
    });
    job.appendChild(ul);

    let p = document.createElement('p');
    let timeCreated = timeDiff(info.time);
    p.appendChild(document.createTextNode(timeCreated));
    job.appendChild(p);

    let button = document.createElement('button');
    let apply = document.createTextNode('Apply');
    let mail = document.createElement('a');
    mail.href = `mailto:${info.email}?Subject=Hello%20again`;
    button.type = 'button';
    button.name = 'apply';
    mail.appendChild(button);
    button.appendChild(apply);
    job.appendChild(mail);

    currentJobs.appendChild(job);

    let moreInfo = document.createElement('div');
    moreInfo.className = 'more-info';
    job.appendChild(moreInfo);

    let text = document.createElement('div');
    text.className = 'text';
    moreInfo.appendChild(text);

    let ap = document.createElement('p');
    ap.appendChild(info.desc);
    text.appendChild(ap);

    let social = document.createElement('div');
    social.className = 'social';

    let twitter = document.createElement('button');
    let facebook = document.createElement('button');

    twitter.name = 'tweet';
    facebook.name = 'share';

    let twitIcon = document.createElement('i');
    let fbIcon = document.createElement('i');

    twitIcon.className = 'fab fa-twitter';
    fbIcon.className = 'fab fa-facebook-f';

    let twitName = document.createTextNode('Tweet this job');
    let fbName = document.createTextNode('Share this job');

    twitter.appendChild(twitIcon);
    twitter.appendChild(twitName);
    social.appendChild(twitter);

    facebook.appendChild(fbIcon);
    facebook.appendChild(fbName);
    social.appendChild(facebook);
    
    moreInfo.appendChild(social);
  }

  let exJob = document.querySelectorAll('.job_id');

  exJob.forEach((job) => {
    job.querySelector('.dropdown').addEventListener('click', () => {
      alert('fuck all');
      job.querySelector('.more-info').style.display = job.querySelector('.more-info').style.display === 'none' ? 'flex' : 'none';
    });
  });
};

const errData = (err) => {
  console.log('Error!');
  console.log(err);
};

let tagsInput = document.getElementById('tagsInput');
let tags = document.getElementById('tags');
let remove;

tags.addEventListener('keyup', function (e) {
  e.preventDefault();
  if (e.keyCode === 13) {
    let newTag = document.createElement('span');
    newTag.className = 'tag';
    newTag.innerHTML = '<span>' + this.value + '</span> <span class="x">x</span>';
    tagsInput.insertBefore(newTag, tags);
    tagSkills.push(this.value);
    console.log(tagSkills);
    this.value = '';
    remove = document.querySelectorAll('.x');
  };

  remove.forEach((x) => {
    x.addEventListener('click', () => {
      x.parentNode.parentNode.removeChild(x.parentNode);
      tagSkills.splice(tagSkills.indexOf(x.parentNode.firstChild.innerHTML));
      console.log(tagSkills);
    });
  });
});