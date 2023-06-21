export enum ExperienceType {
    FullTime = 'full-time',
    PartTime = 'part-time',
    Internship = 'internship',
    Apprenticeship = 'apprenticeship',
    Volunteer = 'volunteer',
}

export interface Experience {
    type: ExperienceType;
    title: string;
    company: string;
    location: 'inherit' | 'remote' | string;
    dates: {
        start: {
            year: number;
            month: number;
            day?: number;
        };
        end?: {
            year: number;
            month: number;
            day?: number;
        };
    };
    relatedSkills?: string[];
}

const experiences: Experience[] = [
    {
        type: ExperienceType.Internship,
        title: 'web-developer',
        company: 'saqv',
        location: 'remote',
        dates: {
            start: {
                year: 2021,
                month: 5,
            },
            end: {
                year: 2021,
                month: 7,
            },
        },
        relatedSkills: [
            'wordpress',
            'php',
            'javascript',
            'css',
            'html',
            'mysql',
            'git',
            'bash',
            'vscode',
        ],
    },
    {
        type: ExperienceType.Apprenticeship,
        title: 'fullstack-developer',
        company: 'care-insight',
        location: 'inherit',
        dates: {
            start: {
                year: 2021,
                month: 9,
            },
            end: {
                year: 2023,
                month: 9,
            },
        },
        relatedSkills: [
            'nodejs',
            'typescript',
            'javascript',
            'figma',
            'docker',
            'bash',
            'git',
            'wordpress',
            'php',
            'css',
            'html',
            'mysql',
            'vscode',
        ],
    },
];

export default experiences;
