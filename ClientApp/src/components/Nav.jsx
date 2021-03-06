import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export function Nav(props) {
  const [filterText, setFilterText] = useState('')

  const handleClickSearch = event => {
    props.setActiveFilter(filterText)
    event.preventDefault()
  }
  return (
    <nav className="navbar navbar-expand navbar-light">
      <Link className="navbar-brand" to="/">
        <img
          className="navbar-brand navImg"
          src="https://wizardsourcer.com/wp-content/uploads/2019/03/Stackoverflow.png"
          alt="icon"
        />
        Home
      </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/question/42">
              Ask Question
            </Link>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={filterText}
            onChange={event => setFilterText(event.target.value)}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            onClick={handleClickSearch}
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  )
}
