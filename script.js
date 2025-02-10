const circle = document.querySelectorAll('.circle');
const rect = document.querySelector('.rectangle-1');
const input = document.querySelectorAll('.p');
const progressvalue = document.querySelector('.progress-bar');
const progresslable=document.querySelector('.par-1')


const allquotes = [
  'Raise the bar by completing your goals!',
  'Well begun is half done!',
  'Just a step away, keep going!',
  'Whoa! You just completed all the goals, time for chill : 😊'

]


const allgoal = JSON.parse(localStorage.getItem('allgoal')) || {
  first:{
    name:'',
    completed:false,
  },
  second:{
    name:'',
    completed:false,
  },
  third:{
    name:'',
    completed:false,
  },
};
let completedgoaltrue = Object.values(allgoal).filter((goal) => goal.completed).length


progressvalue.style.width = `${completedgoaltrue / 3 * 100}%`
progressvalue.firstElementChild.innerText = `${completedgoaltrue}/3 completed`
progresslable.innerText=allquotes[completedgoaltrue]

circle.forEach((checkbox) => {
  checkbox.addEventListener('click', (e) => {
    const allgoalfill = [...input].every((don) => {
      return don.value;
    });
    if (allgoalfill) {
      checkbox.parentElement.classList.toggle('completed');
      const inputid = checkbox.nextElementSibling.id
      allgoal[inputid].completed = !allgoal[inputid].completed
      completedgoaltrue = Object.values(allgoal).filter((goal) => goal.completed).length
      progressvalue.style.width = `${completedgoaltrue / 3 * 100}%`
      progressvalue.firstElementChild.innerText = `${completedgoaltrue}/3 completed`
      progresslable.innerText=allquotes[completedgoaltrue]
      localStorage.setItem('allgoal', JSON.stringify(allgoal));
    } else {
      rect.classList.add('show-error');
    }
  });
});

input.forEach((input) => {
  input.value = allgoal[input.id].name;
  if (allgoal[input.id].completed) {
    input.parentElement.classList.add('completed')
  }
  input.addEventListener('focus', () => {
    rect.classList.remove('show-error');
  });

  input.addEventListener('input', (e) => {
    if (allgoal[input.id].completed) {
      e.target.value = allgoal[input.id].name
      return
    }
    allgoal[input.id].name = input.value;

    localStorage.setItem('allgoal', JSON.stringify(allgoal));
  });
});

