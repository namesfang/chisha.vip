import { json } from '@sveltejs/kit'

export async function load({ fetch }) {
  const result = await fetch('/user')
  return {
    result: json(result)
  }
}