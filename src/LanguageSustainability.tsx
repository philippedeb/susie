export interface Item {
    name: string;
    score: number;
}

interface MyInterface {
    data: Record<string, Item>;
}

// TODO: Fill this
const obj: MyInterface = {
    data: {
        "C": { name: "C", score: 1}, 
        "Rust": { name: "Rust", score: 1.03},
        "C++": { name: "C++", score: 1.34}
    }
};