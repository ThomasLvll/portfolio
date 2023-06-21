const DEFAULT_LANG = 'en-US';

type LocaleFunction = (...args: any[]) => string;

interface Locale {
    [key: string]: {
        [lang: string]: LocaleFunction;
    };
}

const generalLocales: Locale = {
    'showMore': {
        'en-US': (args: {}) => 'Show more',
        'fr-FR': (args: {}) => 'Afficher plus',
    },
    'showMore.short': {
        'en-US': (args: {}) => '+',
        'fr-FR': (args: {}) => '+',
    },
    'showMore.withCount': {
        'en-US': (args: { count: number, }) => `Show ${args.count} more`,
        'fr-FR': (args: { count: number, }) => `Afficher ${args.count} de plus`,
    },
    'showMore.withCount.short': {
        'en-US': (args: { count: number, }) => `+${args.count}`,
        'fr-FR': (args: { count: number, }) => `+${args.count}`,
    },
    'showMore.withNoun': {
        'en-US': (args: { pluralNoun: string, prefix: string, }) => `Show more ${args.pluralNoun}`,
        'fr-FR': (args: { pluralNoun: string, prefix: string, }) => `Afficher plus ${args.prefix}${args.pluralNoun}`,
    },
    'showMore.withNoun.short': {
        'en-US': (args: { pluralNoun: string, prefix: string, }) => `+ ${args.pluralNoun}`,
        'fr-FR': (args: { pluralNoun: string, prefix: string, }) => `+ ${args.prefix}${args.pluralNoun}`,
    },
    'showMore.withCount.withNoun': {
        'en-US': (args: { count: number, singularNoun: string, pluralNoun: string, }) => `Show ${args.count} more ${args.count > 1 ? args.pluralNoun : args.singularNoun}`,
        'fr-FR': (args: { count: number, singularNoun: string, pluralNoun: string, }) => `Afficher ${args.count} ${args.count > 1 ? args.pluralNoun : args.singularNoun} de plus`,
    },
    'showMore.withCount.withNoun.short': {
        'en-US': (args: { count: number, singularNoun: string, pluralNoun: string, }) => `+${args.count} ${args.count > 1 ? args.pluralNoun : args.singularNoun}`,
        'fr-FR': (args: { count: number, singularNoun: string, pluralNoun: string, }) => `+${args.count} ${args.count > 1 ? args.pluralNoun : args.singularNoun}`,
    },
    'showLess': {
        'en-US': (args: {}) => 'Show less',
        'fr-FR': (args: {}) => 'Afficher moins',
    },
    'showLess.short': {
        'en-US': (args: {}) => '-',
        'fr-FR': (args: {}) => '-',
    },
    'showLess.withCount': {
        'en-US': (args: { count: number, }) => `Show ${args.count} less`,
        'fr-FR': (args: { count: number, }) => `Afficher ${args.count} de moins`,
    },
    'showLess.withCount.short': {
        'en-US': (args: { count: number, }) => `-${args.count}`,
        'fr-FR': (args: { count: number, }) => `-${args.count}`,
    },
    'showLess.withNoun': {
        'en-US': (args: { pluralNoun: string, prefix: string, }) => `Show less ${args.pluralNoun}`,
        'fr-FR': (args: { pluralNoun: string, prefix: string, }) => `Afficher moins ${args.prefix}${args.pluralNoun}`,
    },
    'showLess.withNoun.short': {
        'en-US': (args: { pluralNoun: string, prefix: string, }) => `- ${args.pluralNoun}`,
        'fr-FR': (args: { pluralNoun: string, prefix: string, }) => `- ${args.prefix}${args.pluralNoun}`,
    },
    'showLess.withCount.withNoun': {
        'en-US': (args: { count: number, singularNoun: string, pluralNoun: string, }) => `Show ${args.count} less ${args.count > 1 ? args.pluralNoun : args.singularNoun}`,
        'fr-FR': (args: { count: number, singularNoun: string, pluralNoun: string, }) => `Afficher ${args.count} ${args.count > 1 ? args.pluralNoun : args.singularNoun} de moins`,
    },
    'showLess.withCount.withNoun.short': {
        'en-US': (args: { count: number, singularNoun: string, pluralNoun: string, }) => `-${args.count} ${args.count > 1 ? args.pluralNoun : args.singularNoun}`,
        'fr-FR': (args: { count: number, singularNoun: string, pluralNoun: string, }) => `-${args.count} ${args.count > 1 ? args.pluralNoun : args.singularNoun}`,
    },
    'hide': {
        'en-US': (args: {}) => 'Hide',
        'fr-FR': (args: {}) => 'Masquer',
    },
    'hide.short': {
        'en-US': (args: {}) => 'Hide',
        'fr-FR': (args: {}) => 'Masquer',
    },
    'hide.withCount': {
        'en-US': (args: { count: number, }) => `Hide ${args.count}`,
        'fr-FR': (args: { count: number, }) => `Masquer ${args.count}`,
    },
    'hide.withCount.short': {
        'en-US': (args: { count: number, }) => `Hide ${args.count}`,
        'fr-FR': (args: { count: number, }) => `Masquer ${args.count}`,
    },
    'hide.withNoun': {
        'en-US': (args: { pluralNoun: string, prefix: string, }) => `Hide ${args.pluralNoun}`,
        'fr-FR': (args: { pluralNoun: string, prefix: string, }) => `Masquer ${args.prefix}${args.pluralNoun}`,
    },
    'hide.withNoun.short': {
        'en-US': (args: { pluralNoun: string, }) => `Hide ${args.pluralNoun}`,
        'fr-FR': (args: { pluralNoun: string, }) => `Masquer ${args.pluralNoun}`,
    },
    'hide.withCount.withNoun': {
        'en-US': (args: { count: number, singularNoun: string, pluralNoun: string, }) => `Hide ${args.count} ${args.count > 1 ? args.pluralNoun : args.singularNoun}`,
        'fr-FR': (args: { count: number, singularNoun: string, pluralNoun: string, }) => `Masquer ${args.count} ${args.count > 1 ? args.pluralNoun : args.singularNoun}`,
    },
    'hide.withCount.withNoun.short': {
        'en-US': (args: { count: number, singularNoun: string, pluralNoun: string, }) => `Hide ${args.count} ${args.count > 1 ? args.pluralNoun : args.singularNoun}`,
        'fr-FR': (args: { count: number, singularNoun: string, pluralNoun: string, }) => `Masquer ${args.count} ${args.count > 1 ? args.pluralNoun : args.singularNoun}`,
    },
    'icon.withNoun': {
        'en-US': (args: { noun: string, prefix: string, }) => `${args.noun} icon`,
        'fr-FR': (args: { noun: string, prefix: string, }) => `Icône ${args.prefix}${args.noun}`,
    },
    'level.none': {
        'en-US': (args: {}) => 'No level',
        'fr-FR': (args: {}) => 'Aucun niveau',
    },
    'level.beginner': {
        'en-US': (args: {}) => 'Beginner',
        'fr-FR': (args: {}) => 'Débutant',
    },
    'level.intermediate': {
        'en-US': (args: {}) => 'Intermediate',
        'fr-FR': (args: {}) => 'Intermédiaire',
    },
    'level.advanced': {
        'en-US': (args: {}) => 'Advanced',
        'fr-FR': (args: {}) => 'Avancé',
    },
    'level.expert': {
        'en-US': (args: {}) => 'Expert',
        'fr-FR': (args: {}) => 'Expert',
    },
};

