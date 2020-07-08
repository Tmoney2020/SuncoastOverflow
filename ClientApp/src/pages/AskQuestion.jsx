import React from 'react'
import { Link } from 'react-router-dom'

export function AskQuestion() {
  return (
    <Link to="/question/42">
      <div className="card">
        <div className="card-header">Ask a question?</div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" className="form-control" id="title" />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea type="text" className="form-control" id="description" />
              <small id="descriptionHelp" className="form-text text-muted">
                Enter a brief description of your question.
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              <input type="text" className="form-control" id="tags" />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Link>
  )
}
