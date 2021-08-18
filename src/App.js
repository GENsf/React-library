import React from "react";
import {useState} from 'react';
import axios from 'axios';
// components
import Table from "./Components/Table";


// styles
import "../src/scss/_header.scss";
import "../src/scss/_search.scss";
import '../src/scss/_tableStyle.scss';
import '../src/scss/_itemStyle.scss';
import '../src/scss/_main.scss';
import '../src/scss/_null.scss';
import '../src/scss/_var.scss';

function App() {
	const [book, setBook] = useState("")
	const [result, setResult] = useState([])
	const [find, setFind] = useState("")
	const [bookPerPage, setBookPerPage] = useState(10)
	const [sorting, setSorting] = useState("relevance")
	const [categoryFilter, setCategoryFilter] = useState("all")
	const [apiKey, setApiKey] = useState("AIzaSyBzlNybJzKpIyg-1wHfkMpvZd7mFFEVcqw")
	// const sort_value = ""

	function handleChange(event){
		const book = event.target.value
		setBook(book)
	}

	function sortChange(event){
		setSorting(event.target.value)
	}
	function categoryChange(event){
		setCategoryFilter(event.target.value)
	}
	
	function handleSubmit(event){
		event.preventDefault()
		
		axios.get("https://www.googleapis.com/books/v1/volumes?q="+book+categoryFilter+"&orderBy="+sorting+"&key="+apiKey+"&maxResults=40")//У Google books Api стоит ограничение на maxResults
		.then(data => {
			setResult(data.data.items)
			setFind("finded: "+data.data.totalItems+" books")
		})
		.catch(err=>console.log(err))
	}

	const count = () => {
		setBookPerPage((prevValue) => prevValue + 10)
	}



  	return (
		<html>
			<head>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
					integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossOrigin="anonymous" />
				<link rel="stylesheet" href="css/style.css" />
				<title>Library</title>
			</head>
			<body>
				<header>
					<div className="header__div">
						<h1>Search for books</h1>
						<form action="" method="get" className="header__form" id="search" onSubmit={handleSubmit}>
							<input name="search" placeholder="Book, autor, year..." type="search" className="header__search" onChange={handleChange} />
							<button type="submit" className="header__button"><i className="fas fa-search"></i></button>
							<div className="header__filter">
								<div className="filter-card">
									<p>Category</p>
									<select value={categoryFilter} onChange={categoryChange} className="header__select">
										<option value="" selected>All</option>
										<option value="subject:arts">Art</option>
										<option value="subject:biography">Biography</option>
										<option value="subject:computers">Computers</option>
										<option value="subject:history">History</option>
										<option value="subject:medical">Medical</option>
										<option value="subject:poetry">Poetrys</option>
									</select>
								</div>
								<div className="filter-card">
									<p>Sorting</p>
									<select value={sorting} onChange={sortChange} className="header__select" id="sort">
										<option value="relevance" selected>Relevance</option>
										<option value="newest">Newest</option>
									</select>
								</div>
							</div>
						</form>
					</div>
				</header>
				<hr className="line" />
				<main>
					<div className="container">
						<p className="main__find">{find}</p>
						<Table tableObj={result} bookPerPage={bookPerPage} />
						<button onClick={count} className="table__pagination">Load more<br /><i className="fas fa-sort-down"></i></button>
					</div>
				</main>
			</body>
  		</html>
  	);
}
export default App;
