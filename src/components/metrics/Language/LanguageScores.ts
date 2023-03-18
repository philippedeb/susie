interface LanguageScores {
    data: Record<string, number>;
}

// https://greenlab.di.uminho.pt/wp-content/uploads/2017/10/sleFinal.pdf
export const LanguageScores: LanguageScores = {
    data: {
        "C": 1, 
        "Rust": 1.03,
        "C++": 1.34,
        "Ada": 1.70,
        "Java": 1.98,
        "Pascal": 2.14,
        "Chapel": 2.18, 
        "Lisp": 2.27,
        "Ocaml": 2.40,
        "Fortran": 2.52,
        "Swift": 2.79,
        "Haskell": 3.10,
        "C#": 3.14,
        "Go":3.23,
        "Dart":3.83,
        "F#": 4.13,
        "JavaScript":4.45,
        "Racket": 7.91,
        "TypeScript": 21.50,
        "Hack":24.02,
        "PHP": 29.30,
        "Erlang":42.23,
        "Lua":45.98,
        "Jruby":46.54,
        "Ruby":69.91, 
        "Python":75.88,
        "Perl":79.58
    }
};