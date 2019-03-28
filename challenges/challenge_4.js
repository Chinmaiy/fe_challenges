(function () {

    document.getElementById('add-question-btn').addEventListener('click', () => {
        document.getElementById('add-question-modal').style.display = 'block';
        initQuestionForm();
    });

    document.getElementById('play-game-btn').addEventListener('click', () => {
        document.getElementById('play-game-modal').style.display = 'block';
    })
    
    function initQuestionForm() {
        var questionInput = document.getElementById('question');
        questionInput.value = '';
        questionInput.classList.remove('error');

        var answersDiv = document.getElementById('answers-container');
        while(answersDiv.children.length > 2) {
            answersDiv.removeChild(answersDiv.lastChild);
        }
        [...answersDiv.children].forEach(elem => {
            elem.value = '';
            elem.classList.remove('error');
        });

        document.getElementById('error-messages').style.display = 'none';

        var select = document.getElementById('correct-answer');
        while(select.children.length > 2) {
            select.removeChild(select.lastChild);
        }
    }
    
    [...document.getElementsByClassName('modal-close-icon')].forEach(element => {
        var modalId = element.getAttribute('data-modal-id');
        var modal = document.getElementById(modalId);
        element.addEventListener('click', () => modal.style.display = 'none');
    });
    
    document.getElementById('add-answer-btn').addEventListener('click', () => {
        var answersDiv = document.getElementById('answers-container');
        var answersNr = answersDiv.children.length;
        var inputAnswer = document.createElement('input');
        inputAnswer.type = 'text';
        inputAnswer.className = 'input-answer';
        inputAnswer.id = `answer-${answersNr + 1}`;
        var text = `Answer ${answersNr + 1}`
        inputAnswer.placeholder = text;
        addInputEvents(inputAnswer);
        answersDiv.appendChild(inputAnswer);

        var option = document.createElement('option');
        option.value = answersNr;
        option.innerText = text;
        document.getElementById('correct-answer').appendChild(option);
    });

    [...document.getElementsByTagName('input')].forEach(element => addInputEvents(element));

    function addInputEvents(element) {
        element.addEventListener('focus', () => {
            element.classList.remove('error');
        })
        element.addEventListener('blur', () => {
            if(isEmpty(element.value)) {
                element.classList.add('error');
                document.getElementById('error-messages').style.display = 'block';
            }
            else {
                element.classList.remove('error');
                if(document.getElementsByClassName('error').length === 0) {
                    document.getElementById('error-messages').style.display = 'none';
                }
            }
        })
    }
    
    document.getElementById('save-question-btn').addEventListener('click', () => {
        var question = getQuestionFromUI();
        if(question.isValid()) {
            saveQuestion(question);
            initQuestionForm();
        }
        else {
            [...document.getElementsByTagName('input')].forEach(element => {
                if(isEmpty(element.value)) {
                    element.classList.add('error');
                    document.getElementById('error-messages').style.display = 'block';
                }
            })
        }
    });
    
    document.getElementById('')
    
    var Question = function (question, answers, correctIdx) {
        this.id = 0;
        this.question = question;
        this.answers = answers;
        this.correctIdx = correctIdx;
    }
    
    Question.prototype.setId = function (id) {
        this.id = id;
    }

    Question.prototype.isValid = function () {
        return !isEmpty(this.question) && 
            this.answers.map(answer => !isEmpty(answer))
                .reduce((acc, curr) => acc && curr, true);
    }
    
    function getQuestionFromUI() {
        var qText = document.getElementById('question').value;
        var answers = [...document.getElementsByClassName('input-answer')]
                        .map(elem => elem.value);

        var select = document.getElementById("correct-answer");
        var correctAnswerIdx = parseInt(select.options[select.selectedIndex].value);             
        return new Question(qText, answers, correctAnswerIdx);
    }
    
    function saveQuestion(question) {
        if(localStorage.questions) {
            var data = fetchStoredData();
            var newId = data.currentId + 1;
            question.setId(newId);
            data.currentId = newId;
            data.questions.push(question);
            localStorage.questions = JSON.stringify(data);
        } else {
            question.setId(1);
            localStorage.questions = JSON.stringify({
                currentId: 1,
                questions: [question]
            });
        }
    }
    
    function fetchStoredData() {
        return JSON.parse(localStorage.questions);
    }

    function isEmpty(str) {
        return typeof str !== 'undefined' && str.trim() === '';
    }
    
    function clear(elem) {
        while(elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }
    }    
})();
    