document.getElementById('proceed').addEventListener('click', function() {
    const subjects = parseInt(document.getElementById('subjects').value);
    if (isNaN(subjects) || subjects <= 0) {
        alert('Please enter a valid number of subjects.');
        return;
    }
    
    // Clear the page
    document.body.innerHTML = '';

    // Create input fields for credits and grades
    const container = document.createElement('div');
    container.className = 'container';
    
    const heading = document.createElement('h2');
    heading.innerText = 'Enter the credits and grades for each subject';
    container.appendChild(heading);
    
    for (let i = 1; i <= subjects; i++) {
        const subjectContainer = document.createElement('div');
        subjectContainer.className = 'subject-container';
        
        const creditLabel = document.createElement('label');
        creditLabel.innerText = `Credits for subject ${i}: `;
        const creditInput = document.createElement('input');
        creditInput.type = 'number';
        creditInput.id = `credit-${i}`;
        creditInput.placeholder = 'e.g., 3';
        subjectContainer.appendChild(creditLabel);
        subjectContainer.appendChild(creditInput);
        
        const gradeLabel = document.createElement('label');
        gradeLabel.innerText = ` Grade for subject ${i}: `;
        const gradeInput = document.createElement('input');
        gradeInput.type = 'text';
        gradeInput.id = `grade-${i}`;
        gradeInput.placeholder = 'e.g., O';
        subjectContainer.appendChild(gradeLabel);
        subjectContainer.appendChild(gradeInput);
        
        container.appendChild(subjectContainer);
    }
    
    // Create Calculate and Clear buttons
    const calculateBtn = document.createElement('button');
    calculateBtn.innerText = 'Calculate GPA';
    calculateBtn.addEventListener('click', calculateGPA);
    container.appendChild(calculateBtn);
    
    const clearBtn = document.createElement('button');
    clearBtn.innerText = 'Clear';
    clearBtn.addEventListener('click', () => location.reload());
    container.appendChild(clearBtn);
    
    document.body.appendChild(container);
});

function calculateGPA() {
    let totalCredits = 0;
    let totalPoints = 0;
    const subjects = document.querySelectorAll('.subject-container');

    subjects.forEach((subject, index) => {
        const credit = parseFloat(document.getElementById(`credit-${index + 1}`).value);
        const grade = document.getElementById(`grade-${index + 1}`).value.toUpperCase();

        if (isNaN(credit) || credit <= 0 || !grade) {
            alert('Please enter valid credit and grade values.');
            return;
        }

        const gradePoints = getGradePoints(grade);
        totalCredits += credit;
        totalPoints += credit * gradePoints;
    });

    const gpa = totalPoints / totalCredits;
    showResult(gpa.toFixed(2));
}

function getGradePoints(grade) {
    switch (grade) {
        case 'O': return 10.0;
        case 'A+': return 9.0;
        case 'A': return 8.0;
        case 'B+': return 7.0;
        case 'B': return 6.0;
        case 'C': return 5.0;
        case 'F': return 0.0;
        default: alert('Invalid grade entered.'); return 0;
    }
}

function showResult(gpa) {
    document.body.innerHTML = ''; // Clear the page
    
    const container = document.createElement('div');
    container.className = 'container';

    const resultHeading = document.createElement('h2');
    resultHeading.innerText = `Your GPA is: ${gpa}`;
    container.appendChild(resultHeading);

    const congratsMessage = document.createElement('p');
    congratsMessage.innerText = 'Congratulations!';
    congratsMessage.style.fontSize = '24px';
    congratsMessage.style.color = 'green';
    container.appendChild(congratsMessage);

    const tickIcon = document.createElement('div');
    tickIcon.innerHTML = '✔️';
    tickIcon.style.fontSize = '48px';
    tickIcon.style.color = 'green';
    container.appendChild(tickIcon);

    const keepGrowingMessage = document.createElement('p');
    keepGrowingMessage.innerText = 'Keep growing!';
    keepGrowingMessage.style.fontSize = '20px';
    keepGrowingMessage.style.marginTop = '10px';
    container.appendChild(keepGrowingMessage);

    document.body.appendChild(container);
}
