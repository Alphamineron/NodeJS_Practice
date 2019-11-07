const endpoint = "/all";
fetch(endpoint)
    .then(response => response.json())
    .then(function(data) {
        console.log(data);

        displayKeys(data);

        let submitbtn = document.querySelector('.submit');
        submitbtn.addEventListener('click', addWord);
    })
    .catch(err => console.log(err));


function addWord(event) {
    let word = document.querySelector('#word').value;
    let score = document.querySelector('#score').value;
    console.log(word, score);

    fetch("add/" + word + "/" + score)
        .then(response => response.json())
        .then(function(data) {
            console.log(data);
        })
        .catch(err => console.log(err));
}


function changeColor(obj) {
    let score = Number(obj.id);
    if(score < -1)
        obj.className = 'red';
    else if(score >= -1 && score <= 1)
        obj.className = 'orange';
    else if(score > 1)
        obj.className = 'green';
}


function displayKeys(data) {
    let keys = Object.keys(data);
    let list = document.querySelector('.sentiment-analysis-words');

    for(let i = 0; i < keys.length; i++) {
        let word = keys[i];
        let score = data[word];

        let obj = document.createElement('div');
        obj.id = score;
        obj.innerText = word;

        changeColor(obj);
        list.appendChild(obj);
    }
}


$(function() {
  $('input').on('change', function() {
    var input = $(this);
    if (input.val().length) {
      input.addClass('populated');
    } else {
      input.removeClass('populated');
    }
  });

  setTimeout(function() {
    $('#word').trigger('focus');
  }, 500);
});
