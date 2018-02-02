let currentJobs = document.getElementById('jobs');
let ref = firebase.database().ref().child('current-jobs');
ref.on('value', gotData, errData);

let tagSkills = [];

let postJob = document.forms.postJob;

postJob.setAttribute('autocomplete', 'off');

postJob.addEventListener('submit', (e) => {
  e.preventDefault();
  if (event.keycode === 13) {
    return false;
  } else {
    let regex = {
      Email: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
      Url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
      MinChar: /^.{6,}$/,
      MinCharLong: /^.{100,}$/,
    };

    let data = {
      provider: postJob.querySelector('input[name="job_provider"]').value,
      description: postJob.querySelector('input[name="job_description"]').value,
      title: postJob.querySelector('input[name="job_title"]').value,
      email: postJob.querySelector('input[name="job_email"]').value,
      apply: postJob.querySelector('input[name="job_apply"]').value,
      hUrl: postJob.querySelector('input[name="job_hUrl"]').value,
      aUrl: postJob.querySelector('input[name="job_aUrl"]').value,
      skills: tagSkills,
      time: '2h',
    };

    if (regex.MinChar.test(data.title) === false || regex.MinChar.test(data.title) === false || data.title === '') {
      console.log('Please enter a valid title');
    } else if (regex.MinChar.test(data.provider) === false || regex.MinChar.test(data.provider) === false || data.provider === '') {
      console.log('Please enter a valid provider');
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
});

function sendData(data) {
  ref.push(data);
  document.getElementById('postJob').innerHTML = 'yo bro';
}

function gotData(data) {
  let jobs = data.val();
  let keys = Object.keys(jobs);
  for (let i = 0; i < keys.length; i++) {
    let k = keys[i];
    let title = document.createTextNode(jobs[k].title);
    let provider = document.createTextNode(jobs[k].provider);
    let skills = jobs[k].skills;
    let time = document.createTextNode(jobs[k].time);

    let job = document.createElement('div');
    job.className = 'job_id';

    let mainInfo = document.createElement('div');
    mainInfo.className = 'main-info';
    job.appendChild(mainInfo);

    let h2 = document.createElement('h2');
    h2.appendChild(title);
    mainInfo.appendChild(h2);

    let h3 = document.createElement('h3');
    h3.appendChild(provider);
    mainInfo.appendChild(h3);

    let ul = document.createElement('ul');

    skills.forEach((skill) => {
      let li = document.createElement('li');
      ul.appendChild(li);
      li.innerHTML += skill;
    });

    job.appendChild(ul);

    let p = document.createElement('p');
    p.appendChild(time);
    job.appendChild(p);

    let button = document.createElement('button');
    let apply = document.createTextNode('Apply');
    button.type = 'button';
    button.name = 'apply';
    button.appendChild(apply);
    job.appendChild(button);

    //console.log(job);
    currentJobs.appendChild(job);
  }
};

function errData(err) {
  console.log('Error!');
  console.log(err);
};

let tagsInput = document.getElementById('tagsInput');
let tags = document.getElementById('tags');

tags.addEventListener('keyup', function (e) {
  e.preventDefault();
  if (event.keyCode === 13) {
    let newTag = document.createElement('span');
    newTag.className = 'tag';
    newTag.innerHTML = '<span>' + this.value + '</span> <span class="x">x</span>';
    tagsInput.insertBefore(newTag, tags);
    tagSkills.push(this.value);
    console.log(tagSkills);
    this.value = '';
  };
});

// let exJob = document.querySelector('.job_id');
// let jobInfo = exJob.querySelector('.more-info');
// jobInfo.style.display = 'none';

// exJob.addEventListener('click', () => {
//   jobInfo.style.display === 'none'
//     ? jobInfo.style.display = 'block'
//     : jobInfo.style.display = 'none';
// });
