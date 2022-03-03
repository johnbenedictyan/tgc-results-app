interface ITutorial {
    _id?: string;
    group: string;
    title: string;
    order: number;
    tutorialCode: string;
    questionCodes: Array<string>;
}

export default ITutorial;