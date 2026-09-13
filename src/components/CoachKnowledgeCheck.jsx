import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, ExternalLink, RotateCcw, XCircle } from 'lucide-react';

const QUESTION_BANKS = {
    c: [
        {
            question: 'What does the & operator produce when used with a variable in C?',
            options: ['The variable value', 'The variable address', 'The variable type', 'A new variable'],
            answer: 1,
            explanation: 'The address-of operator (&) returns the memory address of a variable.'
        },
        {
            question: 'Which memory area is commonly used for dynamically allocated data?',
            options: ['The heap', 'The instruction register', 'The preprocessor', 'The compiler'],
            answer: 0,
            explanation: 'malloc and related functions allocate storage from the heap.'
        },
        {
            question: 'For an int array, what is the usual relationship between arr[i] and pointer notation?',
            options: ['arr[i] == *(arr + i)', 'arr[i] == &(arr + i)', 'arr[i] == *arr + i', 'arr[i] == arr * i'],
            answer: 0,
            explanation: 'Array indexing is defined in terms of pointer arithmetic: arr[i] is *(arr + i).'
        },
        {
            question: 'Which traversal visits a binary search tree in sorted ascending order?',
            options: ['Preorder', 'Inorder', 'Postorder', 'Level order'],
            answer: 1,
            explanation: 'Inorder traversal visits the left subtree, root, then right subtree.'
        },
        {
            question: 'What is a likely result of dereferencing memory after it has been freed?',
            options: ['Automatic repair', 'A guaranteed zero', 'Undefined behavior', 'A compile-time warning only'],
            answer: 2,
            explanation: 'Reading freed storage is a use-after-free and has undefined behavior.'
        }
    ],
    physics: [
        {
            question: 'What happens when two identical waves meet with a phase difference of pi radians?',
            options: ['Their amplitude doubles', 'They completely cancel', 'Their wavelength doubles', 'Nothing changes'],
            answer: 1,
            explanation: 'A 180-degree phase difference produces destructive interference.'
        },
        {
            question: 'For constructive interference, the path difference is usually:',
            options: ['n lambda', '(n + 1/2) lambda', 'lambda / 4 only', 'Always zero'],
            answer: 0,
            explanation: 'Constructive interference occurs when the path difference is an integer multiple of the wavelength.'
        },
        {
            question: 'For a single slit, the first diffraction minimum satisfies:',
            options: ['a sin(theta) = lambda', 'a cos(theta) = 0', 'd sin(theta) = 2 lambda', 'a = theta lambda'],
            answer: 0,
            explanation: 'The minima condition is a sin(theta) = m lambda; the first minimum has m = 1.'
        },
        {
            question: 'If the wavelength increases while slit width stays fixed, the diffraction pattern generally:',
            options: ['Spreads more', 'Becomes narrower', 'Disappears', 'Changes into reflection'],
            answer: 0,
            explanation: 'A larger wavelength produces a larger diffraction angle and a wider pattern.'
        },
        {
            question: 'The Rayleigh criterion is used to describe:',
            options: ['The speed of light', 'The resolving ability of an optical instrument', 'The intensity unit', 'The lens focal length only'],
            answer: 1,
            explanation: 'The Rayleigh criterion defines when two nearby sources can just be distinguished.'
        }
    ]
};

