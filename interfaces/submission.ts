interface ISubmission {
    _id?: string;
    questionCode: string;
    batchCode: string;
    tutorialCode: string;
    result: string;
    dateTime: string;
    email: string;
}

export default ISubmission;
