import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import { useRegisterMutation } from "../redux/slices/api/authApislice";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../redux/slices/api/userApiSlice";

const AddUser = ({ open, setOpen, userData }) => {
  let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const dispatch = useDispatch();
  const [addNewUser, { isLoading }] = useRegisterMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const handleOnSubmit = async (data) => {
    try {
      if (userData) {
        const result = await updateUser(data).unwrap();
        toast.success(result?.message);
        if (userData?._id === user?._id) {
          dispatch(setCredentials({ ...result.user }));
        }
      } else {
        await addNewUser({ ...data, password: data.email }).unwrap();
        toast.success("New User added successfully");
      }
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="p-8 max-w-lg mx-auto">
        <Dialog.Title
          as="h2"
          className="text-2xl font-semibold text-gray-800 mb-8 tracking-wide"
        >
          {userData ? "Update Profile" : "Add New User"}
        </Dialog.Title>
        <div className="space-y-8">
          <Textbox
            placeholder="Enter full name"
            type="text"
            name="name"
            label="Full Name"
            className="w-full rounded-lg border-gray-300 py-3 px-4 focus:ring-2 focus:ring-blue-400 transition-all duration-150"
            register={register("name", { required: "Full name is required!" })}
            error={errors.name ? errors.name.message : ""}
          />
          <Textbox
            placeholder="Enter title"
            type="text"
            name="title"
            label="Title"
            className="w-full rounded-lg border-gray-300 py-3 px-4 focus:ring-2 focus:ring-blue-400 transition-all duration-150"
            register={register("title", { required: "Title is required!" })}
            error={errors.title ? errors.title.message : ""}
          />
          <Textbox
            placeholder="Enter email address"
            type="email"
            name="email"
            label="Email Address"
            className="w-full rounded-lg border-gray-300 py-3 px-4 focus:ring-2 focus:ring-blue-400 transition-all duration-150"
            register={register("email", { required: "Email Address is required!" })}
            error={errors.email ? errors.email.message : ""}
          />
          <Textbox
            placeholder="Enter role"
            type="text"
            name="role"
            label="Role"
            className="w-full rounded-lg border-gray-300 py-3 px-4 focus:ring-2 focus:ring-blue-400 transition-all duration-150"
            register={register("role", { required: "User role is required!" })}
            error={errors.role ? errors.role.message : ""}
          />
        </div>

        {isLoading || isUpdating ? (
          <div className="py-10 flex justify-center">
            <Loading />
          </div>
        ) : (
          <div className="mt-10 flex justify-end gap-4">
            <Button
              type="submit"
              className="bg-blue-600 px-8 py-3 text-base font-medium text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
              label="Submit"
            />
            <Button
              type="button"
              className="bg-gray-100 px-8 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200"
              onClick={() => setOpen(false)}
              label="Cancel"
            />
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default AddUser;