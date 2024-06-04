import style from "../styles/CellStock.module.css";
import { EditIcon, DeleteIcon } from "../../../utils/Icons/icons";
import { deleteProductService } from "../services/deleteProductService";
import { useCustomDispatch, useCustomSelector } from "../../../store/hooks";
import { changeDeleteStatus } from "../redux/stockSlice";
import EditProductModal from "./EditProductModal";
import { useEffect, useState } from "react";
import { getProductByIdService } from "../services/getProductByIdService";

type Suplier = {
  id: string;
  company: string;
  tel: string;
  adviser: string;
  createdAt: Date;
  updatedAt: Date;
};

type ProductProps = {
  id: number;
  name: string;
  supliers: Suplier[];
  volume: number;
  maximum: number;
  createdAt: string;
  updatedAt: string;
  barCode: string;
  price: number;
  img: string;
  lastVolumeDate: string;
  bale: boolean | null;
  productId: number | null;
  onCheckboxChange: (product: { id: string; bale: boolean | null }) => void;
  percentage: number;
};

export default function CellStock({
  id,
  name,
  supliers,
  volume,
  maximum,
  createdAt,
  barCode,
  price,
  lastVolumeDate,
  bale,
  productId,
  onCheckboxChange,
  percentage,
}: ProductProps) {
  const dispatch = useCustomDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suplierNames, setSuplierNames] = useState<string>("");

  const deleteStatus = useCustomSelector((state) => state.stock.deleted);

  const [colorBackground, setColorBackground] = useState("");

  const handleCheckboxChange = () => {
    onCheckboxChange({ id: id.toString(), bale: bale });
  };

  useEffect(() => {
    const percentageVolume = 100 / (maximum / volume);
    if (percentage < 20) {
      setColorBackground(style.redBackground);
    }
    if (percentage > 20 && percentageVolume < 70) {
      setColorBackground(style.greyBackground);
    }
    if (percentage > 70) {
      setColorBackground(style.greenBackground);
    }
    console.log(colorBackground);
  }, [percentage]);

  useEffect(() => {
    const fetchSupliers = async () => {
      if (bale && productId) {
        try {
          const individualProduct = await getProductByIdService(productId);
          const arraySuppliersFromIndividual = individualProduct.supliers;
          const arrayStringSuppliers = arraySuppliersFromIndividual
            ? arraySuppliersFromIndividual
                .map((suplier: Suplier) => suplier.company)
                .join(", ")
            : "";
          setSuplierNames(arrayStringSuppliers);
        } catch (error) {
          console.error("Error al obtener el producto individual:", error);
        }
      } else {
        const arrayStringSuppliers = supliers
          ? supliers.map((suplier: Suplier) => suplier.company).join(", ")
          : "";
        setSuplierNames(arrayStringSuppliers);
      }
    };

    fetchSupliers();
  }, [deleteStatus]);

  const fromatedPrice = new Intl.NumberFormat("es-CO").format(price);

  const formattedDateCreate = new Date(createdAt).toLocaleDateString();
  const formattedDateLast = new Date(lastVolumeDate).toLocaleDateString();

  const handleDeleteProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const userConfirm = confirm(
      `¿Seguro desea eliminar el producto con id ${id}?`
    );
    let route = bale ? "bale" : "product";
    if (userConfirm) {
      deleteProductService(id, route);
      dispatch(changeDeleteStatus());
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={style.principalContainer}>
      <div className={style.prepertyContainer__check}>
        <input type="checkbox" name="" id="" onChange={handleCheckboxChange} />
      </div>
      <div className={style.prepertyContainer}>{id}</div>
      <div className={style.prepertyContainer}>{barCode}</div>
      <div className={style.prepertyContainer}>{name}</div>
      <div className={style.prepertyContainer}>{suplierNames}</div>
      <div className={`${style.prepertyContainer} ${colorBackground}`}>
        {volume}
      </div>
      <div className={style.prepertyContainer}>{maximum}</div>
      <div className={style.prepertyContainer}>{formattedDateCreate}</div>
      <div className={style.prepertyContainer}>{formattedDateLast}</div>
      <div className={style.prepertyContainer}>{fromatedPrice}</div>
      <div className={style.prepertyContainer_options}>
        <button
          className={style.prepertyContainer__btn}
          onClick={handleDeleteProduct}
        >
          <DeleteIcon className={style.prepertyContainer__deleteIcon} />
        </button>
        <button
          className={style.prepertyContainer__btn}
          onClick={handleOpenModal}
        >
          <EditIcon className={style.prepertyContainer__editIcon} />
        </button>
      </div>
      {isModalOpen && (
        <EditProductModal id={id} bale={bale} onClose={handleOpenModal} />
      )}
    </div>
  );
}
