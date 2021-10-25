import React, {FC, useEffect, useState} from 'react'
import {useTypedSelector} from '../../hooks/hooks'
import {useDispatch, useSelector} from 'react-redux'
import {changeUsersInfo, checkAuth} from '../../store/reducers/auth-reducer'
import {Redirect} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import {CardPacksType} from "../../api/packs-api";
import Packs from "../Packs/Packs";
import {RootState} from "../../store/store";

export const Profile: FC = () => {
    const isLoggedIn = useTypedSelector(state => state.auth.isLoggedIn)
    const {userInfo} = useTypedSelector(state => state.auth)
    const packs = useSelector<RootState, Array<CardPacksType>>(state => state.pack)
    // const packs = useTypedSelector<Array<CardPacksType>>(state => state.pack)
    const dispatch = useDispatch()

    const [newName, setNewName] = useState('')
    const [newAvatar, setNewAvatar] = useState('')

    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    if (!isLoggedIn) return <Redirect to={PATH.LOGIN}/>

    const onSubmitHandler = () => {
        dispatch(changeUsersInfo({name: newName, avatar: newAvatar}))
    }

    return (
        <div>
            <h1>Profile</h1>

            {userInfo && <div>
                <img src={userInfo.avatar}
                     alt={userInfo.name}
                     style={{maxHeight: 400}}/>
                <div>{userInfo.name}</div>
                <div>{userInfo.publicCardPacksCount}</div>

                <div>
                    <input type='text' placeholder={'New Name'} value={newName}
                           onChange={e => setNewName(e.currentTarget.value)}/>

                    <input type='text' placeholder={'New Avatar URL'} value={newAvatar}
                           onChange={e => setNewAvatar(e.currentTarget.value)}/>
                    <button onClick={onSubmitHandler}>Change info</button>
                </div>
                <div>
                    {
                        packs.map(p => {
                            return <div>
                                <Packs
                                    _id={p._id}
                                    user_id={p.user_id}
                                    name={p.name}
                                    cardsCount={p.cardsCount}
                                    created={p.created}
                                    updated={p.updated}
                                />
                            </div>
                        })
                    }
                </div>

            </div>}
        </div>
    )
}