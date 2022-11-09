import React from "react";




export function SearchBar () {
  return (
    <>
      <div className="field has-addons">
        <p className="control">
          <input className="input" type="text" placeholder="Item" />
        </p>
        <p class="control">
          <button className="button is-info">Search Item</button>
        </p>
        <p class="control">
          <input className="input" type="text" placeholder="Zip Code" />
        </p>

        <p className="control">
          <button className="button is-info">Search Zip Code</button>
        </p>
      </div>
    </>
  );
}
