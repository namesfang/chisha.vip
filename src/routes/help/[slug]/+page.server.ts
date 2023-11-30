import type { EntryGenerator } from "./$types";

export const entries: EntryGenerator = ()=> {
  return [
    {slug: 'how-to-use-cms'},
    {slug: 'use-upload-image'}
  ]
}

export const prerender = true;