const RESOURCES = {
    c: [
        { title: 'The C Programming Language', author: 'Kernighan & Ritchie', url: 'https://en.wikipedia.org/wiki/The_C_Programming_Language' },
        { title: 'Beej\'s Guide to C Programming', author: 'Free online guide', url: 'https://beej.us/guide/bgc/' },
        { title: 'C Programming: A Modern Approach', author: 'K. N. King', url: 'https://knking.com/books/c2/' }
    ],
    physics: [
        { title: 'Optics', author: 'Eugene Hecht', url: 'https://www.pearson.com/en-us/subject-catalog/p/optics/P200000003275' },
        { title: 'OpenStax University Physics: Optics', author: 'Free online textbook', url: 'https://openstax.org/details/books/university-physics-volume-3' },
        { title: 'MIT OpenCourseWare: Waves and Vibrations', author: 'Free online lectures', url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/' }
    ]
};

function getTopicGroup(topic = '') {
    return /wave|phase|diffraction|optics|rayleigh|resolving/i.test(topic) ? 'physics' : 'c';
}

export default function CoachKnowledgeCheck({ currentConcept, onPassed }) {
    const topic = currentConcept?.name || 'this topic';
    const group = getTopicGroup(topic);
    const questions = useMemo(() => QUESTION_BANKS[group], [group]);
    const [answers, setAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        setAnswers([]);
        setSubmitted(false);
    }, [currentConcept?.id]);

    const score = answers.reduce((total, answer, index) => (
        total + (answer === questions[index].answer ? 1 : 0)
    ), 0);
    const answeredCount = answers.filter(answer => answer !== undefined).length;
    const passed = score >= 3;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (answeredCount !== questions.length) return;
        setSubmitted(true);
    };

    const handleRetake = () => {
        setAnswers([]);
        setSubmitted(false);
    };

    return (
        <section className="card-elevated overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-dark-700/60 bg-gradient-to-r from-tutor-500/10 to-transparent">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-tutor-300 text-2xs font-mono uppercase tracking-wider">
                            <BookOpen className="w-3.5 h-3.5" />
                            Coach entry check
                        </div>
                        <h2 className="text-lg font-display font-bold text-white mt-2">How familiar are you with {topic}?</h2>
                        <p className="text-xs text-slate-400 mt-1">Answer 5 basic questions. A score of 3 unlocks the coach, and you can use it even if you score lower.</p>
                    </div>
                    <span className="text-2xs font-mono text-slate-500 shrink-0">{answeredCount}/5 answered</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
                {questions.map((item, index) => (
                    <fieldset key={item.question} className="space-y-2">
                        <legend className="text-xs font-semibold text-slate-200 leading-relaxed">
                            {index + 1}. {item.question}
                        </legend>
                        <div className="grid sm:grid-cols-2 gap-2">
                            {item.options.map((option, optionIndex) => {
                                const selected = answers[index] === optionIndex;
                                const correct = submitted && item.answer === optionIndex;
                                const incorrect = submitted && selected && !correct;
                                return (
                                    <label key={option} className={`flex items-start gap-2 p-2.5 rounded-lg border text-2xs cursor-pointer transition-colors ${correct ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200' :
                                            incorrect ? 'border-rose-500/50 bg-rose-500/10 text-rose-200' :
                                                selected ? 'border-tutor-500/50 bg-tutor-500/10 text-tutor-200' :
                                                    'border-dark-700/70 bg-dark-850/60 text-slate-400 hover:border-dark-500 hover:text-slate-200'
                                        }`}>
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            checked={selected}
                                            onChange={() => setAnswers(prev => {
                                                const next = [...prev];
                                                next[index] = optionIndex;
                                                return next;
                                            })}
                                            disabled={submitted}
                                            className="mt-0.5 accent-violet-500"
                                        />
                                        <span>{option}</span>
                                    </label>
                                );
                            })}
                        </div>
                        {submitted && <p className="text-2xs text-slate-500 pl-1">{item.explanation}</p>}
                    </fieldset>
                ))}

                {!submitted ? (
                    <button type="submit" disabled={answeredCount !== questions.length} className="btn-primary bg-gradient-to-r from-tutor-500 to-tutor-600 text-white disabled:opacity-40 disabled:cursor-not-allowed">
                        Check answers
                    </button>
                ) : (
                    <div className={`rounded-xl border p-4 ${passed ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-amber-500/30 bg-amber-500/10'}`}>
                        <div className="flex items-start gap-3">
                            {passed ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <XCircle className="w-5 h-5 text-amber-400 shrink-0" />}
                            <div className="flex-1">
                                <p className="text-sm font-bold text-white">{passed ? 'You passed the knowledge check.' : 'You can still use the AI Coach.'}</p>
                                <p className="text-xs text-slate-300 mt-1">You scored {score}/5. The correct answers and explanations are shown above.</p>
                                {!passed && (
                                    <div className="mt-3 space-y-2">
                                        <p className="text-2xs font-semibold uppercase tracking-wider text-amber-200">Recommended resources for {topic}</p>
                                        {RESOURCES[group].map(resource => (
                                            <a key={resource.title} href={resource.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-slate-200 hover:text-white">
                                                <ExternalLink className="w-3 h-3 text-amber-300 shrink-0" />
                                                <span>{resource.title} <span className="text-slate-500">({resource.author})</span></span>
                                            </a>
                                        ))}
                                    </div>
                                )}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    <button type="button" onClick={onPassed} className="btn-primary bg-tutor-600 text-white">Enter AI Coach</button>
                                    <button type="button" onClick={handleRetake} className="btn-ghost flex items-center gap-2"><RotateCcw className="w-3 h-3" />Retake</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </section>
    );
}