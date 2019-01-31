import React from 'react';

const Search = ({ handleChange, handleSubmit }) => {
  return (
    <form _lpchecked="1">
      <div className="form-group row">
        <div className="col-sm-10">
          <label htmlFor="startDate" className="col-sm-2 col-form-label">Track Start Date & Following 9 Days</label>
          <input type="text" className="form-control" id="startDate" onChange={handleChange} />
          <button type="button" className="btn btn-secondary" onClick={handleSubmit}>Search</button>
        </div>
      </div>
    </form>
  )
}

export default Search;