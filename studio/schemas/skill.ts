import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'skillName',
      title: 'SkillName',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      description: 'Category or type of skill',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, 
      },
    }),
  ],
  
  preview: {
    select: {
      title: 'skillName',
      subtitle: 'type',
      media: 'image',
    },
    prepare(selection) {
      const {title} = selection
      return {...selection, subtitle: title && `by ${title}` }
    },
  }
});
