import React, { useState } from "react";

import "../styles/Popup.css";

const Popup = ({ product, onClose, setSearchTerm, addProducts,items }) => {
 

  const [arr,setArr] = useState(items);

  const addProduct = (newObj,chk)=>{
    console.log({chk})
    if(chk){
        if(arr.includes(newObj)){
            return ;
        }
        setArr(arr.concat(newObj))

    }else{
        if(arr.includes(newObj)){
            setArr(arr.filter(item => item !== newObj))
            return ;
        }
        setArr(arr.filter(item => item === newObj))
    }
  }

  console.log({arr})



  return (
    <>
      <div className="popupArea">
        <div className="sessionItem">
          <div className="row px-4 pt-2">
            <div
              className="col-11"
              style={{ fontWeight: "500", fontSize: "18px" }}
            >
              Select Products
            </div>
            <div
              className="col-1"
              style={{ fontWeight: "500", fontSize: "18px", cursor: "pointer" }}
              onClick={onClose}
            >
              <i className="fa fa-close"></i>
            </div>
          </div>

          <div className="text-center inptContainer py-2 mb-2">
            <div className="searchContainer mx-auto">
              <span class="searchIcon">
                <i className="fa fa-search"></i>
              </span>
              <input
                type="text"
                className="searchInput"
                placeholder="Search Products"
                style={{ fontWeight: "400", fontSize: "14px" }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div style={{ overflowY: "auto", overflowX: "hidden" }}>
            {product?.map((item, index) => {
              return (
                <>
                  <div className="d-flex px-3 w-100">
                    <input
                      type="checkbox"
                      checked={arr.includes(item)}
                      onChange={(e) =>
                        addProduct(item, e.target.checked)
                      }
                    />
                    <img
                      className="ms-3"
                      src={item.image}
                      alt=""
                      style={{
                        border: "1px solid grey",
                        width: "30px",
                        height: "25px",
                        borderRadius: "2px",
                      }}
                    />
                    <div
                      className="ms-2"
                      style={{ fontWeight: "400", fontSize: "16px" }}
                    >
                      {item.title}
                    </div>
                  </div>
                  <hr />

                  {item?.variants?.map((options, itr) => {
                    // console.log({options})
                    return (
                      <>
                        <div className="d-flex px-3 ms-5 w-100">
                          <input
                            type="checkbox"
                            // checked={
                            //   checkedItems[item.id]?.variants?.find(
                            //     (variant) => variant.id === options.id
                            //   )?.isChecked || false
                            // }
                            onChange={(e) =>
                              addProduct(
                                item,
                                e.target.checked
                              )
                            }
                           
                          />

                          <div
                            className="ms-2"
                            style={{ fontWeight: "400", fontSize: "16px" }}
                          >
                            {options.title}
                          </div>

                          <div
                            className="ms-auto me-5 pe-3"
                            style={{ fontWeight: "400", fontSize: "16px" }}
                          >
                            <span className="me-5">
                              {options?.inventory_quantity > 0
                                ? options?.inventory_quantity
                                : 0}{" "}
                              available
                            </span>
                            ${options.price}
                          </div>
                        </div>
                        <hr />
                      </>
                    );
                  })}
                </>
              );
            })}
          </div>

          <div
            className="p-2 d-flex w-100"
            style={{
              fontWeight: "500",
              fontSize: "16px",
              borderTop: "1px solid lightgrey",
              color: "#000000",
            }}
          >
            <div>Product Selected</div>

            <button
              className="btnCancel py-1 px-4 ms-auto me-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="btnAddd py-1 px-4" onClick={()=>addProducts(arr)}>Add</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
