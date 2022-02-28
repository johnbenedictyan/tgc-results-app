import { NextComponentType } from "next";
import { Form } from "react-bootstrap";
import styles from '../styles/DashboardLayout.module.css';

type Props = {
    children: NextComponentType
}

const DashboardLayout: NextComponentType<Props> = ({ children }) => (
    <>
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className={`${styles.navbarBrand} navbar-brand col-md-3 col-lg-2 me-0 px-3`} href="/dashboard">Trent Global College</a>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Form.Control className={`${styles.formControlDark} ${styles.navbarFormControl} form-control form-control-dark w-100`} type="text" placeholder="Search" aria-label="Search"></Form.Control>
            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                    <a className="nav-link px-3" href="">Sign out</a>
                </div>
            </div>
        </header>

        <div className="container-fluid">
            <div className="row">
                <nav id="sidebarMenu" className={`col-md-3 col-lg-2 d-md-block bg-light sidebar collapse ${styles.sidebar}`}>
                    <div className="position-sticky pt-5">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className={`nav-link active ${styles.sidebarNavLink}`} aria-current="page" href="/dashboard">
                                    Dashboard
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${styles.sidebarNavLink}`} href="/dashboard/batches">
                                    Batches
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${styles.sidebarNavLink}`} href="/dashboard/students">
                                    Students
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${styles.sidebarNavLink}`} href="/dashboard/staff">
                                    Staff
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${styles.sidebarNavLink}`} href="/dashboard/submissions">
                                    Submissions
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${styles.sidebarNavLink}`} href="/dashboard/tutorials">
                                    Tutorials
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    {children}
                </main>
            </div>
        </div>
    </>
)

export default DashboardLayout;