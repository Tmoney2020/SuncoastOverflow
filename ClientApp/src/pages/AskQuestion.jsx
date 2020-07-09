import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { runInNewContext } from 'vm'

export function AskQuestion() {
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState()

  const [newQuestion, setNewQuestion] = useState({
    title: '',
    description: '',
    tag: '',
  })

  const handleInputFieldValue = event => {
    const whichValueChanged = event.target.id
    const newValue = event.target.value

    console.log(`${whichValueChanged} was changed`)

    setNewQuestion({
      ...newQuestion,

      [whichValueChanged]: newValue,
    })
  }

  const handleToSubmit = event => {
    event.preventDefault()

    fetch('/api/Questions', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newQuestion),
    })
      .then(response => response.json())
      .then(apiData => {
        console.log(apiData)
        if (apiData.status === 400) {
          const newMessage = Object.values(apiData.errors).join(' ')
          setErrorMessage(newMessage)
        } else {
          history.push('/')
        }
      })
  }

  return (
    <div className="card">
      <div className="card-header">Ask a question?</div>
      <div className="card-body">
        <div className="card-body">
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
        </div>
        <form onSubmit={handleToSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={newQuestion.title}
              onChange={handleInputFieldValue}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              value={newQuestion.description}
              onChange={handleInputFieldValue}
            />
            <small id="descriptionHelp" className="form-text text-muted">
              Enter a brief description of your question.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="tag">Tags</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              value={newQuestion.tag}
              onChange={handleInputFieldValue}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
