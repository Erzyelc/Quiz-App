/**
 * Example store structure
 */

 'use strict';

const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'The force can have a strong influence on the weak-minded',
      answers: [
        'StarWars: A New Hope',
        'Solo: A StarWars Story',
        'Starwars: Attack of the Clones',
        'Starwars: Revenge of the Sith'
      ],
      correctAnswer: 'StarWars: A New Hope'
    },
    {
      question: 'Always remember, your focus determines your reality',
      answers: [
        'StarWars: The Force Awakens',
        'StarWars: The Phantom Menace',
        'StarWars: The Empire Strikes Back',
        'StarWars: The Rise of Skywalker'
      ],
      correctAnswer: 'StarWars: The Phantom Menace'
    },
    {
      question: 'They fly now?',
      answers: [
        'StarWars: The Return of the Jedi',
        'Rogue One: A StarWars Story',
        'StarWars: The Rise of Skywalker',
        'Starwars: Attack of the Clones'
      ],
      correctAnswer: 'StarWars: The Rise of Skywalker'
    },
    {
      question: "I've been in this fight since I was six years old!",
      answers: [
        'StarWars: The Last Jedi',
        'Solo: A StarWars Story',
        'Rogue One: A StarWars Story',
        'Starwars: Revenge of the Sith'
      ],
      correctAnswer: 'Rogue One: A StarWars Story'
    },
    {
      question: "I dont't like the sand",
      answers: [
        'StarWars: The Empire Strikes Back',
        'Solo: A StarWars Story',
        'StarWars: Attack of the Clones',
        'Starwars: The Force Awakens'
      ],
      correctAnswer: 'StarWars: Attack of the Clones'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

function generateHtml(){
  return `
  <div class="start-screen">
    <p>This Quiz Will Assess Your Knowledge Of StarWars Movie Quotes</p>
    <button type="button" id="start">Start Quiz</button>
  </div>
`;
}

function generateQuestionScore() {
  return `
    <ul class="question-and-score">
      <li id="question-number">
        Question Number: ${store.currentQuestion + 1}/${store.questions.length}
      </li>
      <li id="score">
        Score: ${store.score}/${store.questions.length}
      </li>
    </ul>
  `;
}


function generateQuestion(){
  const answersArray = store.questions[store.currentQuestion].answers
  let answersHtml = '';
  let i = 0;

  answersArray.forEach(answer => {
    answersHtml += `
      <div id="option-container-${i}">
        <input type="radio" name="options" id="option${i + 1}" value= "${answer}" tabindex ="${i + 1}" required> 
        <label for="option${i + 1}"> ${answer}</label>
      </div>
    `;
    i++;
  });
  return answersHtml;
}

function generateAnswersHtml() {
  const answersArray = store.questions[store.currentQuestion].answers
  let answersHtml = '';
  let i = 0;

  answersArray.forEach(answer => {
    answersHtml += `
      <div id="option-container-${i}">
        <input type="radio" name="options" id="option${i + 1}" value= "${answer}" tabindex ="${i + 1}" required> 
        <label for="option${i + 1}"> ${answer}</label>
      </div>
    `;
    i++;
  });
  return answersHtml;
}

function generateQuestionHtml() {
  let currentQuestion = store.questions[store.currentQuestion];
  return `
    <form id="question-form" class="question-form">
      <fieldset>
        <div class="question">
          <legend> ${currentQuestion.question}</legend>
        </div>
        <div class="options">
          <div class="answers">
            ${generateAnswersHtml()}
          </div>
        </div>
        <button type="submit" id="submit-answer-btn" tabindex="5">Submit</button>
        <button type="button" id="next-question-btn" tabindex="6"> Next &gt;></button>
      </fieldset>
    </form >
  `;
}

function generateResultsScreen() {
  return `
    <div class="results">
      <form id="js-restart-quiz">
        <fieldset>
          <div class="row">
            <div class="col-12">
              <legend>Your Score is: ${store.score}/${store.questions.length}</legend>
            </div>
          </div>
        
          <div class="row">
            <div class="col-12">
              <button type="button" id="restart"> Restart Quiz </button>
            </div>
          </div>
        </fieldset>
    </form>
    </div>
  `;
}

/**
 * @param {string} answerStatus - 'correct' / 'incorrect'
 * @returns {string} - HTML providing the user with feedback 
 * regarding whether their answer was correct or incorrect.
 */
function generateFeedbackHTML(answerStatus) {
 let correctAnswer = store.questions[store.currentQuestion].correctAnswer;
 let html = '';
 if (answerStatus === 'correct') {
   html = `
   <div class="right-answer">That is correct!</div>
   `;
 }
 else if (answerStatus === 'incorrect') {
   html = `
     <div class="wrong-answer">That is incorrect. The correct answer is ${correctAnswer}.</div>
   `;
 }
 return html;
}



/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
function render() {
  let html = '';

  if (store.quizStarted === false) {
    $('main').html(generateHtml());
    return;
  }
  else if (store.currentQuestion >= 0 && store.currentQuestion < store.questions.length) {
    html = generateQuestionScore();
    html += generateQuestionHtml();
    $('main').html(html);
  }
  else {
    $('main').html(generateResultsScreen());
  }
}






/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
function handleStartClick() {
  $('main').on('click', '#start', function (event) {
    store.quizStarted = true;
    render();
  });
}

function handleNextQuestionClick() {
  $('body').on('click', '#next-question-btn', (event) => {
    render();
  });
}

function handleQuestionFormSubmission() {
  $('body').on('submit', '#question-form', function (event) {
    event.preventDefault();
    const currentQuestion = store.questions[store.currentQuestion];

    // get value from checkbox checked by user
    let selectedOption = $('input[name=options]:checked').val();
    /**
     * Creates an id '#option-container' + the index of 
     * the current question in the answers array.
     * 
     * Example: #option-container-0
     */
    let optionContainerId = `#option-container-${currentQuestion.answers.findIndex(i => i === selectedOption)}`;

    if (selectedOption === currentQuestion.correctAnswer) {
      store.score++;
      $(optionContainerId).append(generateFeedbackHTML('correct'));
    }
    else {
      $(optionContainerId).append(generateFeedbackHTML('incorrect'));
    }
    store.currentQuestion++;
    // hide the submit button
    $('#submit-answer-btn').hide();
    // disable all inputs
    $('input[type=radio]').each(() => {
      $('input[type=radio]').attr('disabled', true);
    });
    // show the next button
    $('#next-question-btn').show();

  });
}

function restartQuiz() {
  store.quizStarted = false;
  store.currentQuestion = 0;
  store.score = 0;
}

function handleRestartButtonClick() {
  $('body').on('click', '#restart', () => {
    restartQuiz();
    render();
  });
}







function handleQuiz(){
  render();
  handleStartClick();
  handleNextQuestionClick();
  handleQuestionFormSubmission();
  handleRestartButtonClick();
}

$(handleQuiz);