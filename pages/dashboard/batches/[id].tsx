import { ReactElement } from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import DashboardLayout from "../../../components/dashboardLayout";
import dbConnect from "../../../lib/dbConnect";
import batchModel from "../../../models/batchModel";

const SingleBatchPage = ({ batch }: any) => {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">{batch.batchCode}</h1>
                <ButtonToolbar className="mb-2 mb-md-0">
                    <Button variant="outline-secondary" size="sm">Create Batch</Button>
                </ButtonToolbar>
            </div>

        </>
    )
}

SingleBatchPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}

export async function getServerSideProps({ params }: any) {
    await dbConnect()

    const batch = await batchModel.findById(params.id).lean()
    batch._id = batch._id.toString()

    return { props: { batch } }
}

export default SingleBatchPage;