import React from 'react'
import Layout from '../../components/Layout/Layout.js'
import UserMenu from '../../components/Layout/UserMenu.js'

const Orders = () => {
    return (
        <Layout title={'Your Orders'}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>All orders</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders