import AddClientModal from "../components/AddClientModal";
import AddProjectModal from "../components/AddProject";
import Clients from "../components/Clients";
import Projects from "../components/Projects";

export default function Home(){
    return(
        <>
            <div className="d-flex gap-3 mb-4">
                <AddProjectModal/>
                <AddClientModal/>
            </div>
            <Projects/>
            <hr />
            <Clients/>
        </>
    )
}