const tagLocales: Locale = {
    'tag.noun': {
        'en-US': (args: {}) => 'tag',
        'fr-FR': (args: {}) => 'étiquette',
    },
    'tag.noun.plural': {
        'en-US': (args: {}) => 'tags',
        'fr-FR': (args: {}) => 'étiquettes',
    },
    'tag.title': {
        'en-US': (args: {}) => 'Tag',
        'fr-FR': (args: {}) => 'Étiquette',
    },
    'tag.title.plural': {
        'en-US': (args: {}) => 'Tags',
        'fr-FR': (args: {}) => 'Étiquettes',
    },
};

const skillTagLocales: Locale = {
    'skillTag.development.title.short': {
        'en-US': (args: {}) => 'Dev.',
        'fr-FR': (args: {}) => 'Dév.',
    },
    'skillTag.development.title': {
        'en-US': (args: {}) => 'Development',
        'fr-FR': (args: {}) => 'Développement',
    },
    'skillTag.development.noun': {
        'en-US': (args: {}) => 'development skill',
        'fr-FR': (args: {}) => 'compétence de développement',
    },
    'skillTag.development.noun.plural': {
        'en-US': (args: {}) => 'development skills',
        'fr-FR': (args: {}) => 'compétences de développement',
    },
    'skillTag.programming-language.title.short': {
        'en-US': (args: {}) => 'Prog. lang.',
        'fr-FR': (args: {}) => 'Lang. de prog.',
    },
    'skillTag.programming-language.title': {
        'en-US': (args: {}) => 'Programming language',
        'fr-FR': (args: {}) => 'Langage de programmation',
    },
    'skillTag.programming-language.noun': {
        'en-US': (args: {}) => 'programming language',
        'fr-FR': (args: {}) => 'langage de programmation',
    },
    'skillTag.programming-language.noun.plural': {
        'en-US': (args: {}) => 'programming languages',
        'fr-FR': (args: {}) => 'langages de programmation',
    },
    'skillTag.interpreted-programming-language.title.short': {
        'en-US': (args: {}) => 'Interpreted lang.',
        'fr-FR': (args: {}) => 'Lang. interprété',
    },
    'skillTag.interpreted-programming-language.title': {
        'en-US': (args: {}) => 'Interpreted programming language',
        'fr-FR': (args: {}) => 'Langage de programmation interprété',
    },
    'skillTag.interpreted-programming-language.noun': {
        'en-US': (args: {}) => 'interpreted programming language',
        'fr-FR': (args: {}) => 'langage de programmation interprété',
    },
    'skillTag.interpreted-programming-language.noun.plural': {
        'en-US': (args: {}) => 'interpreted programming languages',
        'fr-FR': (args: {}) => 'langages de programmation interprétés',
    },
    'skillTag.compiled-programming-language.title.short': {
        'en-US': (args: {}) => 'Compiled lang.',
        'fr-FR': (args: {}) => 'Lang. compilé',
    },
    'skillTag.compiled-programming-language.title': {
        'en-US': (args: {}) => 'Compiled programming language',
        'fr-FR': (args: {}) => 'Langage de programmation compilé',
    },
    'skillTag.compiled-programming-language.noun': {
        'en-US': (args: {}) => 'compiled programming language',
        'fr-FR': (args: {}) => 'langage de programmation compilé',
    },
    'skillTag.compiled-programming-language.noun.plural': {
        'en-US': (args: {}) => 'compiled programming languages',
        'fr-FR': (args: {}) => 'langages de programmation compilés',
    },
    'skillTag.markup-language.title.short': {
        'en-US': (args: {}) => 'Markup lang.',
        'fr-FR': (args: {}) => 'Lang. de balisage',
    },
    'skillTag.markup-language.title': {
        'en-US': (args: {}) => 'Markup language',
        'fr-FR': (args: {}) => 'Langage de balisage',
    },
    'skillTag.markup-language.noun': {
        'en-US': (args: {}) => 'markup language',
        'fr-FR': (args: {}) => 'langage de balisage',
    },
    'skillTag.markup-language.noun.plural': {
        'en-US': (args: {}) => 'markup languages',
        'fr-FR': (args: {}) => 'langages de balisage',
    },
    'skillTag.framework.title.short': {
        'en-US': (args: {}) => 'Framework',
        'fr-FR': (args: {}) => 'Framework',
    },
    'skillTag.framework.title': {
        'en-US': (args: {}) => 'Framework',
        'fr-FR': (args: {}) => 'Framework',
    },
    'skillTag.framework.noun': {
        'en-US': (args: {}) => 'framework',
        'fr-FR': (args: {}) => 'framework',
    },
    'skillTag.framework.noun.plural': {
        'en-US': (args: {}) => 'frameworks',
        'fr-FR': (args: {}) => 'frameworks',
    },
    'skillTag.cms.title.short': {
        'en-US': (args: {}) => 'CMS',
        'fr-FR': (args: {}) => 'CMS',
    },
    'skillTag.cms.title': {
        'en-US': (args: {}) => 'Content management system',
        'fr-FR': (args: {}) => 'Système de gestion de contenu',
    },
    'skillTag.cms.noun': {
        'en-US': (args: {}) => 'content management system',
        'fr-FR': (args: {}) => 'système de gestion de contenu',
    },
    'skillTag.cms.noun.plural': {
        'en-US': (args: {}) => 'content management systems',
        'fr-FR': (args: {}) => 'systèmes de gestion de contenu',
    },
    'skillTag.backend.title.short': {
        'en-US': (args: {}) => 'Backend',
        'fr-FR': (args: {}) => 'Backend',
    },
    'skillTag.backend.title': {
        'en-US': (args: {}) => 'Backend development',
        'fr-FR': (args: {}) => 'Développement backend',
    },
    'skillTag.backend.noun': {
        'en-US': (args: {}) => 'backend development technology',
        'fr-FR': (args: {}) => 'technologie backend',
    },
    'skillTag.backend.noun.plural': {
        'en-US': (args: {}) => 'backend development technologies',
        'fr-FR': (args: {}) => 'technologies backend',
    },
    'skillTag.frontend.title.short': {
        'en-US': (args: {}) => 'Frontend',
        'fr-FR': (args: {}) => 'Frontend',
    },
    'skillTag.frontend.title': {
        'en-US': (args: {}) => 'Frontend development',
        'fr-FR': (args: {}) => 'Développement frontend',
    },
    'skillTag.frontend.noun': {
        'en-US': (args: {}) => 'frontend development technology',
        'fr-FR': (args: {}) => 'technologie frontend',
    },
    'skillTag.frontend.noun.plural': {
        'en-US': (args: {}) => 'frontend development technologies',
        'fr-FR': (args: {}) => 'technologies frontend',
    },
    'skillTag.web.title.short': {
        'en-US': (args: {}) => 'Web',
        'fr-FR': (args: {}) => 'Web',
    },
    'skillTag.web.title': {
        'en-US': (args: {}) => 'Web',
        'fr-FR': (args: {}) => 'Web',
    },
    'skillTag.web.noun': {
        'en-US': (args: {}) => 'web technology',
        'fr-FR': (args: {}) => 'technologie web',
    },
    'skillTag.web.noun.plural': {
        'en-US': (args: {}) => 'web technologies',
        'fr-FR': (args: {}) => 'technologies web',
    },
    'skillTag.database.title.short': {
        'en-US': (args: {}) => 'DB',
        'fr-FR': (args: {}) => 'BDD',
    },
    'skillTag.database.title': {
        'en-US': (args: {}) => 'Database',
        'fr-FR': (args: {}) => 'Base de données',
    },
    'skillTag.database.noun': {
        'en-US': (args: {}) => 'database technology',
        'fr-FR': (args: {}) => 'technologie de base de données',
    },
    'skillTag.database.noun.plural': {
        'en-US': (args: {}) => 'database technologies',
        'fr-FR': (args: {}) => 'technologies de base de données',
    },
    'skillTag.relational-database.title.short': {
        'en-US': (args: {}) => 'Relational DB',
        'fr-FR': (args: {}) => 'BDD relationnelle',
    },
    'skillTag.relational-database.title': {
        'en-US': (args: {}) => 'Relational database',
        'fr-FR': (args: {}) => 'Base de données relationnelle',
    },
    'skillTag.relational-database.noun': {
        'en-US': (args: {}) => 'relational database technology',
        'fr-FR': (args: {}) => 'technologie de base de données relationnelle',
    },
    'skillTag.relational-database.noun.plural': {
        'en-US': (args: {}) => 'relational database technologies',
        'fr-FR': (args: {}) => 'technologies de base de données relationnelles',
    },
    'skillTag.document-oriented-database.title.short': {
        'en-US': (args: {}) => 'Document-oriented DB',
        'fr-FR': (args: {}) => 'BDD orientée document',
    },
    'skillTag.document-oriented-database.title': {
        'en-US': (args: {}) => 'Document-oriented database',
        'fr-FR': (args: {}) => 'Base de données orientée document',
    },
    'skillTag.document-oriented-database.noun': {
        'en-US': (args: {}) => 'document-oriented database technology',
        'fr-FR': (args: {}) => 'technologie de base de données orientée document',
    },
    'skillTag.document-oriented-database.noun.plural': {
        'en-US': (args: {}) => 'document-oriented database technologies',
        'fr-FR': (args: {}) => 'technologies de base de données orientées document',
    },
    'skillTag.key-value-database.title.short': {
        'en-US': (args: {}) => 'Key-value DB',
        'fr-FR': (args: {}) => 'BDD clé-valeur',
    },
    'skillTag.key-value-database.title': {
        'en-US': (args: {}) => 'Key-value database',
        'fr-FR': (args: {}) => 'Base de données clé-valeur',
    },
    'skillTag.key-value-database.noun': {
        'en-US': (args: {}) => 'key-value database technology',
        'fr-FR': (args: {}) => 'technologie de base de données clé-valeur',
    },
    'skillTag.key-value-database.noun.plural': {
        'en-US': (args: {}) => 'key-value database technologies',
        'fr-FR': (args: {}) => 'technologies de base de données clé-valeur',
    },
    'skillTag.version-control.title.short': {
        'en-US': (args: {}) => 'Version control',
        'fr-FR': (args: {}) => 'Gestion de version',
    },
    'skillTag.version-control.title': {
        'en-US': (args: {}) => 'Version control',
        'fr-FR': (args: {}) => 'Gestion de version',
    },
    'skillTag.version-control.noun': {
        'en-US': (args: {}) => 'version control system',
        'fr-FR': (args: {}) => 'système de gestion de version',
    },
    'skillTag.version-control.noun.plural': {
        'en-US': (args: {}) => 'version control systems',
        'fr-FR': (args: {}) => 'systèmes de gestion de version',
    },
    'skillTag.containerization.title.short': {
        'en-US': (args: {}) => 'Containerization',
        'fr-FR': (args: {}) => 'Conteneurisation',
    },
    'skillTag.containerization.title': {
        'en-US': (args: {}) => 'Containerization',
        'fr-FR': (args: {}) => 'Conteneurisation',
    },
    'skillTag.containerization.noun': {
        'en-US': (args: {}) => 'containerization technology',
        'fr-FR': (args: {}) => 'technologie de conteneurisation',
    },
    'skillTag.containerization.noun.plural': {
        'en-US': (args: {}) => 'containerization technologies',
        'fr-FR': (args: {}) => 'technologies de conteneurisation',
    },
    'skillTag.app.title.short': {
        'en-US': (args: {}) => 'App',
        'fr-FR': (args: {}) => 'App',
    },
    'skillTag.app.title': {
        'en-US': (args: {}) => 'Application',
        'fr-FR': (args: {}) => 'Application',
    },
    'skillTag.app.noun': {
        'en-US': (args: {}) => 'application',
        'fr-FR': (args: {}) => 'application',
    },
    'skillTag.app.noun.plural': {
        'en-US': (args: {}) => 'applications',
        'fr-FR': (args: {}) => 'applications',
    },
    'skillTag.desktop-app.title.short': {
        'en-US': (args: {}) => 'Desktop app',
        'fr-FR': (args: {}) => 'App de bureau',
    },
    'skillTag.desktop-app.title': {
        'en-US': (args: {}) => 'Desktop application',
        'fr-FR': (args: {}) => 'Application de bureau',
    },
    'skillTag.desktop-app.noun': {
        'en-US': (args: {}) => 'desktop application',
        'fr-FR': (args: {}) => 'application de bureau',
    },
    'skillTag.desktop-app.noun.plural': {
        'en-US': (args: {}) => 'desktop applications',
        'fr-FR': (args: {}) => 'applications de bureau',
    },
    'skillTag.web-app.title.short': {
        'en-US': (args: {}) => 'Web app',
        'fr-FR': (args: {}) => 'App web',
    },
    'skillTag.web-app.title': {
        'en-US': (args: {}) => 'Web application',
        'fr-FR': (args: {}) => 'Application web',
    },
    'skillTag.web-app.noun': {
        'en-US': (args: {}) => 'web application',
        'fr-FR': (args: {}) => 'application web',
    },
    'skillTag.web-app.noun.plural': {
        'en-US': (args: {}) => 'web applications',
        'fr-FR': (args: {}) => 'applications web',
    },
    'skillTag.ide.title.short': {
        'en-US': (args: {}) => 'IDE',
        'fr-FR': (args: {}) => 'EDI',
    },
    'skillTag.ide.title': {
        'en-US': (args: {}) => 'Integrated development environment',
        'fr-FR': (args: {}) => 'Environnement de développement intégré',
    },
    'skillTag.ide.noun': {
        'en-US': (args: {}) => 'integrated development environment',
        'fr-FR': (args: {}) => 'environnement de développement intégré',
    },
    'skillTag.ide.noun.plural': {
        'en-US': (args: {}) => 'integrated development environments',
        'fr-FR': (args: {}) => 'environnements de développement intégrés',
    },
    'skillTag.design.title.short': {
        'en-US': (args: {}) => 'Design',
        'fr-FR': (args: {}) => 'Design',
    },
    'skillTag.design.title': {
        'en-US': (args: {}) => 'Design',
        'fr-FR': (args: {}) => 'Design',
    },
    'skillTag.design.noun': {
        'en-US': (args: {}) => 'design skill',
        'fr-FR': (args: {}) => 'compétence en design',
    },
    'skillTag.design.noun.plural': {
        'en-US': (args: {}) => 'design skills',
        'fr-FR': (args: {}) => 'compétences en design',
    },
    'skillTag.ux-ui.title.short': {
        'en-US': (args: {}) => 'UX/UI',
        'fr-FR': (args: {}) => 'UX/UI',
    },
    'skillTag.ux-ui.title': {
        'en-US': (args: {}) => 'User experience / User interface',
        'fr-FR': (args: {}) => 'Expérience utilisateur / Interface utilisateur',
    },
    'skillTag.ux-ui.noun': {
        'en-US': (args: {}) => 'user experience / user interface skill',
        'fr-FR': (args: {}) => 'compétence en expérience utilisateur / interface utilisateur',
    },
    'skillTag.ux-ui.noun.plural': {
        'en-US': (args: {}) => 'user experience / user interface skills',
        'fr-FR': (args: {}) => 'compétences en expérience utilisateur / interface utilisateur',
    },
};

