import {Button} from '../../components/UI/Button/Button'
import {PATH} from '../../routes/routes'
import {Link} from 'react-router-dom'
import {TableModel} from '../../components/UI/Table/Table'
import {CardsPack} from '../../api/packs-api'

export const packsModel = (add: () => void, remove: (id: number) => void, update: (id: number) => void): TableModel[] => [
    {
        title: index => <div key={'name-title-' + index}>Name</div>,
        render: (dataItem: CardsPack) => <div key={'name-cell-' + dataItem._id}>{dataItem.name}</div>
    },
    {
        title: index => <div key={'cardsCount-title-' + index}>Cards count</div>,
        render: (dataItem: CardsPack) => <div key={'cardsCount-cell-' + dataItem._id}>{dataItem.cardsCount}</div>
    },
    {
        title: index => <div key={'updated-title-' + index}>Updated</div>,
        render: (dataItem: CardsPack) => <div key={'updated-cell-' + dataItem._id}>{dataItem.updated.slice(5, 16)}</div>
    },
    {
        title: index => <div key={'url-title-' + index}>URL</div>,
        render: (dataItem: CardsPack) => <div key={'url-cell-' + dataItem._id}>{'deckCover'}</div>
    },
    {
        title: index => <div key={'buttons-title-' + index}><Button onClick={add}>Add</Button></div>,
        render: (dataItem: CardsPack) => <div key={'buttons-cell-' + dataItem._id}>
            <Button onClick={() => remove(dataItem._id)}>Delete</Button>
            <Button onClick={() => update(dataItem._id)}>Update</Button>
            <Link to={PATH.CARDS + '/' + dataItem._id}>Cards</Link>
        </div>
    },

]