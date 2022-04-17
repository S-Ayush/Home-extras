import { memo, useEffect, useState } from "react";

import Overlay from "../../components/ui/overlay";
import Portal from "../../components/ui/portal";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import { toast } from "react-toastify";
import { addNewExtras, addNewHome } from "../../framework/rest-api/actions";

import "./styles.css";

function ExtrasAddForm({ onClose, show, modal }) {
  const [coverImg, setCoverImg] = useState(null);
  const [loadStatus, setLoadStatus] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  const resetValues = () => {
    setCoverImg(null);
    setLoadStatus(false);
  };

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "initial";
    return () => resetValues();
  }, [show]);

  const onCoverUpload = (e) => {
    setCoverImg(e.target.files[0]);
  };

  const handelInputChange = (e) => {
    let _formData = { ...formData, [e.target.name]: e.target.value };
    setFormData(_formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || formData.title.length < 3) {
      toast.error("Enter valid Extras title");
      return;
    }
    if (!formData.description || formData.description.length < 20) {
      toast.error(
        "Extras Description length should be greater than 20 characters"
      );
      return;
    }
    if (!formData.price || formData.price < 3) {
      toast.error("Enter valid Extras Price");
      return;
    }

    if (!coverImg) {
      toast.error("Please upload Extras image.");
      return;
    }

    setLoadStatus(true);
    const _formData = new FormData();
    _formData.append("title", formData.title);
    _formData.append("description", formData.description);
    _formData.append("price", formData.price);
    _formData.append("media", coverImg);
    console.log(_formData);

    addNewExtras(_formData)
      .then((res) => {
        toast.success("New Extras Added Successfully!");
        onClose();
      })
      .catch((ex) => toast.error(ex.response?.data || ex.message));
  };

  return (
    <>
      <Overlay show={modal === "extras" ? show : false} onClick={onClose} />
      <Portal isOpen={modal === "extras" ? show : false}>
        <div className="add-home-form add-form">
          <h2>Add Extras</h2>
          <form onSubmit={handleSubmit}>
            <label
              className="home-cover-input-label"
              htmlFor="home-cover-input"
            >
              {!coverImg && <span>Click to upload Extras Image</span>}

              {coverImg && (
                <>
                  <img
                    alt="Uploaded cover"
                    className="uploaded-cover-img"
                    src={URL.createObjectURL(coverImg)}
                  />
                </>
              )}
            </label>

            <Input
              id="home-cover-input"
              type="file"
              accept="image/*"
              className="home-cover-input"
              onChange={onCoverUpload}
            />

            <Input
              name="title"
              placeholder="Please Add Extras Title"
              onChange={handelInputChange}
            />
            <textarea
              name="description"
              placeholder="Please Add Extras Description"
              rows={6}
              onChange={handelInputChange}
            />
            <Input
              name="price"
              placeholder="Please Add Extras Price"
              onChange={handelInputChange}
            />
            <div style={{ flex: 1 }} />
            <Button disabled={loadStatus}>Add</Button>
          </form>
        </div>
      </Portal>
    </>
  );
}

export default memo(ExtrasAddForm);
