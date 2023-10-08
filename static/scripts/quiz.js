$(document).ready(function() {


    const questions = [
        {
            question: 'How often do solar eclipses occur on average?',
            answers: ['Every 6 months', 'Every year', 'Every 2 years', 'Every 18 months'],
            correctAnswer: 3,
        },        
        {
            question: 'What causes the Sun, Moon, and Earth to align?',
            answers: ['Gravitational forces', 'Magnetic fields', 'Planetary motion', 'Celestial magic'],
            correctAnswer: 0,
        },
        {
            question: 'What is a lunar eclipse?',
            answers: ['A rare astronomical event', 'When the Sun is blocked by the Moon', 'When the Earth is between the Sun and the Moon', 'When the Moon is between the Sun and the Earth'],
            correctAnswer: 2,
        },        
        {
            question: 'What is the term for the point during a total solar eclipse when the Sun\'s outer atmosphere is visible as a faint halo?',
            answers: ['Penumbra', 'Umbra', 'Corona', 'Solar flare'],
            correctAnswer: 2,
        },
        {
            question: 'What causes a lunar eclipse?',
            answers: ['When the Moon passes in front of the Sun', 'When the Earth\'s shadow falls on the Moon', 'When the Moon gets too close to the Sun', 'When the Moon turns dark due to its natural cycle'],
            correctAnswer: 1,
        },
        {
            question: 'During a total solar eclipse, what can you see?',
            answers: ['The entire Sun', 'The Moon\'s surface','The Sun\'s corona', 'Nothing, it\'s completely dark'],
            correctAnswer: 2,
        },
        {
            question: 'Why don\'t we have eclipses every month?',
            answers: ['Because eclipses are rare events', 'Because the Earth\'s orbit is tilted', 'Because the Sun\'s light is too bright', 'Because the Moon\'s orbit is tilted'],
            correctAnswer: 3,
        },
        {
            question: 'What is the difference between a penumbral and a partial lunar eclipse?',
            answers: ['A penumbral eclipse is when the Moon turns red, and a partial eclipse is when only part of the Moon is darkened.', 'A penumbral eclipse is when the Moon is partially in the Earth\'s shadow, and a partial eclipse is when part of the Moon is darkened.', 'They are the same thing.', 'A penumbral eclipse is when the Moon completely disappears, and a partial eclipse is when part of the Moon is darkened.'],
            correctAnswer: 1,
        },
        {
            question: 'How do scientists predict when eclipses will occur?',
            answers: ['They can\'t predict eclipses; they happen randomly.', 'They use complex mathematical models and data on the orbits of celestial bodies.', 'They rely on ancient texts and superstitions.', 'They watch the sky every night and hope to see an eclipse.'],
            correctAnswer: 1,
        },
        {
            question: 'What is an eclipse season?',
            answers: ['A time when eclipses are more likely to occur', 'A season on the Moon', 'A period of darkness during an eclipse', 'A rare event that happens every few decades'],
            correctAnswer: 0,
        },
        // Add more questions here
    ];

    const questionsContainer = document.querySelector('.questions');

    function createQuiz() {
        questions.forEach((q, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.innerHTML = `
            <p class="mb-3 h2">${index + 1}. ${q.question}</p>
            <div class="answers">
                ${q.answers
                    .map(
                        (answer, i) => `
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="q${index}" id="q${index}a${i}" value="${i}">
                                <label class="form-check-label" for="q${index}a${i}">
                                    ${answer}
                                </label>
                            </div>
                        `
                    )
                    .join('')}
            </div>
        `;

            questionsContainer.appendChild(questionElement);
        });
    }

    createQuiz();

    // Handle quiz submission and scoring here
    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', () => {
        let score = 0;

        // Loop through each question
        questions.forEach((q, index) => {
            const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
            if (selectedAnswer) {
                const userAnswerIndex = parseInt(selectedAnswer.value);
                if (userAnswerIndex === q.correctAnswer) {
                    score++;
                }
            }
        });
    // Display the score
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Your Score: ${score} out of ${questions.length}`;
    });
});