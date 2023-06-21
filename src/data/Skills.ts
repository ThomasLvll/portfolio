export interface SkillWebsite {
    url: string;
    tags?: string[];
}

export interface Skill {
    slug: string;
    versions?: string[];
    tags: string[];
    relatedSkills?: string[];
    scores?: {
        estimatedLevel?: number;
        highlight?: number;
    };
    resources: {
        icon?: {
            url: string;
            mainColor?: string;
        };
        websites?: SkillWebsite[];
    };
}

const skills: Skill[] = [
    {
        slug: 'nodejs',
        versions: [ '20', '19', '18', '17', '16' ],
        tags: [
            'development',
            'framework',
            'web',
            'backend',
        ],
        relatedSkills: [
            'javascript',
            'typescript',
        ],
        scores: {
            estimatedLevel: 0.8,
            highlight: 0.9,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/nodedotjs.svg',
                mainColor: '#339933',
            },
            websites: [
                {
                    url: 'https://nodejs.org/',
                    tags: [
                        'official',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'react',
        versions: [ '18', ],
        tags: [
            'development',
            'framework',
            'web',
            'frontend',
        ],
        relatedSkills: [
            'javascript',
            'typescript',
        ],
        scores: {
            estimatedLevel: 0.6,
            highlight: 0.85,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/react.svg',
                mainColor: '#61DAFB',
            },
            websites: [
                {
                    url: 'https://react.dev/',
                    tags: [
                        'official',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'typescript',
        versions: [ '5', '4', ],
        tags: [
            'development',
            'programming-language',
            'web',
            'frontend',
            'backend',
            'compiled-programming-language',
        ],
        relatedSkills: [
            'javascript',
        ],
        scores: {
            estimatedLevel: 0.8,
            highlight: 0.8,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/typescript.svg',
                mainColor: '#3178C6',
            },
            websites: [
                {
                    url: 'https://www.typescriptlang.org/',
                    tags: [
                        'official',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'javascript',
        versions: [ 'ES2022', 'ES2021', 'ES2020', 'ES6', 'ES5', ],
        tags: [
            'development',
            'programming-language',
            'web',
            'frontend',
            'backend',
            'interpreted-programming-language',
        ],
        scores: {
            estimatedLevel: 0.9,
            highlight: 0,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/javascript.svg',
                mainColor: '#F7DF1E',
            },
            websites: [
                {
                    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
                    tags: [
                        'community',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'python',
        versions: [ '3', '2', ],
        tags: [
            'development',
            'programming-language',
            'web',
            'backend',
            'interpreted-programming-language',
        ],
        scores: {
            estimatedLevel: 0.7,
            highlight: 0.6,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/python.svg',
                mainColor: '#3776AB',
            },
            websites: [
                {
                    url: 'https://www.python.org/',
                    tags: [
                        'official',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'django',
        versions: [ '4.0', ],
        tags: [ 'development', 'framework', 'web', 'backend', ],
        relatedSkills: [ 'python', ],
        scores: {
            estimatedLevel: 0.4,
            highlight: 0.65,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/django.svg',
                mainColor: '#092E20',
            },
            websites: [
                {
                    url: 'https://www.djangoproject.com/',
                    tags: [ 'official', 'documentation', ],
                },
            ],
        },
    },
    {
        slug: 'php',
        versions: [ '8', '7', '5', ],
        tags: [
            'development',
            'programming-language',
            'web',
            'backend',
            'interpreted-programming-language',
        ],
        scores: {
            estimatedLevel: 0.7,
            highlight: 0.5,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/php.svg',
                mainColor: '#777BB4',
            },
            websites: [
                {
                    url: 'https://www.php.net/',
                    tags: [
                        'official',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'wordpress',
        versions: [ '5', ],
        tags: [
            'development',
            'web',
            'cms',
        ],
        relatedSkills: [
            'php',
            'mysql',
        ],
        scores: {
            estimatedLevel: 0.8,
            highlight: 0.2,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/wordpress.svg',
                mainColor: '#21759B',
            },
            websites: [
                {
                    url: 'https://wordpress.org/',
                    tags: [
                        'official',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'symfony',
        versions: [ '6', '5', ],
        tags: [
            'development',
            'framework',
            'web',
            'backend',
        ],
        relatedSkills: [
            'php',
        ],
        scores: {
            estimatedLevel: 0.5,
            highlight: 0.55,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/symfony.svg',
                mainColor: '#000000',
            },
            websites: [
                {
                    url: 'https://symfony.com/',
                    tags: [
                        'official',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'html',
        versions: [ '5', ],
        tags: [
            'development',
            'markup-language',
            'web',
            'frontend',
        ],
        scores: {
            estimatedLevel: 0.9,
            highlight: 0,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/html5.svg',
                mainColor: '#E34F26',
            },
            websites: [
                {
                    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
                    tags: [
                        'community',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'css',
        versions: [ '3', ],
        tags: [
            'development',
            'markup-language',
            'web',
            'frontend',
        ],
        scores: {
            estimatedLevel: 0.8,
            highlight: 0,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/css3.svg',
                mainColor: '#1572B6',
            },
            websites: [
                {
                    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
                    tags: [
                        'community',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'sass',
        versions: [ '1', ],
        tags: [
            'development',
            'markup-language',
            'web',
            'frontend',
        ],
        relatedSkills: [
            'css',
        ],
        scores: {
            estimatedLevel: 0.8,
            highlight: 0.75,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/sass.svg',
                mainColor: '#CC6699',
            },
            websites: [
                {
                    url: 'https://sass-lang.com/',
                    tags: [
                        'official',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'lua',
        versions: [ '5.4', '5.3', '5.2', '5.1', ],
        tags: [
            'development',
            'programming-language',
            'interpreted-programming-language',
        ],
        scores: {
            estimatedLevel: 0.6,
            highlight: 0.3,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/lua.svg',
                mainColor: '#2C2D72',
            },
            websites: [
                {
                    url: 'https://www.lua.org/',
                    tags: [
                        'official',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'c',
        tags: [
            'development',
            'programming-language',
            'compiled-programming-language',
        ],
        scores: {
            estimatedLevel: 0.6,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/c.svg',
                mainColor: '#A8B9CC',
            },
            websites: [
                {
                    url: 'https://en.wikipedia.org/wiki/C_(programming_language)',
                    tags: [
                        'community',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'mysql',
        tags: [
            'development',
            'database',
            'relational-database',
        ],
        scores: {
            estimatedLevel: 0.7,
            highlight: 0.5,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/mysql.svg',
                mainColor: '#4479A1',
            },
            websites: [
                {
                    url: 'https://www.mysql.com/',
                    tags: [
                        'official',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'mongodb',
        tags: [
            'development',
            'database',
            'document-oriented-database',
        ],
        scores: {
            estimatedLevel: 0.6,
            highlight: 0.7,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/mongodb.svg',
                mainColor: '#47A248',
            },
            websites: [
                {
                    url: 'https://www.mongodb.com/',
                    tags: [
                        'official',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'redis',
        tags: [
            'development',
            'database',
            'key-value-database',
        ],
        scores: {
            estimatedLevel: 0.5,
            highlight: 0.6,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/redis.svg',
                mainColor: '#DC382D',
            },
            websites: [
                {
                    url: 'https://redis.io/',
                    tags: [
                        'official',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'git',
        tags: [
            'development',
            'version-control',
        ],
        scores: {
            estimatedLevel: 0.7,
            highlight: 0.5,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/git.svg',
                mainColor: '#F05032',
            },
            websites: [
                {
                    url: 'https://git-scm.com/',
                    tags: [
                        'official',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'docker',
        tags: [
            'development',
            'containerization',
        ],
        scores: {
            estimatedLevel: 0.8,
            highlight: 0.7,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/docker.svg',
                mainColor: '#2496ED',
            },
            websites: [
                {
                    url: 'https://www.docker.com/',
                    tags: [
                        'official',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'swift',
        versions: [ '5', ],
        tags: [
            'development',
            'programming-language',
            'compiled-programming-language',
        ],
        scores: {
            estimatedLevel: 0.4,
            highlight: 0.4,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/swift.svg',
                mainColor: '#FA7343',
            },
            websites: [
                {
                    url: 'https://swift.org/',
                    tags: [
                        'official',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'graphql',
        tags: [
            'development',
            'query-language',
            'api-call',
            'communication-protocol',
        ],
        scores: {
            estimatedLevel: 0.4,
            highlight: 0.5,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/graphql.svg',
                mainColor: '#E10098',
            },
            websites: [
                {
                    url: 'https://graphql.org/',
                    tags: [
                        'official',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'websocket',
        tags: [
            'development',
            'protocol',
            'communication-protocol',
        ],
        scores: {
            estimatedLevel: 0.5,
            highlight: 0.6,
        },
        resources: {
            icon: {
                url: 'https://www.svgrepo.com/show/354553/websocket.svg',
            },
            websites: [
                {
                    url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API',
                    tags: [
                        'community',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'postman',
        tags: [
            'development',
            'api-call',
            'app',
            'desktop-app',
            'web-app',
        ],
        scores: {
            estimatedLevel: 0.6,
            highlight: 0.5,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/postman.svg',
                mainColor: '#FF6C37',
            },
            websites: [
                {
                    url: 'https://www.postman.com/',
                    tags: [
                        'official',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'vscode',
        tags: [
            'development',
            'ide',
            'app',
            'desktop-app',
            'web-app',
        ],
        scores: {
            estimatedLevel: 0.8,
            highlight: 0.7,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/visualstudiocode.svg',
                mainColor: '#007ACC',
            },
            websites: [
                {
                    url: 'https://code.visualstudio.com/',
                    tags: [
                        'official',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'xcode',
        tags: [
            'development',
            'ide',
            'app',
            'desktop-app',
        ],
        scores: {
            estimatedLevel: 0.5,
            highlight: 0.5,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/xcode.svg',
                mainColor: '#1575F9',
            },
            websites: [
                {
                    url: 'https://developer.apple.com/xcode/',
                    tags: [
                        'official',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'lxc',
        tags: [
            'development',
            'containerization',
        ],
        scores: {
            estimatedLevel: 0.5,
            highlight: 0.5,
        },
        resources: {
            icon: {
                url: 'https://linuxcontainers.org/static/img/containers.svg',
            },
            websites: [
                {
                    url: 'https://linuxcontainers.org/',
                    tags: [
                        'official',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'figma',
        tags: [
            'design',
            'ux-ui',
            'app',
            'desktop-app',
            'web-app',
        ],
        scores: {
            estimatedLevel: 0.8,
            highlight: 0.7,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/figma.svg',
                mainColor: '#F24E1E',
            },
            websites: [
                {
                    url: 'https://www.figma.com/',
                    tags: [
                        'official',
                        'documentation',
                    ],
                },
            ],
        },
    },
    {
        slug: 'bash',
        tags: [
            'development',
            'programming-language',
            'scripting-language',
            'shell',
        ],
        relatedSkills: [
            'linux',
            'macos',
        ],
        scores: {
            estimatedLevel: 0.6,
            highlight: 0.6,
        },
        resources: {
            icon: {
                url: 'https://simpleicons.org/icons/gnubash.svg',
                mainColor: '#4EAA25',
            },
            websites: [
                {
                    url: 'https://www.gnu.org/software/bash/',
                    tags: [
                        'official',
                        'documentation',
                    ],
                },
            ],
        },
    },
];

export default skills;
