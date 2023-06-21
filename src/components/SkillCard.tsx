import {
    useMemo,
    useState,
} from 'react';
import {
    Link,
} from 'react-router-dom';
import {
    Badge,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    Divider,
    Flex,
    Heading,
    Image,
    Progress,
    Stack,
    StackDivider,
    Tag,
    TagLabel,
    TagLeftIcon,
    Text,
} from '@chakra-ui/react';
import {
    LinkIcon,
} from '@chakra-ui/icons';
import {
    Skill,
} from '../data/Skills';
import getLocale from '../data/Locale';

interface ShownTag {
    slug: string;
    isHidden: boolean;
}

interface SkillCardProps {
    skill: Skill;
    tagsShownFn?: (tags: string[]) => ShownTag[];
}

const skillMasteryLevels = {
    expert: 0.9,
    advanced: 0.8,
    intermediate: 0.5,
    beginner: 0.1,
};

const _ = (props: SkillCardProps) => {
    const shownTags: ShownTag[] = useMemo(() => (
        props.tagsShownFn
        ? props.tagsShownFn(props.skill.tags)
        : props.skill.tags.map((tag) => ({
            slug: tag,
            isHidden: false,
        }))
    ), [
        props.skill.tags,
        props.tagsShownFn,
    ]);

    const masteryLevel: string | null = useMemo(() => {
        for (const [level, threshold] of Object.entries(skillMasteryLevels)) {
            if (props.skill.scores?.estimatedLevel && props.skill.scores.estimatedLevel >= threshold) {
                return level;
            }
        }
        return null;
    }, [
        props.skill,
    ]);


    const hiddenTagsCount: number = useMemo(() => (
        shownTags.filter((shownTag) => shownTag.isHidden).length
    ), [
        shownTags,
    ]);

    const [areTagsExpanded, setAreTagsExpanded] = useState<boolean>(false);

    return (
        <Card maxW='sm'>
            <CardHeader>
                <Stack spacing={2} divider={<StackDivider />}>
                    <Stack direction='row' spacing={2}>
                        {
                            props.skill.resources.icon
                            ? <Image
                                boxSize='24px'
                                src={props.skill.resources.icon?.url}
                                alt={getLocale('icon.withNoun')({ noun: getLocale(`skill.${props.skill.slug}.title`)(), })}
                            />
                            : null
                        }
                        <Heading size='md' noOfLines={2}>{getLocale(`skill.${props.skill.slug}.title`)()}</Heading>
                    </Stack>
                    {
                        masteryLevel
                        ? <Heading size='sm' noOfLines={1}>{getLocale(`level.${masteryLevel}`)()}</Heading>
                        : null
                    }
                </Stack>
            </CardHeader>
            <CardBody>
                <Stack spacing={3}>
                    <Flex direction='row' gap={2} wrap='wrap'>
                        {
                            shownTags.map((shownTag) => (
                                shownTag.isHidden && ! areTagsExpanded
                                ? null
                                : <Tag
                                    key={`skill.${props.skill.slug}.tag.${shownTag.slug}`}
                                    size='sm'
                                    variant='outline'
                                >
                                    {getLocale(`skillTag.${shownTag.slug}.title.short`)()}
                                </Tag>
                            ))
                        }
                        {
                            hiddenTagsCount > 0
                            ? <Tag
                                key={`skill.${props.skill.slug}.tag.show-more`}
                                size='sm'
                                variant='subtle'
                                onClick={() => setAreTagsExpanded((areTagsExpanded) => ! areTagsExpanded)}
                            >
                                {
                                    areTagsExpanded
                                    ? getLocale('hide.withCount.short')({
                                        count: hiddenTagsCount,
                                    })
                                    : getLocale('showMore.withCount.withNoun.short')({
                                        count: hiddenTagsCount,
                                        singularNoun: getLocale('tag.noun')(),
                                        pluralNoun: getLocale('tag.noun.plural')(),
                                    })
                                }
                            </Tag>
                            : null
                        }
                    </Flex>
                </Stack>
            </CardBody>
            <CardFooter>
                <Flex direction='row' gap={2} wrap='wrap'>
                    {
                        props.skill.resources.websites?.map((website) => (
                            <Link
                                key={`skill.${props.skill.slug}.website.${website.url}`}
                                to={website.url}
                            >
                                <Tag variant='outline'>
                                    <TagLeftIcon boxSize='12px' as={LinkIcon} />
                                    <TagLabel>{
                                        getLocale(`websiteTags.${website.tags?.sort().join(',')}.title.short`)()
                                    }</TagLabel>
                                </Tag>
                            </Link>
                        ))
                    }
                </Flex>
            </CardFooter>
        </Card>
    );
};

export default _;
