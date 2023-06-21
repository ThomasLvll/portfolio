import {
    sortByOrder as byOrder,
} from '../lib/Utils';

export type SkillTagShown = {
    slug: string;
    isHidden: boolean;
};

export type SkillTagList = {
    order: string[];
    filters: {
        [key: string]: string[];
    };
};

const skillTagLists: { [key: string]: SkillTagList } = {
    default: {
        order: [
            'development',
            'backend',
            'frontend',
            'framework',
            'cms',
            'programming-language',
            'interpreted-programming-language',
            'compiled-programming-language',
            'scripting-language',
            'shell',
            'database',
            'relational-database',
            'document-oriented-database',
            'key-value-database',
            'app',
            'desktop-app',
            'web-app',
            'ide',
            'containerization',
        ],
        filters: {
            'development': [
                'backend',
                'frontend',
                'framework',
                'cms',
                'programming-language',
                'shell',
                'database',
                'ide',
                'containerization',
            ],
            'programming-language': [
                'interpreted-programming-language',
                'compiled-programming-language',
                'scripting-language',
            ],
            'database': [
                'relational-database',
                'document-oriented-database',
                'key-value-database',
            ],
            'app': [
                'desktop-app',
                'web-app',
            ],
        },
    },
};

export type TagsShownFn = (skillTags: string[], ...rest: any[]) => SkillTagShown[];

const applySkillTagList: TagsShownFn = (skillTags, skillTagList: SkillTagList) => {
    // first, sort the tags by the order in the list
    // then, filter out parent tags that have at least one child tag in the list

    return skillTags
        .sort(byOrder(skillTagList.order))
        .map((tag, index, array) => {
            if (skillTagList.filters[tag] !== undefined) {
                const hasChildInList = skillTagList.filters[tag].some((childTag) => array.includes(childTag));

                return {
                    slug: tag,
                    isHidden: hasChildInList,
                };
            }

            return {
                slug: tag,
                isHidden: false,
            };
        })
        .sort(byOrder([ false, true, ], 'isHidden'));
};

const _ = {
    skillTagLists,
    applySkillTagList,
};

export default _;
