import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
const CreateCategory = () => {
    return (
        <Layout title={'Dashboard -Create Category'}>
            <div className="row mt-3">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9 text-center">
                    <h1>Create Category</h1>
                </div>
            </div>

        </Layout>

    )
}

export default CreateCategory