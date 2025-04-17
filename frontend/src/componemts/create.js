import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import Livemssgcontext from '../context/LivemssgContext'
import LivegrpContext from '../context/LivegrpConstext'


function Create() {
    let {users, getusers, auth , getfriends} = useContext(Livemssgcontext)
    let {create} = useContext(LivegrpContext)
    let ff = localStorage.getItem('token')
    let [creusers, setCreusers] = useState([ff])
    let [groupName, setGroupName] = useState('')

    useEffect(() => {
        getfriends()
    }, [])

    const toggleUser = (index) => {
        const token = auth[index]
        if (creusers.includes(token)) {
            setCreusers(creusers.filter(t => t !== token))
        } else {
            setCreusers([...creusers, token])
        }
        console.log(creusers)
    }


    const handleCreate = () => {
        // Here you could add logic to create the group with groupName and creusers
       create(groupName , creusers)
    }

    return (
        <div className="container py-5">
            <h1 className="text-center mb-5 fw-semibold text-dark animate-title">Create Group</h1>
            <div className="row justify-content-center g-4">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Group Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleFormControlInput1"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </div>
                {users.map((ele, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-4">
                        <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
                            <div className="card-body p-4 d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <div className="avatar-circle bg-primary text-white me-3">
                                        {ele.name.charAt(0).toUpperCase()}
                                    </div>
                                    <h5 className="card-title mb-0 fw-medium text-dark">
                                        {ele.name.charAt(0).toUpperCase() + ele.name.slice(1)}
                                    </h5>
                                </div>
                                <button 
                                    onClick={() => toggleUser(index)}
                                    className="btn btn-sm"
                                >
                                    {creusers.includes(auth[index]) ? 'Remove' : 'Add'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="col-12 text-center mt-4">
                    <button 
                        onClick={handleCreate}
                        className="btn btn-primary"
                        disabled={!groupName || creusers.length === 0}
                    >
                        Create Group
                        
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Create