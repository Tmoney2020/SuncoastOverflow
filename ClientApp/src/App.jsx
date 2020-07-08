import React, { Component, useState } from 'react'
import { Nav } from './components/Nav.jsx'
import { QuestionList } from './pages/QuestionList.jsx'
import { AskQuestion } from './pages/AskQuestion.jsx'
import { Link, Switch, Route } from 'react-router-dom'
import { Review } from './pages/Review.jsx'

import './custom.scss'

export function App() {
  const [activeFilter, setActiveFilter] = useState('')

  console.log(activeFilter)
  return (
    <div>
      <Nav activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <main className="container-fluid p-4">
        <Switch>
          <Route exact path="/">
            <QuestionList activeFilter={activeFilter} />
          </Route>
          <Route path="/question/:id/review">
            <Review />
          </Route>
          <Route exact path="/question/:id">
            <AskQuestion />
          </Route>
        </Switch>
      </main>
    </div>
  )
}
