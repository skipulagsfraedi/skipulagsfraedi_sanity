// schemaTypes/index.ts
import {pageType} from './pageType';
import {postType} from './postType';
import {siteSettingsType} from './siteSettingsType';
import {frontpageContentType} from './frontpageContentType';

export const schemaTypes = [
  postType,
  pageType,
  siteSettingsType,
  frontpageContentType,
];
