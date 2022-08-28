import React from 'react'

export default function Button() {
  return (
    <>
        <button class="btn btn-outline-secondary show dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="true">Dropdown</button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
        <li><hr class="dropdown-divider"/></li>
        <li><a class="dropdown-item" href="#">Separated link</a></li>
      </ul>
    </>
  )
}
