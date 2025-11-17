// schemaTypes/sections/contactSection.ts
import {defineField, defineType} from 'sanity';

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Hafðu samband',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titill',
      type: 'string',
      initialValue: 'Hafðu samband',
    }),
    defineField({
      name: 'lead',
      title: 'Inngangur',
      type: 'string',
      initialValue: 'Best er að senda okkur línu á',
    }),
    defineField({
      name: 'email',
      title: 'Netfang',
      type: 'string',
      initialValue: 'hallo@skipulagsfraedi.is',
      validation: (Rule) => Rule.required(),
      description: 'Netfangið sem birtist og er notað í mailto tengli',
    }),
    defineField({
      name: 'note',
      title: 'Viðbótartexti',
      type: 'text',
      rows: 3,
      initialValue: 'Við svarum fljótt og erum ávallt opin fyrir samtali um nýjar hugmyndir.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      email: 'email',
    },
    prepare: ({title, email}) => ({
      title: title || 'Hafðu samband',
      subtitle: email || 'Contact section',
    }),
  },
});

