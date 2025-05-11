// 1. Define Question type with literal type for correctAnswer
type Question = {
    id: number;
    questionTuple: [string, string[]]; // Tuple for question and options
    correctAnswer: "A" | "B" | "C" | "D";
};

// 2. Store questions in an array
const questions: Question[] = [
    {
        id: 1,
        questionTuple: [
            "What is TypeScript?",
            ["A JavaScript framework", "A superset of JavaScript", "A database language", "A CSS preprocessor"]
        ],
        correctAnswer: "B"
    },
    {
        id: 2,
        questionTuple: [
            "Which of these is a tuple in TypeScript?",
            ["number[]", "[string, number]", "Array<string>", "any[]"]
        ],
        correctAnswer: "B"
    },
    {
        id: 3,
        questionTuple: [
            "What does 'never' represent in TypeScript?",
            ["A function that doesn't return", "A value that never occurs", "A deprecated feature", "An async function"]
        ],
        correctAnswer: "B"
    },
    {
        id: 4,
        questionTuple: [
            "What is the purpose of 'as' keyword in TypeScript?",
            ["To create a new variable", "For type assertion", "To import modules", "For asynchronous operations"]
        ],
        correctAnswer: "B"
    },
    {
        id: 5,
        questionTuple: [
            "Which TypeScript feature allows a function to accept any number of arguments?",
            ["Generics", "Rest parameters", "Function overloading", "Type aliases"]
        ],
        correctAnswer: "B"
    }
];

// Properly typed User interface
interface User {
    id: string;
    name: string;
    email?: string;
    score: number;
    answers: Array<{ questionId: number; correct: boolean }>;
}

// Initialize currentUser with proper type
let currentUser: User = {
    id: '',
    name: '',
    score: 0,
    answers: []
};

// 4. Function expression with callback for validation
const validateAnswer = function(
    questionId: number, 
    userAnswer: string, 
    callback: (isCorrect: boolean) => void
): void {
    const question = questions.find(q => q.id === questionId);
    if (!question) {
        callback(false);
        return;
    }
    
    // 5. Type assertion with 'as'
    const assertedAnswer = userAnswer.toUpperCase() as "A" | "B" | "C" | "D";
    const isCorrect = assertedAnswer === question.correctAnswer;
    
    currentUser.answers.push({ questionId, correct: isCorrect });
    if (isCorrect) {
        currentUser.score += 1;
    }
    
    callback(isCorrect);
};

// 6. askQuestion function with type safety
function askQuestion(qId: number, userAnswer: string): void {
    const question = questions.find(q => q.id === qId);
    if (!question) {
        console.log(`❌ Question with ID ${qId} not found!`);
        return;
    }

    const [questionText, options] = question.questionTuple;
    console.log(`\n📝 Question ${qId}: ${questionText}`);
    options.forEach((option, index) => {
        console.log(`   ${String.fromCharCode(65 + index)}. ${option}`);
    });

    validateAnswer(qId, userAnswer, (isCorrect) => {
        console.log(`   🎯 Your answer '${userAnswer.toUpperCase()}' is ${isCorrect ? '✅ CORRECT!' : '❌ INCORRECT!'}`);
    });
}

// 7. Score calculator function with proper error handling
function calculateScore(scores: number[]): number {
    const total = scores.reduce((sum, score) => sum + score, 0);
    
    if (total < 0) {
        throw new Error("Invalid score: Score cannot be negative");
    }
    
    return total;
}

// 8. Using rest parameters to answer multiple questions
function answerMultipleQuestions(...answers: [number, string][]): void {
    console.log("\n🔮 Answering multiple questions...");
    answers.forEach(([questionId, answer]) => {
        askQuestion(questionId, answer);
    });
}

// 9. Function overloading for submitQuiz
function submitQuiz(userId: string): void;
function submitQuiz(userId: string, email: string): void;
function submitQuiz(userId: string, email?: string): void {
    console.log(`\n📤 Quiz submitted by ${currentUser.name} (ID: ${userId})${email ? `, email: ${email}` : ''}`);
    console.log(`🏆 Final Score: ${currentUser.score}/${questions.length}`);
    
    console.log("📊 Detailed Results:");
    currentUser.answers.forEach((answer: { questionId: number; correct: boolean }) => {
        const question = questions.find(q => q.id === answer.questionId);
        const status = answer.correct ? '✅' : '❌';
        console.log(`   Q${answer.questionId}: ${status} - ${question?.questionTuple[0]}`);
    });
}

// Initialize quiz for user with proper typing
function startQuiz(userName: string, userId: string): void {
    currentUser = {
        id: userId,
        name: userName,
        score: 0,
        answers: []
    };
    console.log(`\n🎉 Welcome to the TypeScript Quiz, ${userName}!`);
    console.log(`🧠 You'll be tested on ${questions.length} TypeScript concepts.\n`);
}

// ===== MAIN QUIZ EXECUTION =====
console.log("=== 🌟 TYPESCRIPT QUIZ SYSTEM 🌟 ===");

// Start quiz for user
startQuiz("Sarthak", "user_001");

// Demonstrate single question answering
console.log("\n--- 🧐 Single Question Demonstration ---");
askQuestion(1, "B");

// Demonstrate multiple questions with rest parameters
answerMultipleQuestions(
    [1, "B"],
    [2, "B"],
    [3, "B"],
    [4, "B"],
    [5, "B"]
);

// Demonstrate score calculation
console.log("\n--- 📊 Score Calculation ---");
try {
    const scores = currentUser.answers.map(answer => answer.correct ? 1 : 0);
    const calculatedScore = calculateScore(scores);
    console.log(`Calculated score: ${calculatedScore}/${questions.length}`);
} catch (error) {
    console.error(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
}

// Demonstrate function overloading
submitQuiz("user_001");
submitQuiz("user_001", "sarthak@example.com");

console.log("\n=== 🏁 QUIZ COMPLETED ===");