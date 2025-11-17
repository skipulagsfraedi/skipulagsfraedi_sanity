// schemaTypes/index.ts
import {pageType} from './pageType';
import {postType} from './postType';
import {siteSettingsType} from './siteSettingsType';
import {frontpageContentType} from './frontpageContentType';
import {
  heroSection,
  newsSection,
  teamSection,
  pillarsSection,
  contactSection,
} from './sections';

export const schemaTypes = [
  postType,
  pageType,
  siteSettingsType,
  heroSection,
  newsSection,
  teamSection,
  pillarsSection,
  contactSection,
  frontpageContentType,
];
