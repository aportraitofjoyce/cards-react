import {Button} from '../../components/UI/Button/Button'
import {PATH} from '../../routes/routes'
import {Link} from 'react-router-dom'
import {TableModel} from '../../components/UI/Table/Table'
import {CardsPack} from '../../api/packs-api'

export const packsModel = (add: () => void, remove: (id: string) => void, update: (id: string) => void): TableModel[] => [
    {
        title: index => <div key={'name-title-' + index}>Pack Name</div>,
        render: (item: CardsPack) => <div key={'name-cell-' + item._id}>{item.name}</div>
    },
    {
        title: index => <div key={'userName-title-' + index}>User Name</div>,
        render: (item: CardsPack) => <div key={'name-cell-' + item.user_name}>{item.user_name}</div>
    },
    {
        title: index => <div key={'cardsCount-title-' + index}>Cards count</div>,
        render: (item: CardsPack) => <div key={'cardsCount-cell-' + item._id}>{item.cardsCount}</div>
    },
    {
        title: index => <div key={'updated-title-' + index}>Updated</div>,
        render: (item: CardsPack) => <div key={'updated-cell-' + item._id}>{item.updated.slice(5, 16)}</div>
    },
    {
        title: index => <div key={'buttons-title-' + index}><Button onClick={add}>Add</Button></div>,
        render: (item: CardsPack) => <div key={'buttons-cell-' + item._id}>
            <Button onClick={() => remove(item._id)}>Delete</Button>
            <Button onClick={() => update(item._id)}>Update</Button>
            <Link to={PATH.CARDS + '/' + item._id}>Cards</Link>
        </div>
    },

]