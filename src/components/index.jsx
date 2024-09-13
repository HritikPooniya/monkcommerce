import React, { useEffect, useState } from "react";
import "../styles/global.css";
import Popup from "./popup";
import axios from "axios";

const Index = () => {
  const [product, setProduct] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [trgt, setTrgt] = useState(false);
  const [addDiscount, setAddDiscount] = useState();
  const [showVarants, setShowVariants] = useState();

  const [popup, setPopup] = useState(false);
  const onClose = () => {
    setPopup(false);
  };

  const [items, setItems] = useState([]);

  const addProducts = (getArr) => {
    setItems(getArr);
    setPopup(false);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
       const response = await axios.get("https://stageapi.monkcommerce.app/task/products/search", {
  headers: {
    Accept: "application/json",
    "x-api-key": "72njgfa948d9aS7gs5",
  },
});
        setProduct(response?.data);
        // Process response data here
      } catch (error) {
        console.error("Fetching product failed:", error);
      }
    };

    fetchProduct();
  }, []);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `/task/products/search?search=${encodeURIComponent(searchTerm)}`,
          {
            headers: {
              Accept: "application/json",
              "x-api-key": "72njgfa948d9aS7gs5",
            },
          }
        );
        setProduct(response?.data);
        // Process response data here
      } catch (error) {
        console.error("Fetching product failed:", error);
      }
    };

    if (searchTerm !== "") {
      // Only fetch if there's a search term
      fetchProduct();
    }
  }, [searchTerm]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = e.dataTransfer.getData("text/plain");
    const updatedItems = [...items];

    const [removed] = updatedItems.splice(dragIndex, 1);
    updatedItems.splice(dropIndex, 0, removed);

    setItems(updatedItems);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  console.log({ items });

  return (
    <div className="mainContainer">
      <article className="mb-4 ms-5">Add Products</article>

      <div className="d-flex justify-content-evenly">
        <div className="text-center mb-3 block">Product</div>

        <div className="mb-3 ms-5 ps-4 block">Discount</div>
      </div>

      <ol>
        {items.length > 0 ? (
          items.map((item, index) => (
            <>
              <li
                key={item.id}
                className="d-flex gap-3 align-items-center mb-2"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={handleDragOver}
              >
                <img src="/assets/threedots.svg" alt="Drag Handle" />
                <div style={{ fontWeight: "400", fontSize: "14px" }}>
                  {index + 1}.
                </div>
                <div className="input justify-content-between">
                  <input
                    type="text"
                    placeholder="Select Product"
                    style={{ border: "none" }}
                    value={item?.title}
                  />
                  <i
                    className="fa fa-pencil"
                    onClick={() => setPopup(true)}
                    style={{
                      cursor: "pointer",
                      color: "grey",
                      marginLeft: "10%",
                    }}
                  ></i>
                </div>
                {addDiscount !== item.id && (
                  <button
                    className="btn"
                    onClick={() => setAddDiscount(item.id)}
                  >
                    Add Discount
                  </button>
                )}
                {addDiscount === item.id && (
                  <>
                    <input
                      type="number"
                      style={{
                        width: "100px",
                        fontSize: "16px",
                        padding: "4px",
                      }}
                      placeholder="0"
                    ></input>
                    <select
                      name=""
                      id=""
                      style={{
                        width: "100px",
                        fontSize: "16px",
                        padding: "4px",
                      }}
                    >
                      <option value="% off">% off</option>
                      <option value="Flat">Flat off</option>
                    </select>
                    <div
                      onClick={() => setAddDiscount("")}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fa fa-close" />
                    </div>
                  </>
                )}
              </li>
              <div
                className="ms-auto text-end"
                style={{
                  color: "#006EFF",
                  fontSize: "16px",
                  fontWeight: "400",
                  cursor: "pointer",
                }}
              >
                {showVarants !== item?.id ? (
                  <div
                    onClick={() => {
                      setShowVariants(item?.id);
                    }}
                  >
                    {" "}
                    Show Variants <i className="fa fa-angle-down"></i>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setShowVariants('');
                    }}
                  >
                    {" "}
                    Hide Variants <i className="fa fa-angle-up"></i>
                  </div>
                )}
              </div>
              <ol>
                {showVarants === item?.id &&
                  item?.variants?.map((val, itr) => {
                    return (
                      <>
                        <li
                          className="d-flex gap-3 align-items-center mb-2"
                          draggable
                          onDragStart={(e) => handleDragStart(e, index)}
                          onDrop={(e) => handleDrop(e, index)}
                          onDragOver={handleDragOver}
                        >
                          <img src="/assets/threedots.svg" alt="Drag Handle" />
                          <div style={{ fontWeight: "400", fontSize: "14px" }}>
                            {itr + 1}.
                          </div>
                          <div
                            className="input justify-content-between px-3"
                            style={{ border: "none", borderRadius: "24px" }}
                          >
                            <input
                              type="text"
                              placeholder="Select Product"
                              style={{ border: "none", borderRadius: "24px" }}
                              value={val?.title}
                            />
                          </div>
                          {addDiscount !== val.id && (
                            <button
                              className="btn"
                              onClick={() => setAddDiscount(val.id)}
                            >
                              Add Discount
                            </button>
                          )}
                          {addDiscount === val.id && (
                            <>
                              <input
                                type="number"
                                style={{
                                  width: "100px",
                                  fontSize: "16px",
                                  padding: "4px",
                                }}
                                placeholder="0"
                              ></input>
                              <select
                                name=""
                                id=""
                                style={{
                                  width: "100px",
                                  fontSize: "16px",
                                  padding: "4px",
                                }}
                              >
                                <option value="% off">% off</option>
                                <option value="Flat">Flat off</option>
                              </select>
                              <div
                                onClick={() => setAddDiscount("")}
                                style={{ cursor: "pointer" }}
                              >
                                <i className="fa fa-close" />
                              </div>
                            </>
                          )}
                        </li>
                      </>
                    );
                  })}
              </ol>
            </>
          ))
        ) : (
          <li className="d-flex gap-3 align-items-center mb-2">
            <img src="/assets/threedots.svg" alt="Drag Handle" />
            <div style={{ fontWeight: "400", fontSize: "14px" }}>{1}.</div>
            <div className="input justify-content-between">
              <input
                type="text"
                placeholder="Select Product"
                style={{ border: "none" }}
              />
              <i
                className="fa fa-pencil"
                onClick={() => setPopup(true)}
                style={{ cursor: "pointer", color: "grey", marginLeft: "10%" }}
              ></i>
            </div>
            {!trgt && (
              <button className="btn" onClick={() => setTrgt(true)}>
                Add Discount
              </button>
            )}
            {trgt && (
              <>
                <input
                  type="number"
                  style={{ width: "100px", fontSize: "16px", padding: "4px" }}
                  placeholder="0"
                ></input>
                <select
                  name=""
                  id=""
                  style={{ width: "100px", fontSize: "16px", padding: "4px" }}
                >
                  <option value="% off">% off</option>
                  <option value="Flat">Flat off</option>
                </select>
              </>
            )}
          </li>
        )}
      </ol>

      <div className="text-end mt-4">
        <button className="btnAdd" onClick={() => setPopup(true)}>
          Add Product
        </button>
      </div>
      {popup && (
        <Popup
          product={product}
          onClose={onClose}
          setSearchTerm={setSearchTerm}
          addProducts={addProducts}
          items={items}
        />
      )}
    </div>
  );
};

export default Index;
