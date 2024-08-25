// const express = require('express')
// const app = express()

// let notes = [
//     {
//       id: 1,
//       content: "HTML is easy",
//       important: true
//     },
//     {
//       id: 2,
//       content: "Browser can execute only JavaScript",
//       important: false
//     },
//     {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       important: true
//     }
//   ]

//   // will parse data sent to the server
//   app.use(express.json())

//   app.get('/', (req, res) => {
//     res.send('<h1>Hello world!</h1>')
//   })

//   app.get('/notes', (req, res) => {
//     res.json(notes)
//   })

//   app.get('/notes/:id', (req, res) => {
//     const id = req.params.id
//     if (notes[id]) {
//       res.json(notes[id])
//     } else {
//       res.status(404).end()
//     }
    
//   })

//   app.delete('/notes/:id', (req, res) => {
//     const id = req.params.id
//     notes = notes.filter(ele => ele.id != id)
//     res.status(204).end()
//   })

//   app.post('/notes', (req, res) => {
//     if (!req.body.content) {
//       return res.status(400).json({
//         error: 'content missing'
//       })
//     }

//     const newNote = {
//       content: req.body.content,
//       important: Boolean(req.body.important) || false,
//       id: generateId()
//     }

//     notes = notes.concat(newNote)

//     res.json(note)

//   })

//   const generateId = () => {
//     const maxId = notes.length > 0
//     ? Math.max(...notes.map(ele => Number(ele.id)))
//     : 0
//     return String(maxId + 1)
//   }


//   const PORT = 3001
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`)
//   })

let persons = [
    {
      name: "Arto Hellas",
      number: "444-555-666",
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      name: "Moo MOO",
      number: "111-333-222",
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      name: "Boo Foo ",
      number: "999-888-777",
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

// simple http server
// const http = require('http')

// const app = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'application/json'})
//     res.end(JSON.stringify(persons))
// })

// const port = 3001
// app.listen(port)
// console.log(`Server is running on port ${port}`)


// simple express server
const express = require('express')
const app = express()
const cors = require('cors')

const info = (req, res, next) => {
  console.log('Method: ', req.method)
  console.log('Path: ', req.path)
  console.log('Body: ', req.body)
  console.log('---')
  next()
}

app.use(cors())
app.use(express.json())
// app.use(info)

app.get('/persons', (req, res) => {
  res.status(200).json(persons)
})

app.get('/persons/:id', (req, res) => {
  const id = req.params.id
  const note = persons.find(ele => ele.id === id)
  note
  ? res.status(200).json(note)
  : res.status(404).end()
})

app.post('/persons', (req, res) => {
  const newPerson = {
    id: String(persons.length + 1),
    ...req.body
  }
  persons = persons.concat(newPerson)
  res.status(201).send(newPerson)
})

app.delete('/persons/:id', (req, res) => {
  persons = persons.filter(ele => ele.id !== req.params.id)
  res.status(202).end()
})

app.put('/persons/:id', (req, res) => {
  persons[req.params.id - 1] = {...req.body}
  res.status(201).send(req.body)
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'Unknown endpoint'})
}

app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
