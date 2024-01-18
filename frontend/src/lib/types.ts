type TestCase = {
    input: string;
    output: string;
}

type TestCaseState = "success" | "failure" | "none";

type Language = "python" | "javascript" | "java" | "csharp" | "cpp";

type Challenge = {
    title: string;
    description: string;
    testCases: TestCase[];
    allowedLanguages?: Language[];
}