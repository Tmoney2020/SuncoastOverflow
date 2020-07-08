import React from 'react'

export function Review() {
  return (
    <div className="Review">
      <div className="media mb-5">
        <span className="pr-3 display-2" role="img" aria-label="review">
          ❓
        </span>
        <div className="media-body">
          <h1 className="mt-0">Question 1</h1>
          This coding stuff is hard? What can I do to make this easier?
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <h3 className="ml-2">Reviews</h3>
          <ul className="timeline">
            <li>
              <p className="mb-2">
                Wow, great question
                <span className="float-right mr-2">21 March, 2014</span>
              </p>
              <p>I like to eat lots of junk food to make it easier!</p>
            </li>
            <li>
              <p className="mb-2">
                Wow, another great question
                <span className="float-right mr-2">21 March, 2014</span>
              </p>
              <p>I like to take lots of breaks to make it easier.</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Enter your own answer</div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="summary">Summary</label>
              <input
                type="text"
                className="form-control"
                id="summary"
                aria-describedby="summaryHelp"
              />
              <small id="summaryHelp" className="form-text text-muted">
                Enter a brief summary of your answer. Example:{' '}
                <strong>I find that it is easier to not code.</strong>
              </small>
            </div>
            <div className="form-group">
              <label for="review">Answer</label>
              <textarea type="text" className="form-control" id="review" />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
