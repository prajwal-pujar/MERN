import React, { useEffect } from 'react'
import LivegrpContext from '../context/LivegrpConstext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

function Grpfrt() {
    const { get, users , set , loading} = useContext(LivegrpContext)
    let navi = useNavigate()

    useEffect(() => {
        get()
    }, [])

    const sub = (index) => {
        set(index)
        navi('../grpmssg')
    }
    
    return (
        <>
            <div className="container py-5">
                <h1 className="text-center mb-5 fw-semibold text-dark animate-title">Your Groups</h1>
                     {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-2">Fetching friends...</p>
        </div>) :
                users.length === 0 ? (
                    <div className="text-center">
                        <p className="text-muted fs-4">No groups participated</p>
                    </div>
                ) : (
                    <div className="row justify-content-center g-4">
                        {users.map((ele, index) => (
                            <div key={index} className="col-12 col-md-6 col-lg-4">
                                <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
                                    <div className="card-body p-4 d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <h5 className="card-title mb-0 fw-medium text-dark">
                                                {ele.charAt(0).toUpperCase() + ele.slice(1)}
                                            </h5>
                                        </div>
                                        <button 
                                            onClick={() => sub(index)} 
                                            className="btn btn-outline-primary btn-sm px-3 py-1"
                                        >
                                            Message
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Grpfrt
