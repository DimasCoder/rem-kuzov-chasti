import React from 'react'

const PaginationButton = (props) => {
    return (
        <div className={props.class}
             onClick={() => this.handlePageChange(1)}>
            <img src = {props.content}/>
        </div>
    )
}
export default PaginationButton