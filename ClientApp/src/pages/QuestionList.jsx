import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function SingleQuestionForList(props) {
  return (
    <Link
      to="/question/42/review"
      className="list-group-item list-group-item-action"
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{props.question.title}</h5>
        <p className="mb-1">{props.question.description}</p>
        <small>5 Answers</small>
      </div>
      <small className="mr-3">
        <button className="btn btn-success btn-sm">
          <span className="mr-2" role="img" aria-label="upvote">
            👍🏻
          </span>
          5
        </button>
      </small>
      <small className="mr-3">
        <button className="btn btn-danger btn-sm">
          <span className="mr-2" role="img" aria-label="downvote">
            👎🏻
          </span>{' '}
          3
        </button>
      </small>
    </Link>
  )
}

export function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('/api/Questions')
      .then(response => response.json())
      .then(apiData => setQuestions(apiData))
  }, [])

  return (
    <>
      <img
        className="mainPageBackGround"
        src="https://www.sencha.com/wp-content/uploads/2019/10/s-o-banner.png"
        alt="mainPageBackGround"
      />
      <div className="list-group">
        {questions.map(question => (
          <SingleQuestionForList key={question.id} question={question} />
        ))}
      </div>
    </>
  )
}
