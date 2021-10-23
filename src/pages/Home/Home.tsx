import React, {FC} from 'react'
import {Pagination2} from '../../components/UI/Pagination/Pagination2'
import {Pagination} from '../../components/UI/Pagination/Pagination'

export const Home: FC = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <Pagination totalCount={150} countPerPage={10} currentPage={2} onChangePage={ ()=> {} }/>
            <Pagination2 currentPage={6} totalPages={74} setCurrentPage={ ()=> {} }/>
        </div>
    )
}