import Link from "next/link";
import { ReactElement } from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import DashboardLayout from "../../../../components/dashboardLayout";
import dbConnect from "../../../../lib/dbConnect";
import tutorialModel from "../../../../models/tutorialModel";

const SingleTutorialPage = ({ tutorial }: any) => {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">{tutorial.tutorialCode}</h1>
                <ButtonToolbar className="mb-2 mb-md-0">
                    <Link href="/dashboard/tutorials/[id]/edit" as={`/dashboard/tutorials/${tutorial._id}/edit`}>
                        <Button variant="outline-secondary" size="sm">Edit Tutorial</Button>
                    </Link>
                </ButtonToolbar>
            </div>

        </>
    )
}

SingleTutorialPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}

export async function getServerSideProps({ params }: any) {
    await dbConnect()

    const tutorial = await tutorialModel.findById(params.id).lean()
    tutorial._id = tutorial._id.toString()

    return { props: { tutorial } }
}

export default SingleTutorialPage;