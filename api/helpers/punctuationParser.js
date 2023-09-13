function punctuationParser(question) {
    let newQuestion = question.replaceAll(',', '');
    newQuestion = newQuestion.toLowerCase();
    newQuestion = newQuestion.replaceAll('.', '');
    newQuestion = newQuestion.replaceAll('!', '');
    newQuestion = newQuestion.replaceAll('?', '');
    newQuestion = newQuestion.replaceAll('"', '');
    newQuestion = newQuestion.replaceAll("'", '');
    newQuestion = newQuestion.replaceAll('_', '');
    newQuestion = newQuestion.replaceAll('-', '');
    newQuestion = newQuestion.replaceAll('(', '');
    newQuestion = newQuestion.replaceAll(')', '');
    newQuestion = newQuestion.replaceAll('}', '');
    newQuestion = newQuestion.replaceAll('{', '');

    return newQuestion;
}

module.exports = punctuationParser;