const endpoint = "/all";
fetch(endpoint)
    .then(response => response.json())
    .then(function(data) {
        console.log(data);

        displayKeys(data);

        let submitbtn = document.querySelector('.submit');
        submitbtn.addEventListener('click', addWord);
        let analyzebtn = document.querySelector('.analyze');
        analyzebtn.addEventListener('click', initAnalysis);
    })
    .catch(err => console.log(err));


function initAnalysis(event) {
    let textinput = document.querySelector('#text').value;

    let data = {
        text: textinput
    };

    fetch('/analyze/', {
            method: 'post',
            headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(function(response) {
            console.log(response);

            try {
                let res = document.querySelector(".result");   // Removing element in case it already exists
                res.parentNode.removeChild(res);
            }
            finally {
                let element = document.querySelector('div.form');
                let result = document.createElement('div');
                result.classList.add("result");
                result.innerHTML = `
                        <span><b>Score:</b> ${response.score}</span>
                        <span><b>Comparative:</b> ${Math.round(response.comparative*100)/100}</span>
                `;
                element.appendChild(result);
            }
        })
        .catch(err => console.log(err));
}


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
    let list = document.querySelector('.word-list');

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
  $('.input').on('change', function() {
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
