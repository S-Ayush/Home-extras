import { useState } from "react";
import HomesLayout from "../components/layouts/homes";
import Button from "../components/ui/button";
import ExtrasAddForm from "../containers/homes/extras-add-form";
import HomeAddForm from "../containers/homes/home-add-form";

function HomePage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [openModal, setOpenModal] = useState("home");

  const toggleAddModal = () => setShowAddModal((cur) => !cur);

  return (
    <>
      <HomeAddForm
        show={showAddModal}
        onClose={toggleAddModal}
        modal={openModal}
      />
      <ExtrasAddForm
        show={showAddModal}
        onClose={toggleAddModal}
        modal={openModal}
      />

      <HomesLayout>
        <div className="content-wrapper">
          <div className="new-home-wrapper">
            <Button
              onClick={() => {
                toggleAddModal();
                setOpenModal("home");
              }}
            >
              Add Home
            </Button>
            <Button
              onClick={() => {
                toggleAddModal();
                setOpenModal("extras");
              }}
            >
              Add Extras
            </Button>
          </div>
        </div>
      </HomesLayout>
    </>
  );
}

export default HomePage;
