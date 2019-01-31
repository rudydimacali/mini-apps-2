import React from 'react';

const Search = ({ handleChange, handleSubmit }) => {
  return (
    <form _lpchecked="1">
      <fieldset>
        <div className="form-group row">
          <div className="col-sm-10">
            <label htmlFor="startDate" className="col-sm-2 col-form-label">Track Start Date & Following 9 Days</label>
            <input type="text" readonly="" className="form-control" id="startDate" value="YYYY-MM-DD" onChange={handleChange} />
            <button type="button" className="btn btn-secondary" onClick={handleSubmit}>Search</button>
          </div>
        </div>
      </fieldset>
    </form>
  )
}

export default Search;