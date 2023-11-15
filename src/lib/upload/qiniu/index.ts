export async function f(body: FormData) {
  const data = await fetch('http://localhost:8080/upload', {
    body
  })
  console.log('dt', data)
}