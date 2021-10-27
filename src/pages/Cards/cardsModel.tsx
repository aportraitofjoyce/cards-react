import {Button} from '../../components/UI/Button/Button'
import {TableModel} from '../../components/UI/Table/Table'
import {Card} from '../../api/cards-api'

export const cardsModel = (add: () => void, remove: (id: string) => void, update: (id: string) => void): TableModel[] => [
    {
        title: index => <div key={'question-title-' + index}>Question</div>,
        render: (item: Card) => <div key={'question-cell-' + item._id}>{item.question}</div>
    },
    {
        title: index => <div key={'answer-title-' + index}>Answer</div>,
        render: (item: Card) => <div key={'answer-cell-' + item._id}>{item.answer}</div>
    },
    {
        title: index => <div key={'update-title-' + index}>Updated</div>,
        render: (item: Card) => <div key={'update-cell-' + item._id}>{item.updated.slice(5, 16)}</div>
    },
    {
        title: index => <div key={'buttons-title-' + index}><Button onClick={add}>Add</Button></div>,
        render: (item: Card) => <div key={'buttons-cell-' + item._id}>
            <Button onClick={() => remove(item._id)}>Delete</Button>
            <Button onClick={() => update(item._id)}>Update</Button>
        </div>
    },

]