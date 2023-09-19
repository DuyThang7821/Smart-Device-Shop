import { apiAddVarriant } from "apis";
import Button from "components/buttons/Button";
import Loading from "components/common/Loading";
import InputForm from "components/inputs/inputForm";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";
import Swal from "sweetalert2";
import { getBase64 } from "ultils/helpers";

const CustomizeVarriants = ({
  customizeVarriant,
  setCustomizeVarriant,
  render,
}) => {
  const [preview, setPreview] = useState({
    thumb: "",
    images: "",
  });
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  useEffect(() => {
    reset({
      title: customizeVarriant?.title,
      color: customizeVarriant?.color,
      price: customizeVarriant?.price,
    });
  }, [customizeVarriant]);
  const handleAddVarriant = async (data) => {
    if (data.color === customizeVarriant.color)
      Swal.fire("Oops!", "Could not change", "error");
    else {
      const formData = new FormData();
      for (let i of Object.entries(data)) formData.append(i[0], i[1]);
      if (data.thumb) formData.append("thumb", data.thumb[0]);
      if (data.images) {
        for (let image of data.images) formData.append("images", image);
      }
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiAddVarriant(formData, customizeVarriant._id);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if(response.success){
        toast.success(response.mes)
        reset()
        setPreview({thumb: '', images: []})
      } else toast.error(response.mes)
    }
  };
  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };

  const handlePreviewImages = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        toast.warning("File type not supported!");
        return;
      }
      const base64 = await getBase64(file);
      imagesPreview.push(base64);
    }
    setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };
  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb").length > 0)
      handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);

  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0)
      handlePreviewImages(watch("images"));
  }, [watch("images")]);
  return (
    <div className="w-full flex flex-col gap-4 relative">
      <div className="h-[69px] w-full"></div>
      <div className="p-4 border-b  bg-gray-100 flex justify-between right-0 left-[327px] items-center fixed top-0">
        <h1 className="text-3xl font-bold tracking-tight">
          Tùy chỉnh thêm biến thể của sản phẩm
        </h1>
        <span
          className="text-main hover:underline cursor-pointer"
          onClick={() => setCustomizeVarriant(null)}
        >
          Quay lại
        </span>
      </div>
      <form
        onSubmit={handleSubmit(handleAddVarriant)}
        className="p-4 w-full flex flex-col gap-4"
      >
        <div className="flex gap-4 items-center w-full">
          <InputForm
            label="Tên sản phẩm"
            register={register}
            errors={errors}
            id="title"
            fullWidth
            validate={{
              required: "Trường này không được để trống",
            }}
            placeholder="Tên của sản phẩm"
            style="flex-auto"
          />
        </div>
        <div className="flex gap-4 items-center w-full">
          <InputForm
            label="Giá tiền sản phẩm"
            register={register}
            errors={errors}
            id="price"
            validate={{
              required: "Trường này không được để trống",
            }}
            fullWidth
            placeholder="Giá tiền của sản phẩm"
            type="number"
            style="flex-auto"
          />

          <InputForm
            label="Màu sắc"
            register={register}
            errors={errors}
            id="color"
            validate={{
              required: "Trường này không được để trống",
            }}
            fullWidth
            placeholder="Color of new varriant"
            style="flex-auto"
          />
        </div>
        <div className="flex flex-col gap-2 mt-8">
          <label className="font-semibold" htmlFor="thumb">
            Tải ảnh lên :
          </label>
          <input
            type="file"
            id="thumb"
            {...register("thumb", { required: "Trường này không được để trống" })}
          />
          {errors["thumb"] && (
            <small className="text-xs text-red-500">
              {errors["thumb"]?.message}
            </small>
          )}
        </div>
        {preview.thumb && (
          <div className="my-4">
            <img
              src={preview.thumb}
              alt="thumbnail"
              className="w-[200px] object-content"
            />
          </div>
        )}
        <div className="flex flex-col gap-2 mt-8">
          <label className="font-semibold" htmlFor="products">
            Tải ảnh sản phẩm :
          </label>
          <input
            type="file"
            id="products"
            multiple
            {...register("images", { required: "Trường này không được để trống" })}
          />
          {errors["images"] && (
            <small className="text-xs text-red-500">
              {errors["images"]?.message}
            </small>
          )}
        </div>
        {preview.images.length > 0 && (
          <div className="my-4 flex w-full gap-3 flex-wrap">
            {preview.images?.map((el, idx) => (
              <div key={idx} className="w-fit relative">
                <img
                  src={el}
                  alt="product"
                  className="w-[200px] object-content"
                />
              </div>
            ))}
          </div>
        )}
        <div className="my-6">
          <Button type="submit">Thêm sản phẩm</Button>
        </div>
      </form>
    </div>
  );
};
export default memo(CustomizeVarriants);
