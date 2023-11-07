import { json } from '@sveltejs/kit'

export async function load({ fetch }) {
  const user = await fetch('/user')
  return {
    user: json(user)
  }
}