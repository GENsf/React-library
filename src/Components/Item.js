import React from 'react'

export default function Item({ itemObj }) {
	const categoryArr = itemObj.volumeInfo.categories && itemObj.volumeInfo.categories ? itemObj.volumeInfo.categories : ["Uncategories"] 
	const categoryName = categoryArr.join(" ").replace(/,/g, "").split(" ")
	const category = categoryName[0]

	let wrap = itemObj.volumeInfo.imageLinks ? itemObj.volumeInfo.imageLinks.thumbnail : ""

	const title = itemObj.volumeInfo.title && itemObj.volumeInfo.title.length > 24 ? itemObj.volumeInfo.title.slice(0,24) + '...' : itemObj.volumeInfo.title

	const author = itemObj.volumeInfo.authors && itemObj.volumeInfo.authors.length > 1 ? itemObj.volumeInfo.authors[0] : itemObj.volumeInfo.authors
	
	return(
		<a className="main__book" target="_blank"  href={itemObj.volumeInfo.previewLink}>
				<div className="book__category">
					<p className="book__category-name">{category}</p>
				</div>
				<img src={wrap} alt="" className="book__wrap" />
					<p className="book__name">{title}</p>
					<hr className="book__line" />
						<p className="book__autor">{author}</p>
				</a>
	)
}