const skillLocales: Locale = {
    'skill.noun': {
        'en-US': (args: {}) => 'skill',
        'fr-FR': (args: {}) => 'compétence',
    },
    'skill.noun.plural': {
        'en-US': (args: {}) => 'skills',
        'fr-FR': (args: {}) => 'compétences',
    },
    'skill.title': {
        'en-US': (args: {}) => 'Skill',
        'fr-FR': (args: {}) => 'Compétence',
    },
    'skill.title.plural': {
        'en-US': (args: {}) => 'Skills',
        'fr-FR': (args: {}) => 'Compétences',
    },
    'skill.nodejs.title': {
        'en-US': (args: {}) => 'Node.js',
        'fr-FR': (args: {}) => 'Node.js',
    },
    'skill.react.title': {
        'en-US': (args: {}) => 'React',
        'fr-FR': (args: {}) => 'React',
    },
    'skill.javascript.title': {
        'en-US': (args: {}) => 'JavaScript',
        'fr-FR': (args: {}) => 'JavaScript',
    },
    'skill.typescript.title': {
        'en-US': (args: {}) => 'TypeScript',
        'fr-FR': (args: {}) => 'TypeScript',
    },
    'skill.python.title': {
        'en-US': (args: {}) => 'Python',
        'fr-FR': (args: {}) => 'Python',
    },
    'skill.django.title': {
        'en-US': (args: {}) => 'Django',
        'fr-FR': (args: {}) => 'Django',
    },
    'skill.php.title': {
        'en-US': (args: {}) => 'PHP',
        'fr-FR': (args: {}) => 'PHP',
    },
    'skill.symfony.title': {
        'en-US': (args: {}) => 'Symfony',
        'fr-FR': (args: {}) => 'Symfony',
    },
    'skill.laravel.title': {
        'en-US': (args: {}) => 'Laravel',
        'fr-FR': (args: {}) => 'Laravel',
    },
    'skill.java.title': {
        'en-US': (args: {}) => 'Java',
        'fr-FR': (args: {}) => 'Java',
    },
    'skill.html.title': {
        'en-US': (args: {}) => 'HTML',
        'fr-FR': (args: {}) => 'HTML',
    },
    'skill.css.title': {
        'en-US': (args: {}) => 'CSS',
        'fr-FR': (args: {}) => 'CSS',
    },
    'skill.vscode.title': {
        'en-US': (args: {}) => 'Visual Studio Code',
        'fr-FR': (args: {}) => 'Visual Studio Code',
    },
};

