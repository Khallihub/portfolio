import { defineField, defineType } from 'sanity';
import techStack from './tech';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "string",
    }),
    defineField({
      name: 'projectName',
      title: 'ProjectName',
      type: 'string',
    }),
    defineField({
      name: 'projectDescription',
      title: 'ProjectDescription',
      type: 'string',
      description: 'Description of project',
    }),
    defineField(
      {
        name: "techStack",
        title: "TechStack",
        type: "array",
        of: [{type: "reference", to: [{type: "techStack"}]}]
      }
    ),
    defineField({
      name: 'githubLink',
      title: 'GithubLink',
      type: 'string',
      description: 'Link to github repo',
    }),
  ],
  
  preview: {
    select: {
      title: 'projectName',
      subtitle: 'projectDescription',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'Untitled', 
        subtitle: subtitle || 'No description',
      }
    },
  }
});
