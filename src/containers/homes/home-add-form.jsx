import { memo, useEffect, useState } from "react";

import Overlay from "../../components/ui/overlay";
import Portal from "../../components/ui/portal";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import { toast } from "react-toastify";
import {
  addNewHome,
  fetchExtrasItemForHomeForm,
} from "../../framework/rest-api/actions";

function HomeAddForm({ onClose, show, modal }) {
  const [coverImg, setCoverImg] = useState(null);
  const [loadStatus, setLoadStatus] = useState(false);
  const [extras, setExtras] = useState();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    extras: { free: [], paid: [] },
  });

  const resetValues = () => {
    setCoverImg(null);
    setLoadStatus(false);
  };

  useEffect(() => {
    if (show) {
      fetchExtrasItemForHomeForm()
        .then((res) => {
          setExtras(res.data);
          console.log(res.data);
        })
        .catch((ex) => toast.error(ex.response?.data || ex.message));
    }
  }, [show]);

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

  const handleCheckBoxChange = (e) => {
    if (e.target.checked) {
      let _extras = { ...formData.extras };
      _extras[e.target.name].push(e.target.value);
      let _formData = { ...formData, extras: _extras };
      setFormData(_formData);
    } else {
      let _extras = { ...formData.extras };
      const index = _extras[e.target.name].findIndex(
        (item) => item === e.target.value
      );
      _extras[e.target.name].splice(index, 1);
      let _formData = { ...formData, extras: _extras };
      setFormData(_formData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || formData.title.length < 3) {
      toast.error("Enter valid home title");
      return;
    }
    if (!formData.description || formData.description.length < 20) {
      toast.error(
        "Home Description length should be greater than 20 characters"
      );
      return;
    }
    if (!formData.location || formData.location.length < 3) {
      toast.error("Enter valid home location");
      return;
    }
    if (!formData.price || formData.price < 3) {
      toast.error("Enter valid home Price");
      return;
    }

    if (!coverImg) {
      toast.error("Please upload Home image.");
      return;
    }

    setLoadStatus(true);
    const _formData = new FormData();
    _formData.append("title", formData.title);
    _formData.append("description", formData.description);
    _formData.append("location", formData.location);
    _formData.append("price", formData.price);
    _formData.append("extras", JSON.stringify(formData.extras));
    _formData.append("media", coverImg);
    console.log(_formData);

    addNewHome(_formData)
      .then((res) => {
        toast.success("New Home Added Successfully!");
        onClose();
      })
      .catch((ex) => toast.error(ex.response?.data || ex.message));
  };

  return (
    <>
      <Overlay show={modal === "home" ? show : false} onClick={onClose} />
      <Portal isOpen={modal === "home" ? show : false}>
        <div className="add-home-form add-form">
          <h2>Add Home</h2>
          <form onSubmit={handleSubmit}>
            <label
              className="home-cover-input-label"
              htmlFor="home-cover-input"
            >
              {!coverImg && <span>Click to upload Home Image</span>}

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
              placeholder="Please Add Home Title"
              onChange={handelInputChange}
            />
            <textarea
              name="description"
              placeholder="Please Add Home Description"
              rows={6}
              onChange={handelInputChange}
            />
            <Input
              name="location"
              placeholder="Please Add Home Location"
              onChange={handelInputChange}
            />
            <Input
              name="price"
              placeholder="Please Add Home Price"
              onChange={handelInputChange}
            />
            <div className="extras">
              <h3>Extras</h3>
              {extras &&
                Object.entries(extras?.Extras).map((data) => {
                  return (
                    <div className="free">
                      <h4>{data[0].toUpperCase()}</h4>
                      <div className="selectItem">
                        {data[1].map((item) => {
                          return (
                            <div>
                              <input
                                type="checkbox"
                                name={data[0]}
                                value={item}
                                id={item}
                                onChange={handleCheckBoxChange}
                              />
                              <label htmlFor={item}>{item}</label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div style={{ flex: 1 }} />
            <Button disabled={loadStatus}>Add</Button>
          </form>
        </div>
      </Portal>
    </>
  );
}

export default memo(HomeAddForm);
