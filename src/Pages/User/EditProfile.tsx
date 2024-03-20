/* eslint-disable @typescript-eslint/no-explicit-any */
import eye from "/eye.png";
import camera from "/camera.png";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateProfile, useUploadMedia } from "../../hooks/mutations/user";

import { typeCreateProfile } from "../../utils/types";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending } = useUploadMedia();
  const { mutate: mutateCreateProfile, isPending: pendingCreateProfile } =
    useCreateProfile();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pictureId, setPictureId] = useState<number>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      setFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Create a URL for the file
    } else {
      setFile(null);
      setPreviewUrl(null); // Clear the preview
    }
  };

  const uploadFile = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please choose a file before uploading.");
      return;
    }

    const formData: any = new FormData();
    formData.append("file", file);

    mutate(formData, {
      onSuccess: (res) => {
        console.log(res);
        setPictureId(res.id);
        queryClient.invalidateQueries({
          queryKey: [`Login`],
        });
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const handleCreateProfile = () => {
    const dataToSend: typeCreateProfile = {
      firstName: firstName,
      lastName: lastName,
      ProfileSourceId: 1,
      PictureId: pictureId,
    };

    const data = {
      data: dataToSend,
      token: token,
    };

    console.log(dataToSend, token, pictureId);

    mutateCreateProfile(data, {
      onSuccess: (res) => {
        console.log(res);
        console.log(firstName, lastName);
        console.log(token);
        navigate("/");
        queryClient.invalidateQueries({
          queryKey: [`Login`],
        });
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div>
      <div className="px-[300px] sm:px-[20px]">
        {/* EDIT PROFILE */}
        <div className="pt-[20px] font-poppins text-[35px] sm:text-[30px] font-semibold">
          Edit Profile
        </div>

        {/*PICTURE UPLOAD */}
        <div className="flex flex-col items-center">
          <form>
            <div className="cursor-pointer flex items-center justify-center p-[10px]">
              <div className="relative">
                <input
                  className="hidden"
                  type="file"
                  id="fileInput"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleFileChange}
                  required
                />

                {previewUrl ? (
                  <label htmlFor="fileInput">
                    <img
                      src={previewUrl}
                      alt=""
                      className="cursor-pointer object-cover w-[85px] h-[85px] bg-gray-400 rounded-full flex items-center justify-center text-[50px] text-white"
                    />
                  </label>
                ) : (
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer w-[85px] h-[85px] bg-gray-400 rounded-full flex items-center justify-center text-[50px] text-white"
                  >
                    +
                  </label>
                )}

                <div className="absolute bottom-0 right-0 w-[35px] h-[35px] bg-[#008000] rounded-full flex items-center justify-center">
                  <img src={camera} alt="" width={25} />
                </div>
              </div>
            </div>
            <button
              onClick={uploadFile}
              className="px-[35px] py-[10px] bg-[#008000] rounded-[5px] text-white text-[15px] font-poppins font-semibold mb-[10px]"
            >
              {isPending ? "Loading..." : "Upload Image"}
            </button>
          </form>
        </div>

        {/* FORM */}
        <div>
          {/* FIRST NAME || LAST NAME */}
          <div className="w-[100%] flex flex-row justify-evenly gap-[60px] sm:gap-[20px] mt-[10px]">
            <div className="w-[100%] flex flex-col items-start">
              <p className="text-[#1C1C1C] font-poppins text-[20px] font-semibold">
                First Name
              </p>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-[100%] border-[2px] border-[#858585] outline-none rounded-[5px] px-[20px] py-[10px] text-[20px] font-medium"
              />
            </div>

            <div className="w-[100%] flex flex-col items-start">
              <p className="text-[#1C1C1C] font-poppins text-[20px] font-semibold">
                Last Name
              </p>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-[100%] border-[2px] border-[#858585] outline-none rounded-[5px] px-[20px] py-[10px] text-[20px] font-medium"
              />
            </div>
          </div>

          {/* CHANGE EMAIL */}
          <div className="w-[100%] flex flex-col items-start mt-[20px]">
            <p className="text-[#1C1C1C] font-poppins text-[20px] font-semibold">
              Email
            </p>

            <input
              type="email"
              placeholder="example@example.com"
              className="w-[100%] border-[2px] border-[#858585] outline-none rounded-[5px] px-[20px] py-[10px] text-[20px] font-medium"
            />

            <button
              disabled
              className="px-[35px] py-[10px] bg-[#008000] rounded-[5px] text-white text-[15px] font-poppins font-semibold mt-[25px]"
            >
              Change Email
            </button>
          </div>

          {/* CHANGE PASSWORD */}
          <div className="w-[100%] flex flex-col items-start mt-[20px]">
            <p className="text-[#1C1C1C] font-poppins text-[20px] font-semibold">
              Password
            </p>

            <div className="w-[100%] flex items-center border-[2px] border-[#858585] rounded-[5px] px-[10px]">
              <input
                name="password"
                type="password"
                placeholder="******************************"
                id="password"
                className="border-none outline-none bg-transparent w-[100%] border-[2px] border-[#858585] rounded-[5px] px-[20px] py-[10px] text-[20px] font-medium"
              />
              <div className="cursor-pointer">
                <img src={eye} alt="" />
              </div>
            </div>

            <button
              disabled
              className="px-[35px] py-[10px] bg-[#008000] rounded-[5px] text-white text-[15px] font-poppins font-semibold mt-[25px]"
            >
              Change Password
            </button>
          </div>
        </div>

        <div className="mt-[30px] flex flex-row items-center gap-[20px] justify-center">
          <button
            disabled
            className="w-[150px] border-[2px] border-[#008000] rounded-[5px] py-[7px] font-poppins text-[20px] font-normal text-[#008000]"
          >
            Cancel
          </button>

          <button
            onClick={handleCreateProfile}
            className="w-[150px] border-[2px] border-[#008000] bg-[#008000] rounded-[5px] py-[7px] font-poppins text-[20px] font-normal text-white"
          >
            {pendingCreateProfile ? "Loading..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
