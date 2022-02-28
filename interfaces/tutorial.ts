interface ITutorial {
    group: string;
    title: string;
    order: number;
    tutorialCode: string;
    questionCodes: Array<string>;
}

export default ITutorial;