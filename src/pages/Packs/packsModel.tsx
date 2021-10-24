import {ReactNode} from 'react'
import {Pack} from '../../store/reducers/packs-reducer'
import {Button} from '../../components/UI/Button/Button'
import {PATH} from '../../routes/routes'
import {Link} from 'react-router-dom'

export type TableModel = {
    title: (index: number, loading: boolean) => ReactNode
    render: (dataItem: any, modelIndex: number, dataIndex: number, loading: boolean) => ReactNode
}

export const packsModel = (add: () => void, remove: (id: string) => void, update: (id: string) => void): TableModel[] => [
    {
        title: (index, loading) => <div key={'name-title-' + index} style={{width: 150}}>Name</div>,
        render: (dataItem: Pack, modelIndex, dataIndex, loading) => (
            <div key={'name-cell-' + dataItem._id} style={{width: 150}}>
                {dataItem.name}
            </div>
        )
    },
    {
        title: (index, loading) => <div key={'cardsCount-title-' + index} style={{width: 150}}>cardsCount</div>,
        render: (dataItem: Pack, modelIndex, dataIndex, loading) => (
            <div key={'cardsCount-cell-' + dataItem._id} style={{width: 150}}>
                {dataItem.cardsCount}
            </div>
        )
    },
    {
        title: (index, loading) => <div key={'updated-title-' + index} style={{width: 150}}>updated</div>,
        render: (dataItem: Pack, modelIndex, dataIndex, loading) => (
            <div key={'updated-cell-' + dataItem._id} style={{width: 150}}>
                {dataItem.updated.slice(5, 16)}
            </div>
        )
    },
    {
        title: (index, loading) => <div key={'url-title-' + index} style={{width: 150}}>url</div>,
        render: (dataItem: Pack, modelIndex, dataIndex, loading) => (
            <div key={'url-cell-' + dataItem._id} style={{width: 150}}>
                {dataItem.deckCover}
            </div>
        )
    },
    {
        title: (index, loading) => (
            <div key={'buttons-title-' + index} style={{width: 150}}>
                <Button onClick={add}>add</Button>
            </div>
        ),
        render: (dataItem: Pack, modelIndex, dataIndex, loading) => (
            <div key={'buttons-cell-' + dataItem._id} style={{width: 250}}>
                <Button onClick={() => remove(dataItem._id)}>del</Button>
                <Button onClick={() => update(dataItem._id)}>update</Button>
                <Link to={PATH.CARDS + '/' + dataItem._id}>cards</Link>
            </div>
        )
    },

]