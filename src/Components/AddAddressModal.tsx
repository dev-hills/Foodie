/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Modal from "react-modal";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useCreateUserAddress } from "../hooks/mutations/user";
import { useQueryClient } from "@tanstack/react-query";

// import { useState } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    paddingLeft: "200px",
    paddingRight: "200px",
    filter: "drop-shadow(6px 4px 25px #000000)",
  },
};

const AddAddressModal = ({ openAddressModal, setOpenAddressModal }: any) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { mutate } = useCreateUserAddress(token);
  const [address, setAddress] = useState<string>("");
  const queryClient = useQueryClient();

  function closeModal() {
    setOpenAddressModal(false);
  }

  const submit = (e) => {
    e.preventDefault();
    const dataToSend: any = {
      description: address,
      is_default: true,
    };

    mutate(dataToSend, {
      onSuccess: (res) => {
        console.log(res);
        setOpenAddressModal(false);
        queryClient.invalidateQueries({
          queryKey: [`getUserAddresses`],
        });

        {
          toast.success(`Address Created Successfully`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          navigate("/confirmOrder");
        }
      },
      onError: (err: any) => {
        console.log(err);
        if (err?.response?.status === 401) {
          toast.error(`Expired/Invalid Credentials`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      },
    });
  };

  return (
    <div>
      <Modal
        isOpen={openAddressModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col items-center gap-[10px]">
          <h1 className="font-sansPro text-center text-[23px] mb-[30px] font-semibold">
            Enter your delivery address
          </h1>
          <div className="border-[2px] border-[rgba(0, 0, 0, 0.26)] rounded-[12px] px-[10px]">
            <input
              type="text"
              value={address}
              placeholder="Hall Name | Room Number"
              onChange={(e) => setAddress(e.target.value)}
              className="text-center text-[20px] tracking-widest border-none outline-none bg-transparent px-[10px] h-[50px] w-[480px] sm:w-[100%]"
            />
          </div>
          <button
            onClick={submit}
            className="bg-[#008000] rounded-[22px] py-[10px] px-[158px] sm:px-[120px] mt-[20px] w-[400px] text-white flex items-center justify-center font-poppins font-medium text-[18px] leading-normal"
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddAddressModal;
