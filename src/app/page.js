import { NoteCard } from "./components/NoteCard"
import { NoteInput } from "./components/NoteInput"

const url = process.env.NEXT_PUBLIC_API_URL_ALL

async function getNotes() {
  const res = await fetch(url, { cache: "no-store" })
  const data = await res.json()
  return data
}

export default async function Page() {
  const { items } = await getNotes()
  console.log(items)
  return (
    <div>
      <h1>Notes</h1>
      <div>
        {
          items.map(({ id, content }) => {
            return (<div key={id}>
              <NoteCard id={id} content={content}/>
            </div>)
          })
        }
      </div>

      <NoteInput />

    </div>
  )
}