const websiteTagLocales: Locale = {
    'websiteTags.documentation,official.title.short': {
        'en-US': (args: {}) => 'Official docs',
        'fr-FR': (args: {}) => 'Doc. officielle',
    },
    'websiteTags.documentation,official.title': {
        'en-US': (args: {}) => 'Official documentation',
        'fr-FR': (args: {}) => 'Documentation officielle',
    },
    'websiteTags.community,documentation.title.short': {
        'en-US': (args: {}) => 'Community docs',
        'fr-FR': (args: {}) => 'Doc. communautaire',
    },
    'websiteTags.community,documentation.title': {
        'en-US': (args: {}) => 'Community documentation',
        'fr-FR': (args: {}) => 'Documentation communautaire',
    },
};

const experienceLocales: Locale = {
    'experience.fullstack-developer.title': {
        'en-US': (args: {}) => 'Fullstack developer',
        'fr-FR': (args: {}) => 'Développeur Fullstack',
    },
    'experience.fullstack-developer.noun': {
        'en-US': (args: {}) => 'Fullstack developer',
        'fr-FR': (args: {}) => 'développeur Fullstack',
    },
    'experience.fullstack-developer.noun.plural': {
        'en-US': (args: {}) => 'Fullstack developers',
        'fr-FR': (args: {}) => 'développeurs Fullstack',
    },
};

const locales: Locale = {
    ...generalLocales,
    ...skillLocales,
    ...tagLocales,
    ...skillTagLocales,
    ...websiteTagLocales,
    ...experienceLocales,
};

const getLocale = (key: string, lang?: string): LocaleFunction => {
    const language = lang || DEFAULT_LANG;
    if (! locales[key]) {
        console.warn(`No locale found for key ‘${key}’`);
        return () => key;
    }
    return locales[key][language];
};

export default getLocale;
