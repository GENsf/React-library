import React, {useState} from 'react'
import Item from './Item'





export default function Table(props) {
	return (
		<div className="main__table">
			{ props.tableObj.slice(0, props.bookPerPage).map(itemsObj => {
				return <Item itemObj={itemsObj} key={itemsObj.id}/>
			})}
		</div>
	)
}