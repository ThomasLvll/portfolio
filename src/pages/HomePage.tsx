import {
    Grid,
    GridItem,
    Heading,
    Stack,
} from '@chakra-ui/react';
import {
    sortBy as by,
} from '../lib/Utils';
import SkillCard from '../components/SkillCard';
import skills from '../data/Skills';
import SkillTagLists from '../data/SkillTagLists';

const Section: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (<>
        <Stack spacing={6}>{children}</Stack>
    </>);
};

const _ = () => {
    return (<>
        <Section>
            <Heading size='lg'>Skills</Heading>
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                {
                    skills
                        .filter((skill) => skill.scores?.highlight && skill.scores.highlight > 0)
                        .sort(by('scores.estimatedLevel', 'desc'))
                        .sort(by('scores.highlight', 'desc'))
                        .map((skill) => (
                            <GridItem key={`skill.${skill.slug}`}>
                                <SkillCard
                                    key={`skill.${skill.slug}.card`}
                                    skill={skill}
                                    tagsShownFn={(tags) => SkillTagLists.applySkillTagList(tags, SkillTagLists.skillTagLists.default)}
                                />
                            </GridItem>
                        ))
                }
            </Grid>
        </Section>
    </>);
};

export default _;
