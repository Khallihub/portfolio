import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'techStack',
  title: 'TechStack',
  type: 'document',
  fields: [
    defineField({
      name: 'techName',
      title: 'TechName',
      type: 'string',
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
      title: 'techName',
      subtitle: 'type',
      media: 'image',
    },
    prepare(selection) {
      const {title} = selection
      return {...selection, subtitle: title && `by ${title}` }
    },
  }
});
