import style from "../styles/EditProductModal.module.css"

export default function EditProductModal(){
    return (
        <div className={style.modalOverlay}>
          <div className={style.principalContainer}>
            <div className={style.closeButtonContainer}>
              <button className={style.closeButton} onClick={handleClose}>
                X
              </button>
            </div>
    
            <form
              onSubmit={handleSubmit}
              className={style.formContainer}
              onKeyDown={(e) => {
                if (e.key == "Enter") e.preventDefault();
              }}
            >
              <h2 className={style.formContainer__h2}>Crear Producto</h2>
    
              <div className={style.inputContainer}>
                {" "}
                <label htmlFor="inputBarCode" className={style.form__label}>
                  Cod. Barras
                </label>
                <input
                  ref={(el) => (inputRefs.current[0] = el)}
                  onKeyDown={(e) => handleInputEnterBarCode(e, 0)}
                  onChange={(e) =>
                    setNewProduct((prevState) => ({
                      ...prevState,
                      barCode: e.target.value,
                    }))
                  }
                  value={newProduct.barCode}
                  type="text"
                  id="inputBarCode"
                  className={style.form__inputText}
                />
              </div>
              <div className={style.inputContainer}>
                <label htmlFor="inputName" className={style.form__label}>
                  Nombre *
                </label>
                <input
                  ref={(el) => (inputRefs.current[1] = el)}
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct((prevState) => ({
                      ...prevState,
                      name: e.target.value,
                    }))
                  }
                  type="text"
                  id="inputName"
                  className={style.form__inputText}
                />
              </div>
    
              <div className={style.inputContainer}>
                <label htmlFor="inputPrice" className={style.form__label}>
                  Precio *
                </label>
                <input
                  value={Number(newProduct.price)}
                  onChange={(e) =>
                    setNewProduct((prevState) => ({
                      ...prevState,
                      price: Number(e.target.value),
                    }))
                  }
                  type="text"
                  id="inputPrice"
                  className={style.form__inputText}
                />
              </div>
              <div className={style.inputContainer}>
                {" "}
                <label htmlFor="inputVolume" className={style.form__label}>
                  Inventario *
                </label>
                <input
                  value={Number(newProduct.volume)}
                  onChange={(e) =>
                    setNewProduct((prevState) => ({
                      ...prevState,
                      volume: Number(e.target.value),
                    }))
                  }
                  type="text"
                  id="inputVolume"
                  className={style.form__inputText}
                />
              </div>
              <div className={style.inputContainer}>
                <label htmlFor="inputMaximum" className={style.form__label}>
                  Tope *
                </label>
                <input
                  value={Number(newProduct.maximum)}
                  onChange={(e) =>
                    setNewProduct((prevState) => ({
                      ...prevState,
                      maximum: Number(e.target.value),
                    }))
                  }
                  type="text"
                  name=""
                  id="inputMaximum"
                  className={style.form__inputText}
                />
              </div>
              <div className={style.inputContainer}>
                <label htmlFor="inputType" className={style.form__label}>
                  Clasificación *
                </label>
                <div className={style.clasificationContainer}>
                  <select
                    className={`${style.form__select} ${style.form__select_clas}`}
                    defaultValue={""}
                    name="inputType"
                    id="inputType"
                    onChange={handleTypeSelection}
                  >
                    <option value="">Seleccionar tipo</option>
                    {types.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className={style.principalContainer__btn}
                    onClick={handleButtonClickCreateType}
                  >
                    <AddIcon className={style.principalContainer__icon} />
                  </button>
                </div>
              </div>
              <div className={style.inputContainer}>
                {" "}
                <label htmlFor="inputImg" className={style.form__label}>
                  URL Imagen
                </label>
                <input
                  value={newProduct.img}
                  onChange={(e) =>
                    setNewProduct((prevState) => ({
                      ...prevState,
                      img: e.target.value,
                    }))
                  }
                  type="text"
                  id="inputImg"
                  className={style.form__inputText}
                />
              </div>
              <div className={style.inputContainer}>
                <div>
                  <label htmlFor="inputSpent" className={style.form__label}>
                    Verdura
                  </label>
                  <input
                    checked={newProduct.spent}
                    onChange={(e) =>
                      setNewProduct((prevState) => ({
                        ...prevState,
                        spent: e.target.checked,
                      }))
                    }
                    type="checkbox"
                    name=""
                    id="inputSpent"
                  />
                </div>
                <div>
                  <label htmlFor="individualRadio">
                    Individual
                    <input
                      defaultChecked
                      type="radio"
                      name="tipo"
                      id="individualRadio"
                      value="individual"
                      onChange={handleProductTypeChange}
                    />
                  </label>
                  <label htmlFor="pacaRadio">
                    Paca
                    <input
                      type="radio"
                      name="tipo"
                      id="pacaRadio"
                      value="paca"
                      onChange={handleProductTypeChange}
                    />
                  </label>
                </div>
              </div>
              {productType === "paca" && (
                <div className={style.baleContainer}>
                  <div className={style.inputContainer}>
                    <label
                      htmlFor="inputIndividualId"
                      className={style.form__label}
                    >
                      ID del producto individual
                    </label>
                    <div className={style.searchContainer}>
                      <input
                        onChange={(e) =>
                          setNewProduct((prevState) => ({
                            ...prevState,
                            productId: Number(e.target.value),
                          }))
                        }
                        value={individualProductId.id}
                        type="text"
                        id="inputIndividualId"
                        className={style.form__inputText}
                        disabled
                      />
                      <button
                        type="button"
                        className={style.principalContainer__btn}
                        onClick={handleButtonClickSearchModal}
                      >
                        <SearchIcon className={style.principalContainer__icon} />
                      </button>
                    </div>
                  </div>
                  <div className={style.inputContainer}>
                    <label
                      htmlFor="inputIndividualQuan"
                      className={style.form__label}
                    >
                      Numero de productos individuales
                    </label>
                    <input
                      value={Number(newProduct.individualQuanty)}
                      onChange={(e) =>
                        setNewProduct((prevState) => ({
                          ...prevState,
                          individualQuanty: Number(e.target.value),
                        }))
                      }
                      type="text"
                      id="inputIndividualQuan"
                      className={style.form__inputText}
                    />
                  </div>
                </div>
              )}
              <label htmlFor="inputSuppliers" className={style.form__label}>
                Proveedores
              </label>
              <Select
                isDisabled={newProduct.bale ? true : false}
                className={style.form__select}
                options={suppliersOptions}
                isMulti
                onChange={handleSupplierSelection}
              />
    
              <button type="submit" className={style.formContainer__btn}>
                Crear producto
              </button>
              {!isSearchModalopen && (
                <SearchSide onClose={handleOpenSearchModal} isModal={true} />
              )}
            </form>
            {!isCreateTypeModalOpen && (
              <CreateTypeModal onClose={handleOpenCreateTypeModal} />
            )}
          </div>
        </div>
}