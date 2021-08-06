import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

	let def = [
		{
		    "id": 259,
		    "text": "Test uncompleted note",
		    "isComplete": false,
		},
		{
		    "id": 33,
		    "text": "Test completed note",
		    "isComplete": true,
		}
	];

	const [ notes, setNotes ] = useState( def );
	const [ count, setCount ] = useState(0);

	function addNewNote(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		let nArr = notes;
		if ( formData.get('note').trim() ) nArr.push( {
			id: new Date().getUTCMilliseconds(),
			text: formData.get('note'),
			isComplete: false,
			isDeleted: false
		} );
		setNotes( nArr );
		setCount(count + 1);
		console.log( notes );
		e.target.reset();
	}

	function remooveNote( id ) {
		setNotes( notes.filter( (x) => x.id !== id ) );
		setCount( count + 1 );
	}

	function toggleNote( id ) {
		const ourInd = notes.findIndex( (o) => o.id == id );
		let newNotes = notes;
		newNotes[ourInd].isComplete = !(notes[ourInd].isComplete);
		setNotes( newNotes );
		setCount( count + 1 );
	}

	return (
		<div className="App container py-5">

		  <h1 className="mb-4">NOTES APP</h1>

			<form
				className="border p-3 pb-4 my-5 bg-light"
				style={{ maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto'  }}
				onSubmit={ addNewNote }
			>
				<label htmlFor="note">Add new note</ label>
				<textarea className="form-control mb-3" name="note">
				</ textarea>
				<input className="form-control btn btn-success" type="submit" value="Add Note" />
			</form>

			<div
				className="border p-3"
				style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto'  }}
			>
        <ul
					className="nav nav-pills mb-3 justify-content-center"
					id="pills-tab"
					role="tablist"
				>
          <li
					className="nav-item"
					role="presentation"
					>
            <button
							className="nav-link active"
							id="pills-home-tab"
							data-bs-toggle="pill"
							data-bs-target="#pills-home"
							type="button"
							role="tab"
							aria-controls="pills-home"
							aria-selected="true"
						>
							Current
						</button>
          </li>
          <li
						className="nav-item"
						role="presentation"
					>
            <button
							className="nav-link"
							id="pills-profile-tab"
							data-bs-toggle="pill"
							data-bs-target="#pills-profile"
							type="button" role="tab"
							aria-controls="pills-profile"
							aria-selected="false"
						>
							Completed
						</button>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
						className="tab-pane fade show active"
						id="pills-home"
						role="tabpanel"
						aria-labelledby="pills-home-tab"
					>
						<RenderNotes
							notes = { notes }
							setNotes = { setNotes }
							showComplete = { false }
							count = { count }
							setCount = { setCount }
						/>
					</div>
          <div
						className="tab-pane fade"
						id="pills-profile"
						role="tabpanel"
						aria-labelledby="pills-profile-tab"
					>
						<RenderNotes
							notes = { notes }
							setNotes = { setNotes }
							showComplete = { true }
							count = { count }
							setCount = { setCount }
						/>
					</div>
        </div>
      </div>

		</div>
	);
}


/* RENDER FOO */

function RenderNotes(args) {

	let { notes, setNotes, showComplete, count, setCount } = args;

	function remooveNote( id ) {
		setNotes( notes.filter( (x) => x.id !== id ) );
		setCount( count + 1 );
	}

	function toggleNote( id ) {
		const ourInd = notes.findIndex( (o) => o.id == id );
		let newNotes = notes;
		newNotes[ourInd].isComplete = !(notes[ourInd].isComplete);
		setNotes( newNotes );
		setCount( count + 1 );
	}

	return (
		<div>
			{ notes.filter( (x) => x.isComplete == showComplete ).map( (n) => (
				<div className={ "alert "+( !showComplete ? "alert-warning" : "alert-success") } key={ n.id }>
					<p className="lead text-start">{n.text}</p>
					<hr />
					<button
						className="btn btn-sm btn-warning m-1"
						onClick={ () => { toggleNote(n.id) } }
					>
						{ !showComplete ? "Complete" : "Uncomplete" }
					</button>
					<button
						className="btn btn-sm btn-danger m-1"
						onClick={ () => { remooveNote(n.id) } }
					>
						Trash
					</button>
				</div>
			))}
		</div>
	);
}






export default App;
